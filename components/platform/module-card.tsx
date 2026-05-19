import Link from "next/link";
import type { ActionLink } from "@/lib/platform/foundation";

type ModuleCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  action?: ActionLink;
};

export default function ModuleCard({
  eyebrow,
  title,
  description,
  bullets,
  action
}: ModuleCardProps) {
  const actionClasses =
    "brand-secondary-button mt-6 inline-flex w-full items-center justify-center sm:w-fit";

  return (
    <article className="soft-panel flex h-full flex-col p-6">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">{eyebrow}</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-base leading-7 text-brand-muted">{description}</p>
      {bullets && bullets.length > 0 && (
        <div className="mt-5 flex-1 space-y-2.5">
          {bullets.map((item) => (
            <p key={item} className="text-sm leading-6 text-white/75">
              {item}
            </p>
          ))}
        </div>
      )}
      {action && (
        action.nativeNavigation ? (
          <a href={action.href} className={actionClasses}>
            {action.label}
          </a>
        ) : (
          <Link href={action.href} className={actionClasses}>
            {action.label}
          </Link>
        )
      )}
    </article>
  );
}
