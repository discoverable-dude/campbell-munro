import { EMAIL_LOGO_SIZE } from "./email-logo";
import { escapeHtml } from "./enquiry";
import { FCA_STATEMENT } from "./site";

export type EnquiryValues = {
  name: string;
  phone: string;
  email: string;
  topic: string;
  where: string;
  message: string;
};

/** Content-ID the logo is attached under, referenced as cid:cm-logo in the HTML. */
export const LOGO_CID = "cm-logo";

const NAVY = "#19226D";
const BLUE = "#015CAB";
const GORSE = "#E3A82B";
const MIST = "#EEF2F7";
const INK = "#1C2333";
const MUTED = "#4A5568";
const LINE = "#D7DEE9";
const FONT = "'Segoe UI', Helvetica, Arial, sans-serif";

export function renderEnquiryEmail(v: EnquiryValues) {
  const e = escapeHtml;
  const firstName = v.name.split(/\s+/)[0] || v.name;
  const mailto = `mailto:${encodeURIComponent(v.email).replace(/%40/g, "@")}?subject=${encodeURIComponent("Your enquiry to Campbell Munro")}`;

  const row = (label: string, valueHtml: string) =>
    `<tr>
      <td style="padding:12px 16px;width:38%;vertical-align:top;font-family:${FONT};font-size:13px;font-weight:600;color:${MUTED};background:${MIST};border-bottom:2px solid #ffffff;">${e(label)}</td>
      <td style="padding:12px 16px;vertical-align:top;font-family:${FONT};font-size:16px;line-height:1.45;color:${INK};background:${MIST};border-bottom:2px solid #ffffff;">${valueHtml}</td>
    </tr>`;

  const link = (href: string, text: string) => `<a href="${e(href)}" style="color:${BLUE};text-decoration:none;">${e(text)}</a>`;

  const html = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>New website enquiry</title>
</head>
<body style="margin:0;padding:0;background:#E9EDF3;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">New enquiry from ${e(v.name)}: ${e(v.topic)}. Reply to arrange their free first meeting.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E9EDF3;">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">
    <tr><td style="background:${NAVY};padding:28px 32px;">
      <img src="cid:${LOGO_CID}" alt="Campbell Munro" width="${EMAIL_LOGO_SIZE.width}" height="${EMAIL_LOGO_SIZE.height}" style="display:block;border:0;outline:none;height:auto;max-width:100%;">
    </td></tr>
    <tr><td style="background:${GORSE};height:4px;line-height:4px;font-size:0;">&nbsp;</td></tr>
    <tr><td style="padding:32px 32px 8px 32px;">
      <p style="margin:0 0 6px 0;font-family:${FONT};font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${BLUE};">New website enquiry</p>
      <h1 style="margin:0 0 12px 0;font-family:${FONT};font-size:26px;line-height:1.2;font-weight:500;color:${NAVY};">${e(v.name)} would like a free first meeting</h1>
      <p style="margin:0 0 24px 0;font-family:${FONT};font-size:16px;line-height:1.55;color:${MUTED};">They sent this through the Campbell Munro website. Please get in touch within one working day, as the site promises.</p>
    </td></tr>
    <tr><td style="padding:0 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;">
        ${row("Name", e(v.name))}
        ${row("Email", link(mailto, v.email))}
        ${row("Phone", v.phone ? link("tel:" + v.phone.replace(/[^0-9+]/g, ""), v.phone) : `<span style="color:${MUTED};">Not given</span>`)}
        ${row("Wants to talk about", e(v.topic))}
        ${row("Would like to meet", e(v.where))}
      </table>
    </td></tr>
    <tr><td style="padding:24px 32px 0 32px;">
      <p style="margin:0 0 8px 0;font-family:${FONT};font-size:13px;font-weight:600;color:${MUTED};">Their message</p>
      <div style="border-left:4px solid ${GORSE};background:${MIST};padding:14px 18px;border-radius:0 8px 8px 0;font-family:${FONT};font-size:16px;line-height:1.55;color:${INK};white-space:pre-wrap;">${v.message ? e(v.message) : `<span style="color:${MUTED};">No message left.</span>`}</div>
    </td></tr>
    <tr><td style="padding:28px 32px 36px 32px;">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="background:${GORSE};border-radius:10px;">
          <a href="${e(mailto)}" style="display:inline-block;padding:14px 26px;font-family:${FONT};font-size:16px;font-weight:600;color:${NAVY};text-decoration:none;">Reply to ${e(firstName)}</a>
        </td>
      </tr></table>
      <p style="margin:14px 0 0 0;font-family:${FONT};font-size:13px;color:${MUTED};">Or just hit reply: your answer will go straight to ${e(v.email)}.</p>
    </td></tr>
    <tr><td style="background:${MIST};padding:20px 32px;border-top:1px solid ${LINE};">
      <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.55;color:${MUTED};">${e(FCA_STATEMENT)}</p>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `New website enquiry: ${v.name} would like a free first meeting`,
    "",
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Phone: ${v.phone || "Not given"}`,
    `Wants to talk about: ${v.topic}`,
    `Would like to meet: ${v.where}`,
    "",
    "Their message:",
    v.message || "No message left.",
    "",
    "Please get in touch within one working day. Hit reply to answer them directly.",
    "",
    "--",
    FCA_STATEMENT,
  ].join("\n");

  return { html, text };
}
