import { NextResponse } from "next/server";

export async function GET() {
  const GITHUB_USERNAME = "karan9m";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: "Missing GITHUB_TOKEN environment variable." }, { status: 500 });
  }

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 }, // Cache on server for 1hr instead of 24hrs 
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from GitHub API");
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    const calendar = data.data.user.contributionsCollection.contributionCalendar;
    const days = calendar.weeks.flatMap((w: any) => w.contributionDays);

    const formattedData = days.map((day: any) => {
      let level = 0;
      if (day.contributionCount > 0) {
        if (day.contributionCount === 1) level = 1;
        else if (day.contributionCount <= 3) level = 2;
        else if (day.contributionCount <= 6) level = 3;
        else level = 4;
      }
      
      return {
        date: day.date,
        count: day.contributionCount,
        level: level,
      };
    });

    return NextResponse.json(formattedData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
