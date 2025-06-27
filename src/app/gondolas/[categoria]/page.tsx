/* eslint-disable @next/next/no-img-element */
'use client'

/* ------------------------------------------------------------------
   IMPORTS
   ------------------------------------------------------------------ */
import React, { Fragment, useMemo, useState } from 'react'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import Link                                from 'next/link'
import Tilt                                from 'react-parallax-tilt'
import { Dialog, Transition }              from '@headlessui/react'
import { Heart, Eye, ShoppingCart, Star, X } from 'lucide-react'

import type { Product }        from '@/components/sections/ProductSection'
import { useFavorites }        from '@/context/FavoritesContext'
import { useCart }             from '@/context/CartContext'
import { flyToCart }           from '@/utils/flyToCart'

/* --------------------  mocks por categoría  --------------------- */
import { MOCK_LICORES }   from '@/data/licoresMock'
import MOCK_LACTEOS       from '@/data/LacteosMock'
import MOCK_BEBIDAS       from '@/data/BebidasMock'
import MOCK_PASTAS        from '@/data/PastasMock'
import { MOCK_PASTELERIA} from '@/data/PasteleriaMock'
import { MOCK_SNACKS }    from '@/data/SnacksMock'
import { MOCK_ABARROTES}  from '@/data/AbarrotesMock'
import { MOCK_CONGELADOS} from '@/data/CongeladosMock'
import { MOCK_EMBUTIDOS}  from '@/data/EmbutidosMock'
import { MOCK_ENLATADOS}  from '@/data/EnlatadosMock'
import { MOCK_LIMPIEZA}   from '@/data/LimpiezaMock'

/* ------------------------------------------------------------------
   MAPA GLOBAL DE CATEGORÍAS
   clave => slug usado en la URL  (/gondolas/slug)
   ------------------------------------------------------------------ */
const DATA: Record<string, { title: string; subcats: Record<string, Product[]> }> = {
  lacteos:    { title: 'Lácteos',    subcats: MOCK_LACTEOS },
  bebidas:    { title: 'Bebidas',    subcats: MOCK_BEBIDAS },
  pastas:     { title: 'Pastas',     subcats: MOCK_PASTAS },
  pasteleria: { title: 'Pastelería', subcats: MOCK_PASTELERIA },
  snacks:     { title: 'Snacks',     subcats: MOCK_SNACKS },
  abarrotes:  { title: 'Abarrotes',  subcats: MOCK_ABARROTES },
  congelados: { title: 'Congelados', subcats: MOCK_CONGELADOS },
  embutidos:  { title: 'Embutidos',  subcats: MOCK_EMBUTIDOS },
  enlatados:  { title: 'Enlatados',  subcats: MOCK_ENLATADOS },
  limpieza:   { title: 'Limpieza',   subcats: MOCK_LIMPIEZA },
  licores:    { title: 'Licores',    subcats: MOCK_LICORES },
}

/* ------------------------------------------------------------------
   CARD
   ------------------------------------------------------------------ */
function Card({ p, onOpen }: { p: Product; onOpen: (p: Product) => void }) {
  const { favorites, toggleFavorite } = useFavorites()
  const { add, items }                = useCart()

  const imgRef      = React.useRef<HTMLImageElement>(null)
  const existingQty = items.find(i => i.id === p.id)?.qty ?? 0

  const [feedback, setFeedback] = useState<string | null>(null)
  const handleAdd = (qty = 1, e: React.MouseEvent) => {
    e.stopPropagation()
    add(p, qty)
    if (imgRef.current) flyToCart(imgRef.current)

    let text: string
    if (existingQty === 0) text = '✓'
    else if (qty === 1)    text = '+1'
    else                   text = `+${qty}`

    setFeedback(text)
    setTimeout(() => setFeedback(null), 800)
  }

  const isFav         = favorites.some(f => f.id === p.id)
  const ratingRounded = Math.round(p.rating ?? 0)
  const imgSrc        = p.image.startsWith('http') ? p.image : `/products/${p.image}.jpg`

  return (
    <div
      onClick={() => onOpen(p)}
      className="relative bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition flex flex-col cursor-pointer"
    >
      {feedback && (
        <div className="absolute -top-3 -right-3 z-10 bg-green-500 text-white font-bold px-2 py-1 rounded-full text-sm animate-bounce">
          {feedback}
        </div>
      )}

      <div className="h-40 bg-gray-50 rounded-lg overflow-hidden mb-3">
        <img ref={imgRef} src={imgSrc} alt={p.name} className="object-contain w-full h-full" />
      </div>

      <h3 className="text-sm font-semibold line-clamp-2">{p.name}</h3>

      {p.rating != null && (
        <div className="flex items-center gap-1 text-xs mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < ratingRounded ? 'text-yellow-400 fill-current' : 'text-gray-300'}
            />
          ))}
          <span className="text-gray-400 ml-1">({p.reviews})</span>
        </div>
      )}

      <p className="font-bold text-emerald-600 mt-1">S/ {p.price.toFixed(2)}</p>

      <div
        onClick={e => e.stopPropagation()}
        className="mt-auto flex items-center justify-between pt-2"
      >
        <button
          onClick={e => { e.stopPropagation(); toggleFavorite(p) }}
          className={`p-2 rounded-full transition ${isFav ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
        </button>

        <button
          onClick={e => { e.stopPropagation(); onOpen(p) }}
          className="p-2 bg-gray-100 rounded-full text-gray-600 hover:text-emerald-600"
        >
          <Eye size={16} />
        </button>
      </div>

      <div className="mt-2 space-y-1">
        <button
          onClick={e => handleAdd(1, e)}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} /> Agregar
        </button>
        <button
          onClick={e => handleAdd(3, e)}
          className="w-full text-xs text-gray-700 border border-gray-300 rounded-lg py-1 hover:bg-gray-100 transition"
        >
          +3 unidades
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   MODAL DETALLE
   ------------------------------------------------------------------ */
function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { favorites, toggleFavorite } = useFavorites()
  const { add, items }                = useCart()
  const [feedback, setFeedback]       = useState<string | null>(null)

  if (!product) return null

  const existingQty = items.find(i => i.id === product.id)?.qty ?? 0
  const handleAdd   = (qty = 1) => {
    add(product, qty)
    const text = existingQty === 0 ? '✓' : qty === 1 ? '+1' : `+${qty}`
    setFeedback(text)
    setTimeout(() => setFeedback(null), 800)
  }

  const isFav         = favorites.some(f => f.id === product.id)
  const ratingRounded = Math.round(product.rating ?? 0)
  const imgSrc        = product.image.startsWith('http') ? product.image : `/products/${product.image}.jpg`

  return (
    <Transition.Root show={!!product} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                <Tilt
                  glareEnable
                  glareMaxOpacity={0.25}
                  glareColor="#ffffff"
                  className="w-full md:w-1/2 h-64 md:h-auto rounded-lg bg-gray-100 overflow-hidden"
                >
                  <img src={imgSrc} alt={product.name} className="object-contain w-full h-full" />
                </Tilt>

                <div className="flex-1 space-y-4">
                  <Dialog.Title className="text-2xl font-bold">{product.name}</Dialog.Title>

                  {product.rating != null && (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < ratingRounded ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                      <span className="text-gray-500 text-sm">({product.reviews})</span>
                    </div>
                  )}

                  <p className="text-emerald-600 text-2xl font-bold">S/ {product.price.toFixed(2)}</p>

                  <p className="text-gray-700 text-sm">
                    Aquí podrías ampliar la descripción, ingredientes y usos.
                  </p>

                  {feedback && (
                    <div className="absolute -top-4 -right-4 z-20 bg-green-500 text-white font-bold px-2 py-1 rounded-full text-sm animate-bounce">
                      {feedback}
                    </div>
                  )}
                  <button
                    onClick={() => handleAdd()}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} /> Agregar al carrito
                  </button>

                  <button
                    onClick={() => toggleFavorite(product)}
                    className={`w-full border font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition ${
                      isFav ? 'bg-red-500 hover:bg-red-600 text-white border-red-500' : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-300'
                    }`}
                  >
                    <Heart size={18} className={isFav ? 'fill-current text-white' : 'text-gray-700'} />
                    {isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

/* ------------------------------------------------------------------
   PAGE
   ------------------------------------------------------------------ */
export default function SubGondolaPage() {
  const { categoria }            = useParams<{ categoria?: string }>() ?? {}
  const router                   = useRouter()
  const searchParams             = useSearchParams()

  /* hooks */
  const catEntry  = DATA[categoria ?? '']
  const subKeys   = useMemo(() => (catEntry ? Object.keys(catEntry.subcats) : []), [catEntry])
  const [modalProd, setModalProd] = useState<Product | null>(null)

  /* early returns */
  if (!categoria) return null
  if (!catEntry)   return <main className="p-10 text-center text-xl">Categoría no encontrada</main>

  /* sub-navigation */
  const defaultSub  = subKeys[0]
  const selectedSub = searchParams?.get('sub') || defaultSub
  const setSub      = (sub: string) => router.replace(`?sub=${encodeURIComponent(sub)}`, { scroll:false })

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4 space-x-1">
          <Link href="/gondolas" className="text-emerald-600 hover:underline">Góndolas</Link>
          <span>/</span>
          <span className="capitalize text-emerald-600">{catEntry.title}</span>
          <span>/</span>
          <span className="capitalize">{selectedSub}</span>
        </nav>

        {/* layout adaptativo: en mobile columna, en lg fila */}
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          {/* categoría full width en mobile, ancho fijo en lg */}
          <aside className="w-full lg:w-48 shrink-0">
            <img
              src={`/gondolas/${categoria}.jpg`}
              alt={catEntry.title}
              className="w-full h-24 object-cover rounded-t-xl"
            />
            <ul className="bg-white border border-gray-200 rounded-b-xl">
              {subKeys.map(k => (
                <li key={k}>
                  <button
                    onClick={() => setSub(k)}
                    className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                      k === selectedSub ? 'text-emerald-600 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {k}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* productos en grid 2 cols mobile, 4 cols lg */}
          <section className="flex-1">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {catEntry.subcats[selectedSub]?.map(prod => (
                <Card key={prod.id} p={prod} onOpen={setModalProd} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <ProductModal product={modalProd} onClose={() => setModalProd(null)} />
    </>
  )
}
