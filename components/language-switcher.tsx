"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLocale: Locale;
};

function replaceLocaleInPath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${nextLocale}`;
  }

  segments[0] = nextLocale;
  return `/${segments.join("/")}`;
}

export default function LanguageSwitcher({
  currentLocale
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 p-1 text-sm shadow-[0_14px_34px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        const href = replaceLocaleInPath(pathname, locale);

        return (
          <Link
            key={locale}
            href={href}
            className={`rounded-full px-3 py-1.5 font-medium uppercase tracking-wide ${
              isActive
                ? "bg-gradient-to-r from-brand-gold to-brand-turquoise text-brand-black shadow-[0_10px_24px_rgba(245,199,107,0.24)]"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
