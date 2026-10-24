import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    app: "nuvaframe-ai",
    videoGenerationConfigured: Boolean(process.env.VIDEO_PROVIDER && process.env.VIDEO_PROVIDER_API_KEY),
    note: "Health check only. Video generation is not implemented until a provider is selected and integrated.",
  });
}
