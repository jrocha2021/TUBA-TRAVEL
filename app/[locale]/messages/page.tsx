import type { Locale } from "@/lib/i18n";
import ModuleCard from "@/components/platform/module-card";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";

type MessagesPageProps = {
  params: { locale: Locale };
};

const messagingCards = [
  {
    eyebrow: "Traveler messaging",
    title: "Trip-specific conversations",
    description:
      "Travelers should be able to message partners and the TubaTours team inside booking-linked threads."
  },
  {
    eyebrow: "Partner messaging",
    title: "Operational inbox for availability and service details",
    description:
      "Partners need structured communication for pickups, confirmations, dietary requests, and itinerary questions."
  },
  {
    eyebrow: "Admin messaging",
    title: "Escalation and dispute visibility",
    description:
      "Admins need oversight for support escalation, quality incidents, and refund-related conversations."
  }
];

export default function MessagesPage({ params }: MessagesPageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "MESSAGES",
    redirectTo: `/${locale}/messages`
  });

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Internal messaging"
      title="Unified communication between travelers, partners, and admins"
      description="This route establishes messaging as a core marketplace module rather than an external ad-hoc chat flow."
      primaryAction={{ href: `/${locale}/bookings`, label: "Back to bookings" }}
      secondaryAction={{ href: `/${locale}/dashboard`, label: "Dashboard hub" }}
      stats={[
        { label: "Message roles", value: "3", hint: "Traveler, partner, and admin threads" },
        { label: "Linked modules", value: "Bookings", hint: "Conversations attach to booking and service records" },
        { label: "Active threads", value: "0", hint: "Live communication will populate here once accounts connect" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {messagingCards.map((card) => (
            <ModuleCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Conversation layer"
          title="No live message threads are connected yet"
          description="The messaging module is ready for booking-linked conversations, partner updates, support escalation, and trust-sensitive communication once sessions and booking records are active."
          primaryAction={{ href: `/${locale}/bookings`, label: "Review booking flow" }}
          secondaryAction={{ href: `/${locale}/traveler`, label: "Traveler workspace" }}
        />
      </section>
    </PlatformPageShell>
  );
}
