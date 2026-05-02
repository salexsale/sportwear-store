"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const STORAGE_KEY = "fpt_cookie_consent";

const COPY = {
  es: {
    legal:
      "En cumplimiento de la normativa sobre cookies y protección de datos, informamos de que este sitio puede utilizar tecnologías propias y de terceros para el funcionamiento del catálogo, preferencias de idioma y medición básica de uso. Puede aceptar todas las finalidades o rechazar las opcionales; las cookies estrictamente necesarias podrían seguir activas para permitir la navegación y la seguridad del servicio.",
    disclaimer:
      "Aviso sobre el catálogo: comercializamos prendas de inspiración deportiva tipo réplica con muy buena confección y materiales; no son prendas oficiales licenciadas por clubes o federaciones si no se indica expresamente en la ficha del producto.",
    accept: "Aceptar",
    reject: "Rechazar",
  },
  en: {
    legal:
      "In line with applicable cookie and privacy rules, this site may use first- and third-party technologies for the catalog, language preferences, and basic usage metrics. You may accept optional purposes or decline them; strictly necessary cookies may remain active for navigation and security.",
    disclaimer:
      "Catalog notice: we sell sports-inspired replica-style garments with solid construction and materials; they are not officially licensed club or federation products unless clearly stated on the product page.",
    accept: "Accept",
    reject: "Decline",
  },
};

export default function CookieBanner() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v !== "accepted" && v !== "rejected") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const persist = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-[#166534]/25 bg-[#0f172a]/98 px-4 py-4 shadow-[0_-12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md md:px-8 md:py-5"
    >
      <div className="mx-auto flex max-w-[960px] flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="min-w-0 flex-1 space-y-2">
          <p id="cookie-banner-title" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4ade80]">
            {lang === "es" ? "Cookies y privacidad" : "Cookies & privacy"}
          </p>
          <p className="text-[11px] leading-relaxed text-white/75 md:text-xs">{t.legal}</p>
          <p className="text-[9px] leading-snug text-white/45 md:text-[10px]">{t.disclaimer}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2 md:flex-col md:items-stretch">
          <button
            type="button"
            onClick={() => persist("accepted")}
            className="rounded-sm bg-[#166534] px-5 py-2.5 text-xs font-black uppercase tracking-wide text-white hover:bg-[#14532d] transition-colors"
          >
            {t.accept}
          </button>
          <button
            type="button"
            onClick={() => persist("rejected")}
            className="rounded-sm border border-white/25 bg-transparent px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white/85 hover:bg-white/10 transition-colors"
          >
            {t.reject}
          </button>
        </div>
      </div>
    </div>
  );
}
