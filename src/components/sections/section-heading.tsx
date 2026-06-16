/** Consistent centered section heading + optional eyebrow & subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.08em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-extrabold leading-[1.2] tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
