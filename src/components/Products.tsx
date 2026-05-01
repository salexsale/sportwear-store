"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Product } from "@/context/CartContext";
import ProductDetailModal from "@/components/ProductDetailModal";

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Camiseta Real Madrid 24/25",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=1000&fit=crop",
    category: "LaLiga",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blanco", "Negro"],
  },
  {
    id: 2,
    name: "Camiseta Barcelona 24/25",
    price: 94.99,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=1000&fit=crop",
    category: "LaLiga",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Azul", "Rojo"],
  },
  {
    id: 3,
    name: "Camiseta Manchester United 24/25",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=1000&fit=crop",
    category: "Premier League",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Rojo", "Blanco"],
  },
  {
    id: 4,
    name: "Camiseta PSG 24/25",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=1000&fit=crop",
    category: "Ligue 1",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Azul", "Blanco"],
  },
  {
    id: 5,
    name: "Camiseta Juventus 24/25",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&h=1000&fit=crop",
    category: "Serie A",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Negro", "Blanco"],
  },
  {
    id: 6,
    name: "Camiseta Bayern München 24/25",
    price: 87.99,
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=1000&fit=crop",
    category: "Bundesliga",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Rojo", "Blanco"],
  },
  {
    id: 7,
    name: "Camiseta Selección España 24/25",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=1000&fit=crop",
    category: "Selección",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Rojo", "Amarillo"],
  },
  {
    id: 8,
    name: "Camiseta Selección Argentina 24/25",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=1000&fit=crop",
    category: "Selección",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Celeste", "Blanco"],
  },
];

const CATEGORIES = ["Todos", "LaLiga", "Premier League", "Ligue 1", "Serie A", "Bundesliga", "Selección"];

const CONTENT = {
  es: {
    title: "Catálogo",
    subtitle: "Selecciona una pieza para ver tallas, precio y pedir por WhatsApp.",
    from: "Desde",
    view: "Ver ficha",
    filter: "Competición",
  },
  en: {
    title: "Catalog",
    subtitle: "Select an item for sizes, price, and order via WhatsApp.",
    from: "From",
    view: "View details",
    filter: "Competition",
  },
};

function CatalogCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: () => void;
}) {
  const { lang } = useLanguage();
  const t = CONTENT[lang];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="group relative bg-white border border-black/[0.06] hover:border-black/[0.12] transition-colors"
    >
      <button
        type="button"
        onClick={onOpen}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F4F2]"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover opacity-95 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 md:opacity-60 group-hover:opacity-90 transition-opacity" />
          <span className="absolute left-3 top-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">
            {product.category}
          </span>
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
            {t.view}
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
          </span>
        </div>
        <div className="px-4 py-4 md:px-5 md:py-5 border-t border-black/[0.06]">
          <h3 className="text-sm md:text-[15px] font-medium text-[#0a0a0a] leading-snug tracking-tight line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          <div className="mt-3 flex items-baseline justify-between gap-3">
            <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">{t.from}</p>
            <p className="text-lg font-semibold tabular-nums text-[#C9A227]">€{product.price.toFixed(2)}</p>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

export default function Products() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [detail, setDetail] = useState<Product | null>(null);
  const t = CONTENT[lang];

  const filteredProducts =
    activeCategory === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-20 md:py-28 bg-[#F4F4F2]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16 border-b border-black/[0.08] pb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C9A227] mb-3">
              {t.filter}
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#0a0a0a]">{t.title}</h2>
            <p className="mt-4 text-neutral-600 text-base leading-relaxed">{t.subtitle}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex gap-0 overflow-x-auto pb-2 mb-12 md:mb-14 -mx-1 px-1"
        >
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] border-b-2 transition-colors ${
                  active
                    ? "border-[#C9A227] text-[#0a0a0a]"
                    : "border-transparent text-neutral-500 hover:text-[#0a0a0a]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {filteredProducts.map((product) => (
            <CatalogCard key={product.id} product={product} onOpen={() => setDetail(product)} />
          ))}
        </motion.div>
      </div>

      <ProductDetailModal product={detail} onClose={() => setDetail(null)} />
    </section>
  );
}
