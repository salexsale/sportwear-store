"use client";

/** Carrusel de fondos: rutas/URLs en `src/data/hero-slides.ts`. */
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ShippingMarquee from "@/components/ShippingMarquee";
import { HERO_SLIDES } from "@/data/hero-slides";

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

  const len = HERO_SLIDES.length;
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

  const slide = HERO_SLIDES[index];

  return (
    <>
      <section
        id="hero"
        className="relative w-full overflow-hidden bg-[#0f172a] pt-[72px] md:pt-[78px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex flex-col lg:flex-row lg:min-h-[calc(100svh-78px)]">
          <div className="order-2 lg:order-1 flex flex-col justify-end lg:justify-center lg:w-[min(44vw,520px)] xl:w-[540px] shrink-0 px-5 sm:px-8 lg:pl-[max(1.25rem,calc(50vw-600px+1rem))] lg:pr-10 py-8 lg:py-14 bg-[#0f172a] border-t-4 lg:border-t-0 lg:border-r-0 lg:border-l-4 border-[#facc15] relative">
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
              <p className="text-[11px] sm:text-xs font-black uppercase tracking-[0.18em] text-[#4ade80] mb-4">
                {t.kicker}
              </p>
              <div className="mb-2">
                <img
                  src="/logo.png"
                  alt="Futbol para todos"
                  className="h-auto w-full max-w-[220px] sm:max-w-[260px] md:max-w-[280px] object-contain object-left brightness-0 invert opacity-95"
                />
              </div>
              <motion.a
                href="#products"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex mt-6 items-center justify-center uppercase text-xs sm:text-sm font-black tracking-[0.12em] bg-[#166534] text-white px-7 py-3.5 rounded-sm shadow-[0_12px_40px_-10px_rgba(22,101,52,0.7)] hover:bg-[#14532d] ring-2 ring-[#facc15]/40 transition-colors"
              >
                {t.cta}
              </motion.a>
              <div className="mt-6 hidden lg:flex gap-2">
                {HERO_SLIDES.map((_, i) => (
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

          <div className="order-1 lg:order-2 relative flex-1 min-h-[52svh] sm:min-h-[56svh] lg:min-h-[calc(100svh-78px)] px-3 pt-3 pb-0 lg:p-0">
            <div className="absolute inset-3 lg:inset-0 max-lg:rounded-[16px] overflow-hidden ring-1 ring-white/15 lg:ring-0 shadow-2xl lg:shadow-none">
              <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden max-lg:rounded-[16px]">
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
              aria-label={lang === "es" ? "Anterior" : "Previous"}
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-sm bg-black/50 text-white backdrop-blur-sm ring-1 ring-white/20 hover:bg-black/65 transition-colors"
              onClick={() => go(-1)}
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label={lang === "es" ? "Siguiente" : "Next"}
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-sm bg-black/50 text-white backdrop-blur-sm ring-1 ring-white/20 hover:bg-black/65 transition-colors"
              onClick={() => go(1)}
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </button>

            <div className="lg:hidden absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {HERO_SLIDES.map((_, i) => (
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

      <ShippingMarquee />
    </>
  );
}
