import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { site } from "@/lib/site";
import { practiceAreas } from "@/lib/services";
import { lawyers } from "@/lib/lawyers";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-white/70">
      <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image src="/images/logo-icon.png" alt="" width={741} height={746} className="h-14 w-14" />
            <span className="flex flex-col leading-none">
              <span className="text-lg font-semibold tracking-[0.12em] text-white">DAVEDI LAW</span>
              <span className="mt-1.5 text-[10px] font-medium tracking-[0.25em] text-white/60">
                PROFESSIONAL CORPORATION
              </span>
            </span>
          </div>
          <p className="text-sm leading-relaxed">{site.description}</p>
          <p className="mt-4 text-sm font-semibold text-gold-light">{site.serviceArea}</p>
        </div>

        <div>
          <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Practice Areas</h3>
          <ul className="space-y-2 text-sm">
            {practiceAreas.map((area) => (
              <li key={area.slug}>
                <Link href={`/services#${area.slug}`} className="hover:text-white transition-colors">
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">The Firm</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            </li>
            {lawyers.map((lawyer) => (
              <li key={lawyer.slug}>
                <Link href={`/lawyers/${lawyer.slug}`} className="hover:text-white transition-colors">
                  {lawyer.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/reviews" className="hover:text-white transition-colors">Client Reviews</Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>{site.address.line1}</li>
            <li>{site.address.line2}</li>
          </ul>
          <div className="mt-5 space-y-4">
            {lawyers.map((lawyer) => (
              <ul key={lawyer.slug} className="space-y-1 text-sm">
                <li className="font-semibold text-white">{lawyer.name}</li>
                <li>
                  <a href={`tel:${lawyer.phoneHref}`} className="hover:text-white transition-colors">Tel: {lawyer.phone}</a>
                </li>
                {lawyer.fax && <li>Fax: {lawyer.fax}</li>}
                <li>
                  <a href={`mailto:${lawyer.email}`} className="hover:text-white transition-colors">{lawyer.email}</a>
                </li>
              </ul>
            ))}
          </div>
          <div className="mt-4 flex gap-4">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-white transition-colors"
            >
              Facebook
            </a>
            <a
              href={site.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-white transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-white/50 sm:flex-row">
          <p>&copy; {year} {site.legalName}. All Rights Reserved.</p>
          <p>Attorney advertising. Prior results do not guarantee a similar outcome.</p>
        </Container>
      </div>
    </footer>
  );
}
