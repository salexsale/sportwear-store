"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { openWhatsApp } from "@/lib/whatsapp";

const COPY = {
  es: {
    title: "Bolsa",
    empty: "Tu bolsa está vacía",
    total: "Subtotal",
    checkout: "Pedir por WhatsApp",
    whatsapp: (lines: string, total: string) =>
      `Hola, quiero pedir:\n${lines}\nTotal: €${total}`,
    line: (name: string, q: number, size: string, color: string, price: string) =>
      `• ${name} x${q} | Talla ${size} | ${color} | €${price}`,
  },
  en: {
    title: "Bag",
    empty: "Your bag is empty",
    total: "Subtotal",
    checkout: "Order on WhatsApp",
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
            className="fixed inset-0 z-50 bg-black/25 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#f5f5f7] text-[#1d1d1f] z-50 border-l border-black/[0.06] flex flex-col shadow-[-12px_0_40px_-15px_rgba(0,0,0,0.2)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06] bg-white/80 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-[#1d1d1f]" />
                <h2 className="text-[17px] font-semibold">{t.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8e8ed] hover:bg-[#dedee3] transition-colors"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-[#6e6e73] text-[15px]">
                  <ShoppingBag size={40} className="mb-3 opacity-40" strokeWidth={1.25} />
                  <p>{t.empty}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex gap-4 rounded-[20px] bg-white p-4 border border-black/[0.06] shadow-sm"
                    >
                      <div className="w-[72px] h-[88px] bg-[#f5f5f7] overflow-hidden flex-shrink-0 rounded-2xl">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[14px] leading-snug">{item.name}</h3>
                        <p className="text-[12px] text-[#6e6e73] mt-1">
                          {item.selectedSize} · {item.selectedColor}
                        </p>
                        <p className="font-semibold tabular-nums mt-2 text-[15px]">€{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                          className="p-1 text-[#6e6e73] hover:text-[#1d1d1f]"
                          aria-label="Eliminar"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                        <div className="flex items-center gap-0 rounded-full bg-[#e8e8ed] p-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/80"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-[13px] font-medium w-5 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/80"
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
              <div className="border-t border-black/[0.06] bg-white p-5 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-[13px] text-[#6e6e73]">{t.total}</span>
                  <span className="text-[1.5rem] font-semibold tabular-nums">€{cartTotal.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  onClick={checkout}
                  className="w-full rounded-full bg-[#25D366] py-3.5 text-[15px] font-medium text-white hover:bg-[#20bd5a] transition-colors"
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
