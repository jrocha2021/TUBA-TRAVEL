type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl space-y-3 ${alignment} ${className ?? ""}`}>
      <p
        className={`text-sm font-medium uppercase tracking-[0.24em] text-brand-red ${eyebrowClassName ?? ""}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-3xl font-semibold tracking-tight text-white sm:text-4xl ${titleClassName ?? ""}`}
      >
        {title}
      </h2>
      <p
        className={`text-base leading-7 text-brand-muted sm:text-lg ${descriptionClassName ?? ""}`}
      >
        {description}
      </p>
    </div>
  );
}
