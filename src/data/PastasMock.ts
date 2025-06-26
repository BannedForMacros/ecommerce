import type { Product } from '@/components/sections/ProductSection'

const p = (id: number, n: string, pr: number, img: string): Product => ({
  id,
  name: n,
  price: pr,
  image: img,      // img vacío para que puedas agregar la URL después
  rating: 4.5,
  reviews: 6 + id,
})

export const Fideos = [
  p(1, 'Spaghetti Nº 5 500 g',     4.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqhnjvGWenGOzVAYFiN3CpjL9Ix9okhRhYHQ&s'),
  p(2, 'Fideo Tornillo 500 g',     4.2, 'https://media.falabella.com/tottusPE/42006415_1/w=1500,h=1500,fit=pad'),
  p(3, 'Fideo Penne 500 g',        4.6, 'https://media.falabella.com/tottusPE/42326944_1/w=1500,h=1500,fit=pad'),
  p(4, 'Fideo Linguine 500 g',     4.8, 'https://metroio.vtexassets.com/arquivos/ids/586005/962243-01-149467.jpg?v=638820849805930000'),
  p(5, 'Fideo Cabello Ángel 250 g',3.1, 'https://plazavea.vteximg.com.br/arquivos/ids/26368589-450-450/20146339.jpg?v=638200801621770000'),
]

export const Salsas = [
  p(21, 'Salsa Pomodoro 400 g',    6.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjcW28Npe4HDaUovNGM2i4sAxXTLLSkuG-wA&s'),
  p(22, 'Salsa Alfredo 350 g',     7.2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdLIq51XiMX3Zq7ohSLurb3zLUFTgkY0PRnA&s'),
  p(23, 'Salsa Pesto 190 g',       8.4, 'https://plazavea.vteximg.com.br/arquivos/ids/5098648-450-450/20254408.jpg?v=637770353982100000'),
  p(24, 'Salsa Boloñesa 400 g',    7.9, 'https://media.falabella.com/tottusPE/40709636_1/w=1500,h=1500,fit=pad'),
  p(25, 'Salsa Funghi 350 g',      8.8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu682DfPPHfwWAaXwBoWOZFDvmQyPu41dOiQ&s'),
]

export const Lasagna = [
  p(31, 'Lasaña Precocida 500 g',  9.5, 'https://plazavea.vteximg.com.br/arquivos/ids/16380933-512-512/20067361.jpg'),
  p(32, 'Lasaña de Espinaca 400 g',11.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6u8Ejejkr-DHr1eLIMI2rJxSdo2uTF_Z0SQ&s'),
  p(33, 'Lasaña Integral 500 g',   10.5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL4zXIo6MbiaS2vrRl3tASF0q5z8xnmKtGbw&s'),
  p(34, 'Lasaña Boloñesa 400 g',   12.0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtaaGBWNm-54_d9WWsJYqN6GPlHwgy3kYKiw&s'),
  p(35, 'Lasaña Vegana 450 g',     13.5, 'https://dx7csy7aghu7b.cloudfront.net/prods/7529917.webp'),
]

export const MOCK_PASTAS = {
  Fideos,
  
  Salsas,
  'Lasaña': Lasagna,
}

export default MOCK_PASTAS
