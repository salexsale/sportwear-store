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
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#166534] text-white shadow-[0_10px_30px_-8px_rgba(22,101,52,0.55)] ring-2 ring-white/90 hover:bg-[#14532d] hover:scale-105 transition-all md:bottom-8 md:right-8"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-7 h-7" strokeWidth={1.5} />
    </button>
  );
}
