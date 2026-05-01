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
      className="fixed top-0 left-0 right-0 z-50 bg-[#f0f3ef]/90 backdrop-blur-xl backdrop-saturate-150 border-b border-[#166534]/12"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="h-0.5 w-full bg-gradient-to-r from-[#166534] via-[#ca8a04] to-[#166534] opacity-90" />
      <div className="max-w-[980px] xl:max-w-[1200px] mx-auto px-4 md:px-6 flex items-center justify-between h-12 md:h-[52px]">
        <a href="#hero" className="flex items-center shrink-0 py-2">
          <img
            src="/logo.png"
            alt="FutbolParaTodos"
            className="h-7 w-auto brightness-0 opacity-90 hover:opacity-100 transition-opacity"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8 lg:gap-10 absolute left-1/2 -translate-x-1/2">
          {links.map((link, i) => (
            <a
              key={i}
              href={hrefs[i]}
              className="text-[12px] font-medium text-[#0f172a]/75 hover:text-[#166534] transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="text-[11px] font-semibold px-2.5 py-1.5 rounded-full text-[#0f172a]/65 hover:text-[#166534] hover:bg-[#166534]/8 transition-colors"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#166534]/10 hover:bg-[#166534]/18 text-[#14532d] transition-colors"
            aria-label="Carrito"
          >
            <ShoppingBag size={17} strokeWidth={1.5} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 bg-[#b45309] text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 text-[#0f172a]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`block h-[1.5px] w-[18px] bg-current origin-center transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-[18px] bg-current transition-all duration-200 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-[18px] bg-current origin-center transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
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
            className="md:hidden overflow-hidden bg-[#f0f3ef] border-t border-[#166534]/12"
          >
            <div className="px-4 py-3 flex flex-col">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={hrefs[i]}
                  onClick={() => setMenuOpen(false)}
                  className="text-[15px] font-medium text-[#0f172a] py-3 border-b border-[#166534]/10 last:border-0"
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
