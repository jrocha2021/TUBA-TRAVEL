import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getMessages, isValidLocale, locales } from "@/lib/i18n";
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
      <main className="flex-1 py-10">{children}</main>
      <Footer messages={messages} />
    </div>
  );
}
