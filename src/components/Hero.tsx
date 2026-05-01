"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Slide =
  | { kind: "image"; src: string; alt: string; line1: { es: string; en: string }; line2: { es: string; en: string } }
  | { kind: "video"; src: string; alt: string; line1: { es: string; en: string }; line2: { es: string; en: string } };

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
    line1: { es: "VISTE", en: "WEAR" },
    line2: { es: "TU PASIÓN", en: "YOUR PASSION" },
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80",
    alt: "Estadio",
    line1: { es: "TEMPORADA", en: "SEASON" },
    line2: { es: "24 / 25", en: "24 / 25" },
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1920&q=80",
    alt: "Campo",
    line1: { es: "LISTOS", en: "MATCH" },
    line2: { es: "PARA EL PARTIDO", en: "DAY READY" },
  },
];

const COPY = {
  es: {
    cta: "Ver camisetas",
    kicker: "Catálogo temporada 24/25",
  },
  en: {
    cta: "See jerseys",
    kicker: "24/25 season catalog",
  },
};

const AUTO_MS = 7500;

const sparkles = [
  { c: "rgba(74,222,128,0.5)", x: "12%", y: "18%", s: 16, d: 5 },
  { c: "rgba(250,204,21,0.45)", x: "78%", y: "22%", s: 12, d: 4.5 },
  { c: "rgba(255,255,255,0.25)", x: "88%", y: "12%", s: 10, d: 4 },
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
    <>
      <section
        id="hero"
        className="relative w-full overflow-hidden bg-[#0f172a] pt-[102px] md:pt-[110px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex flex-col lg:flex-row lg:min-h-[calc(100svh-110px)]">
          {/* Panel editorial — muy visible en desktop; en móvil va debajo de la foto */}
          <div className="order-2 lg:order-1 flex flex-col justify-end lg:justify-center lg:w-[min(44vw,520px)] xl:w-[540px] shrink-0 px-5 sm:px-8 lg:pl-[max(1.25rem,calc(50vw-600px+1rem))] lg:pr-10 py-10 lg:py-16 bg-[#0f172a] border-t-4 lg:border-t-0 lg:border-r-0 lg:border-l-4 border-[#facc15] relative">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  -18deg,
                  transparent,
                  transparent 12px,
                  rgba(255,255,255,0.12) 12px,
                  rgba(255,255,255,0.12) 13px
                )`,
              }}
              aria-hidden
            />
            <div className="relative z-10">
              <p className="text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-[#4ade80] mb-5">
                {t.kicker}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${index}-${lang}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <h1 className="text-[2.85rem] sm:text-[3.25rem] lg:text-[3.5rem] xl:text-[4rem] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white">
                    <span className="text-[#4ade80]">{slide.line1[lang]}</span>
                    <span className="block mt-1 text-white/95">{slide.line2[lang]}</span>
                  </h1>
                </motion.div>
              </AnimatePresence>
              <motion.a
                href="#products"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex mt-8 items-center justify-center uppercase text-sm sm:text-[15px] font-black tracking-[0.12em] bg-[#166534] text-white px-9 py-4 sm:py-[1.125rem] rounded-sm shadow-[0_12px_40px_-10px_rgba(22,101,52,0.7)] hover:bg-[#14532d] ring-2 ring-[#facc15]/40 transition-colors"
              >
                {t.cta}
              </motion.a>
              <div className="mt-8 hidden lg:flex gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Slide ${i + 1}`}
                    className={`h-1.5 rounded-sm transition-all duration-300 ${
                      i === index ? "w-10 bg-[#facc15]" : "w-2 bg-white/25 hover:bg-white/40"
                    }`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Imagen / video — ocupa el resto; en móvil primero */}
          <div className="order-1 lg:order-2 relative flex-1 min-h-[58svh] sm:min-h-[62svh] lg:min-h-[calc(100svh-110px)] px-3 pt-3 pb-0 lg:p-0">
            <div className="absolute inset-3 lg:inset-0 max-lg:rounded-[20px] overflow-hidden ring-1 ring-white/15 lg:ring-0 shadow-2xl lg:shadow-none">
              <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden max-lg:rounded-[20px]">
                {sparkles.map((p, i) => (
                  <motion.span
                    key={i}
                    className="absolute rounded-full blur-[1px]"
                    style={{
                      left: p.x,
                      top: p.y,
                      width: p.s,
                      height: p.s,
                      background: p.c,
                    }}
                    animate={{ y: [0, -10, 0], opacity: [0.4, 0.75, 0.4] }}
                    transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
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
                  transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
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
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/50 via-transparent to-[#0f172a]/20 lg:from-[#0f172a]/35" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-transparent lg:from-[#0f172a]/50" />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              aria-label="Anterior"
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-sm bg-black/50 text-white backdrop-blur-sm ring-1 ring-white/20 hover:bg-black/65 transition-colors"
              onClick={() => go(-1)}
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-sm bg-black/50 text-white backdrop-blur-sm ring-1 ring-white/20 hover:bg-black/65 transition-colors"
              onClick={() => go(1)}
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2} />
            </button>

            {/* Dots solo en móvil sobre la imagen */}
            <div className="lg:hidden absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1 rounded-full transition-all ${
                    i === index ? "w-6 bg-[#facc15]" : "w-1.5 bg-white/45"
                  }`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
