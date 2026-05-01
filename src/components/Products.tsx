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
    headingAccent: "Lo último.",
    headingRest: "Echa un vistazo al catálogo.",
    subtitle: "Toca una ficha para tallas, precio y pedir por WhatsApp.",
    from: "Desde",
    filter: "Filtrar",
  },
  en: {
    headingAccent: "The latest.",
    headingRest: "Take a look at the lineup.",
    subtitle: "Tap a card for sizes, price, and WhatsApp checkout.",
    from: "From",
    filter: "Filter",
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
        "rounded-[28px] overflow-hidden shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] border transition-transform duration-300 hover:-translate-y-1",
        dark ? "bg-[#1d1d1f] border-white/[0.06]" : "bg-white border-black/[0.06]",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onOpen}
        className="flex h-full min-h-[480px] md:min-h-[520px] flex-col text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066cc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f7]"
      >
        <div className="flex flex-1 flex-col px-8 pt-9 pb-4 md:px-10 md:pt-10">
          {product.badge && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#f56300] mb-2">
              {product.badge}
            </p>
          )}
          <h3
            className={`text-[1.65rem] md:text-[1.85rem] font-semibold leading-tight tracking-tight ${
              dark ? "text-white" : "text-[#1d1d1f]"
            }`}
          >
            {product.name}
          </h3>
          {tagline && (
            <p
              className={`mt-2 text-[15px] leading-snug max-w-[90%] ${
                dark ? "text-white/55" : "text-[#6e6e73]"
              }`}
            >
              {tagline}
            </p>
          )}
          <div className="mt-5 flex items-baseline gap-2">
            <span className={`text-xs font-medium ${dark ? "text-white/45" : "text-[#6e6e73]"}`}>
              {t.from}
            </span>
            <span
              className={`text-xl font-semibold tabular-nums ${dark ? "text-white" : "text-[#1d1d1f]"}`}
            >
              €{product.price.toFixed(2)}
            </span>
          </div>
        </div>
        <div
          className={`relative mt-auto h-[220px] md:h-[240px] ${
            dark ? "bg-[#2d2d2f]" : "bg-[#f5f5f7]"
          }`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="absolute bottom-0 left-1/2 h-[115%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-xl transition duration-500 hover:scale-[1.02]"
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
    <section id="products" className="py-16 md:py-24 bg-[#f5f5f7]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8 md:mb-10 max-w-3xl"
        >
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-semibold leading-[1.15] tracking-tight text-[#1d1d1f]">
            <span className="text-[#f56300]">{t.headingAccent}</span>{" "}
            <span className="text-[#6e6e73] font-normal">{t.headingRest}</span>
          </h2>
          <p className="mt-3 text-[15px] md:text-[17px] text-[#6e6e73] leading-relaxed">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          <span className="text-[12px] text-[#6e6e73] mr-1">{t.filter}</span>
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
                  active
                    ? "bg-[#1d1d1f] text-white"
                    : "bg-[#e8e8ed] text-[#1d1d1f]/80 hover:bg-[#dedee3]"
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
          className="absolute right-3 md:right-6 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/[0.08] bg-white/90 text-[#1d1d1f] shadow-md backdrop-blur-sm hover:bg-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

      <ProductDetailModal product={detail} onClose={() => setDetail(null)} />
    </section>
  );
}
