import type { Product } from '@/components/sections/ProductSection'

const p = (id: number, name: string, price: number, img: string = ''): Product => ({
  id,
  name,
  price,
  image: img,     // ← cadena vacía
  rating: 4.5,
  reviews: 8 + id,
})

/* ─────────  sub-categorías  ───────── */

export const Arroz = [
  p(1,  'Arroz Extra Costeño 5 kg', 23.9, 'https://plazavea.vteximg.com.br/arquivos/ids/27552451-418-418/641425.jpg'),
  p(2,  'Arroz Integral 1 kg',      6.5,  'https://plazavea.vteximg.com.br/arquivos/ids/5107728-450-450/20131232.jpg?v=637770594855530000'),
  p(3,  'Arroz Sushi 2 kg',        18.0,  'https://icbfs.vtexassets.com/arquivos/ids/172941/104529990.jpg?v=637908334848600000'),
  p(4,  'Arroz Jazmín 1 kg',       9.2,  'https://m.media-amazon.com/images/I/71LzgQLUJsL._SL1500_.jpg'),
  p(5,  'Arroz Basmati 1 kg',     11.0,  'https://http2.mlstatic.com/D_NQ_NP_703121-MLU70951884626_082023-O.webp'),
]

export const Azucar = [
  p(11, 'Azúcar Bells Rubia 1 kg',        3.7, 'https://plazavea.vteximg.com.br/arquivos/ids/423248-418-418/20198552.jpg'),
  p(12, 'Azúcar Bells Blanca 5 kg',      17.5, 'https://plazavea.vteximg.com.br/arquivos/ids/423247-450-450/20198550.jpg?v=637377101283870000'),
  p(13, 'Endulzante Stevia 200 g',  9.9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuBOSN6hVNZ6ZfkwSRwSRjTfrmm2pqCK87JA&s'),
  p(14, 'Azúcar Orgánica 1 kg',     6.8, 'https://http2.mlstatic.com/D_NQ_NP_827083-MLM49356924481_032022-O.webp'),
  p(15, 'Papelón Panela 500 g',     5.4, 'https://arsenna.com/wp-content/uploads/2024/08/PANELA-X1KG.jpg'),
]

export const Menestras = [
  p(21, 'Lenteja Canadiense 500 g', 4.1, 'https://importacionesdionys.com.pe/wp-content/uploads/2020/03/Saco-de-Lenteja-Eston-Canadiense.jpg'),
  p(22, 'Frijol Canario 500 g',     4.3, 'https://plazavea.vteximg.com.br/arquivos/ids/27552455-512-512/995418.jpg'),
  p(23, 'Garbanzos 500 g',          4.6, 'https://florayfauna.vtexassets.com/arquivos/ids/156884-800-auto?v=637596315795700000&width=800&height=auto&aspect=true'),
  p(24, 'Arvejas Partidas 500 g',   3.9, 'https://plazavea.vteximg.com.br/arquivos/ids/2326799-450-450/20220365.jpg?v=637660566867230000'),
  p(25, 'Frejol Negro 1 kg',        6.8, 'https://plazavea.vteximg.com.br/arquivos/ids/27552442-418-418/3840.jpg'),
]

export const Aceites = [
  p(31, 'Aceite Vegetal 1 L',              10.5, 'https://www.lagranbodega.com.pe/public/images/products/770043.jpg'),
  p(32, 'Aceite de Oliva Extra Virgen 500 ml', 22.9, 'https://plazavea.vteximg.com.br/arquivos/ids/550600-450-450/2204.jpg?v=637425698958330000'),
  p(33, 'Aceite de Coco 300 ml',           15.0, 'https://oechsle.vteximg.com.br/arquivos/ids/15363313-1000-1000/image-a669c84085b94b3caac809e00ec6a39b.jpg?v=638282636778170000'),
  p(34, 'Spray de Canola 170 g',           11.0, 'https://plazavea.vteximg.com.br/arquivos/ids/30388190-418-418/16880.jpg'),
  p(35, 'Ghee Clarificado 200 g',          18.5, 'https://karavansay.com/wp-content/uploads/2021/09/Ghee-x420-7-600x600.jpg'),
]

export const Aderezos = [
  p(41, 'Mayonesa 475 g',      6.2, 'https://plazavea.vteximg.com.br/arquivos/ids/30426040-450-450/994931.jpg?v=638730875297270000'),
  p(42, 'Mostaza Dijon 200 g', 7.5, 'https://plazavea.vteximg.com.br/arquivos/ids/22587308-418-418/20205708.jpg'),
  p(43, 'Ketchup 397 g',       5.1, 'https://http2.mlstatic.com/D_NQ_NP_879196-MLC53602245035_022023-O.webp'),
  p(44, 'Salsa BBQ 400 g',     8.3, 'https://olimpica.vtexassets.com/arquivos/ids/1431560-800-450?v=638521699510470000&width=800&height=450&aspect=true'),
  p(45, 'Salsa de Soya Light 150 ml', 4.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgmqwP7Hn5-xDXU1GZVSR4eLtumsGkSh213g&s'),
]

/* ─────────  export agrupado  ───────── */

export const MOCK_ABARROTES = {
  Arroz,
  Azucar,
  Menestras,
  Aceites,
  Aderezos,
}

export default MOCK_ABARROTES
