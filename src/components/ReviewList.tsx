import { prisma } from "@/lib/prisma";
import { getLawyer } from "@/lib/lawyers";
import { StarRating } from "./StarRating";

export async function ReviewList({ lawyerSlug }: { lawyerSlug?: string }) {
  let reviews: Awaited<ReturnType<typeof prisma.review.findMany>> = [];

  try {
    reviews = await prisma.review.findMany({
      where: { status: "APPROVED", ...(lawyerSlug ? { lawyerSlug } : {}) },
      orderBy: { decidedAt: "desc" },
    });
  } catch {
    return (
      <p className="text-sm text-muted">
        Reviews are temporarily unavailable.
      </p>
    );
  }

  if (reviews.length === 0) {
    return (
      <p className="text-sm text-muted">
        No approved reviews yet — be the first to share your experience.
      </p>
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
