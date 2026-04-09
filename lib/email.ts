import { Resend } from "resend";

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  return new Resend(apiKey);
}

export function getContactEmailConfig() {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!to || !from) {
    throw new Error(
      "Missing CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL environment variable."
    );
  }

  return { to, from };
}
