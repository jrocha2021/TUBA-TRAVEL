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
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm backdrop-blur">
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        const href = replaceLocaleInPath(pathname, locale);

        return (
          <Link
            key={locale}
            href={href}
            className={`rounded-full px-3 py-1.5 font-medium uppercase tracking-wide ${
              isActive
                ? "bg-brand-red text-white shadow-[0_8px_24px_rgba(225,6,44,0.28)]"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
