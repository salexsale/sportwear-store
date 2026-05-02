"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { HOME_CONTENT } from "@/data/home-content";

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#facc15]" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-[13px] leading-none">
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { lang } = useLanguage();
  const meta = HOME_CONTENT[lang].testimonialsSection;
  const items = HOME_CONTENT[lang].testimonials;

  return (
    <section
      id="testimonials"
      className="relative border-y border-[#166534]/12 bg-gradient-to-b from-[#f6f8f4] to-[#eef2eb] py-14 md:py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#facc15]/40 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-[1320px] px-4 md:px-8 lg:px-10">
        <motion.div
          className="mb-10 max-w-2xl md:mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2
            id="testimonials-heading"
            className="text-2xl font-black uppercase tracking-tight text-[#0f172a] md:text-3xl"
          >
            {meta.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5c6b63] md:text-base">{meta.subtitle}</p>
        </motion.div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((item, i) => (
            <motion.li
              key={`${item.author}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-24px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex h-full flex-col rounded-lg border border-[#166534]/15 bg-white/90 p-5 shadow-sm ring-1 ring-black/[0.03] backdrop-blur-sm"
            >
              <Stars />
              <blockquote className="mt-3 flex-1 border-l-2 border-[#facc15]/80 pl-3 text-[14px] leading-relaxed text-[#0f172a] md:text-[15px]">
                {item.quote}
              </blockquote>
              <footer className="mt-5 border-t border-[#e2e8e0] pt-4">
                <p className="text-sm font-bold text-[#0f172a]">{item.author}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-[#5c6b63]">{item.place}</p>
              </footer>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
