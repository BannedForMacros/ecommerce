import type { Product } from '@/components/sections/ProductSection'

// helper con 4º argumento (imagen), por defecto vacío
const p = (
  id: number,
  n: string,
  pr: number,
  img: string = ''
): Product => ({
  id,
  name: n,
  price: pr,
  image: img,
  rating: 4.4,
  reviews: 9 + id,
})

/* ──────────── sub-categorías ──────────── */
export const Gaseosas = [
  p(1, 'Coca-Cola 1.5 L', 6.5, 'https://plazavea.vteximg.com.br/arquivos/ids/29148582-418-418/76296.jpg'),
  p(2, 'Pepsi 2.25 L', 7.0, 'https://plazavea.vteximg.com.br/arquivos/ids/30892716-512-512/20426698.jpg'),
  p(3, 'Inca Kola 1.5 L', 6.8, 'https://plazavea.vteximg.com.br/arquivos/ids/525922-450-450/73035.jpg?v=637418780781500000'),
  p(4, 'Fanta Naranja 1 L', 5.1, 'https://discouy.vtexassets.com/arquivos/ids/1768854/Refresco-FANTA-naranja-1-L-0.jpg?v=638507816596170000'),
  p(5, 'Sprite Zero 1.5 L', 5.0, 'https://http2.mlstatic.com/D_NQ_NP_600572-MLA51018471261_082022-O.webp'),
]

export const Jugos = [
  p(11, 'Valle Néctar Durazno 1 L', 5.2, 'https://plazavea.vteximg.com.br/arquivos/ids/30630872-512-512/20144005.jpg'),
  p(12, 'Frugos Manzana 1 L', 5.2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRopb9YyZgItUc9wMSAbwl-nb6LoueWMdlNKA&s'),
  p(13, 'Del Valle Mango 335 ml', 2.5, 'https://walmartsv.vtexassets.com/arquivos/ids/357748/Nectar-Del-Valle-Mango-Lata-330ml-1-3727.jpg?v=638346333862900000'),
  p(14, 'Sabori Arándano 200 ml', 1.2, 'https://ec.naturesheart.com/sites/default/files/2021-06/jugo_de_arandano_200ml-detail.png'),
  p(15, 'Watts Néctar Piña 1 L', 4.8, 'https://elbuenvecino.cl/cdn/shop/files/305531-Nectar-Watt_s-Pina-1L_jpg_700x700.jpg?v=1708026574'),
]

export const Aguas = [
  p(21, 'San Luis sin gas 2.5 L', 4.1, 'https://plazavea.vteximg.com.br/arquivos/ids/29320802-450-450/130990.jpg?v=638591621318730000'),
  p(22, 'San Mateo 600 ml', 1.9, 'https://plazavea.vteximg.com.br/arquivos/ids/312677-418-418/agua-mineral-san-mateo-sin-gas-botella-600ml.jpg'),
  p(23, 'Cielo bidón 7 L', 9.5, 'https://wongfood.vtexassets.com/arquivos/ids/724676-800-auto?v=638621159612330000&width=800&height=auto&aspect=true'),
  p(24, 'Smartwater 600 ml', 4.2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrZuVI24keAOUa0-xKh_67PI2aK3iKjQTetw&s'),
  p(25, 'H2Oh! Citrus 500 ml', 3.0, 'https://discouy.vtexassets.com/arquivos/ids/1768890/Agua-saborizada-H2OH-Citrus-500-ml-1.jpg?v=638507816600230000'),
]

export const Energeticas = [
  p(31, 'Red Bull 250 ml', 6.9, 'https://oechsle.vteximg.com.br/arquivos/ids/1352052-1000-1000/image-909dc2275de5486fbaf16f346b37fabf.jpg?v=637494728345970000'),
  p(32, 'Volt Original 473 ml', 4.0, 'https://plazavea.vteximg.com.br/arquivos/ids/29322578-450-450/20356073.jpg?v=638593270889000000'),
  p(33, 'Monster Verde 473 ml', 6.0, 'https://plazavea.vteximg.com.br/arquivos/ids/24844395-418-418/20112003.jpg'),
  p(34, 'Blu Energy Berry 500 ml', 3.9, 'https://chedrauimx.vtexassets.com/arquivos/ids/49766270-800-auto?v=638854801838330000&width=800&height=auto&aspect=true'),
  p(35, 'Speed Unlimited 210 ml', 2.2, 'https://http2.mlstatic.com/D_963116-MLU74551433258_022024-C.jpg'),
]

/* ──────────── export agrupado ──────────── */
export const MOCK_BEBIDAS = {
  Gaseosas,
  Jugos,
  Aguas,
  'Bebida energética': Energeticas,
}

export default MOCK_BEBIDAS
