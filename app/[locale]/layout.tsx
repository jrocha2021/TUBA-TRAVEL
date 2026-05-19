import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getMessages, isValidLocale, locales } from "@/lib/i18n";
import CookieBanner from "@/components/cookie-banner";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale as Locale);

  return (
    <div className="page-shell">
      <Navbar locale={locale} messages={messages} />
      <main className="flex-1 pb-28 pt-5 sm:pb-24 sm:pt-6">{children}</main>
      <Footer locale={locale as Locale} messages={messages} />
      <FloatingWhatsApp />
      <CookieBanner locale={locale as Locale} />
    </div>
  );
}
