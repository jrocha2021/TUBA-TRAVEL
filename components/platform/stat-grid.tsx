export type PlatformStat = {
  label: string;
  value: string;
  hint: string;
};

type PlatformStatGridProps = {
  stats: PlatformStat[];
};

export default function PlatformStatGrid({ stats }: PlatformStatGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.label} className="soft-panel p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
            {stat.label}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{stat.value}</p>
          <p className="mt-3 text-sm leading-6 text-brand-muted">{stat.hint}</p>
        </article>
      ))}
    </div>
  );
}
