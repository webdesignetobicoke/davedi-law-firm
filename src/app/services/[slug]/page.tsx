import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Users, MapPin, PhoneCall } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { getPracticeArea, practiceAreas } from "@/lib/services";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const area = getPracticeArea(slug);
  if (!area) return {};
  return {
    title: area.name,
    description: area.summary,
  };
}

export default async function PracticeAreaPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const area = getPracticeArea(slug);

  if (!area) notFound();

  const otherAreas = practiceAreas.filter((other) => other.slug !== area.slug);

  const whyChooseUs = [
    {
      icon: MessageCircle,
      title: "Clear Communication",
      description: "We explain your options in plain language and keep you updated at every stage.",
    },
    {
      icon: Users,
      title: "Personalized Service",
      description: "Every matter gets direct attention from your lawyer, not a rotating cast of assistants.",
    },
    {
      icon: MapPin,
      title: "Serving All of Ontario",
      description: site.serviceArea,
    },
    {
      icon: PhoneCall,
      title: "Responsive & Accessible",
      description: "Reach us by phone, email or WhatsApp — we respond quickly when it matters most.",
    },
  ];

  return (
    <>
      <section className="relative bg-navy-deep py-28 text-white">
        <div className="absolute inset-0">
          <Image src={area.image} alt={area.name} fill priority sizes="100vw" className="object-cover opacity-30" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/90 to-navy-deep/60" />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-white">{area.name}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl">{area.name}</h1>
          <p className="mt-4 max-w-2xl text-white/70">{area.summary}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact">Book a Consultation</Button>
            <Button href={`tel:${site.phoneHref}`} variant="ghost">
              Call {site.phone}
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white py-14">
        <Container className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <item.icon className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
              <div>
                <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionHeading title={`How We Help With ${area.name}`} />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">{area.intro}</p>

            <div className="mt-14">
              <SectionHeading title={`${area.name} Services`} />
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {area.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-start gap-3 border border-line bg-white p-5 transition-colors hover:border-gold"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <span className="text-base text-ink">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit border border-line border-t-4 border-t-gold bg-white p-6 shadow-lg">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-navy">Discuss Your Matter</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{site.serviceArea}</p>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-gold transition-colors">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`} className="hover:text-gold transition-colors">
                  Tel: {site.phone}
                </a>
              </li>
            </ul>
            <Button href="/contact" className="mt-6 w-full">
              Book a Consultation
            </Button>
          </aside>
        </Container>
      </section>

      <section className="bg-navy-deep py-24 text-white">
        <Container>
          <SectionHeading title="Our Process" align="center" light />
          <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute top-6 right-0 left-0 hidden h-px bg-white/15 lg:block" />
            {area.process.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-navy-deep text-lg font-semibold text-gold-light">
                  {i + 1}
                </div>
                <h3 className="mt-5 text-lg text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream border-t border-line py-24">
        <Container>
          <SectionHeading title="Other Practice Areas" />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {otherAreas.map((other) => (
              <div key={other.slug} className="group bg-white border border-line">
                <Link href={`/services/${other.slug}`} className="block relative h-48 overflow-hidden">
                  <Image
                    src={other.image}
                    alt={other.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="p-5">
                  <h3 className="text-lg text-navy">
                    <Link href={`/services/${other.slug}`} className="hover:text-gold transition-colors">
                      {other.name}
                    </Link>
                  </h3>
                  <Link
                    href={`/services/${other.slug}`}
                    className="mt-4 flex w-full items-center justify-center bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-gold hover:text-navy-deep"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center border border-navy px-7 py-3 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-navy hover:text-white"
            >
              View All Services
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-gold py-16">
        <Container className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl text-navy-deep sm:text-3xl">Ready to speak with a lawyer?</h2>
            <p className="mt-2 text-navy-deep/80">{site.serviceArea}</p>
          </div>
          <Button href="/contact" variant="secondary">
            Get in Touch
          </Button>
        </Container>
      </section>
    </>
  );
}
