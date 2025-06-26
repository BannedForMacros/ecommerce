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
  image: img,          // ← sin enlace
  rating: 4.4,
  reviews: 7 + id,
})

/* ─────────── sub-categorías ─────────── */

export const Jamones = [
  p(1, 'Jamón Inglés 250 g', 14.9, 'https://metroio.vtexassets.com/arquivos/ids/312127/Jam-n-Ingl-s-Zimmermann-Paquete-200-g-1-147988401.jpg?v=638180557508630000'),
  p(2, 'Jamón de Pavo 500 g', 24.5, 'https://metroio.vtexassets.com/arquivos/ids/416249-800-auto?v=638279306611600000&width=800&height=auto&aspect=true'),
  p(3, 'Jamón Serrano 100 g', 18.0, 'https://plazavea.vteximg.com.br/arquivos/ids/2446516-450-450/20030494.jpg?v=637677656321170000'),
  p(4, 'Jamón York 250 g', 13.2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNum27EjICzByBLxaGpqERip5VBOhCKm35zA&s'),
  p(5, 'Jamón Ahumado 200 g', 15.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUZGYVlerFGFFWxPzLrwpgKcwaVliAOo0qYg&s'),
]

export const Chorizos = [
  p(11, 'Chorizo Parrillero 500 g', 18.9, 'https://plazavea.vteximg.com.br/arquivos/ids/2446126-450-450/20041551.jpg?v=637677549876400000'),
  p(12, 'Chorizo Español 400 g', 17.0, 'https://alsuper.online/products/417568_p.webp'),
  p(13, 'Chorizo Picante 250 g', 12.8, 'https://metroio.vtexassets.com/arquivos/ids/367957-800-auto?v=638180585954170000&width=800&height=auto&aspect=true'),
  p(14, 'Chorizo de Pollo 300 g', 11.5, 'https://web.macpollo.com/wp-content/uploads/2024/02/226.webp'),
]

export const Salchichas = [
  p(21, 'Salchicha Frankfurt 1 kg', 22.9, 'https://plazavea.vteximg.com.br/arquivos/ids/29519030-512-512/20427524.jpg'),
  p(22, 'Hot-Dog Tradicional 500 g', 10.9, 'https://plazavea.vteximg.com.br/arquivos/ids/2446125-450-450/20047197.jpg?v=637677549848030000'),
  p(23, 'Salchicha Suiza 400 g', 14.5, 'https://metroio.vtexassets.com/arquivos/ids/542256-800-auto?v=638605821848870000&width=800&height=auto&aspect=true'),
  p(24, 'Salchicha Viena 300 g', 9.8, 'https://cdn-bm.aktiosdigitalservices.com/tol/bm/media/product/img/300x300/A03369_00.jpg?t=20250619040012'),
  p(25, 'Salchicha Suli 450 g', 16.2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3IsIi0ba7gjYOYHofdBeVbz9tqz1bkw7KlQ&s'),
]

export const Pates = [
  p(31, 'Paté de Hígado 90 g', 4.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVMU5avCM3t_Mrw8r5X-ETr2n7yeeiE-eRmw&s'),
  p(32, 'Paté de Atún 100 g', 5.3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-7PUsMBEFdlzBrm_BExml-xq5E0Mv7lcb8g&s'),
  p(33, 'Paté Ibérico 125 g', 7.9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTihFU68yCNmaOEJ0apkAbAW7w7nH7o-uVAVQ&s'),
  p(34, 'Paté Campagne 120 g', 6.4, 'https://cdn-bm.aktiosdigitalservices.com/tol/bm/media/product/img/300x300/A01013_00.jpg?t=20250109040128'),
  p(35, 'Paté de Pollo 90 g', 4.2, 'https://realplaza.vtexassets.com/arquivos/ids/29432109-800-auto?v=637931644393070000&width=800&height=auto&aspect=true'),
]

/* ─────────── export agrupado ─────────── */

export const MOCK_EMBUTIDOS = {
  Jamones,
  Chorizos,
  Salchichas,
  Pates,
}

export default MOCK_EMBUTIDOS
