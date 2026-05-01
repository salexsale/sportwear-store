"use client";

import { useLanguage } from "@/context/LanguageContext";

const CONTENT = {
  es: {
    rights: "Todos los derechos reservados.",
    contact: "Contacto: info@futbolparatodos.com",
  },
  en: {
    rights: "All rights reserved.",
    contact: "Contact: info@futbolparatodos.com",
  },
};

export default function Footer() {
  const { lang } = useLanguage();
  const t = CONTENT[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] border-t border-white/[0.06] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-[#6E6E73]">
          © {year} FutbolParaTodos. {t.rights}
        </p>
        <p className="text-xs text-[#6E6E73]">
          {t.contact}
        </p>
      </div>
    </footer>
  );
}