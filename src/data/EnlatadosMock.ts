import type { Product } from '@/components/sections/ProductSection'

const p = (
  id: number,
  n: string,
  pr: number,
  img: string = ''
): Product => ({
  id,
  name: n,
  price: pr,
  image: img,        // ← sin URL
  rating: 4.2,
  reviews: 5 + id,
})

/* ─────────  sub-categorías  ───────── */

export const Atun = [
  p(1, 'Atún en Agua 170 g', 6.2, 'https://images.ctfassets.net/vkdsye91qcu6/6psYXePkkR3vi9YkLnlhMY/d4ad2be234446192b94a7accdee415c0/FILETE_DE_ATUN_EN_AGUA_Y_SAL_UNIDAD.webp'),
  p(2, 'Atún en Aceite 170 g', 6.4, 'https://plazavea.vteximg.com.br/arquivos/ids/561260-450-450/20145074.jpg?v=637427425439600000'),
  p(3, 'Atún Light 170 g', 6.5, 'https://media.falabella.com/tottusPE/10422058_1/w=800,h=800,fit=pad'),
  p(4, 'Atún Desmenuzado 140 g', 5.8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfdPW10_TV1hvypkyOGtd15x_yiFeSySafsQ&s'),
  p(5, 'Atún Lomitos 160 g', 7.2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgEuZijjqCuQ7JnkTL5wtpOSOXtae8AzQy8w&s'),
]

export const Sardinas = [
  p(11, 'Sardinas en Tomate 155 g', 4.3, 'https://walmartsv.vtexassets.com/arquivos/ids/712317/48217_01.jpg?v=638792937092670000'),
  p(12, 'Sardinas en Aceite 155 g', 4.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhMMw7gWyGBCu1oeGHZYheFR36LgFq8JDhw&s'),
  p(13, 'Filete de Sardina 125 g', 5.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdnoez0Mi4IDLtzgV7tHdI5u0KVwLU02T-ew&s'),
  p(14, 'Sardinas Picantes 155 g', 4.7, 'https://walmartsv.vtexassets.com/arquivos/ids/712306/48218_01.jpg?v=638792937048700000'),
  p(15, 'Sardinas Ahumadas 120 g', 5.3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo2yzrbX1FuiCFOW0xHagndHgPITVHbdn_sQ&s'),
]

export const Duraznos = [
  p(21, 'Duraznos en Almíbar 820 g', 9.9, 'https://plazavea.vteximg.com.br/arquivos/ids/29362482-418-418/965773.jpg'),
  p(22, 'Duraznos Light 820 g', 10.2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjjdckaGEaE3ngCacvtwJ50otcYWbbFlM3aA&s'),
  p(23, 'Duraznos Cubitos 410 g', 6.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfGlkWxcnc08uideCkIEFWxJQJRcJYH2AIVA&s'),
  p(24, 'Duraznos Orgánicos 720 g', 11.5, 'https://images.lider.cl/wmtcl?source=url[file:/productos/4623181a.jpg]&scale=size[2000x2000]&sink'),
  p(25, 'Cocktail de Frutas 820 g', 9.6, 'https://plazavea.vteximg.com.br/arquivos/ids/26057006-450-450/920208.jpg?v=638169461868170000'),
]

export const Maiz = [
  p(31, 'Choclo en Grano 425 g', 5.1, 'https://wongfood.vtexassets.com/arquivos/ids/709595-800-auto?v=638524497664570000&width=800&height=auto&aspect=true'),
  p(32, 'Maíz Dulce 300 g', 4.8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2U1NJpLlGjJRoLYZuBXdi2GyrYue3-blUPg&s'),
  p(33, 'Maíz Peruano 425 g', 5.3, 'https://wongfood.vtexassets.com/arquivos/ids/709595-800-auto?v=638524497664570000&width=800&height=auto&aspect=true'),
  p(34, 'Elotes Amarillos 400 g', 5.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRmXLYrtMkvpg4wCLUjqH2yJYUZ_lcYcugtA&s'),
  p(35, 'Maíz Baby 300 g', 5.4, 'https://plazavea.vteximg.com.br/arquivos/ids/29075034-450-450/20237297.jpg?v=638518753111570000'),
]

export const Alcachofas = [
  p(41, 'Alcachofa en Corazones 390 g', 11.9, 'https://reservagourmet.mx/cdn/shop/products/corazon_de_alcachofa_grande.jpg?v=1559856098'),
  p(42, 'Alcachofa Laminada 400 g', 10.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWRWxm4EmHHDsWY4fxO3axr1otqw4AMKqyvQ&s'),
  p(43, 'Alcachofa en Agua 410 g', 10.9, 'https://metroio.vtexassets.com/arquivos/ids/239761/Fondos-de-Alcachofa-Valle-Fertil-Frasco-410-g-143829.jpg?v=638173824594370000'),
  p(44, 'Alcachofa Baby 350 g', 12.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqJKfM6apqrHOLSLj6goZxJxQK4gYqncaxFw&s'),
  p(45, 'Alcachofa Marinada 280 g', 12.5, 'https://wongfood.vtexassets.com/arquivos/ids/197189/392304-01-86666.jpg?v=636482810434000000'),
]

/* ─────────  export agrupado  ───────── */

export const MOCK_ENLATADOS = {
  Atun,
  Sardinas,
  Duraznos,
  Maiz,
  Alcachofas,
}

export default MOCK_ENLATADOS
