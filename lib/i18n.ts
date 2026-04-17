import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import pt from "@/messages/pt.json";
export const locales = ["en", "fr", "pt"] as const;

export type Locale = (typeof locales)[number];

type NavMessages = {
  home: string;
  destinations: string;
  experiences: string;
  about: string;
  contact: string;
};

type FooterMessages = {
  tagline: string;
  rights: string;
};

type CommonMessages = {
  explore: string;
  learnMore: string;
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
  highlights: string[];
};

type ShowcaseItem = {
  title: string;
  description: string;
  tag: string;
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
};

type ContactSection = {
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
    destinations: SectionMessages & {
      items: ShowcaseItem[];
    };
    experiences: SectionMessages & {
      items: ShowcaseItem[];
    };
    whyChooseUs: SectionMessages & {
      items: WhyChooseUsItem[];
    };
    cta: CtaMessages;
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
    cards: ExperienceCard[];
    islands: Record<string, IslandExperienceMessages>;
    ctaButton: string;
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

const messagesByLocale: Record<Locale, Messages> = {
  en,
  fr,
  pt
};

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getMessages(locale: Locale): Messages {
  return messagesByLocale[locale];
}

export function getNavigationLinks(locale: Locale) {
  const labels = getMessages(locale).nav;

  return [
    { href: `/${locale}`, label: labels.home },
    { href: `/${locale}/destinations`, label: labels.destinations },
    { href: `/${locale}/experiences`, label: labels.experiences },
    { href: `/${locale}/about`, label: labels.about },
    { href: `/${locale}/contact`, label: labels.contact }
  ];
}
