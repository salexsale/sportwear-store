"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { openWhatsApp } from "@/lib/whatsapp";

const CONTENT = {
  es: {
    label: "Pedidos",
    title: "Hablemos por WhatsApp.",
    subtitle:
      "Catálogo y asesoramiento personalizado. Escríbenos y cerramos talla, envío y forma de pago.",
    cta: "Abrir chat en WhatsApp",
    hint: "Pulsa y se abrirá WhatsApp con un mensaje de ejemplo; cámbialo o amplía lo que necesites.",
    msg:
      "Hola, vengo desde FutbolParaTodos. Me interesa información sobre camisetas / pedidos.",
  },
  en: {
    label: "Orders",
    title: "Message us on WhatsApp.",
    subtitle:
      "Catalog and personal advice. Write to us and we’ll confirm size, shipping, and payment.",
    cta: "Open WhatsApp chat",
    hint: "Opens WhatsApp with a sample message you can edit before sending.",
    msg:
      "Hi, I'm contacting you from FutbolParaTodos. I'd like information about jerseys / ordering.",
  },
};

export default function Contact() {
  const { lang } = useLanguage();
  const t = CONTENT[lang];

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0a0a0a] text-white overflow-hidden relative">
      <div
        className="pointer-events-none absolute top-0 right-0 w-[min(520px,90vw)] h-[520px] opacity-[0.07]"
        style={{
          background: "radial-gradient(circle at 70% 30%, #C9A227, transparent 62%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C9A227] mb-4">
            {t.label}
          </p>
          <h2 className="text-[clamp(2.25rem,6vw,3.75rem)] font-semibold leading-[1.08] tracking-tight">
            {t.title}
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/55 leading-relaxed">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-12 md:mt-14 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <button
            type="button"
            onClick={() => openWhatsApp(t.msg)}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors rounded-sm"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={2} />
            {t.cta}
          </button>
          <p className="text-sm text-white/40 max-w-md">{t.hint}</p>
        </motion.div>
      </div>
    </section>
  );
}
