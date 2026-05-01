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
    <footer className="bg-[#f5f5f7] border-t border-black/[0.06] py-8">
      <div className="max-w-[980px] mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[12px] text-[#6e6e73]">
          © {year} FutbolParaTodos. {t.rights}
        </p>
        <p className="text-[12px] text-[#6e6e73]">{t.contact}</p>
      </div>
    </footer>
  );
}
