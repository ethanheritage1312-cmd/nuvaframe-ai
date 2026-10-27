import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const API_BASE = "https://api.magichour.ai/v1";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.MAGIC_HOUR_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Video generation is not configured." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const prompt =
      typeof body.prompt === "string" ? body.prompt.trim() : "";
    const duration = Number(body.duration ?? 15);

    if (prompt.length < 12 || prompt.length > 1200) {
      return NextResponse.json(
        { error: "Enter a prompt between 12 and 1200 characters." },
        { status: 400 }
      );
    }

    if (![15, 30].includes(duration)) {
      return NextResponse.json(
        { error: "Only 15- and 30-second Free requests are enabled." },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE}/text-to-video`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Nuvaframe AI Video",
        end_seconds: duration,
        aspect_ratio: "9:16",
        style: { prompt },
        model: "ltx-2.5",
        resolution: "480p",
        audio: true,
      }),
      signal: AbortSignal.timeout(25000),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Magic Hour create request failed:", response.status);
      return NextResponse.json(
        { error: "Magic Hour could not accept the request." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, result: data });
  } catch (error) {
    console.error(
      "Video API error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      { error: "Could not contact the video provider." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const apiKey = process.env.MAGIC_HOUR_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Video generation is not configured." },
        { status: 503 }
      );
    }

    const id = new URL(request.url).searchParams.get("id");

    if (!id || !/^[a-zA-Z0-9_-]+$/.test(id)) {
      return NextResponse.json(
        { error: "A valid video project ID is required." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${API_BASE}/video-projects/${encodeURIComponent(id)}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not retrieve the video status." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, result: data });
  } catch {
    return NextResponse.json(
      { error: "Could not check the video status." },
      { status: 500 }
    );
  }
}
