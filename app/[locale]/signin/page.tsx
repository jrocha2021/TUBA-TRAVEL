import type { Locale } from "@/lib/i18n";
import ModuleCard from "@/components/platform/module-card";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { roleEntryCards } from "@/lib/platform/foundation";
import { createMockSessionRedirectUrl } from "@/lib/auth/session";
import { getRouteLabelForPath, resolvePostSignInRedirect } from "@/lib/auth/access";

type SignInPageProps = {
  params: { locale: Locale };
  searchParams?: {
    next?: string;
    denied?: string;
    error?: string;
  };
};

export default function SignInPage({ params, searchParams }: SignInPageProps) {
  const { locale } = params;
  const nextPath = searchParams?.next || `/${locale}/dashboard`;
  const nextLabel = getRouteLabelForPath(locale, nextPath);

  const travelerRedirect = resolvePostSignInRedirect({
    locale,
    role: "TRAVELER",
    requestedPath: nextPath
  });
  const partnerRedirect = resolvePostSignInRedirect({
    locale,
    role: "PARTNER",
    partnerStatus: "APPROVED",
    requestedPath: nextPath
  });
  const adminRedirect = resolvePostSignInRedirect({
    locale,
    role: "ADMIN",
    requestedPath: nextPath
  });

  const roleActions = {
    TRAVELER: {
      href: createMockSessionRedirectUrl({
        role: "TRAVELER",
        locale,
        redirectTo: travelerRedirect.redirectTo
      }),
      label: "Continue as Traveler",
      nativeNavigation: true
    },
    PARTNER: {
      href: createMockSessionRedirectUrl({
        role: "PARTNER",
        locale,
        redirectTo: partnerRedirect.redirectTo,
        partnerStatus: "APPROVED"
      }),
      label: "Continue as Partner",
      nativeNavigation: true
    },
    ADMIN: {
      href: createMockSessionRedirectUrl({
        role: "ADMIN",
        locale,
        redirectTo: adminRedirect.redirectTo
      }),
      label: "Continue as Admin",
      nativeNavigation: true
    }
  } as const;

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Sign in"
      title="Access your TubaTour marketplace account"
      description="Choose the account area that matches your role so you can continue with bookings, partner operations, or marketplace management."
      primaryAction={{ href: `/${locale}/dashboard`, label: "Open dashboard hub" }}
      secondaryAction={{ href: `/${locale}/partner/apply`, label: "Become a partner" }}
      stats={[
        { label: "Account types", value: "3", hint: "Traveler, partner, and admin account entry points" },
        { label: "Marketplace access", value: "Role-based", hint: "Each dashboard opens only the tools available to that account type" },
        { label: "Secure account access", value: "Enabled", hint: "Choose your account type to continue into the correct marketplace workspace" }
      ]}
    >
      {searchParams?.next && (
        <section className="section-space pt-0">
          <div className="glass-line rounded-[2rem] p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
              Continue access
            </p>
            <p className="mt-3 text-base leading-7 text-brand-muted">
              Sign in to continue to <span className="text-white">{nextLabel}</span>.
            </p>
          </div>
        </section>
      )}

      {(searchParams?.denied || searchParams?.error) && (
        <section className="section-space pt-0">
          <div className="glass-line rounded-[2rem] p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
              Access notice
            </p>
            <p className="mt-3 text-base leading-7 text-brand-muted">
              {searchParams?.error === "invalid-role"
                ? "That account selection could not be created. Please choose one of the supported TubaTour roles below."
                : "That route is restricted for your current access level. Choose the appropriate account below to continue within the correct marketplace area."}
            </p>
          </div>
        </section>
      )}

      {searchParams?.next && (
        <section className="section-space pt-0">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                label: "Traveler access",
                value: travelerRedirect.downgraded ? "Traveler dashboard" : nextLabel,
                hint: travelerRedirect.downgraded
                  ? "If the selected area is not available to travelers, the account opens in the traveler dashboard."
                  : "This account can continue directly to the requested area."
              },
              {
                label: "Partner access",
                value: partnerRedirect.downgraded ? "Partner dashboard" : nextLabel,
                hint: partnerRedirect.downgraded
                  ? "Partner accounts continue to the approved partner dashboard when the requested area is outside partner access."
                  : "Approved partners can continue directly to the requested area."
              },
              {
                label: "Admin access",
                value: adminRedirect.downgraded ? "Admin dashboard" : nextLabel,
                hint: adminRedirect.downgraded
                  ? "Admin access opens the admin dashboard when another role-only area was requested."
                  : "Admins can continue directly to the requested area."
              }
            ].map((item) => (
              <div key={item.label} className="soft-panel p-5">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
                  {item.label}
                </p>
                <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-brand-muted">{item.hint}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {roleEntryCards.map((card) => (
            <ModuleCard
              key={card.role}
              {...card}
              action={roleActions[card.role]}
            />
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Secure platform access"
          title="Choose the account area that matches your marketplace role"
          description="Traveler, partner, and admin access paths are organized around account permissions, dashboard tools, and protected marketplace routes."
          primaryAction={{ href: `/${locale}/traveler`, label: "Traveler dashboard" }}
          secondaryAction={{ href: `/${locale}/admin`, label: "Admin dashboard" }}
        />
      </section>

      <section className="section-space pt-0">
        <div className="soft-panel p-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
            Partner approval status
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-brand-muted">
            Review how marketplace access changes for partner accounts based on approval status.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {(["PENDING", "APPROVED", "REJECTED", "SUSPENDED"] as const).map((status) => (
              <a
                key={status}
                href={createMockSessionRedirectUrl({
                  role: "PARTNER",
                  locale,
                  redirectTo: `/${locale}/partner/dashboard`,
                  partnerStatus: status
                })}
                className="brand-secondary-button inline-flex items-center justify-center"
              >
                Partner · {status}
              </a>
            ))}
          </div>
        </div>
      </section>
    </PlatformPageShell>
  );
}
