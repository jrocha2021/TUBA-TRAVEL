import { redirect } from "next/navigation";
import type { AppRole, PartnerStatus } from "@/lib/auth/roles";
import { isApprovedPartner } from "@/lib/auth/roles";
import { getMockSession, type MockAuthSession } from "@/lib/auth/session";
import { getRoleHomeRoute } from "@/lib/platform/navigation";
import type { Locale } from "@/lib/i18n";

export type PostSignInRedirectResult = {
  redirectTo: string;
  downgraded: boolean;
};

export type ProtectedPlatformKey =
  | "TRAVELER_DASHBOARD"
  | "PARTNER_DASHBOARD"
  | "PARTNER_PROFILE"
  | "PARTNER_BOOKINGS"
  | "ADMIN_DASHBOARD"
  | "ADMIN_USERS"
  | "ADMIN_PARTNERS"
  | "ADMIN_SERVICES"
  | "ADMIN_BOOKINGS"
  | "BOOKINGS"
  | "BOOKINGS_NEW"
  | "MESSAGES"
  | "REVIEWS"
  | "PAYMENTS"
  | "COMMISSIONS"
  | "PLATFORM_SETTINGS"
  | "AVAILABILITY"
  | "FEATURED_LISTINGS"
  | "SERVICES_NEW";

type AccessRule = {
  roles: AppRole[];
  partnerStatuses?: PartnerStatus[];
};

export const platformAccessRules: Record<ProtectedPlatformKey, AccessRule> = {
  TRAVELER_DASHBOARD: { roles: ["TRAVELER"] },
  PARTNER_DASHBOARD: { roles: ["PARTNER"], partnerStatuses: ["APPROVED"] },
  PARTNER_PROFILE: { roles: ["PARTNER"], partnerStatuses: ["APPROVED"] },
  PARTNER_BOOKINGS: { roles: ["PARTNER"], partnerStatuses: ["APPROVED"] },
  ADMIN_DASHBOARD: { roles: ["ADMIN"] },
  ADMIN_USERS: { roles: ["ADMIN"] },
  ADMIN_PARTNERS: { roles: ["ADMIN"] },
  ADMIN_SERVICES: { roles: ["ADMIN"] },
  ADMIN_BOOKINGS: { roles: ["ADMIN"] },
  BOOKINGS: { roles: ["TRAVELER"] },
  BOOKINGS_NEW: { roles: ["TRAVELER", "ADMIN"] },
  MESSAGES: { roles: ["TRAVELER", "PARTNER", "ADMIN"], partnerStatuses: ["APPROVED"] },
  REVIEWS: { roles: ["TRAVELER", "PARTNER", "ADMIN"], partnerStatuses: ["APPROVED"] },
  PAYMENTS: { roles: ["PARTNER", "ADMIN"], partnerStatuses: ["APPROVED"] },
  COMMISSIONS: { roles: ["ADMIN"] },
  PLATFORM_SETTINGS: { roles: ["ADMIN"] },
  AVAILABILITY: { roles: ["PARTNER", "ADMIN"], partnerStatuses: ["APPROVED"] },
  FEATURED_LISTINGS: { roles: ["PARTNER", "ADMIN"], partnerStatuses: ["APPROVED"] },
  SERVICES_NEW: { roles: ["PARTNER", "ADMIN"], partnerStatuses: ["APPROVED"] }
};

export function isDemoPreviewAccessAllowed(key: ProtectedPlatformKey) {
  return key === "ADMIN_DASHBOARD" || key === "ADMIN_BOOKINGS";
}

export function canAccessPlatformRoute(
  session: MockAuthSession | null,
  key: ProtectedPlatformKey
) {
  if (!session) {
    return false;
  }

  const rule = platformAccessRules[key];

  if (!rule.roles.includes(session.role)) {
    return false;
  }

  if (session.role === "PARTNER" && rule.partnerStatuses) {
    return !!session.partnerStatus && rule.partnerStatuses.includes(session.partnerStatus);
  }

  return true;
}

export function requirePlatformAccess(options: {
  locale: string;
  key: ProtectedPlatformKey;
  redirectTo?: string;
}) {
  const session = getMockSession();
  const target = options.redirectTo ?? `/${options.locale.toLowerCase()}/signin`;

  if (!session) {
    if (isDemoPreviewAccessAllowed(options.key)) {
      return null;
    }

    redirect(`/${options.locale}/signin?next=${encodeURIComponent(target)}`);
  }

  if (!canAccessPlatformRoute(session, options.key)) {
    if (session.role === "PARTNER" && !isApprovedPartner(session.role, session.partnerStatus)) {
      redirect(`/${options.locale}/partner/apply?status=${session.partnerStatus ?? "PENDING"}`);
    }

    redirect(
      `/${options.locale}/signin?denied=${options.key}&next=${encodeURIComponent(target)}`
    );
  }

  return session;
}

export function getProtectedKeyForPath(locale: string, path: string): ProtectedPlatformKey | null {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const base = `/${locale}`;

  const mappings: Array<[string, ProtectedPlatformKey]> = [
    [`${base}/traveler`, "TRAVELER_DASHBOARD"],
    [`${base}/partner/dashboard`, "PARTNER_DASHBOARD"],
    [`${base}/partner/profile`, "PARTNER_PROFILE"],
    [`${base}/partner/bookings`, "PARTNER_BOOKINGS"],
    [`${base}/admin/users`, "ADMIN_USERS"],
    [`${base}/admin/partners`, "ADMIN_PARTNERS"],
    [`${base}/admin/services`, "ADMIN_SERVICES"],
    [`${base}/admin/bookings`, "ADMIN_BOOKINGS"],
    [`${base}/admin`, "ADMIN_DASHBOARD"],
    [`${base}/bookings/new`, "BOOKINGS_NEW"],
    [`${base}/bookings`, "BOOKINGS"],
    [`${base}/messages`, "MESSAGES"],
    [`${base}/reviews`, "REVIEWS"],
    [`${base}/payments`, "PAYMENTS"],
    [`${base}/commissions`, "COMMISSIONS"],
    [`${base}/platform-settings`, "PLATFORM_SETTINGS"],
    [`${base}/availability`, "AVAILABILITY"],
    [`${base}/featured-listings`, "FEATURED_LISTINGS"],
    [`${base}/services/new`, "SERVICES_NEW"]
  ];

  const matched = mappings.find(([href]) => normalized === href || normalized.startsWith(`${href}/`));
  return matched?.[1] ?? null;
}

export function getRouteLabelForPath(locale: string, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const labels: Array<[string, string]> = [
    [`/${locale}/messages`, "Messages"],
    [`/${locale}/bookings`, "Bookings"],
    [`/${locale}/traveler`, "Traveler Dashboard"],
    [`/${locale}/partner/dashboard`, "Partner Dashboard"],
    [`/${locale}/partner/profile`, "Partner Profile"],
    [`/${locale}/partner/bookings`, "Partner Booking Requests"],
    [`/${locale}/admin/users`, "User Management"],
    [`/${locale}/admin/partners`, "Partner Management"],
    [`/${locale}/admin/services`, "Service Approval"],
    [`/${locale}/admin/bookings`, "Booking Control"],
    [`/${locale}/admin`, "Admin Dashboard"],
    [`/${locale}/bookings/new`, "Request Booking"],
    [`/${locale}/payments`, "Payments"],
    [`/${locale}/reviews`, "Reviews"],
    [`/${locale}/availability`, "Availability Calendar"],
    [`/${locale}/featured-listings`, "Featured Listings"],
    [`/${locale}/commissions`, "Commissions"],
    [`/${locale}/platform-settings`, "Platform Settings"],
    [`/${locale}/services/new`, "New Service"],
    [`/${locale}/services`, "Services"]
  ];

  const matched = labels.find(([href]) => normalized === href || normalized.startsWith(`${href}/`));
  return matched?.[1] ?? "that area";
}

function appendAccessNotice(targetPath: string, requestedPath: string) {
  const params = new URLSearchParams();
  params.set("notice", "role-mismatch");
  params.set("from", requestedPath);
  return `${targetPath}${targetPath.includes("?") ? "&" : "?"}${params.toString()}`;
}

export function resolvePostSignInRedirect(options: {
  locale: string;
  role: AppRole;
  partnerStatus?: PartnerStatus;
  requestedPath?: string | null;
}): PostSignInRedirectResult {
  const fallback = getRoleHomeRoute(options.locale as Locale, options.role);
  const requestedPath = options.requestedPath;

  if (!requestedPath) {
    return {
      redirectTo: fallback,
      downgraded: false
    };
  }

  const protectedKey = getProtectedKeyForPath(options.locale, requestedPath);

  if (!protectedKey) {
    return {
      redirectTo: requestedPath,
      downgraded: false
    };
  }

  const mockSession: MockAuthSession = {
    role: options.role,
    partnerStatus: options.role === "PARTNER" ? options.partnerStatus ?? null : null,
    displayName: `${options.role} foundation session`
  };

  if (canAccessPlatformRoute(mockSession, protectedKey)) {
    return {
      redirectTo: requestedPath,
      downgraded: false
    };
  }

  return {
    redirectTo: appendAccessNotice(fallback, requestedPath),
    downgraded: true
  };
}
