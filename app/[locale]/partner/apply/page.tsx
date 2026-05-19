import type { Locale } from "@/lib/i18n";
import ModuleCard from "@/components/platform/module-card";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { partnerApplicationSteps } from "@/lib/platform/foundation";

type PartnerApplyPageProps = {
  params: { locale: Locale };
};

export default function PartnerApplyPage({ params }: PartnerApplyPageProps) {
  const { locale } = params;

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Partner onboarding"
      title="Apply as a marketplace partner"
      description="Tour guides, transfer drivers, hotels, Airbnb hosts, restaurants, and local experience providers all enter through one structured onboarding flow."
      primaryAction={{ href: `/${locale}/partner/dashboard`, label: "Preview dashboard" }}
      secondaryAction={{ href: `/${locale}/partners`, label: "Explore partner network" }}
      stats={[
        { label: "Partner categories", value: "6", hint: "Guides, drivers, hosts, dining, and experience providers" },
        { label: "Approval stages", value: "4", hint: "Application, review, activation, and publishing" },
        { label: "Profile readiness", value: "Account-ready", hint: "Onboarding is designed for trust and quality" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {partnerApplicationSteps.map((card) => (
            <ModuleCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Onboarding intake"
          title="Partner applications will appear here once the live onboarding form is connected"
          description="The flow is already designed for verification, public profile setup, service publishing, availability planning, featured visibility, and payout-aware operations."
          primaryAction={{ href: `/${locale}/partner/dashboard`, label: "Open partner dashboard" }}
          secondaryAction={{ href: `/${locale}/featured-listings`, label: "View featured model" }}
        />
      </section>
    </PlatformPageShell>
  );
}
