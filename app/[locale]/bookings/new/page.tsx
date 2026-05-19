import type { Locale } from "@/lib/i18n";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";
import { getBookingSummaryForService } from "@/lib/platform/bookings";
import { servicesCatalog } from "@/lib/platform/partner-services";

type NewBookingPageProps = {
  params: { locale: Locale };
  searchParams?: {
    service?: string;
    partner?: string;
  };
};

function BookingField({
  label,
  placeholder,
  value,
  textarea
}: {
  label: string;
  placeholder: string;
  value?: string;
  textarea?: boolean;
}) {
  const classes =
    "mt-3 w-full rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-brand-muted-soft focus:border-brand-blue focus:outline-none";
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-gold">{label}</span>
      {textarea ? (
        <textarea className={`${classes} min-h-[120px] resize-none`} placeholder={placeholder} defaultValue={value} />
      ) : (
        <input className={classes} placeholder={placeholder} defaultValue={value} />
      )}
    </label>
  );
}

export default function NewBookingPage({ params, searchParams }: NewBookingPageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "BOOKINGS_NEW",
    redirectTo: `/${locale}/bookings/new`
  });

  const fallbackService = servicesCatalog[0];
  const selectedService =
    (searchParams?.service && getBookingSummaryForService(searchParams.service)?.service) || fallbackService;
  const selectedPartner =
    (searchParams?.service && getBookingSummaryForService(searchParams.service)?.partner) ||
    (searchParams?.partner ? getBookingSummaryForService(servicesCatalog.find((service) => service.partnerSlug === searchParams.partner)?.slug ?? "")?.partner : null) ||
    getBookingSummaryForService(fallbackService.slug)?.partner;

  if (!selectedPartner) {
    throw new Error("Booking foundation partner mock data is missing.");
  }

  const estimatedGuests = 2;
  const estimatedTotal = Number(selectedService.price) * estimatedGuests;

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Request booking"
      title="Create a booking request for a TubaTour service or partner"
      description="Choose your date, time, guest count, and traveler notes. The booking request foundation already connects the selected service, partner, pricing estimate, and commission structure."
      primaryAction={{ href: `/${locale}/services/${selectedService.slug}`, label: "Back to service" }}
      secondaryAction={{ href: `/${locale}/bookings`, label: "My bookings" }}
      stats={[
        { label: "Selected service", value: selectedService.title, hint: "Service routing attaches this request to the published listing" },
        { label: "Estimated total", value: `${selectedService.currency} ${estimatedTotal}`, hint: "Preview of the current booking estimate before payment integration is connected" },
        { label: "Partner", value: selectedPartner.businessName, hint: "Traveler requests are routed into the correct partner booking view" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">Selected service summary</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{selectedService.title}</h3>
            <p className="mt-2 text-sm leading-7 text-brand-muted">
              {selectedService.category} · {selectedService.city}, {selectedService.island}
            </p>
            <p className="mt-4 text-sm leading-7 text-brand-muted">{selectedService.shortDescription}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">Partner</p>
                <p className="mt-3 text-sm text-white">{selectedPartner.businessName}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">Availability</p>
                <p className="mt-3 text-sm text-white">{selectedService.availabilitySummary}</p>
              </div>
            </div>
          </article>

          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">Partner summary</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{selectedPartner.businessName}</h3>
            <p className="mt-2 text-sm leading-7 text-brand-muted">
              {selectedPartner.city}, {selectedPartner.island} · {selectedPartner.languages.join(", ")}
            </p>
            <p className="mt-4 text-sm leading-7 text-brand-muted">{selectedPartner.shortBio}</p>
            <div className="mt-5 grid gap-3">
              <a href={`/${locale}/partners/${selectedPartner.slug}`} className="brand-secondary-button inline-flex items-center justify-center">
                View partner profile
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">Booking details</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <BookingField label="Date" placeholder="2026-06-12" />
              <BookingField label="Time slot" placeholder="09:00" />
              <BookingField label="Number of guests" placeholder="2" value="2" />
              <BookingField label="Estimated price per guest or base price" placeholder={`${selectedService.currency} ${selectedService.price}`} value={`${selectedService.currency} ${selectedService.price}`} />
              <div className="md:col-span-2">
                <BookingField
                  label="Special requests"
                  placeholder="Share dietary needs, pickup notes, mobility needs, or itinerary preferences."
                  textarea
                />
              </div>
            </div>
          </article>

          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">Booking summary</p>
            <div className="mt-5 space-y-3">
              {[
                ["Service", selectedService.title],
                ["Partner", selectedPartner.businessName],
                ["Guests", `${estimatedGuests}`],
                ["Estimated total", `${selectedService.currency} ${estimatedTotal}`],
                ["Commission estimate", `${selectedService.currency} ${(estimatedTotal * 0.15).toFixed(2)}`],
                ["Payment status", "Pending"]
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-xs uppercase tracking-[0.16em] text-brand-gold">{label}</span>
                  <span className="text-sm text-white">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3">
              <button type="button" className="brand-primary-button inline-flex items-center justify-center">
                Submit booking request
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Booking request foundation"
          title="This request flow is ready for connected availability, traveler accounts, and payment orchestration"
          description="Live date pickers, capacity checks, traveler identity, and transaction writes are not connected yet, but the request shell already reflects the booking data a marketplace checkout needs."
          primaryAction={{ href: `/${locale}/bookings`, label: "Back to bookings" }}
          secondaryAction={{ href: `/${locale}/services`, label: "Browse more services" }}
        />
      </section>
    </PlatformPageShell>
  );
}
