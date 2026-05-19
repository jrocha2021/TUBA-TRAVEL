import Image from "next/image";
import Link from "next/link";
import { getNavigationLinks, type Locale, type Messages } from "@/lib/i18n";
import { createPartnerWhatsAppUrl, siteConfig } from "@/lib/site-config";
type FooterProps = {
  locale: Locale;
  messages: Messages;
};

export default function Footer({ locale, messages }: FooterProps) {
  const links = getNavigationLinks(locale);

  return (
    <footer className="mt-7 rounded-[2rem] border border-white/15 bg-[linear-gradient(180deg,rgba(0,0,0,0.62),rgba(10,12,10,0.82))] px-6 py-7 text-sm text-brand-muted shadow-[0_24px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
      <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
        <div className="space-y-3.5">
          <Link
            href={`/${locale}`}
            className="inline-flex w-[170px] items-center transition-opacity hover:opacity-90 sm:w-[190px] lg:w-[205px]"
          >
            <Image
              src="/images/branding/tubatour-logo-horizontal.png"
              alt={messages.brand.name}
              width={560}
              height={148}
              className="h-auto w-full object-contain"
            />
          </Link>
          <p>{messages.footer.tagline}</p>
          <p className="max-w-sm text-brand-muted-soft">{messages.footer.description}</p>
        </div>

        <div className="space-y-3.5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            {messages.footer.quickLinksTitle}
          </h3>
          <div className="flex flex-col gap-2.5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-muted transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3.5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            {messages.footer.contactTitle}
          </h3>
          <p className="text-white">{messages.footer.whatsapp}</p>
          <div className="flex flex-col gap-2.5 pt-1">
            <a
              href={siteConfig.whatsappPlanUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex text-brand-muted transition-colors hover:text-white"
            >
              {messages.common.chatOnWhatsapp}
            </a>
            <a
              href={createPartnerWhatsAppUrl("tourism partner")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex text-brand-muted transition-colors hover:text-white"
            >
              {messages.common.partnerInquiry}
            </a>
          </div>
          <p className="text-brand-muted-soft">
            © 2026 {messages.brand.name}. {messages.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
