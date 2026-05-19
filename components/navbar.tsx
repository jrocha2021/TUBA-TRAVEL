"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "@/components/language-switcher";
import { siteConfig } from "@/lib/site-config";
import {
  getNavigationLinks,
  type Locale,
  type Messages
} from "@/lib/i18n";

type NavbarProps = {
  locale: Locale;
  messages: Messages;
};

export default function Navbar({ locale, messages }: NavbarProps) {
  const links = getNavigationLinks(locale);
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function isActiveLink(href: string) {
    if (href.includes("#")) {
      return pathname === `/${locale}` && href.startsWith(`/${locale}/#`);
    }

    if (href === `/${locale}`) {
      return pathname === href;
    }

    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-30 pt-1 sm:pt-1.5">
      <div className="flex flex-col gap-1.5 rounded-[1.1rem] border border-white/15 bg-[linear-gradient(180deg,rgba(0,0,0,0.72),rgba(10,12,10,0.58))] px-3.5 py-1.25 shadow-[0_16px_36px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:flex-row lg:items-center lg:gap-2 lg:rounded-[1.25rem] lg:px-4 lg:py-1 xl:px-5">
        <div className="flex items-center justify-between gap-2 lg:shrink-0 lg:pr-0">
          <div className="flex items-center">
            <Link
              href={`/${locale}`}
              className="inline-flex w-[186px] items-center transition-opacity hover:opacity-90 sm:w-[204px] lg:w-[360px] xl:w-[388px]"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                src="/images/branding/tubatour-logo-horizontal.png"
                alt={messages.brand.name}
                width={560}
                height={148}
                priority
                className="h-auto w-full object-contain"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={siteConfig.whatsappPlanUrl}
              target="_blank"
              rel="noreferrer"
              className="brand-primary-button inline-flex shrink-0 items-center whitespace-nowrap !px-3.5 !py-[0.35rem] text-[11px]"
            >
              {messages.nav.bookNow}
            </a>
            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white shadow-[0_10px_22px_rgba(0,0,0,0.16)]"
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
            >
              <span className="text-lg">{isMenuOpen ? "×" : "☰"}</span>
            </button>
          </div>
        </div>

        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } min-w-0 flex-col gap-2 lg:flex lg:flex-1 lg:flex-row lg:items-center lg:gap-2 xl:gap-2.5`}
        >
          <nav className="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-0.5 text-[13px] font-medium text-white/80 lg:min-w-0 lg:flex-1 lg:flex-nowrap lg:justify-start lg:overflow-visible lg:pb-0 lg:-ml-1 lg:text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`shrink-0 rounded-full px-2.5 py-1.25 transition-colors lg:px-2.5 lg:py-[0.3rem] xl:px-3 ${
                  isActiveLink(link.href)
                    ? "bg-white/16 text-white shadow-[0_8px_20px_rgba(14,165,233,0.18)]"
                    : "hover:text-brand-sand"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5 lg:gap-2">
            <a
              href={siteConfig.whatsappPlanUrl}
              target="_blank"
              rel="noreferrer"
              className="brand-primary-button hidden items-center !px-4 !py-[0.4rem] lg:inline-flex xl:!px-[1.35rem]"
            >
              {messages.nav.bookNow}
            </a>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
}
