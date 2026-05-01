"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Slide =
  | { kind: "image"; src: string; alt: string; line1: { es: string; en: string }; line2: { es: string; en: string } }
  | { kind: "video"; src: string; alt: string; line1: { es: string; en: string }; line2: { es: string; en: string } };

/** Añade `kind: "video"` y `src: "/tu-video.mp4"` en /public cuando quieras. */
const SLIDES: Slide[] = [
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1920&q=80",
    alt: "Fútbol",
    line1: { es: "Fútbol", en: "Football" },
    line2: { es: "para todos.", en: "for everyone." },
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&q=80",
    alt: "Camiseta",
    line1: { es: "Viste", en: "Wear" },
    line2: { es: "tu pasión.", en: "your passion." },
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80",
    alt: "Estadio",
    line1: { es: "Colección", en: "Collection" },
    line2: { es: "24/25.", en: "24/25." },
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1920&q=80",
    alt: "Campo",
    line1: { es: "Listos", en: "Match" },
    line2: { es: "para el partido.", en: "day ready." },
  },
];

const COPY = {
  es: { cta: "Ver camisetas", kicker: "Equipación y colecciones · Pide por WhatsApp" },
  en: { cta: "See jerseys", kicker: "Kit & collections · Order on WhatsApp" },
};

const AUTO_MS = 7500;

/** Destellos suaves estadio / energía deportiva (sin look “gadget”) */
const sparkles = [
  { c: "rgba(34,197,94,0.55)", x: "10%", y: "14%", s: 14, d: 5 },
  { c: "rgba(202,138,4,0.5)", x: "22%", y: "20%", s: 10, d: 4.2 },
  { c: "rgba(255,255,255,0.35)", x: "78%", y: "16%", s: 12, d: 4.8 },
  { c: "rgba(22,101,52,0.45)", x: "86%", y: "26%", s: 9, d: 5.2 },
  { c: "rgba(234,179,8,0.4)", x: "70%", y: "12%", s: 7, d: 3.8 },
];

export default function Hero() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const len = SLIDES.length;
  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + len) % len);
    },
    [len]
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, go]);

  const slide = SLIDES[index];

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#f0f3ef] pt-[52px] md:pt-[58px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative z-[2] mx-3 md:mx-6 mt-3 mb-3 min-h-[calc(100svh-4.25rem)] md:min-h-[calc(100svh-4.75rem)] rounded-[24px] md:rounded-[28px] overflow-hidden shadow-[0_24px_50px_-18px_rgba(15,23,42,0.35)] ring-1 ring-[#166534]/15">
        <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
          {sparkles.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full blur-[0.5px]"
              style={{
                left: p.x,
                top: p.y,
                width: p.s,
                height: p.s,
                background: p.c,
              }}
              animate={{ y: [0, -12, 0], opacity: [0.35, 0.65, 0.35], scale: [1, 1.12, 1] }}
              transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.src + index}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {slide.kind === "image" ? (
              <img
                src={slide.src}
                alt={slide.alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={slide.src}
                autoPlay
                muted
                playsInline
                loop
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/25 to-[#14532d]/20" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 flex min-h-[calc(100svh-8.5rem)] md:min-h-[calc(100svh-9rem)] flex-col justify-end pb-10 md:pb-14 px-6 md:px-14 max-w-4xl">
          <motion.div
            key={`txt-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <p className="text-[11px] md:text-xs font-bold tracking-[0.14em] text-white/90 mb-3 drop-shadow-md uppercase">
              {t.kicker}
            </p>
            <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.06] tracking-tight text-white drop-shadow-lg">
              <span className="bg-gradient-to-r from-[#4ade80] via-[#facc15] to-[#fef08a] bg-clip-text text-transparent">
                {slide.line1[lang]}
              </span>{" "}
              <span className="text-white font-semibold">{slide.line2[lang]}</span>
            </h1>
            <motion.a
              href="#products"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex mt-8 items-center justify-center rounded-full bg-[#166534] text-white px-8 py-3.5 text-[15px] font-semibold shadow-lg shadow-[#14532d]/40 hover:bg-[#14532d] transition-colors ring-2 ring-white/20"
            >
              {t.cta}
            </motion.a>
          </motion.div>
        </div>

        <button
          type="button"
          aria-label="Anterior"
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md ring-1 ring-white/25 hover:bg-white/25 transition-colors"
          onClick={() => go(-1)}
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md ring-1 ring-white/25 hover:bg-white/25 transition-colors"
          onClick={() => go(1)}
        >
          <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
        </button>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-[#4ade80]" : "w-1.5 bg-white/45 hover:bg-white/65"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
