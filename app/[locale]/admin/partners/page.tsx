import type { Locale } from "@/lib/i18n";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";
import {
  getServicesByPartnerSlug,
  getPartnerTypeLabel,
  getStatusPillClass,
  getVerificationStatusLabel,
  partnerProfiles
} from "@/lib/platform/partner-services";

type AdminPartnersPageProps = {
  params: { locale: Locale };
};

export default function AdminPartnersPage({ params }: AdminPartnersPageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "ADMIN_PARTNERS",
    redirectTo: `/${locale}/admin/partners`
  });

  const pendingPartners = partnerProfiles.filter((profile) => profile.verificationStatus === "PENDING");

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Partner approval queue"
      title="Review partner onboarding, verification, and account readiness"
      description="Admin review controls partner activation, public profile visibility, service publishing rights, payout readiness, and marketplace trust standards."
      primaryAction={{ href: `/${locale}/admin/services`, label: "Review service queue" }}
      secondaryAction={{ href: `/${locale}/admin`, label: "Back to admin dashboard" }}
      stats={[
        { label: "Partner profiles", value: `${partnerProfiles.length}`, hint: "Marketplace provider accounts ready for onboarding review" },
        { label: "Pending review", value: `${pendingPartners.length}`, hint: "Partners waiting on verification and approval action" },
        { label: "Status controls", value: "4", hint: "Approve partner, reject partner, suspend partner, and view profile are mapped into the review flow" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 xl:grid-cols-2">
          {partnerProfiles.map((partner) => (
            <article key={partner.slug} className="soft-panel p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] ${getStatusPillClass(partner.verificationStatus)}`}>
                  {getVerificationStatusLabel(partner.verificationStatus)}
                </span>
                <span className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-brand-sand">
                  {getPartnerTypeLabel(partner.partnerType)}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white">{partner.businessName}</h3>
              <p className="mt-2 text-sm leading-7 text-brand-muted">
                {partner.city}, {partner.island} · {partner.yearsOfExperience} years of experience
              </p>
              <p className="mt-4 text-sm leading-7 text-brand-muted">{partner.shortBio}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">Documents/status</p>
                  <p className="mt-3 text-sm leading-7 text-white/85">{partner.documentsStatus}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">Service areas</p>
                  <p className="mt-3 text-sm leading-7 text-white/85">{partner.serviceAreas.join(", ")}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">Services count</p>
                  <p className="mt-3 text-sm leading-7 text-white/85">{getServicesByPartnerSlug(partner.slug).length}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">Approval status</p>
                  <p className="mt-3 text-sm leading-7 text-white/85">{getVerificationStatusLabel(partner.verificationStatus)}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className="brand-primary-button inline-flex items-center justify-center">
                  Approve partner
                </button>
                <button type="button" className="brand-secondary-button inline-flex items-center justify-center">
                  Reject partner
                </button>
                <button type="button" className="brand-secondary-button inline-flex items-center justify-center">
                  Suspend partner
                </button>
                <a href={`/${locale}/partners/${partner.slug}`} className="brand-secondary-button inline-flex items-center justify-center">
                  View profile
                </a>
              </div>
              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">Marketplace quality notes</p>
                <p className="mt-3 text-sm leading-7 text-brand-muted">
                  Review trust signals, destination fit, service clarity, media quality, and operational readiness before activating this partner account.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Approval workflow"
          title="Partner approval actions are ready for connected review queues and admin notes"
          description="Once backend workflows are connected, this route can persist approval decisions, quality feedback, suspension reasons, and audit history without changing the admin review layout."
          primaryAction={{ href: `/${locale}/admin/services`, label: "Open service approvals" }}
          secondaryAction={{ href: `/${locale}/admin/users`, label: "Open user management" }}
        />
      </section>
    </PlatformPageShell>
  );
}
