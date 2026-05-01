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
    orderWhatsapp: "Pedir por WhatsApp",
    orderHint: "Se abrirá WhatsApp con tu camiseta y opciones elegidas.",
    addCart: "Añadir al carrito",
    close: "Cerrar",
    whatsappMsg: (p: Product, size: string, color: string) =>
      `Hola, la quiero: ${p.name} | Talla: ${size} | Color: ${color} | Precio: €${p.price.toFixed(2)}`,
  },
  en: {
    size: "Size",
    color: "Color",
    orderWhatsapp: "Order on WhatsApp",
    orderHint: "WhatsApp opens with your jersey and selected options.",
    addCart: "Add to bag",
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
            className="fixed inset-0 z-[60] bg-black/32 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed z-[61] left-1/2 top-1/2 w-[min(100vw-1.25rem,920px)] max-h-[min(92vh,860px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] bg-white shadow-[0_25px_80px_-20px_rgba(0,0,0,0.35)] flex flex-col md:flex-row border border-black/[0.06]"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#e8e8ed] text-[#1d1d1f] hover:bg-[#dedee3] transition-colors"
              aria-label={t.close}
            >
              <X size={18} strokeWidth={2} />
            </button>

            <div className="relative w-full md:w-[50%] aspect-[4/5] md:aspect-auto md:min-h-[440px] bg-[#f5f5f7]">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-[#1d1d1f] backdrop-blur-sm">
                {product.category}
              </span>
            </div>

            <div className="flex flex-col flex-1 p-6 md:p-10 md:pt-11 text-[#1d1d1f]">
              {product.badge && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#f56300] mb-1">
                  {product.badge}
                </p>
              )}
              <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-tight pr-10">
                {product.name}
              </h2>
              <p className="mt-4 text-[1.75rem] font-semibold tabular-nums tracking-tight">
                €{product.price.toFixed(2)}
              </p>

              <div className="mt-8 space-y-6 flex-1">
                <div>
                  <p className="text-[12px] font-medium text-[#6e6e73] mb-2">{t.size}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`min-w-[2.75rem] rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors ${
                          size === s
                            ? "bg-[#1d1d1f] text-white"
                            : "bg-[#e8e8ed] text-[#1d1d1f] hover:bg-[#dedee3]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#6e6e73] mb-2">{t.color}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        className={`rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors ${
                          color === c
                            ? "bg-[#1d1d1f] text-white"
                            : "bg-[#e8e8ed] text-[#1d1d1f] hover:bg-[#dedee3]"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[13px] text-[#6e6e73] mb-4">{t.orderHint}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openWhatsApp(t.whatsappMsg(product, size, color))}
                  className="flex-1 rounded-full bg-[#25D366] py-3.5 text-[15px] font-medium text-white hover:bg-[#20bd5a] transition-colors"
                >
                  {t.orderWhatsapp}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, size, color);
                    onClose();
                  }}
                  className="flex-1 rounded-full border border-[#1d1d1f]/20 bg-transparent py-3.5 text-[15px] font-medium text-[#1d1d1f] hover:bg-black/[0.04] transition-colors"
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
