import type { Locale } from "@/lib/i18n";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";
import {
  getPartnerTypeLabel,
  getStatusPillClass,
  getVerificationStatusLabel,
  partnerProfiles
} from "@/lib/platform/partner-services";

type PartnerProfilePageProps = {
  params: { locale: Locale };
};

export default function PartnerProfilePage({ params }: PartnerProfilePageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "PARTNER_PROFILE",
    redirectTo: `/${locale}/partner/profile`
  });

  const profile = partnerProfiles[0];

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Partner profile"
      title="Professional marketplace profile foundation for verified tourism partners"
      description="Partners manage their identity, business description, service areas, verification details, and media presentation from one marketplace profile record."
      primaryAction={{ href: `/${locale}/services/new`, label: "Create new service" }}
      secondaryAction={{ href: `/${locale}/partner/dashboard`, label: "Back to partner dashboard" }}
      stats={[
        { label: "Profile completion", value: `${profile.profileCompletion}%`, hint: "Core business fields, trust details, and media coverage are already mapped" },
        { label: "Languages", value: `${profile.languages.length}`, hint: "Language support appears on public partner profile cards" },
        { label: "Service areas", value: `${profile.serviceAreas.length}`, hint: "Coverage zones connect to destination discovery and booking routing" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="soft-panel p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] ${getStatusPillClass(profile.verificationStatus)}`}>
                {getVerificationStatusLabel(profile.verificationStatus)}
              </span>
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-brand-sand">
                {getPartnerTypeLabel(profile.partnerType)}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white">{profile.businessName}</h3>
            <p className="mt-2 text-sm leading-7 text-brand-muted">
              {profile.city}, {profile.island}
            </p>
            <p className="mt-4 text-sm leading-7 text-brand-muted">{profile.fullDescription}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Business/display name", profile.businessName],
                ["Partner type", getPartnerTypeLabel(profile.partnerType)],
                ["Contact email", profile.contactEmail],
                ["Business phone/WhatsApp", profile.businessPhone],
                ["Years of experience", `${profile.yearsOfExperience} years`],
                ["Verification status", getVerificationStatusLabel(profile.verificationStatus)]
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-gold">{label}</p>
                  <p className="mt-3 text-sm leading-7 text-white/85">{value}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
              Profile publishing fields
            </p>
            <div className="mt-5 space-y-4">
              {[
                ["Short bio", profile.shortBio],
                ["Languages spoken", profile.languages.join(", ")],
                ["Service areas", profile.serviceAreas.join(", ")],
                ["Profile image placeholder", "Primary image slot reserved for future uploads and cropping tools."],
                ["Gallery placeholders", `${profile.gallery.length} media positions ready for landscape, activity, and trust imagery.`],
                ["Documents/status placeholder", profile.documentsStatus]
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-gold">{label}</p>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">{value}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Profile management"
          title="This profile shell is ready for editable partner details, media uploads, and verification workflows"
          description="Form submission, file uploads, and document verification are not connected yet, but the profile model already covers the data required for partner onboarding and public discovery."
          primaryAction={{ href: `/${locale}/services/new`, label: "Open service publishing" }}
          secondaryAction={{ href: `/${locale}/partner/dashboard`, label: "Return to partner dashboard" }}
        />
      </section>
    </PlatformPageShell>
  );
}
