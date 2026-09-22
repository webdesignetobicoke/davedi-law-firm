import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ReviewList } from "@/components/ReviewList";
import { ContactForm } from "@/components/ContactForm";
import { getLawyer, lawyers } from "@/lib/lawyers";

export const revalidate = 60;

export function generateStaticParams() {
  return lawyers.map((lawyer) => ({ slug: lawyer.slug }));
}

export async function generateMetadata(props: PageProps<"/lawyers/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const lawyer = getLawyer(slug);
  if (!lawyer) return {};
  return {
    title: lawyer.name,
    description: lawyer.title,
  };
}

export default async function LawyerProfilePage(props: PageProps<"/lawyers/[slug]">) {
  const { slug } = await props.params;
  const lawyer = getLawyer(slug);

  if (!lawyer) notFound();

  return (
    <>
      <section className="bg-navy-deep py-20 text-white">
        <Container className="grid grid-cols-1 items-center gap-10 sm:grid-cols-[220px_1fr]">
          <div className="relative h-72 w-56 overflow-hidden bg-white/5">
            <Image src={lawyer.image} alt={lawyer.name} fill className="object-contain" />
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
              {lawyer.focus.join(" · ")}
            </p>
            <h1 className="text-4xl sm:text-5xl">{lawyer.name}</h1>
            <p className="mt-2 text-lg text-white/70">{lawyer.title}</p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionHeading eyebrow="Biography" title={`About ${lawyer.name.split(" ")[0]}`} />
            <div className="mt-6 space-y-4">
              {lawyer.bio.map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <h3 className="mt-10 text-xl text-navy">Achievements &amp; Credentials</h3>
            <ul className="mt-4 space-y-2">
              {lawyer.achievements.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <aside className="h-fit border border-line bg-white p-6">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-navy">Contact {lawyer.name.split(" ")[0]}</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li>
                  <a href={`mailto:${lawyer.email}`} className="hover:text-gold transition-colors">{lawyer.email}</a>
                </li>
                <li>
                  <a href={`tel:${lawyer.phoneHref}`} className="hover:text-gold transition-colors">Tel: {lawyer.phone}</a>
                </li>
                {lawyer.fax && <li>Fax: {lawyer.fax}</li>}
              </ul>
              <WhatsAppButton href={lawyer.whatsapp} className="mt-6 w-full" />
              <Button href={`/reviews?lawyer=${lawyer.slug}#write-review`} variant="primary" className="mt-3 w-full">
                Write a Review
              </Button>
            </aside>

            <ContactForm lawyerSlug={lawyer.slug} title={`Send ${lawyer.name.split(" ")[0]} a Message`} />
          </div>
        </Container>
      </section>

      <section className="bg-cream border-t border-line py-24">
        <Container>
          <SectionHeading eyebrow="Client Reviews" title={`Reviews for ${lawyer.name}`} />
          <div className="mt-10">
            <ReviewList lawyerSlug={lawyer.slug} />
          </div>
        </Container>
      </section>
    </>
  );
}
