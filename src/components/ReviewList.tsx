import { prisma } from "@/lib/prisma";
import { getLawyer } from "@/lib/lawyers";
import { StarRating } from "./StarRating";
import { Button } from "./Button";

function writeReviewHref(lawyerSlug?: string) {
  return lawyerSlug ? `/reviews?lawyer=${lawyerSlug}#write-review` : "/reviews#write-review";
}

export async function ReviewList({ lawyerSlug }: { lawyerSlug?: string }) {
  let reviews: Awaited<ReturnType<typeof prisma.review.findMany>> = [];

  try {
    reviews = await prisma.review.findMany({
      where: { status: "APPROVED", ...(lawyerSlug ? { lawyerSlug } : {}) },
      orderBy: { decidedAt: "desc" },
    });
  } catch {
    return (
      <div className="border border-dashed border-line bg-white p-8 text-center">
        <p className="text-sm text-muted">Reviews are temporarily unavailable.</p>
        <Button href={writeReviewHref(lawyerSlug)} variant="primary" className="mt-5">
          Write a Review
        </Button>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="border border-dashed border-line bg-white p-8 text-center">
        <p className="text-sm text-muted">No approved reviews yet — be the first to share your experience.</p>
        <Button href={writeReviewHref(lawyerSlug)} variant="primary" className="mt-5">
          Write a Review
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {reviews.map((review) => {
        const lawyer = getLawyer(review.lawyerSlug);
        return (
          <div key={review.id} className="border border-line bg-white p-6">
            <StarRating rating={review.rating} />
            <p className="mt-3 text-sm italic leading-relaxed text-ink">&ldquo;{review.content}&rdquo;</p>
            <p className="mt-4 text-sm font-semibold text-navy">{review.reviewerName}</p>
            {!lawyerSlug && lawyer && (
              <p className="text-xs uppercase tracking-wide text-gold">Reviewed {lawyer.name}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
