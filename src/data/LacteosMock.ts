import type { Product } from '@/components/sections/ProductSection'

const p = (id:number,name:string,price:number,img:string):Product=>({
  id,name,price,image:img,rating:4.6,reviews:12+id,
})

/* — Sub-categorías — */
export const Leches = [
  p(1,'Leche Gloria Entera 1 L',4.7,'https://mercury.vtexassets.com/arquivos/ids/9210368/image-b9887ccde3444abb9f992521c55116f6.jpg?v=637981655898270000'),
  p(2,'Leche Laive Light 1 L',4.9,'https://wongfood.vtexassets.com/arquivos/ids/684207-800-auto?v=638398245652000000&width=800&height=auto&aspect=true'),
  p(3,'Leche Deslactosada Pura Vida 400 ml',2.8,'https://4msurtidos.com/cdn/shop/products/474941-01-8344.jpg?v=1592787638'),
  p(4,'Leche Condensada Nestlé 397 g',6.5,'https://d20f60vzbd93dl.cloudfront.net/uploads/tienda_010816/tienda_010816_e7cd5f9dbf6aea5a5cd29c2e5c483518bcc6a4c1_producto_large_90.png?not-from-cache-please'),
  p(5,'Leche Evaporada Gloria Light 410 g',4.3,'https://www.maryoriperu.com/wp-content/uploads/2019/04/Leche-evaporada-Gloria-Light-400-gr.jpg'),
]

export const Quesos = [
  p(11,'Queso Edam Laive 250 g',14.9,'https://media.falabella.com/tottusPE/40865181_1/w=1500,h=1500,fit=pad'),
  p(12,'Queso Fresco Tilsener 500 g',17.5,'https://cdnx.jumpseller.com/nutripack/image/48830897/resize/1000/1000?1715811974'),
  p(13,'Queso Parmesano rallado 100 g',9.9,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXYisS9rhcn0L-HxSKqncp_OOR2jftM76ybg&s'),
  p(14,'Queso Mozzarella Bonlé 500 g',18.0,'https://media.falabella.com/tottusPE/10170249_1/w=800,h=800,fit=pad'),
  p(15,'Queso Andino Los Portales 250 g',13.5,'https://media.falabella.com/tottusPE/43120243_1/w=800,h=800,fit=pad'),
]

export const Yogurts = [
  p(21,'Yogurt Batido Gloria Fresa 1 kg',8.5,'https://plazavea.vteximg.com.br/arquivos/ids/22976332-512-512/20326320.jpg'),
  p(22,'Yogurt Griego Laive Natural 900 g',10.9,'https://wongfood.vtexassets.com/arquivos/ids/761483/Yogurt-Batido-Natural-Laive-Griego-Botella-800g-1-297951854.jpg?v=638791365731470000'),
  p(23,'Yogurt Yoplait Durazno 500 g',7.5,'https://www.yoplait.com.mx/public/app/uploads/2022/07/Core_Durazno_220g_271x300px.png'),
  p(24,'Yogurt Activia Natural 125 g',2.4,'https://www.activiaarabia.com/en/images/products/main/en/stirred-yogurt-plain.png'),
  p(25,'Yogurt Griego Kiosko Arándanos 200 g',5.0,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyrqqKTapilDB1gSnu9YFDjgN9MmfbjSETqQ&s'),
]

export const Bebibles = [
  p(31,'Kefir Bebible Natural 350 ml',7.9,'https://www.nunaorganica.pe/wp-content/uploads/2025/04/hiri-490ml-1.webp'),
  p(32,'Smoothie Fresa Laive 250 ml',6.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlxMtSTQY1KgSfzkDKOQa_jNHdxLwieNAQtQ&s'),
  p(33,'Yogurt Bebible Activia Ciruela 200 ml',2.0,'https://res.cloudinary.com/riqra/image/upload/w_656,h_656,c_limit,q_auto,f_auto/v1668553066/sellers/4/mv3xpxsbltxgmkdk9yqy.jpg'),
  p(34,'Yogurt Bebible Yopro Vainilla 250 ml',5.9,'https://images.ctfassets.net/ea2tosc1qg3k/es-42JrmSlLQLiyWnMP7FfLlZ/478be225122797a2ff30246495cdbe06/YoPro_Pack_Botella_Fresa_1540x1540__1___1___3_-min.png?w=1540&q=80'),
  p(35,'Leche de Almendras Silk Original 946 ml',12.9,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFHxgRe_bXEjX0FVqrKao-mwFfM4FnrJTckw&s'),
]

export const MOCK_LACTEOS = {
  Leches,
  Quesos,
  Yogurts,
  Bebibles,
}
export default MOCK_LACTEOS