import { siteConfig } from "@/lib/site-config";

export default function FloatingWhatsApp() {
  return (
    <a
      href={siteConfig.whatsappFloatingUrl}
      target="_blank"
      rel="noreferrer"
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.35rem)",
        right: "calc(env(safe-area-inset-right, 0px) + 1rem)"
      }}
      className="fixed z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[linear-gradient(135deg,rgba(245,199,107,0.94),rgba(14,165,233,0.9))] p-0 text-sm font-semibold text-brand-black shadow-[0_10px_22px_rgba(14,165,233,0.14)] transition-all duration-200 hover:translate-y-[-1px] hover:shadow-[0_14px_28px_rgba(245,199,107,0.18)] sm:h-auto sm:w-auto sm:gap-2 sm:px-3 sm:py-2 lg:px-3 lg:py-1.95 xl:gap-2.5 xl:px-3.25 xl:py-2.1"
    >
      <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-brand-black/10 text-sm text-brand-black sm:h-7 sm:w-7 sm:text-base">
        W
      </span>
      <span className="hidden xl:inline">Plan Your Trip</span>
    </a>
  );
}
