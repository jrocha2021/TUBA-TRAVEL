import type { PartnerStatus, PartnerType } from "@/lib/auth/roles";
import { partnerStatusLabels, partnerTypeLabels } from "@/lib/auth/roles";

export const serviceApprovalStatuses = [
  "DRAFT",
  "PENDING_REVIEW",
  "APPROVED",
  "REJECTED",
  "SUSPENDED"
] as const;
export type ServiceApprovalStatus = (typeof serviceApprovalStatuses)[number];

export const serviceAvailabilityStatuses = ["OPEN", "LIMITED", "ON_REQUEST", "PAUSED"] as const;
export type ServiceAvailabilityStatus = (typeof serviceAvailabilityStatuses)[number];

export const serviceCategories = [
  "Island Tour",
  "Airport Transfer",
  "Hotel Stay",
  "Airbnb Stay",
  "Food Experience",
  "Boat Tour",
  "Cultural Experience",
  "Private Driver",
  "Custom Travel Plan"
] as const;
export type ServiceCategory = (typeof serviceCategories)[number];

export type PartnerProfileRecord = {
  slug: string;
  businessName: string;
  partnerType: PartnerType;
  island: string;
  city: string;
  shortBio: string;
  fullDescription: string;
  languages: string[];
  contactEmail: string;
  businessPhone: string;
  profileImage: string;
  gallery: string[];
  verificationStatus: PartnerStatus;
  serviceAreas: string[];
  yearsOfExperience: number;
  documentsStatus: string;
  profileCompletion: number;
  rating: string;
  reviewCount: number;
  reviewPreview: string;
};

export type ServiceRecord = {
  slug: string;
  partnerSlug: string;
  title: string;
  category: ServiceCategory;
  island: string;
  city: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  currency: string;
  duration: string;
  capacity: string;
  languages: string[];
  availabilitySummary: string;
  meetingPoint: string;
  includedItems: string[];
  excludedItems: string[];
  cancellationPolicy: string;
  availabilityStatus: ServiceAvailabilityStatus;
  approvalStatus: ServiceApprovalStatus;
  featuredEligible: boolean;
  image: string;
  gallery: string[];
};

export const partnerProfiles: PartnerProfileRecord[] = [
  {
    slug: "mindelo-cultural-guide-collective",
    businessName: "Mindelo Cultural Guide Collective",
    partnerType: "cultural-experience-provider",
    island: "São Vicente",
    city: "Mindelo",
    shortBio: "Music, culture, and local storytelling experiences led by multilingual guides.",
    fullDescription:
      "Mindelo Cultural Guide Collective curates walking tours, food and music routes, and immersive neighborhood storytelling across São Vicente for travelers who want locally hosted discovery.",
    languages: ["English", "Portuguese", "French", "Kriolu"],
    contactEmail: "partners@tubatour.cv",
    businessPhone: "Official TubaTour business contact",
    profileImage: "/images/tubatour/experience-sao-vicente.jpg",
    gallery: [
      "/images/tubatour/experience-sao-vicente.jpg",
      "/images/tubatour/destination-santiago.jpg"
    ],
    verificationStatus: "APPROVED",
    serviceAreas: ["Mindelo", "São Pedro", "Baía das Gatas"],
    yearsOfExperience: 8,
    documentsStatus: "Business registration, guide ID, and insurance placeholders ready for verification sync.",
    profileCompletion: 92,
    rating: "4.9",
    reviewCount: 38,
    reviewPreview: "Travelers consistently highlight warm hosting, strong local storytelling, and reliable organization."
  },
  {
    slug: "praia-airport-driver-network",
    businessName: "Praia Airport Driver Network",
    partnerType: "airport-transfer-driver",
    island: "Santiago",
    city: "Praia",
    shortBio: "Private transfer and private driver network covering airport arrivals and city routes.",
    fullDescription:
      "Praia Airport Driver Network supports airport pickup, hotel transfers, point-to-point city service, and custom driver requests with a structured operations profile ready for booking and dispatch.",
    languages: ["English", "Portuguese"],
    contactEmail: "partners@tubatour.cv",
    businessPhone: "Official TubaTour business contact",
    profileImage: "/images/tubatour/home-hero.jpg",
    gallery: [
      "/images/tubatour/home-hero.jpg",
      "/images/tubatour/experience-santiago.jpg"
    ],
    verificationStatus: "PENDING",
    serviceAreas: ["Praia", "Nelson Mandela Airport", "Cidade Velha", "Tarrafal"],
    yearsOfExperience: 5,
    documentsStatus: "Driver license, transfer insurance, and vehicle compliance placeholders ready for admin review.",
    profileCompletion: 74,
    rating: "4.7",
    reviewCount: 19,
    reviewPreview: "Recent travelers mention smooth arrivals, quick communication, and flexible route coordination."
  },
  {
    slug: "ana-silva",
    businessName: "Ana Silva",
    partnerType: "tour-guide",
    island: "Santiago",
    city: "Praia",
    shortBio: "Private guide for city culture, heritage routes, food stops, and custom Cape Verde trip planning.",
    fullDescription:
      "Ana Silva is a Praia-based tourism partner focused on private cultural routes, Cidade Velha history, local markets, food discovery, and custom planning for travelers who want a guided Cape Verde experience with strong local context.",
    languages: ["English", "Portuguese", "French"],
    contactEmail: "partners@tubatour.cv",
    businessPhone: "Official TubaTour business contact",
    profileImage: "/images/tubatour/experience-santiago.jpg",
    gallery: [
      "/images/tubatour/experience-santiago.jpg",
      "/images/tubatour/destination-santiago.jpg",
      "/images/tubatour/home-hero.jpg"
    ],
    verificationStatus: "APPROVED",
    serviceAreas: ["Praia", "Cidade Velha", "Tarrafal"],
    yearsOfExperience: 7,
    documentsStatus: "Guide license, identity verification, and partner trust checks prepared for admin review sync.",
    profileCompletion: 96,
    rating: "4.9",
    reviewCount: 27,
    reviewPreview: "Guests describe Ana as knowledgeable, welcoming, and especially strong at adapting tours to real traveler interests."
  }
];

export const servicesCatalog: ServiceRecord[] = [
  {
    slug: "cidade-velha-heritage-walk",
    partnerSlug: "mindelo-cultural-guide-collective",
    title: "Cidade Velha Heritage Walk",
    category: "Cultural Experience",
    island: "Santiago",
    city: "Cidade Velha",
    shortDescription: "UNESCO heritage storytelling route with local guide insight and flexible pickup coordination.",
    fullDescription:
      "A half-day guided experience through Cidade Velha, combining history, architecture, local context, and optional market or waterfront stops for travelers seeking depth and comfort.",
    price: "55",
    currency: "USD",
    duration: "Half day",
    capacity: "Up to 10 travelers",
    languages: ["English", "Portuguese", "French"],
    availabilitySummary: "Open weekly departures with private group upgrades available.",
    meetingPoint: "Cidade Velha welcome point or central Praia hotel pickup",
    includedItems: ["Local guide", "Heritage route planning", "Pickup coordination"],
    excludedItems: ["Meals", "Entry fees outside itinerary", "Private vehicle upgrade"],
    cancellationPolicy: "Free changes up to 48 hours before start. Later changes reviewed case by case.",
    availabilityStatus: "OPEN",
    approvalStatus: "APPROVED",
    featuredEligible: true,
    image: "/images/tubatour/destination-santiago.jpg",
    gallery: [
      "/images/tubatour/destination-santiago.jpg",
      "/images/tubatour/experience-santiago.jpg"
    ]
  },
  {
    slug: "praia-airport-private-transfer",
    partnerSlug: "praia-airport-driver-network",
    title: "Praia Airport Private Transfer",
    category: "Airport Transfer",
    island: "Santiago",
    city: "Praia",
    shortDescription: "Private airport pickup to hotel, Airbnb, or meeting point with traveler messaging support.",
    fullDescription:
      "A professional arrival transfer service designed for secure pickup coordination, baggage handling, and direct routing from Nelson Mandela Airport to your destination in Praia and nearby areas.",
    price: "35",
    currency: "USD",
    duration: "30–45 min",
    capacity: "1–6 travelers",
    languages: ["English", "Portuguese"],
    availabilitySummary: "Airport arrivals supported daily with limited late-night capacity.",
    meetingPoint: "Nelson Mandela Airport arrivals hall",
    includedItems: ["Airport pickup", "Baggage assistance", "Arrival coordination message"],
    excludedItems: ["Extra stopovers", "Late-night route surcharge where applicable"],
    cancellationPolicy: "Free cancellation up to 24 hours before arrival time.",
    availabilityStatus: "LIMITED",
    approvalStatus: "PENDING_REVIEW",
    featuredEligible: true,
    image: "/images/tubatour/home-hero.jpg",
    gallery: [
      "/images/tubatour/home-hero.jpg",
      "/images/tubatour/experience-santiago.jpg"
    ]
  },
  {
    slug: "mindelo-music-and-food-evening",
    partnerSlug: "mindelo-cultural-guide-collective",
    title: "Mindelo Music and Food Evening",
    category: "Food Experience",
    island: "São Vicente",
    city: "Mindelo",
    shortDescription: "Hosted evening route combining local cuisine, live music context, and curated partner venues.",
    fullDescription:
      "An evening experience designed around Cape Verdean food, local music culture, and city hosting. Travelers move through selected venues with a guide who coordinates pacing and local insight.",
    price: "65",
    currency: "USD",
    duration: "3 hours",
    capacity: "Up to 8 travelers",
    languages: ["English", "Portuguese", "French", "Kriolu"],
    availabilitySummary: "Hosted on selected evenings or by private request.",
    meetingPoint: "Mindelo city center meeting point",
    includedItems: ["Guide hosting", "Partner venue coordination", "Cultural route planning"],
    excludedItems: ["Personal food upgrades", "Private transport"],
    cancellationPolicy: "Free changes up to 48 hours before start.",
    availabilityStatus: "ON_REQUEST",
    approvalStatus: "DRAFT",
    featuredEligible: false,
    image: "/images/tubatour/experience-sao-vicente.jpg",
    gallery: [
      "/images/tubatour/experience-sao-vicente.jpg",
      "/images/tubatour/destination-santo-antao.jpg"
    ]
  },
  {
    slug: "praia-city-culture-tour",
    partnerSlug: "ana-silva",
    title: "Praia City and Culture Tour",
    category: "Island Tour",
    island: "Santiago",
    city: "Praia",
    shortDescription: "Private guided city route through viewpoints, neighborhoods, markets, and everyday Cabo Verdean life.",
    fullDescription:
      "A flexible city route hosted by Ana Silva, combining Praia's historic core, market culture, local food stops, viewpoint moments, and practical traveler orientation for first-time visitors.",
    price: "45",
    currency: "USD",
    duration: "2–3 hours",
    capacity: "Up to 6 travelers",
    languages: ["English", "Portuguese", "French"],
    availabilitySummary: "Open private departures with flexible morning and afternoon starts.",
    meetingPoint: "Praia city center hotel pickup or agreed meeting point",
    includedItems: ["Private guide", "Route planning", "Local recommendations"],
    excludedItems: ["Meals", "Private transport upgrade", "Optional attraction fees"],
    cancellationPolicy: "Free changes up to 24 hours before start.",
    availabilityStatus: "OPEN",
    approvalStatus: "APPROVED",
    featuredEligible: true,
    image: "/images/tubatour/experience-santiago.jpg",
    gallery: [
      "/images/tubatour/experience-santiago.jpg",
      "/images/tubatour/destination-santiago.jpg"
    ]
  },
  {
    slug: "cidade-velha-and-tarrafal-day-plan",
    partnerSlug: "ana-silva",
    title: "Cidade Velha and Tarrafal Day Plan",
    category: "Custom Travel Plan",
    island: "Santiago",
    city: "Praia",
    shortDescription: "Full-day guided route combining heritage, scenic coastal stops, and a curated beach-town schedule.",
    fullDescription:
      "A private full-day route designed for travelers who want the main historical and beach highlights of Santiago with guide coordination, local context, and flexible pacing.",
    price: "95",
    currency: "USD",
    duration: "Full day",
    capacity: "Up to 4 travelers",
    languages: ["English", "Portuguese", "French"],
    availabilitySummary: "Custom date planning available with 48-hour lead time.",
    meetingPoint: "Praia hotel pickup area",
    includedItems: ["Guide planning", "Custom routing", "Day coordination support"],
    excludedItems: ["Meals", "Driver upgrade", "Optional attraction costs"],
    cancellationPolicy: "Free changes up to 48 hours before departure.",
    availabilityStatus: "ON_REQUEST",
    approvalStatus: "APPROVED",
    featuredEligible: true,
    image: "/images/tubatour/destination-santiago.jpg",
    gallery: [
      "/images/tubatour/destination-santiago.jpg",
      "/images/tubatour/home-hero.jpg"
    ]
  }
];

export function getPartnerProfileBySlug(slug: string) {
  return partnerProfiles.find((profile) => profile.slug === slug) ?? null;
}

export function getServicesByPartnerSlug(partnerSlug: string) {
  return servicesCatalog.filter((service) => service.partnerSlug === partnerSlug);
}

export function getServiceBySlug(slug: string) {
  return servicesCatalog.find((service) => service.slug === slug) ?? null;
}

export function getPartnerTypeLabel(partnerType: PartnerType) {
  return partnerTypeLabels[partnerType];
}

export function getVerificationStatusLabel(status: PartnerStatus) {
  return partnerStatusLabels[status];
}

export function getServiceApprovalLabel(status: ServiceApprovalStatus) {
  switch (status) {
    case "DRAFT":
      return "Draft";
    case "PENDING_REVIEW":
      return "Pending approval";
    case "APPROVED":
      return "Approved";
    case "REJECTED":
      return "Rejected";
    case "SUSPENDED":
      return "Suspended";
  }
}

export function getAvailabilityStatusLabel(status: ServiceAvailabilityStatus) {
  switch (status) {
    case "OPEN":
      return "Open";
    case "LIMITED":
      return "Limited";
    case "ON_REQUEST":
      return "On request";
    case "PAUSED":
      return "Paused";
  }
}

export function getStatusPillClass(status: string) {
  if (status === "APPROVED" || status === "OPEN") {
    return "border border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
  }

  if (status === "PENDING_REVIEW" || status === "LIMITED" || status === "ON_REQUEST") {
    return "border border-brand-gold/30 bg-brand-gold/10 text-brand-sand";
  }

  if (status === "REJECTED" || status === "SUSPENDED" || status === "PAUSED") {
    return "border border-rose-400/30 bg-rose-400/10 text-rose-200";
  }

  return "border border-white/10 bg-white/5 text-brand-muted";
}
