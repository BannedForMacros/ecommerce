import type { Product } from '@/components/sections/ProductSection'
const p=(id:number,n:string,pr:number,img:string):Product=>({id,name:n,price:pr,image:img,rating:4.1,reviews:4+id})

export const Desodorantes=[
  p(1,'Desodorante Rexona 150 ml',10.2,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL88KThVicaeTWYZNEcpvQfhFAgbCt-JxqEg&s'),
  p(2,'Desodorante Dove 150 ml',11.5,'https://leonisa.pe/cdn/shop/files/DO118_001_1200X1500_1_480x.jpg?v=1743601625'),
  p(3,'Desodorante Axe Dark 150 ml',9.9,'https://media.falabella.com/tottusPE/40983961_2/w=800,h=800,fit=pad'),
  p(4,'Desodorante Old Spice 93 g',12.0,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK-YTFuMqXo396np94QIsoXOjsaNHlUJOWqg&s'),
  p(5,'Desodorante Nivea 50 ml',8.8,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWizROPrNJ-kG2KHqnSQ83Kv0N38F6ogAeBg&s'),
]

export const Shampoos=[
  p(11,'Shampoo Head&Shoulders 375 ml',15.5,'https://www.supermercadosantamaria.com/documents/10180/10504/108850189_G.jpg'),
  p(12,'Shampoo Pantene 400 ml',14.8,'https://plazavea.vteximg.com.br/arquivos/ids/30208194-450-450/922456.jpg?v=638676870293630000'),
  p(13,'Shampoo Dove 650 ml',18.5,'https://bawamegastore.com/cdn/shop/files/Dove-IntenseRepairShampoo650ML.webp?v=1716926880'),
  p(14,'Shampoo Sedal 340 ml',9.4,'https://plazavea.vteximg.com.br/arquivos/ids/26358338-450-450/20112781.jpg?v=638193899397430000'),
  p(15,'Shampoo Herbal Essences 400 ml',17.2,'https://plazavea.vteximg.com.br/arquivos/ids/29772067-450-450/20146148.jpg?v=638652327498030000'),
]

export const Jabones=[
  p(21,'Jabón Dove Barra 90 g',3.9,'https://vegaperu.vtexassets.com/arquivos/ids/157211/7898422746759.jpg?v=637618918148000000'),
  p(22,'Jabón Líquido Soft 1 L',11.5,'https://plazavea.vteximg.com.br/arquivos/ids/22278388-512-512/20171286-1.jpg'),
  p(23,'Jabón Avena Exfoliante 120 g',4.3,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKpM4po3nN0CXLJIL6bt6XVejan2kR7-2BRg&s'),
  p(24,'Jabón líquido antibacterial 500 ml',10.0,'https://oechsle.vteximg.com.br/arquivos/ids/7168504-1000-1000/image-dfbd408ead984db6b56345304ffb235a.jpg?v=637801314646500000'),
  p(25,'Jabón Nivea 90 g',3.1,'https://http2.mlstatic.com/D_NQ_NP_776202-MLA49987681433_052022-O.webp'),
]

export const Femeninos=[
  p(31,'Toallas Always Noite 10 u',8.5,'https://www.hogarysalud.com.pe/wp-content/uploads/2024/10/00213912.webp'),
  p(32,'Protector Kotex 40 u',7.0,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9yS0VdNMHwwTahFT4vOEJe-eXDKLYUOy6IA&s'),
  p(33,'Tampones Tampax 18 u',17.9,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_MiuzUE_6SnVD0VUOLAAXxQ69OupJyGKEcQ&s'),
  p(34,'Copa Menstrual Talla M',32.0,'https://oechsle.vteximg.com.br/arquivos/ids/13976811-1000-1000/image-078b30119ed6422ebde85ea4d9fbdc61.jpg?v=638134211650770000'),
  p(35,'Toallas Nosotras Nocturna 16 u',10.9,'https://http2.mlstatic.com/D_NQ_NP_886039-MLU75021600915_032024-O.webp'),
]

export const MOCK_LIMPIEZA={
  Desodorantes,
  Shampoos,
  Jabones,
  'Art. Femeninos':Femeninos,
}
export default MOCK_LIMPIEZA
