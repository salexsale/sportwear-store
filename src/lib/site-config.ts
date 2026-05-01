/**
 * Número de WhatsApp en formato internacional sin + ni espacios (ej: 34612345678).
 * Configura en .env: NEXT_PUBLIC_WHATSAPP_PHONE=34612345678
 */
export function getWhatsAppPhoneDigits(): string {
  const raw =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_WHATSAPP_PHONE
      : undefined;
  if (!raw || !raw.replace(/\D/g, "").length) {
    return "34600000000";
  }
  return raw.replace(/\D/g, "");
}
