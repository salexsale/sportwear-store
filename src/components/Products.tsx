"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Product } from "@/context/CartContext";
import ProductDetailModal from "@/components/ProductDetailModal";
import { CATALOG_PRODUCTS } from "@/data/products";
import { HOME_CONTENT } from "@/data/home-content";

const PRODUCTS = CATALOG_PRODUCTS;

const CATEGORIES = ["Todos", "LaLiga", "Premier League", "Ligue 1", "Serie A", "Bundesliga", "Selección"];

type SortKey = "default" | "price-asc" | "price-desc";

function CatalogCard({
  product,
  onOpen,
  fromLabel,
  variant = "grid",
}: {
  product: Product;
  onOpen: () => void;
  fromLabel: string;
  variant?: "grid" | "carousel";
}) {
  const { lang } = useLanguage();
  const tagline = product.tagline?.[lang];
  const label = product.badge || product.category;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className={
        variant === "carousel"
          ? "group flex h-full min-w-[min(78vw,280px)] max-w-[320px] snap-center flex-col border border-neutral-200/90 bg-white shadow-sm transition-shadow hover:shadow-md sm:min-w-[300px]"
          : "group flex h-full w-full flex-col border border-neutral-200/90 bg-white shadow-sm transition-shadow hover:shadow-md"
      }
    >
      <button
        type="button"
        onClick={onOpen}
        className="flex h-full flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[4/5] bg-[#e8e8ea]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-contain object-center p-3 transition-transform duration-300 group-hover:scale-[1.02] sm:p-4"
          />
        </div>
        <div className="flex flex-1 flex-col border-t border-neutral-100 p-3.5 sm:p-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#b45309]">{label}</span>
          <h3 className="mt-1 line-clamp-2 text-[12px] font-bold leading-snug text-neutral-900 sm:text-[13px]">{product.name}</h3>
          {tagline && (
            <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-neutral-500 sm:text-[11px]">{tagline}</p>
          )}
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-[9px] font-semibold uppercase tracking-wide text-neutral-400">{fromLabel}</span>
            <span className="text-sm font-bold tabular-nums text-neutral-900 sm:text-base">€{product.price.toFixed(2)}</span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

function FeaturedRow({
  products,
  onOpen,
  fromLabel,
}: {
  products: Product[];
  onOpen: (p: Product) => void;
  fromLabel: string;
}) {
  const { lang } = useLanguage();
  const t = HOME_CONTENT[lang].featured;
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <div className="mb-12 overflow-hidden rounded-sm border border-[#facc15]/25 bg-gradient-to-b from-[#0f172a] to-[#0a1424] p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] sm:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#facc15] sm:text-[11px]">
            {lang === "es" ? "Vistazo rápido" : "Quick look"}
          </p>
          <h3 className="font-serif text-2xl font-bold text-white md:text-3xl">{t.title}</h3>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-white/70 sm:text-sm">{t.subtitle}</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 bg-white/5 text-white hover:bg-white/10"
            aria-label={lang === "es" ? "Anterior" : "Previous"}
          >
            <ChevronRight className="h-5 w-5 rotate-180" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#facc15] text-[#0f172a] hover:bg-[#fde047]"
            aria-label={lang === "es" ? "Siguiente" : "Next"}
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pl-0.5 sm:gap-5"
      >
        {products.map((product) => (
          <CatalogCard
            key={`feat-${product.id}`}
            variant="carousel"
            product={product}
            onOpen={() => onOpen(product)}
            fromLabel={fromLabel}
          />
        ))}
      </div>
    </div>
  );
}

export default function Products() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [sort, setSort] = useState<SortKey>("default");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [detail, setDetail] = useState<Product | null>(null);
  const t = HOME_CONTENT[lang].products;

  const list = useMemo(() => {
    let rows = activeCategory === "Todos" ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === activeCategory);
    if (sort === "price-asc") rows.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") rows.sort((a, b) => b.price - a.price);
    return rows;
  }, [activeCategory, sort]);

  const featuredPick = useMemo(() => PRODUCTS.slice(0, Math.min(8, PRODUCTS.length)), []);

  const countLabel = list.length === 1 ? t.item : t.items;

  return (
    <section id="products" className="relative bg-[#f3f4f1] py-12 md:py-16">
      <div
        className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 select-none text-[clamp(5rem,24vw,14rem)] font-black leading-none text-[#166534]/[0.07]"
        aria-hidden
      >
        FPT
      </div>

      <div className="relative mx-auto max-w-[1320px] px-4 md:px-8 lg:px-10">
        <motion.div
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] md:text-3xl">
            {t.heading}{" "}
            <span className="font-semibold normal-case text-[#5c6b63]">
              ({list.length} {countLabel})
            </span>
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#5c6b63] md:text-base">{t.subtitle}</p>
        </motion.div>

        <FeaturedRow
          products={featuredPick}
          onOpen={setDetail}
          fromLabel={t.from}
        />

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#d4d9d3] pb-5">
          <button
            type="button"
            onClick={() => setSidebarVisible((v) => !v)}
            className="hidden items-center gap-2 text-sm font-semibold text-[#0f172a] hover:text-[#166534] lg:inline-flex"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
            {sidebarVisible ? t.hideFilters : t.showFilters}
          </button>

          <label className="flex flex-1 items-center justify-end gap-2 sm:flex-initial">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#5c6b63]">{t.sort}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="cursor-pointer rounded-sm border border-[#c5cdc4] bg-white px-3 py-2 text-sm font-medium text-[#0f172a] outline-none ring-[#166534] focus:ring-2"
            >
              <option value="default">{t.sortDefault}</option>
              <option value="price-asc">{t.sortPriceLow}</option>
              <option value="price-desc">{t.sortPriceHigh}</option>
            </select>
          </label>
        </div>

        <details className="group mb-8 rounded-sm border border-[#d4d9d3] bg-white lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-bold text-[#0f172a]">
            {t.mobileFilters}
            <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <div className="border-t border-neutral-100 px-4 py-3">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#5c6b63]">{t.league}</p>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-sm py-2.5 text-left text-sm font-medium transition-colors ${
                      active ? "bg-[#0f172a] px-3 text-white" : "px-3 text-[#0f172a] hover:bg-[#f0f3ef]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </details>

        {!sidebarVisible && (
          <div className="mb-8 hidden flex-wrap gap-2 lg:flex">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-sm border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "border-[#0f172a] bg-[#0f172a] text-white"
                      : "border-[#d4d9d3] bg-white text-[#0f172a] hover:bg-[#eef2eb]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <aside
            className={`${
              sidebarVisible ? "lg:block" : "lg:hidden"
            } hidden w-full shrink-0 border border-[#d4d9d3] bg-white p-5 lg:sticky lg:top-[92px] lg:w-56 lg:self-start xl:w-60`}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#5c6b63]">{t.league}</p>
            <nav className="mt-4 flex flex-col gap-0.5" aria-label={t.league}>
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-sm py-2.5 text-left text-sm transition-colors ${
                      active
                        ? "bg-[#0f172a] px-3 font-semibold text-white"
                        : "px-3 font-medium text-[#0f172a] hover:bg-[#f0f3ef]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
            {list.length === 0 ? (
              <p className="py-16 text-center text-sm text-[#5c6b63]">
                {lang === "es" ? "No hay resultados con este filtro." : "No products match this filter."}
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {list.map((product) => (
                  <li key={product.id}>
                    <CatalogCard product={product} onOpen={() => setDetail(product)} fromLabel={t.from} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <ProductDetailModal product={detail} onClose={() => setDetail(null)} />
    </section>
  );
}
