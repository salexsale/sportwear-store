"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Product } from "@/context/CartContext";
import ProductDetailModal from "@/components/ProductDetailModal";
import { CATALOG_PRODUCTS } from "@/data/products";

const PRODUCTS = CATALOG_PRODUCTS;

const CATEGORIES = ["Todos", "LaLiga", "Premier League", "Ligue 1", "Serie A", "Bundesliga", "Selección"];

const CONTENT = {
  es: {
    headingAccent: "Tu equipo.",
    headingRest: "Camisetas y equipación en catálogo.",
    subtitle: "Desliza, elige una ficha y mira tallas, precio y cómo pedirla por WhatsApp.",
    from: "Desde",
    filter: "Competición",
  },
  en: {
    headingAccent: "Your club.",
    headingRest: "Jerseys and kit in our catalog.",
    subtitle: "Swipe, pick a card, then check sizes, price, and WhatsApp checkout.",
    from: "From",
    filter: "League",
  },
};

function ShowcaseCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: () => void;
}) {
  const { lang } = useLanguage();
  const t = CONTENT[lang];
  const dark = product.cardTheme === "dark";
  const tagline = product.tagline?.[lang];

  return (
    <motion.article
      data-card
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className={[
        "snap-center shrink-0 w-[min(88vw,380px)] sm:w-[400px] md:w-[min(42vw,480px)] lg:w-[460px]",
        "rounded-[24px] overflow-hidden shadow-[0_14px_44px_-14px_rgba(15,23,42,0.28)] border transition-transform duration-300 hover:-translate-y-1",
        dark
          ? "bg-[#0f172a] border-white/[0.08]"
          : "bg-white border-[#166534]/10",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onOpen}
        className="flex h-full min-h-[480px] md:min-h-[520px] flex-col text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0f3ef]"
      >
        <div className="flex flex-1 flex-col px-8 pt-9 pb-4 md:px-10 md:pt-10">
          {product.badge && (
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#ca8a04] mb-2">
              {product.badge}
            </p>
          )}
          <h3
            className={`text-[1.65rem] md:text-[1.85rem] font-bold leading-tight tracking-tight ${
              dark ? "text-white" : "text-[#0f172a]"
            }`}
          >
            {product.name}
          </h3>
          {tagline && (
            <p
              className={`mt-2 text-[15px] leading-snug max-w-[90%] ${
                dark ? "text-white/60" : "text-[#5c6b63]"
              }`}
            >
              {tagline}
            </p>
          )}
          <div className="mt-5 flex items-baseline gap-2">
            <span className={`text-xs font-semibold ${dark ? "text-white/45" : "text-[#5c6b63]"}`}>
              {t.from}
            </span>
            <span
              className={`text-xl font-bold tabular-nums ${dark ? "text-[#facc15]" : "text-[#166534]"}`}
            >
              €{product.price.toFixed(2)}
            </span>
          </div>
        </div>
        <div
          className={`relative mt-auto h-[220px] md:h-[240px] ${
            dark ? "bg-[#1e293b]" : "bg-gradient-to-b from-[#e8efe9] to-[#dce8de]"
          }`}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#166534]/25 to-transparent"
            aria-hidden
          />
          <img
            src={product.image}
            alt={product.name}
            className="absolute bottom-0 left-1/2 h-[115%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-2xl transition duration-500 hover:scale-[1.02]"
          />
        </div>
      </button>
    </motion.article>
  );
}

export default function Products() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [detail, setDetail] = useState<Product | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const t = CONTENT[lang];

  const filteredProducts =
    activeCategory === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  const scrollCarousel = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const step = (card?.offsetWidth ?? 400) + 20;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id="products"
      className="py-16 md:py-24 bg-gradient-to-b from-[#e5ebe4] via-[#f0f3ef] to-[#f0f3ef]"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8 md:mb-10 max-w-3xl"
        >
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-bold leading-[1.15] tracking-tight text-[#0f172a]">
            <span className="text-[#166534]">{t.headingAccent}</span>{" "}
            <span className="text-[#5c6b63] font-semibold">{t.headingRest}</span>
          </h2>
          <p className="mt-3 text-[15px] md:text-[17px] text-[#5c6b63] leading-relaxed">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          <span className="text-[12px] font-semibold text-[#5c6b63] mr-1 uppercase tracking-wide">
            {t.filter}
          </span>
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${
                  active
                    ? "bg-[#166534] text-white shadow-sm shadow-[#166534]/25"
                    : "bg-white/90 text-[#0f172a]/80 ring-1 ring-[#166534]/15 hover:bg-[#166534]/8"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory pl-4 md:pl-[max(1rem,calc((100vw-1200px)/2+1rem))] pr-16 md:pr-24 pb-2"
        >
          {filteredProducts.map((product) => (
            <ShowcaseCard key={product.id} product={product} onOpen={() => setDetail(product)} />
          ))}
        </div>

        <button
          type="button"
          aria-label={lang === "es" ? "Desplazar" : "Scroll"}
          onClick={() => scrollCarousel(1)}
          className="absolute right-3 md:right-6 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#166534]/20 bg-white text-[#14532d] shadow-md hover:bg-[#166534]/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={2} />
        </button>
      </div>

      <ProductDetailModal product={detail} onClose={() => setDetail(null)} />
    </section>
  );
}
