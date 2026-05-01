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
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-[0.12em] shadow-lg shadow-black/25 hover:bg-[#20bd5a] transition-colors border border-white/10"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={2} />
      WhatsApp
    </button>
  );
}
