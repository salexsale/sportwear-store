"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SITE_EMAIL, SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from "@/lib/site-config";

const CONTENT = {
  es: {
    rights: "Todos los derechos reservados.",
  },
  en: {
    rights: "All rights reserved.",
  },
};

export default function Footer() {
  const { lang } = useLanguage();
  const t = CONTENT[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-white/65 border-t border-white/10">
      <div className="h-0.5 w-full bg-gradient-to-r from-[#166534] via-[#facc15] to-[#166534] opacity-90" />
      <div className="max-w-[980px] mx-auto px-4 md:px-6 py-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.1em] text-white/80">
          © {year} · {t.rights}
        </p>
        <div className="flex flex-col sm:items-end gap-1.5 text-[14px] sm:text-[15px]">
          <a
            href={`tel:${SITE_PHONE_E164.replace(/\s/g, "")}`}
            className="font-semibold text-[#4ade80] hover:text-[#86efac] transition-colors"
          >
            {SITE_PHONE_DISPLAY}
          </a>
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="text-white/85 hover:text-white font-medium break-all"
          >
            {SITE_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
