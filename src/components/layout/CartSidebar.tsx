/* eslint-disable @next/next/no-img-element */
'use client'
import { useCart }      from '@/context/CartContext'
import { useLocation }  from '@/context/LocationContext'
import { useRouter }    from 'next/navigation'
import {
  X, Trash2, Minus, Plus, MapPin,
}                       from 'lucide-react'
import { useEffect, useState } from 'react'

const imgUrl = (v: string) =>
  /^https?:\/\//.test(v) ? v : `/products/${v}.jpg`

export default function CartSidebar () {
  const {
    items, totalQty, totalPrice,
    changeQty, clear,
    isOpen, close,
  } = useCart()
  const { location } = useLocation()
  const router        = useRouter()

  /* altura para que arranque debajo de la franja roja */
  const [redHeight, setRedHeight] = useState(0)
  useEffect(() => {
    const red = document.querySelector('.bg-red-600')
    if (red) setRedHeight(red.getBoundingClientRect().height)
  }, [])

  /* bloqueo scroll body */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const goCheckout = () => {
    close()
    router.push('/checkout')
  }

  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          z-40
        `}
        onClick={close}
      />

      <aside
        style={{ top: redHeight, height: `calc(100vh - ${redHeight}px)` }}
        className={`
          fixed right-0 w-full sm:w-[360px] bg-white rounded-l-2xl shadow-2xl flex flex-col
          transition-transform duration-500 z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* header */}
        <div className="bg-green-600 text-white px-5 py-3 flex items-center justify-between rounded-tl-2xl">
          <h2 className="font-semibold">Mi carrito de compras</h2>
          <span className="text-xs bg-white text-green-700 px-2 py-[2px] rounded-full font-bold">
            {totalQty} U
          </span>
          <button onClick={close}><X size={20} /></button>
        </div>

        {/* items */}
        <div className="flex-1 overflow-y-auto divide-y">
          {items.length === 0 ? (
            <p className="p-6 text-center text-gray-500">Tu carrito está vacío.</p>
          ) : (
            items.map(it => (
              <div key={it.id} className="flex items-center gap-3 p-4">
                <img src={imgUrl(it.image)} alt={it.name} className="w-14 h-14 rounded" />
                <div className="flex-1">
                  <p className="text-sm leading-tight">{it.name}</p>
                  <p className="text-emerald-600 text-sm font-semibold">S/ {it.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center bg-gray-100 rounded-full">
                  <button
                    onClick={() => changeQty(it.id, it.qty - 1)}
                    disabled={it.qty === 1}
                    className="p-1.5 hover:text-emerald-600 disabled:opacity-40"
                  >
                    <Minus size={14}/>
                  </button>
                  <span className="px-3 text-xs font-bold">{it.qty} U</span>
                  <button
                    onClick={() => changeQty(it.id, it.qty + 1)}
                    className="p-1.5 hover:text-emerald-600"
                  >
                    <Plus size={14}/>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* footer */}
        <div className="p-4 border-t space-y-3">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin size={16}/>
            {location
              ? <span>Entregar en&nbsp;<b>{location}</b></span>
              : <span className="italic">Seleccione ubicación de entrega</span>}
          </div>

          <div className="flex gap-3">
            <button
              onClick={clear}
              disabled={items.length === 0}
              className="flex-1 flex items-center justify-center gap-2 text-sm py-2 rounded-lg
                         border text-gray-600 hover:bg-gray-100 disabled:opacity-40"
            >
              <Trash2 size={16}/> Vaciar carrito
            </button>

            <button
              onClick={goCheckout}
              disabled={items.length === 0}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold
                         py-2 rounded-lg disabled:opacity-40"
            >
              Ir a pagar (S/ {totalPrice.toFixed(2)})
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
