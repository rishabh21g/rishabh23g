export const runtime = "nodejs";

type NowPlaying = {
  playing: boolean;
  title: string | null;
  artist: string | null;
  album: string | null;
  artUrl: string | null;
  trackUrl: string | null;
};

function json(status: number, body: unknown) {
  return Response.json(body, { status });
}

async function getAccessTokenFromRefreshToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET / SPOTIFY_REFRESH_TOKEN");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
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
  if (!res.ok) throw new Error(`Refresh failed: ${res.status} ${JSON.stringify(data)}`);

  return (data as { access_token: string }).access_token;
}

export async function GET() {
  try {
    const accessToken = await getAccessTokenFromRefreshToken();

    const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (res.status === 204) {
      const payload: NowPlaying = {
        playing: false,
        title: null,
        artist: null,
        album: null,
        artUrl: null,
        trackUrl: null,
      };
      return json(200, payload);
    }

    const data = await res.json().catch(() => null);
    if (!res.ok || !data) {
      return json(200, { playing: false } satisfies Partial<NowPlaying>);
    }

    const item = data.item;
    const payload: NowPlaying = {
      playing: Boolean(data.is_playing),
      title: item?.name ?? null,
      artist: item?.artists?.map((a: any) => a.name).filter(Boolean).join(", ") ?? null,
      album: item?.album?.name ?? null,
      artUrl: item?.album?.images?.[0]?.url ?? null,
      trackUrl: item?.external_urls?.spotify ?? null,
    };

    return json(200, payload);
  } catch (e: any) {
    return json(500, { error: "Spotify API error", details: String(e?.message ?? e) });
  }
}