"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Container } from "./Container";
import { Button } from "./Button";
import { lawyers } from "@/lib/lawyers";
import { practiceAreas } from "@/lib/services";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/lawyers", label: "Our Lawyers" },
  { href: "/services", label: "Services" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

function getSubLinks(href: string): { href: string; label: string }[] | null {
  if (href === "/lawyers") {
    return lawyers.map((lawyer) => ({ href: `/lawyers/${lawyer.slug}`, label: lawyer.name }));
  }
  if (href === "/services") {
    return practiceAreas.map((area) => ({ href: `/services/${area.slug}`, label: area.name }));
  }
  if (href === "/reviews") {
    return [{ href: "/reviews#write-review", label: "Write a Review" }];
  }
  return null;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-line">
      <div className="bg-navy-deep text-white/80 text-xs">
        <Container className="flex flex-col items-center justify-center py-3 text-center sm:flex-row sm:justify-between sm:py-4 sm:text-left">
          <div className="flex flex-col items-center gap-x-3 gap-y-1 text-xs sm:flex-row sm:items-center sm:text-[13px]">
            <span className="hidden sm:inline">Call us for a no-obligation chat:</span>
            <span className="flex flex-col items-center gap-x-3 gap-y-1 sm:flex-row sm:flex-wrap sm:justify-center">
              {lawyers.map((lawyer, index) => (
                <span key={lawyer.slug} className="flex items-center gap-2 sm:gap-3">
                  {index > 0 && <span className="hidden text-white/30 sm:inline">|</span>}
                  <a href={`tel:${lawyer.phoneHref}`} className="whitespace-nowrap hover:text-gold-light transition-colors">
                    {lawyer.name.split(" ")[0]}: {lawyer.phone}
                  </a>
                  <span className="text-white/30">&middot;</span>
                  <a href={`mailto:${lawyer.email}`} className="whitespace-nowrap text-gold-light hover:text-gold transition-colors">
                    {lawyer.email}
                  </a>
                </span>
              ))}
            </span>
          </div>
        </Container>
      </div>

      <Container className="flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/images/logo-icon.png" alt="" width={741} height={746} priority className="h-16 w-16" />
          <span className="flex flex-col leading-none">
            <span className="text-xl font-semibold tracking-[0.12em] text-navy">DAVEDI LAW</span>
            <span className="mt-1.5 text-[10px] font-medium tracking-[0.25em] text-muted">
              PROFESSIONAL CORPORATION
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            const subLinks = getSubLinks(link.href);

            if (!subLinks) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "text-sm font-semibold uppercase tracking-wide transition-colors",
                    active ? "text-gold" : "text-navy hover:text-gold",
                  )}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <div key={link.href} className="group relative py-3">
                <Link
                  href={link.href}
                  className={clsx(
                    "text-sm font-semibold uppercase tracking-wide transition-colors",
                    active ? "text-gold" : "text-navy hover:text-gold",
                  )}
                >
                  {link.label}
                </Link>
                <div className="invisible absolute top-full left-1/2 z-50 w-56 -translate-x-1/2 border border-line bg-white opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100">
                  {subLinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-4 py-3 text-sm font-semibold uppercase tracking-wide text-navy hover:bg-cream hover:text-gold"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="primary">
            Contact Us
          </Button>
        </div>

        <button
          className="flex flex-col gap-1.5 p-2 lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={clsx("h-0.5 w-6 bg-navy transition-transform", open && "translate-y-2 rotate-45")} />
          <span className={clsx("h-0.5 w-6 bg-navy transition-opacity", open && "opacity-0")} />
          <span className={clsx("h-0.5 w-6 bg-navy transition-transform", open && "-translate-y-2 -rotate-45")} />
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-semibold uppercase tracking-wide text-navy hover:text-gold"
                >
                  {link.label}
                </Link>
                {getSubLinks(link.href)?.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 pl-4 text-sm font-semibold uppercase tracking-wide text-muted hover:text-gold"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
