'use client'

/* ------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------ */
import Link   from 'next/link'
import Image  from 'next/image'
import {
  Search,
  Heart,
  MapPin,
  ShoppingCart,
  User,
}                       from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useLocation }  from '@/context/LocationContext'
import { usePathname }  from 'next/navigation'
import {
  useState,
  useEffect,
  useRef,
}                       from 'react'
import RegistrationModal    from './RegistrationModal'
import {
  PRODUCT_INDEX,
  SearchProduct,
}                       from '@/data/productsIndex'

/* ------------------------------------------------------------------ */
/* Componente */
/* ------------------------------------------------------------------ */
export default function Navbar () {
  const { openSidebar, favorites }        = useFavorites()
  const { open: openCart, totalQty } = useCart() 
  const { openLocationPicker, location }  = useLocation()
  const path                              = usePathname()

  /* ------------  estado buscador  ------------ */
  const [query, setQuery]         = useState('')
  const [results, setResults]     = useState<SearchProduct[]>([])
  const [showDrop, setShowDrop]   = useState(false)
  const inputRef                  = useRef<HTMLInputElement>(null)
  

  /* ------------  modal registro  ------------ */
  const [isRegOpen, setIsRegOpen] = useState(false)

  /* ------------  calcula coincidencias  ------------ */
  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      setResults([])
      return
    }
    const res = PRODUCT_INDEX.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.descripcion.toLowerCase().includes(q)
    ).slice(0, 10)            // máximo 10 sugerencias
    setResults(res)
  }, [query])

  /* ------------  cerrar dropdown click-fuera  ------------ */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!inputRef.current?.parentElement) return
      if (!inputRef.current.parentElement.contains(e.target as Node)) {
        setShowDrop(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* ------------  tabs navegación  ------------ */
  const tabs = [
    { label: 'Inicio',    href: '/' },
    { label: 'Góndolas',  href: '/gondolas' },
    { label: 'Favoritos', href: '/favoritos' },
  ]

  return (
    <>
      {/* ========== Franja roja ========== */}
      <header>
        <div className="bg-red-600 text-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Galvan"
                width={170}
                height={40}
                priority
              />
            </Link>

            {/* --- accesos rápidos --- */}
            <div className="flex items-center gap-6 text-sm">
              <button
                onClick={openSidebar}
                className="flex items-center gap-1 hover:opacity-80"
              >
                <Heart className="w-5 h-5" />
                <span>
                  FAVORITOS
                  {favorites.length > 0 && (
                    <span className="ml-1 px-1 bg-white text-green-700 rounded text-xs">
                      {favorites.length}
                    </span>
                  )}
                </span>
              </button>

              <button
                onClick={openLocationPicker}
                className="flex items-center gap-1 hover:opacity-80"
              >
                <MapPin className="w-5 h-5" />
                <span>
                  MI&nbsp;UBICACIÓN
                  {location && (
                    <span className="ml-1 px-1 bg-white text-green-700 rounded text-xs whitespace-nowrap">
                      {location}
                    </span>
                  )}
                </span>
              </button>

              <button
                id="cart-icon"
                onClick={openCart}
                className="relative flex items-center gap-1 hover:opacity-80"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>CARRITO</span>
                {totalQty > 0 && (
                  <span className="absolute -top-1 -right-2 bg-emerald-500 text-white text-[10px] font-bold rounded-full px-1.5">
                    {totalQty}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsRegOpen(true)}
                className="flex items-center gap-1 hover:opacity-80"
              >
                <User className="w-5 h-5" />
                <span>REGISTRO</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========== Franja verde ========== */}
        <div className="bg-green-600 text-white">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-2 px-4 py-2">
            {/* ---------- Navegación ----------- */}
            <nav className="flex flex-wrap gap-2 w-full sm:w-auto">
              {tabs.map(({ label, href }) => {
                const isActive = path === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      px-3 py-1 rounded-full text-xs md:text-sm font-medium transition
                      ${isActive
                        ? 'bg-green-700 text-white'
                        : 'bg-white text-green-600 hover:bg-green-100'}
                    `}
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>

            {/* ---------- Buscador ---------- */}
            <div className="w-full sm:max-w-md relative">
              <input
                ref={inputRef}
                value={query}
                onChange={e => {
                  setQuery(e.target.value)
                  setShowDrop(true)
                }}
                onFocus={() => query && setShowDrop(true)}
                type="text"
                placeholder="¿Qué producto estás buscando?"
                className="
                  block w-full pr-12 pl-3 py-2 rounded-full
                  border border-white bg-transparent
                  text-white placeholder-white/90 text-sm
                  focus:outline-none focus:ring-2 focus:ring-white
                "
              />
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors flex items-center justify-center"
              >
                <Search className="w-5 h-5 text-white" />
              </button>

              {/* ---- Dropdown resultados ---- */}
              {showDrop && (
                <div className="absolute z-10 w-full mt-2 bg-white text-gray-800 rounded-lg shadow-lg max-h-96 overflow-auto">
                  {results.length > 0 ? (
                    results.map(item => (
                      <Link
                        key={item.id}
                        href={`/gondolas/${item.categoria.toLowerCase()}`}
                        onClick={() => {
                          setQuery('')
                          setShowDrop(false)
                        }}
                        className="flex gap-3 p-3 hover:bg-gray-100 transition"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image.startsWith('http')
                            ? item.image
                            : `/products/${item.image}.jpg`
                          }
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-semibold leading-snug">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 whitespace-nowrap truncate">
                            {item.descripcion}
                          </p>
                          <span className="text-xs text-green-700">
                            {item.categoria}
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="p-4 text-center text-sm text-gray-500">
                      Sin coincidencias
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Modal de Registro ---------- */}
      <RegistrationModal
        isOpen={isRegOpen}
        onClose={() => setIsRegOpen(false)}
      />
    </>
  )
}
