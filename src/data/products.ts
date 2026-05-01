import type { Product } from "@/context/CartContext";

/**
 * Catálogo — cada `image` puede ser:
 *   • URL externa, o
 *   • Archivo en /public, ej. `/catalogo/real-madrid.jpg` (pon la foto en `fpt/public/catalogo/`).
 *
 * Imágenes recomendadas (catálogo / hero):
 *   • Producto (ficha y modal): 1200–1600 px de ancho, ratio vertical ~4:5 u 3:4 (ej. 1200×1500).
 *     Formatos: JPG calidad 80–85, o WebP. Peso orientativo < 350 KB por imagen si puedes.
 *   • Hero / banners: 1920×1080 o 1920×1280, misma calidad; que el sujeto esté centrado por si recortamos.
 * En código no hay “resolución fija”: el `object-cover` / `object-contain` adapta; si subes muy pocas
 * pixels se verá borroso en pantallas grandes.
 */
export const CATALOG_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Real Madrid 24/25",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=900&h=1100&fit=crop",
    category: "LaLiga",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blanco", "Negro"],
    cardTheme: "dark",
    badge: "NUEVO",
    tagline: { es: "Primera equipación.", en: "Home kit energy." },
  },
  {
    id: 2,
    name: "Barcelona 24/25",
    price: 94.99,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&h=1100&fit=crop",
    category: "LaLiga",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Azul", "Rojo"],
    cardTheme: "light",
    badge: "NUEVO",
    tagline: { es: "Diseño limpio, listo para el clásico.", en: "Clean design. Match-day ready." },
  },
  {
    id: 3,
    name: "Manchester United 24/25",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&h=1100&fit=crop",
    category: "Premier League",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Rojo", "Blanco"],
    cardTheme: "light",
    tagline: { es: "Tejido transpirable.", en: "Breathable fabric." },
  },
  {
    id: 4,
    name: "PSG 24/25",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=900&h=1100&fit=crop",
    category: "Ligue 1",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Azul", "Blanco"],
    cardTheme: "dark",
    tagline: { es: "Look nocturno.", en: "Night-match look." },
  },
  {
    id: 5,
    name: "Juventus 24/25",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=900&h=1100&fit=crop",
    category: "Serie A",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Negro", "Blanco"],
    cardTheme: "light",
    tagline: { es: "Rayas icónicas.", en: "Iconic stripes." },
  },
  {
    id: 6,
    name: "Bayern München 24/25",
    price: 87.99,
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=900&h=1100&fit=crop",
    category: "Bundesliga",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Rojo", "Blanco"],
    cardTheme: "light",
    badge: "NUEVO",
    tagline: { es: "Rojo Bayern.", en: "Bayern red." },
  },
  {
    id: 7,
    name: "Selección España 24/25",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=900&h=1100&fit=crop",
    category: "Selección",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Rojo", "Amarillo"],
    cardTheme: "light",
    tagline: { es: "La Roja.", en: "National team." },
  },
  {
    id: 8,
    name: "Selección Argentina 24/25",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=900&h=1100&fit=crop",
    category: "Selección",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Celeste", "Blanco"],
    cardTheme: "dark",
    tagline: { es: "Celeste y blanco.", en: "Sky blue & white." },
  },
];
