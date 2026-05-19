import type { Locale } from "@/lib/i18n";
import ModuleCard from "@/components/platform/module-card";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";

type FeaturedListingsPageProps = {
  params: { locale: Locale };
};

const featuredCards = [
  {
    eyebrow: "Partner growth",
    title: "Paid featured placement opportunities",
    description:
      "Partners can be promoted through sponsored listing placement, category highlights, seasonal campaigns, and priority discovery slots."
  },
  {
    eyebrow: "Marketplace control",
    title: "Admin-managed inventory and campaign governance",
    description:
      "Admins control which services appear in featured areas, how long placements run, and how campaign performance is tracked."
  },
  {
    eyebrow: "Commercial reporting",
    title: "Featured spend, conversion, and commission visibility",
    description:
      "Featured listings are structured to connect promotional spend with booking performance, revenue contribution, and partner ROI."
  }
];

export default function FeaturedListingsPage({ params }: FeaturedListingsPageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "FEATURED_LISTINGS",
    redirectTo: `/${locale}/featured-listings`
  });

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Featured listings"
      title="Paid placement and promotional visibility for marketplace partners"
      description="Featured listings are part of the TubaTour monetization layer, giving verified partners ways to boost discovery while the admin team maintains quality, fairness, and performance visibility."
      primaryAction={{ href: `/${locale}/payments`, label: "Open payments layer" }}
      secondaryAction={{ href: `/${locale}/admin`, label: "Admin control center" }}
      stats={[
        { label: "Featured zones", value: "Multi-surface", hint: "Homepage, category, destination, and partner promotion slots" },
        { label: "Campaign logic", value: "Structured", hint: "Supports seasonal promotions and sponsored boosts" },
        { label: "Live placements", value: "0", hint: "Featured inventory appears once partner campaigns are connected" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredCards.map((card) => (
            <ModuleCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Promotional inventory"
          title="No paid featured listings are connected yet"
          description="This module is ready for sponsored placement purchases, admin-approved campaigns, promo reporting, and partner-facing discovery boosts once monetization services are connected."
          primaryAction={{ href: `/${locale}/services`, label: "Open services catalog" }}
          secondaryAction={{ href: `/${locale}/reviews`, label: "Review reputation module" }}
        />
      </section>
    </PlatformPageShell>
  );
}
