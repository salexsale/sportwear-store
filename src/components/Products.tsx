"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import { useCart, Product } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Camiseta Real Madrid 24/25",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=400&fit=crop",
    category: "LaLiga",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blanco", "Negro"],
  },
  {
    id: 2,
    name: "Camiseta Barcelona 24/25",
    price: 94.99,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop",
    category: "LaLiga",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Azul", "Rojo"],
  },
  {
    id: 3,
    name: "Camiseta Manchester United 24/25",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=400&fit=crop",
    category: "Premier League",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Rojo", "Blanco"],
  },
  {
    id: 4,
    name: "Camiseta PSG 24/25",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop",
    category: "Ligue 1",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Azul", "Blanco"],
  },
  {
    id: 5,
    name: "Camiseta Juventus 24/25",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=400&h=400&fit=crop",
    category: "Serie A",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Negro", "Blanco"],
  },
  {
    id: 6,
    name: "Camiseta Bayern München 24/25",
    price: 87.99,
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop",
    category: "Bundesliga",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Rojo", "Blanco"],
  },
  {
    id: 7,
    name: "Camiseta Selección España 24/25",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=400&fit=crop",
    category: "Selección",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Rojo", "Amarillo"],
  },
  {
    id: 8,
    name: "Camiseta Selección Argentina 24/25",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=400&fit=crop",
    category: "Selección",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Celeste", "Blanco"],
  },
];

const CATEGORIES = ["Todos", "LaLiga", "Premier League", "Ligue 1", "Serie A", "Bundesliga", "Selección"];

const CONTENT = {
  es: {
    title: "Nuestras Camisetas",
    subtitle: "Encuentra la camiseta de tu equipo favorito",
    addToCart: "Añadir al carrito",
    added: "¡Añadido!",
    filter: "Filtrar por",
  },
  en: {
    title: "Our Jerseys",
    subtitle: "Find your favorite team jersey",
    addToCart: "Add to cart",
    added: "Added!",
    filter: "Filter by",
  },
};

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { lang } = useLanguage();
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);
  const t = CONTENT[lang];

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
    >
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-black/80 text-white text-xs font-medium px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
        <p className="text-2xl font-black text-[#6BBF9E] mb-4">€{product.price.toFixed(2)}</p>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Talla</p>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 text-sm font-medium rounded-lg border transition-all ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <p className="text-xs text-gray-500 mb-2">Color</p>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${
                  selectedColor === color
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
            added
              ? "bg-green-500 text-white"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          {added ? t.added : t.addToCart}
        </button>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const t = CONTENT[lang];

  const filteredProducts = activeCategory === "Todos"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-3">{t.title}</h2>
          <p className="text-gray-500 text-lg">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-black text-white"
                  : "bg-white border border-gray-200 hover:border-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}