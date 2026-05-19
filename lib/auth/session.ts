import { cookies } from "next/headers";
import type { AppRole, PartnerStatus } from "@/lib/auth/roles";
import { isAppRole, isPartnerStatus, roleLabels, partnerStatusLabels } from "@/lib/auth/roles";

export const FOUNDATION_ROLE_COOKIE = "tubatour-foundation-role";
export const FOUNDATION_PARTNER_STATUS_COOKIE = "tubatour-foundation-partner-status";

export type MockAuthSession = {
  role: AppRole;
  partnerStatus: PartnerStatus | null;
  displayName: string;
};

function getDefaultDisplayName(role: AppRole) {
  switch (role) {
    case "TRAVELER":
      return "Traveler account";
    case "PARTNER":
      return "Partner account";
    case "ADMIN":
      return "Admin account";
  }
}

export function createMockSessionRedirectUrl(options: {
  role: AppRole;
  locale: string;
  redirectTo: string;
  partnerStatus?: PartnerStatus;
}) {
  const params = new URLSearchParams({
    role: options.role,
    redirectTo: options.redirectTo
  });

  if (options.partnerStatus) {
    params.set("partnerStatus", options.partnerStatus);
  }

  return `/api/auth/foundation-session?${params.toString()}`;
}

export function createClearMockSessionUrl(redirectTo: string) {
  return `/api/auth/foundation-session?action=signout&redirectTo=${encodeURIComponent(redirectTo)}`;
}

// Foundation-only helper. Replace this cookie-backed session reader with Auth.js, Clerk,
// Supabase Auth, or another real provider when secure authentication is connected.
export function getMockSession(): MockAuthSession | null {
  const cookieStore = cookies();
  const roleValue = cookieStore.get(FOUNDATION_ROLE_COOKIE)?.value;
  const partnerStatusValue = cookieStore.get(FOUNDATION_PARTNER_STATUS_COOKIE)?.value;

  if (!isAppRole(roleValue)) {
    return null;
  }

  return {
    role: roleValue,
    partnerStatus:
      roleValue === "PARTNER" && isPartnerStatus(partnerStatusValue) ? partnerStatusValue : null,
    displayName: getDefaultDisplayName(roleValue)
  };
}

export function getSessionBadgeText(session: MockAuthSession | null) {
  if (!session) {
    return "Secure account access";
  }

  if (session.role === "PARTNER" && session.partnerStatus) {
    return `${roleLabels[session.role]} · ${partnerStatusLabels[session.partnerStatus]}`;
  }

  return roleLabels[session.role];
}
