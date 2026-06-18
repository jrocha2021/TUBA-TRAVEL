import type { Metadata } from "next";
import Link from "next/link";
import ImagePanel from "@/components/image-panel";
import SectionHeading from "@/components/section-heading";
import WorldCupInquiryForm from "@/components/world-cup-inquiry-form";
import type { Locale } from "@/lib/i18n";
import { siteImages } from "@/lib/site-images";
import { createTripPlanningWhatsAppUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cape Verde World Cup Travel Guide | TubaTour Cabo Verde Experiences",
  description:
    "Cape Verde is on the world stage. Discover Cabo Verde with TubaTour: airport transfers, private tours, island experiences, beaches, culture, music, hiking and local travel support.",
  keywords: [
    "Cape Verde travel",
    "Cabo Verde tourism",
    "Cape Verde World Cup",
    "Blue Sharks",
    "Cape Verde tours",
    "Cabo Verde experiences",
    "airport transfers Cape Verde",
    "Santiago tours",
    "Sal tours",
    "Boa Vista tours",
    "Santo Antão hiking"
  ]
};

type WorldCupCapeVerdePageProps = {
  params: {
    locale: Locale;
  };
};

const whyNowCards = [
  {
    title: "Global football spotlight",
    description:
      "Cape Verde's football moment is drawing fresh attention to the islands and opening a timely window for high-intent travel interest."
  },
  {
    title: "Safe island escape",
    description:
      "Travelers can move from the noise of major host cities into an Atlantic island setting with calm rhythms, ocean air, and easy private support."
  },
  {
    title: "Beaches, culture and music",
    description:
      "From beach stays and seafood lunches to music, coastal history, and local neighborhoods, Cabo Verde offers much more than a single postcard image."
  },
  {
    title: "Local guides and private experiences",
    description:
      "TubaTour helps travelers connect with private transfers, trusted local guides, curated island days, and concierge-style trip planning."
  }
];

const quickOffers = [
  {
    title: "Airport Transfers",
    description:
      "Private airport pickup and drop-off across Cape Verde's main islands.",
    cta: "Request Transfer",
    href: "/transfers",
    image: siteImages.home.destinations[0]
  },
  {
    title: "Private Island Tours",
    description:
      "Discover beaches, mountains, villages, food, music, and hidden local spots.",
    cta: "Plan a Tour",
    href: "whatsapp",
    image: siteImages.home.popularExperiences[1]
  },
  {
    title: "Santiago Cultural Experience",
    description:
      "Explore Praia, Cidade Velha, local markets, coastal views, and authentic Cabo Verde culture.",
    cta: "Explore Santiago",
    href: "santiago",
    image: siteImages.home.popularExperiences[0]
  },
  {
    title: "Sal & Boa Vista Beach Trips",
    description:
      "Premium beach, desert, and relaxation experiences for travelers seeking sun and ocean.",
    cta: "Discover Beach Trips",
    href: "beach",
    image: siteImages.home.destinations[1]
  },
  {
    title: "Santo Antão Hiking",
    description:
      "Mountain valleys, dramatic landscapes, local villages, and unforgettable hiking routes.",
    cta: "Plan Hiking Trip",
    href: "santo-antao",
    image: siteImages.home.destinations[2]
  },
  {
    title: "Cape Verde Trip Concierge",
    description:
      "Let TubaTour help you organize transfers, tours, island-hopping, local experiences, and travel support.",
    cta: "Plan My Trip",
    href: "concierge",
    image: siteImages.home.popularExperiences[3]
  }
];

export default function WorldCupCapeVerdePage({
  params
}: WorldCupCapeVerdePageProps) {
  const { locale } = params;

  function resolveOfferHref(type: string) {
    if (type === "/transfers") {
      return `/${locale}/transfers`;
    }

    if (type === "santiago") {
      return {
        pathname: `/${locale}/experiences`,
        query: { island: "santiago" }
      };
    }

    if (type === "beach") {
      return {
        pathname: `/${locale}/experiences`,
        query: { island: "sal" }
      };
    }

    if (type === "santo-antao") {
      return {
        pathname: `/${locale}/experiences`,
        query: { island: "santo-antao" }
      };
    }

    const serviceLabel =
      type === "whatsapp"
        ? "Private Island Tours"
        : type === "concierge"
          ? "Cape Verde Trip Concierge"
          : "Cape Verde travel support";

    return createTripPlanningWhatsAppUrl(
      `Hello TubaTour, I want to plan a Cape Verde trip. I am interested in ${serviceLabel}. My dates are: ____. Island: ____. Number of travelers: ____.`
    );
  }

  return (
    <div className="brand-page-shell space-y-10 rounded-[2.5rem] px-4 py-4 pb-8 sm:px-6 sm:py-6 lg:px-8">
      <section className="section-space">
        <div className="soft-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="space-y-5">
              <span className="brand-chip">Cape Verde on the world stage</span>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.7rem] lg:leading-[1.02]">
                  Cape Verde Is on the World Stage
                </h1>
                <p className="text-xl font-medium text-brand-sand">
                  Now discover the islands behind the Blue Sharks.
                </p>
                <p className="max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
                  Cape Verde&apos;s football moment is introducing the islands to the world.
                  TubaTour helps travelers discover authentic Cabo Verde experiences, airport
                  transfers, private tours, beaches, culture, music, food, hiking, and
                  island-hopping.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={createTripPlanningWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-primary-button inline-flex items-center justify-center"
                >
                  Plan My Cape Verde Trip
                </a>
                <Link
                  href={`/${locale}/experiences`}
                  className="brand-secondary-button inline-flex items-center justify-center"
                >
                  Explore Experiences
                </Link>
              </div>
              <div className="glass-line rounded-[1.8rem] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-brand-gold">
                  Independent travel guide
                </p>
                <p className="mt-3 text-sm leading-7 text-brand-muted">
                  TubaTour uses general editorial language only and does not use official
                  tournament marks or imply any official event partnership.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <ImagePanel
                image={siteImages.home.hero}
                aspect="wide"
                priority
                overlayClassName="bg-[linear-gradient(180deg,rgba(3,4,3,0.08),rgba(3,4,3,0.08)_28%,rgba(7,20,16,0.36)_72%,rgba(3,4,3,0.56)_100%)]"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {["Blue Sharks spirit", "Private island travel", "Culture, beaches, music", "Airport to island support"].map(
                  (item) => (
                    <div key={item} className="home-brand-line rounded-[1.5rem] p-4">
                      <p className="text-sm font-medium text-white">{item}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space space-y-8">
        <SectionHeading
          eyebrow="Why visit Cape Verde now?"
          title="A global spotlight moment with island depth behind it"
          description="The football conversation brings attention. The beaches, music, mountains, local culture, and private travel support are what turn that attention into a real trip."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {whyNowCards.map((item) => (
            <article key={item.title} className="soft-panel p-6">
              <h2 className="text-xl font-semibold tracking-tight text-white">{item.title}</h2>
              <p className="mt-4 text-base leading-7 text-brand-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space space-y-8">
        <SectionHeading
          eyebrow="Featured quick offers"
          title="Immediate travel offers built for lead generation and booking inquiries"
          description="These are the high-intent services TubaTour can promote right now while Cape Verde is top of mind for a global audience."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {quickOffers.map((offer) => {
            const resolvedHref = resolveOfferHref(offer.href);
            const isExternal = typeof resolvedHref === "string";

            return (
              <article key={offer.title} className="soft-panel flex h-full flex-col p-6">
                <ImagePanel
                  image={offer.image}
                  aspect="landscape"
                  className="border border-white/10"
                  overlayClassName="bg-gradient-to-t from-black/60 via-black/12 to-transparent"
                />
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                  {offer.title}
                </h3>
                <p className="mt-4 flex-1 text-base leading-7 text-brand-muted">
                  {offer.description}
                </p>
                {isExternal ? (
                  <a
                    href={resolvedHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brand-primary-button mt-6 inline-flex w-full justify-center sm:w-fit"
                  >
                    {offer.cta}
                  </a>
                ) : (
                  <Link
                    href={resolvedHref}
                    className="brand-primary-button mt-6 inline-flex w-full justify-center sm:w-fit"
                  >
                    {offer.cta}
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section id="world-cup-inquiry" className="section-space scroll-mt-36">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="soft-panel p-6 sm:p-8">
            <SectionHeading
              eyebrow="Travel inquiry"
              title="Tell us what kind of Cape Verde trip you want"
              description="Use this quick frontend-only form to share your dates, islands, traveler count, and the service you need. TubaTour can then continue the conversation by WhatsApp or email."
            />
          </div>

          <div className="soft-panel p-6 sm:p-8">
            <WorldCupInquiryForm />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.18),rgba(7,11,18,0.98)_34%,rgba(7,11,18,0.98)_70%,rgba(245,199,107,0.2))] px-6 py-8 text-white shadow-[0_24px_70px_rgba(0,0,0,0.4)] sm:px-8 lg:px-10">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm uppercase tracking-[0.24em] text-white/55">
                Ready to discover Cape Verde?
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Speak with TubaTour about your island plan
              </h2>
              <p className="text-base leading-7 text-brand-muted sm:text-lg">
                Tell us your travel dates, island, number of travelers, and what kind of
                experience you want.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <a
                href={createTripPlanningWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-primary-button inline-flex items-center justify-center"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
