/**
 * Datos de contacto (también visibles en footer y sección contacto).
 * WhatsApp: solo dígitos internacionales sin + ni espacios.
 * Configura en .env: NEXT_PUBLIC_WHATSAPP_PHONE=34653125809
 */
export const SITE_PHONE_DISPLAY = "+34 653 12 58 09";
export const SITE_PHONE_E164 = "+34653125809";
export const SITE_EMAIL = "fastresalex@gmail.com";

export function getWhatsAppPhoneDigits(): string {
  const raw =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_WHATSAPP_PHONE
      : undefined;
  if (!raw || !raw.replace(/\D/g, "").length) {
    return "34653125809";
  }
  return raw.replace(/\D/g, "");
}
