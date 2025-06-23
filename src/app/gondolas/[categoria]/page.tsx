'use client'

/* ------------------------------------------------------------------
   IMPORTS
   ------------------------------------------------------------------ */
import {
  use as usePromise,
  Fragment,
  useMemo,
  useState,
}                     from 'react'
import {
  useRouter,
  useSearchParams,
  notFound,
}                     from 'next/navigation'
import Image          from 'next/image'
import Link           from 'next/link'
import Tilt           from 'react-parallax-tilt'
import { Dialog, Transition } from '@headlessui/react'
import {
  Heart,
  Eye,
  ShoppingCart,
  Star,
  X,
}                     from 'lucide-react'

import type { Product }         from '@/components/sections/ProductSection'
import { useFavorites }         from '@/context/FavoritesContext'
import { MOCK_LICORES }         from '@/data/licoresMock'

/* ------------------------------------------------------------------
   DATA POR CATEGORÍA
   ------------------------------------------------------------------ */
const DATA: Record<
  string,
  { title: string; subcats: Record<string, Product[]> }
> = {
  licores: { title: 'Licores', subcats: MOCK_LICORES },
}

/* ------------------------------------------------------------------
   HELPERS
   ------------------------------------------------------------------ */
function isPromise<T>(v: unknown): v is Promise<T> {
  return typeof v === 'object' && v !== null && 'then' in v
}

/* ------------------------------------------------------------------
   CARD
   ------------------------------------------------------------------ */
function Card({
  p,
  onOpen,
}: {
  p: Product
  onOpen: (p: Product) => void
}) {
  const { favorites, toggleFavorite } = useFavorites()
  const isFav         = favorites.some(f => f.id === p.id)
  const ratingRounded = Math.round(p.rating ?? 0)
  const imgSrc        = p.image.startsWith('http')
    ? p.image
    : `/products/${p.image}.jpg`

  return (
    <div
      onClick={() => onOpen(p)}
      className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition flex flex-col cursor-pointer"
    >
      {/* imagen */}
      <div className="h-40 bg-gray-50 rounded-lg overflow-hidden mb-3">
        <Image
          src={imgSrc}
          alt={p.name}
          width={320}
          height={320}
          unoptimized={p.image.startsWith('http')}
          className="object-contain w-full h-full"
        />
      </div>

      <h3 className="text-sm font-semibold line-clamp-2">{p.name}</h3>

      {p.rating !== undefined && (
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

      {/* acciones */}
      <div
        onClick={e => e.stopPropagation()}
        className="mt-auto flex items-center justify-between pt-2"
      >
        <button
          onClick={() => toggleFavorite(p)}
          className={`p-2 rounded-full transition ${
            isFav ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
        </button>

        <button
          onClick={() => onOpen(p)}
          className="p-2 bg-gray-100 rounded-full text-gray-600 hover:text-emerald-600"
        >
          <Eye size={16} />
        </button>
      </div>

      <button
        onClick={e => e.stopPropagation()}
        className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm py-2 rounded-lg flex items-center justify-center gap-2"
      >
        <ShoppingCart size={14} /> Agregar
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------
   MODAL DETALLE
   ------------------------------------------------------------------ */
function ProductModal({
  product,
  onClose,
}: {
  product: Product | null
  onClose: () => void
}) {
  const { favorites, toggleFavorite } = useFavorites()
  if (!product) return null

  const isFav         = favorites.some(f => f.id === product.id)
  const imgSrc        = product.image.startsWith('http')
    ? product.image
    : `/products/${product.image}.jpg`
  const ratingRounded = Math.round(product.rating ?? 0)

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
                  <Image
                    src={imgSrc}
                    alt={product.name}
                    width={550}
                    height={550}
                    unoptimized={product.image.startsWith('http')}
                    className="object-contain w-full h-full"
                  />
                </Tilt>

                <div className="flex-1 space-y-4">
                  <Dialog.Title className="text-2xl font-bold">
                    {product.name}
                  </Dialog.Title>

                  {product.rating !== undefined && (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={
                            i < ratingRounded
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                      <span className="text-gray-500 text-sm">({product.reviews})</span>
                    </div>
                  )}

                  <p className="text-emerald-600 text-2xl font-bold">
                    S/ {product.price.toFixed(2)}
                  </p>

                  <p className="text-gray-700 text-sm">
                    Aquí podría ir una descripción detallada del producto, ingredientes, usos, etc.
                  </p>

                  <div className="flex gap-3">
                    {/* botón favoritos dentro del modal */}
                    <button
                      onClick={() => toggleFavorite(product)}
                      className={`flex-1 py-3 rounded-lg font-semibold border transition
                        ${isFav ? 'bg-red-500 text-white border-red-500'
                                 : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      {isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    </button>

                    <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
                      <ShoppingCart size={18} /> Agregar al carrito
                    </button>
                  </div>
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
export default function SubGondolaPage({
  params,
}: {
  params: { categoria: string } | Promise<{ categoria: string }>
}) {
  // unwrap Promise (Next 15.3)
  const { categoria } = usePromise(
    isPromise<{ categoria: string }>(params) ? params : Promise.resolve(params)
  )

  const router       = useRouter()
  const searchParams = useSearchParams()

  const catEntry = DATA[categoria]
  if (!catEntry) notFound()

  const subKeys     = useMemo(() => Object.keys(catEntry.subcats), [catEntry])
  const defaultSub  = subKeys[0]
  const selectedSub = searchParams?.get('sub') || defaultSub
  const setSub      = (sub:string) =>
    router.replace(`?sub=${encodeURIComponent(sub)}`, { scroll:false })

  const [modalProd, setModalProd] = useState<Product | null>(null)

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* migas de pan */}
        <nav className="text-sm text-gray-500 mb-8 space-x-1">
          <Link href="/gondolas" className="text-emerald-600 hover:underline">
            Góndolas
          </Link>
          <span>/</span>
          <span className="capitalize text-emerald-600">{catEntry.title}</span>
          <span>/</span>
          <span className="capitalize">{selectedSub}</span>
        </nav>

        <div className="flex gap-10">
          {/* lateral */}
          <aside className="w-48 shrink-0">
            <Image
              src={`/gondolas/${categoria}.jpg`}
              alt={catEntry.title}
              width={192}
              height={96}
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

          {/* productos */}
          <section className="flex-1">
            <h2 className="text-2xl font-bold mb-6">{selectedSub}</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
