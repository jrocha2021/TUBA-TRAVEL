import type { Locale } from "@/lib/i18n";
import ModuleCard from "@/components/platform/module-card";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";

type PlatformSettingsPageProps = {
  params: { locale: Locale };
};

const settingsCards = [
  {
    eyebrow: "Marketplace configuration",
    title: "Destinations, categories, and featured logic",
    description:
      "Platform settings are designed to manage the marketplace taxonomy, featured rules, policy flags, and presentation-level controls."
  },
  {
    eyebrow: "Trust and compliance",
    title: "Cookie, legal, approval, and moderation settings",
    description:
      "Admins will manage consent requirements, legal content, approval thresholds, and quality controls through this operations layer."
  },
  {
    eyebrow: "Platform operations",
    title: "Auth provider, messaging, and payment service connectors",
    description:
      "This area is reserved for secure configuration of authentication, transactional email, messaging, and payment integrations."
  }
];

export default function PlatformSettingsPage({ params }: PlatformSettingsPageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "PLATFORM_SETTINGS",
    redirectTo: `/${locale}/platform-settings`
  });

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Platform settings"
      title="Marketplace configuration, compliance, and connector settings"
      description="This admin module is the foundation for platform-wide configuration across content, trust, commerce, auth, messaging, and provider integrations."
      primaryAction={{ href: `/${locale}/admin`, label: "Back to admin dashboard" }}
      secondaryAction={{ href: `/${locale}/legal/privacy`, label: "Review privacy foundation" }}
      stats={[
        { label: "Config domains", value: "5", hint: "Content, trust, commerce, messaging, and auth" },
        { label: "Connector state", value: "Foundation", hint: "Ready for secure provider integration later" },
        { label: "Live settings", value: "0", hint: "Operational settings appear when backend config is enabled" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {settingsCards.map((card) => (
            <ModuleCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Configuration layer"
          title="No live platform settings are connected yet"
          description="This route is prepared for secure environment-aware configuration, feature flags, approval policies, consent settings, and partner marketplace controls."
          primaryAction={{ href: `/${locale}/commissions`, label: "Review commission controls" }}
          secondaryAction={{ href: `/${locale}/admin`, label: "Return to admin" }}
        />
      </section>
    </PlatformPageShell>
  );
}
