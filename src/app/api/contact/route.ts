import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/email";
import { getLawyer } from "@/lib/lawyers";
import { site } from "@/lib/site";

const contactSchema = z.object({
  lawyerSlug: z.enum(["harish-davedi", "ashish-dadwal"]).optional(),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
  // honeypot field — real users never fill this in
  company: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const lawyer = parsed.data.lawyerSlug ? getLawyer(parsed.data.lawyerSlug) : undefined;
  const to = lawyer ? lawyer.email : site.email;

  try {
    await sendContactEmail({
      to,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || undefined,
      message: parsed.data.message,
    });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
