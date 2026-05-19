import type { Locale } from "@/lib/i18n";
import ModuleCard from "@/components/platform/module-card";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";

type CommissionsPageProps = {
  params: { locale: Locale };
};

const commissionCards = [
  {
    eyebrow: "Marketplace revenue",
    title: "Automatic commission tracking per booking",
    description:
      "Commission logic is designed to connect traveler payments, partner payouts, discounts, and net platform revenue at the order level."
  },
  {
    eyebrow: "Partner economics",
    title: "Settlement visibility across providers and categories",
    description:
      "The commission layer is structured for destination-level reporting, provider earnings, featured listing revenue, and payout readiness."
  },
  {
    eyebrow: "Admin oversight",
    title: "Protected financial controls and audit reporting",
    description:
      "Admins can review commission policies, override edge cases, and inspect revenue records through one secure marketplace control layer."
  }
];

export default function CommissionsPage({ params }: CommissionsPageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "COMMISSIONS",
    redirectTo: `/${locale}/commissions`
  });

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Commissions"
      title="Commission tracking and marketplace revenue controls"
      description="This admin-facing module is designed for automated commission calculation, payout readiness, category-level reporting, and marketplace revenue visibility."
      primaryAction={{ href: `/${locale}/payments`, label: "Open payments" }}
      secondaryAction={{ href: `/${locale}/admin`, label: "Return to admin dashboard" }}
      stats={[
        { label: "Commission rules", value: "Automated", hint: "Order-level revenue logic is part of the foundation" },
        { label: "Payout states", value: "Tracked", hint: "Settlement and approval stages connect here" },
        { label: "Live payouts", value: "0", hint: "Revenue data appears when transactions are connected" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {commissionCards.map((card) => (
            <ModuleCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Commission ledger"
          title="No live commission records are connected yet"
          description="The structure is ready for booking-linked commission rows, provider payout states, revenue reporting, and finance approvals as soon as payment records are enabled."
          primaryAction={{ href: `/${locale}/payments`, label: "Review payment architecture" }}
          secondaryAction={{ href: `/${locale}/featured-listings`, label: "Review monetization modules" }}
        />
      </section>
    </PlatformPageShell>
  );
}
