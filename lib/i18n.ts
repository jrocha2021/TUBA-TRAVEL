import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import pt from "@/messages/pt.json";
export const locales = ["en", "fr", "pt"] as const;

export type Locale = (typeof locales)[number];

type NavMessages = {
  home: string;
  experiences: string;
  destinations: string;
  transfers: string;
  howItWorks: string;
  partners: string;
  about: string;
  contact: string;
  bookNow: string;
};

type FooterMessages = {
  tagline: string;
  description: string;
  quickLinksTitle: string;
  contactTitle: string;
  whatsapp: string;
  rights: string;
};

type CommonMessages = {
  explore: string;
  learnMore: string;
  viewTours: string;
  sendInquiry: string;
  chatOnWhatsapp: string;
  bookViaWhatsapp: string;
  bookNow: string;
  bookTransfer: string;
  requestTransfer: string;
  bookTour: string;
  bookDayTrip: string;
  bookExperience: string;
  becomePartner: string;
  partnerInquiry: string;
};

type PageMessages = {
  title: string;
  description: string;
};

type DestinationCard = {
  slug: string;
  title: string;
  description: string;
  tag: string;
};

type ExperienceCard = {
  id: string;
  title: string;
  description: string;
  tag: string;
};

type ExperienceCardOverride = {
  description: string;
  tag: string;
};

type IslandExperienceMessages = {
  name: string;
  badge: string;
  title: string;
  description: string;
  emphasis: string;
  cardOrder: string[];
  cardOverrides: Record<string, ExperienceCardOverride>;
};

type HeroMessages = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  tertiaryAction: string;
  marketplaceFocus: string[];
  trustHighlights: string[];
};

type ShowcaseItem = {
  title: string;
  description: string;
  tag: string;
};

type FuturePlatformItem = {
  title: string;
  description: string;
  label: string;
};

type ProfilePreviewItem = {
  type: string;
  name: string;
  location: string;
  services: string;
  specialties: string;
  badge: string;
  primaryAction: string;
  secondaryAction: string;
};

type PromoSafeguardItem = {
  title: string;
  description: string;
};

type MarketplaceExperienceItem = {
  category: string;
  title: string;
  location: string;
  price: string;
  duration: string;
  description: string;
  buttonLabel: string;
};

type MarketplaceDestinationItem = {
  slug: string;
  title: string;
  description: string;
  bestFor: string;
  buttonLabel: string;
};

type SectionMessages = {
  eyebrow: string;
  title: string;
  description: string;
};

type WhyChooseUsItem = {
  title: string;
  description: string;
};

type TransferItem = {
  title: string;
  location: string;
  price: string;
  description: string;
  buttonLabel: string;
};

type PartnerItem = {
  type: string;
  title: string;
  description: string;
  benefits: string[];
  buttonLabel: string;
};

type HowItWorksStep = {
  title: string;
  description: string;
};

type CtaMessages = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
};

type AboutSection = {
  title: string;
  description: string;
};

type ContactField = {
  label: string;
  placeholder: string;
  options?: string[];
};

type ContactSection = {
  title: string;
  description: string;
};

type PageHeroSection = {
  eyebrow: string;
  title: string;
  description: string;
};

export type Messages = {
  brand: {
    name: string;
    location: string;
  };
  nav: NavMessages;
  footer: FooterMessages;
  common: CommonMessages;
  home: {
    hero: HeroMessages;
    transfers: SectionMessages & {
      items: TransferItem[];
      helper: string;
      buttonLabel: string;
    };
    popularExperiences: SectionMessages & {
      items: MarketplaceExperienceItem[];
    };
    destinations: SectionMessages & {
      items: MarketplaceDestinationItem[];
    };
    howItWorks: {
      eyebrow: string;
      title: string;
      steps: HowItWorksStep[];
    };
    partnerOpportunities: SectionMessages & {
      items: PartnerItem[];
      primaryAction: string;
      secondaryAction: string;
    };
    whyChooseUs: SectionMessages & {
      items: WhyChooseUsItem[];
    };
    futurePlatform: SectionMessages & {
      label: string;
      items: FuturePlatformItem[];
    };
    partnerJourney: SectionMessages & {
      label: string;
      steps: HowItWorksStep[];
    };
    profilePreviews: SectionMessages & {
      label: string;
      items: ProfilePreviewItem[];
    };
    promoSystem: SectionMessages & {
      label: string;
      levels: ShowcaseItem[];
      safeguards: PromoSafeguardItem[];
      note: string;
    };
    adminPreview: SectionMessages & {
      label: string;
      items: FuturePlatformItem[];
    };
    whatsappCta: CtaMessages;
    inquiry: SectionMessages;
  };
  destinations: {
    intro: PageMessages & {
      eyebrow: string;
    };
    cards: DestinationCard[];
    exploreButton: string;
  };
  experiences: {
    intro: PageMessages & {
      eyebrow: string;
    };
    selectionLabel: string;
    switchIslandLabel: string;
    allIslandsLabel: string;
    cards: (ExperienceCard & {
      location: string;
      duration: string;
      price: string;
      buttonLabel: string;
    })[];
    islands: Record<string, IslandExperienceMessages>;
    ctaButton: string;
  };
  transfers: {
    hero: PageHeroSection;
    intro: string;
    manualConfirmation: string;
    items: TransferItem[];
    privateDriver: {
      title: string;
      description: string;
      buttonLabel: string;
    };
    cta: CtaMessages;
  };
  partners: {
    hero: PageHeroSection;
    intro: string;
    steps: HowItWorksStep[];
    items: PartnerItem[];
    cta: CtaMessages;
  };
  about: {
    hero: PageMessages & {
      eyebrow: string;
      highlights: string[];
    };
    whoWeAre: AboutSection;
    vision: AboutSection;
    approach: AboutSection;
    whyTravelWithUs: AboutSection;
  };
  contact: {
    hero: PageMessages & {
      eyebrow: string;
      trustMessage: string;
    };
    whatsapp: ContactSection & {
      button: string;
      phone: string;
    };
    email: ContactSection & {
      button: string;
      address: string;
    };
    form: {
      title: string;
      description: string;
      submitButton: string;
      submittingButton: string;
      successTitle: string;
      successDescription: string;
      resetButton: string;
      errorMessage: string;
      validation: {
        required: string;
        invalidEmail: string;
        invalidWhatsappNumber: string;
      };
      fields: {
        fullName: ContactField;
        email: ContactField;
        whatsappNumber: ContactField;
        preferredDestination: ContactField;
        serviceInterestedIn: ContactField;
        travelDate: ContactField;
        numberOfTravelers: ContactField;
        message: ContactField;
      };
    };
  };
};

const messagesByLocale = {
  en,
  fr,
  pt
} as const;

function mergeMessages<T>(base: T, override: unknown): T {
  if (
    base === null ||
    typeof base !== "object" ||
    Array.isArray(base) ||
    override === null ||
    typeof override !== "object" ||
    Array.isArray(override)
  ) {
    return (override as T) ?? base;
  }

  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };

  Object.entries(override as Record<string, unknown>).forEach(([key, value]) => {
    const baseValue = result[key];
    if (
      baseValue &&
      typeof baseValue === "object" &&
      !Array.isArray(baseValue) &&
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      result[key] = mergeMessages(baseValue, value);
      return;
    }

    result[key] = value;
  });

  return result as T;
}

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getMessages(locale: Locale): Messages {
  return mergeMessages(en as Messages, messagesByLocale[locale]);
}

export function getNavigationLinks(locale: Locale) {
  const labels = getMessages(locale).nav;

  return [
    { href: `/${locale}`, label: labels.home },
    { href: `/${locale}/experiences`, label: labels.experiences },
    { href: `/${locale}/destinations`, label: labels.destinations },
    { href: `/${locale}/transfers`, label: labels.transfers },
    { href: `/${locale}/#how-it-works`, label: labels.howItWorks },
    { href: `/${locale}/partners`, label: labels.partners },
    { href: `/${locale}/about`, label: labels.about },
    { href: `/${locale}/contact`, label: labels.contact }
  ];
}
