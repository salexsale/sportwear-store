"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { openWhatsApp } from "@/lib/whatsapp";

const CONTENT = {
  es: {
    label: "Atención al cliente",
    title: "¿Dudas con tu talla o envío?",
    subtitle:
      "Escríbenos por WhatsApp. Te respondemos con el catálogo y los siguientes pasos.",
    cta: "Abrir WhatsApp",
    msg:
      "Hola, vengo desde FutbolParaTodos. Me gustaría ayuda con un pedido o una camiseta.",
  },
  en: {
    label: "Customer care",
    title: "Questions about fit or shipping?",
    subtitle:
      "Message us on WhatsApp. We’ll reply with catalog details and next steps.",
    cta: "Open WhatsApp",
    msg:
      "Hi, I'm messaging from FutbolParaTodos. I'd like help with an order or a jersey.",
  },
};

export default function Contact() {
  const { lang } = useLanguage();
  const t = CONTENT[lang];

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#f5f5f7] text-[#1d1d1f]">
      <div className="max-w-[980px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="rounded-[28px] bg-white border border-black/[0.06] shadow-[0_12px_40px_-20px_rgba(0,0,0,0.12)] p-8 md:p-12 md:flex md:items-center md:justify-between md:gap-10"
        >
          <div className="max-w-lg">
            <p className="text-[12px] font-medium text-[#f56300] mb-2">{t.label}</p>
            <h2 className="text-[1.75rem] md:text-[2rem] font-semibold tracking-tight leading-tight">
              {t.title}
            </h2>
            <p className="mt-3 text-[15px] md:text-[17px] text-[#6e6e73] leading-relaxed">{t.subtitle}</p>
          </div>
          <motion.button
            type="button"
            onClick={() => openWhatsApp(t.msg)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 md:mt-0 shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-[15px] font-medium text-white hover:bg-[#20bd5a] transition-colors shadow-lg shadow-black/10"
          >
            <MessageCircle className="w-5 h-5" strokeWidth={1.75} />
            {t.cta}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
