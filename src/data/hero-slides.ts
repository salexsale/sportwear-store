/**
 * Carrusel del hero: imagen + titular en dos líneas por slide.
 *
 * · Imágenes: `src` (URL o "/archivo-en-public.jpg"), `alt`.
 * · Frases: `line1` y `line2` en español e inglés (aparecen en grande a la izquierda).
 */
export type HeroSlide =
  | {
      kind: "image";
      src: string;
      alt: string;
      line1: { es: string; en: string };
      line2: { es: string; en: string };
    }
  | {
      kind: "video";
      src: string;
      alt: string;
      line1: { es: string; en: string };
      line2: { es: string; en: string };
    };

export const HERO_SLIDES: HeroSlide[] = [
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1920&q=80",
    alt: "Fútbol",
    line1: { es: "FÚTBOL", en: "FOOTBALL" },
    line2: { es: "PARA TODOS", en: "FOR EVERYONE" },
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&q=80",
    alt: "Camiseta",
    line1: { es: "VISTE", en: "WEAR" },
    line2: { es: "TU PASIÓN", en: "YOUR PASSION" },
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80",
    alt: "Estadio",
    line1: { es: "TEMPORADA", en: "SEASON" },
    line2: { es: "24 / 25", en: "24 / 25" },
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1920&q=80",
    alt: "Campo",
    line1: { es: "LISTOS", en: "MATCH" },
    line2: { es: "PARA EL PARTIDO", en: "DAY READY" },
  },
];
