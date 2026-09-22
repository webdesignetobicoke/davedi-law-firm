import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ContactForm } from "@/components/ContactForm";
import { lawyers } from "@/lib/lawyers";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.legalName} — serving clients anywhere in Ontario.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy-deep py-20 text-white">
        <Container>
          <h1 className="text-4xl sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-xl text-white/70">{site.serviceArea}</p>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title="Mississauga, Ontario" />
            <ul className="mt-6 space-y-3 text-base text-muted">
              <li>{site.address.line1}</li>
              <li>{site.address.line2}</li>
              <li>
                <a href={`tel:${site.phoneHref}`} className="hover:text-gold transition-colors">
                  Tel: {site.phone}
                </a>
              </li>
              <li>Fax: {site.fax}</li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-gold transition-colors">
                  {site.email}
                </a>
              </li>
            </ul>
            <WhatsAppButton href={site.whatsapp} className="mt-8" />

            <div className="mt-12">
              <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">Speak Directly With</h3>
              <div className="space-y-4">
                {lawyers.map((lawyer) => (
                  <div key={lawyer.slug} className="border border-line bg-white p-4">
                    <p className="text-base text-navy">{lawyer.name}</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold">{lawyer.title}</p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                      <a href={`mailto:${lawyer.email}`} className="hover:text-gold transition-colors">
                        {lawyer.email}
                      </a>
                      <a href={`tel:${lawyer.phoneHref}`} className="hover:text-gold transition-colors">
                        Tel: {lawyer.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div id="contact-form" className="scroll-mt-28">
              <SectionHeading title="We'll Get Back to You" />
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            <div className="mt-10 h-72 w-full overflow-hidden border border-line">
              <iframe
                title="Office location map"
                src="https://www.google.com/maps?q=7895+Tranmere+Drive,+Mississauga,+ON+L5S+1V9&output=embed"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
