/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect }   from 'react'
import Link            from 'next/link'
import {
  CheckCircle2,
  ShoppingCart,
  Truck,
  PackageCheck,
  Home,
}                       from 'lucide-react'
import { useCart }      from '@/context/CartContext'

/* helper para imágenes de producto */
const img = (src: string) =>
  /^https?:\/\//.test(src) ? src : `/products/${src}.jpg`

/* ------------------------------------------------------------------ */
/* Página de agradecimiento                                           */
/* ------------------------------------------------------------------ */
export default function ThanksPage () {
  const { items, totalPrice, clear } = useCart()

  /* vacía carrito una sola vez al entrar */
  useEffect(() => {
    clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* ---------- Hero verde ---------- */}
      <section className="relative bg-gradient-secondary text-white overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center px-6 py-16 md:py-20">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              ¡Gracias por<br/>tu compra!
            </h1>
            <p className="max-w-md text-sm md:text-base">
              Tu compra fue procesada satisfactoriamente, en breves momentos te
              enviaremos un mail con el detalle de tu envío.
            </p>
          </div>
          <img
            src="/gracias/feliz.png"
            alt="Smiley"
            className="w-40 md:w-56 lg:w-64 drop-shadow-xl mt-8 md:mt-0"
          />
        </div>

        {/* onda inferior */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 100"
             preserveAspectRatio="none">
          <path d="M0,0 C300,100 600,100 900,40 C1140,-10 1290,30 1440,60 L1440,100 L0,100 Z"
                fill="#ffffff"/>
        </svg>
      </section>

      {/* ---------- Contenido principal ---------- */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-12">

        {/* número de pedido */}
        <div className="text-center space-y-3">
          <h2 className="text-lg md:text-xl">Tu número de pedido es</h2>
          <p className="text-2xl md:text-3xl font-bold text-secondary-gray-dark">
            #0000005
          </p>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Te enviaremos un correo de confirmación con todos los detalles
            de tu compra y la información de rastreo.
          </p>
        </div>

        {/* línea de estados */}
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <Status icon={<CheckCircle2 className="w-6 h-6"/>} label="Pago aceptado" active/>
          <Bar/>
          <Status icon={<ShoppingCart className="w-5 h-5"/>} label="Preparando pedido"/>
          <Bar/>
          <Status icon={<Truck className="w-5 h-5"/>} label="Pedido en camino"/>
          <Bar/>
          <Status icon={<PackageCheck className="w-5 h-5"/>} label="Pedido entregado"/>
        </div>

        {/* resumen de compra */}
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow overflow-hidden">
          <h3 className="bg-emerald-600 text-white text-center font-semibold py-2">
            Resumen de compra
          </h3>

          {/* totales */}
          <div className="p-4 text-sm">
            <Row label="Subtotal" value={`S/ ${totalPrice.toFixed(2)}`}/>
            <Row label="IGV"      value="S/ 0.00"/>
            <Row label="Delivery" value="S/ 8.00"/>
            <Row label="Total"    value={`S/ ${(totalPrice + 8).toFixed(2)}`} bold/>
          </div>

          {/* lista de ítems */}
          <div className="max-h-52 overflow-y-auto divide-y">
            {items.map(p => (
              <div key={p.id} className="flex items-center gap-3 p-3">
                <img src={img(p.image)} alt={p.name}
                     className="w-10 h-10 object-cover rounded"/>
                <div className="flex-1">
                  <p className="text-xs font-medium leading-tight">{p.name}</p>
                </div>
                <p className="text-xs font-semibold whitespace-nowrap">
                  S/ {p.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* botones */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/gondolas"
                className="btn-secondary flex items-center justify-center gap-2 sm:w-48">
            <ShoppingCart className="w-4 h-4"/> Seguir comprando
          </Link>
          <Link href="/"
                className="btn-primary flex items-center justify-center gap-2 sm:w-48">
            <Home className="w-4 h-4"/> Volver al home
          </Link>
        </div>
      </div>
    </>
  )
}

/* ------------------ Pequeños sub-componentes ------------------ */
function Status ({
  icon, label, active = false,
}: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center text-xs w-20">
      <div className={`
        w-9 h-9 rounded-full flex items-center justify-center
        ${active ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-white'}
      `}>
        {icon}
      </div>
      <span className="mt-1 text-[11px] text-gray-600 text-center">{label}</span>
    </div>
  )
}
const Bar = () => <div className="flex-1 h-[2px] bg-gray-200 mx-1"/>

function Row ({
  label, value, bold = false,
}: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between mb-1 last:mb-0">
      <span className="text-gray-600">{label}</span>
      <span className={bold ? 'font-semibold' : ''}>{value}</span>
    </div>
  )
}
