"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const STORAGE_KEY = "tubatours-cookie-consent";

type CookieBannerProps = {
  locale: Locale;
};

export default function CookieBanner({ locale }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setVisible(true);
    }
  }, []);

  function acceptCookies() {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[min(96vw,56rem)] -translate-x-1/2 rounded-[1.75rem] border border-white/14 bg-[linear-gradient(180deg,rgba(8,12,18,0.92),rgba(6,18,28,0.96))] px-4 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:bottom-6 sm:px-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
            Privacy and consent
          </p>
          <p className="max-w-3xl text-sm leading-6 text-brand-muted">
            TubaTours uses essential cookies for navigation, language preferences, secure account
            access, booking flows, consent handling, and privacy compliance across the marketplace.
            Additional controls support payments, partner tools, and traveler services as connected
            platform modules are enabled.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/${locale}/legal/privacy`}
            className="brand-secondary-button inline-flex items-center justify-center"
          >
            Privacy policy
          </Link>
          <button
            type="button"
            onClick={acceptCookies}
            className="brand-primary-button inline-flex items-center justify-center"
          >
            Accept cookies
          </button>
        </div>
      </div>
    </div>
  );
}
