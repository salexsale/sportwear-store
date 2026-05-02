"use client";

/** Carrusel: imágenes y titulares por slide en `src/data/hero-slides.ts`. Textos kicker/CTA/tagline en `src/data/home-content.ts`. */
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ShippingMarquee from "@/components/ShippingMarquee";
import { HERO_SLIDES } from "@/data/hero-slides";
import { HOME_CONTENT } from "@/data/home-content";

const AUTO_MS = 7500;

const sparkles = [
  { c: "rgba(74,222,128,0.5)", x: "12%", y: "18%", s: 16, d: 5 },
  { c: "rgba(250,204,21,0.45)", x: "78%", y: "22%", s: 12, d: 4.5 },
  { c: "rgba(255,255,255,0.25)", x: "88%", y: "12%", s: 10, d: 4 },
];

export default function Hero() {
  const { lang } = useLanguage();
  const heroCopy = HOME_CONTENT[lang].hero;
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
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, rgba(250,204,21,0.15), transparent 40%),
                radial-gradient(circle at 80% 20%, rgba(22,101,52,0.2), transparent 45%)`,
            }}
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:min-h-[calc(100svh-78px)]">
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
              <p className="text-[11px] sm:text-xs font-black uppercase tracking-[0.18em] text-[#4ade80] mb-5">
                {heroCopy.kicker}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${index}-${lang}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <h1 className="text-[2.5rem] sm:text-[3rem] lg:text-[3.25rem] xl:text-[3.75rem] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white">
                    <span className="text-[#4ade80]">{slide.line1[lang]}</span>
                    <span className="mt-1 block text-white/95">{slide.line2[lang]}</span>
                  </h1>
                </motion.div>
              </AnimatePresence>
              <span className="mt-4 block h-1 w-20 rounded-full bg-[#facc15]" aria-hidden />
              <p className="mt-5 max-w-sm text-[13px] leading-relaxed italic text-[#facc15]/90 sm:text-sm">
                {heroCopy.tagline}
              </p>
              <motion.a
                href="#products"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex items-center justify-center rounded-sm bg-[#166534] px-8 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_12px_40px_-10px_rgba(22,101,52,0.7)] ring-2 ring-[#facc15]/40 transition-colors hover:bg-[#14532d] sm:text-sm"
              >
                {heroCopy.cta}
              </motion.a>
              <div className="mt-8 hidden lg:flex gap-2">
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

          <div className="order-1 lg:order-2 relative flex-1 min-h-[54svh] sm:min-h-[58svh] lg:min-h-[calc(100svh-78px)] px-3 pt-3 pb-0 lg:p-0">
            <div className="absolute inset-3 lg:inset-0 max-lg:rounded-[18px] overflow-hidden ring-1 ring-white/15 lg:ring-0 shadow-2xl lg:shadow-none">
              <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden max-lg:rounded-[18px]">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/55 via-transparent to-[#0f172a]/25 lg:from-[#0f172a]/38" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/75 via-transparent to-transparent lg:from-[#0f172a]/50" />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              aria-label={lang === "es" ? "Anterior" : "Previous"}
              className="absolute left-3 md:left-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm bg-black/45 text-white shadow-lg backdrop-blur-sm ring-1 ring-white/25 transition hover:bg-black/60"
              onClick={() => go(-1)}
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label={lang === "es" ? "Siguiente" : "Next"}
              className="absolute right-3 md:right-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm bg-black/45 text-white shadow-lg backdrop-blur-sm ring-1 ring-white/25 transition hover:bg-black/60"
              onClick={() => go(1)}
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2} />
            </button>

            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 lg:hidden">
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
