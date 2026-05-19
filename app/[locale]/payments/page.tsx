import type { Locale } from "@/lib/i18n";
import ModuleCard from "@/components/platform/module-card";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";

type PaymentsPageProps = {
  params: { locale: Locale };
};

const paymentCards = [
  {
    eyebrow: "Checkout architecture",
    title: "Secure payment-ready booking flow",
    description:
      "The payment layer is structured for traveler checkout, booking deposits, final balances, and service-linked order records."
  },
  {
    eyebrow: "Partner payouts",
    title: "Commission-aware revenue distribution",
    description:
      "Partner payouts, TubaTour commissions, and service provider settlement rules are designed into the payment foundation from the start."
  },
  {
    eyebrow: "Compliance",
    title: "Refunds, receipts, and transaction oversight",
    description:
      "Payments are modeled for secure records, refund workflows, compliance visibility, and admin-level financial review."
  }
];

export default function PaymentsPage({ params }: PaymentsPageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "PAYMENTS",
    redirectTo: `/${locale}/payments`
  });

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Payments"
      title="Payment architecture for bookings, commissions, and payouts"
      description="The TubaTour payment layer is designed for secure traveler checkout, automated commission tracking, partner payouts, receipts, and marketplace-level financial oversight."
      primaryAction={{ href: `/${locale}/bookings`, label: "Open bookings" }}
      secondaryAction={{ href: `/${locale}/admin`, label: "Admin payment oversight" }}
      stats={[
        { label: "Checkout status", value: "Payment-ready", hint: "Prepared for Stripe or another payment provider" },
        { label: "Commission rules", value: "Automated", hint: "Marketplace revenue logic is structured into each order" },
        { label: "Live transactions", value: "0", hint: "Payment events will appear here once provider integrations are connected" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {paymentCards.map((card) => (
            <ModuleCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Payment operations"
          title="No live transaction data is connected yet"
          description="The payment architecture is already shaped for secure checkout, partner payouts, automated commissions, refunds, and finance reporting as soon as provider integrations are enabled."
          primaryAction={{ href: `/${locale}/featured-listings`, label: "Open featured listings" }}
          secondaryAction={{ href: `/${locale}/reviews`, label: "Review trust layer" }}
        />
      </section>
    </PlatformPageShell>
  );
}
