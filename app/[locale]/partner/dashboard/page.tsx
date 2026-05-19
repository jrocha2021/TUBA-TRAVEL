import type { Locale } from "@/lib/i18n";
import Image from "next/image";
import ModuleCard from "@/components/platform/module-card";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { getRouteLabelForPath, requirePlatformAccess } from "@/lib/auth/access";
import { partnerDashboardCards } from "@/lib/platform/foundation";
import {
  getPartnerProfileBySlug,
  getPartnerTypeLabel,
  getServicesByPartnerSlug,
  getStatusPillClass,
  getVerificationStatusLabel,
  servicesCatalog
} from "@/lib/platform/partner-services";

type PartnerDashboardPageProps = {
  params: { locale: Locale };
  searchParams?: {
    notice?: string;
    from?: string;
  };
};

export default function PartnerDashboardPage({
  params,
  searchParams
}: PartnerDashboardPageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "PARTNER_DASHBOARD",
    redirectTo: `/${locale}/partner/dashboard`
  });
  const primaryPartner = getPartnerProfileBySlug("ana-silva");
  if (!primaryPartner) {
    throw new Error("Primary partner mock profile is missing.");
  }
  const partnerServices = getServicesByPartnerSlug(primaryPartner.slug);
  const publishedServices = partnerServices.filter((service) => service.approvalStatus === "APPROVED");
  const pendingServices = partnerServices.filter(
    (service) => service.approvalStatus === "PENDING_REVIEW"
  );
  const draftServices = partnerServices.filter((service) => service.approvalStatus === "DRAFT");
  const bookingReadyServices = partnerServices.filter(
    (service) => service.approvalStatus === "APPROVED" && service.availabilityStatus !== "PAUSED"
  );
  const profileCompletionItems = [
    "Business details",
    "Language coverage",
    "Service areas",
    "Media gallery",
    "Verification documents"
  ];

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Partner dashboard"
      title="Run listings, bookings, availability, and growth from one partner operating system"
      description="The partner dashboard foundation is organized around listings, calendar availability, booking operations, reviews, featured placement, and commission tracking."
      notice={
        searchParams?.notice === "role-mismatch" && searchParams.from
          ? {
              eyebrow: "Access updated",
              description: `Your selected account type does not have access to ${getRouteLabelForPath(
                locale,
                searchParams.from
              )}. You have been redirected to the partner dashboard.`
            }
          : undefined
      }
      primaryAction={{ href: `/${locale}/services/new`, label: "Create service" }}
      secondaryAction={{ href: `/${locale}/partner/profile`, label: "Edit profile" }}
      stats={[
        { label: "Profile completion", value: `${primaryPartner.profileCompletion}%`, hint: "Profile fields and trust details are ready for onboarding review" },
        { label: "Approved services", value: `${publishedServices.length}`, hint: "Approved marketplace listings ready for discovery and booking" },
        { label: "Pending services", value: `${pendingServices.length + draftServices.length}`, hint: "Draft and review-stage services waiting on the next action" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="soft-panel overflow-hidden p-0">
            <div className="relative h-56">
              <Image
                src={primaryPartner.profileImage}
                alt={primaryPartner.businessName}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] ${getStatusPillClass(primaryPartner.verificationStatus)}`}>
                  {getVerificationStatusLabel(primaryPartner.verificationStatus)}
                </span>
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-brand-sand">
                  {getPartnerTypeLabel(primaryPartner.partnerType)}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white">{primaryPartner.businessName}</h3>
              <p className="mt-2 text-sm leading-7 text-brand-muted">
                {primaryPartner.city}, {primaryPartner.island} · {primaryPartner.yearsOfExperience} years of experience
              </p>
              <p className="mt-4 text-sm leading-7 text-brand-muted">{primaryPartner.shortBio}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {primaryPartner.languages.map((language) => (
                  <span
                    key={language}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white/80"
                  >
                    {language}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a href={`/${locale}/partner/profile`} className="brand-primary-button inline-flex items-center justify-center">
                  Edit profile
                </a>
                <a href={`/${locale}/services/new`} className="brand-secondary-button inline-flex items-center justify-center">
                  Create new service
                </a>
              </div>
            </div>
          </article>

          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
              Partner profile completion
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Verification and publishing readiness</h3>
            <p className="mt-3 text-sm leading-7 text-brand-muted">
              Complete the profile fields that support admin review, traveler trust, and service visibility.
            </p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center justify-between text-sm text-white">
                <span>Profile completion</span>
                <span>{primaryPartner.profileCompletion}%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-gradient-to-r from-brand-teal to-brand-blue" style={{ width: `${primaryPartner.profileCompletion}%` }} />
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {profileCompletionItems.map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-white">{item}</span>
                  <span className={`text-xs font-medium uppercase tracking-[0.18em] ${index < 4 ? "text-emerald-200" : "text-brand-sand"}`}>
                    {index < 4 ? "Complete" : "In review"}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {partnerDashboardCards.map((card) => (
            <ModuleCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="soft-panel p-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
            Quick actions
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { href: `/${locale}/services/new`, label: "Create new service" },
              { href: `/${locale}/availability`, label: "Manage availability" },
              { href: `/${locale}/partner/bookings`, label: "View bookings" },
              { href: `/${locale}/messages`, label: "View messages" },
              { href: `/${locale}/reviews`, label: "View reviews" },
              { href: `/${locale}/featured-listings`, label: "Featured listing options" }
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="brand-secondary-button inline-flex items-center justify-center"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="grid gap-6 xl:grid-cols-5">
          {[
            {
              eyebrow: "Service stats",
              title: "Publishing status",
              description: "Track draft, pending review, approved, and booking-ready service counts from one dashboard row.",
              stat: `${draftServices.length} draft · ${pendingServices.length} pending · ${bookingReadyServices.length} booking-ready`,
              action: { href: `/${locale}/services`, label: "View services" }
            },
            {
              eyebrow: "Bookings overview",
              title: "Traveler bookings",
              description: "Upcoming reservation requests, confirmations, and support follow-ups connect here.",
              stat: "0 active",
              action: { href: `/${locale}/partner/bookings`, label: "Booking requests" }
            },
            {
              eyebrow: "Availability overview",
              title: "Calendar and capacity",
              description: "Manage operating days, blackout dates, group sizes, and seasonal openings by listing.",
              stat: "3 linked modules",
              action: { href: `/${locale}/availability`, label: "Manage availability" }
            },
            {
              eyebrow: "Payments and commissions",
              title: "Payout visibility",
              description: "Track gross booking value, marketplace commissions, pending payouts, and settlement history.",
              stat: "Payment-ready",
              action: { href: `/${locale}/payments`, label: "View payments" }
            },
            {
              eyebrow: "Reviews overview",
              title: "Trust and reputation",
              description: "Monitor reviews, response readiness, traveler satisfaction, and featured listing performance.",
              stat: "Reviews enabled",
              action: { href: `/${locale}/reviews`, label: "Open reviews" }
            }
          ].map((item) => (
            <article key={item.title} className="soft-panel flex h-full flex-col p-6">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">{item.eyebrow}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-brand-muted">{item.description}</p>
              <p className="mt-4 text-sm font-medium text-white">{item.stat}</p>
              <a href={item.action.href} className="brand-secondary-button mt-6 inline-flex items-center justify-center">
                {item.action.label}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <article className="soft-panel p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
                  Service publishing status
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Current services and approval stages</h3>
              </div>
              <a href={`/${locale}/services`} className="brand-secondary-button inline-flex items-center justify-center">
                Open services
              </a>
            </div>
            <div className="mt-6 space-y-4">
              {partnerServices.map((service) => (
                <div key={service.slug} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{service.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-brand-muted-soft">
                        {service.category} · {service.island}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] ${getStatusPillClass(service.approvalStatus)}`}>
                        {service.approvalStatus === "DRAFT" ? "Draft" : service.approvalStatus === "PENDING_REVIEW" ? "Pending review" : service.approvalStatus === "APPROVED" ? "Approved" : service.approvalStatus === "SUSPENDED" ? "Suspended" : "Rejected"}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] ${getStatusPillClass(service.availabilityStatus)}`}>
                        {service.availabilityStatus === "OPEN" ? "Open" : service.availabilityStatus === "LIMITED" ? "Limited" : service.availabilityStatus === "ON_REQUEST" ? "On request" : "Paused"}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">{service.shortDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-white/70">
                    <span>{service.currency} {service.price}</span>
                    <span>{service.duration}</span>
                    <span>{service.capacity}</span>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-brand-muted-soft">{service.availabilitySummary}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href={`/${locale}/services/${service.slug}`} className="brand-secondary-button inline-flex items-center justify-center !px-4 !py-2 text-[0.68rem]">
                      View service
                    </a>
                    <a href={`/${locale}/services/new?edit=${service.slug}`} className="brand-secondary-button inline-flex items-center justify-center !px-4 !py-2 text-[0.68rem]">
                      Edit service
                    </a>
                    {service.approvalStatus === "DRAFT" && (
                      <button type="button" className="brand-primary-button inline-flex items-center justify-center !px-4 !py-2 text-[0.68rem]">
                        Submit for review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
              Featured listing promotion
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Upgrade visibility inside the marketplace</h3>
            <p className="mt-3 text-sm leading-7 text-brand-muted">
              Featured placements help partners appear higher in destination discovery, category browsing, and seasonal editorial campaigns.
            </p>
            <div className="mt-5 space-y-3">
              {[
                "Homepage campaign slots",
                "Destination spotlight placement",
                "Featured partner trust badge",
                "Priority review for new services"
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/85">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a href={`/${locale}/featured-listings`} className="brand-primary-button inline-flex items-center justify-center">
                View featured options
              </a>
              <a href={`/${locale}/payments`} className="brand-secondary-button inline-flex items-center justify-center">
                Review promotion spend
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Marketplace operations"
          title="Partner publishing is structured for profile management, listings, and approval-ready service records"
          description={`This workspace already connects partner identity, ${servicesCatalog.length} service records, approval stages, traveler communication paths, and promotion modules so the backend can be attached without redesigning the partner experience.`}
          primaryAction={{ href: `/${locale}/partner/profile`, label: "Review partner profile" }}
          secondaryAction={{ href: `/${locale}/services/new`, label: "Start a new service draft" }}
        />
      </section>
    </PlatformPageShell>
  );
}
