import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const action = request.nextUrl.searchParams.get("action");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;

  if (!token || (action !== "approve" && action !== "reject")) {
    return NextResponse.redirect(`${siteUrl}/review-decision?result=invalid`);
  }

  const review = await prisma.review.findUnique({ where: { token } });

  if (!review) {
    return NextResponse.redirect(`${siteUrl}/review-decision?result=invalid`);
  }

  if (review.status !== "PENDING") {
    return NextResponse.redirect(
      `${siteUrl}/review-decision?result=already&status=${review.status.toLowerCase()}`,
    );
  }

  const status = action === "approve" ? "APPROVED" : "REJECTED";

  await prisma.review.update({
    where: { token },
    data: { status, decidedAt: new Date() },
  });

  return NextResponse.redirect(`${siteUrl}/review-decision?result=${action}`);
}
