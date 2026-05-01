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
    orderHint: "Abrimos WhatsApp con tu camiseta y las opciones que elijas.",
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
            className="fixed inset-0 z-[60] bg-[#0f172a]/40 backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed z-[61] left-1/2 top-1/2 w-[min(100vw-1.25rem,920px)] max-h-[min(92vh,860px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-tl-lg rounded-tr-2xl rounded-br-lg rounded-bl-2xl bg-white shadow-[0_32px_90px_-28px_rgba(15,23,42,0.55)] flex flex-col md:flex-row ring-2 ring-[#0f172a]/10"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
          >
            <div className="flex h-2 w-full shrink-0 overflow-hidden md:hidden">
              <div className="h-full flex-[2] bg-[#166534]" />
              <div className="h-full flex-1 bg-white" />
              <div className="h-full flex-[2] bg-[#166534]" />
              <div className="h-full flex-1 bg-[#facc15]" />
              <div className="h-full flex-[2] bg-[#166534]" />
            </div>
            <div className="hidden md:block h-full w-2 shrink-0 bg-gradient-to-b from-[#166534] via-[#facc15] to-[#166534]" />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-10 md:top-4 z-10 flex h-9 w-9 items-center justify-center rounded-sm bg-[#0f172a] text-white hover:bg-[#166534] transition-colors"
              aria-label={t.close}
            >
              <X size={18} strokeWidth={2} />
            </button>

            <div className="relative w-full md:w-[50%] aspect-[4/5] md:aspect-auto md:min-h-[440px] bg-gradient-to-br from-[#e8efe9] to-[#dce8de]">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute left-4 top-14 md:top-4 rounded-sm bg-[#0f172a]/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#facc15] ring-1 ring-white/20">
                {product.category}
              </span>
            </div>

            <div className="flex flex-col flex-1 p-6 md:p-10 md:pt-11 text-[#0f172a]">
              {product.badge && (
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#ca8a04] mb-1">
                  {product.badge}
                </p>
              )}
              <h2 className="text-2xl md:text-[1.65rem] font-black uppercase tracking-tight leading-tight pr-10">
                {product.name}
              </h2>
              <p className="mt-4 text-[1.85rem] font-black tabular-nums tracking-tight text-[#166534]">
                €{product.price.toFixed(2)}
              </p>

              <div className="mt-8 space-y-6 flex-1">
                <div>
                  <p className="text-[12px] font-semibold text-[#5c6b63] mb-2 uppercase tracking-wide">
                    {t.size}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`min-w-[2.75rem] rounded-sm px-3.5 py-2 text-[14px] font-bold transition-colors ${
                          size === s
                            ? "bg-[#0f172a] text-white shadow-sm"
                            : "bg-[#e8efe9] text-[#0f172a] hover:bg-[#dce8de]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#5c6b63] mb-2 uppercase tracking-wide">
                    {t.color}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        className={`rounded-sm px-3.5 py-2 text-[14px] font-bold transition-colors ${
                          color === c
                            ? "bg-[#0f172a] text-white shadow-sm"
                            : "bg-[#e8efe9] text-[#0f172a] hover:bg-[#dce8de]"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[13px] text-[#5c6b63] mb-4">{t.orderHint}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openWhatsApp(t.whatsappMsg(product, size, color))}
                  className="flex-1 rounded-sm bg-[#25D366] py-3.5 text-[13px] font-black uppercase tracking-wide text-white hover:bg-[#20bd5a] transition-colors shadow-lg"
                >
                  {t.orderWhatsapp}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, size, color);
                    onClose();
                  }}
                  className="flex-1 rounded-sm border-2 border-[#0f172a] bg-transparent py-3.5 text-[13px] font-black uppercase tracking-wide text-[#0f172a] hover:bg-[#0f172a]/5 transition-colors"
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
