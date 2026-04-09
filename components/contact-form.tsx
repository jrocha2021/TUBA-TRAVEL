"use client";

import { useState } from "react";
import {
  initialContactFormValues,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues
} from "@/lib/contact-form";
import type { Messages } from "@/lib/i18n";

type ContactFormProps = {
  messages: Messages["contact"]["form"];
};

export default function ContactForm({ messages }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(initialContactFormValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleChange(field: keyof ContactFormValues, value: string) {
    setValues((current) => ({
      ...current,
      [field]: value
    }));

    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateContactForm(values, messages.validation);
    setErrors(nextErrors);
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      const result = (await response.json()) as { ok?: boolean };

      if (!response.ok || !result.ok) {
        setSubmitError(messages.errorMessage);
        return;
      }

      setIsSubmitted(true);
      setValues(initialContactFormValues);
    } catch {
      setSubmitError(messages.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-[2rem] border border-ocean/10 bg-ocean/5 p-6 sm:p-8">
        <h3 className="text-2xl font-semibold tracking-tight text-ink">
          {messages.successTitle}
        </h3>
        <p className="mt-3 max-w-2xl text-base leading-7 text-ink/75">
          {messages.successDescription}
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="mt-6 rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-ocean/20 hover:bg-ocean/90"
        >
          {messages.resetButton}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 md:grid-cols-2">
      {submitError ? (
        <div className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      ) : null}

      <label className="space-y-2">
        <span className="text-sm font-medium text-ink">{messages.fields.fullName.label}</span>
        <input
          type="text"
          value={values.fullName}
          onChange={(event) => handleChange("fullName", event.target.value)}
          placeholder={messages.fields.fullName.placeholder}
          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-ocean"
        />
        {errors.fullName ? <p className="text-sm text-red-600">{errors.fullName}</p> : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-ink">{messages.fields.email.label}</span>
        <input
          type="email"
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
          placeholder={messages.fields.email.placeholder}
          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-ocean"
        />
        {errors.email ? <p className="text-sm text-red-600">{errors.email}</p> : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-ink">
          {messages.fields.whatsappNumber.label}
        </span>
        <input
          type="text"
          value={values.whatsappNumber}
          onChange={(event) => handleChange("whatsappNumber", event.target.value)}
          placeholder={messages.fields.whatsappNumber.placeholder}
          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-ocean"
        />
        {errors.whatsappNumber ? (
          <p className="text-sm text-red-600">{errors.whatsappNumber}</p>
        ) : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-ink">
          {messages.fields.preferredDestination.label}
        </span>
        <input
          type="text"
          value={values.preferredDestination}
          onChange={(event) => handleChange("preferredDestination", event.target.value)}
          placeholder={messages.fields.preferredDestination.placeholder}
          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-ocean"
        />
        {errors.preferredDestination ? (
          <p className="text-sm text-red-600">{errors.preferredDestination}</p>
        ) : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-ink">
          {messages.fields.serviceInterestedIn.label}
        </span>
        <input
          type="text"
          value={values.serviceInterestedIn}
          onChange={(event) => handleChange("serviceInterestedIn", event.target.value)}
          placeholder={messages.fields.serviceInterestedIn.placeholder}
          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-ocean"
        />
        {errors.serviceInterestedIn ? (
          <p className="text-sm text-red-600">{errors.serviceInterestedIn}</p>
        ) : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-ink">{messages.fields.travelDate.label}</span>
        <input
          type="date"
          value={values.travelDate}
          onChange={(event) => handleChange("travelDate", event.target.value)}
          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-ocean"
        />
        {errors.travelDate ? <p className="text-sm text-red-600">{errors.travelDate}</p> : null}
      </label>

      <label className="space-y-2 md:col-span-2">
        <span className="text-sm font-medium text-ink">
          {messages.fields.numberOfTravelers.label}
        </span>
        <input
          type="text"
          value={values.numberOfTravelers}
          onChange={(event) => handleChange("numberOfTravelers", event.target.value)}
          placeholder={messages.fields.numberOfTravelers.placeholder}
          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-ocean"
        />
        {errors.numberOfTravelers ? (
          <p className="text-sm text-red-600">{errors.numberOfTravelers}</p>
        ) : null}
      </label>

      <label className="space-y-2 md:col-span-2">
        <span className="text-sm font-medium text-ink">{messages.fields.message.label}</span>
        <textarea
          rows={6}
          value={values.message}
          onChange={(event) => handleChange("message", event.target.value)}
          placeholder={messages.fields.message.placeholder}
          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-ocean"
        />
        {errors.message ? <p className="text-sm text-red-600">{errors.message}</p> : null}
      </label>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-ocean/20 hover:bg-ocean/90 disabled:cursor-not-allowed disabled:bg-ocean/70"
        >
          {isSubmitting ? messages.submittingButton : messages.submitButton}
        </button>
      </div>
    </form>
  );
}
