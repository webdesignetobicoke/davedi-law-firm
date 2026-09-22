import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ReviewList } from "@/components/ReviewList";
import { ReviewForm } from "@/components/ReviewForm";
import { GoogleReviewCard } from "@/components/GoogleReviewCard";
import { googleReviews } from "@/lib/googleReviews";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Client Reviews",
  description: `Read client reviews for ${site.legalName}, or leave one of your own.`,
};

export const revalidate = 60;

export default async function ReviewsPage(props: PageProps<"/reviews">) {
  const params = await props.searchParams;
  const lawyer = typeof params.lawyer === "string" ? params.lawyer : undefined;

  return (
    <>
      <section className="bg-navy-deep py-20 text-white">
        <Container>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">Client Reviews</p>
          <h1 className="text-4xl sm:text-5xl">What Our Clients Say</h1>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading eyebrow="Google Reviews" title="What Clients Are Saying on Google" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {googleReviews.map((review) => (
              <GoogleReviewCard key={`${review.reviewerName}-${review.relativeTime}`} review={review} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream border-t border-line py-24">
        <Container>
          <SectionHeading eyebrow="Site Reviews" title="Reviews From Our Website" />
          <div className="mt-10">
            <ReviewList />
          </div>
        </Container>
      </section>

      <section id="write-review" className="scroll-mt-28 border-t border-line py-24">
        <Container className="max-w-2xl">
          <SectionHeading
            eyebrow="Share Your Experience"
            title="Leave a Review"
            description="Every review is sent directly to the lawyer you worked with and only goes live once they approve it."
          />
          <div className="mt-10">
            <ReviewForm defaultLawyerSlug={lawyer} />
          </div>
        </Container>
      </section>
    </>
  );
}
