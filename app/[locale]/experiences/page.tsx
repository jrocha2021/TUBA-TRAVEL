import ImagePanel from "@/components/image-panel";
import Link from "next/link";
import SectionHeading from "@/components/section-heading";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { siteImages } from "@/lib/site-images";

type ExperiencesPageProps = {
  params: {
    locale: Locale;
  };
};

export default function ExperiencesPage({ params }: ExperiencesPageProps) {
  const messages = getMessages(params.locale);
  const { locale } = params;

  return (
    <div className="space-y-10 pb-8">
      <section className="section-space">
        <div className="soft-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <SectionHeading
              eyebrow={messages.experiences.intro.eyebrow}
              title={messages.experiences.intro.title}
              description={messages.experiences.intro.description}
            />

            <div className="space-y-4">
              <ImagePanel image={siteImages.experiences.intro} aspect="landscape" priority />
              <div className="glass-line rounded-[2rem] p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-ocean/80">
                  Tuba Travel
                </p>
                <p className="mt-4 text-lg leading-8 text-ink/75">
                  {messages.common.learnMore}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="grid gap-6 md:grid-cols-2">
          {messages.experiences.cards.map((experience, index) => (
            <article
              key={experience.title}
              className="soft-panel flex h-full flex-col p-6"
            >
              <ImagePanel image={siteImages.experiences.cards[index]} aspect="landscape" />
              <p className="text-sm uppercase tracking-[0.24em] text-sun">
                0{index + 1} . {experience.tag}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink">
                {experience.title}
              </h2>
              <p className="mt-4 flex-1 text-base leading-7 text-ink/75">
                {experience.description}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="mt-6 inline-flex w-fit rounded-full bg-ocean px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-ocean/20 hover:bg-ocean/90"
              >
                {messages.experiences.ctaButton}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
