"use client";

/** Carrusel: `src/data/hero-slides.ts` · Textos kicker/CTA/tagline: `src/data/home-content.ts` */
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ShippingMarquee from "@/components/ShippingMarquee";
import { HERO_SLIDES } from "@/data/hero-slides";
import { HOME_CONTENT } from "@/data/home-content";

const AUTO_MS = 7500;

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
        className="relative min-h-[100svh] w-full overflow-hidden bg-[#070d18] pt-[72px] md:pt-[78px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Capa imagen / vídeo — de borde a borde bajo el header fijo */}
        <div className="absolute bottom-0 left-0 right-0 top-[72px] md:top-[78px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.src + index}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {slide.kind === "image" ? (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <video
                  className="h-full w-full object-cover object-center"
                  src={slide.src}
                  autoPlay
                  muted
                  playsInline
                  loop
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Lectura: gradientes + viñeta (sin bloque 50/50) */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-[72px] z-[1] md:top-[78px]" aria-hidden>
          {/* Oscurece izquierda donde va el bloque de texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050a12]/[0.94] via-[#0a1424]/75 via-[42%] sm:via-[48%] to-transparent" />
          {/* Refuerzo inferior en móvil */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a12]/95 via-[#050a12]/35 to-transparent sm:from-[#050a12]/55 sm:via-transparent md:from-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_90%_at_15%_55%,rgba(5,10,18,0.82),transparent_58%)] opacity-95 sm:opacity-100" />
        </div>

        {/* Contenido sobre la foto */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-78px)] w-full max-w-[1240px] flex-col justify-end px-5 pb-12 pt-6 sm:px-8 sm:pb-16 md:justify-center md:pb-20 md:pt-8 lg:px-12">
          <div className="max-w-[540px] md:max-w-[560px] lg:max-w-[600px]">
            <div className="rounded-2xl border border-white/12 bg-[#0f172a]/45 px-6 py-7 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.65)] backdrop-blur-md sm:px-8 sm:py-8 md:bg-[#0f172a]/40 md:py-9">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#4ade80] sm:text-[11px]">
                {heroCopy.kicker}
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${index}-${lang}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="mt-5"
                >
                  {/* Distribución: una línea en desktop con separador; apilado compacto en móvil */}
                  <h1 className="text-balance font-black uppercase tracking-[-0.03em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]">
                    <span className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-4 sm:gap-y-1">
                      <span className="text-[clamp(2rem,7vw,3.75rem)] leading-[0.92] text-[#4ade80]">{slide.line1[lang]}</span>
                      <span className="hidden font-light text-[2rem] leading-none text-[#facc15]/90 sm:inline sm:text-[2.25rem]" aria-hidden>
                        /
                      </span>
                      <span className="text-[clamp(1.65rem,5.5vw,3.25rem)] leading-[0.95] text-white">
                        {slide.line2[lang]}
                      </span>
                    </span>
                  </h1>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-px flex-1 max-w-[4rem] rounded-full bg-[#facc15]" aria-hidden />
                <span className="h-2 w-2 shrink-0 rotate-45 bg-[#facc15]" aria-hidden />
              </div>

              <p className="mt-5 max-w-md text-pretty text-[13px] leading-relaxed text-[#fef9c3]/95 sm:text-sm">
                {heroCopy.tagline}
              </p>

              <motion.a
                href="#products"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex items-center justify-center rounded-md bg-[#166534] px-8 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_40px_-8px_rgba(22,101,52,0.85)] ring-2 ring-[#facc15]/35 transition-colors hover:bg-[#14532d] sm:text-sm"
              >
                {heroCopy.cta}
              </motion.a>

              <div className="mt-8 flex flex-wrap items-center gap-2">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-9 bg-[#facc15]" : "w-2 bg-white/35 hover:bg-white/55"
                    }`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Flechas sobre todo el ancho */}
        <button
          type="button"
          aria-label={lang === "es" ? "Anterior" : "Previous"}
          className="absolute left-3 top-[calc(72px+min(34svh,200px))] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white shadow-lg backdrop-blur-sm ring-1 ring-white/25 transition hover:bg-black/60 sm:left-5 sm:top-1/2 md:left-7"
          onClick={() => go(-1)}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          aria-label={lang === "es" ? "Siguiente" : "Next"}
          className="absolute right-3 top-[calc(72px+min(34svh,200px))] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white shadow-lg backdrop-blur-sm ring-1 ring-white/25 transition hover:bg-black/60 sm:right-5 sm:top-1/2 md:right-7"
          onClick={() => go(1)}
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </section>

      <ShippingMarquee />
    </>
  );
}
