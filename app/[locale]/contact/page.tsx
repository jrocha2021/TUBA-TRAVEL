import ContactForm from "@/components/contact-form";
import SectionHeading from "@/components/section-heading";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { createPartnerWhatsAppUrl, siteConfig } from "@/lib/site-config";

type ContactPageProps = {
  params: {
    locale: Locale;
  };
};

export default function ContactPage({ params }: ContactPageProps) {
  const messages = getMessages(params.locale);
  const { contact } = messages;
  const emailUrl = `mailto:${contact.email.address}`;
  const partnerUrl = createPartnerWhatsAppUrl("tourism partner");

  return (
    <div className="brand-page-shell space-y-10 rounded-[2.5rem] px-4 py-4 pb-8 sm:px-6 sm:py-6 lg:px-8">
      <section className="section-space">
        <div className="soft-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <SectionHeading
              eyebrow={contact.hero.eyebrow}
              title={contact.hero.title}
              description={contact.hero.description}
            />

            <div className="glass-line rounded-[2rem] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">
                TubaTour
              </p>
              <p className="mt-4 text-lg leading-8 text-brand-muted">
                {contact.hero.trustMessage}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="soft-panel p-6 sm:p-8">
            <div className="mb-6 space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                {contact.form.title}
              </h2>
              <p className="max-w-2xl text-base leading-7 text-brand-muted">
                {contact.form.description}
              </p>
            </div>
            <ContactForm messages={contact.form} />
          </div>

          <div className="grid gap-6">
            <article className="glass-line rounded-[2rem] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">
                How booking works
              </p>
              <div className="mt-5 space-y-4">
                {messages.home.howItWorks.steps.map((step, index) => (
                  <div key={step.title} className="border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                      0{index + 1}
                    </p>
                    <p className="mt-2 text-base font-medium text-white">{step.title}</p>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{step.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="glass-line rounded-[2rem] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">
                Booking support
              </p>
              <p className="mt-4 text-base leading-7 text-brand-muted">
                Use this booking-ready support flow to share your request, preferred dates,
                destination, and service details. TubaTour routes the request into the right
                traveler, partner, or marketplace support workflow.
              </p>
            </article>

            <article className="soft-panel p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">WhatsApp</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                {contact.whatsapp.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-brand-muted">
                {contact.whatsapp.description}
              </p>
              <p className="mt-4 text-sm font-medium text-white">{contact.whatsapp.phone}</p>
              <a
                href={siteConfig.whatsappPlanUrl}
                target="_blank"
                rel="noreferrer"
                className="brand-primary-button mt-6 inline-flex"
              >
                {contact.whatsapp.button}
              </a>
            </article>

            <article className="soft-panel p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">Email</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                {contact.email.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-brand-muted">
                {contact.email.description}
              </p>
              <p className="mt-4 text-sm font-medium text-white">{contact.email.address}</p>
              <a
                href={emailUrl}
                className="brand-secondary-button mt-6 inline-flex"
              >
                {contact.email.button}
              </a>
            </article>

            <article className="glass-line rounded-[2rem] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">
                Partner with TubaTour
              </p>
              <p className="mt-4 text-base leading-7 text-brand-muted">
                Are you a guide, driver, hotel, Airbnb host, restaurant, or local experience
                provider? Use the partner inquiry flow to begin verification, account setup, and
                marketplace onboarding.
              </p>
              <a
                href={partnerUrl}
                target="_blank"
                rel="noreferrer"
                className="brand-secondary-button mt-6 inline-flex"
              >
                {messages.common.partnerInquiry}
              </a>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
