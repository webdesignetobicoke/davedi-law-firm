import clsx from "clsx";

export function SectionHeading({
  title,
  description,
  align = "left",
  light = false,
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={clsx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <h2
        className={clsx(
          "text-3xl leading-tight sm:text-4xl",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={clsx("mt-4 text-base leading-relaxed", light ? "text-white/70" : "text-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}
