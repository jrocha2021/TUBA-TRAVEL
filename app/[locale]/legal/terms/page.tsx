import type { Locale } from "@/lib/i18n";
import PlatformPageShell from "@/components/platform/page-shell";

type TermsPageProps = {
  params: { locale: Locale };
};

export default function TermsPage({ params }: TermsPageProps) {
  const { locale } = params;

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Legal foundation"
      title="Terms and marketplace policies"
      description="TubaTours marketplace terms will govern partner participation, traveler bookings, commission mechanics, featured listings, cancellations, disputes, and content standards."
      primaryAction={{ href: `/${locale}/legal/privacy`, label: "View privacy policy" }}
      secondaryAction={{ href: `/${locale}/dashboard`, label: "Platform hub" }}
    >
      <section className="section-space pt-0">
        <div className="soft-panel p-6 sm:p-8">
          <div className="space-y-5 text-base leading-7 text-brand-muted">
            <p>Marketplace terms will define the responsibilities of travelers, partners, and the TubaTours operations team.</p>
            <p>This route is now part of the platform foundation so legal content has a dedicated home before live payments and account flows are released.</p>
          </div>
        </div>
      </section>
    </PlatformPageShell>
  );
}
