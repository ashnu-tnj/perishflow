"use client";

import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";

export const CONTACT_EMAIL = "info@aflatus.com";

const roles = [
  "Investor",
  "Exporter or grower",
  "Shipping line or logistics operator",
  "Importer or retailer",
  "Research partner",
  "Other",
];

type Fields = { name: string; email: string; org: string; role: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "That email address doesn't look right — check for typos.";
  if (!v.role) e.role = "Choose the option that best describes you.";
  return e;
}

export function ContactForm() {
  const [values, setValues] = useState<Fields>({ name: "", email: "", org: "", role: "", message: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [sent, setSent] = useState(false);
  const errors = validate(values);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k: keyof Fields) => () => setTouched((t) => ({ ...t, [k]: true }));
  const show = (k: keyof Fields) => touched[k] && errors[k];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, role: true });
    if (Object.keys(errors).length) {
      const first = (["name", "email", "role"] as const).find((k) => errors[k]);
      if (first) document.getElementById(`f-${first}`)?.focus();
      return;
    }
    const subject = `PerishFlow conversation — ${values.role}`;
    const details = [`Name: ${values.name}`, `Email: ${values.email}`];
    if (values.org.trim()) details.push(`Organisation: ${values.org}`);
    details.push(`I am: ${values.role}`);
    const body = values.message.trim() ? `${details.join("\n")}\n\n${values.message}` : details.join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="rounded-3xl border border-fresh/40 bg-fresh/10 p-8">
        <CheckCircle2 className="text-fresh" size={28} aria-hidden />
        <h3 className="mt-4 text-xl font-semibold">Your email is ready to send</h3>
        <p className="mt-2 text-fg-muted">
          We&apos;ve opened a pre-filled message in your email app. If nothing opened, write to us directly at{" "}
          <a className="text-fresh underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <button type="button" onClick={() => setSent(false)} className="btn-ghost mt-6 text-sm">
          Edit my message
        </button>
      </div>
    );
  }

  const field =
    "mt-1.5 block w-full min-h-11 rounded-xl border bg-bg/60 px-4 py-2.5 text-base text-fg placeholder:text-fg-muted/60 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-fresh/60";
  const border = (k: keyof Fields) => (show(k) ? "border-risk" : "border-line hover:border-fg-muted");

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-3xl border border-line bg-card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="text-sm font-medium">
            Name <span className="text-fg-muted">(required)</span>
          </label>
          <input
            id="f-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            onBlur={blur("name")}
            aria-invalid={!!show("name")}
            aria-describedby={show("name") ? "e-name" : undefined}
            className={`${field} ${border("name")}`}
          />
          {show("name") && <p id="e-name" className="mt-1.5 text-sm text-risk">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="f-email" className="text-sm font-medium">
            Work email <span className="text-fg-muted">(required)</span>
          </label>
          <input
            id="f-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            onBlur={blur("email")}
            aria-invalid={!!show("email")}
            aria-describedby={show("email") ? "e-email" : undefined}
            className={`${field} ${border("email")}`}
          />
          {show("email") && <p id="e-email" className="mt-1.5 text-sm text-risk">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="f-org" className="text-sm font-medium">
            Organisation
          </label>
          <input
            id="f-org"
            name="org"
            autoComplete="organization"
            value={values.org}
            onChange={set("org")}
            className={`${field} border-line hover:border-fg-muted`}
          />
        </div>

        <div>
          <label htmlFor="f-role" className="text-sm font-medium">
            I am a… <span className="text-fg-muted">(required)</span>
          </label>
          <select
            id="f-role"
            name="role"
            value={values.role}
            onChange={set("role")}
            onBlur={blur("role")}
            aria-invalid={!!show("role")}
            aria-describedby={show("role") ? "e-role" : undefined}
            className={`${field} ${border("role")} appearance-none`}
          >
            <option value="" disabled>
              Select one
            </option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {show("role") && <p id="e-role" className="mt-1.5 text-sm text-risk">{errors.role}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="f-message" className="text-sm font-medium">
            What would you like to discuss?
          </label>
          <textarea
            id="f-message"
            name="message"
            rows={4}
            value={values.message}
            onChange={set("message")}
            aria-describedby="h-message"
            className={`${field} border-line hover:border-fg-muted resize-y`}
          />
          <p id="h-message" className="mt-1.5 text-sm text-fg-muted">
            Commodities, trade lanes, pilot interest — anything that helps us prepare.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fg-muted">Opens your email app with the details filled in.</p>
        <button type="submit" className="btn-primary">
          <Send size={16} aria-hidden /> Request a conversation
        </button>
      </div>
    </form>
  );
}
