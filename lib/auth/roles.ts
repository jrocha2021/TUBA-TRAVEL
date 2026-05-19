export const appRoles = ["TRAVELER", "PARTNER", "ADMIN"] as const;

export type AppRole = (typeof appRoles)[number];

export const partnerStatuses = ["PENDING", "APPROVED", "REJECTED", "SUSPENDED"] as const;

export type PartnerStatus = (typeof partnerStatuses)[number];

export const partnerTypes = [
  "tour-guide",
  "airport-transfer-driver",
  "hotel",
  "airbnb-host",
  "restaurant",
  "experience-provider",
  "boat-tour-provider",
  "cultural-experience-provider",
  "custom-travel-planner"
] as const;

export type PartnerType = (typeof partnerTypes)[number];

export const roleLabels: Record<AppRole, string> = {
  TRAVELER: "Traveler",
  PARTNER: "Partner",
  ADMIN: "Admin"
};

export const partnerStatusLabels: Record<PartnerStatus, string> = {
  PENDING: "Pending review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  SUSPENDED: "Suspended"
};

export const partnerTypeLabels: Record<PartnerType, string> = {
  "tour-guide": "Tour guide",
  "airport-transfer-driver": "Airport transfer driver",
  hotel: "Hotel",
  "airbnb-host": "Airbnb host",
  restaurant: "Restaurant",
  "experience-provider": "Local experience provider",
  "boat-tour-provider": "Boat tour provider",
  "cultural-experience-provider": "Cultural experience provider",
  "custom-travel-planner": "Custom travel planner"
};

export const permissions = {
  TRAVELER: [
    "dashboard:traveler",
    "booking:view:own",
    "booking:create",
    "message:view:own",
    "message:send:own",
    "review:create:own",
    "review:view:own",
    "profile:update:own"
  ],
  PARTNER: [
    "dashboard:partner",
    "service:create",
    "service:update:own",
    "service:publish:own",
    "availability:view:own",
    "availability:update:own",
    "booking:view:partner",
    "booking:respond:partner",
    "payment:view:partner",
    "message:view:partner",
    "message:send:partner",
    "review:view:partner",
    "featured:purchase",
    "profile:update:partner"
  ],
  ADMIN: [
    "dashboard:admin",
    "user:view",
    "user:manage",
    "partner:view",
    "partner:approve",
    "partner:suspend",
    "service:approve",
    "service:manage",
    "availability:manage",
    "booking:manage",
    "payment:manage",
    "commission:manage",
    "message:manage",
    "review:moderate",
    "featured:manage",
    "platform:settings",
    "content:manage",
    "security:review"
  ]
} as const;

export type Permission = (typeof permissions)[AppRole][number];

export function isAppRole(value: string | null | undefined): value is AppRole {
  return !!value && appRoles.includes(value as AppRole);
}

export function isPartnerStatus(value: string | null | undefined): value is PartnerStatus {
  return !!value && partnerStatuses.includes(value as PartnerStatus);
}

export function hasPermission(role: AppRole, permission: string) {
  return (permissions[role] as readonly string[]).includes(permission);
}

export function isApprovedPartner(role: AppRole, partnerStatus?: PartnerStatus | null) {
  return role === "PARTNER" && partnerStatus === "APPROVED";
}
