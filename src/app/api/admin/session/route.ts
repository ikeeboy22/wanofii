import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdminAuthConfigured, isValidAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const authenticated = isAdminAuthConfigured() && isValidAdminSession(request.cookies.get(ADMIN_COOKIE)?.value);
  return NextResponse.json({ authenticated, configured: isAdminAuthConfigured() });
}
