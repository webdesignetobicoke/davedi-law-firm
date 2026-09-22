import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { PracticeAreaCard } from "@/components/PracticeAreaCard";
import { practiceAreas } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Practice areas at ${site.legalName}: real estate, immigration, wills & estates, family law and civil litigation.`,
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy-deep py-20 text-white">
        <Container>
          <h1 className="text-4xl sm:text-5xl">Our Services</h1>
          <p className="mt-4 max-w-2xl text-white/70">{site.serviceArea}</p>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading
            title="Legal Services for Individuals & Businesses"
            description="Explore what we handle within each practice area below."
          />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area) => (
              <PracticeAreaCard key={area.slug} area={area} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
