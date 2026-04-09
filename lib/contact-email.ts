import type { ContactFormValues } from "@/lib/contact-form";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function createContactEmail(values: ContactFormValues) {
  const entries: Array<[string, string]> = [
    ["Full Name", values.fullName],
    ["Email", values.email],
    ["WhatsApp Number", values.whatsappNumber],
    ["Preferred Destination", values.preferredDestination],
    ["Service Interested In", values.serviceInterestedIn],
    ["Travel Date", values.travelDate],
    ["Number of Travelers", values.numberOfTravelers],
    ["Message", values.message]
  ];

  const text = entries.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #102a43;">
      <h2 style="margin-bottom: 16px;">New Tuba Travel inquiry</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tbody>
          ${entries
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: 600; width: 220px;">
                    ${escapeHtml(label)}
                  </td>
                  <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">
                    ${escapeHtml(value)}
                  </td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  return {
    subject: `New inquiry from ${values.fullName}`,
    text,
    html
  };
}
