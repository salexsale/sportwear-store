"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SHIPPING_MARQUEE_LINES } from "@/lib/shipping-marquee";

/**
 * Franja de envíos bajo el hero (no en el header fijo).
 * Animación CSS siempre activa; con “reducir movimiento” solo se enlentece.
 */
export default function ShippingMarquee() {
  const { lang } = useLanguage();
  const lines = SHIPPING_MARQUEE_LINES[lang];
  const loop = [...lines, ...lines];

  return (
    <div
      className="relative z-10 overflow-hidden border-y border-[#facc15]/25 bg-[#14532d] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
      role="region"
      aria-label={lang === "es" ? "Información de envíos" : "Shipping information"}
    >
      {/* Viñetas en bordes para transición suave al contenido adyacente */}
      <span
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-gradient-to-r from-[#14532d] to-transparent sm:w-12"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-[#14532d] to-transparent sm:w-12"
        aria-hidden
      />

      <div className="fpt-shipping-marquee-track">
        {loop.map((line, i) => (
          <span
            key={`${i}-${line}`}
            className="inline-flex shrink-0 items-center gap-2 px-5 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white sm:gap-2.5 sm:px-8 sm:py-1.5 sm:text-[11px] md:px-10 md:text-xs md:tracking-[0.14em] whitespace-nowrap"
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-[#facc15] sm:h-1.5 sm:w-1.5" aria-hidden />
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
