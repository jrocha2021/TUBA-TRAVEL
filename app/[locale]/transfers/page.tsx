import SectionHeading from "@/components/section-heading";
import ImagePanel from "@/components/image-panel";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { createTravelerWhatsAppUrl, siteConfig } from "@/lib/site-config";
import { siteImages } from "@/lib/site-images";

type TransfersPageProps = {
  params: {
    locale: Locale;
  };
};

export default function TransfersPage({ params }: TransfersPageProps) {
  const messages = getMessages(params.locale);
  const transferImages = [
    siteImages.home.destinations[0],
    siteImages.home.destinations[1],
    siteImages.home.destinations[4],
    siteImages.home.transfers
  ];

  return (
    <div className="brand-page-shell space-y-10 rounded-[2.5rem] px-4 py-4 pb-8 sm:px-6 sm:py-6 lg:px-8">
      <section className="section-space">
        <div className="soft-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <SectionHeading
              eyebrow={messages.transfers.hero.eyebrow}
              title={messages.transfers.hero.title}
              description={messages.transfers.hero.description}
            />

            <div className="space-y-4">
              <ImagePanel
                image={siteImages.home.transfers}
                aspect="landscape"
                priority
                className="border border-white/10"
              />
              <div className="glass-line rounded-[2rem] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">
                Booking workflow
              </p>
                <p className="mt-4 text-base leading-7 text-brand-muted">
                  {messages.transfers.manualConfirmation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="soft-panel px-6 py-6 sm:px-8">
          <p className="max-w-4xl text-base leading-7 text-brand-muted">
            {messages.transfers.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Airport Transfers", "Private Driver", "Arrival Pickup", "Booking-ready flow"].map((chip) => (
              <div
                key={chip}
                className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-brand-gold backdrop-blur-xl"
              >
                {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {messages.transfers.items.map((item, index) => (
            <article key={item.title} className="soft-panel flex h-full flex-col p-6">
              <ImagePanel
                image={transferImages[index]}
                aspect="landscape"
                className="border border-white/10"
              />
              <p className="mt-5 text-sm uppercase tracking-[0.24em] text-brand-gold">
                {item.location}
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                {item.title}
              </h2>
              <p className="mt-3 text-sm font-medium text-white/80">{item.price}</p>
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
      </section>

      <section className="section-space">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="soft-panel p-6 sm:p-8">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              {messages.transfers.privateDriver.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-brand-muted">
              {messages.transfers.privateDriver.description}
            </p>
            <a
              href={createTravelerWhatsAppUrl("Private Driver Service")}
              target="_blank"
              rel="noreferrer"
              className="brand-primary-button mt-6 inline-flex"
            >
              {messages.transfers.privateDriver.buttonLabel}
            </a>
          </div>

            <div className="glass-line rounded-[2rem] p-6 sm:p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">
                Business contact
              </p>
              <p className="mt-4 text-base leading-7 text-brand-muted">
              TubaTour business contact and platform support channels are used for transfer
              coordination, partner communication, and traveler booking assistance.
              </p>
            </div>
        </div>
      </section>

      <section className="section-space">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.18),rgba(7,11,18,0.98)_34%,rgba(7,11,18,0.98)_70%,rgba(245,199,107,0.2))] px-6 py-10 text-white shadow-[0_24px_70px_rgba(0,0,0,0.4)] sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm uppercase tracking-[0.24em] text-white/55">
                {messages.transfers.cta.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {messages.transfers.cta.title}
              </h2>
              <p className="text-base leading-7 text-brand-muted sm:text-lg">
                {messages.transfers.cta.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <a
                href={siteConfig.whatsappPlanUrl}
                target="_blank"
                rel="noreferrer"
                className="brand-primary-button inline-flex items-center justify-center"
              >
                {messages.transfers.cta.primaryAction}
              </a>
              <a
                href={`/${params.locale}/contact`}
                className="brand-secondary-button inline-flex items-center justify-center"
              >
                {messages.transfers.cta.secondaryAction}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
