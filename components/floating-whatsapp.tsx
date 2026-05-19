import { siteConfig } from "@/lib/site-config";

export default function FloatingWhatsApp() {
  return (
    <a
      href={siteConfig.whatsappFloatingUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-3.5 right-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[linear-gradient(135deg,rgba(245,199,107,0.94),rgba(14,165,233,0.9))] p-0 text-sm font-semibold text-brand-black shadow-[0_10px_22px_rgba(14,165,233,0.14)] transition-all duration-200 hover:translate-y-[-1px] hover:shadow-[0_14px_28px_rgba(245,199,107,0.18)] sm:bottom-8 sm:right-6 sm:h-auto sm:w-auto sm:gap-3 sm:px-4 sm:py-3"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-black/10 text-sm text-brand-black sm:h-8 sm:w-8 sm:text-base">
        W
      </span>
      <span className="hidden sm:inline">Plan your trip</span>
    </a>
  );
}
