import Link from "next/link";
import LanguageSwitcher from "@/components/language-switcher";
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

  return (
    <header className="sticky top-0 z-20 pt-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/80 px-5 py-4 shadow-[0_22px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href={`/${locale}`}
            className="text-xl font-semibold tracking-[0.04em] text-white transition-colors hover:text-brand-red"
          >
            {messages.brand.name}
          </Link>
          <p className="text-sm text-white/55">{messages.brand.location}</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-white/80">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-brand-red"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </header>
  );
}
