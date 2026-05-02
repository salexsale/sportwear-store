"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { HOME_CONTENT } from "@/data/home-content";

export default function AboutTeaser() {
  const { lang } = useLanguage();
  const { label, title, body, cta } = HOME_CONTENT[lang].about;

  return (
    <section className="bg-[#1e293b] py-14 text-white md:py-20" aria-labelledby="about-teaser-title">
      <div className="mx-auto max-w-[720px] px-4 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#facc15]">{label}</p>
          <h2 id="about-teaser-title" className="mt-3 font-serif text-3xl font-bold uppercase tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-white/80 md:text-lg">{body}</p>
          <a
            href="#contact"
            className="mt-10 inline-flex min-w-[200px] items-center justify-center rounded-sm bg-[#facc15] px-10 py-3.5 text-sm font-black uppercase tracking-wide text-[#0f172a] shadow-lg transition hover:bg-[#fde047]"
          >
            {cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
