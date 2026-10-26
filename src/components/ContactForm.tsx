"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitEnquiry } from "@/app/contact/actions";
import { MEETING_PLACES, TOPICS, type EnquiryState } from "@/lib/enquiry";

export function ContactForm() {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, {});
  const v = state.values ?? {};
  const fe = state.fieldErrors ?? {};

  return (
    <form className="m-form" action={action} noValidate>
      <div className="m-row">
        <label>
          Your name
          <input name="name" autoComplete="name" required defaultValue={v.name} aria-invalid={!!fe.name} aria-describedby={fe.name ? "err-name" : undefined} />
          {fe.name && <span className="m-err" id="err-name">{fe.name}</span>}
        </label>
        <label>
          Phone (optional)
          <input name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} aria-invalid={!!fe.phone} aria-describedby={fe.phone ? "err-phone" : undefined} />
          {fe.phone && <span className="m-err" id="err-phone">{fe.phone}</span>}
        </label>
      </div>
      <label>
        Email address
        <input name="email" type="email" autoComplete="email" required defaultValue={v.email} aria-invalid={!!fe.email} aria-describedby={fe.email ? "err-email" : undefined} />
        {fe.email && <span className="m-err" id="err-email">{fe.email}</span>}
      </label>
      <div className="m-row">
        <label>
          What would you like to talk about?
          <select name="topic" defaultValue={v.topic ?? TOPICS[0]}>
            {TOPICS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label>
          Where would you like to meet?
          <select name="where" defaultValue={v.where ?? MEETING_PLACES[0]}>
            {MEETING_PLACES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
      </div>
      <label>
        Anything you&apos;d like us to know
        <textarea name="message" rows={4} defaultValue={v.message} aria-invalid={!!fe.message} aria-describedby={fe.message ? "err-message" : undefined} />
        {fe.message && <span className="m-err" id="err-message">{fe.message}</span>}
      </label>
      <div className="m-hp" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {state.error && <p className="m-err" role="alert">{state.error}</p>}
      <div>
        <button type="submit" className="m-btn m-btn-p" disabled={pending}>
          {pending ? "Sending..." : "Book my free meeting"}
        </button>
      </div>
      <p className="m-note">
        We&apos;ll only use your details to arrange your first meeting. See our <Link href="/privacy-notice" style={{ textDecoration: "underline" }}>Privacy Notice</Link>.
      </p>
    </form>
  );
}
