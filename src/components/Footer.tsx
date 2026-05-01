"use client";

import { useLanguage } from "@/context/LanguageContext";

const CONTENT = {
  es: {
    rights: "Todos los derechos reservados.",
    contact: "info@futbolparatodos.com",
  },
  en: {
    rights: "All rights reserved.",
    contact: "info@futbolparatodos.com",
  },
};

export default function Footer() {
  const { lang } = useLanguage();
  const t = CONTENT[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-white/55 border-t border-white/10">
      <div className="h-0.5 w-full bg-gradient-to-r from-[#166534] via-[#facc15] to-[#166534] opacity-90" />
      <div className="max-w-[980px] mx-auto px-4 md:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em]">
          © {year} FutbolParaTodos · {t.rights}
        </p>
        <p className="text-[12px] text-[#4ade80]/90">{t.contact}</p>
      </div>
    </footer>
  );
}
