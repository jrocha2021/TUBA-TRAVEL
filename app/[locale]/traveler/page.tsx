import type { Locale } from "@/lib/i18n";
import ModuleCard from "@/components/platform/module-card";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";
import { getRouteLabelForPath } from "@/lib/auth/access";
import { travelerDashboardCards } from "@/lib/platform/foundation";

type TravelerPageProps = {
  params: { locale: Locale };
  searchParams?: {
    notice?: string;
    from?: string;
  };
};

export default function TravelerPage({ params, searchParams }: TravelerPageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "TRAVELER_DASHBOARD",
    redirectTo: `/${locale}/traveler`
  });

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Traveler dashboard"
      title="Manage trips, bookings, and messages from one traveler workspace"
      description="This is the traveler-facing account foundation for upcoming bookings, saved services, internal messaging, and review history."
      notice={
        searchParams?.notice === "role-mismatch" && searchParams.from
          ? {
              eyebrow: "Access updated",
              description: `Your selected account type does not have access to ${getRouteLabelForPath(
                locale,
                searchParams.from
              )}. You have been redirected to the traveler dashboard.`
            }
          : undefined
      }
      primaryAction={{ href: `/${locale}/bookings`, label: "View bookings" }}
      secondaryAction={{ href: `/${locale}/messages`, label: "Open messages" }}
      stats={[
        { label: "Upcoming trips", value: "0", hint: "Booked services will appear in the traveler timeline" },
        { label: "Saved services", value: "0", hint: "Favorites and planned trips connect here" },
        { label: "Review-ready stays", value: "0", hint: "Completed bookings will unlock ratings and reviews" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {travelerDashboardCards.map((card) => (
            <ModuleCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Traveler activity"
          title="No traveler records are connected yet"
          description="This workspace is ready for live bookings, saved services, messages, payment history, and review prompts as soon as authentication and traveler data are connected."
          primaryAction={{ href: `/${locale}/services`, label: "Browse services" }}
          secondaryAction={{ href: `/${locale}/bookings`, label: "Open bookings module" }}
        />
      </section>
    </PlatformPageShell>
  );
}
