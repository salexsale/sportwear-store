"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Product } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { openWhatsApp } from "@/lib/whatsapp";

const COPY = {
  es: {
    size: "Talla",
    color: "Color",
    orderWhatsapp: "Cómo pedirla — WhatsApp",
    orderHint: "Te abrimos WhatsApp con el mensaje listo para enviar.",
    addCart: "Añadir al carrito",
    close: "Cerrar",
    whatsappMsg: (p: Product, size: string, color: string) =>
      `Hola, la quiero: ${p.name} | Talla: ${size} | Color: ${color} | Precio: €${p.price.toFixed(2)}`,
  },
  en: {
    size: "Size",
    color: "Color",
    orderWhatsapp: "Order via WhatsApp",
    orderHint: "We open WhatsApp with a pre-filled message.",
    addCart: "Add to cart",
    close: "Close",
    whatsappMsg: (p: Product, size: string, color: string) =>
      `Hi, I want: ${p.name} | Size: ${size} | Color: ${color} | Price: €${p.price.toFixed(2)}`,
  },
};

type Props = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductDetailModal({ product, onClose }: Props) {
  const { lang } = useLanguage();
  const { addToCart } = useCart();
  const t = COPY[lang];
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (product) {
      setSize(product.sizes[1] ?? product.sizes[0] ?? "");
      setColor(product.colors[0] ?? "");
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.button
            type="button"
            aria-label={t.close}
            className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed z-[61] left-1/2 top-1/2 w-[min(100vw-1.5rem,920px)] max-h-[min(90vh,880px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0a] shadow-2xl flex flex-col md:flex-row"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 p-2 rounded-full bg-black/50 text-white/90 hover:bg-black/70 transition-colors border border-white/10"
              aria-label={t.close}
            >
              <X size={18} />
            </button>

            <div className="relative w-full md:w-[52%] aspect-[4/5] md:aspect-auto md:min-h-[420px] bg-[#111]">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 bg-black/60 px-3 py-1.5 border border-white/10">
                {product.category}
              </span>
            </div>

            <div className="flex flex-col flex-1 p-6 md:p-10 md:pt-12 text-white">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight pr-10">
                {product.name}
              </h2>
              <p className="mt-4 text-3xl md:text-4xl font-semibold text-[#C9A227] tabular-nums">
                €{product.price.toFixed(2)}
              </p>

              <div className="mt-8 space-y-6 flex-1">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/45 mb-3">
                    {t.size}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`min-w-[2.75rem] px-3 py-2 text-sm font-medium border transition-colors ${
                          size === s
                            ? "border-[#C9A227] bg-[#C9A227]/10 text-[#C9A227]"
                            : "border-white/15 text-white/85 hover:border-white/35"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/45 mb-3">
                    {t.color}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        className={`px-3 py-2 text-sm font-medium border transition-colors ${
                          color === c
                            ? "border-[#C9A227] bg-[#C9A227]/10 text-[#C9A227]"
                            : "border-white/15 text-white/85 hover:border-white/35"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-white/50 mb-4">{t.orderHint}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openWhatsApp(t.whatsappMsg(product, size, color))}
                  className="flex-1 py-3.5 px-4 text-sm font-semibold uppercase tracking-[0.12em] bg-[#C9A227] text-black hover:bg-[#d4b82e] transition-colors rounded-sm"
                >
                  {t.orderWhatsapp}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, size, color);
                    onClose();
                  }}
                  className="flex-1 py-3.5 px-4 text-sm font-semibold uppercase tracking-[0.12em] border border-white/25 text-white hover:bg-white/5 transition-colors rounded-sm"
                >
                  {t.addCart}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
