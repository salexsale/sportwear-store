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
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-sm bg-[#25D366] text-white shadow-[0_12px_40px_-8px_rgba(20,185,92,0.65)] ring-4 ring-[#facc15]/90 hover:brightness-110 hover:scale-105 transition-all md:bottom-8 md:right-8"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-7 h-7" strokeWidth={2} />
    </button>
  );
}
