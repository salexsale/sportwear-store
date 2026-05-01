import { getWhatsAppPhoneDigits } from "./site-config";

export function buildWhatsAppUrl(message: string): string {
  const phone = getWhatsAppPhoneDigits();
  const text = encodeURIComponent(message.trim());
  return `https://wa.me/${phone}?text=${text}`;
}

export function openWhatsApp(message: string): void {
  if (typeof window === "undefined") return;
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}
