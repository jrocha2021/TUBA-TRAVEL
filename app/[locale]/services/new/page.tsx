import type { Locale } from "@/lib/i18n";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";
import { partnerProfiles, serviceCategories } from "@/lib/platform/partner-services";

type NewServicePageProps = {
  params: { locale: Locale };
};

function Field({
  label,
  placeholder,
  textarea,
  value,
  className
}: {
  label: string;
  placeholder: string;
  textarea?: boolean;
  value?: string;
  className?: string;
}) {
  const baseClasses =
    "mt-3 w-full rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-brand-muted-soft focus:border-brand-blue focus:outline-none";

  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-gold">{label}</span>
      {textarea ? (
        <textarea className={`${baseClasses} ${className ?? ""} min-h-[132px] resize-none`} placeholder={placeholder} defaultValue={value} />
      ) : (
        <input className={`${baseClasses} ${className ?? ""}`} placeholder={placeholder} defaultValue={value} />
      )}
    </label>
  );
}

export default function NewServicePage({ params }: NewServicePageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "SERVICES_NEW",
    redirectTo: `/${locale}/services/new`
  });

  const partner = partnerProfiles[0];

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Service publishing"
      title="Create a marketplace-ready service, tour, transfer, stay, or local experience"
      description="This service builder foundation is organized into profile, pricing, availability, location, media, and approval sections so partners can publish consistent marketplace inventory."
      primaryAction={{ href: `/${locale}/partner/dashboard`, label: "Back to partner dashboard" }}
      secondaryAction={{ href: `/${locale}/services`, label: "Open services catalog" }}
      stats={[
        { label: "Approval states", value: "5", hint: "Draft, pending review, approved, rejected, and suspended are already modeled for each listing" },
        { label: "Publishing sections", value: "6", hint: "Service info, pricing, location, availability, media, and approval submission" },
        { label: "Partner profile", value: partner.businessName, hint: "New services attach to an approved partner account" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
              Service information
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Service title" placeholder="Praia City and Culture Walk" />
              <Field label="Service type / category" placeholder={serviceCategories[0]} value="Cultural Experience" />
              <Field label="Island / location" placeholder="Praia, Santiago" />
              <Field label="Short description" placeholder="A one-line summary that appears in marketplace cards." />
              <div className="md:col-span-2">
                <Field
                  label="Full description"
                  placeholder="Explain the route, hosting style, traveler value, and local context."
                  textarea
                />
              </div>
            </div>
          </article>

          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
              Pricing and capacity
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Price" placeholder="85" />
              <Field label="Currency" placeholder="USD" value="USD" />
              <Field label="Duration" placeholder="Half day" />
              <Field label="Group size / capacity" placeholder="Up to 8 travelers" />
              <Field label="Languages" placeholder={partner.languages.join(", ")} />
              <Field label="Included items" placeholder="Guide, pickup coordination, local tasting" />
              <Field label="Availability summary" placeholder="Open weekly departures with private options available." />
            </div>
          </article>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
              Availability and operations
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Availability status" placeholder="Open / On request / Limited" value="Open" />
              <Field label="Service status" placeholder="Draft / Pending review / Approved / Rejected / Suspended" value="DRAFT" />
              <Field label="Meeting point or pickup area" placeholder="Central Praia hotel area or selected pickup zone" />
              <Field label="Cancellation policy" placeholder="Free cancellation up to 48 hours before start" />
              <Field label="Excluded items" placeholder="Meals, entry fees, private upgrades" />
              <div className="md:col-span-2">
                <Field
                  label="Marketplace quality notes"
                  placeholder="Internal notes about service standards, trust requirements, or operational details."
                  textarea
                />
              </div>
            </div>
          </article>

          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
              Media and gallery placeholders
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {["Primary cover image", "Gallery image 2", "Gallery image 3", "Gallery image 4"].map((slot) => (
                <div
                  key={slot}
                  className="flex aspect-[4/3] items-end rounded-[1.5rem] border border-dashed border-white/15 bg-gradient-to-br from-brand-navy/80 via-black/40 to-brand-teal/25 p-4"
                >
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-gold">{slot}</p>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">
                      Upload foundation placeholder for future image and gallery management.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
              Location and traveler logistics
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Service areas" placeholder="Praia, Cidade Velha, Tarrafal" />
              <Field label="Pickup routing" placeholder="Airport, hotel, city center, or custom meeting point" />
              <Field label="Traveler language support" placeholder={partner.languages.join(", ")} />
              <Field label="Featured listing eligibility" placeholder="Eligible after approval and trust review" value="Eligible after approval" />
            </div>
          </article>

          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
              Approval submission
            </p>
            <p className="mt-3 text-sm leading-7 text-brand-muted">
              Save service drafts while refining copy, pricing, and media. Submit when the listing is ready for admin approval and marketplace quality review.
            </p>
            <div className="mt-5 space-y-3">
              {[
                "Save draft for internal editing",
                "Submit for review",
                "Request admin quality feedback",
                "Prepare featured listing eligibility"
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/85">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button type="button" className="brand-secondary-button inline-flex items-center justify-center">
                Save as Draft
              </button>
              <button type="button" className="brand-primary-button inline-flex items-center justify-center">
                Submit for Review
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Publishing foundation"
          title="The service builder is ready for future connected forms, uploads, and approval workflows"
          description="Database submission, file upload, availability sync, and live admin comments are not connected yet, but the route now reflects the real service fields a tourism marketplace needs."
          primaryAction={{ href: `/${locale}/partner/profile`, label: "Review partner profile" }}
          secondaryAction={{ href: `/${locale}/admin/services`, label: "Open admin service queue" }}
        />
      </section>
    </PlatformPageShell>
  );
}
