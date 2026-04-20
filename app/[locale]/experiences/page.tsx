import ImagePanel from "@/components/image-panel";
import Link from "next/link";
import SectionHeading from "@/components/section-heading";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import {
  experienceCardIds,
  getIslandSlug,
  islandSlugs,
  type ExperienceCardId
} from "@/lib/islands";
import { siteImages } from "@/lib/site-images";

type ExperiencesPageProps = {
  params: {
    locale: Locale;
  };
  searchParams?: {
    island?: string | string[];
  };
};

export default function ExperiencesPage({
  params,
  searchParams
}: ExperiencesPageProps) {
  const messages = getMessages(params.locale);
  const { locale } = params;
  const selectedIsland = getIslandSlug(searchParams?.island);
  const selectedIslandMessages = selectedIsland
    ? messages.experiences.islands[selectedIsland]
    : null;
  const orderedCardIds = (
    selectedIslandMessages?.cardOrder ?? messages.experiences.cards.map((card) => card.id)
  ).filter((cardId): cardId is ExperienceCardId =>
    experienceCardIds.includes(cardId as ExperienceCardId)
  );
  const baseCardsById = Object.fromEntries(
    messages.experiences.cards.map((card) => [card.id, card])
  );
  const experiences = orderedCardIds.map((cardId) => {
    const baseCard = baseCardsById[cardId];
    const override = selectedIslandMessages?.cardOverrides[cardId];

    return {
      ...baseCard,
      description: override?.description ?? baseCard.description,
      tag: override?.tag ?? baseCard.tag,
      image: selectedIsland
        ? siteImages.experiences.islands[selectedIsland].cards[cardId]
        : siteImages.experiences.cards[cardId]
    };
  });
  const heroImage = selectedIsland
    ? siteImages.experiences.islands[selectedIsland].hero
    : siteImages.experiences.intro;
  const heroEyebrow = selectedIslandMessages?.badge ?? messages.experiences.intro.eyebrow;
  const heroTitle = selectedIslandMessages?.title ?? messages.experiences.intro.title;
  const heroDescription =
    selectedIslandMessages?.description ?? messages.experiences.intro.description;

  return (
    <div className="brand-page-shell space-y-10 rounded-[2.5rem] px-4 py-4 pb-8 sm:px-6 sm:py-6 lg:px-8">
      <section className="section-space">
        <div className="soft-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <SectionHeading
              eyebrow={heroEyebrow}
              title={heroTitle}
              description={heroDescription}
            />

            <div className="space-y-4">
              <ImagePanel image={heroImage} aspect="landscape" priority />
              <div className="glass-line rounded-[2rem] p-6">
                {selectedIslandMessages ? (
                  <>
                    <p className="text-sm uppercase tracking-[0.24em] text-brand-red/85">
                      {messages.experiences.selectionLabel}
                    </p>
                    <p className="mt-4 text-xl font-semibold tracking-tight text-white">
                      {selectedIslandMessages.name}
                    </p>
                    <p className="mt-3 text-base leading-7 text-brand-muted">
                      {selectedIslandMessages.emphasis}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm uppercase tracking-[0.24em] text-brand-red/85">
                      Tuba Travel
                    </p>
                    <p className="mt-4 text-lg leading-8 text-brand-muted">
                      {messages.common.learnMore}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="soft-panel px-6 py-5 sm:px-8">
          <p className="text-sm uppercase tracking-[0.24em] text-brand-red/85">
            {messages.experiences.switchIslandLabel}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/experiences`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedIsland
                  ? "border border-white/14 bg-white/[0.03] text-white hover:border-brand-red/70 hover:bg-brand-red/10"
                  : "bg-brand-red text-white shadow-[0_18px_35px_rgba(225,6,44,0.24)]"
              }`}
            >
              {messages.experiences.allIslandsLabel}
            </Link>
            {islandSlugs.map((islandSlug) => {
              const island = messages.experiences.islands[islandSlug];
              const isActive = islandSlug === selectedIsland;

              return (
                <Link
                  key={islandSlug}
                  href={{
                    pathname: `/${locale}/experiences`,
                    query: {
                      island: islandSlug
                    }
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-red text-white shadow-[0_18px_35px_rgba(225,6,44,0.24)]"
                      : "border border-white/14 bg-white/[0.03] text-white hover:border-brand-red/70 hover:bg-brand-red/10"
                  }`}
                >
                  {island.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((experience, index) => (
            <article
              key={experience.title}
              className="soft-panel flex h-full flex-col p-6"
            >
              <ImagePanel
                image={experience.image}
                aspect="landscape"
                className="border border-white/10"
              />
              <p className="text-sm uppercase tracking-[0.24em] text-brand-red">
                0{index + 1} . {experience.tag}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                {experience.title}
              </h2>
              <p className="mt-4 flex-1 text-base leading-7 text-brand-muted">
                {experience.description}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="brand-primary-button mt-6 inline-flex w-fit"
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
