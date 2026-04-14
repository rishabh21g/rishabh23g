export const runtime = "nodejs";

function json(status: number, body: unknown) {
  return Response.json(body, { status });
}

async function exchangeCodeForTokens(code: string) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET / SPOTIFY_REDIRECT_URI");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status} ${JSON.stringify(data)}`);

  return data as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    token_type: "Bearer";
    scope: string;
  };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) return json(400, { error });
  if (!code) return json(400, { error: "Missing ?code" });

  try {
    const tokens = await exchangeCodeForTokens(code);
    return json(200, {
      ok: true,
      refresh_token: tokens.refresh_token, // copy this into SPOTIFY_REFRESH_TOKEN
      scope: tokens.scope,
    });
  } catch (e: any) {
    return json(500, { error: "Spotify callback error", details: String(e?.message ?? e) });
  }
}