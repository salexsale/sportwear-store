"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

const NAV = {
  es: {
    links: ["Inicio", "Colección", "Contacto"],
    hrefs: ["#hero", "#products", "#contact"],
  },
  en: {
    links: ["Home", "Collection", "Contact"],
    hrefs: ["#hero", "#products", "#contact"],
  },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => window.innerWidth >= 768 && setMenuOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  const { links, hrefs } = NAV[lang];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="h-1 w-full shrink-0 bg-gradient-to-r from-[#166534] via-[#facc15] to-[#166534]" />
      <div className="max-w-[1200px] mx-auto px-3 sm:px-5 flex items-center justify-between min-h-[54px] md:min-h-[60px] py-1 md:py-1.5">
        <a
          href="#hero"
          className="group flex shrink-0 flex-col justify-center py-0.5 text-left leading-tight"
          aria-label={lang === "es" ? "Futbol para todos — Inicio" : "Futbol para todos — Home"}
        >
          <span className="font-black tracking-tight text-[#4ade80] text-[0.95rem] sm:text-[1.05rem] md:text-[1.15rem]">
            Futbol
          </span>
          <span className="text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] font-bold uppercase tracking-[0.12em] text-white/90">
            para todos
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link, i) => (
            <a
              key={i}
              href={hrefs[i]}
              className="text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.14em] text-white/75 hover:text-[#4ade80] transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] px-2.5 py-2 rounded-sm text-white/85 border border-white/25 hover:bg-white/10 transition-colors"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 rounded-sm bg-[#166534] hover:bg-[#14532d] text-white transition-colors"
            aria-label="Carrito"
          >
            <ShoppingBag size={18} strokeWidth={1.75} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 px-0.5 bg-[#facc15] text-[#0f172a] text-[10px] font-black rounded-sm flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`block h-0.5 w-5 bg-current origin-center transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-all duration-200 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current origin-center transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[#0f172a] border-t border-white/10"
          >
            <div className="px-4 py-2 flex flex-col">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={hrefs[i]}
                  onClick={() => setMenuOpen(false)}
                  className="text-[15px] font-bold uppercase tracking-[0.1em] text-white/90 py-4 border-b border-white/10 last:border-0"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
