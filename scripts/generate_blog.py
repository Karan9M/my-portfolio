#!/usr/bin/env python3
"""
Auto Blog Generator for mekaran.vercel.app
Fetches top tech news from RSS feeds → generates a blog post in Karan's style
using Groq (free, fast) → commits MDX to the repo.
Runs via GitHub Actions twice daily.
"""

import os
import json
import re
import sys
import time
import hashlib
import uuid
import textwrap
from datetime import datetime, timezone
from pathlib import Path

import feedparser
import requests
from groq import Groq

# ── Configuration ─────────────────────────────────────────────────────────────

GROQ_API_KEY     = os.environ["GROQ_API_KEY"]
UNSPLASH_API_KEY = os.environ.get("UNSPLASH_ACCESS_KEY", "")  # optional

CONTENT_DIR  = Path(__file__).parent.parent / "content"
TRACKER_FILE = Path(__file__).parent / "posted_slugs.json"

# Groq models to try in order (first available/non-exhausted wins)
MODELS = [
    "llama-3.3-70b-versatile",   # Primary — best quality free model
    "llama3-70b-8192",           # Fallback 1
    "mixtral-8x7b-32768",        # Fallback 2
]

# RSS feeds to monitor (public, no auth needed)
RSS_FEEDS = [
    "https://hnrss.org/frontpage?count=10",          # Hacker News
    "https://www.theverge.com/rss/index.xml",        # The Verge
    "https://feeds.feedburner.com/TechCrunch",       # TechCrunch
    "https://css-tricks.com/feed/",                  # CSS-Tricks
    "https://web.dev/feed.xml",                      # web.dev
    "https://openai.com/blog/rss.xml",               # OpenAI
    "https://changelog.com/feed",                    # Changelog
    "https://dev.to/feed",                           # dev.to
]

# ── Karan's writing style (few-shot examples fed to Groq) ─────────────────────

STYLE_EXAMPLES = """
EXAMPLE POST 1 — casual tech explainer:
---
Hey there! I'm Karan, and today I want to talk about something exciting that everyone in tech
is buzzing about. 🤔

# Why [Topic] Changes Everything

Okay real talk — when I first heard about this I was skeptical. But after digging in, I get it.

## The Short Version
Here's what's actually happening in plain English...

### Why This Matters to Developers
1. **It saves you time** — and time is money, friend.
2. **It's surprisingly easy to pick up**
3. **Companies are already hiring for it**

## My Take
This isn't hype. I've seen stuff come and go. This one's sticking around.

**TL;DR**: Worth your time. Start now, start small. 🚀

*Your tech buddy, Karan*
---

EXAMPLE POST 2 — opinion + tutorial:
---
Let me be honest with you — I spent way too long ignoring [Topic]. Big mistake.

# [Topic]: What Nobody Tells You

![relevant image]

## What is it, actually?
Skip the Wikipedia definition. Here's what it means for your day-to-day as a developer...

## The Part That Actually Matters
...

## Conclusion
They just want to keep this secret 😶. Don't let them.

Thanks for reading till the end ♥
*Karan*
---
"""

# ── Helpers ────────────────────────────────────────────────────────────────────

def load_posted_slugs() -> set:
    if TRACKER_FILE.exists():
        return set(json.loads(TRACKER_FILE.read_text()))
    return set()


def save_posted_slugs(slugs: set):
    TRACKER_FILE.write_text(json.dumps(sorted(slugs), indent=2))


def slugify(title: str) -> str:
    title = title.lower().strip()
    title = re.sub(r"[^\w\s-]", "", title)
    title = re.sub(r"[\s_-]+", "-", title)
    title = re.sub(r"^-+|-+$", "", title)
    return title[:80]


def fetch_top_articles(posted_slugs: set) -> list:
    """Pull articles from all RSS feeds, filter out already-posted ones."""
    articles = []
    for url in RSS_FEEDS:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:5]:
                title   = entry.get("title", "").strip()
                summary = entry.get("summary", entry.get("description", "")).strip()
                link    = entry.get("link", "")
                if not title or not summary:
                    continue
                slug = slugify(title)
                if slug in posted_slugs:
                    continue
                articles.append({
                    "title":   title,
                    "summary": summary[:800],
                    "link":    link,
                    "slug":    slug,
                    "source":  feed.feed.get("title", url),
                })
        except Exception as e:
            print(f"⚠  Failed to fetch {url}: {e}")
    return articles


def pick_best_article(articles: list) -> dict:
    """Score articles by keyword relevance to tech/dev topics."""
    KEYWORDS = [
        "ai", "developer", "javascript", "python", "react", "nextjs", "web",
        "open source", "llm", "model", "api", "programming", "code", "github",
        "startup", "tool", "framework", "release", "update", "launch",
    ]
    best, best_score = None, -1
    for a in articles:
        text  = (a["title"] + " " + a["summary"]).lower()
        score = sum(1 for kw in KEYWORDS if kw in text)
        if score > best_score:
            best, best_score = a, score
    return best


def generate_blog_with_groq(article: dict) -> tuple:
    """
    Calls Groq to write the blog, with automatic model fallback.
    Returns (title, summary, body_markdown, tags).
    """
    client = Groq(api_key=GROQ_API_KEY)

    prompt = textwrap.dedent(f"""
        You are writing a tech blog post exactly in the style of Karan Mavadiya,
        a full-stack product engineer from India.

        STYLE GUIDE — study these examples carefully:
        {STYLE_EXAMPLES}

        ---
        Now write a NEW blog post about the following news/topic:

        TITLE (source): {article['title']}
        SUMMARY:        {article['summary']}
        SOURCE:         {article['source']} ({article['link']})

        REQUIREMENTS:
        - Write in Karan's casual, friendly, first-person style (use "I", "Hey there!", emojis)
        - Between 500-900 words
        - Use markdown headings (##, ###)
        - Include a short personal opinion section
        - End with a "Conclusion" or "TL;DR" section
        - At the very end, add "Source: [{article['source']}]({article['link']})"
        - Add a line "Tags: tag1, tag2, tag3, tag4" at the very bottom (comma-separated, max 5)
        - Do NOT add YAML frontmatter — write the markdown body starting with a # heading
        - The first line must be the H1 title (creative, not just copying the source title)
        - Second line should be a brief tagline in italics

        Return ONLY the markdown, nothing else.
    """)

    raw = ""

    for model_name in MODELS:
        print(f"🤖  Trying model: {model_name}")

        for attempt in range(3):
            try:
                response = client.chat.completions.create(
                    model=model_name,
                    messages=[{"role": "user", "content": prompt}],
                    max_tokens=1500,
                )
                raw = response.choices[0].message.content.strip()
                print(f"✅  Success with model: {model_name}")
                break  # Inner loop — generation succeeded

            except Exception as e:
                err_str = str(e)

                # Rate limit → retry with backoff
                if "429" in err_str or "rate" in err_str.lower() or "quota" in err_str.lower():
                    if attempt < 2:
                        wait = 30 * (attempt + 1)
                        print(f"⏳  Rate-limited on {model_name}, waiting {wait}s (retry {attempt + 2}/3)...")
                        time.sleep(wait)
                    else:
                        print(f"⚠️   Rate limit persists for {model_name}, moving to next model...")
                        break

                # Model not found / decommissioned → skip immediately
                elif "404" in err_str or "not found" in err_str.lower() or "decommissioned" in err_str.lower():
                    print(f"⚠️   Model {model_name} unavailable, moving to next model...")
                    break

                # Unknown error → raise immediately
                else:
                    raise

        if raw:
            break  # Outer loop — we have a result

    if not raw:
        raise Exception(
            "❌  All Groq models exhausted or unavailable.\n"
            "    Check your API key or rate limits at: https://console.groq.com"
        )

    # ── Parse the response ─────────────────────────────────────────────────────

    # Extract tags line
    tags = ["tech", "webdev", "programming"]
    tag_match = re.search(r"^Tags?:\s*(.+)$", raw, re.MULTILINE | re.IGNORECASE)
    if tag_match:
        tags = [t.strip().lower() for t in tag_match.group(1).split(",")][:5]
        raw = re.sub(r"^Tags?:.+$\n?", "", raw, flags=re.MULTILINE | re.IGNORECASE).strip()

    # Extract H1 as the title
    h1_match = re.search(r"^#\s+(.+)$", raw, re.MULTILINE)
    generated_title = h1_match.group(1).strip() if h1_match else article["title"]

    # Auto-generate summary from first non-heading paragraph
    lines = [l for l in raw.split("\n") if l.strip() and not l.startswith("#")]
    auto_summary = (lines[0][:160] + "...") if lines else f"Karan's take on {article['title']}"
    auto_summary = re.sub(r"[*_]", "", auto_summary)

    return generated_title, auto_summary, raw, tags


def fetch_unsplash_image(query: str) -> str:
    print(f"🔑  Unsplash key: {'SET' if UNSPLASH_API_KEY else 'MISSING'}")
    print(f"🔍  Searching Unsplash for: {query}")
    if not UNSPLASH_API_KEY:
        return ""
    try:
        r = requests.get(
            "https://api.unsplash.com/photos/random",
            params={"query": query, "orientation": "landscape"},
            headers={"Authorization": f"Client-ID {UNSPLASH_API_KEY}"},
            timeout=10,
        )
        print(f"📡  Unsplash status: {r.status_code}")
        print(f"📦  Unsplash response: {r.text[:300]}")   # first 300 chars
        data = r.json()
        return data.get("urls", {}).get("regular", "")
    except Exception as e:
        print(f"⚠  Unsplash error: {e}")
        return ""


def github_output_set(name: str, value: str) -> None:
    """Write a step output for GitHub Actions (replaces deprecated ::set-output)."""
    path = os.environ.get("GITHUB_OUTPUT")
    if not path:
        return
    delim = f"DELIM_{uuid.uuid4().hex}"
    with open(path, "a", encoding="utf-8") as fh:
        fh.write(f"{name}<<{delim}\n{value}\n{delim}\n")


def telegram_escape(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def telegram_href(url: str) -> str:
    """Escape & for Telegram HTML <a href=\"...\"> attributes."""
    return url.replace("&", "&amp;")


def send_telegram_blog_notification(
    *,
    title: str,
    slug: str,
    summary: str,
    tags: list,
    image_url: str,
    source: dict,
    published_date: str,
    post_url: str,
) -> None:
    """
    Notify via Telegram Bot API when TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are set.
    Create a bot with @BotFather; chat_id is your user id or channel id (use @userinfobot).
    """
    token = os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "").strip()
    if not token or not chat_id:
        print(
            "ℹ️   TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set — skipping Telegram."
        )
        return

    te = telegram_escape
    tags_s = ", ".join(tags) if tags else "—"
    src_title = source.get("title", "")
    src_link = source.get("link", "")
    src_name = source.get("source", "")

    hu = telegram_href
    if image_url:
        cover_line = f'<b>Cover image:</b> <a href="{hu(image_url)}">open image</a>'
    else:
        cover_line = "<b>Cover image:</b> —"

    lines = [
        "📝 <b>New auto-blog published</b>",
        "",
        f"<b>Title:</b> {te(title)}",
        f"<b>Slug:</b> <code>{te(slug)}</code>",
        f"<b>Published:</b> {te(published_date)}",
        f'<b>URL:</b> <a href="{hu(post_url)}">{te(post_url)}</a>',
        "",
        "<b>Summary:</b>",
        te(summary[:1200]) + ("…" if len(summary) > 1200 else ""),
        "",
        f"<b>Tags:</b> {te(tags_s)}",
        "",
        f"<b>Source feed / site:</b> {te(src_name)}",
        f'<b>Source article:</b> <a href="{hu(src_link)}">{te(src_title)}</a>',
        "",
        cover_line,
    ]

    repo = os.environ.get("GITHUB_REPOSITORY", "").strip()
    run_id = os.environ.get("GITHUB_RUN_ID", "").strip()
    server = os.environ.get("GITHUB_SERVER_URL", "https://github.com").rstrip("/")
    if repo and run_id:
        run_url = f"{server}/{repo}/actions/runs/{run_id}"
        lines.extend(
            ["", f'<b>GitHub Actions run:</b> <a href="{hu(run_url)}">{te(run_url)}</a>']
        )
    text = "\n".join(lines)
    if len(text) > 4000:
        text = text[:3990] + "\n…"

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    try:
        r = requests.post(
            url,
            json={
                "chat_id": chat_id,
                "text": text,
                "parse_mode": "HTML",
                "disable_web_page_preview": False,
            },
            timeout=30,
        )
        if not r.ok:
            print(f"⚠️   Telegram API error {r.status_code}: {r.text[:500]}")
        else:
            print("✅  Telegram notification sent.")
    except Exception as e:
        print(f"⚠️   Telegram send failed: {e}")


def write_mdx(slug: str, title: str, summary: str, body: str,
              tags: list, image_url: str) -> Path:
    """Write the final .mdx file to the content directory."""
    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    # Build frontmatter lines individually — avoids indentation bugs
    fm_lines = [
        "---",
        f'title: "{title.replace(chr(34), chr(39))}"',
        f'publishedAt: "{date_str}"',
        f'summary: "{summary.replace(chr(34), chr(39))}"',
    ]
    if image_url:
        fm_lines.append(f'image: "{image_url}"')
    fm_lines.append(f'tags: {json.dumps(tags)}')
    fm_lines.append("---")

    frontmatter = "\n".join(fm_lines)
    
    # Inject the image into the markdown body (right below the H1 or at the top)
    if image_url:
        body = f"![Cover Image]({image_url})\n\n" + body

    mdx_content = frontmatter + "\n\n" + body + "\n"

    filepath = CONTENT_DIR / f"{slug}.mdx"
    filepath.write_text(mdx_content, encoding="utf-8")
    print(f"✅  Written: {filepath}")
    return filepath


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    print("🚀  Auto Blog Generator starting...")

    posted_slugs = load_posted_slugs()
    print(f"📋  Already posted: {len(posted_slugs)} articles")

    articles = fetch_top_articles(posted_slugs)
    print(f"📰  Fetched {len(articles)} new candidate articles")

    if not articles:
        print("ℹ️   No new articles found. Exiting.")
        sys.exit(0)

    article = pick_best_article(articles)
    if not article:
        print("ℹ️   No suitable article found. Exiting.")
        sys.exit(0)

    print(f"✍️   Generating blog for: {article['title']}")
    title, summary, body, tags = generate_blog_with_groq(article)

    image_url = fetch_unsplash_image(tags[0] if tags else "technology")

    slug = slugify(title)

    # Avoid filename collisions
    if (CONTENT_DIR / f"{slug}.mdx").exists():
        slug = slug + "-" + hashlib.md5(article["link"].encode()).hexdigest()[:6]

    write_mdx(slug, title, summary, body, tags, image_url)

    posted_slugs.add(article["slug"])
    save_posted_slugs(posted_slugs)

    site_url = os.environ.get("SITE_URL", "https://mekaran.vercel.app").rstrip("/")
    post_url = f"{site_url}/blog/{slug}"
    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    send_telegram_blog_notification(
        title=title,
        slug=slug,
        summary=summary,
        tags=tags,
        image_url=image_url,
        source=article,
        published_date=date_str,
        post_url=post_url,
    )

    github_output_set("slug", slug)
    github_output_set("title", title)


if __name__ == "__main__":
    main()