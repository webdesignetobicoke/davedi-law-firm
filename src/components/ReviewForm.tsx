"use client";

import { FormEvent, useState } from "react";
import { lawyers } from "@/lib/lawyers";

type Status = "idle" | "submitting" | "success" | "error";

export function ReviewForm({ defaultLawyerSlug }: { defaultLawyerSlug?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      lawyerSlug: data.get("lawyerSlug"),
      reviewerName: data.get("reviewerName"),
      reviewerEmail: data.get("reviewerEmail"),
      rating,
      content: data.get("content"),
      company: data.get("company"),
    };

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Something went wrong. Please check your review and try again.");
      }

      setStatus("success");
      form.reset();
      setRating(5);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gold bg-white p-8 text-center">
        <p className="text-lg text-navy">Thank you — your review has been sent to the lawyer for approval.</p>
        <p className="mt-2 text-sm text-muted">
          Once approved, it will appear on our reviews page.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-line p-6 sm:p-8">
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-navy">
          Which lawyer are you reviewing?
        </label>
        <select
          name="lawyerSlug"
          required
          defaultValue={defaultLawyerSlug ?? ""}
          className="w-full border border-line bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
        >
          <option value="" disabled>
            Choose a lawyer
          </option>
          {lawyers.map((lawyer) => (
            <option key={lawyer.slug} value={lawyer.slug}>
              {lawyer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-navy">Your rating</label>
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, i) => {
            const value = i + 1;
            const active = value <= (hoverRating || rating);
            return (
              <button
                key={value}
                type="button"
                aria-label={`${value} star${value > 1 ? "s" : ""}`}
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1"
              >
                <svg width={26} height={26} viewBox="0 0 20 20" fill={active ? "var(--color-gold)" : "none"} stroke="var(--color-gold)" strokeWidth={1.2}>
                  <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08 1 5.77L10 14.77l-5.19 2.67 1-5.77L1.62 7.6l5.79-.84L10 1.5z" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-navy">Your name</label>
          <input
            type="text"
            name="reviewerName"
            required
            minLength={2}
            maxLength={80}
            className="w-full border border-line bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-navy">
            Your email <span className="normal-case text-muted">(optional)</span>
          </label>
          <input
            type="email"
            name="reviewerEmail"
            maxLength={200}
            className="w-full border border-line bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-navy">Your review</label>
        <textarea
          name="content"
          required
          minLength={10}
          maxLength={1000}
          rows={5}
          className="w-full border border-line bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
        />
      </div>

      {status === "error" && <p className="text-sm text-red-700">{errorMessage}</p>}

      <p className="text-xs text-muted">
        Reviews are sent directly to the lawyer and only appear on the site once they approve it.
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center bg-navy px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-gold hover:text-navy-deep disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit Review"}
      </button>
    </form>
  );
}
