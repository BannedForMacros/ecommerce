import type { Product } from '@/components/sections/ProductSection'

const p = (id: number, n: string, pr: number, img: string = ''): Product => ({
  id,
  name: n,
  price: pr,
  image: img,          // ← cadena vacía
  rating: 4.3,
  reviews: 6 + id,
})

/* ─────────  sub-categorías  ───────── */

export const Galletas = [
  p(1, 'Galletas Oreo 154 g',                3.9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3exM0OjHXErcmfZ-u5Zjdi5BSyd0Z3nEVQ&s'),
  p(2, 'Galletas Club Social 6 packs',       4.5, 'https://metroio.vtexassets.com/arquivos/ids/518076-800-auto?v=638476113677630000&width=800&height=auto&aspect=true'),
  p(3, 'Galletas de Arroz 130 g',            5.2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOM1E2yaVflcat-2xkNMimGxhhC4YEhkVaxg&s'),
  p(4, 'Crackers Integrales 200 g',          4.8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiH-nwbESE06QPX422LS29dCr-5MYCgNEpuA&s'),
  p(5, 'Wafer de Vainilla 170 g',            3.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh3kQLFijGxuXDZA_O964mAgz3jlLEY9v2Pg&s'),
]

export const PapasFritas = [
  p(11, 'Lay’s Clásicas 150 g',              6.9, 'https://vegaperu.vtexassets.com/arquivos/ids/167257/140852.jpg?v=638622119937270000'),
  p(12, 'Pringles Original 124 g',           7.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2zU4oUbd4ccRKu9EglNMPfVX3aojp8jQisA&s'),
  p(13, 'Cheetos Queso 95 g',                4.6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU7Lz9dASkX0coFlNpIPCROPwJFrDXq_9fWg&s'),
  p(14, 'Papas Kettle Sal Marina 142 g',    12.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO1tigINWGki33GCvZlL7Bx0XCeKZswAM9Sg&s'),
  p(15, 'Doritos Nacho 120 g',               6.2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXor6X8aEbIjLvgk4c8eaCBe6MTtSgmtC7aQ&s'),
]

export const Chocolates = [
  p(21, 'Chocolate Sublime Clásico 32 g',    1.8, 'https://oechsle.vteximg.com.br/arquivos/ids/14861563-1000-1000/image-005044d8e1da4645b29c394988f69683.jpg?v=638281538576770000'),
  p(22, 'KitKat 45 g',                       3.5, 'https://plazavea.vteximg.com.br/arquivos/ids/2188047-418-418/20058944.jpg'),
  p(23, 'Snickers 50 g',                     3.2, 'https://metroio.vtexassets.com/arquivos/ids/538128-800-auto?v=638577095470500000&width=800&height=auto&aspect=true'),
  p(24, 'Chocolate Bitter 70 % 90 g',        7.9, 'https://florayfauna.vtexassets.com/arquivos/ids/167336/Chocolate-Bitter-70--Cacao-Con-Arandanos-Azules-Y-Rojos-Amazonia-90-G.jpg?v=638831079481270000'),
  p(25, 'M&M’s Peanut 45 g',                 4.0, 'https://labodega.com.pe/Adminbackend/fotos/producto14771.jpg'),
]

export const BarrasCereal = [
  p(31, 'Nature Valley Avena & Miel 210 g', 10.5, 'https://res.cloudinary.com/general-mills/image/upload/q_auto,f_auto/natureValleyLATAM/wp-content/uploads/sites/7/2020/08/NV-Crunchy-OatsNhoney.png'),
  p(32, 'Granola Bar Manzana 6 uds',         8.9, 'https://res.cloudinary.com/general-mills/image/upload/q_auto,f_auto/natureValleyLATAM/wp-content/uploads/sites/7/2020/08/NV-Crunchy-AppleCrisp.png'),
  p(33, 'Quaker Bar Chocolate 180 g',        6.7, 'https://www.quakeroats.com/sites/quakeroats.com/files/2024-08/00030000314074_C1C1.png'),
  p(34, 'Kashi Peanut Butter 210 g',        12.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi3Rv-cWiTeLSXx5J9mc6en6P8AGznLe3CtQ&s'),
  p(35, 'Kind Bar Almond Coco 40 g',         4.9, 'https://mcgrocer.com/cdn/shop/files/kind-almond-coconut-snack-bars-multipack-12-x-40g-41786844020974.jpg?v=1742497454'),
]

export const Nachos = [
  p(41, 'Tostitos Salsa 285 g',              9.9, 'https://santaisabel.vtexassets.com/arquivos/ids/511356/Tortillas-Tostitos-Sal-285-g.jpg?v=638857188758300000'),
  p(43, 'Triángulos Maíz 200 g',             6.8, 'https://media.falabella.com/tottusPE/43111021_1/w=1500,h=1500,fit=pad'),
  p(44, 'Tostitos Azules 200 g',              8.5, 'https://plazavea.vteximg.com.br/arquivos/ids/29322000-300-300/20237044.jpg?v=638592612246400000'),
]

/* ─────────  export agrupado  ───────── */

export const MOCK_SNACKS = {
  Galletas,
  Papas: PapasFritas,
  Chocolates,
  'Barras de cereal': BarrasCereal,
  Nachos,
}

export default MOCK_SNACKS
