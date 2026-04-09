export type ContactFormValues = {
  fullName: string;
  email: string;
  whatsappNumber: string;
  preferredDestination: string;
  serviceInterestedIn: string;
  travelDate: string;
  numberOfTravelers: string;
  message: string;
};

export type ContactFormValidationMessages = {
  required: string;
  invalidEmail: string;
  invalidWhatsappNumber: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const initialContactFormValues: ContactFormValues = {
  fullName: "",
  email: "",
  whatsappNumber: "",
  preferredDestination: "",
  serviceInterestedIn: "",
  travelDate: "",
  numberOfTravelers: "",
  message: ""
};

export function buildContactInquiryPayload(values: ContactFormValues) {
  return {
    submittedAt: new Date().toISOString(),
    source: "tuba-travel-contact-form",
    values
  };
}

export function validateContactForm(
  values: ContactFormValues,
  messages: ContactFormValidationMessages
) {
  const errors: ContactFormErrors = {};

  (Object.keys(values) as Array<keyof ContactFormValues>).forEach((key) => {
    if (!values[key].trim()) {
      errors[key] = messages.required;
    }
  });

  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = messages.invalidEmail;
  }

  const whatsappValue = values.whatsappNumber.trim();
  if (whatsappValue) {
    const hasOnlyAllowedCharacters = /^[\d\s()+-]+$/.test(whatsappValue);
    const digitCount = whatsappValue.replace(/\D/g, "").length;

    if (!hasOnlyAllowedCharacters || digitCount < 6) {
      errors.whatsappNumber = messages.invalidWhatsappNumber;
    }
  }

  return errors;
}
