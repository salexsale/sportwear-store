"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { openWhatsApp } from "@/lib/whatsapp";

const COPY = {
  es: {
    title: "Tu carrito",
    empty: "Tu carrito está vacío",
    total: "Total",
    checkout: "Pedir por WhatsApp",
    whatsapp: (lines: string, total: string) =>
      `Hola, quiero pedir:\n${lines}\nTotal: €${total}`,
    line: (name: string, q: number, size: string, color: string, price: string) =>
      `• ${name} x${q} | Talla ${size} | ${color} | €${price}`,
  },
  en: {
    title: "Your cart",
    empty: "Your cart is empty",
    total: "Total",
    checkout: "Order via WhatsApp",
    whatsapp: (lines: string, total: string) =>
      `Hi, I'd like to order:\n${lines}\nTotal: €${total}`,
    line: (name: string, q: number, size: string, color: string, price: string) =>
      `• ${name} x${q} | Size ${size} | ${color} | €${price}`,
  },
};

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { lang } = useLanguage();
  const t = COPY[lang];

  const checkout = () => {
    if (cart.length === 0) return;
    const lines = cart
      .map((item) =>
        t.line(
          item.name,
          item.quantity,
          item.selectedSize,
          item.selectedColor,
          (item.price * item.quantity).toFixed(2)
        )
      )
      .join("\n");
    openWhatsApp(t.whatsapp(lines, cartTotal.toFixed(2)));
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] text-white z-50 border-l border-white/10 flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#C9A227]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">{t.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/5 rounded-sm transition-colors text-white/80"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/40 text-sm">
                  <ShoppingBag size={44} className="mb-4 opacity-50" />
                  <p>{t.empty}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex gap-4 p-4 bg-white/[0.04] border border-white/[0.08]"
                    >
                      <div className="w-20 h-24 bg-[#111] overflow-hidden flex-shrink-0 border border-white/10">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm leading-snug">{item.name}</h3>
                        <p className="text-xs text-white/45 mt-1">
                          {item.selectedSize} · {item.selectedColor}
                        </p>
                        <p className="text-[#C9A227] font-semibold tabular-nums mt-2">
                          €{item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                          className="p-1 text-white/45 hover:text-white transition-colors"
                          aria-label="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                        <div className="flex items-center gap-1 border border-white/15 rounded-sm">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)
                            }
                            className="p-1.5 hover:bg-white/5"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-medium w-5 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)
                            }
                            className="p-1.5 hover:bg-white/5"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-white/10 p-6 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-[0.14em] text-white/45">{t.total}</span>
                  <span className="text-2xl font-semibold tabular-nums text-[#C9A227]">
                    €{cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={checkout}
                  className="w-full py-3.5 text-xs font-semibold uppercase tracking-[0.16em] bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors rounded-sm"
                >
                  {t.checkout}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
