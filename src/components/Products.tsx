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
    headingAccent: "CAMISETAS",
    headingRest: "en catálogo.",
    subtitle:
      "Fichas grandes y foto clara: toca una tarjeta para ver tallas, precio y pedir.",
    from: "Desde",
    filter: "Filtrar liga",
    watermark: "FPT",
  },
  en: {
    headingAccent: "JERSEYS",
    headingRest: "in the catalog.",
    subtitle: "Big cards and clear photos — tap a card for sizes, price, and ordering.",
    from: "From",
    filter: "League",
    watermark: "FPT",
  },
};

function JerseyStripeBar({ dark }: { dark: boolean }) {
  return (
    <div
      className={`flex h-1.5 w-full overflow-hidden rounded-sm ${
        dark ? "opacity-90" : "opacity-100"
      }`}
      aria-hidden
    >
      <div className="h-full flex-[2] bg-[#166534]" />
      <div className="h-full flex-1 bg-white/90" />
      <div className="h-full flex-[2] bg-[#166534]" />
      <div className="h-full flex-1 bg-[#facc15]" />
      <div className="h-full flex-[2] bg-[#166534]" />
    </div>
  );
}

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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={[
        "snap-center shrink-0 w-[min(88vw,380px)] sm:w-[400px] md:w-[min(42vw,480px)] lg:w-[460px]",
        "overflow-hidden shadow-[0_20px_50px_-18px_rgba(15,23,42,0.35)] transition-transform duration-300 hover:-translate-y-2",
        "rounded-tl-md rounded-tr-3xl rounded-br-md rounded-bl-3xl",
        "ring-2 ring-[#166534]/15",
        dark ? "bg-[#0f172a]" : "bg-white",
      ].join(" ")}
    >
      <JerseyStripeBar dark={dark} />
      <button
        type="button"
        onClick={onOpen}
        className="flex h-full min-h-[460px] md:min-h-[500px] flex-col text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#facc15] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0f3ef]"
      >
        <div className="flex flex-1 flex-col px-7 pt-7 pb-3 md:px-9 md:pt-8">
          <div className="flex items-start justify-between gap-3 mb-3">
            <span
              className={`inline-flex text-[11px] sm:text-xs font-black uppercase tracking-[0.1em] px-3 py-1.5 rounded-sm ${
                dark ? "bg-white/10 text-[#4ade80] ring-1 ring-white/15" : "bg-[#166534]/10 text-[#14532d]"
              }`}
            >
              {product.category}
            </span>
            {product.badge && (
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.08em] text-[#b45309]">
                {product.badge}
              </span>
            )}
          </div>
          <h3
            className={`text-[1.65rem] sm:text-[1.85rem] md:text-[2rem] font-black uppercase leading-[1.05] tracking-tight ${
              dark ? "text-white" : "text-[#0f172a]"
            }`}
          >
            {product.name}
          </h3>
          {tagline && (
            <p
              className={`mt-3 text-[15px] md:text-[17px] leading-snug max-w-[95%] font-medium ${
                dark ? "text-white/55" : "text-[#5c6b63]"
              }`}
            >
              {tagline}
            </p>
          )}
          <div className="mt-5 flex items-baseline gap-2">
            <span className={`text-xs font-bold uppercase tracking-wide ${dark ? "text-white/40" : "text-[#5c6b63]"}`}>
              {t.from}
            </span>
            <span
              className={`text-[1.65rem] md:text-[1.85rem] font-black tabular-nums tracking-tight ${dark ? "text-[#facc15]" : "text-[#166534]"}`}
            >
              €{product.price.toFixed(2)}
            </span>
          </div>
        </div>
        <div
          className={`relative mt-auto h-[200px] md:h-[230px] ${
            dark ? "bg-[#1e293b]" : "bg-gradient-to-b from-[#dce8de] to-[#c5d4c7]"
          }`}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-black/10 to-transparent opacity-40"
            aria-hidden
          />
          <img
            src={product.image}
            alt={product.name}
            className="absolute bottom-0 left-1/2 h-[118%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition duration-500 hover:scale-[1.03]"
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
    <section id="products" className="relative py-16 md:py-28 overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-4 md:top-6 -translate-x-1/2 text-[clamp(12rem,42vw,38rem)] font-black leading-none text-[#166534]/[0.09] select-none whitespace-nowrap"
        aria-hidden
      >
        {t.watermark}
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(22,101,52,0.04) 80px, rgba(22,101,52,0.04) 81px)",
        }}
        aria-hidden
      />

      <div className="relative max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end gap-6 md:gap-10"
        >
          <div className="w-1.5 shrink-0 rounded-full bg-gradient-to-b from-[#166534] via-[#4ade80] to-[#facc15] hidden md:block md:min-h-[7rem]" />
          <div className="max-w-3xl">
            <h2 className="text-[2.25rem] sm:text-[2.6rem] md:text-[3rem] font-black uppercase leading-[1.05] tracking-tight text-[#0f172a]">
              <span className="text-[#166534]">{t.headingAccent}</span>{" "}
              <span className="text-[#5c6b63] font-extrabold normal-case text-[1.45rem] sm:text-[1.65rem] md:text-[2rem] tracking-normal">
                {t.headingRest}
              </span>
            </h2>
            <p className="mt-5 text-[16px] md:text-lg text-[#5c6b63] leading-relaxed font-medium border-l-4 border-[#facc15]/80 pl-5">
              {t.subtitle}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          <span className="text-xs sm:text-[13px] font-black text-[#166534] mr-2 uppercase tracking-[0.12em]">
            {t.filter}
          </span>
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-sm px-4 py-2.5 text-xs sm:text-[13px] font-bold uppercase tracking-wide transition-all ${
                  active
                    ? "bg-[#0f172a] text-white shadow-lg shadow-[#0f172a]/25 ring-2 ring-[#facc15]/50"
                    : "bg-white text-[#0f172a]/85 ring-1 ring-[#166534]/20 hover:bg-[#166534]/10"
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
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory pl-4 md:pl-[max(1rem,calc((100vw-1200px)/2+1rem))] pr-16 md:pr-28 pb-4"
        >
          {filteredProducts.map((product) => (
            <ShowcaseCard key={product.id} product={product} onOpen={() => setDetail(product)} />
          ))}
        </div>

        <button
          type="button"
          aria-label={lang === "es" ? "Desplazar" : "Scroll"}
          onClick={() => scrollCarousel(1)}
          className="absolute right-3 md:right-8 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-sm bg-[#0f172a] text-[#facc15] shadow-xl hover:bg-[#166534] transition-colors ring-2 ring-white/80"
        >
          <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
        </button>
      </div>

      <ProductDetailModal product={detail} onClose={() => setDetail(null)} />
    </section>
  );
}
