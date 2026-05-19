import type { Locale } from "@/lib/i18n";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";

type PartnerNotFoundPageProps = {
  params: {
    locale: Locale;
  };
};

export default function PartnerNotFoundPage({ params }: PartnerNotFoundPageProps) {
  const { locale } = params;

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Partner not found"
      title="This partner profile is not available"
      description="The requested partner page could not be found in the current marketplace directory. You can continue browsing verified providers and published services from the main catalog."
      primaryAction={{ href: `/${locale}/partners`, label: "Browse partners" }}
      secondaryAction={{ href: `/${locale}/services`, label: "View services" }}
    >
      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Directory lookup"
          title="No public partner profile matches that link"
          description="The link may be outdated, unpublished, or not yet connected to a live marketplace provider record."
          primaryAction={{ href: `/${locale}/services`, label: "Open services" }}
          secondaryAction={{ href: `/${locale}/contact`, label: "Contact TubaTour" }}
        />
      </section>
    </PlatformPageShell>
  );
}
