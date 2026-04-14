export const runtime = "nodejs";

import { createClient, type RedisClientType } from "redis";
import { NextResponse } from "next/server";

const COOKIE = "vid";
const ONE_YEAR = 60 * 60 * 24 * 365;

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) throw new Error("Missing REDIS_URL");

const redis = createClient({ url: redisUrl });
let redisConnected: Promise<typeof redis> | null = null;

async function getRedis() {
  if (!redisConnected) {
    redisConnected = redis.connect().then(() => redis);
  }
  return redisConnected;
}

function readCookie(req: Request, name: string) {
  const cookie = req.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function jsonError(status: number, message: string, details?: unknown) {
  return NextResponse.json({ error: message, ...(details ? { details } : {}) }, { status });
}

export async function POST(req: Request) {
  try {
    const r = await getRedis();

    const existing = readCookie(req, COOKIE);
    const visitorId = existing ?? crypto.randomUUID();

    await Promise.all([
      r.incr("visitors:total"),
      r.sAdd("visitors:unique", visitorId),
    ]);

    const res = NextResponse.json({ ok: true });

    if (!existing) {
      res.cookies.set(COOKIE, visitorId, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
        maxAge: ONE_YEAR,
      });
    }

    return res;
  } catch (e) {
    return jsonError(500, "Visitors API error", String(e));
  }
}

export async function GET() {
  try {
    const r = await getRedis();

    const [totalRaw, uniqueVisitors] = await Promise.all([
      r.get("visitors:total"),
      r.sCard("visitors:unique"),
    ]);

    return NextResponse.json({
      totalVisits: Number(totalRaw ?? 0),
      uniqueVisitors: Number(uniqueVisitors ?? 0),
    });
  } catch (e) {
    return jsonError(500, "Visitors API error", String(e));
  }
}