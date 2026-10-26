export const TOPICS = ["Planning for retirement", "Investing and growing my wealth", "Business owner planning", "Passing wealth on", "Something else"] as const;
export const MEETING_PLACES = ["Crowborough office", "Lichfield office", "Video call", "No preference"] as const;

export type EnquiryState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "phone" | "message", string>>;
  values?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnquiry(form: FormData) {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  const values = {
    name: get("name"),
    phone: get("phone"),
    email: get("email"),
    topic: get("topic"),
    where: get("where"),
    message: get("message"),
  };
  const fieldErrors: NonNullable<EnquiryState["fieldErrors"]> = {};
  if (!values.name) fieldErrors.name = "Please tell us your name.";
  else if (values.name.length > 120) fieldErrors.name = "That name is too long.";
  if (!EMAIL_RE.test(values.email) || values.email.length > 200) fieldErrors.email = "Please enter a valid email address.";
  if (values.phone && !/^[0-9+()\-\s]{6,25}$/.test(values.phone)) fieldErrors.phone = "Please check your phone number.";
  if (values.message.length > 3000) fieldErrors.message = "Please keep your message under 3,000 characters.";
  if (!(TOPICS as readonly string[]).includes(values.topic)) values.topic = TOPICS[0];
  if (!(MEETING_PLACES as readonly string[]).includes(values.where)) values.where = MEETING_PLACES[0];
  return { values, fieldErrors };
}

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
