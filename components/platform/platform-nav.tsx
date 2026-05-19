"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PlatformNavLink } from "@/lib/platform/navigation";
import type { MockAuthSession } from "@/lib/auth/session";

type PlatformNavProps = {
  links: PlatformNavLink[];
  sessionLabel: string;
  signOutHref: string;
  session: MockAuthSession | null;
};

export default function PlatformNav({ links, sessionLabel, signOutHref, session }: PlatformNavProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="soft-panel p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand-gold">
            Platform navigation
          </p>
          <p className="text-xs text-brand-muted-soft">{sessionLabel}</p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <p className="text-xs text-brand-muted-soft">
            {session ? "Account permissions" : "Marketplace links"}
          </p>
          {session && (
            <Link href={signOutHref} className="brand-secondary-button !px-3 !py-1.5 text-[0.68rem]">
              Sign out
            </Link>
          )}
        </div>
      </div>
      <nav className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors sm:text-[0.78rem] ${
              isActive(link.href)
                ? "bg-white/14 text-white shadow-[0_8px_20px_rgba(14,165,233,0.16)]"
                : "border border-white/10 bg-white/[0.04] text-brand-muted hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {session && (
        <div className="mt-3 sm:hidden">
          <Link href={signOutHref} className="brand-secondary-button inline-flex items-center justify-center !px-3 !py-2 text-[0.68rem]">
            Sign out
          </Link>
        </div>
      )}
    </div>
  );
}
