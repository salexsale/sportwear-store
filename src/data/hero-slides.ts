/**
 * Imágenes del carrusel principal (lado derecho del hero).
 *
 * Cómo cambiarlas:
 * 1. Sustituye `src` por la URL de tu imagen (o ruta en /public, ej. "/mi-foto.jpg").
 * 2. Ajusta `alt` para accesibilidad.
 * 3. Puedes añadir o quitar entradas del array; el hero rotará automáticamente.
 *
 * Recomendado: ~1920px de ancho, ratio horizontal, comprimida (WebP/JPEG).
 */
export type HeroSlide =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; alt: string };

export const HERO_SLIDES: HeroSlide[] = [
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1920&q=80",
    alt: "Fútbol",
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&q=80",
    alt: "Camiseta",
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80",
    alt: "Estadio",
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1920&q=80",
    alt: "Campo",
  },
];
