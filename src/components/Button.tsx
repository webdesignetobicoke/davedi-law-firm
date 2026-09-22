import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-navy-deep hover:bg-gold-light",
  secondary: "bg-navy text-white hover:bg-navy-light",
  ghost: "border border-white/40 text-white hover:bg-white/10",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  target,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  target?: string;
}) {
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={clsx(
        "inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold uppercase tracking-wide transition-colors",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
