import Link from "next/link";
import ImagePanel from "@/components/image-panel";
import SectionHeading from "@/components/section-heading";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { siteImages } from "@/lib/site-images";

type HomePageProps = {
  params: {
    locale: Locale;
  };
};

export default function HomePage({ params }: HomePageProps) {
  const messages = getMessages(params.locale);
  const { locale } = params;

  return (
    <div
      data-homepage="true"
      className="home-brand-shell relative -mx-4 min-h-screen overflow-hidden rounded-[2.5rem] px-4 py-4 shadow-[0_36px_100px_rgba(0,0,0,0.45)] sm:-mx-6 sm:px-6 sm:py-6 lg:-mx-8 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.18))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <div
          className="h-[58vw] w-[58vw] min-h-[16rem] min-w-[16rem] max-h-[44rem] max-w-[44rem] bg-contain bg-center bg-no-repeat opacity-[0.04] blur-[1.2px] sm:h-[54vw] sm:w-[54vw] sm:opacity-[0.05] lg:h-[48vw] lg:w-[48vw] lg:opacity-[0.06]"
          style={{ backgroundImage: "url('/images/branding/tuba-logo-watermark.png')" }}
        />
      </div>

      <div className="relative z-10 space-y-12 pb-10">
        <section className="section-space">
          <div className="home-brand-panel overflow-hidden rounded-[2.25rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="space-y-8">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] text-brand-red shadow-[0_14px_35px_rgba(0,0,0,0.28)]">
                  {messages.home.hero.eyebrow}
                </div>

                <div className="space-y-5">
                  <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                    {messages.home.hero.title}
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-brand-muted">
                    {messages.home.hero.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href={`/${locale}/destinations`}
                    className="rounded-full bg-brand-red px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_18px_40px_rgba(225,6,44,0.28)] transition-all duration-200 hover:bg-brand-red-deep hover:shadow-[0_20px_45px_rgba(139,0,24,0.35)]"
                  >
                    {messages.home.hero.primaryAction}
                  </Link>
                  <Link
                    href={`/${locale}/experiences`}
                    className="rounded-full border border-white/14 bg-white/[0.03] px-6 py-3 text-center text-sm font-semibold text-white transition-all duration-200 hover:border-brand-red/70 hover:bg-brand-red/10"
                  >
                    {messages.home.hero.secondaryAction}
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <ImagePanel
                  image={siteImages.home.hero}
                  aspect="portrait"
                  priority
                  className="border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.34)]"
                  overlayClassName="bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                  imageClassName="scale-[1.01]"
                />
                {messages.home.hero.highlights.map((highlight) => (
                  <div key={highlight} className="home-brand-line rounded-3xl p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-brand-red/85">
                      Tuba Travel
                    </p>
                    <p className="mt-3 text-lg font-medium text-white">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-space space-y-8">
          <SectionHeading
            eyebrow={messages.home.destinations.eyebrow}
            title={messages.home.destinations.title}
            description={messages.home.destinations.description}
            eyebrowClassName="text-brand-red"
            titleClassName="text-white"
            descriptionClassName="text-brand-muted"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {messages.home.destinations.items.map((item, index) => (
              <article
                key={item.title}
                className="home-brand-card rounded-[2rem] p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <ImagePanel
                  image={siteImages.home.destinations[index]}
                  aspect="landscape"
                  className="border border-white/10"
                  overlayClassName="bg-gradient-to-t from-black/55 via-black/5 to-transparent"
                />
                <p className="text-sm uppercase tracking-[0.24em] text-brand-red/85">
                  0{index + 1} . {item.tag}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-brand-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-space space-y-8">
          <SectionHeading
            eyebrow={messages.home.experiences.eyebrow}
            title={messages.home.experiences.title}
            description={messages.home.experiences.description}
            eyebrowClassName="text-brand-red"
            titleClassName="text-white"
            descriptionClassName="text-brand-muted"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {messages.home.experiences.items.map((item, index) => (
              <article
                key={item.title}
                className="home-brand-card rounded-[2rem] p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <ImagePanel
                  image={siteImages.home.experiences[index]}
                  aspect="landscape"
                  className="border border-white/10"
                  overlayClassName="bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                />
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-red">
                  {item.tag}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-brand-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-space">
          <div className="home-brand-panel rounded-[2.25rem] px-6 py-8 sm:px-8 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <SectionHeading
                eyebrow={messages.home.whyChooseUs.eyebrow}
                title={messages.home.whyChooseUs.title}
                description={messages.home.whyChooseUs.description}
                eyebrowClassName="text-brand-red"
                titleClassName="text-white"
                descriptionClassName="text-brand-muted"
              />

              <div className="grid gap-4">
                {messages.home.whyChooseUs.items.map((item) => (
                  <article key={item.title} className="home-brand-line rounded-3xl p-5">
                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-brand-muted">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(225,6,44,0.22),rgba(8,8,8,0.98)_38%,rgba(8,8,8,0.98)_70%,rgba(139,0,24,0.25))] px-6 py-10 text-white shadow-[0_24px_70px_rgba(0,0,0,0.4)] sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl space-y-4">
                <p className="text-sm uppercase tracking-[0.24em] text-white/55">
                  {messages.home.cta.eyebrow}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {messages.home.cta.title}
                </h2>
                <p className="text-base leading-7 text-brand-muted sm:text-lg">
                  {messages.home.cta.description}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                <Link
                  href={`/${locale}/contact`}
                  className="rounded-full bg-brand-red px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_18px_40px_rgba(225,6,44,0.25)] transition-all duration-200 hover:bg-brand-red-deep"
                >
                  {messages.home.cta.primaryAction}
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-center text-sm font-semibold text-white transition-all duration-200 hover:border-brand-red/70 hover:bg-brand-red/10"
                >
                  {messages.home.cta.secondaryAction}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
