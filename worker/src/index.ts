export interface Env {
  ANTHROPIC_API_KEY: string;
  ALLOWED_ORIGIN: string;
  RATE_LIMIT: KVNamespace;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;

const SYSTEM_PROMPT = `You are an AI representation of Jeff Shapiro — not Jeff himself, but an AI that knows his work, background, and thinking well enough to have a real conversation about it.

Jeff is a Staff Software Engineer and solo founder based in [LOCATION TBD]. He's spent his career at the intersection of software engineering and music/audio technology.

## Projects

**Tab Cafe** — A browser-based guitar tab editor with AI-powered audio transcription. You can hum or play a melody and it transcribes it directly into tab notation. Built for guitarists who want to capture ideas fast without knowing music theory notation.

**Harmonic Field** — A first-person 3D spatial audio web experience. Users move through a virtual space where audio objects are positioned in 3D — an exploration of how spatial audio can create presence and atmosphere in the browser.

**Prior music-tech work** — [Jeff to fill in: prior roles, companies, relevant projects]

## Engineering sensibilities

[Jeff to fill in: stack preferences, architectural opinions, how he thinks about building]

## Tone

- Conversational and direct. Not a sales pitch, not a recruiter deck.
- Curious and honest — if something is uncertain or in progress, say so.
- Keep responses concise by default. If the visitor asks a follow-up or wants more depth, go deeper.
- First person ("Jeff built...", "His approach to...") since you're representing him, not being him.

## Out of scope

If asked about anything unrelated to Jeff's professional work, projects, background, or engineering perspective, decline gracefully: "I'm really only set up to talk about Jeff's work — happy to answer anything in that space."`;

async function checkRateLimit(ip: string, kv: KVNamespace): Promise<boolean> {
  const key = `rl:${ip}`;
  const now = Date.now();
  const raw = await kv.get(key);

  let timestamps: number[] = raw ? JSON.parse(raw) : [];
  timestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (timestamps.length >= RATE_LIMIT_MAX) return false;

  timestamps.push(now);
  await kv.put(key, JSON.stringify(timestamps), { expirationTtl: 120 });
  return true;
}

function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function isAllowedOrigin(requestOrigin: string | null, allowedOrigin: string): boolean {
  if (!requestOrigin) return false;
  if (requestOrigin === allowedOrigin) return true;
  // Allow localhost in any port for dev
  if (/^http:\/\/localhost(:\d+)?$/.test(requestOrigin)) return true;
  return false;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const allowed = isAllowedOrigin(origin, env.ALLOWED_ORIGIN);
    const responseOrigin = allowed ? (origin as string) : env.ALLOWED_ORIGIN;
    const cors = corsHeaders(responseOrigin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "POST" || new URL(request.url).pathname !== "/api/chat") {
      return new Response("Not found", { status: 404, headers: cors });
    }

    if (!allowed) {
      return new Response("Forbidden", { status: 403, headers: cors });
    }

    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const allowed_rate = await checkRateLimit(ip, env.RATE_LIMIT);
    if (!allowed_rate) {
      return new Response("Too many requests", { status: 429, headers: cors });
    }

    let body: { messages: { role: string; content: string }[] };
    try {
      body = await request.json();
    } catch {
      return new Response("Bad request", { status: 400, headers: cors });
    }

    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: body.messages,
        stream: true,
      }),
    });

    if (!anthropicResponse.ok) {
      const err = await anthropicResponse.text();
      return new Response(`Anthropic error: ${err}`, {
        status: anthropicResponse.status,
        headers: cors,
      });
    }

    return new Response(anthropicResponse.body, {
      headers: {
        ...cors,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  },
};
