import { getPartnerProfileBySlug, getServiceBySlug } from "@/lib/platform/partner-services";

export const bookingStatuses = [
  "DRAFT",
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "REFUNDED"
] as const;
export type BookingStatus = (typeof bookingStatuses)[number];

export const paymentStatuses = ["UNPAID", "PENDING", "PAID", "PARTIALLY_REFUNDED", "REFUNDED"] as const;
export type PaymentStatus = (typeof paymentStatuses)[number];

export type TravelerRecord = {
  id: string;
  name: string;
  email: string;
};

export type BookingRecord = {
  id: string;
  travelerId: string;
  travelerName: string;
  travelerEmail: string;
  partnerSlug: string;
  partnerName: string;
  serviceSlug: string;
  serviceTitle: string;
  serviceCategory: string;
  island: string;
  location: string;
  date: string;
  time: string;
  guestCount: number;
  priceType: "PER_GUEST" | "BASE_PRICE";
  priceValue: number;
  estimatedTotal: number;
  currency: string;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  commissionEstimate: number;
  specialRequests: string;
  internalNotes: string;
};

export const travelers: TravelerRecord[] = [
  {
    id: "traveler-maya-johnson",
    name: "Maya Johnson",
    email: "traveler@tubatour.cv"
  },
  {
    id: "traveler-luc-bernard",
    name: "Luc Bernard",
    email: "traveler2@tubatour.cv"
  }
];

export const bookingsCatalog: BookingRecord[] = [
  {
    id: "BK-2026-001",
    travelerId: "traveler-maya-johnson",
    travelerName: "Maya Johnson",
    travelerEmail: "traveler@tubatour.cv",
    partnerSlug: "ana-silva",
    partnerName: "Ana Silva",
    serviceSlug: "praia-city-culture-tour",
    serviceTitle: "Praia City and Culture Tour",
    serviceCategory: "Island Tour",
    island: "Santiago",
    location: "Praia",
    date: "2026-06-12",
    time: "09:00",
    guestCount: 2,
    priceType: "PER_GUEST",
    priceValue: 45,
    estimatedTotal: 90,
    currency: "USD",
    bookingStatus: "PENDING",
    paymentStatus: "PENDING",
    commissionEstimate: 13.5,
    specialRequests: "Please include a market stop and a vegetarian lunch recommendation.",
    internalNotes: "Priority follow-up requested within 12 hours."
  },
  {
    id: "BK-2026-002",
    travelerId: "traveler-maya-johnson",
    travelerName: "Maya Johnson",
    travelerEmail: "traveler@tubatour.cv",
    partnerSlug: "mindelo-cultural-guide-collective",
    partnerName: "Mindelo Cultural Guide Collective",
    serviceSlug: "mindelo-music-and-food-evening",
    serviceTitle: "Mindelo Music and Food Evening",
    serviceCategory: "Food Experience",
    island: "São Vicente",
    location: "Mindelo",
    date: "2026-06-21",
    time: "18:30",
    guestCount: 2,
    priceType: "PER_GUEST",
    priceValue: 65,
    estimatedTotal: 130,
    currency: "USD",
    bookingStatus: "CONFIRMED",
    paymentStatus: "PAID",
    commissionEstimate: 19.5,
    specialRequests: "Anniversary dinner atmosphere preferred.",
    internalNotes: "VIP couple experience candidate."
  },
  {
    id: "BK-2026-003",
    travelerId: "traveler-maya-johnson",
    travelerName: "Maya Johnson",
    travelerEmail: "traveler@tubatour.cv",
    partnerSlug: "ana-silva",
    partnerName: "Ana Silva",
    serviceSlug: "cidade-velha-and-tarrafal-day-plan",
    serviceTitle: "Cidade Velha and Tarrafal Day Plan",
    serviceCategory: "Custom Travel Plan",
    island: "Santiago",
    location: "Praia / Tarrafal",
    date: "2026-05-04",
    time: "08:15",
    guestCount: 4,
    priceType: "BASE_PRICE",
    priceValue: 95,
    estimatedTotal: 95,
    currency: "USD",
    bookingStatus: "COMPLETED",
    paymentStatus: "PAID",
    commissionEstimate: 14.25,
    specialRequests: "Need extra time in Tarrafal for photography.",
    internalNotes: "Completed successfully. Review prompt available."
  },
  {
    id: "BK-2026-004",
    travelerId: "traveler-luc-bernard",
    travelerName: "Luc Bernard",
    travelerEmail: "traveler2@tubatour.cv",
    partnerSlug: "praia-airport-driver-network",
    partnerName: "Praia Airport Driver Network",
    serviceSlug: "praia-airport-private-transfer",
    serviceTitle: "Praia Airport Private Transfer",
    serviceCategory: "Airport Transfer",
    island: "Santiago",
    location: "Praia",
    date: "2026-05-28",
    time: "22:10",
    guestCount: 3,
    priceType: "BASE_PRICE",
    priceValue: 35,
    estimatedTotal: 35,
    currency: "USD",
    bookingStatus: "CANCELLED",
    paymentStatus: "UNPAID",
    commissionEstimate: 5.25,
    specialRequests: "Child seat requested.",
    internalNotes: "Canceled by traveler before partner acceptance."
  }
];

export function getBookingStatusLabel(status: BookingStatus) {
  switch (status) {
    case "DRAFT":
      return "Draft";
    case "PENDING":
      return "Pending";
    case "CONFIRMED":
      return "Confirmed";
    case "COMPLETED":
      return "Completed";
    case "CANCELLED":
      return "Cancelled";
    case "REFUNDED":
      return "Refunded";
  }
}

export function getPaymentStatusLabel(status: PaymentStatus) {
  switch (status) {
    case "UNPAID":
      return "Unpaid";
    case "PENDING":
      return "Pending";
    case "PAID":
      return "Paid";
    case "PARTIALLY_REFUNDED":
      return "Partially refunded";
    case "REFUNDED":
      return "Refunded";
  }
}

export function getBookingStatusPillClass(status: BookingStatus | PaymentStatus) {
  if (status === "CONFIRMED" || status === "COMPLETED" || status === "PAID") {
    return "border border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
  }

  if (status === "PENDING" || status === "DRAFT" || status === "PARTIALLY_REFUNDED") {
    return "border border-brand-gold/30 bg-brand-gold/10 text-brand-sand";
  }

  if (status === "CANCELLED" || status === "REFUNDED" || status === "UNPAID") {
    return "border border-rose-400/30 bg-rose-400/10 text-rose-200";
  }

  return "border border-white/10 bg-white/5 text-brand-muted";
}

export function getBookingsByTravelerId(travelerId: string) {
  return bookingsCatalog.filter((booking) => booking.travelerId === travelerId);
}

export function getBookingsByPartnerSlug(partnerSlug: string) {
  return bookingsCatalog.filter((booking) => booking.partnerSlug === partnerSlug);
}

export function getBookingById(id: string) {
  return bookingsCatalog.find((booking) => booking.id === id) ?? null;
}

export function getBookingSummaryForService(serviceSlug: string) {
  const service = getServiceBySlug(serviceSlug);
  if (!service) {
    return null;
  }

  const partner = getPartnerProfileBySlug(service.partnerSlug);
  if (!partner) {
    return null;
  }

  return {
    service,
    partner
  };
}
