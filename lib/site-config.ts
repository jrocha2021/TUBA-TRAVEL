const officialWhatsAppNumber = "2385832597";
const defaultWhatsAppMessage =
  "Hello TubaTour, I want to plan a Cape Verde trip. My dates are: ____. Island: ____. Number of travelers: ____.";

export const siteConfig = {
  whatsappNumber: "Official TubaTour business contact is handled through secure platform support channels",
  whatsappPlanUrl: `https://wa.me/${officialWhatsAppNumber}?text=${encodeURIComponent(
    defaultWhatsAppMessage
  )}`,
  whatsappFloatingUrl: `https://wa.me/${officialWhatsAppNumber}?text=${encodeURIComponent(
    defaultWhatsAppMessage
  )}`,
  email: "hello@tubatravel.com"
} as const;

export function createTripPlanningWhatsAppUrl(customMessage?: string) {
  return `https://wa.me/${officialWhatsAppNumber}?text=${encodeURIComponent(
    customMessage ?? defaultWhatsAppMessage
  )}`;
}

export function createTravelerWhatsAppUrl(serviceName: string) {
  const message = `Hi TubaTour, I would like to book ${serviceName} in Cape Verde. Please send me availability, price, and details.`;
  return `https://wa.me/${officialWhatsAppNumber}?text=${encodeURIComponent(message)}`;
}

export function createPartnerWhatsAppUrl(partnerType: string) {
  const message = `Hi TubaTour, I would like to join as a partner. I provide ${partnerType} services in Cape Verde.`;
  return `https://wa.me/${officialWhatsAppNumber}?text=${encodeURIComponent(message)}`;
}
