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
      <div className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-6 backdrop-blur-xl sm:p-8">
        <h3 className="text-2xl font-semibold tracking-tight text-white">
          {messages.successTitle}
        </h3>
        <p className="mt-3 max-w-2xl text-base leading-7 text-brand-muted">
          {messages.successDescription}
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="brand-primary-button mt-6"
        >
          {messages.resetButton}
        </button>
      </div>
    );
  }

  const fieldClassName =
    "w-full rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-3 text-sm text-white outline-none transition placeholder:text-brand-muted-soft focus:border-brand-turquoise focus:bg-white/[0.12] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]";

  function renderTextField(
    field: keyof ContactFormValues,
    type: "text" | "email" | "date" = "text"
  ) {
    const config = messages.fields[field];
    const options = config.options;

    if (options?.length) {
      return (
        <select
          value={values[field]}
          onChange={(event) => handleChange(field, event.target.value)}
          className={fieldClassName}
        >
          <option value="">{config.placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-brand-panel text-white">
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        value={values[field]}
        onChange={(event) => handleChange(field, event.target.value)}
        placeholder={config.placeholder}
        className={fieldClassName}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 md:grid-cols-2">
      {submitError ? (
        <div className="md:col-span-2 rounded-2xl border border-brand-gold/30 bg-brand-gold/10 px-4 py-3 text-sm text-white">
          {submitError}
        </div>
      ) : null}

      <label className="space-y-2">
        <span className="text-sm font-medium text-white">{messages.fields.fullName.label}</span>
        {renderTextField("fullName")}
        {errors.fullName ? <p className="text-sm text-brand-gold">{errors.fullName}</p> : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-white">{messages.fields.email.label}</span>
        {renderTextField("email", "email")}
        {errors.email ? <p className="text-sm text-brand-gold">{errors.email}</p> : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-white">
          {messages.fields.whatsappNumber.label}
        </span>
        {renderTextField("whatsappNumber")}
        {errors.whatsappNumber ? (
          <p className="text-sm text-brand-gold">{errors.whatsappNumber}</p>
        ) : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-white">
          {messages.fields.preferredDestination.label}
        </span>
        {renderTextField("preferredDestination")}
        {errors.preferredDestination ? (
          <p className="text-sm text-brand-gold">{errors.preferredDestination}</p>
        ) : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-white">
          {messages.fields.serviceInterestedIn.label}
        </span>
        {renderTextField("serviceInterestedIn")}
        {errors.serviceInterestedIn ? (
          <p className="text-sm text-brand-gold">{errors.serviceInterestedIn}</p>
        ) : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-white">{messages.fields.travelDate.label}</span>
        {renderTextField("travelDate", "date")}
        {errors.travelDate ? <p className="text-sm text-brand-gold">{errors.travelDate}</p> : null}
      </label>

      <label className="space-y-2 md:col-span-2">
        <span className="text-sm font-medium text-white">
          {messages.fields.numberOfTravelers.label}
        </span>
        {renderTextField("numberOfTravelers")}
        {errors.numberOfTravelers ? (
          <p className="text-sm text-brand-gold">{errors.numberOfTravelers}</p>
        ) : null}
      </label>

      <label className="space-y-2 md:col-span-2">
        <span className="text-sm font-medium text-white">{messages.fields.message.label}</span>
        <textarea
          rows={6}
          value={values.message}
          onChange={(event) => handleChange("message", event.target.value)}
          placeholder={messages.fields.message.placeholder}
          className={fieldClassName}
        />
        {errors.message ? <p className="text-sm text-brand-gold">{errors.message}</p> : null}
      </label>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="brand-primary-button disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? messages.submittingButton : messages.submitButton}
        </button>
      </div>
    </form>
  );
}
