"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Slide =
  | { kind: "image"; src: string; alt: string; line1: { es: string; en: string }; line2: { es: string; en: string } }
  | { kind: "video"; src: string; alt: string; line1: { es: string; en: string }; line2: { es: string; en: string } };

/** Sustituye o añade entradas `kind: "video"` con tu MP4 (p. ej. `/hero.mp4` en /public). */
const SLIDES: Slide[] = [
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1920&q=80",
    alt: "Fútbol",
    line1: { es: "FÚTBOL", en: "FOOTBALL" },
    line2: { es: "PARA TODOS", en: "FOR EVERYONE" },
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&q=80",
    alt: "Camiseta",
    line1: { es: "VISTE LA", en: "WEAR THE" },
    line2: { es: "PASIÓN", en: "PASSION" },
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80",
    alt: "Estadio",
    line1: { es: "COLECCIÓN", en: "COLLECTION" },
    line2: { es: "24 / 25", en: "24 / 25" },
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1920&q=80",
    alt: "Campo",
    line1: { es: "CATÁLOGO", en: "CATALOG" },
    line2: { es: "PREMIUM", en: "PREMIUM" },
  },
];

const COPY = {
  es: { cta: "Ver catálogo", kicker: "Equipación y más — pide por WhatsApp" },
  en: { cta: "View catalog", kicker: "Kit and more — order via WhatsApp" },
};

const AUTO_MS = 7000;

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
      className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white pt-[4.25rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.src + index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
        >
          {slide.kind === "image" ? (
            <img
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full object-cover scale-105"
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex min-h-[calc(100svh-4.25rem)] flex-col justify-end pb-16 md:pb-20 px-6 md:px-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl"
        >
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.28em] text-[#C9A227] mb-4">
            {t.kicker}
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.92] tracking-tight">
            <span className="block">{slide.line1[lang]}</span>
            <span className="block text-white/95">{slide.line2[lang]}</span>
          </h1>
          <a
            href="#products"
            className="inline-flex mt-8 md:mt-10 items-center justify-center px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] bg-[#C9A227] text-black hover:bg-[#d4b82e] transition-colors rounded-sm"
          >
            {t.cta}
          </a>
        </motion.div>
      </div>

      <button
        type="button"
        aria-label="Anterior"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        onClick={() => go(-1)}
      >
        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.25} />
      </button>
      <button
        type="button"
        aria-label="Siguiente"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        onClick={() => go(1)}
      >
        <ChevronRight className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.25} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-[#C9A227]" : "w-2 bg-white/35 hover:bg-white/55"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
