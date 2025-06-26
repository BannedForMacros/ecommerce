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
  image: img,      // ← sin enlace
  rating: 4.7,
  reviews: 10 + id,
})

/* ─────────  sub-categorías  ───────── */

export const Tortas = [
  p(1, 'Torta Chocolate 1 kg', 45.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb-FiS_4E8fzCtoBm7_SVj_nLMIn8QbQjL1w&s'),
  p(2, 'Torta Tres Leches 1 kg', 42.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoVdZN4PoE5etHqTTol0JY83PamSCU4Y4tDA&s'),
  p(3, 'Torta Red Velvet 1 kg', 48.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjTwIIoVhD-1cXiaV9KYNgpQXWV46POHcz2A&s'),
  p(4, 'Torta Selva Negra 1 kg', 46.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpDyHfTMjEAj8tk2ikxaVUle_j8JPSjXGb4g&s'),
  p(5, 'Torta Zanahoria 1 kg', 41.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkVtSospLv0o91MDj-1hK3XRgnGhtH19cOg&s'),
]

export const Brownies = [
  p(11, 'Brownie Clásico 4 u', 15.9, 'https://static.guiainfantil.com/media/30691/c/brownie-de-chocolate-clasico-para-ninos-lg.jpg'),
  p(12, 'Brownie Nuez 4 u', 16.5, 'https://wongfood.vtexassets.com/arquivos/ids/709603-800-auto?v=638524497685170000&width=800&height=auto&aspect=true'),
  p(13, 'Brownie Sin Azúcar 4 u', 17.0, 'https://unimarc.vtexassets.com/arquivos/ids/245998/000000000000673200-UN-01.jpg?v=638703058204900000'),
  p(14, 'Brownie Cheesecake 4 u', 18.8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS74QijO6rRVKK1bCmaQtRM9T3ndNzhoLILCQ&s'),
  p(15, 'Brownie Blondie 4 u', 16.9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM5OT9zFHAjAlGkMf_1Q0LBPmIWpH4XVJ6nQ&s'),
]

export const Cupcakes = [
  p(21, 'Cupcake Vainilla 6 u', 18.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnywXW9VeNg6LLih4U1vGLHaNfSQP3JNO22w&s'),
  p(22, 'Cupcake Chocolate 6 u', 18.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZdrGxJxWWhQr9E-_Yl66efzIdBnfzVfKww&s'),
  p(23, 'Cupcake Red Velvet 6 u', 20.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNxdrM_ncXkkM9OHQxQq4O6G7hcBLbTcZDBw&s'),
  p(24, 'Cupcake Zanahoria 6 u', 19.0, 'https://canolalife.com/wp-content/uploads/2021/08/Cupcake-de-zanahoria.webp'),
  p(25, 'Cupcake Nutella 6 u', 21.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQizhqQ6GwS3L7M0LthFy8bcyT3tltD_NbeGg&s'),
]

export const Pudines = [
  p(31, 'Pudín Vainilla 150 g', 6.5, 'https://metroio.vtexassets.com/arquivos/ids/531844/334950-01-64714.jpg?v=638538106021100000'),
  p(32, 'Pudín Chocolate 150 g', 6.8, 'https://plazavea.vteximg.com.br/arquivos/ids/28886552-450-450/108972.jpg?v=638471233018070000'),
  p(33, 'Pudín Chía 180 g', 7.5, 'https://plazavea.vteximg.com.br/arquivos/ids/28886552-450-450/108972.jpg?v=638471233018070000'),
  p(34, 'Pudín Arroz con Leche 180 g', 7.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8KQuxdjfsC6KAXGx19Z-HgTOQGunbO_hZ0Q&s'),
  p(35, 'Pudín de Coco 150 g', 7.2, 'https://cdn0.uncomo.com/es/posts/1/5/3/como_hacer_pudin_de_coco_34351_600.jpg'),
]

/* ─────────  export agrupado  ───────── */

export const MOCK_PASTELERIA = {
  Tortas,
  Brownies,
  Cupcakes,
  Pudines,
}

export default MOCK_PASTELERIA
