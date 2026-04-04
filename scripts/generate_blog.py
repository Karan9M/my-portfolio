#!/usr/bin/env python3
"""
Auto Blog Generator for mekaran.vercel.app
Fetches top tech news from RSS feeds → generates a blog post in Karan's style
using Gemini Flash (free) → commits MDX to the repo.
Runs via GitHub Actions twice daily.
"""

import os
import json
import re
import sys
import hashlib
import textwrap
from datetime import datetime, timezone
from pathlib import Path

import feedparser
import google.generativeai as genai
import requests

# ── Configuration ─────────────────────────────────────────────────────────────

GEMINI_API_KEY   = os.environ["GEMINI_API_KEY"]
UNSPLASH_API_KEY = os.environ.get("UNSPLASH_ACCESS_KEY", "")  # optional

CONTENT_DIR   = Path(__file__).parent.parent / "content"
TRACKER_FILE  = Path(__file__).parent / "posted_slugs.json"

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

# ── Karan's writing style (few-shot examples fed to Gemini) ───────────────────

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


def fetch_top_articles(posted_slugs: set) -> list[dict]:
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
                    "summary": summary[:800],   # trim for prompt
                    "link":    link,
                    "slug":    slug,
                    "source":  feed.feed.get("title", url),
                })
        except Exception as e:
            print(f"⚠  Failed to fetch {url}: {e}")
    return articles


def pick_best_article(articles: list[dict]) -> dict | None:
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


def generate_blog_with_gemini(article: dict) -> tuple[str, str, str, list[str]]:
    """
    Calls Gemini Flash to write the blog.
    Returns (title, summary, body_markdown, tags).
    """
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash-latest")

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
        - Write in Karan's casual, friendly, first-person style (use "I", "Hey there!", emojis ✅)
        - Between 500–900 words
        - Use markdown headings (##, ###)
        - Include a short personal opinion section
        - End with a "Conclusion" or "TL;DR" section
        - At the very end, add "Source: [{article['source']}]({article['link']})"
        - Add a line "Tags: tag1, tag2, tag3, tag4" at the very bottom (comma-separated, max 5 tags, no #)
        - Do NOT add YAML frontmatter — just write the markdown body starting with a # heading
        - The first line must be the H1 title (creative, not just copying the source title)
        - Second line should be a brief tagline in italics

        Return ONLY the markdown, nothing else.
    """)

    response = model.generate_content(prompt)
    raw = response.text.strip()

    # Extract tags line
    tags = ["tech", "webdev", "programming"]
    tag_match = re.search(r"^Tags?:\s*(.+)$", raw, re.MULTILINE | re.IGNORECASE)
    if tag_match:
        tags = [t.strip().lower() for t in tag_match.group(1).split(",")][:5]
        raw = re.sub(r"^Tags?:.+$\n?", "", raw, flags=re.MULTILINE | re.IGNORECASE).strip()

    # Extract H1 as the title
    h1_match = re.match(r"^#\s+(.+)$", raw, re.MULTILINE)
    generated_title = h1_match.group(1).strip() if h1_match else article["title"]

    # Generate a one-sentence summary from the first non-heading paragraph
    lines = [l for l in raw.split("\n") if l.strip() and not l.startswith("#")]
    auto_summary = (lines[0][:160] + "...") if lines else f"Karan's take on {article['title']}"
    # Strip markdown italics for summary
    auto_summary = re.sub(r"[*_]", "", auto_summary)

    return generated_title, auto_summary, raw, tags


def fetch_unsplash_image(query: str) -> str:
    """Returns an Unsplash photo URL or empty string if key not set."""
    if not UNSPLASH_API_KEY:
        return ""
    try:
        r = requests.get(
            "https://api.unsplash.com/photos/random",
            params={"query": query, "orientation": "landscape"},
            headers={"Authorization": f"Client-ID {UNSPLASH_API_KEY}"},
            timeout=10,
        )
        data = r.json()
        return data.get("urls", {}).get("regular", "")
    except Exception as e:
        print(f"⚠  Unsplash error: {e}")
        return ""


def write_mdx(slug: str, title: str, summary: str, body: str,
              tags: list[str], image_url: str) -> Path:
    """Write the final .mdx file to the content directory."""
    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    image_field = f'image: "{image_url}"\n' if image_url else ""
    tags_yaml   = json.dumps(tags)

    frontmatter = textwrap.dedent(f"""\
        ---
        title: "{title.replace('"', "'")}"
        publishedAt: "{date_str}"
        summary: "{summary.replace('"', "'")}"
        {image_field}tags: {tags_yaml}
        ---
    """).strip()

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
    title, summary, body, tags = generate_blog_with_gemini(article)

    # Use the first tag as the Unsplash search query
    image_url = fetch_unsplash_image(tags[0] if tags else "technology")

    slug = slugify(title)

    # Avoid collisions
    if (CONTENT_DIR / f"{slug}.mdx").exists():
        slug = slug + "-" + hashlib.md5(article["link"].encode()).hexdigest()[:6]

    write_mdx(slug, title, summary, body, tags, image_url)

    posted_slugs.add(article["slug"])
    save_posted_slugs(posted_slugs)

    # Output slug for the GitHub Action to use in the commit message
    print(f"::set-output name=slug::{slug}")
    print(f"::set-output name=title::{title}")


if __name__ == "__main__":
    main()
