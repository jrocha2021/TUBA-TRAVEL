import Image from "next/image";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import {
  getPartnerProfileBySlug,
  getPartnerTypeLabel,
  getServicesByPartnerSlug,
  getStatusPillClass,
  getVerificationStatusLabel
} from "@/lib/platform/partner-services";

type PartnerProfilePageProps = {
  params: {
    locale: Locale;
    slug: string;
  };
};

export default function PartnerProfilePage({ params }: PartnerProfilePageProps) {
  const { locale, slug } = params;
  const profile = getPartnerProfileBySlug(slug);

  if (!profile) {
    notFound();
  }

  const services = getServicesByPartnerSlug(profile.slug);
  const startingPrice = services.length
    ? Math.min(...services.map((service) => Number(service.price)))
    : null;
  const availabilitySummary = services.some((service) => service.availabilityStatus === "OPEN")
    ? "Open dates available across selected services"
    : services.some((service) => service.availabilityStatus === "ON_REQUEST")
      ? "Bookings available on request"
      : "Limited availability currently shown";

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Verified partner"
      title={profile.businessName}
      description={profile.fullDescription}
      primaryAction={{ href: `/${locale}/bookings/new?partner=${profile.slug}`, label: "Book this partner" }}
      secondaryAction={{ href: `/${locale}/messages`, label: "Send message" }}
      stats={[
        { label: "Partner type", value: getPartnerTypeLabel(profile.partnerType), hint: "Marketplace provider category and hosting specialty" },
        { label: "Starting price", value: startingPrice ? `USD ${startingPrice}` : "Custom quote", hint: "Lowest visible service price currently published for this partner" },
        { label: "Reviews", value: `${profile.rating} / 5`, hint: `${profile.reviewCount} traveler review previews in the marketplace trust layer` }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="soft-panel overflow-hidden p-0">
            <div className="relative h-72">
              <Image src={profile.profileImage} alt={profile.businessName} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] ${getStatusPillClass(profile.verificationStatus)}`}>
                  {getVerificationStatusLabel(profile.verificationStatus)}
                </span>
                <span className="inline-flex rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white">
                  {getPartnerTypeLabel(profile.partnerType)}
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm leading-7 text-brand-muted">
                {profile.city}, {profile.island} · {profile.yearsOfExperience} years of experience
              </p>
              <p className="mt-4 text-sm leading-7 text-brand-muted">{profile.shortBio}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {profile.languages.map((language) => (
                  <span
                    key={language}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white/80"
                  >
                    {language}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <a href={`/${locale}/bookings/new?partner=${profile.slug}`} className="brand-primary-button inline-flex items-center justify-center">
                  Book this partner
                </a>
                <a href={`/${locale}/messages`} className="brand-secondary-button inline-flex items-center justify-center">
                  Send message
                </a>
                <a href={`/${locale}/services`} className="brand-secondary-button inline-flex items-center justify-center">
                  View services
                </a>
              </div>
            </div>
          </article>

          <article className="soft-panel p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
              Partner summary
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Island / location", `${profile.city}, ${profile.island}`],
                ["Verification status", getVerificationStatusLabel(profile.verificationStatus)],
                ["Languages", profile.languages.join(", ")],
                ["Availability summary", availabilitySummary],
                ["Services offered", `${services.length} published service options`],
                ["Starting price", startingPrice ? `USD ${startingPrice}` : "Custom quote"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">{label}</p>
                  <p className="mt-3 text-sm leading-7 text-white/85">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">Reviews and ratings preview</p>
              <p className="mt-3 text-lg font-semibold text-white">{profile.rating} / 5 · {profile.reviewCount} reviews</p>
              <p className="mt-2 text-sm leading-7 text-brand-muted">{profile.reviewPreview}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <article key={service.slug} className="soft-panel flex h-full flex-col p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white/85">
                  {service.category}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] ${getStatusPillClass(service.availabilityStatus)}`}>
                  {service.availabilityStatus === "OPEN" ? "Open" : service.availabilityStatus === "LIMITED" ? "Limited" : service.availabilityStatus === "ON_REQUEST" ? "On request" : "Paused"}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-brand-muted">{service.shortDescription}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">Price</p>
                  <p className="mt-2 text-sm text-white">{service.currency} {service.price}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-brand-gold">Availability</p>
                  <p className="mt-2 text-sm text-white">{availabilitySummary}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a href={`/${locale}/bookings`} className="brand-primary-button inline-flex items-center justify-center">
                  Book this partner
                </a>
                <a href={`/${locale}/services/${service.slug}`} className="brand-secondary-button inline-flex items-center justify-center">
                  View service
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Marketplace profile"
          title="This public partner page is ready for real bookings, messages, reviews, and traveler trust signals"
          description="The route already connects verified partner identity, live service cards, pricing, availability summary, and trust-oriented calls to action so backend marketplace data can attach without redesign."
          primaryAction={{ href: `/${locale}/bookings/new?partner=${profile.slug}`, label: "Request booking" }}
          secondaryAction={{ href: `/${locale}/services`, label: "Return to services" }}
        />
      </section>
    </PlatformPageShell>
  );
}
