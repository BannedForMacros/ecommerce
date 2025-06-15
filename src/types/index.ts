// src/types/index.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // opcional, si no hay descuento
    discount?: number;      // porcentaje de descuento, si aplica
  image: string;          // nombre del SVG en /public/icons
}

export interface Category {
  id: string;
  name: string;
  image: string;
}
