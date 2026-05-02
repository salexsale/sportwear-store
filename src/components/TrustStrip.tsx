"use client";

import { MessageCircle, Truck, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { HOME_CONTENT } from "@/data/home-content";

const ICONS = [Truck, MessageCircle, Wallet] as const;

export default function TrustStrip() {
  const { lang } = useLanguage();
  const items = HOME_CONTENT[lang].trust;

  return (
    <section
      className="border-y border-[#166534]/15 bg-[#eef2eb]"
      aria-label={lang === "es" ? "Ventajas del servicio" : "Service highlights"}
    >
      <div className="mx-auto grid max-w-[1320px] gap-8 px-4 py-10 md:grid-cols-3 md:gap-6 md:px-8 lg:px-10 lg:py-12">
        {items.map((item, i) => {
          const Icon = ICONS[i] ?? Truck;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex gap-4 rounded-sm border border-[#166534]/10 bg-white/80 p-5 shadow-sm backdrop-blur-sm md:flex-col md:text-center md:items-center"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#0f172a] text-[#facc15] md:h-14 md:w-14">
                <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-[13px] font-black uppercase tracking-[0.12em] text-[#0f172a] md:text-sm">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#5c6b63] md:text-sm">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
