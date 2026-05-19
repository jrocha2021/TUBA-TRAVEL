import type { Locale } from "@/lib/i18n";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";
import {
  getBookingStatusLabel,
  getBookingStatusPillClass,
  getBookingsByPartnerSlug,
  getPaymentStatusLabel
} from "@/lib/platform/bookings";

type PartnerBookingsPageProps = {
  params: { locale: Locale };
};

export default function PartnerBookingsPage({ params }: PartnerBookingsPageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "PARTNER_BOOKINGS",
    redirectTo: `/${locale}/partner/bookings`
  });

  const partnerSlug = "ana-silva";
  const partnerBookings = getBookingsByPartnerSlug(partnerSlug);
  const newRequests = partnerBookings.filter((booking) => booking.bookingStatus === "PENDING");
  const confirmed = partnerBookings.filter((booking) => booking.bookingStatus === "CONFIRMED");
  const completed = partnerBookings.filter((booking) => booking.bookingStatus === "COMPLETED");
  const cancelled = partnerBookings.filter(
    (booking) => booking.bookingStatus === "CANCELLED" || booking.bookingStatus === "REFUNDED"
  );

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Partner bookings"
      title="Review booking requests, upcoming guest arrivals, and payout-ready completions"
      description="The partner booking workspace is structured for new requests, confirmed departures, guest counts, estimated payout, commission previews, and traveler communication."
      primaryAction={{ href: `/${locale}/messages`, label: "Open traveler messages" }}
      secondaryAction={{ href: `/${locale}/partner/dashboard`, label: "Back to partner dashboard" }}
      stats={[
        { label: "New requests", value: `${newRequests.length}`, hint: "Traveler requests waiting for partner acceptance or decline" },
        { label: "Upcoming bookings", value: `${confirmed.length}`, hint: "Confirmed bookings already scheduled for partner fulfillment" },
        { label: "Estimated payout", value: `USD ${partnerBookings.reduce((sum, booking) => sum + (booking.estimatedTotal - booking.commissionEstimate), 0).toFixed(2)}`, hint: "Net payout estimate after marketplace commission across visible bookings" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 xl:grid-cols-4">
          {[
            { title: "New booking requests", items: newRequests },
            { title: "Confirmed upcoming bookings", items: confirmed },
            { title: "Completed bookings", items: completed },
            { title: "Cancelled bookings", items: cancelled }
          ].map((group) => (
            <article key={group.title} className="soft-panel p-6">
              <h3 className="text-xl font-semibold text-white">{group.title}</h3>
              <div className="mt-5 space-y-4">
                {group.items.length > 0 ? (
                  group.items.map((booking) => (
                    <div key={booking.id} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex flex-wrap gap-2">
                        <span className={`rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] ${getBookingStatusPillClass(booking.bookingStatus)}`}>
                          {getBookingStatusLabel(booking.bookingStatus)}
                        </span>
                        <span className={`rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] ${getBookingStatusPillClass(booking.paymentStatus)}`}>
                          {getPaymentStatusLabel(booking.paymentStatus)}
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-white">{booking.serviceTitle}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brand-muted-soft">
                        {booking.travelerName} · {booking.date} at {booking.time}
                      </p>
                      <div className="mt-3 space-y-2 text-sm text-brand-muted">
                        <p>{booking.guestCount} guests · {booking.currency} {booking.estimatedTotal}</p>
                        <p>Commission estimate: {booking.currency} {booking.commissionEstimate.toFixed(2)}</p>
                      </div>
                      <div className="mt-4 grid gap-2">
                        {booking.bookingStatus === "PENDING" && (
                          <>
                            <button type="button" className="brand-primary-button inline-flex items-center justify-center !px-4 !py-2 text-[0.68rem]">
                              Accept booking
                            </button>
                            <button type="button" className="brand-secondary-button inline-flex items-center justify-center !px-4 !py-2 text-[0.68rem]">
                              Decline booking
                            </button>
                          </>
                        )}
                        <a href={`/${locale}/messages`} className="brand-secondary-button inline-flex items-center justify-center !px-4 !py-2 text-[0.68rem]">
                          Message traveler
                        </a>
                        {booking.bookingStatus === "CONFIRMED" && (
                          <button type="button" className="brand-secondary-button inline-flex items-center justify-center !px-4 !py-2 text-[0.68rem]">
                            Mark completed
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-brand-muted">No bookings in this stage yet.</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Partner booking operations"
          title="The partner booking desk is ready for request acceptance, traveler messaging, and payout tracking"
          description="Once connected, this route can persist partner decisions, traveler updates, schedule changes, completion state, and payout records without changing the dashboard structure."
          primaryAction={{ href: `/${locale}/payments`, label: "Open payments" }}
          secondaryAction={{ href: `/${locale}/partner/dashboard`, label: "Return to partner dashboard" }}
        />
      </section>
    </PlatformPageShell>
  );
}
