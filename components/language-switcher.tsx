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
    <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 p-1 text-sm">
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        const href = replaceLocaleInPath(pathname, locale);

        return (
          <Link
            key={locale}
            href={href}
            className={`rounded-full px-3 py-1.5 font-medium uppercase tracking-wide ${
              isActive
                ? "bg-ocean text-white"
                : "text-ink/70 hover:bg-black/5 hover:text-ink"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
