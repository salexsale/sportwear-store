"use client";

import { motion } from "framer-motion";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { openWhatsApp } from "@/lib/whatsapp";
import { SITE_EMAIL, SITE_INSTAGRAM_URL, SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from "@/lib/site-config";

const CONTENT = {
  es: {
    label: "Contacto",
    title: "¿Talla, envío o disponibilidad?",
    subtitle:
      "Escríbenos o llama: te guiamos con el catálogo y el pedido.",
    cta: "WhatsApp",
    msg:
      "Hola, vengo desde la web. Necesito ayuda con una camiseta o un pedido.",
  },
  en: {
    label: "Contact",
    title: "Size, shipping, or stock?",
    subtitle: "Message or call — we’ll help with the catalog and your order.",
    cta: "WhatsApp",
    msg:
      "Hi, I'm messaging from the website. I need help with a jersey or an order.",
  },
};

export default function Contact() {
  const { lang } = useLanguage();
  const t = CONTENT[lang];
  const telHref = `tel:${SITE_PHONE_E164.replace(/\s/g, "")}`;

  return (
    <section id="contact" className="py-16 md:py-24 text-[#0f172a] px-4 md:px-6">
      <div className="max-w-[980px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-tl-xl rounded-tr-3xl rounded-br-xl rounded-bl-3xl bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] ring-2 ring-[#166534]/20"
        >
          <div className="h-2 w-full flex overflow-hidden">
            <div className="h-full flex-1 bg-[#0f172a]" />
            <div className="h-full flex-1 bg-[#166534]" />
            <div className="h-full flex-1 bg-[#facc15]" />
            <div className="h-full flex-1 bg-[#166534]" />
            <div className="h-full flex-1 bg-[#0f172a]" />
          </div>
          <div className="p-8 md:p-12 bg-gradient-to-br from-[#f0f3ef] to-white">
            <div className="md:flex md:items-start md:justify-between md:gap-12">
              <div className="max-w-xl">
                <p className="text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-[#166534] mb-3">
                  {t.label}
                </p>
                <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.35rem] font-black uppercase tracking-tight leading-tight">
                  {t.title}
                </h2>
                <p className="mt-4 text-[16px] md:text-lg text-[#5c6b63] leading-relaxed font-medium">
                  {t.subtitle}
                </p>
                <div className="mt-8 flex flex-col gap-3 text-[16px] md:text-[17px]">
                  <a
                    href={SITE_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-bold text-[#0f172a] hover:text-[#166534] transition-colors"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#166534]/15 text-[#166534]">
                      <Instagram className="w-5 h-5" strokeWidth={2} />
                    </span>
                    Instagram · @fpt.store
                  </a>
                  <a
                    href={telHref}
                    className="inline-flex items-center gap-3 font-bold text-[#0f172a] hover:text-[#166534] transition-colors"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#166534]/15 text-[#166534]">
                      <Phone className="w-5 h-5" strokeWidth={2} />
                    </span>
                    {SITE_PHONE_DISPLAY}
                  </a>
                  <a
                    href={`mailto:${SITE_EMAIL}`}
                    className="inline-flex items-center gap-3 font-semibold text-[#0f172a] hover:text-[#166534] transition-colors break-all"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#166534]/15 text-[#166534]">
                      <Mail className="w-5 h-5" strokeWidth={2} />
                    </span>
                    {SITE_EMAIL}
                  </a>
                </div>
              </div>
              <motion.button
                type="button"
                onClick={() => openWhatsApp(t.msg)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-10 md:mt-0 shrink-0 inline-flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-10 py-4 md:py-5 text-sm md:text-[15px] font-black uppercase tracking-[0.12em] text-white hover:bg-[#20bd5a] transition-colors shadow-xl ring-2 ring-[#0f172a]/10 w-full md:w-auto"
              >
                <MessageCircle className="w-6 h-6" strokeWidth={2} />
                {t.cta}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
