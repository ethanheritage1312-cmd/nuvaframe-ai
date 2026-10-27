import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const apiKey = process.env.MAGIC_HOUR_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Video generation is not configured on the server." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const prompt =
      typeof body.prompt === "string" ? body.prompt.trim() : "";

    const allowedDurations = [15, 30, 60];
    const duration = Number(body.duration ?? 30);

    if (prompt.length < 12 || prompt.length > 1200) {
      return NextResponse.json(
        { error: "Enter a prompt between 12 and 1200 characters." },
        { status: 400 }
      );
    }

    if (!allowedDurations.includes(duration)) {
      return NextResponse.json(
        { error: "Choose a 15, 30, or 60 second video." },
        { status: 400 }
      );
    }

    if (duration === 60) {
      return NextResponse.json(
        { error: "60-second videos require Premium access, which is not yet enabled." },
        { status: 403 }
      );
    }

    const result = await fetch(
      "https://api.magichour.ai/v1/text-to-video",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          end_seconds: duration,
          aspect_ratio: "9:16",
          style: {
            prompt,
          },
          name: "Nuvaframe AI Video",
          model: "ltx-2.5",
          resolution: "480p",
          audio: true,
        }),
        signal: AbortSignal.timeout(25000),
      }
    );

    const responseText = await result.text();

    let data: unknown;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: "The video provider returned an unexpected response." };
    }

    if (!result.ok) {
      console.error("Magic Hour request failed:", result.status);

      return NextResponse.json(
        {
          error:
            result.status === 402
              ? "The provider requires additional credits or access."
              : result.status === 401
                ? "The provider rejected the API key. Check the Vercel environment variable."
                : "Magic Hour could not accept the video request.",
          providerStatus: result.status,
        },
        { status: result.status === 401 ? 502 : 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Video request submitted to Magic Hour.",
      result: data,
    });
  } catch (error) {
    console.error(
      "Video request error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      { error: "Could not contact the video provider. Please try again." },
      { status: 500 }
    );
  }
}
