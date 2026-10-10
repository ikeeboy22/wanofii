import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isSameOrigin, isValidAdminSession } from "@/lib/admin-auth";
import { getSupabaseConfig, getSupabaseHeaders, isSiteContent } from "@/lib/site-content";

export const runtime = "nodejs";

export async function PUT(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  if (!isValidAdminSession(request.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  }

  const config = getSupabaseConfig();
  if (!config) {
    return NextResponse.json({ error: "Shared storage is not configured on the deployment yet." }, { status: 503 });
  }

  let content: unknown;
  try {
    content = (await request.json()).content;
  } catch {
    return NextResponse.json({ error: "The submitted content was not valid." }, { status: 400 });
  }
  if (!isSiteContent(content)) return NextResponse.json({ error: "Some content fields are invalid." }, { status: 400 });

  const response = await fetch(`${config.url}/rest/v1/wanofii_content?on_conflict=id`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(config.key),
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({ id: 1, content }),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Could not save to the database. Check the database setup." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
