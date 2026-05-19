import type { AppRole } from "@/lib/auth/roles";

export type ActionLink = {
  href: string;
  label: string;
  nativeNavigation?: boolean;
};

export type PlatformCard = {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  action?: ActionLink;
};

export const corePlatformModules: PlatformCard[] = [
  {
    eyebrow: "Authentication",
    title: "Role-based access and secure sessions",
    description:
      "Travelers, partners, and admins enter the platform through a unified auth layer with route protection and scoped permissions.",
    bullets: ["Secure account creation", "Role-aware dashboards", "Session management"]
  },
  {
    eyebrow: "Marketplace catalog",
    title: "Destinations, categories, and bookable listings",
    description:
      "Experiences, transfers, stays, restaurants, and curated local services are organized into searchable marketplace inventory.",
    bullets: ["Category browsing", "Featured listings", "Partner public profiles"]
  },
  {
    eyebrow: "Booking engine",
    title: "Bookings, payments, commissions, and messaging",
    description:
      "The long-term platform supports calendar-aware bookings, online payments, automatic commissions, messaging, and post-trip reviews.",
    bullets: ["Availability calendars", "Payment provider ready", "Commission tracking"]
  }
];

export const roleEntryCards: Array<PlatformCard & { role: AppRole }> = [
  {
    role: "TRAVELER",
    eyebrow: "Marketplace access",
    title: "Traveler Account",
    description:
      "Discover experiences, manage bookings, send messages, and leave reviews through one traveler account.",
    bullets: ["Discover experiences", "Manage bookings", "Messages and reviews"],
    action: { href: "/traveler", label: "Open traveler area" }
  },
  {
    role: "PARTNER",
    eyebrow: "Marketplace access",
    title: "Partner Account",
    description:
      "Manage your profile, services, availability, bookings, payments, reviews, and featured listings.",
    bullets: ["Profile and services", "Availability and bookings", "Payments and featured listings"],
    action: { href: "/partner/dashboard", label: "Open partner dashboard" }
  },
  {
    role: "ADMIN",
    eyebrow: "Marketplace access",
    title: "Admin Access",
    description:
      "Manage partners, bookings, payments, commissions, reviews, listings, and platform settings.",
    bullets: ["Partners and users", "Payments and commissions", "Listings and platform settings"],
    action: { href: "/admin", label: "Open admin console" }
  }
];

export const travelerDashboardCards: PlatformCard[] = [
  {
    eyebrow: "Upcoming trips",
    title: "Bookings, itineraries, and trip status",
    description:
      "Travelers see upcoming transfers, tours, reservations, payment status, and arrival notes in a single trip timeline."
  },
  {
    eyebrow: "Saved marketplace",
    title: "Favorites, wishlists, and custom plans",
    description:
      "Customers can save services, shortlist islands, and request custom itineraries from a personal planning area."
  },
  {
    eyebrow: "Trust and support",
    title: "Messages, reviews, and support history",
    description:
      "Every booking can connect to a message thread, review flow, and support record so travelers stay informed."
  }
];

export const partnerDashboardCards: PlatformCard[] = [
  {
    eyebrow: "Listings",
    title: "Publish and manage bookable services",
    description:
      "Partners create tours, transfers, stays, and restaurant offerings with media, pricing, categories, and descriptions."
  },
  {
    eyebrow: "Operations",
    title: "Availability, inquiries, and bookings",
    description:
      "Partner calendars, request inboxes, booking status updates, and guest communication all live in one operations flow."
  },
  {
    eyebrow: "Growth",
    title: "Reviews, featured listings, and commissions",
    description:
      "Partners track public reputation, purchase featured placement, and monitor marketplace commissions and payouts."
  }
];

export const adminDashboardCards: PlatformCard[] = [
  {
    eyebrow: "Approvals",
    title: "Review partner applications and listing quality",
    description:
      "Admins control partner onboarding, listing approval, and compliance checks before services go live."
  },
  {
    eyebrow: "Marketplace control",
    title: "Destinations, categories, featured inventory, and pricing policy",
    description:
      "Core marketplace content and featured placement can be managed centrally by the TubaTours operations team."
  },
  {
    eyebrow: "Finance and trust",
    title: "Commissions, reviews, promotions, and suspicious activity",
    description:
      "The admin layer monitors revenue mechanics, reviews, promo campaigns, and platform abuse signals."
  }
];

export const partnerApplicationSteps: PlatformCard[] = [
  {
    eyebrow: "Step 1",
    title: "Create a partner account",
    description:
      "A guide, driver, hotel, host, restaurant, or experience provider begins with role-based account creation."
  },
  {
    eyebrow: "Step 2",
    title: "Submit a business profile and service details",
    description:
      "The partner profile includes island coverage, specialties, pricing, languages, trust details, and media."
  },
  {
    eyebrow: "Step 3",
    title: "Verification and approval by TubaTours",
    description:
      "The operations team reviews listing quality, legitimacy, destination fit, and marketplace readiness before partner account activation."
  },
  {
    eyebrow: "Step 4",
    title: "Publish services and manage availability",
    description:
      "Approved partners can launch listings, adjust calendars, and respond to bookings from their dashboard."
  }
];

export const partnerProfilePreviewCards: PlatformCard[] = [
  {
    eyebrow: "Guide profile",
    title: "Mindelo Cultural Guide Collective",
    description:
      "São Vicente based team offering music walks, food tours, and local culture itineraries in Portuguese, English, and French.",
    bullets: ["Island: São Vicente", "Services: Tours and local experiences", "Badge: Verified partner"]
  },
  {
    eyebrow: "Driver profile",
    title: "Praia Airport Driver Network",
    description:
      "Transfer specialists covering arrivals, private driver bookings, and custom route support around Santiago.",
    bullets: ["Island: Santiago", "Services: Airport transfer and private driver", "Badge: Verified transport"]
  },
  {
    eyebrow: "Host profile",
    title: "Sal Boutique Stays",
    description:
      "Premium apartment and host network for curated stays, airport pickup coordination, and local recommendations.",
    bullets: ["Island: Sal", "Services: Stays and concierge support", "Badge: Featured host"]
  },
  {
    eyebrow: "Restaurant profile",
    title: "Tarrafal Food and Sunset Club",
    description:
      "Restaurant and experience provider combining local menus, dining events, and cultural evening bookings.",
    bullets: ["Island: Santiago", "Services: Food experiences", "Badge: Verified dining partner"]
  }
];

export const legalPages: PlatformCard[] = [
  {
    eyebrow: "Privacy",
    title: "Privacy policy foundation",
    description:
      "Outlines data collection, booking data processing, vendor data handling, payment provider disclosures, and consent handling."
  },
  {
    eyebrow: "Terms",
    title: "Terms and marketplace policies",
    description:
      "Defines platform responsibilities, partner obligations, booking policies, commissions, and dispute handling."
  }
];

export const implementationPhases: PlatformCard[] = [
  {
    eyebrow: "Phase 1",
    title: "Architecture and route foundation",
    description:
      "Schema, role model, route map, legal pages, cookie consent, and dashboard layouts."
  },
  {
    eyebrow: "Phase 2",
    title: "Database, auth, and protected application state",
    description:
      "Prisma, PostgreSQL, authentication, seeded records, and role-aware middleware."
  },
  {
    eyebrow: "Phase 3",
    title: "Listings, availability, bookings, and messaging",
    description:
      "Partner service creation, booking requests, calendars, traveler messaging, and admin approvals."
  },
  {
    eyebrow: "Phase 4",
    title: "Payments, commissions, featured listings, and reviews",
    description:
      "Transaction flows, payout logic, featured placement purchases, and review moderation."
  }
];

export const publicPartnerProfiles = {
  "mindelo-cultural-guide-collective": partnerProfilePreviewCards[0],
  "praia-airport-driver-network": partnerProfilePreviewCards[1],
  "sal-boutique-stays": partnerProfilePreviewCards[2],
  "tarrafal-food-and-sunset-club": partnerProfilePreviewCards[3]
} as const;
