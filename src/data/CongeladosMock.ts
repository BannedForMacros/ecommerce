import type { Product } from '@/components/sections/ProductSection'

const p = (id: number, n: string, pr: number, img: string = ''): Product => ({
  id,
  name: n,
  price: pr,
  image: img,       // ← sin URL
  rating: 4.4,
  reviews: 7 + id,
})

/* ─────────  sub-categorías  ───────── */

export const Camarones = [
  p(1, 'Camarón Vannamei 500 g', 25.9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5jdoH_7352pDDZQzZcsVWyezW1_XJB8AQhw&s'),
  p(2, 'Colas de Langostino 400 g', 28.5, 'https://wongfood.vtexassets.com/arquivos/ids/684166/Colas-con-C-scara-de-Langostinos-Cuisine-Co-Mediano-400g-1-351657576.jpg?v=638394792683500000'),
  p(3, 'Camarón Empanizado 500 g', 22.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNtsxLSyUcl3f2ues_fLuvBi-Dpvev78e4rw&s'),
  p(4, 'Cocktail de Mariscos 500 g', 18.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbDehLHeoh40EBba-3wBCiByt1jQfAAa0-r0OMf52IVN7ZouaueveSd-UDEi5E3vFoidM&usqp=CAU'),
  p(5, 'Langostino Entero 1 kg', 35.9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5kgJNMOP3r6fA2PsGupnMZki9LnbJZCEfZQ&s'),
]

export const Mariscos = [
  p(11, 'Pulpo Cocido 500 g', 29.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXJe62TeXnh75C6mNu8ZsUH5KDcn31zhZWIQ&s'),
  p(12, 'Calamar Anillas 500 g', 19.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJSl0V-qZ5lhhy_zDT1GcjIZyiflQC0zMWGw&s'),
  p(13, 'Mejillón Limpio 800 g', 17.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTysVvoJu7r8aoSNvK37_wvBcoo1KxukPQegA&s'),
  p(14, 'Concha de Abanico 400 g', 24.4, 'https://metroio.vtexassets.com/arquivos/ids/251773-800-auto?v=638173961569130000&width=800&height=auto&aspect=true'),
  p(15, 'Mix Paella 500 g', 23.9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1SAstnM3gk1YAndtXII9HH4t6tUdO-rwcCg&s'),
]

export const Carnes = [
  p(21, 'Bife Angosto 500 g', 26.9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdyoGKlM3fl6mc0-GvdOTPhrqhB0OdRrJh_g&s'),
  p(22, 'Pechuga de Pollo 1 kg', 18.5, 'https://metroio.vtexassets.com/arquivos/ids/275232/Pechuga-Especial-de-Pollo-x-kg-1-217030.jpg?v=638179301933730000'),
  p(23, 'Lomo de Cerdo 800 g', 21.0, 'https://unimarc.vtexassets.com/arquivos/ids/215104/000000000000179912-UN-01.jpg?v=638386096538630000'),
  p(24, 'Carne Molida Res 500 g', 14.9, 'https://avinkape.vtexassets.com/arquivos/ids/155843/Carne-molida-500g.jpg?v=638435351198670000'),
  p(25, 'Alitas BBQ 1 kg', 22.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99cw3j0ronNJKaF10KwU1GBuzShh8Cmg-Xg&s'),
]

export const Nuggets = [
  p(31, 'Nuggets Pollo 700 g', 16.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzteEQscvxk1TKtd0y3NoIJyqmG28nK7HqTA&s'),
  p(32, 'Nuggets Mix Verduras 500 g', 14.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBYm37Qz-ZJ5RY7q9PMZ7aBH4CduG8FWYEPw&s'),
  p(33, 'Tiras Crispy 600 g', 17.8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5cfBMPTofFJ6lC35BW0XhlGmyCxN6KIG17g&s'),
  p(34, 'Trozos Empanizados 500 g', 15.9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaTKOkpiju4w1iCsFgSrv3Evx_utSfHrj62g&s'),
  p(35, 'Nuggets Quinoa 400 g', 13.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0JqHSMw2b2_eoV0ANTclgv23WNqnK2WFQAw&s'),
]

/* ─────────  export agrupado  ───────── */

export const MOCK_CONGELADOS = {
  Camarones,
  Mariscos,
  Carnes,
  Nuggets,
}

export default MOCK_CONGELADOS
