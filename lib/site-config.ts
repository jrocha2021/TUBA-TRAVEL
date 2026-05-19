export const siteConfig = {
  whatsappNumber: "Official TubaTour business contact is handled through secure platform support channels",
  whatsappPlanUrl:
    "https://wa.me/?text=Hello%20TubaTour%2C%20I%20want%20to%20plan%20a%20Cape%20Verde%20experience.%20My%20travel%20date%20is%3A",
  whatsappFloatingUrl:
    "https://wa.me/?text=Hello%20TubaTour%2C%20I%20want%20to%20plan%20a%20Cape%20Verde%20experience.",
  email: "hello@tubatravel.com"
} as const;

export function createTravelerWhatsAppUrl(serviceName: string) {
  const message = `Hi TubaTour, I would like to book ${serviceName} in Cape Verde. Please send me availability, price, and details.`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function createPartnerWhatsAppUrl(partnerType: string) {
  const message = `Hi TubaTour, I would like to join as a partner. I provide ${partnerType} services in Cape Verde.`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
