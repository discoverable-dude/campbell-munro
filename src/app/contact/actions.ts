"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { EMAIL_LOGO_BASE64 } from "@/lib/email-logo";
import { validateEnquiry, type EnquiryState } from "@/lib/enquiry";
import { LOGO_CID, renderEnquiryEmail } from "@/lib/enquiry-email";

const FALLBACK_ERROR = "Sorry, something went wrong sending your details. Please call us on 01892 575575 or email enquiries@campbellmunro.co.uk.";

export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never see or fill this field. Pretend success so bots don't retry.
  if (String(form.get("website") ?? "") !== "") redirect("/contact/thank-you");

  const { values, fieldErrors } = validateEnquiry(form);
  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, values, error: "Please check the highlighted fields." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.CONTACT_TO_EMAIL ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || to.length === 0 || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[enquiry] Resend is not configured, so this was not sent:", values);
      redirect("/contact/thank-you");
    }
    console.error("[enquiry] RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL must be set.");
    return { error: FALLBACK_ERROR, values };
  }

  const { html, text } = renderEnquiryEmail(values);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: values.email,
      subject: `Website enquiry: ${values.name} (${values.topic})`,
      html,
      text,
      attachments: [{ filename: "campbell-munro-logo.png", content: Buffer.from(EMAIL_LOGO_BASE64, "base64"), contentType: "image/png", contentId: LOGO_CID }],
    });
    if (error) {
      console.error("[enquiry] Resend error:", error);
      return { error: FALLBACK_ERROR, values };
    }
  } catch (err) {
    console.error("[enquiry] Resend threw:", err);
    return { error: FALLBACK_ERROR, values };
  }

  redirect("/contact/thank-you");
}
