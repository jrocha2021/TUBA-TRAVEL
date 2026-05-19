import type { ReactNode } from "react";
import Link from "next/link";
import SectionHeading from "@/components/section-heading";
import PlatformNav from "@/components/platform/platform-nav";
import PlatformStatGrid, { type PlatformStat } from "@/components/platform/stat-grid";
import { getRoleAwarePlatformNavigation } from "@/lib/platform/navigation";
import type { Locale } from "@/lib/i18n";
import {
  createClearMockSessionUrl,
  getMockSession,
  getSessionBadgeText
} from "@/lib/auth/session";

type Action = {
  href: string;
  label: string;
};

type PlatformPageShellProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  notice?: {
    eyebrow: string;
    description: string;
  };
  primaryAction?: Action;
  secondaryAction?: Action;
  stats?: PlatformStat[];
  children: ReactNode;
};

export default function PlatformPageShell({
  locale,
  eyebrow,
  title,
  description,
  notice,
  primaryAction,
  secondaryAction,
  stats,
  children
}: PlatformPageShellProps) {
  const session = getMockSession();
  const signOutHref = createClearMockSessionUrl(`/${locale}/signin`);

  return (
    <div className="brand-page-shell space-y-8 rounded-[2.5rem] px-4 py-4 pb-8 sm:px-6 sm:py-6 lg:px-8">
      <section className="section-space">
        <div className="soft-panel p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <SectionHeading eyebrow={eyebrow} title={title} description={description} />
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                {primaryAction && (
                  <Link
                    href={primaryAction.href}
                    className="brand-primary-button inline-flex items-center justify-center"
                  >
                    {primaryAction.label}
                  </Link>
                )}
                {secondaryAction && (
                  <Link
                    href={secondaryAction.href}
                    className="brand-secondary-button inline-flex items-center justify-center"
                  >
                    {secondaryAction.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformNav
          links={getRoleAwarePlatformNavigation(locale, session)}
          sessionLabel={getSessionBadgeText(session)}
          signOutHref={signOutHref}
          session={session}
        />
      </section>

      {notice && (
        <section className="section-space pt-0">
          <div className="glass-line rounded-[2rem] p-6 sm:p-7">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
              {notice.eyebrow}
            </p>
            <p className="mt-3 text-sm leading-7 text-brand-muted sm:text-base">
              {notice.description}
            </p>
          </div>
        </section>
      )}

      {stats && stats.length > 0 && (
        <section className="section-space pt-0">
          <PlatformStatGrid stats={stats} />
        </section>
      )}

      {children}
    </div>
  );
}
