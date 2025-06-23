// src/data/productsIndex.ts
import {
  cervezas,
  whiskys,
  cocteles,
  vinos,
  licoresVarios,
} from '@/data/licoresMock'

import type { Product } from '@/components/sections/ProductSection'

export interface SearchProduct extends Product {
  categoria: string
  descripcion: string        // texto breve para el autosuggest
}

/*  ➜  normaliza cada lista y añade su categoría */
const map = (list: Product[], categoria: string): SearchProduct[] =>
  list.map(p => ({
    ...p,
    categoria,
    descripcion: `Rico ${p.name.toLowerCase()} de la familia ${categoria}`,
  }))

export const PRODUCT_INDEX: SearchProduct[] = [
  ...map(cervezas,      'Cervezas'),
  ...map(whiskys,       'Whiskys'),
  ...map(cocteles,      'Cócteles'),
  ...map(vinos,         'Vinos'),
  ...map(licoresVarios, 'Licores varios'),
]
