"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Container } from "./Container";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/lawyers", label: "Our Lawyers" },
  { href: "/services", label: "Services" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-line">
      <div className="bg-navy-deep text-white/80 text-xs">
        <Container className="flex items-center justify-between py-2">
          <a href={`tel:${site.phoneHref}`} className="hover:text-gold-light transition-colors">
            Call us for a no-obligation chat: {site.phone}
          </a>
          <div className="hidden items-center gap-4 sm:flex">
            <a href={`mailto:${site.email}`} className="hover:text-gold-light transition-colors">
              {site.email}
            </a>
            <span className="text-white/30">|</span>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-light transition-colors"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href={site.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-light transition-colors"
              aria-label="Twitter"
            >
              Twitter
            </a>
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
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-navy px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-gold hover:text-navy-deep"
          >
            Contact Us
          </Link>
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
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-semibold uppercase tracking-wide text-navy hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
