export const runtime = "nodejs";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

const CONTRIBUTION_CALENDAR_QUERY = `
  query ($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          months { name firstDay totalWeeks }
          weeks {
            firstDay
            contributionDays { date weekday contributionCount }
          }
        }
      }
    }
  }
`;

type GitHubGraphQLError = { message: string };
type GitHubGraphQLResponse<TData> = { data?: TData; errors?: GitHubGraphQLError[] };

function getGitHubUsername(req: Request): string | null {
  const { searchParams } = new URL(req.url);

  const usernameFromQuery = searchParams.get("username") ?? searchParams.get("user");
  const username = usernameFromQuery || process.env.GITHUB_USERNAME || "";

  return username.trim() ? username.trim() : null;
}

async function githubGraphQL<TData>(
  token: string,
  query: string,
  variables: Record<string, unknown>
): Promise<TData> {
  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = (await res.json()) as GitHubGraphQLResponse<TData> & Record<string, unknown>;

  if (!res.ok || json.errors?.length) {
    throw { status: 502, details: json.errors ?? json };
  }

  if (!json.data) {
    throw { status: 502, details: json };
  }

  return json.data;
}

type ContributionCalendarData = {
  user: {
    contributionsCollection: {
      contributionCalendar: unknown;
    };
  };
};

export async function GET(req: Request) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return Response.json({ error: "Missing GITHUB_TOKEN" }, { status: 500 });
  }

  const username = getGitHubUsername(req);
  if (!username) {
    return Response.json({ error: "Missing ?user=" }, { status: 400 });
  }

  try {
    const data = await githubGraphQL<ContributionCalendarData>(
      token,
      CONTRIBUTION_CALENDAR_QUERY,
      { username }
    );

    const calendar = data.user.contributionsCollection.contributionCalendar;
    return Response.json(calendar);
  } catch (err: any) {
    return Response.json(
      { error: "GitHub API error", details: err?.details ?? err },
      { status: err?.status ?? 502 }
    );
  }
}