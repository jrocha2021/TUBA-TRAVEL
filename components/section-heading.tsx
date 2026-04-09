type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl space-y-3 ${alignment}`}>
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-ocean">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-ink/75 sm:text-lg">{description}</p>
    </div>
  );
}
