import { Resend } from "resend";
import { Lawyer } from "./lawyers";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = process.env.REVIEWS_FROM_EMAIL ?? "Davedi Law Reviews <onboarding@resend.dev>";

function baseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function sendReviewApprovalEmail(params: {
  lawyer: Lawyer;
  reviewerName: string;
  rating: number;
  content: string;
  token: string;
}) {
  const { lawyer, reviewerName, rating, content, token } = params;
  const approveUrl = `${baseUrl()}/api/reviews/decide?token=${token}&action=approve`;
  const rejectUrl = `${baseUrl()}/api/reviews/decide?token=${token}&action=reject`;
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  if (!resend) {
    console.warn(
      "RESEND_API_KEY is not set — skipping review notification email. Set it in .env to enable sending.",
    );
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: lawyer.email,
    subject: `New client review awaiting your approval — ${reviewerName}`,
    html: `
      <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; color: #1b2a45;">
        <h2 style="margin-bottom: 4px;">New review for you, ${lawyer.name.split(" ")[0]}</h2>
        <p style="color: #55627a; margin-top: 0;">A visitor left a review on the Davedi Law website. It will only appear publicly once you approve it.</p>
        <div style="background: #f7f5ef; border: 1px solid #e4dfd1; padding: 20px; margin: 20px 0;">
          <p style="margin: 0 0 8px; color: #c0983d; font-size: 18px; letter-spacing: 2px;">${stars}</p>
          <p style="margin: 0 0 8px; font-style: italic;">&ldquo;${content}&rdquo;</p>
          <p style="margin: 0; font-weight: bold;">— ${reviewerName}</p>
        </div>
        <table cellspacing="0" cellpadding="0" style="margin: 24px 0;">
          <tr>
            <td style="padding-right: 12px;">
              <a href="${approveUrl}" style="background: #1b2a45; color: #ffffff; padding: 12px 24px; text-decoration: none; font-weight: bold; display: inline-block;">Approve &amp; publish</a>
            </td>
            <td>
              <a href="${rejectUrl}" style="background: #ffffff; color: #1b2a45; padding: 12px 24px; text-decoration: none; font-weight: bold; display: inline-block; border: 1px solid #1b2a45;">Reject</a>
            </td>
          </tr>
        </table>
        <p style="color: #8a92a3; font-size: 12px;">Davedi Law Professional Corporation</p>
      </div>
    `,
  });
}

export async function sendContactEmail(params: {
  to: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const { to, name, email, phone, message } = params;

  if (!resend) {
    console.warn(
      "RESEND_API_KEY is not set — skipping contact notification email. Set it in .env to enable sending.",
    );
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    replyTo: email,
    subject: `New website inquiry from ${name}`,
    html: `
      <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; color: #1b2a45;">
        <h2 style="margin-bottom: 4px;">New website inquiry</h2>
        <p style="color: #55627a; margin-top: 0;">A visitor reached out through the Davedi Law website contact form.</p>
        <div style="background: #f7f5ef; border: 1px solid #e4dfd1; padding: 20px; margin: 20px 0;">
          <p style="margin: 0 0 8px; white-space: pre-wrap;">${message}</p>
        </div>
        <table cellspacing="0" cellpadding="0" style="margin: 24px 0; width: 100%;">
          <tr><td style="padding: 4px 0; color: #55627a;">Name</td><td style="padding: 4px 0; font-weight: bold;">${name}</td></tr>
          <tr><td style="padding: 4px 0; color: #55627a;">Email</td><td style="padding: 4px 0; font-weight: bold;">${email}</td></tr>
          ${phone ? `<tr><td style="padding: 4px 0; color: #55627a;">Phone</td><td style="padding: 4px 0; font-weight: bold;">${phone}</td></tr>` : ""}
        </table>
        <p style="color: #8a92a3; font-size: 12px;">Reply to this email to respond directly to ${name}. Davedi Law Professional Corporation</p>
      </div>
    `,
  });
}
