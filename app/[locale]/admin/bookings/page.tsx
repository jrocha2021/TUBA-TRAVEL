import type { Locale } from "@/lib/i18n";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";
import { getMockSession } from "@/lib/auth/session";
import {
  bookingsCatalog,
  bookingStatuses,
  getBookingStatusLabel,
  getBookingStatusPillClass,
  getPaymentStatusLabel
} from "@/lib/platform/bookings";

type AdminBookingsPageProps = {
  params: { locale: Locale };
};

export default function AdminBookingsPage({ params }: AdminBookingsPageProps) {
  const { locale } = params;
  const session = getMockSession();
  requirePlatformAccess({
    locale,
    key: "ADMIN_BOOKINGS",
    redirectTo: `/${locale}/admin/bookings`
  });

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Booking control"
      title="Monitor booking status, payment progress, and commission flow across the marketplace"
      description="The admin booking layer centralizes traveler requests, partner routing, payment status, commission estimates, and marketplace quality control across all booking records."
      notice={
        !session
          ? {
              eyebrow: "Demo preview access",
              description:
                "You are viewing booking control in MVP preview mode so the admin workflow can be tested without live authentication or booking persistence."
            }
          : undefined
      }
      primaryAction={{ href: `/${locale}/admin/services`, label: "Review service queue" }}
      secondaryAction={{ href: `/${locale}/admin`, label: "Back to admin dashboard" }}
      stats={[
        { label: "All bookings", value: `${bookingsCatalog.length}`, hint: "Central booking registry across travelers, partners, and services" },
        { label: "Pending review", value: `${bookingsCatalog.filter((booking) => booking.bookingStatus === "PENDING").length}`, hint: "Requests awaiting partner or platform confirmation" },
        { label: "Commission total", value: `USD ${bookingsCatalog.reduce((sum, booking) => sum + booking.commissionEstimate, 0).toFixed(2)}`, hint: "Estimated marketplace commission across current booking records" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="flex flex-wrap gap-3">
          {bookingStatuses.map((status) => (
            <span
              key={status}
              className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] ${getBookingStatusPillClass(status)}`}
            >
              {getBookingStatusLabel(status)}
            </span>
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="space-y-5">
          {bookingsCatalog.map((booking) => (
            <article key={booking.id} className="soft-panel p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] ${getBookingStatusPillClass(booking.bookingStatus)}`}>
                      {getBookingStatusLabel(booking.bookingStatus)}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] ${getBookingStatusPillClass(booking.paymentStatus)}`}>
                      {getPaymentStatusLabel(booking.paymentStatus)}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{booking.serviceTitle}</h3>
                  <p className="mt-2 text-sm leading-7 text-brand-muted">
                    {booking.partnerName} · {booking.travelerName} · {booking.location}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white">
                  {booking.id}
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {[
                  ["Date / time", `${booking.date} · ${booking.time}`],
                  ["Guests", `${booking.guestCount}`],
                  ["Price", `${booking.currency} ${booking.estimatedTotal}`],
                  ["Commission", `${booking.currency} ${booking.commissionEstimate.toFixed(2)}`],
                  ["Payment", getPaymentStatusLabel(booking.paymentStatus)]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">{label}</p>
                    <p className="mt-3 text-sm leading-7 text-white/85">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">Internal notes placeholder</p>
                <p className="mt-3 text-sm leading-7 text-brand-muted">{booking.internalNotes}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`/${locale}/bookings/new?service=${booking.serviceSlug}`} className="brand-secondary-button inline-flex items-center justify-center">
                  View booking
                </a>
                <button type="button" className="brand-primary-button inline-flex items-center justify-center">
                  Confirm
                </button>
                <button type="button" className="brand-secondary-button inline-flex items-center justify-center">
                  Cancel
                </button>
                <button type="button" className="brand-secondary-button inline-flex items-center justify-center">
                  Mark completed
                </button>
                <button type="button" className="brand-secondary-button inline-flex items-center justify-center">
                  Flag issue
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Marketplace booking governance"
          title="Admin booking control is ready for live status updates, payment reconciliation, and commission oversight"
          description="Once connected, this route can store operational decisions, issue flags, refund actions, traveler support notes, and audit history without changing the admin booking layout."
          primaryAction={{ href: `/${locale}/payments`, label: "Open payments" }}
          secondaryAction={{ href: `/${locale}/commissions`, label: "Open commissions" }}
        />
      </section>
    </PlatformPageShell>
  );
}
