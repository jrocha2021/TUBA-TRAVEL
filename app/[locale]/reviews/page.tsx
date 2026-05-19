import type { Locale } from "@/lib/i18n";
import ModuleCard from "@/components/platform/module-card";
import PlatformEmptyState from "@/components/platform/empty-state";
import PlatformPageShell from "@/components/platform/page-shell";
import { requirePlatformAccess } from "@/lib/auth/access";

type ReviewsPageProps = {
  params: { locale: Locale };
};

const reviewCards = [
  {
    eyebrow: "Traveler trust",
    title: "Verified booking-based reviews",
    description:
      "Reviews are designed to connect to completed bookings so travelers can rate real services, hosts, drivers, and guides."
  },
  {
    eyebrow: "Partner reputation",
    title: "Profile ratings and public trust signals",
    description:
      "Partners will be able to build public credibility through service ratings, review highlights, and response quality indicators."
  },
  {
    eyebrow: "Admin moderation",
    title: "Review policy, abuse protection, and dispute handling",
    description:
      "Admins can moderate harmful content, resolve disputes, and protect marketplace credibility through structured review governance."
  }
];

export default function ReviewsPage({ params }: ReviewsPageProps) {
  const { locale } = params;
  requirePlatformAccess({
    locale,
    key: "REVIEWS",
    redirectTo: `/${locale}/reviews`
  });

  return (
    <PlatformPageShell
      locale={locale}
      eyebrow="Reviews"
      title="Review and rating system for trust, quality, and public reputation"
      description="The review system is structured to support verified traveler feedback, partner profile ratings, admin moderation, and trust signals across the marketplace."
      primaryAction={{ href: `/${locale}/messages`, label: "Open messaging" }}
      secondaryAction={{ href: `/${locale}/partner/dashboard`, label: "Partner reputation tools" }}
      stats={[
        { label: "Review source", value: "Verified bookings", hint: "Ratings attach to completed services and stays" },
        { label: "Moderation layer", value: "Admin-ready", hint: "Policies and escalation paths are planned into the flow" },
        { label: "Published reviews", value: "0", hint: "Live ratings will appear once booking completion is connected" }
      ]}
    >
      <section className="section-space pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {reviewCards.map((card) => (
            <ModuleCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <PlatformEmptyState
          eyebrow="Reputation signals"
          title="No live reviews are connected yet"
          description="This module is prepared for traveler ratings, partner responses, moderation events, featured review highlights, and trust scoring once the booking lifecycle is fully connected."
          primaryAction={{ href: `/${locale}/services`, label: "Open public catalog" }}
          secondaryAction={{ href: `/${locale}/admin`, label: "Admin moderation view" }}
        />
      </section>
    </PlatformPageShell>
  );
}
