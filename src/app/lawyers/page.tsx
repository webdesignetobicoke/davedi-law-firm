import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { LawyerCard } from "@/components/LawyerCard";
import { lawyers } from "@/lib/lawyers";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Lawyers",
  description: `Meet the lawyers at ${site.legalName}.`,
};

export default function LawyersPage() {
  return (
    <>
      <section className="bg-navy-deep py-20 text-white">
        <Container>
          <h1 className="text-4xl sm:text-5xl">Our Lawyers</h1>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading
            title="Experienced Counsel, Personal Attention"
            description="Every client works directly with one of our lawyers from start to finish."
          />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {lawyers.map((lawyer) => (
              <LawyerCard key={lawyer.slug} lawyer={lawyer} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
