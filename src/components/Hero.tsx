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
    line1: { es: "Calidad", en: "Quality" },
    line2: { es: "de estadio.", en: "match-ready." },
  },
];

const COPY = {
  es: { cta: "Ver el catálogo", kicker: "Equipación oficial · Pedidos por WhatsApp" },
  en: { cta: "View the catalog", kicker: "Official kit · Order on WhatsApp" },
};

const AUTO_MS = 7500;

const confetti = [
  { c: "#ffb340", x: "8%", y: "12%", s: 12, d: 4 },
  { c: "#ff6b9d", x: "18%", y: "22%", s: 8, d: 5 },
  { c: "#ffd60a", x: "82%", y: "18%", s: 10, d: 4.5 },
  { c: "#ff9500", x: "88%", y: "28%", s: 14, d: 5.5 },
  { c: "#ff375f", x: "72%", y: "10%", s: 6, d: 3.5 },
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
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#f5f5f7] pt-12 md:pt-[52px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative z-[2] mx-3 md:mx-6 mt-3 mb-3 min-h-[calc(100svh-3.25rem-1.5rem)] rounded-[28px] md:rounded-[32px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]">
        {/* Formas animadas sobre la imagen — visibles y ligeras */}
        <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
          {confetti.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full opacity-[0.5]"
              style={{
                left: p.x,
                top: p.y,
                width: p.s,
                height: p.s,
                background: p.c,
              }}
              animate={{ y: [0, -14, 0], rotate: [0, 180, 360], scale: [1, 1.08, 1] }}
              transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.src + index}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.04 }}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/25" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 flex min-h-[calc(100svh-3.25rem-2.5rem)] flex-col justify-end pb-10 md:pb-14 px-6 md:px-14 max-w-4xl">
          <motion.div
            key={`txt-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <p className="text-[13px] md:text-sm font-medium text-white/90 mb-3 drop-shadow-sm">
              {t.kicker}
            </p>
            <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold leading-[1.05] tracking-tight text-white drop-shadow-md">
              <span className="bg-gradient-to-r from-[#ffb340] via-[#ff8cc8] to-[#ffd60a] bg-clip-text text-transparent">
                {slide.line1[lang]}
              </span>{" "}
              <span className="text-white">{slide.line2[lang]}</span>
            </h1>
            <motion.a
              href="#products"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex mt-8 items-center justify-center rounded-full bg-white text-[#1d1d1f] px-8 py-3 text-[15px] font-medium shadow-lg shadow-black/20 hover:bg-white/95 transition-colors"
            >
              {t.cta}
            </motion.a>
          </motion.div>
        </div>

        <button
          type="button"
          aria-label="Anterior"
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition-colors"
          onClick={() => go(-1)}
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition-colors"
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
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
