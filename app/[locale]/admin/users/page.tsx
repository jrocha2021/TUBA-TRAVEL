import type { Locale } from "@/lib/i18n";
import ModuleCard from "@/components/platform/module-card";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";

type AdminUsersPageProps = {
  params: { locale: Locale };
};

const userCards = [
  {
    eyebrow: "Traveler accounts",
    title: "Customer identities, booking history, and trust context",
    description:
      "The user layer is designed for traveler account records, booking history, saved services, review eligibility, and support context."
  },
  {
    eyebrow: "Partner accounts",
    title: "Provider identities and operational access",
    description:
      "Partner user records are structured around service ownership, availability operations, payouts, and profile publishing rights."
  },
  {
    eyebrow: "Admin controls",
    title: "Access review, suspension, and support escalation",
    description:
      "Admins can monitor access status, resolve support issues, and manage sensitive account changes through one control surface."
  }
];

export default function AdminUsersPage({ params }: AdminUsersPageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "ADMIN_USERS",
    redirectTo: `/${locale}/admin/users`
  });

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="User management"
      title="Traveler and partner account management"
      description="This admin route is designed for account oversight, access review, support visibility, and platform-level user management across travelers and providers."
      primaryAction={{ href: `/${locale}/admin`, label: "Back to admin dashboard" }}
      secondaryAction={{ href: `/${locale}/admin/partners`, label: "Review partner accounts" }}
      stats={[
        { label: "User roles", value: "3", hint: "Traveler, partner, and admin account models" },
        { label: "Support state", value: "Ready", hint: "Account issues and escalations connect here" },
        { label: "Live users", value: "0", hint: "User records appear after auth and onboarding are connected" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {userCards.map((card) => (
            <ModuleCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="User directory"
          title="No live account records are connected yet"
          description="This route is ready for traveler accounts, partner users, admin access review, suspension controls, and audit history as soon as real authentication and profile records are connected."
          primaryAction={{ href: `/${locale}/signin`, label: "Review sign-in foundation" }}
          secondaryAction={{ href: `/${locale}/platform-settings`, label: "Open platform settings" }}
        />
      </section>
    </PlatformPageShell>
  );
}
