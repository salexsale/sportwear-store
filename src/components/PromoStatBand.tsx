"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { HOME_CONTENT } from "@/data/home-content";

export default function PromoStatBand() {
  const { lang } = useLanguage();
  const { headline, sub } = HOME_CONTENT[lang].promo;

  return (
    <section className="relative overflow-hidden bg-[#0a1424] py-12 md:py-14">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[880px] px-4 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-serif text-2xl font-bold uppercase leading-tight tracking-tight text-white md:text-3xl lg:text-[2rem]">
            {headline}
          </p>
          <span className="mx-auto mt-5 block h-1 w-24 rounded-full bg-[#facc15]" aria-hidden />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">{sub}</p>
        </motion.div>
      </div>
    </section>
  );
}
