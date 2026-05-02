"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Product } from "@/context/CartContext";
import ProductDetailModal from "@/components/ProductDetailModal";
import { CATALOG_PRODUCTS } from "@/data/products";

const PRODUCTS = CATALOG_PRODUCTS;

const CATEGORIES = ["Todos", "LaLiga", "Premier League", "Ligue 1", "Serie A", "Bundesliga", "Selección"];

type SortKey = "default" | "price-asc" | "price-desc";

const CONTENT = {
  es: {
    heading: "Camisetas",
    subtitle: "Filtra por liga y ordena como en una tienda: claro, rápido, sin perder de vista el producto.",
    from: "Desde",
    sort: "Ordenar por",
    sortDefault: "Recomendado",
    sortPriceLow: "Precio: menor a mayor",
    sortPriceHigh: "Precio: mayor a menor",
    hideFilters: "Ocultar filtros",
    showFilters: "Mostrar filtros",
    mobileFilters: "Categorías y ligas",
    league: "Liga / competición",
    item: "artículo",
    items: "artículos",
  },
  en: {
    heading: "Jerseys",
    subtitle: "Filter by league and sort the grid—clean layout, product first.",
    from: "From",
    sort: "Sort by",
    sortDefault: "Featured",
    sortPriceLow: "Price: low to high",
    sortPriceHigh: "Price: high to low",
    hideFilters: "Hide filters",
    showFilters: "Show filters",
    mobileFilters: "Leagues & categories",
    league: "League / competition",
    item: "item",
    items: "items",
  },
};

function CatalogCard({ product, onOpen, fromLabel }: { product: Product; onOpen: () => void; fromLabel: string }) {
  const { lang } = useLanguage();
  const tagline = product.tagline?.[lang];
  const label = product.badge || product.category;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex h-full flex-col border border-neutral-200/90 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <button
        type="button"
        onClick={onOpen}
        className="flex h-full flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[4/5] bg-[#f4f4f5]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-contain object-center p-4 transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-1 flex-col border-t border-neutral-100 p-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#b45309]">{label}</span>
          <h3 className="mt-1 line-clamp-2 text-[13px] font-bold leading-snug text-neutral-900 sm:text-sm">{product.name}</h3>
          {tagline && (
            <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-neutral-500 sm:text-xs">{tagline}</p>
          )}
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">{fromLabel}</span>
            <span className="text-base font-bold tabular-nums text-neutral-900">€{product.price.toFixed(2)}</span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

export default function Products() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [sort, setSort] = useState<SortKey>("default");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [detail, setDetail] = useState<Product | null>(null);
  const t = CONTENT[lang];

  const list = useMemo(() => {
    let rows = activeCategory === "Todos" ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === activeCategory);
    if (sort === "price-asc") rows.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") rows.sort((a, b) => b.price - a.price);
    return rows;
  }, [activeCategory, sort]);

  const countLabel = list.length === 1 ? t.item : t.items;

  return (
    <section id="products" className="relative bg-[#fafafa] py-12 md:py-16">
      <div
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none text-[clamp(6rem,28vw,16rem)] font-black leading-none text-[#166534]/[0.06]"
        aria-hidden
      >
        FPT
      </div>

      <div className="relative mx-auto max-w-[1320px] px-4 md:px-8 lg:px-10">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-900 md:text-3xl">
            {t.heading}{" "}
            <span className="font-semibold normal-case text-neutral-400">
              ({list.length} {countLabel})
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">{t.subtitle}</p>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-5">
          <button
            type="button"
            onClick={() => setSidebarVisible((v) => !v)}
            className="hidden items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-[#166534] lg:inline-flex"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
            {sidebarVisible ? t.hideFilters : t.showFilters}
          </button>

          <label className="flex flex-1 items-center justify-end gap-2 sm:flex-initial">
            <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{t.sort}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="cursor-pointer rounded-sm border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-900 outline-none ring-[#166534] focus:ring-2"
            >
              <option value="default">{t.sortDefault}</option>
              <option value="price-asc">{t.sortPriceLow}</option>
              <option value="price-desc">{t.sortPriceHigh}</option>
            </select>
          </label>
        </div>

        <details className="group mb-8 rounded-sm border border-neutral-200 bg-white lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-bold text-neutral-900">
            {t.mobileFilters}
            <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <div className="border-t border-neutral-100 px-4 py-3">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">{t.league}</p>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-sm py-2.5 text-left text-sm font-medium transition-colors ${
                      active ? "bg-[#0f172a] px-3 text-white" : "px-3 text-neutral-700 hover:bg-neutral-100"
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
                      : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
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
            } hidden w-full shrink-0 border border-neutral-200 bg-white p-5 lg:sticky lg:top-[92px] lg:w-56 lg:self-start xl:w-60`}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">{t.league}</p>
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
                        : "px-3 font-medium text-neutral-700 hover:bg-neutral-100"
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
              <p className="py-16 text-center text-sm text-neutral-500">
                {lang === "es" ? "No hay resultados con este filtro." : "No products match this filter."}
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {list.map((product) => (
                  <li key={product.id}>
                    <CatalogCard
                      product={product}
                      onOpen={() => setDetail(product)}
                      fromLabel={t.from}
                    />
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
