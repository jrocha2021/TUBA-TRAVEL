import type { Locale } from "@/lib/i18n";
import ModuleCard from "@/components/platform/module-card";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";

type AvailabilityPageProps = {
  params: { locale: Locale };
};

const availabilityCards = [
  {
    eyebrow: "Service schedules",
    title: "Calendar-aware availability for tours and transfers",
    description:
      "Availability is designed to support date slots, recurring schedules, capacity, cutoff times, and route-level booking windows."
  },
  {
    eyebrow: "Partner control",
    title: "Capacity, blackout dates, and schedule updates",
    description:
      "Partners will manage open dates, blackout periods, booking limits, and operational windows from one availability workspace."
  },
  {
    eyebrow: "Marketplace sync",
    title: "Availability linked to booking status and traveler checkout",
    description:
      "Calendar logic is shaped to prevent overbooking, reflect payment status, and keep public listings synchronized with real operational capacity."
  }
];

export default function AvailabilityPage({ params }: AvailabilityPageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "AVAILABILITY",
    redirectTo: `/${locale}/availability`
  });

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Availability calendar"
      title="Availability planning for listings, dates, and booking capacity"
      description="The availability module is designed for partner-managed schedules, date-specific inventory, capacity controls, and calendar-aware booking flows across the marketplace."
      primaryAction={{ href: `/${locale}/partner/dashboard`, label: "Partner operations" }}
      secondaryAction={{ href: `/${locale}/services/new`, label: "Create service setup" }}
      stats={[
        { label: "Calendar model", value: "Live-ready", hint: "Prepared for recurring dates, blackout periods, and cutoffs" },
        { label: "Capacity logic", value: "Per service", hint: "Supports traveler counts and booking limits" },
        { label: "Connected schedules", value: "0", hint: "Calendars populate when partner listings are activated" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {availabilityCards.map((card) => (
            <ModuleCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Calendar sync"
          title="No live availability records are connected yet"
          description="This workspace is ready for partner schedules, capacity limits, traveler date selection, booking cutoffs, and admin overrides as soon as live listing data is connected."
          primaryAction={{ href: `/${locale}/bookings`, label: "See booking states" }}
          secondaryAction={{ href: `/${locale}/partner/dashboard`, label: "Return to partner dashboard" }}
        />
      </section>
    </PlatformPageShell>
  );
}
