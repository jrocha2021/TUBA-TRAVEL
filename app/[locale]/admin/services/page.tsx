import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";
import {
  getAvailabilityStatusLabel,
  getPartnerProfileBySlug,
  getPartnerTypeLabel,
  getServiceApprovalLabel,
  getStatusPillClass,
  servicesCatalog
} from "@/lib/platform/partner-services";

type AdminServicesPageProps = {
  params: { locale: Locale };
};

export default function AdminServicesPage({ params }: AdminServicesPageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "ADMIN_SERVICES",
    redirectTo: `/${locale}/admin/services`
  });

  const approvalQueue = servicesCatalog.filter((service) => service.approvalStatus !== "APPROVED");
  const approvedServices = servicesCatalog.filter((service) => service.approvalStatus === "APPROVED");
  const rejectedServices = servicesCatalog.filter((service) => service.approvalStatus === "REJECTED");

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Service approval queue"
      title="Review listing quality, publishing readiness, and marketplace standards"
      description="Admin service review governs approval status, availability quality, traveler clarity, destination fit, and featured listing eligibility before services go live."
      primaryAction={{ href: `/${locale}/admin/partners`, label: "Review partners" }}
      secondaryAction={{ href: `/${locale}/admin`, label: "Back to admin dashboard" }}
      stats={[
        { label: "Pending services", value: `${approvalQueue.length}`, hint: "Draft and pending review services waiting for admin action" },
        { label: "Approved services", value: `${approvedServices.length}`, hint: "Published services already accepted into the marketplace" },
        { label: "Rejected services", value: `${rejectedServices.length}`, hint: "Listings requiring partner fixes, policy review, or rejection handling" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="space-y-5">
          {servicesCatalog.map((service) => {
            const partner = getPartnerProfileBySlug(service.partnerSlug);
            if (!partner) {
              return null;
            }

            return (
              <article key={service.slug} className="soft-panel overflow-hidden p-0">
                <div className="grid gap-0 xl:grid-cols-[320px_1fr]">
                  <div className="relative h-60 xl:h-full">
                    <Image src={service.image} alt={service.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2">
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
                    <h3 className="mt-4 text-2xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-brand-muted">
                      {partner.businessName} · {getPartnerTypeLabel(partner.partnerType)} · {service.island}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-brand-muted">{service.shortDescription}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {[
                        ["Price", `${service.currency} ${service.price}`],
                        ["Duration", service.duration],
                        ["Capacity", service.capacity],
                        ["Pickup / meeting", service.meetingPoint]
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">{label}</p>
                          <p className="mt-3 text-sm leading-7 text-white/85">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">Marketplace quality notes</p>
                      <p className="mt-3 text-sm leading-7 text-brand-muted">
                        Review copy clarity, pricing completeness, meeting point logic, inclusion list quality, policy transparency, and trust readiness before publishing.
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {service.approvalStatus !== "APPROVED" && (
                        <button type="button" className="brand-primary-button inline-flex items-center justify-center">
                          Approve
                        </button>
                      )}
                      <button type="button" className="brand-secondary-button inline-flex items-center justify-center">
                        Review
                      </button>
                      <button type="button" className="brand-secondary-button inline-flex items-center justify-center">
                        Reject
                      </button>
                      <button type="button" className="brand-secondary-button inline-flex items-center justify-center">
                        Suspend
                      </button>
                      <a href={`/${locale}/services/${service.slug}`} className="brand-secondary-button inline-flex items-center justify-center">
                        Review details
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Service governance"
          title="Service approvals are ready for connected admin comments, status changes, and publishing logs"
          description="Once database actions are connected, this queue can store approval decisions, rejection reasons, change requests, featured eligibility, and listing quality history."
          primaryAction={{ href: `/${locale}/services`, label: "Open services catalog" }}
          secondaryAction={{ href: `/${locale}/featured-listings`, label: "Review featured listings" }}
        />
      </section>
    </PlatformPageShell>
  );
}
