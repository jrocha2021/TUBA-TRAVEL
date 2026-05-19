import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import {
  getAvailabilityStatusLabel,
  getPartnerProfileBySlug,
  getPartnerTypeLabel,
  getServiceApprovalLabel,
  getStatusPillClass,
  serviceCategories,
  servicesCatalog
} from "@/lib/platform/partner-services";

type ServicesPageProps = {
  params: { locale: Locale };
};

export default function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = params;

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Marketplace services"
      title="Discover partner-led tours, transfers, stays, and local experiences"
      description="The service catalog foundation is structured for traveler discovery, partner visibility, admin approval, and booking-ready service records across Cape Verde."
      primaryAction={{ href: `/${locale}/services/new`, label: "Create new service" }}
      secondaryAction={{ href: `/${locale}/partner/dashboard`, label: "Partner dashboard" }}
      stats={[
        { label: "Listed services", value: `${servicesCatalog.length}`, hint: "Catalog cards support service approvals, pricing, and traveler discovery" },
        { label: "Categories", value: `${serviceCategories.length}`, hint: "Tours, transfers, stays, food, boats, and custom planning modules" },
        { label: "Marketplace status", value: "Publishing-ready", hint: "Approval, availability, ratings, and partner data already connect to each listing card" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="flex flex-wrap gap-3">
          {serviceCategories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white/80"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {servicesCatalog.map((service) => {
            const partner = getPartnerProfileBySlug(service.partnerSlug);
            if (!partner) {
              return null;
            }

            return (
              <article key={service.slug} className="soft-panel flex h-full flex-col overflow-hidden p-0">
                <div className="relative h-52">
                  <Image src={service.image} alt={service.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute left-4 right-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white">
                      {service.category}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] ${getStatusPillClass(service.approvalStatus)}`}>
                      {getServiceApprovalLabel(service.approvalStatus)}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] ${getStatusPillClass(service.availabilityStatus)}`}>
                      {getAvailabilityStatusLabel(service.availabilityStatus)}
                    </span>
                  </div>
                </div>
                <div className="flex h-full flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-brand-muted-soft">
                    <span>{service.island}</span>
                    <span>•</span>
                    <span>{getPartnerTypeLabel(partner.partnerType)}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">{service.shortDescription}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">Price</p>
                        <p className="mt-2 text-sm text-white">{service.currency} {service.price}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">Availability</p>
                        <p className="mt-2 text-sm text-white">{getAvailabilityStatusLabel(service.availabilityStatus)}</p>
                      </div>
                    </div>
                    <div className="mt-5 space-y-2 text-sm text-white/75">
                      <p>Partner: {partner.businessName}</p>
                      <p>Capacity: {service.capacity}</p>
                      <p>Rating: {partner.rating} / 5</p>
                      <p>{service.availabilitySummary}</p>
                    </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <a href={`/${locale}/services/${service.slug}`} className="brand-primary-button inline-flex items-center justify-center">
                      View service
                    </a>
                    <a href={`/${locale}/bookings/new?service=${service.slug}`} className="brand-secondary-button inline-flex items-center justify-center">
                      Request booking
                    </a>
                    {service.approvalStatus === "DRAFT" ? (
                      <button type="button" className="brand-secondary-button inline-flex items-center justify-center">
                        Submit for review
                      </button>
                    ) : (
                      <a href={`/${locale}/services/new?edit=${service.slug}`} className="brand-secondary-button inline-flex items-center justify-center">
                        Edit service
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Catalog operations"
          title="This service catalog is ready for approval logic, traveler filtering, and booking conversion"
          description="Cards already support partner identity, category labels, price, island, availability, approval status, and detail routes so live data can plug in cleanly."
          primaryAction={{ href: `/${locale}/services/new`, label: "Publish a new service" }}
          secondaryAction={{ href: `/${locale}/admin/services`, label: "Review admin service queue" }}
        />
      </section>
    </PlatformPageShell>
  );
}
