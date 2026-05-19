import { NextRequest, NextResponse } from "next/server";
import {
  FOUNDATION_PARTNER_STATUS_COOKIE,
  FOUNDATION_ROLE_COOKIE
} from "@/lib/auth/session";
import { isAppRole, isPartnerStatus } from "@/lib/auth/roles";

// Foundation-only route. Replace this cookie bootstrap with a real auth provider
// when secure production authentication is connected.
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const action = url.searchParams.get("action");
  const redirectTo = url.searchParams.get("redirectTo") || "/en";

  const response = NextResponse.redirect(new URL(redirectTo, request.url));

  if (action === "signout") {
    response.cookies.delete(FOUNDATION_ROLE_COOKIE);
    response.cookies.delete(FOUNDATION_PARTNER_STATUS_COOKIE);
    return response;
  }

  const role = url.searchParams.get("role");
  const partnerStatus = url.searchParams.get("partnerStatus");

  if (!isAppRole(role)) {
    return NextResponse.redirect(new URL("/en/signin?error=invalid-role", request.url));
  }

  response.cookies.set(FOUNDATION_ROLE_COOKIE, role, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/"
  });

  if (role === "PARTNER" && isPartnerStatus(partnerStatus)) {
    response.cookies.set(FOUNDATION_PARTNER_STATUS_COOKIE, partnerStatus, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/"
    });
  } else {
    response.cookies.delete(FOUNDATION_PARTNER_STATUS_COOKIE);
  }

  return response;
}
