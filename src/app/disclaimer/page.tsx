import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Legal disclaimer for the ${site.legalName} website.`,
};

const paragraphs = [
  "Material on this web site is intended for informational purposes only. Davedi Law Professional Corp. does not seek to represent you based upon your visit to this Web site.",
  "The viewer should not consider this information to be an inducement to a lawyer-client relationship. Transmission and receipt of the information in this site and/or communication with Davedi Law Professional Corp. through e-mail is not intended to solicit or create and does not create, a lawyer-client relationship between the Firm and any person or business.",
  "E-mail or other communications through this site or otherwise to the Firm or any of its Lawyers and employees in connection with a matter for which we do not already represent you may not be treated as privileged or confidential.",
  "We do not guarantee the security or confidentiality of any communications made by e-mail or otherwise through this web site. We make no warranty with respect to the security of any electronic communication between us.",
  "You agree to indemnify, defend and hold harmless, Davedi Law Professional Corp. and its members, from and against any loss, costs, expenses, claims damages and liabilities related to or associated with your use of this web site.",
];

export default function DisclaimerPage() {
  return (
    <>
      <section className="bg-navy-deep py-20 text-white">
        <Container>
          <h1 className="text-4xl sm:text-5xl">Disclaimer</h1>
        </Container>
      </section>

      <section className="py-24">
        <Container className="max-w-3xl space-y-6">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </Container>
      </section>
    </>
  );
}
