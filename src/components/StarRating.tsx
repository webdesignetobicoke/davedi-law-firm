export function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i < rating ? "var(--color-gold)" : "none"}
          stroke="var(--color-gold)"
          strokeWidth={1.2}
        >
          <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08 1 5.77L10 14.77l-5.19 2.67 1-5.77L1.62 7.6l5.79-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
