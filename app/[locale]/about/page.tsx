import ImagePanel from "@/components/image-panel";
import SectionHeading from "@/components/section-heading";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { siteImages } from "@/lib/site-images";

type AboutPageProps = {
  params: {
    locale: Locale;
  };
};

export default function AboutPage({ params }: AboutPageProps) {
  const messages = getMessages(params.locale);
  const sections = [
    messages.about.whoWeAre,
    messages.about.vision,
    messages.about.approach,
    messages.about.whyTravelWithUs
  ];

  return (
    <div className="space-y-10 pb-8">
      <section className="section-space">
        <div className="soft-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-ocean shadow-sm">
                {messages.about.hero.eyebrow}
              </div>

              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                  {messages.about.hero.title}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-ink/75">
                  {messages.about.hero.description}
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <ImagePanel image={siteImages.about.hero} aspect="portrait" priority />
              {messages.about.hero.highlights.map((highlight) => (
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

      <section className="section-space">
        <div className="space-y-8">
          <SectionHeading
            eyebrow={messages.about.hero.eyebrow}
            title={messages.about.whoWeAre.title}
            description={messages.about.whoWeAre.description}
          />

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="soft-panel p-6">
              <ImagePanel image={siteImages.about.story} aspect="portrait" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {sections.slice(1).map((section, index) => (
                <article key={section.title} className="soft-panel p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-sun">
                    0{index + 2}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-ink/75">
                    {section.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
