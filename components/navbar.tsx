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
    <header className="sticky top-0 z-10 pt-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-black/5 bg-white/85 px-5 py-4 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
        <div>
          <Link href={`/${locale}`} className="text-xl font-semibold tracking-tight">
            {messages.brand.name}
          </Link>
          <p className="text-sm text-ink/65">{messages.brand.location}</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-ink/80">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-ocean">
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
