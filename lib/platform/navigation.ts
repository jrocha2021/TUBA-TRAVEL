import type { Locale } from "@/lib/i18n";
import type { AppRole } from "@/lib/auth/roles";
import type { MockAuthSession } from "@/lib/auth/session";
import type { ProtectedPlatformKey } from "@/lib/auth/access";
import { canAccessPlatformRoute } from "@/lib/auth/access";

export type PlatformNavLink = {
  href: string;
  label: string;
  protectedKey?: ProtectedPlatformKey;
};

export function getPlatformNavigation(locale: Locale): PlatformNavLink[] {
  return [
    { href: `/${locale}/dashboard`, label: "Dashboard Hub" },
    { href: `/${locale}/signin`, label: "Sign In" },
    { href: `/${locale}/traveler`, label: "Traveler Dashboard", protectedKey: "TRAVELER_DASHBOARD" },
    { href: `/${locale}/partner/dashboard`, label: "Partner Dashboard", protectedKey: "PARTNER_DASHBOARD" },
    { href: `/${locale}/partner/profile`, label: "Partner Profile", protectedKey: "PARTNER_PROFILE" },
    { href: `/${locale}/partner/bookings`, label: "Partner Bookings", protectedKey: "PARTNER_BOOKINGS" },
    { href: `/${locale}/admin`, label: "Admin Dashboard", protectedKey: "ADMIN_DASHBOARD" },
    { href: `/${locale}/admin/users`, label: "User Management", protectedKey: "ADMIN_USERS" },
    { href: `/${locale}/admin/partners`, label: "Partner Review", protectedKey: "ADMIN_PARTNERS" },
    { href: `/${locale}/admin/services`, label: "Service Approval", protectedKey: "ADMIN_SERVICES" },
    { href: `/${locale}/admin/bookings`, label: "Booking Control", protectedKey: "ADMIN_BOOKINGS" },
    { href: `/${locale}/services`, label: "Services" },
    { href: `/${locale}/services/new`, label: "New Service", protectedKey: "SERVICES_NEW" },
    { href: `/${locale}/bookings`, label: "Bookings", protectedKey: "BOOKINGS" },
    { href: `/${locale}/bookings/new`, label: "Request Booking", protectedKey: "BOOKINGS_NEW" },
    { href: `/${locale}/payments`, label: "Payments", protectedKey: "PAYMENTS" },
    { href: `/${locale}/messages`, label: "Messages", protectedKey: "MESSAGES" },
    { href: `/${locale}/reviews`, label: "Reviews", protectedKey: "REVIEWS" },
    { href: `/${locale}/availability`, label: "Availability Calendar", protectedKey: "AVAILABILITY" },
    { href: `/${locale}/featured-listings`, label: "Featured Listings", protectedKey: "FEATURED_LISTINGS" },
    { href: `/${locale}/commissions`, label: "Commissions", protectedKey: "COMMISSIONS" },
    { href: `/${locale}/platform-settings`, label: "Platform Settings", protectedKey: "PLATFORM_SETTINGS" }
  ];
}

export function getRoleAwarePlatformNavigation(
  locale: Locale,
  session: MockAuthSession | null
) {
  return getPlatformNavigation(locale).filter((link) => {
    if (!link.protectedKey) {
      return true;
    }

    return canAccessPlatformRoute(session, link.protectedKey);
  });
}

export function getRoleHomeRoute(locale: Locale, role: AppRole) {
  switch (role) {
    case "TRAVELER":
      return `/${locale}/traveler`;
    case "PARTNER":
      return `/${locale}/partner/dashboard`;
    case "ADMIN":
      return `/${locale}/admin`;
  }
}
