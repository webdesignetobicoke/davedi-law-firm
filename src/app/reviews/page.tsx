import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/Button";
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

  const totalGoogleReviews = googleReviews.length;
  const averageRating =
    totalGoogleReviews > 0
      ? googleReviews.reduce((sum, review) => sum + review.rating, 0) / totalGoogleReviews
      : 0;

  return (
    <>
      <section className="bg-navy-deep py-20 text-white">
        <Container>
          <h1 className="text-4xl sm:text-5xl">What Our Clients Say</h1>
          {totalGoogleReviews > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <StarRating rating={Math.round(averageRating)} size={22} />
              <p className="text-white/80">
                <span className="font-semibold text-white">{averageRating.toFixed(1)} out of 5</span> from{" "}
                {totalGoogleReviews} Google reviews
              </p>
            </div>
          )}
        </Container>
      </section>

      <section className="border-b border-line bg-white py-24">
        <Container>
          <SectionHeading title="What Clients Are Saying on Google" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {googleReviews.map((review) => (
              <GoogleReviewCard key={`${review.reviewerName}-${review.relativeTime}`} review={review} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading title="Reviews From Our Website" />
          <div className="mt-10">
            <ReviewList />
          </div>
        </Container>
      </section>

      <section id="write-review" className="scroll-mt-28 bg-navy py-24 text-white">
        <Container>
          <SectionHeading
            title="Leave a Review"
            description="Every review is sent directly to the lawyer you worked with and only goes live once they approve it."
            align="center"
            light
          />
          <div className="mx-auto mt-10 max-w-xl">
            <ReviewForm defaultLawyerSlug={lawyer} />
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
