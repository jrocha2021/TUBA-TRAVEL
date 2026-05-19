import Link from "next/link";

type Action = {
  href: string;
  label: string;
};

type PlatformEmptyStateProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: Action;
  secondaryAction?: Action;
};

export default function PlatformEmptyState({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction
}: PlatformEmptyStateProps) {
  return (
    <div className="glass-line rounded-[2rem] p-6 sm:p-8">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">{eyebrow}</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 max-w-3xl text-base leading-7 text-brand-muted">{description}</p>
      {(primaryAction || secondaryAction) && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {primaryAction && (
            <Link
              href={primaryAction.href}
              className="brand-primary-button inline-flex items-center justify-center"
            >
              {primaryAction.label}
            </Link>
          )}
          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className="brand-secondary-button inline-flex items-center justify-center"
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
