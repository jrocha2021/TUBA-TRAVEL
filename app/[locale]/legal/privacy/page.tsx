import type { Locale } from "@/lib/i18n";
import PlatformPageShell from "@/components/platform/page-shell";

type PrivacyPageProps = {
  params: { locale: Locale };
};

export default function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = params;

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Legal foundation"
      title="Privacy policy"
      description="TubaTours will process traveler, partner, booking, payment, and communication data under a structured privacy framework as the marketplace backend is introduced."
      primaryAction={{ href: `/${locale}/legal/terms`, label: "View terms" }}
      secondaryAction={{ href: `/${locale}/contact`, label: "Contact TubaTours" }}
    >
      <section className="section-space pt-0">
        <div className="soft-panel p-6 sm:p-8">
          <div className="space-y-5 text-base leading-7 text-brand-muted">
            <p>Privacy coverage includes account data, booking data, partner business records, payment metadata, messaging records, reviews, cookies, and compliance logs.</p>
            <p>This page establishes the legal route structure now. Full policy text should be published once the live authentication, bookings, messaging, and payments stack is connected.</p>
          </div>
        </div>
      </section>
    </PlatformPageShell>
  );
}
