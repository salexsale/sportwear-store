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
      className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/[0.08]"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.6, 0, 0.05, 1] }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-[4.25rem]">
        <a href="#hero" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="FutbolParaTodos" className="h-9 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((link, i) => (
            <a
              key={i}
              href={hrefs[i]}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-2 rounded-sm border border-white/20 text-white/75 hover:text-white hover:border-white/40 transition-all"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-sm border border-[#C9A227]/50 text-[#C9A227] hover:bg-[#C9A227]/10 transition-colors"
            aria-label="Carrito"
          >
            <ShoppingBag size={18} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 min-w-[1.125rem] h-[1.125rem] px-0.5 bg-[#C9A227] text-black text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`block h-px w-5 bg-white origin-center transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-white transition-all duration-200 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-white origin-center transition-all duration-300 ${
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
            className="md:hidden overflow-hidden bg-[#0a0a0a] border-t border-white/[0.08]"
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={hrefs[i]}
                  onClick={() => setMenuOpen(false)}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85 py-3 border-b border-white/[0.06]"
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
