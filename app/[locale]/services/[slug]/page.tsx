import Image from "next/image";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import {
  getAvailabilityStatusLabel,
  getPartnerProfileBySlug,
  getPartnerTypeLabel,
  getServiceApprovalLabel,
  getServiceBySlug,
  getStatusPillClass
} from "@/lib/platform/partner-services";

type ServiceDetailPageProps = {
  params: {
    locale: Locale;
    slug: string;
  };
};

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { locale, slug } = params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const partner = getPartnerProfileBySlug(service.partnerSlug);

  if (!partner) {
    notFound();
  }

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Service detail"
      title={service.title}
      description={service.fullDescription}
      primaryAction={{ href: `/${locale}/bookings/new?service=${service.slug}`, label: "Request booking" }}
      secondaryAction={{ href: `/${locale}/services`, label: "Back to services" }}
      stats={[
        { label: "Category", value: service.category, hint: "Service type and discovery classification" },
        { label: "Price", value: `${service.currency} ${service.price}`, hint: "Marketplace price field ready for checkout and commission logic" },
        { label: "Capacity", value: service.capacity, hint: "Group-size and availability planning for live booking rules" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="soft-panel overflow-hidden p-0">
            <div className="relative h-72">
              <Image src={service.image} alt={service.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white/85">
                  {service.category}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] ${getStatusPillClass(service.approvalStatus)}`}>
                  {getServiceApprovalLabel(service.approvalStatus)}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] ${getStatusPillClass(service.availabilityStatus)}`}>
                  {getAvailabilityStatusLabel(service.availabilityStatus)}
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["Island / city", `${service.island} · ${service.city}`],
                  ["Duration", service.duration],
                  ["Meeting point", service.meetingPoint],
                  ["Featured eligibility", service.featuredEligible ? "Eligible for featured promotion" : "Not yet eligible"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">{label}</p>
                    <p className="mt-3 text-sm leading-7 text-white/85">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
              Service inclusions
            </p>
            <div className="mt-5 space-y-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">Included items</p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-muted">
                  {service.includedItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">Excluded items</p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-muted">
                  {service.excludedItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">Cancellation policy</p>
                <p className="mt-3 text-sm leading-7 text-brand-muted">{service.cancellationPolicy}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
              Provider record
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{partner.businessName}</h3>
            <p className="mt-2 text-sm leading-7 text-brand-muted">
              {getPartnerTypeLabel(partner.partnerType)} · {partner.city}, {partner.island}
            </p>
            <p className="mt-4 text-sm leading-7 text-brand-muted">{partner.shortBio}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {partner.languages.map((language) => (
                <span key={language} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white/80">
                  {language}
                </span>
              ))}
            </div>
            <div className="mt-6 grid gap-3">
              <a href={`/${locale}/bookings/new?service=${service.slug}`} className="brand-primary-button inline-flex items-center justify-center">
                Request booking
              </a>
              <a href={`/${locale}/messages`} className="brand-secondary-button inline-flex items-center justify-center">
                Open messages
              </a>
            </div>
          </article>

          <PlatformEmptyState
            eyebrow="Booking-ready service"
            title="This service record is structured for pricing, approval, and traveler conversion"
            description="The detail page already ties together partner identity, service copy, inclusions, policy, pricing, and marketplace routing so bookings and reviews can attach later without changing the UI structure."
            primaryAction={{ href: `/${locale}/bookings`, label: "Open bookings workspace" }}
            secondaryAction={{ href: `/${locale}/services`, label: "Return to services" }}
          />
        </div>
      </section>
    </PlatformPageShell>
  );
}
