import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getLawyer } from "@/lib/lawyers";
import { sendReviewApprovalEmail } from "@/lib/email";

const reviewSchema = z.object({
  lawyerSlug: z.enum(["harish-davedi", "ashish-dadwal"]),
  reviewerName: z.string().trim().min(2).max(80),
  reviewerEmail: z.string().trim().email().max(200).optional().or(z.literal("")),
  rating: z.coerce.number().int().min(1).max(5),
  content: z.string().trim().min(10).max(1000),
  // honeypot field — real users never fill this in
  company: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = reviewSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const lawyer = getLawyer(parsed.data.lawyerSlug);
  if (!lawyer) {
    return NextResponse.json({ error: "Unknown lawyer." }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: {
      lawyerSlug: parsed.data.lawyerSlug,
      reviewerName: parsed.data.reviewerName,
      reviewerEmail: parsed.data.reviewerEmail || null,
      rating: parsed.data.rating,
      content: parsed.data.content,
    },
  });

  try {
    await sendReviewApprovalEmail({
      lawyer,
      reviewerName: review.reviewerName,
      rating: review.rating,
      content: review.content,
      token: review.token,
    });
  } catch (error) {
    console.error("Failed to send review approval email", error);
  }

  return NextResponse.json({ success: true });
}
