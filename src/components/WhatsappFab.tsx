"use client";

import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { openWhatsApp } from "@/lib/whatsapp";

const MSG = {
  es: "Hola, vengo desde la web de FutbolParaTodos.",
  en: "Hi, I'm messaging from the FutbolParaTodos website.",
};

export default function WhatsappFab() {
  const { lang } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => openWhatsApp(MSG[lang])}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#25D366] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-black/[0.06] hover:scale-105 transition-transform md:bottom-8 md:right-8"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-7 h-7" strokeWidth={1.5} />
    </button>
  );
}
