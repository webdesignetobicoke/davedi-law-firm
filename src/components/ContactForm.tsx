"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ lawyerSlug, title }: { lawyerSlug?: string; title?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      lawyerSlug,
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
      company: data.get("company"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Something went wrong. Please check your message and try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line border-t-4 border-t-gold bg-white p-6 text-center shadow-lg sm:p-8">
        <p className="text-base text-navy">Thank you — your message has been sent.</p>
        <p className="mt-2 text-sm text-muted">We&apos;ll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border border-line border-t-4 border-t-gold bg-white p-6 shadow-lg sm:p-8"
    >
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      {title && <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-navy">{title}</h3>}

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-navy">Your name</label>
        <input
          type="text"
          name="name"
          required
          minLength={2}
          maxLength={80}
          className="w-full border border-line bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-navy">Your email</label>
        <input
          type="email"
          name="email"
          required
          maxLength={200}
          className="w-full border border-line bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-navy">
          Phone <span className="normal-case text-muted">(optional)</span>
        </label>
        <input
          type="tel"
          name="phone"
          maxLength={30}
          className="w-full border border-line bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-navy">Your message</label>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          className="w-full border border-line bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
        />
      </div>

      {status === "error" && <p className="text-sm text-red-700">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center bg-navy px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-gold hover:text-navy-deep disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
