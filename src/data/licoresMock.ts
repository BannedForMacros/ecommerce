import type { Product } from '@/components/sections/ProductSection';

/* URL única para las fotos (no requiere copiar nada al proyecto) */
const PIC =
  'https://www.licoresalis.com/web/image/4715-07c93907/Imagen-1.jpg';

/* helper para generar rápidamente un producto */
const prod = (id: number, name: string, price: number): Product => ({
  id,
  name,
  price,
  image: PIC,           // ← siempre la misma foto remota
  rating: 4.5,
  reviews: 10 + id,
});

/* ─────────  Mocks por sub-categoría  ───────── */

export const cervezas = [
  prod(1,  'Cerveza Lager 355 ml',  8.9),
  prod(2,  'Cerveza Pilsen 1 L',    11.5),
  prod(3,  'Cerveza IPA 500 ml',    12.1),
  prod(4,  'Cerveza Stout 330 ml',  10.9),
  prod(5,  'Cerveza Trigo 355 ml',  9.2),
  prod(6,  'Cerveza APA 330 ml',    9.5),
  prod(7,  'Cerveza Blonde 355 ml', 8.8),
  prod(8,  'Cerveza Porter 330 ml', 10.4),
];

export const whiskys = [
  prod(11, 'Whisky 12 años 750 ml',    129.9),
  prod(12, 'Whisky Single Malt 700 ml',159.0),
  prod(13, 'Whisky Bourbon 1 L',       145.5),
  prod(14, 'Whisky Rye 700 ml',        133.0),
  prod(15, 'Whisky Blended 1 L',       119.9),
  prod(16, 'Whisky Irish 750 ml',      139.5),
  prod(17, 'Whisky Japones 700 ml',    189.0),
  prod(18, 'Whisky Cask Strength',     215.0),
];

export const cocteles = [
  prod(21, 'Cóctel Mojito RTD',        11.9),
  prod(22, 'Cóctel Piña Colada RTD',   12.5),
  prod(23, 'Cóctel Sex-on-the-Beach',  13.2),
  prod(24, 'Cóctel Margarita RTD',     11.8),
  prod(25, 'Cóctel Daiquiri RTD',      12.1),
  prod(26, 'Cóctel Moscow Mule RTD',   13.4),
  prod(27, 'Cóctel Cosmopolitan RTD',  12.9),
  prod(28, 'Cóctel Caipiriña RTD',     11.6),
];

export const vinos = [
  prod(31, 'Vino Tinto Reserva 750 ml', 25.5),
  prod(32, 'Vino Blanco Seco 750 ml',   23.9),
  prod(33, 'Vino Rosé 750 ml',         24.4),
  prod(34, 'Vino Malbec 750 ml',       27.0),
  prod(35, 'Vino Cabernet 750 ml',     26.5),
  prod(36, 'Vino Blend Premium 750 ml',31.2),
  prod(37, 'Vino Syrah 750 ml',        28.1),
  prod(38, 'Vino Chardonnay 750 ml',   24.9),
];

export const licoresVarios = [
  prod(41, 'Licor de Café 700 ml',      46.9),
  prod(42, 'Licor de Hierbas 700 ml',   42.5),
  prod(43, 'Licor de Almendras 700 ml', 39.8),
  prod(44, 'Licor Triple Sec 700 ml',   36.4),
  prod(45, 'Licor de Coco 700 ml',      38.2),
  prod(46, 'Licor de Menta 700 ml',     37.0),
  prod(47, 'Licor de Naranja 700 ml',   40.1),
  prod(48, 'Licor de Avellanas 700 ml', 42.8),
];

/* export agrupado */
export const MOCK_LICORES = {
  Cervezas: cervezas,
  Whiskys: whiskys,
  Cócteles: cocteles,
  Vinos: vinos,
  'Licores varios': licoresVarios,
};
