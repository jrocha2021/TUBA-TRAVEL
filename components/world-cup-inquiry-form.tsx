"use client";

import { useState } from "react";

type WorldCupInquiryFormValues = {
  fullName: string;
  contact: string;
  travelDates: string;
  islands: string;
  travelers: string;
  serviceNeeded: string;
  message: string;
};

const initialValues: WorldCupInquiryFormValues = {
  fullName: "",
  contact: "",
  travelDates: "",
  islands: "",
  travelers: "",
  serviceNeeded: "",
  message: ""
};

export default function WorldCupInquiryForm() {
  const [values, setValues] = useState<WorldCupInquiryFormValues>(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof WorldCupInquiryFormValues, string>>>(
    {}
  );

  const fieldClassName =
    "w-full rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-3 text-sm text-white outline-none transition placeholder:text-brand-muted-soft focus:border-brand-turquoise focus:bg-white/[0.12] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]";

  function handleChange(field: keyof WorldCupInquiryFormValues, value: string) {
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof WorldCupInquiryFormValues, string>> = {};

    if (!values.fullName.trim()) nextErrors.fullName = "Please enter your full name.";
    if (!values.contact.trim()) nextErrors.contact = "Please enter your WhatsApp or email.";
    if (!values.travelDates.trim()) nextErrors.travelDates = "Please enter your travel dates.";
    if (!values.islands.trim()) nextErrors.islands = "Please tell us which island or islands interest you.";
    if (!values.travelers.trim()) nextErrors.travelers = "Please share the number of travelers.";
    if (!values.serviceNeeded.trim()) nextErrors.serviceNeeded = "Please select the service you need.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitted(true);
    setValues(initialValues);
  }

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-6 backdrop-blur-xl sm:p-8">
        <h3 className="text-2xl font-semibold tracking-tight text-white">
          Thank you. TubaTour received your request.
        </h3>
        <p className="mt-3 max-w-2xl text-base leading-7 text-brand-muted">
          We will contact you shortly by WhatsApp or email.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="brand-primary-button mt-6"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 md:grid-cols-2">
      <label className="space-y-2">
        <span className="text-sm font-medium text-white">Full name</span>
        <input
          value={values.fullName}
          onChange={(event) => handleChange("fullName", event.target.value)}
          placeholder="Your full name"
          className={fieldClassName}
        />
        {errors.fullName ? <p className="text-sm text-brand-gold">{errors.fullName}</p> : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-white">WhatsApp or email</span>
        <input
          value={values.contact}
          onChange={(event) => handleChange("contact", event.target.value)}
          placeholder="WhatsApp or email"
          className={fieldClassName}
        />
        {errors.contact ? <p className="text-sm text-brand-gold">{errors.contact}</p> : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-white">Travel dates</span>
        <input
          value={values.travelDates}
          onChange={(event) => handleChange("travelDates", event.target.value)}
          placeholder="Arrival and departure dates"
          className={fieldClassName}
        />
        {errors.travelDates ? <p className="text-sm text-brand-gold">{errors.travelDates}</p> : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-white">Island or islands</span>
        <input
          value={values.islands}
          onChange={(event) => handleChange("islands", event.target.value)}
          placeholder="Santiago, Sal, Santo Antão..."
          className={fieldClassName}
        />
        {errors.islands ? <p className="text-sm text-brand-gold">{errors.islands}</p> : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-white">Number of travelers</span>
        <input
          value={values.travelers}
          onChange={(event) => handleChange("travelers", event.target.value)}
          placeholder="How many travelers?"
          className={fieldClassName}
        />
        {errors.travelers ? <p className="text-sm text-brand-gold">{errors.travelers}</p> : null}
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-white">Service needed</span>
        <select
          value={values.serviceNeeded}
          onChange={(event) => handleChange("serviceNeeded", event.target.value)}
          className={fieldClassName}
        >
          <option value="">Choose a service</option>
          <option value="Airport Transfers">Airport Transfers</option>
          <option value="Private Tours">Private Tours</option>
          <option value="Island Experiences">Island Experiences</option>
          <option value="Trip Concierge">Trip Concierge</option>
          <option value="Island Hopping Support">Island Hopping Support</option>
        </select>
        {errors.serviceNeeded ? (
          <p className="text-sm text-brand-gold">{errors.serviceNeeded}</p>
        ) : null}
      </label>

      <label className="space-y-2 md:col-span-2">
        <span className="text-sm font-medium text-white">Message</span>
        <textarea
          rows={6}
          value={values.message}
          onChange={(event) => handleChange("message", event.target.value)}
          placeholder="Tell us more about your trip plans, preferred islands, or services."
          className={fieldClassName}
        />
      </label>

      <div className="md:col-span-2">
        <button type="submit" className="brand-primary-button">
          Submit booking request
        </button>
      </div>
    </form>
  );
}
