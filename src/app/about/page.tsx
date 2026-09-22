import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.legalName}, a law firm based in Mississauga serving clients anywhere in Ontario.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-deep py-20 text-white">
        <Container>
          <h1 className="text-4xl sm:text-5xl">{site.legalName}</h1>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="relative h-[28rem] w-full">
            <Image src="/images/hero-bg.jpg" alt="Davedi Law" fill className="object-cover" />
          </div>
          <div>
            <SectionHeading title="Aiming for the Highest Standard" />
            <p className="mt-6 text-base leading-relaxed text-muted">
              Our firm is committed to aiming for the highest standards possible. We aim not only to
              meet your expectations, but to exceed them, and to assist our clients in achieving their
              goals within our philosophy of teamwork, integrity and service.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Through our strongest sense of teamwork with our clients, we seek to assist them through
              the complexities of the Canadian legal system by getting an in-depth understanding of
              their objectives and priorities.
            </p>
            <blockquote className="mt-8 border-l-4 border-gold pl-6 text-xl italic text-navy">
              &ldquo;The glory of a good lawyer is to win a bad trial.&rdquo;
              <span className="mt-2 block text-sm not-italic text-muted">&mdash; Balzac</span>
            </blockquote>
            <Button href="/contact" variant="secondary" className="mt-10">
              Request a Consultation
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-navy py-20 text-white">
        <Container className="text-center">
          <SectionHeading title="Proudly Serving All of Ontario" align="center" light />
          <p className="mx-auto mt-6 max-w-2xl text-white/75">
            While our office is based in Mississauga, we represent clients across Ontario — from the
            GTA to communities throughout the province — for real estate, immigration, wills &amp;
            estates, family law and civil litigation matters.
          </p>
        </Container>
      </section>
    </>
  );
}
