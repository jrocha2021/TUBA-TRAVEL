import ImagePanel from "@/components/image-panel";
import Link from "next/link";
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
    <div className="space-y-10 pb-8">
      <section className="section-space">
        <div className="soft-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-ocean shadow-sm">
                {messages.home.hero.eyebrow}
              </div>

              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  {messages.home.hero.title}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-ink/75">
                  {messages.home.hero.description}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href={`/${locale}/destinations`}
                  className="rounded-full bg-ocean px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-ocean/20 hover:bg-ocean/90"
                >
                  {messages.home.hero.primaryAction}
                </Link>
                <Link
                  href={`/${locale}/experiences`}
                  className="rounded-full border border-black/10 bg-white/70 px-6 py-3 text-center text-sm font-semibold text-ink hover:bg-white"
                >
                  {messages.home.hero.secondaryAction}
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <ImagePanel image={siteImages.home.hero} aspect="portrait" priority />
              {messages.home.hero.highlights.map((highlight) => (
                <div key={highlight} className="glass-line rounded-3xl p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-ocean/80">
                    Tuba Travel
                  </p>
                  <p className="mt-3 text-lg font-medium text-ink">{highlight}</p>
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
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {messages.home.destinations.items.map((item, index) => (
            <article key={item.title} className="soft-panel p-6">
              <ImagePanel image={siteImages.home.destinations[index]} aspect="landscape" />
              <p className="text-sm uppercase tracking-[0.24em] text-ocean/75">
                0{index + 1} . {item.tag}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-ink/75">
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
        />

        <div className="grid gap-6 md:grid-cols-3">
          {messages.home.experiences.items.map((item, index) => (
            <article key={item.title} className="section-card bg-white/85">
              <ImagePanel image={siteImages.home.experiences[index]} aspect="landscape" />
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-sun">
                {item.tag}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-ink/75">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="soft-panel px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow={messages.home.whyChooseUs.eyebrow}
              title={messages.home.whyChooseUs.title}
              description={messages.home.whyChooseUs.description}
            />

            <div className="grid gap-4">
              {messages.home.whyChooseUs.items.map((item) => (
                <article key={item.title} className="glass-line rounded-3xl p-5">
                  <h3 className="text-xl font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-ink/75">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="rounded-[2rem] bg-ink px-6 py-10 text-white shadow-[0_24px_60px_rgba(16,42,67,0.22)] sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm uppercase tracking-[0.24em] text-sand/70">
                {messages.home.cta.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {messages.home.cta.title}
              </h2>
              <p className="text-base leading-7 text-white/75 sm:text-lg">
                {messages.home.cta.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link
                href={`/${locale}/contact`}
                className="rounded-full bg-sun px-6 py-3 text-center text-sm font-semibold text-ink hover:bg-[#e4b658]"
              >
                {messages.home.cta.primaryAction}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
              >
                {messages.home.cta.secondaryAction}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
