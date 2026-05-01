"use client";

import { motion } from "framer-motion";
import { ArrowDown, Zap, Truck, Shield, CreditCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CONTENT = {
  es: {
    badge: "🔥 Nueva Colección 24/25",
    title: "Viste a tu",
    titleHighlight: "equipo favorito",
    subtitle: "Camisetas oficiales de los mejores clubes del mundo. Envío gratis en pedidos +50€.",
    cta: "Ver Colección",
    shipping: "Envío gratis +50€",
    returns: "30 días devolución",
    authenticity: "100% original",
    secure: "Pago seguro",
  },
  en: {
    badge: "🔥 New Collection 24/25",
    title: "Wear your",
    titleHighlight: "favorite team",
    subtitle: "Official jerseys from the best clubs in the world. Free shipping on orders +50€.",
    cta: "View Collection",
    shipping: "Free shipping +50€",
    returns: "30 days returns",
    authenticity: "100% authentic",
    secure: "Secure payment",
  },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.6, 0, 0.05, 1] as [number, number, number, number] },
});

export default function Hero() {
  const { lang } = useLanguage();
  const t = CONTENT[lang];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAFAFA] via-white to-[#E8F5E9]"
    >
      <motion.div
        className="absolute top-[-8%] right-[-4%] w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(107,191,158,0.25), transparent 68%)",
        }}
        animate={{ x: [0, 25, 0], y: [0, -18, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-6%] left-[-4%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(91,168,212,0.2), transparent 68%)",
        }}
        animate={{ x: [0, -18, 0], y: [0, 22, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.span
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6BBF9E] to-[#5BA8D4] text-white text-sm font-semibold px-4 py-2 rounded-full mb-6"
          >
            {t.badge}
          </motion.span>

          <motion.h1 {...fadeUp(0.2)} className="text-5xl md:text-7xl font-black leading-tight mb-4">
            {t.title}{" "}
            <span className="bg-gradient-to-r from-[#6BBF9E] to-[#5BA8D4] bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </motion.h1>

          <motion.p {...fadeUp(0.3)} className="text-lg text-gray-600 mb-8 max-w-md">
            {t.subtitle}
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all hover:scale-105"
            >
              {t.cta}
              <ArrowDown size={18} />
            </a>
          </motion.div>

          <motion.div
            {...fadeUp(0.5)}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
          >
            {[
              { icon: Truck, label: t.shipping },
              { icon: Shield, label: t.authenticity },
              { icon: Zap, label: t.returns },
              { icon: CreditCard, label: t.secure },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-center">
                <div className="w-10 h-10 bg-[#6BBF9E]/10 rounded-full flex items-center justify-center">
                  <Icon size={18} className="text-[#6BBF9E]" />
                </div>
                <span className="text-xs text-gray-600 font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.6, 0, 0.05, 1] }}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6BBF9E]/20 to-[#5BA8D4]/20 rounded-full animate-pulse" />
            <div className="absolute inset-4 bg-gradient-to-br from-[#6BBF9E]/30 to-[#5BA8D4]/30 rounded-full" />
            <img
              src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&h=600&fit=crop"
              alt="Camiseta deportiva"
              className="absolute inset-8 w-full h-full object-cover rounded-3xl shadow-2xl"
            />
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
          >
            <p className="text-2xl font-black text-[#6BBF9E]">€89.99</p>
            <p className="text-xs text-gray-500">Real Madrid 24/25</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#products" className="text-gray-400 hover:text-[#6BBF9E] transition-colors">
          <ArrowDown size={24} />
        </a>
      </motion.div>
    </section>
  );
}