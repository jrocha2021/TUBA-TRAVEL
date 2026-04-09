import { NextResponse } from "next/server";
import { createContactEmail } from "@/lib/contact-email";
import {
  validateContactForm,
  type ContactFormValues
} from "@/lib/contact-form";
import { getContactEmailConfig, getResendClient } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactFormValues>;

    const values: ContactFormValues = {
      fullName: body.fullName ?? "",
      email: body.email ?? "",
      whatsappNumber: body.whatsappNumber ?? "",
      preferredDestination: body.preferredDestination ?? "",
      serviceInterestedIn: body.serviceInterestedIn ?? "",
      travelDate: body.travelDate ?? "",
      numberOfTravelers: body.numberOfTravelers ?? "",
      message: body.message ?? ""
    };

    const errors = validateContactForm(values, {
      required: "required",
      invalidEmail: "invalid-email",
      invalidWhatsappNumber: "invalid-whatsapp-number"
    });

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, error: "validation_failed", fields: errors },
        { status: 400 }
      );
    }

    const resend = getResendClient();
    const { from, to } = getContactEmailConfig();
    const email = createContactEmail(values);

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: values.email,
      subject: email.subject,
      text: email.text,
      html: email.html
    });

    if (error) {
      console.error("Resend error", error);
      return NextResponse.json(
        { ok: false, error: "email_send_failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error", error);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
