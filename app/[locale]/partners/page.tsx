import SectionHeading from "@/components/section-heading";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { createPartnerWhatsAppUrl } from "@/lib/site-config";

type PartnersPageProps = {
  params: {
    locale: Locale;
  };
};

export default function PartnersPage({ params }: PartnersPageProps) {
  const messages = getMessages(params.locale);

  return (
    <div className="brand-page-shell space-y-10 rounded-[2.5rem] px-4 py-4 pb-8 sm:px-6 sm:py-6 lg:px-8">
      <section className="section-space">
        <div className="soft-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <SectionHeading
              eyebrow={messages.partners.hero.eyebrow}
              title={messages.partners.hero.title}
              description={messages.partners.hero.description}
            />

            <div className="glass-line rounded-[2rem] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">
                Partnership model
              </p>
              <p className="mt-4 text-base leading-7 text-brand-muted">
                {messages.partners.intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {messages.partners.steps.map((step, index) => (
            <article key={step.title} className="soft-panel p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">0{index + 1}</p>
              <h2 className="mt-4 text-xl font-semibold tracking-tight text-white">
                {step.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-brand-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {messages.partners.items.map((item) => (
            <article key={item.title} className="soft-panel flex h-full flex-col p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">{item.type}</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                {item.title}
              </h2>
              <p className="mt-4 flex-1 text-base leading-7 text-brand-muted">
                {item.description}
              </p>
              <div className="mt-5 space-y-2">
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
                className="brand-primary-button mt-6 inline-flex w-fit"
              >
                {item.buttonLabel}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="flex flex-wrap gap-3">
          {[
            "Partner account management",
            "Verified provider onboarding",
            "Booking and availability tools",
            "Featured listing opportunities"
          ].map((point) => (
            <div
              key={point}
              className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-brand-gold backdrop-blur-xl"
            >
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.18),rgba(7,11,18,0.98)_34%,rgba(7,11,18,0.98)_70%,rgba(245,199,107,0.2))] px-6 py-10 text-white shadow-[0_24px_70px_rgba(0,0,0,0.4)] sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm uppercase tracking-[0.24em] text-white/55">
                {messages.partners.cta.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {messages.partners.cta.title}
              </h2>
              <p className="text-base leading-7 text-brand-muted sm:text-lg">
                {messages.partners.cta.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <a
                href={createPartnerWhatsAppUrl("tourism partner")}
                target="_blank"
                rel="noreferrer"
                className="brand-primary-button inline-flex items-center justify-center"
              >
                {messages.partners.cta.primaryAction}
              </a>
              <a
                href={`/${params.locale}/contact`}
                className="brand-secondary-button inline-flex items-center justify-center"
              >
                {messages.partners.cta.secondaryAction}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
