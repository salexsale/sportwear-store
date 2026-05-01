"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { openWhatsApp } from "@/lib/whatsapp";

const CONTENT = {
  es: {
    label: "Antes del partido",
    title: "¿Talla, envío o disponibilidad?",
    subtitle:
      "Escríbenos por WhatsApp: te guiamos con el catálogo y cerramos el pedido contigo.",
    cta: "Escribir por WhatsApp",
    msg:
      "Hola, vengo desde FutbolParaTodos. Necesito ayuda con una camiseta o un pedido.",
  },
  en: {
    label: "Pre-match",
    title: "Size, shipping, or stock?",
    subtitle:
      "Message us on WhatsApp — we’ll walk you through the catalog and your order.",
    cta: "Chat on WhatsApp",
    msg:
      "Hi, I'm messaging from FutbolParaTodos. I need help with a jersey or an order.",
  },
};

export default function Contact() {
  const { lang } = useLanguage();
  const t = CONTENT[lang];

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#f0f3ef] text-[#0f172a]">
      <div className="max-w-[980px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="rounded-[24px] bg-white border border-[#166534]/12 shadow-[0_16px_48px_-20px_rgba(15,23,42,0.2)] p-8 md:p-12 md:flex md:items-center md:justify-between md:gap-10 overflow-hidden relative"
        >
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#166534]/10"
            aria-hidden
          />
          <div className="max-w-lg relative">
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#166534] mb-2">
              {t.label}
            </p>
            <h2 className="text-[1.75rem] md:text-[2rem] font-bold tracking-tight leading-tight">
              {t.title}
            </h2>
            <p className="mt-3 text-[15px] md:text-[17px] text-[#5c6b63] leading-relaxed">{t.subtitle}</p>
          </div>
          <motion.button
            type="button"
            onClick={() => openWhatsApp(t.msg)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 md:mt-0 shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#14532d]/15"
          >
            <MessageCircle className="w-5 h-5" strokeWidth={1.75} />
            {t.cta}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
