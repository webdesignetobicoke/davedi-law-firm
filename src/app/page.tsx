import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { LawyerCard } from "@/components/LawyerCard";
import { ReviewList } from "@/components/ReviewList";
import { practiceAreas } from "@/lib/services";
import { lawyers } from "@/lib/lawyers";
import { site } from "@/lib/site";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-navy-deep">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-navy-deep/40" />
        <Container className="relative py-32">
          <h1 className="max-w-3xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Taking Care of Your Legal Needs, Anywhere in Ontario.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            {site.legalName} combines first-rate talent and energy across real estate, immigration,
            wills &amp; estates, family law and civil litigation matters.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">Contact Us</Button>
            <Button href="/lawyers" variant="ghost">Meet Our Lawyers</Button>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading
            title="How We Help"
            description="From individuals planning ahead to businesses navigating disputes, our practice covers the matters that matter most."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/services#${area.slug}`}
                className="group block border border-line bg-white"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg text-navy group-hover:text-gold transition-colors">{area.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{area.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy py-24 text-white">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative h-96 w-full">
            <Image src="/images/office-hero.jpg" alt="Davedi Law at work" fill className="object-cover" />
          </div>
          <div>
            <SectionHeading title="Teamwork, Integrity and Service" light />
            <p className="mt-6 text-base leading-relaxed text-white/75">
              Our firm is committed to aiming for the highest standards possible. We aim not only to meet
              your expectations, but to exceed them, and to assist our clients in achieving their goals
              within our philosophy of teamwork, integrity and service.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              Through our strongest sense of teamwork with our clients, we seek to help them navigate the
              complexities of the Canadian legal system by getting an in-depth understanding of their
              objectives and priorities.
            </p>
            <Button href="/about" variant="primary" className="mt-8">
              About the Firm
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading title="Meet Our Lawyers" align="center" />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-auto lg:max-w-3xl">
            {lawyers.map((lawyer) => (
              <LawyerCard key={lawyer.slug} lawyer={lawyer} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-24 border-t border-line">
        <Container>
          <SectionHeading title="What Our Clients Say" align="center" />
          <div className="mt-12">
            <ReviewList />
          </div>
          <div className="mt-10 text-center">
            <Button href="/reviews" variant="secondary">Read &amp; Leave a Review</Button>
          </div>
        </Container>
      </section>

      <section className="bg-gold py-16">
        <Container className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl text-navy-deep sm:text-3xl">Ready to speak with a lawyer?</h2>
            <p className="mt-2 text-navy-deep/80">{site.serviceArea}</p>
          </div>
          <Button href="/contact" variant="secondary">Get in Touch</Button>
        </Container>
      </section>
    </>
  );
}
