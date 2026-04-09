import ContactForm from "@/components/contact-form";
import SectionHeading from "@/components/section-heading";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";

type ContactPageProps = {
  params: {
    locale: Locale;
  };
};

export default function ContactPage({ params }: ContactPageProps) {
  const messages = getMessages(params.locale);
  const { contact } = messages;
  const emailUrl = `mailto:${contact.email.address}`;

  return (
    <div className="space-y-10 pb-8">
      <section className="section-space">
        <div className="soft-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <SectionHeading
              eyebrow={contact.hero.eyebrow}
              title={contact.hero.title}
              description={contact.hero.description}
            />

            <div className="glass-line rounded-[2rem] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-ocean/80">
                Tuba Travel
              </p>
              <p className="mt-4 text-lg leading-8 text-ink/75">
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
              <h2 className="text-3xl font-semibold tracking-tight text-ink">
                {contact.form.title}
              </h2>
              <p className="max-w-2xl text-base leading-7 text-ink/75">
                {contact.form.description}
              </p>
            </div>
            <ContactForm messages={contact.form} />
          </div>

          <div className="grid gap-6">
            <article className="soft-panel p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-sun">Email</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
                {contact.email.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-ink/75">
                {contact.email.description}
              </p>
              <p className="mt-4 text-sm font-medium text-ink">{contact.email.address}</p>
              <a
                href={emailUrl}
                className="mt-6 inline-flex rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-black/5"
              >
                {contact.email.button}
              </a>
            </article>

            <article className="glass-line rounded-[2rem] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-ocean/80">
                Tuba Travel
              </p>
              <p className="mt-4 text-base leading-7 text-ink/75">
                {contact.hero.trustMessage}
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
