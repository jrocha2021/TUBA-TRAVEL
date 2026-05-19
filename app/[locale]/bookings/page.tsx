import type { Locale } from "@/lib/i18n";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";
import {
  bookingsCatalog,
  getBookingStatusLabel,
  getBookingStatusPillClass,
  getPaymentStatusLabel,
  getBookingsByTravelerId,
  travelers
} from "@/lib/platform/bookings";

type BookingsPageProps = {
  params: { locale: Locale };
};

export default function BookingsPage({ params }: BookingsPageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "BOOKINGS",
    redirectTo: `/${locale}/bookings`
  });

  const traveler = travelers[0];
  const travelerBookings = getBookingsByTravelerId(traveler.id);
  const upcoming = travelerBookings.filter((booking) =>
    booking.bookingStatus === "PENDING" || booking.bookingStatus === "CONFIRMED"
  );
  const completed = travelerBookings.filter((booking) => booking.bookingStatus === "COMPLETED");
  const cancelled = travelerBookings.filter(
    (booking) => booking.bookingStatus === "CANCELLED" || booking.bookingStatus === "REFUNDED"
  );

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="My bookings"
      title="Track requests, confirmed experiences, and completed trips from one traveler workspace"
      description="Your booking foundation connects requested dates, guest count, estimated totals, partner communication, payment status, and review readiness in one account view."
      primaryAction={{ href: `/${locale}/bookings/new`, label: "Request booking" }}
      secondaryAction={{ href: `/${locale}/messages`, label: "Open messages" }}
      stats={[
        { label: "Pending requests", value: `${travelerBookings.filter((booking) => booking.bookingStatus === "PENDING").length}`, hint: "Requests waiting on partner confirmation or marketplace review" },
        { label: "Confirmed bookings", value: `${travelerBookings.filter((booking) => booking.bookingStatus === "CONFIRMED").length}`, hint: "Upcoming services already confirmed and visible in your trip plan" },
        { label: "Completed trips", value: `${completed.length}`, hint: "Finished experiences ready for ratings and review publishing" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 xl:grid-cols-3">
          {[
            {
              eyebrow: "Upcoming bookings",
              title: "Pending and confirmed plans",
              list: upcoming
            },
            {
              eyebrow: "Completed bookings",
              title: "Finished experiences",
              list: completed
            },
            {
              eyebrow: "Cancelled bookings",
              title: "Changes and refunds",
              list: cancelled
            }
          ].map((group) => (
            <article key={group.title} className="soft-panel p-6">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">{group.eyebrow}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{group.title}</h3>
              <div className="mt-5 space-y-4">
                {group.list.length > 0 ? (
                  group.list.map((booking) => (
                    <div key={booking.id} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] ${getBookingStatusPillClass(booking.bookingStatus)}`}>
                          {getBookingStatusLabel(booking.bookingStatus)}
                        </span>
                        <span className={`rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] ${getBookingStatusPillClass(booking.paymentStatus)}`}>
                          {getPaymentStatusLabel(booking.paymentStatus)}
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-white">{booking.serviceTitle}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brand-muted-soft">
                        {booking.partnerName} · {booking.location}
                      </p>
                      <div className="mt-3 space-y-2 text-sm text-brand-muted">
                        <p>{booking.date} at {booking.time}</p>
                        <p>{booking.guestCount} guests · {booking.currency} {booking.estimatedTotal}</p>
                      </div>
                      <div className="mt-4 grid gap-2">
                        <a href={`/${locale}/bookings/new?service=${booking.serviceSlug}`} className="brand-secondary-button inline-flex items-center justify-center !px-4 !py-2 text-[0.68rem]">
                          View booking
                        </a>
                        <a href={`/${locale}/messages`} className="brand-secondary-button inline-flex items-center justify-center !px-4 !py-2 text-[0.68rem]">
                          Message partner
                        </a>
                        {booking.bookingStatus === "PENDING" && (
                          <button type="button" className="brand-secondary-button inline-flex items-center justify-center !px-4 !py-2 text-[0.68rem]">
                            Cancel request
                          </button>
                        )}
                        {booking.bookingStatus === "COMPLETED" && (
                          <a href={`/${locale}/reviews`} className="brand-primary-button inline-flex items-center justify-center !px-4 !py-2 text-[0.68rem]">
                            Leave review
                          </a>
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
          eyebrow="Traveler booking records"
          title={`This account already maps ${travelerBookings.length} booking records across request, confirmation, completion, and cancellation states`}
          description={`The traveler booking layer is structured around booking IDs, service details, partner routing, guest counts, estimated totals, payment status, commission visibility, and review readiness for ${bookingsCatalog.length} shared marketplace bookings.`}
          primaryAction={{ href: `/${locale}/bookings/new`, label: "Start a new booking request" }}
          secondaryAction={{ href: `/${locale}/services`, label: "Browse services" }}
        />
      </section>
    </PlatformPageShell>
  );
}
