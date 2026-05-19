import type { Locale } from "@/lib/i18n";
import PlatformPageShell from "@/components/platform/page-shell";
import ModuleCard from "@/components/platform/module-card";
import PlatformEmptyState from "@/components/platform/empty-state";
import { roleEntryCards } from "@/lib/platform/foundation";

type DashboardHubPageProps = {
  params: { locale: Locale };
};

export default function DashboardHubPage({ params }: DashboardHubPageProps) {
  const { locale } = params;

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Marketplace workspace"
      title="Choose your TubaTours platform area"
      description="This dashboard hub is the foundation for a full Cape Verde tourism marketplace. Travelers, partners, and admins enter role-specific workflows from here."
      primaryAction={{ href: `/${locale}/signin`, label: "Open sign in" }}
      secondaryAction={{ href: `/${locale}/services`, label: "Browse marketplace" }}
      stats={[
        { label: "Platform roles", value: "3", hint: "Traveler, partner, and admin account pathways" },
        { label: "Core modules", value: "15", hint: "Bookings, payments, messaging, reviews, settings, and more" },
        { label: "Route readiness", value: "Live", hint: "Marketplace shell routes are connected and mobile-friendly" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {roleEntryCards.map((card) => (
            <ModuleCard key={card.role} {...card} action={{ ...card.action!, href: `/${locale}${card.action!.href}` }} />
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Account activation"
          title="Live account records will appear here once authentication and seeded users are connected"
          description="The navigation, role routing, and page structure are already in place so traveler, partner, and admin experiences can attach to real sessions and data without redesigning the marketplace shell."
          primaryAction={{ href: `/${locale}/signin`, label: "Review sign in flow" }}
          secondaryAction={{ href: `/${locale}/services`, label: "Inspect catalog routes" }}
        />
      </section>
    </PlatformPageShell>
  );
}
