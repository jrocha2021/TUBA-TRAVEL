import type { Locale } from "@/lib/i18n";
import ModuleCard from "@/components/platform/module-card";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { getRouteLabelForPath, requirePlatformAccess } from "@/lib/auth/access";
import { getMockSession } from "@/lib/auth/session";
import { adminDashboardCards } from "@/lib/platform/foundation";

type AdminPageProps = {
  params: { locale: Locale };
  searchParams?: {
    notice?: string;
    from?: string;
  };
};

export default function AdminPage({ params, searchParams }: AdminPageProps) {
  const { locale } = params;
  const session = getMockSession();
  requirePlatformAccess({
    locale,
    key: "ADMIN_DASHBOARD",
    redirectTo: `/${locale}/admin`
  });

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Admin dashboard"
      title="Marketplace operations, approvals, trust, and revenue oversight"
      description="The admin workspace is the control center for partner approvals, service quality, commissions, promotions, fraud monitoring, and policy enforcement."
      notice={
        !session
          ? {
              eyebrow: "Demo preview access",
              description:
                "You are viewing the admin dashboard in MVP preview mode so the marketplace control UI can be tested without a live authentication provider."
            }
          : searchParams?.notice === "role-mismatch" && searchParams.from
          ? {
              eyebrow: "Access updated",
              description: `Your selected account type does not have access to ${getRouteLabelForPath(
                locale,
                searchParams.from
              )}. You have been redirected to the admin dashboard.`
            }
          : undefined
      }
      primaryAction={{ href: `/${locale}/admin/bookings`, label: "Booking control" }}
      secondaryAction={{ href: `/${locale}/platform-settings`, label: "Platform settings" }}
      stats={[
        { label: "Pending approvals", value: "0", hint: "Partner and listing review queues surface here" },
        { label: "Featured slots", value: "0", hint: "Sponsored placement inventory is managed centrally" },
        { label: "Trust alerts", value: "0", hint: "Suspicious activity and moderation flags connect here" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {adminDashboardCards.map((card) => (
            <ModuleCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Marketplace oversight"
          title="Admin records will appear here once approvals, payouts, and moderation workflows are connected"
          description="This control center is already structured for partner onboarding, listing governance, featured campaigns, commission oversight, and trust operations."
          primaryAction={{ href: `/${locale}/featured-listings`, label: "Open featured listings" }}
          secondaryAction={{ href: `/${locale}/payments`, label: "Review payment layer" }}
        />
      </section>
    </PlatformPageShell>
  );
}
