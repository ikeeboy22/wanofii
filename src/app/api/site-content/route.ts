import { NextResponse } from "next/server";
import { getSupabaseConfig, readSiteContent } from "@/lib/site-content";

export const runtime = "nodejs";

export async function GET() {
  try {
    const content = await readSiteContent();
    return NextResponse.json(
      { content, storageConfigured: Boolean(getSupabaseConfig()) },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch {
    return NextResponse.json({ error: "Site content is temporarily unavailable." }, { status: 503 });
  }
}
