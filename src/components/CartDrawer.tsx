"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { openWhatsApp } from "@/lib/whatsapp";

const COPY = {
  es: {
    title: "Tu equipación",
    empty: "Aún no hay camisetas en la bolsa",
    total: "Total",
    checkout: "Pedir por WhatsApp",
    whatsapp: (lines: string, total: string) =>
      `Hola, quiero pedir:\n${lines}\nTotal: €${total}`,
    line: (name: string, q: number, size: string, color: string, price: string) =>
      `• ${name} x${q} | Talla ${size} | ${color} | €${price}`,
  },
  en: {
    title: "Your kit bag",
    empty: "No jerseys in your bag yet",
    total: "Total",
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
            className="fixed inset-0 z-50 bg-[#0f172a]/30 backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#f0f3ef] text-[#0f172a] z-50 border-l border-[#166534]/15 flex flex-col shadow-[-16px_0_48px_-20px_rgba(15,23,42,0.25)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <div className="h-1 w-full bg-gradient-to-r from-[#166534] via-[#facc15] to-[#166534]" />
            <div className="flex items-center justify-between px-5 py-4 bg-[#0f172a] text-white">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} strokeWidth={2} className="text-[#facc15]" />
                <h2 className="text-[14px] font-black uppercase tracking-[0.12em]">{t.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 hover:bg-white/20 transition-colors text-white"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-[#5c6b63] text-[15px] font-medium">
                  <ShoppingBag size={40} className="mb-3 opacity-35 text-[#166534]" strokeWidth={1.25} />
                  <p>{t.empty}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex gap-4 rounded-sm bg-white p-4 border-2 border-[#0f172a]/8 shadow-md"
                    >
                      <div className="w-[72px] h-[88px] bg-gradient-to-br from-[#e8efe9] to-[#dce8de] overflow-hidden flex-shrink-0 rounded-2xl ring-1 ring-[#166534]/10">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[14px] leading-snug">{item.name}</h3>
                        <p className="text-[12px] text-[#5c6b63] mt-1">
                          {item.selectedSize} · {item.selectedColor}
                        </p>
                        <p className="font-bold tabular-nums mt-2 text-[15px] text-[#166534]">
                          €{item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                          className="p-1 text-[#5c6b63] hover:text-[#0f172a]"
                          aria-label="Eliminar"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                        <div className="flex items-center gap-0 rounded-full bg-[#e8efe9] p-0.5 ring-1 ring-[#166534]/15">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/90"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-[13px] font-bold w-5 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/90"
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
              <div className="border-t border-[#166534]/10 bg-white p-5 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-[13px] font-semibold text-[#5c6b63]">{t.total}</span>
                  <span className="text-[1.5rem] font-bold tabular-nums text-[#166534]">
                    €{cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={checkout}
                  className="w-full rounded-sm bg-[#25D366] py-3.5 text-[13px] font-black uppercase tracking-wide text-white hover:bg-[#20bd5a] transition-colors shadow-lg"
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
