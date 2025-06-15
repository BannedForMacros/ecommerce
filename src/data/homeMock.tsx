// src/data/homeMock.ts
import { Product, Category } from '@/types';

export const promos: Product[] = [
  { id: '1', name: 'Fideo Don Vitorio Tallarin 1Kg', price: 2.50, originalPrice: 3.50, image: 'fideos', discount: 28 },
  { id: '2', name: 'Arroz Superior 5kg', price: 18.90, originalPrice: 22.50, image: 'arroz', discount: 16 },
  { id: '3', name: 'Azúcar Rubia Cartavio 1kg', price: 3.20, originalPrice: 4.10, image: 'azucar', discount: 22 },
  { id: '4', name: 'Aceite Primor 1Lt', price: 8.50, originalPrice: 10.50, image: 'aceite', discount: 19 },
  { id: '5', name: 'Leche Gloria Entera 1Lt', price: 4.20, originalPrice: 4.80, image: 'leche', discount: 12 },
  { id: '6', name: 'Pan Bimbo Molde Grande', price: 5.50, originalPrice: 6.20, image: 'pan', discount: 11 },
];

export const best: Product[] = [
  { id: '7', name: 'Atún A-1 Filete en Aceite 170g', price: 4.90, image: 'atun' },
  { id: '8', name: 'Galletas Margarita Clásicas 6 pack', price: 8.50, image: 'galleta' },
  { id: '9', name: 'Yogurt Gloria Fresa 1Lt', price: 6.20, image: 'yogurt' },
  { id: '10', name: 'Huevos Pardos San Fernando x30', price: 15.50, image: 'huevos' },
  { id: '11', name: 'Pollo Entero San Fernando', price: 12.90, image: 'pollo' },
  { id: '12', name: 'Detergente Ariel 780g', price: 11.50, image: 'detergente' },
];

export const newProducts: Product[] = [
  { id: '13', name: 'Café Nescafé Clásico 170g', price: 15.90, image: 'cafe' },
  { id: '14', name: 'Avena Quaker Hojuelas 490g', price: 7.80, image: 'avena' },
  { id: '15', name: 'Mayonesa Alacena 475ml', price: 6.30, image: 'mayonesa' },
  { id: '16', name: 'Papel Higiénico Elite 12 rollos', price: 18.90, image: 'papel' },
  { id: '17', name: 'Jabón Dove Beauty Bar 90g', price: 3.50, image: 'jabon' },
  { id: '18', name: 'Shampoo Head & Shoulders 400ml', price: 14.90, image: 'shampoo' },
];

export const categories: Category[] = [
  { id: 'c1', name: 'Lleva un estilo de vida saludable', image: 'saludable.jpg' },
  { id: 'c2', name: 'Lo que necesitas para tu bar',       image: 'bar.jpg' },
  { id: 'c3', name: 'Todos los abarrotes para tu cocina', image: 'abarrotes.jpg' },
  { id: 'c4', name: 'Complementos para tu parrilla',      image: 'parrilla.jpg' },
  { id: 'c5', name: 'Dulces & Chocolates',                image: 'dulces.jpg' },
];