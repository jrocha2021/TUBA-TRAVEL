import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/contact-form";
import ImagePanel from "@/components/image-panel";
import SectionHeading from "@/components/section-heading";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { siteImages } from "@/lib/site-images";
import {
  createPartnerWhatsAppUrl,
  createTripPlanningWhatsAppUrl,
  createTravelerWhatsAppUrl,
  siteConfig
} from "@/lib/site-config";

type HomePageProps = {
  params: {
    locale: Locale;
  };
};

export default function HomePage({ params }: HomePageProps) {
  const messages = getMessages(params.locale);
  const { locale } = params;
  const heroStats = [
    "Airport transfers",
    "Local guides",
    "Island experiences",
    "Booking-ready platform"
  ];
  const merchandiseItems = [
    {
      title: "TubaTour Premium T-Shirt",
      image: "/images/merchandise/tubatour-premium-tshirt.jpeg",
      description:
        "Matte black official TubaTour travel tee designed for island explorers.",
      imageClassName: "max-h-[13.4rem] brightness-[1.06] contrast-[1.03] sm:max-h-[14.4rem]"
    },
    {
      title: "TubaTour Luxury Hoodie",
      image: "/images/merchandise/tubatour-luxury-hoodie.jpeg",
      description:
        "Dark premium hoodie with TubaTour Cabo Verde Experiences branding and coastal wave accents.",
      imageClassName: "max-h-[13.8rem] brightness-[1.07] contrast-[1.04] sm:max-h-[14.8rem]"
    },
    {
      title: "TubaTour Full Tracksuit",
      image: "/images/merchandise/tubatour-full-tracksuit.jpeg",
      description:
        "Deep navy full tracksuit designed for premium travel comfort and island lifestyle.",
      imageClassName: "max-h-[14.6rem] brightness-[1.08] contrast-[1.03] sm:max-h-[15.8rem]"
    },
    {
      title: "TubaTour Premium Cap",
      image: "/images/merchandise/tubatour-premium-cap.jpeg",
      description:
        "Matte black curved-brim travel cap with embroidered TubaTour branding.",
      imageClassName: "max-h-[12.75rem] brightness-[1.18] contrast-[1.08] saturate-[1.04] sm:max-h-[13.75rem]",
      imageGlowClassName:
        "bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.14),transparent_22%),radial-gradient(circle_at_48%_46%,rgba(245,199,107,0.12),transparent_28%)]"
    },
    {
      title: "TubaTour Island Travel Shorts",
      image: "/images/merchandise/tubatour-island-travel-shorts.jpeg",
      description:
        "Deep navy beach and travel shorts with turquoise wave accents and soft gold trim.",
      imageClassName: "max-h-[13rem] brightness-[1.15] contrast-[1.06] saturate-[1.05] sm:max-h-[14rem]"
    }
  ];
  const launchOfferCards = [
    {
      title: "Airport Transfers",
      description: "Private pickup, hotel drop-off, and smooth airport support across key islands.",
      actionLabel: "Request by WhatsApp",
      href: `/${locale}/transfers`
    },
    {
      title: "Private Tours",
      description: "Custom island days with trusted local guides, culture stops, and scenic routes.",
      actionLabel: "Plan a Tour",
      href: createTripPlanningWhatsAppUrl(
        "Hello TubaTour, I want to plan a Cape Verde trip. I am interested in a private tour. My dates are: ____. Island: ____. Number of travelers: ____."
      )
    },
    {
      title: "Island Experiences",
      description: "Food, music, beach, and culture-led experiences designed around real Cabo Verde moments.",
      actionLabel: "Explore Experiences",
      href: `/${locale}/experiences`
    },
    {
      title: "Trip Concierge",
      description: "Combine transfers, tours, local support, and island-hopping through one travel team.",
      actionLabel: "Plan My Trip",
      href: createTripPlanningWhatsAppUrl()
    },
    {
      title: "Partner Requests",
      description: "Hotels, guides, drivers, and local providers can request commercial partnerships with TubaTour.",
      actionLabel: "Partner by WhatsApp",
      href: createPartnerWhatsAppUrl("tourism partner")
    }
  ];

  return (
    <div
      data-homepage="true"
      className="home-brand-shell relative -mx-4 min-h-screen overflow-hidden rounded-[2.5rem] px-4 py-4 shadow-[0_36px_100px_rgba(0,0,0,0.45)] sm:-mx-6 sm:px-6 sm:py-6 lg:-mx-8 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.18))]"
      />
      <div className="relative z-10 space-y-8 pb-8 lg:space-y-9">
        <section className="section-space scroll-mt-36 pt-2">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/12 shadow-[0_40px_120px_rgba(0,0,0,0.42)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${siteImages.home.hero.src}')` }}
            />
            {/* Place the Cabo Verde hero video at /public/videos/cape-verde-hero.mp4 */}
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={siteImages.home.hero.src}
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/videos/cape-verde-hero.mp4" type="video/mp4" />
            </video>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,4,3,0.48)_0%,rgba(3,4,3,0.4)_18%,rgba(3,4,3,0.72)_62%,rgba(3,4,3,0.92)_100%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(14,165,233,0.18),transparent_22%),radial-gradient(circle_at_82%_14%,rgba(245,199,107,0.16),transparent_20%),radial-gradient(circle_at_70%_28%,rgba(249,115,91,0.12),transparent_18%)]"
            />
            <div className="relative z-10 flex min-h-[74svh] items-end px-5 py-5 sm:min-h-[78svh] sm:px-8 sm:py-7 lg:min-h-[80svh] lg:px-10 lg:py-8">
              <div className="grid w-full gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-end xl:gap-6">
                <div className="max-w-3xl space-y-4 lg:space-y-5">
                  <div className="brand-chip shadow-[0_14px_35px_rgba(0,0,0,0.28)]">
                    {messages.brand.name} · {messages.brand.location}
                  </div>

                  <div className="space-y-2.5 lg:space-y-3">
                    <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.02] xl:text-[4.35rem] xl:leading-[0.98]">
                      Discover Cape Verde with trusted local experiences
                    </h1>
                    <p className="max-w-xl text-base leading-7 text-brand-muted sm:text-lg sm:leading-8">
                      Discover tours, airport transfers, local guides, stays, food experiences,
                      and custom island planning through one Cape Verde marketplace connecting
                      travelers with verified local partners.
                    </p>
                  </div>

                  <div className="lg:hidden">
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-black/25 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${siteImages.home.hero.src}')` }}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,18,0.24)_0%,rgba(7,11,18,0.38)_36%,rgba(7,11,18,0.78)_100%)]"
                      />
                      <div className="relative z-10 flex min-h-[11.5rem] flex-col justify-between p-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="brand-chip !px-3 !py-1.5 !text-[0.68rem]">Hero media</span>
                          <span className="rounded-full border border-white/14 bg-white/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-white/80">
                            Cinematic brand reel
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-2.5 py-2 text-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/16 bg-black/35 text-white shadow-[0_12px_28px_rgba(0,0,0,0.28)]">
                            <span className="ml-1 text-lg">▶</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-white sm:text-base">
                              Cape Verde cinematic brand reel
                            </p>
                            <p className="mx-auto max-w-[16rem] text-xs leading-5 text-brand-muted sm:text-sm sm:leading-6">
                              This media panel is reserved for destination film, partner highlights, and marketplace storytelling.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
                    <a
                      href={siteConfig.whatsappPlanUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="brand-primary-button inline-flex items-center justify-center"
                    >
                      Book Now
                    </a>
                    <Link
                      href={`/${locale}/experiences`}
                      className="brand-secondary-button inline-flex items-center justify-center"
                    >
                      Explore Experiences
                    </Link>
                    <Link
                      href={`/${locale}/partners`}
                      className="brand-secondary-button inline-flex items-center justify-center"
                    >
                      Become a Partner
                    </Link>
                  </div>

                  <div className="grid gap-3 pt-1 sm:grid-cols-2 xl:grid-cols-4">
                    {heroStats.map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-2xl border border-white/14 bg-black/35 px-4 py-3 backdrop-blur-xl"
                      >
                        <p className="text-sm font-medium text-white">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 lg:max-w-[26rem] lg:justify-self-end xl:max-w-[27rem]">
                  <div className="relative hidden overflow-hidden rounded-[2rem] border border-white/14 bg-black/25 shadow-[0_22px_52px_rgba(0,0,0,0.3)] lg:block">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${siteImages.home.hero.src}')` }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,18,0.18)_0%,rgba(7,11,18,0.3)_28%,rgba(7,11,18,0.7)_68%,rgba(7,11,18,0.9)_100%)]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,199,107,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.16),transparent_26%)]"
                    />
                    <div className="relative z-10 flex min-h-[17rem] flex-col justify-between p-5 sm:min-h-[18rem] sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <span className="brand-chip">Hero media</span>
                        <span className="rounded-full border border-white/14 bg-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                          Cinematic brand reel
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-4 py-6 text-center">
                        <div className="flex h-18 w-18 items-center justify-center rounded-full border border-white/16 bg-black/30 text-white shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-md sm:h-20 sm:w-20">
                          <span className="ml-1 text-2xl">▶</span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-lg font-semibold text-white">
                            Cape Verde cinematic brand reel
                          </p>
                          <p className="mx-auto max-w-xs text-sm leading-6 text-brand-muted">
                            This premium hero block is designed for destination film, partner
                            highlights, and marketplace storytelling without changing the current
                            layout.
                          </p>
                        </div>
                      </div>

                      <div className="glass-line rounded-[1.5rem] p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-brand-gold">
                          Media-ready layout
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/80">
                          This hero media slot is ready for the Cabo Verde brand film at
                          <span className="text-white"> /public/videos/cape-verde-hero.mp4</span>.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-line rounded-[2rem] p-5 sm:p-6">
                    <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">
                      Marketplace platform
                    </p>
                    <p className="mt-4 text-xl font-semibold tracking-tight text-white">
                      Tours, transfers, stays, food, and local support through one full tourism marketplace platform
                    </p>
                    <p className="mt-4 text-sm leading-7 text-brand-muted">
                      TubaTour connects travelers with verified local partners through traveler
                      booking accounts, partner account management, secure payment-ready
                      architecture, and scalable marketplace operations.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    {messages.home.hero.trustHighlights.map((highlight) => (
                      <div key={highlight} className="home-brand-line rounded-3xl p-5">
                        <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">
                          TubaTour
                        </p>
                        <p className="mt-3 text-base font-medium text-white">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {locale === "en" ? (
          <section className="section-space scroll-mt-36">
            <div className="overflow-hidden rounded-[2.35rem] border border-white/12 bg-[linear-gradient(135deg,rgba(11,27,43,0.96),rgba(7,11,18,0.98)_42%,rgba(7,11,18,0.98)_74%,rgba(15,118,110,0.18))] px-6 py-6 shadow-[0_28px_80px_rgba(0,0,0,0.38)] sm:px-8 sm:py-7 lg:px-9 lg:py-8">
              <div className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-start xl:gap-8">
                <div className="space-y-5">
                  <span className="brand-chip">World Cup travel guide</span>
                  <div className="space-y-3">
                    <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      Cape Verde Is on the World Stage
                    </h2>
                    <p className="max-w-2xl text-base leading-7 text-brand-muted sm:text-lg sm:leading-8">
                      From the Blue Sharks&apos; football moment to beaches, culture, mountains
                      and music, now is the time to discover Cabo Verde.
                    </p>
                  </div>
                  <p className="max-w-xl text-sm leading-7 text-white/78 sm:text-base">
                    TubaTour is ready to convert that global attention into real trip planning
                    with premium transfers, private tours, island experiences, and concierge-led
                    travel support.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                      href={siteConfig.whatsappPlanUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="brand-primary-button inline-flex items-center justify-center"
                    >
                      Plan My Trip
                    </a>
                    <Link
                      href="/world-cup-cape-verde"
                      className="brand-secondary-button inline-flex items-center justify-center"
                    >
                      Explore World Cup Travel Guide
                    </Link>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {launchOfferCards.map((item) => {
                    const isExternal = item.href.startsWith("https://");

                    return (
                      <article
                        key={item.title}
                        className="soft-panel flex h-full flex-col rounded-[1.8rem] p-5"
                      >
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
                          Launch-ready service
                        </p>
                        <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                          {item.title}
                        </h3>
                        <p className="mt-3 flex-1 text-sm leading-7 text-brand-muted">
                          {item.description}
                        </p>
                        {isExternal ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="brand-secondary-button mt-5 inline-flex w-full justify-center"
                          >
                            {item.actionLabel}
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="brand-secondary-button mt-5 inline-flex w-full justify-center"
                          >
                            {item.actionLabel}
                          </Link>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section id="transfers" className="section-space scroll-mt-36">
          <div className="overflow-hidden rounded-[2.35rem] border border-white/12 bg-[linear-gradient(135deg,rgba(11,27,43,0.92),rgba(7,11,18,0.96)_38%,rgba(7,11,18,0.98)_72%,rgba(15,118,110,0.24))] px-6 py-6 shadow-[0_28px_80px_rgba(0,0,0,0.38)] sm:px-8 sm:py-7 lg:px-9 lg:py-7">
            <div className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr] lg:items-center xl:gap-8">
              <div className="order-1 space-y-5">
                <div className="space-y-4">
                  <span className="brand-chip">PREMIUM TRANSFERS</span>
                  <div className="space-y-3">
                    <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      Premium Airport Transfers in Cabo Verde
                    </h2>
                    <p className="max-w-xl text-base leading-7 text-brand-muted sm:text-lg sm:leading-8">
                      Safe, reliable, and comfortable airport pickups, hotel transfers, private drivers, and island travel support across Cabo Verde.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Airport pickups",
                    "Private driver service",
                    "Hotel drop-off",
                    "Island travel support"
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white shadow-[0_14px_34px_rgba(0,0,0,0.16)] backdrop-blur-md"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={`/${locale}/transfers`}
                    className="brand-primary-button inline-flex items-center justify-center"
                  >
                    Book a Transfer
                  </Link>
                  <a
                    href={siteConfig.whatsappPlanUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="brand-secondary-button inline-flex items-center justify-center"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="order-2 flex flex-col gap-0 lg:items-end lg:self-stretch">
                <div className="relative flex w-full items-center overflow-hidden rounded-[2rem] border border-white/12 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] px-3 py-4 shadow-[0_26px_70px_rgba(0,0,0,0.34)] sm:px-5 sm:py-5 lg:min-h-[24rem] lg:px-4 lg:py-4 xl:min-h-[25rem] xl:px-5 xl:py-5">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(245,199,107,0.18),transparent_24%),radial-gradient(circle_at_22%_76%,rgba(14,165,233,0.12),transparent_26%)]"
                  />
                  <div className="relative aspect-[16/9] w-full lg:aspect-[15/8]">
                    <Image
                      src="/images/branding/tubatour-transfer-van.png"
                      alt="TubaTour branded airport transfer van"
                      fill
                      priority
                      className="object-contain object-center drop-shadow-[0_28px_52px_rgba(0,0,0,0.42)]"
                      sizes="(min-width: 1280px) 52vw, (min-width: 1024px) 48vw, 100vw"
                    />
                  </div>
                  <div className="absolute bottom-3 right-3 z-10 sm:bottom-4 sm:right-4 lg:bottom-5 lg:right-5">
                    <div className="rounded-[1.35rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))] px-3 py-2.5 shadow-[0_18px_40px_rgba(0,0,0,0.2)] backdrop-blur-md sm:px-3.5 sm:py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/20 sm:h-16 sm:w-16">
                          <Image
                            src="/images/branding/tubatour-qr-card.png"
                            alt="TubaTour QR booking card"
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-brand-gold">
                            Scan to book
                          </p>
                          <p className="text-sm font-medium text-white/85">
                            tubatours.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="soft-panel p-6 sm:p-8">
              <SectionHeading
                eyebrow={messages.home.transfers.eyebrow}
                title={messages.home.transfers.title}
                description={messages.home.transfers.description}
              />
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70">
                {messages.home.transfers.helper}
              </p>
              <div className="mt-6">
                <Link
                  href={`/${locale}/transfers`}
                  className="brand-primary-button inline-flex items-center justify-center"
                >
                  {messages.home.transfers.buttonLabel}
                </Link>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-4">
              {messages.home.transfers.items.map((item, index) => (
                <article key={item.title} className="home-brand-card flex h-full flex-col rounded-[2rem] p-6">
                  <ImagePanel
                    image={siteImages.home.destinations[index]}
                    aspect="landscape"
                    className="border border-white/10"
                    overlayClassName="bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                  />
                  <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
                    {item.location}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium text-white/75">{item.price}</p>
                  <p className="mt-4 flex-1 text-base leading-7 text-brand-muted">
                    {item.description}
                  </p>
                  <a
                    href={createTravelerWhatsAppUrl(item.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="brand-primary-button mt-6 inline-flex w-full justify-center sm:w-fit"
                  >
                    {item.buttonLabel}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="popular-experiences" className="section-space scroll-mt-36 space-y-8">
          <SectionHeading
            eyebrow={messages.home.popularExperiences.eyebrow}
            title={messages.home.popularExperiences.title}
            description={messages.home.popularExperiences.description}
          />

          <div className="grid gap-6 xl:grid-cols-2">
            {messages.home.popularExperiences.items.map((item, index) => (
              <article
                key={item.title}
                className="home-brand-card flex h-full flex-col rounded-[2rem] p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <ImagePanel
                  image={siteImages.home.popularExperiences[index]}
                  aspect="landscape"
                  className="border border-white/10"
                  overlayClassName="bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                />
                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
                  <span>{item.category}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/65">{item.location}</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="text-lg font-semibold text-white">{item.price}</span>
                  <span className="text-sm text-brand-muted">{item.duration}</span>
                </div>
                <p className="mt-4 flex-1 text-base leading-7 text-brand-muted">
                  {item.description}
                </p>
                <div className="mt-6">
                  <a
                    href={createTravelerWhatsAppUrl(item.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="brand-primary-button inline-flex w-full justify-center sm:w-fit"
                  >
                    {item.buttonLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="explore-by-island" className="section-space scroll-mt-36 space-y-8">
          <SectionHeading
            eyebrow={messages.home.destinations.eyebrow}
            title={messages.home.destinations.title}
            description={messages.home.destinations.description}
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {messages.home.destinations.items.map((item, index) => (
              <article
                key={item.slug}
                className="home-brand-card flex h-full flex-col rounded-[2rem] p-5"
              >
                <ImagePanel
                  image={siteImages.home.destinations[index]}
                  aspect="portrait"
                  className="border border-white/10"
                  overlayClassName="bg-gradient-to-t from-black/65 via-black/10 to-transparent"
                />
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-brand-muted">
                  {item.description}
                </p>
                <p className="mt-4 text-sm text-white/75">
                  <span className="text-brand-gold">Best for:</span> {item.bestFor}
                </p>
                <Link
                  href={{
                    pathname: `/${locale}/experiences`,
                    query: { island: item.slug }
                  }}
                  className="brand-secondary-button mt-5 inline-flex w-full justify-center sm:w-fit"
                >
                  {item.buttonLabel}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section-space space-y-8">
          <SectionHeading
            eyebrow={messages.home.partnerOpportunities.eyebrow}
            title={messages.home.partnerOpportunities.title}
            description={messages.home.partnerOpportunities.description}
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {messages.home.partnerOpportunities.items.map((item) => (
              <article key={item.title} className="soft-panel flex h-full flex-col p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">
                  {item.type}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-brand-muted">
                  {item.description}
                </p>
                <div className="mt-5 flex-1 space-y-2">
                  {item.benefits.map((benefit) => (
                    <p key={benefit} className="text-sm text-white/75">
                      {benefit}
                    </p>
                  ))}
                </div>
                <a
                  href={createPartnerWhatsAppUrl(item.type)}
                  target="_blank"
                  rel="noreferrer"
                  className="brand-secondary-button mt-6 inline-flex w-full justify-center sm:w-fit"
                >
                  {item.buttonLabel}
                </a>
              </article>
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/${locale}/partners`}
              className="brand-primary-button inline-flex items-center justify-center"
            >
              {messages.home.partnerOpportunities.primaryAction}
            </Link>
            <a
              href={createPartnerWhatsAppUrl("tourism partner")}
              target="_blank"
              rel="noreferrer"
              className="brand-secondary-button inline-flex items-center justify-center"
            >
              {messages.home.partnerOpportunities.secondaryAction}
            </a>
          </div>
        </section>

        <section id="how-it-works" className="section-space scroll-mt-36 space-y-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-gold">
              {messages.home.howItWorks.eyebrow}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {messages.home.howItWorks.title}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {messages.home.howItWorks.steps.map((step, index) => (
              <article key={step.title} className="soft-panel p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-brand-muted">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-space space-y-8">
          <SectionHeading
            eyebrow={messages.home.whyChooseUs.eyebrow}
            title={messages.home.whyChooseUs.title}
            description={messages.home.whyChooseUs.description}
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {messages.home.whyChooseUs.items.map((item) => (
              <article key={item.title} className="soft-panel p-6">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-brand-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-space-tight space-y-6">
          <SectionHeading
            eyebrow={messages.home.futurePlatform.eyebrow}
            title={messages.home.futurePlatform.title}
            description={messages.home.futurePlatform.description}
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {messages.home.futurePlatform.items.map((item) => (
              <article key={item.title} className="soft-panel flex h-full flex-col p-5">
                <p className="brand-chip mb-4 w-fit">{messages.home.futurePlatform.label}</p>
                <h3 className="text-xl font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="mt-3 flex-1 text-base leading-7 text-brand-muted">{item.description}</p>
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
                  {item.label}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-space-tight space-y-6">
          <SectionHeading
            eyebrow={messages.home.partnerJourney.eyebrow}
            title={messages.home.partnerJourney.title}
            description={messages.home.partnerJourney.description}
          />

          <div className="soft-panel p-6 sm:p-7">
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="brand-chip">{messages.home.partnerJourney.label}</span>
                <span className="brand-chip">Admin approval and marketplace control</span>
              </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {messages.home.partnerJourney.steps.map((step, index) => (
                <article key={step.title} className="home-brand-card rounded-[1.75rem] p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">
                    Step 0{index + 1}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space-tight space-y-6">
          <SectionHeading
            eyebrow={messages.home.profilePreviews.eyebrow}
            title={messages.home.profilePreviews.title}
            description={messages.home.profilePreviews.description}
          />

          <div className="mb-2">
            <span className="brand-chip">{messages.home.profilePreviews.label}</span>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {messages.home.profilePreviews.items.map((item) => (
              <article key={item.name} className="home-brand-card flex h-full flex-col rounded-[2rem] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand-gold">
                      {item.type}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                      {item.name}
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/14 bg-white/8 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-white/80">
                    {item.badge}
                  </span>
                </div>
                <p className="mt-4 text-sm font-medium text-white/80">{item.location}</p>
                <div className="mt-5 flex-1 space-y-3 text-sm leading-7 text-brand-muted">
                  <p>{item.services}</p>
                  <p>{item.specialties}</p>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <button type="button" className="brand-secondary-button inline-flex w-full justify-center">
                    {item.primaryAction}
                  </button>
                  <button type="button" className="brand-primary-button inline-flex w-full justify-center">
                    {item.secondaryAction}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-space-tight space-y-6">
          <SectionHeading
            eyebrow={messages.home.promoSystem.eyebrow}
            title={messages.home.promoSystem.title}
            description={messages.home.promoSystem.description}
          />

          <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="soft-panel p-6 sm:p-7">
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="brand-chip">{messages.home.promoSystem.label}</span>
                <span className="brand-chip">Payment-ready marketplace operations</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {messages.home.promoSystem.levels.map((level) => (
                  <article key={level.title} className="home-brand-card flex h-full flex-col rounded-[1.75rem] p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
                      {level.tag}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
                      {level.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-brand-muted">{level.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="soft-panel p-6 sm:p-7">
              <h3 className="text-2xl font-semibold tracking-tight text-white">
                Security and commission planning
              </h3>
              <div className="mt-5 grid gap-4">
                {messages.home.promoSystem.safeguards.map((item) => (
                  <article key={item.title} className="home-brand-line rounded-[1.5rem] p-5">
                    <h4 className="text-base font-semibold text-white">{item.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-brand-muted">{item.description}</p>
                  </article>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-white/70">{messages.home.promoSystem.note}</p>
            </div>
          </div>
        </section>

        <section className="section-space-tight space-y-6">
          <SectionHeading
            eyebrow={messages.home.adminPreview.eyebrow}
            title={messages.home.adminPreview.title}
            description={messages.home.adminPreview.description}
          />

          <div className="mb-2">
            <span className="brand-chip">{messages.home.adminPreview.label}</span>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {messages.home.adminPreview.items.map((item) => (
              <article key={item.title} className="soft-panel flex h-full flex-col p-5">
                <h3 className="text-xl font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="mt-3 flex-1 text-base leading-7 text-brand-muted">{item.description}</p>
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
                  {item.label}
                </p>
              </article>
            ))}
          </div>
        </section>

        {locale === "en" ? (
          <section className="section-space space-y-7 pt-2 pb-6 sm:space-y-8 sm:pt-3 sm:pb-7">
            <div className="overflow-hidden rounded-[2.35rem] border border-white/12 bg-[linear-gradient(135deg,rgba(11,27,43,0.96),rgba(7,11,18,0.98)_42%,rgba(7,11,18,0.98)_76%,rgba(15,118,110,0.18))] px-6 py-6 shadow-[0_28px_80px_rgba(0,0,0,0.38)] sm:px-8 sm:py-7 lg:px-9 lg:py-8">
              <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:gap-9">
                <div className="space-y-5">
                  <span className="brand-chip">Coming Soon</span>
                  <div className="space-y-3">
                    <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      TubaTour Official Collection
                    </h2>
                    <p className="max-w-xl text-base leading-7 text-brand-muted sm:text-lg sm:leading-8">
                      Premium travel merchandise inspired by Cabo Verde island experiences.
                    </p>
                  </div>
                  <p className="max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                    A curated branded collection for travelers who want to carry the TubaTour
                    island aesthetic beyond the trip itself, from airport arrivals to beach days
                    and relaxed island evenings.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Premium travel wear",
                      "Island-inspired details",
                      "Future official release"
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-brand-gold backdrop-blur-md"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[radial-gradient(circle_at_top_right,rgba(245,199,107,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-3 shadow-[0_26px_70px_rgba(0,0,0,0.34)] sm:p-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.65rem] border border-white/10 bg-black/20">
                    <Image
                      src="/images/merchandise/tubatour-official-collection-hero.jpeg"
                      alt="TubaTour Official Collection hero merchandise preview"
                      fill
                      priority={false}
                      className="object-cover object-center brightness-[1.08] saturate-[1.06]"
                      sizes="(min-width: 1280px) 42vw, (min-width: 1024px) 46vw, 100vw"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(circle_at_72%_26%,rgba(245,199,107,0.14),transparent_24%),radial-gradient(circle_at_24%_78%,rgba(14,165,233,0.12),transparent_24%),linear-gradient(180deg,rgba(7,11,18,0.04),rgba(7,11,18,0.18)_42%,rgba(7,11,18,0.48)_100%)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
              {merchandiseItems.map((item) => (
                <article
                  key={item.title}
                  className="soft-panel flex h-full flex-col rounded-[1.9rem] p-4 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
                      Official collection
                    </span>
                    <span className="rounded-full border border-white/14 bg-white/8 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-white/80">
                      Coming soon
                    </span>
                  </div>
                  <div className="relative mt-4 flex min-h-[13.75rem] items-center justify-center overflow-hidden rounded-[1.65rem] border border-white/10 bg-[radial-gradient(circle_at_22%_26%,rgba(14,165,233,0.15),transparent_26%),radial-gradient(circle_at_78%_78%,rgba(245,199,107,0.13),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 sm:mt-5 sm:min-h-[14.75rem] lg:min-h-[15rem]">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.06),transparent_34%)]"
                    />
                    {"imageGlowClassName" in item && item.imageGlowClassName ? (
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 ${item.imageGlowClassName}`}
                      />
                    ) : null}
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={680}
                      height={680}
                      className={`${item.imageClassName} relative z-10 w-auto object-contain drop-shadow-[0_22px_34px_rgba(0,0,0,0.22)]`}
                      sizes="(min-width: 1280px) 26vw, (min-width: 640px) 42vw, 92vw"
                    />
                  </div>
                  <h3 className="mt-4 text-[1.65rem] font-semibold tracking-tight text-white sm:mt-5 sm:text-[1.78rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.98rem] leading-7 text-brand-muted">
                    {item.description}
                  </p>
                  <div className="mt-5">
                    <button
                      type="button"
                      className="brand-secondary-button inline-flex w-full justify-center"
                    >
                      Preview Collection
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="section-space">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.18),rgba(7,11,18,0.98)_34%,rgba(7,11,18,0.98)_70%,rgba(245,199,107,0.2))] px-6 py-8 text-white shadow-[0_24px_70px_rgba(0,0,0,0.4)] sm:px-8 lg:px-10">
            <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl space-y-4">
                <p className="text-sm uppercase tracking-[0.24em] text-white/55">
                  {messages.home.whatsappCta.eyebrow}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {messages.home.whatsappCta.title}
                </h2>
                <p className="text-base leading-7 text-brand-muted sm:text-lg">
                  {messages.home.whatsappCta.description}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                <a
                  href={siteConfig.whatsappPlanUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="brand-primary-button inline-flex items-center justify-center"
                >
                  {messages.home.whatsappCta.primaryAction}
                </a>
                <a
                  href="#inquiry-form"
                  className="brand-secondary-button inline-flex items-center justify-center"
                >
                  {messages.home.whatsappCta.secondaryAction}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="inquiry-form" className="section-space scroll-mt-36">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="soft-panel p-6 sm:p-8">
              <SectionHeading
                eyebrow={messages.home.inquiry.eyebrow}
                title={messages.home.inquiry.title}
                description={messages.home.inquiry.description}
              />
            </div>

            <div className="soft-panel p-6 sm:p-8">
              <ContactForm messages={messages.contact.form} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
