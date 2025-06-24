/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useMemo } from 'react'
import Link                  from 'next/link'
import { useRouter }         from 'next/navigation'
import {
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  Pencil,
}                            from 'lucide-react'
import { useCart }           from '@/context/CartContext'
import { useLocation }       from '@/context/LocationContext'
import type { CartItem }     from '@/context/CartContext'

/* util img */
const imgUrl = (v: string) =>
  /^https?:\/\//.test(v) ? v : `/products/${v}.jpg`

/* ---------- tipos ---------- */
type DatosPersonales = {
  email: string
  nombres: string
  apellidos: string
  documento: string
  telefono: string
  factura: boolean
  aceptaDatos: boolean
  aceptaTerminos: boolean
}

type DatosEntrega = {
  calle: string
  numero: string
  piso: string
  departamento: string
  provincia: string
  distrito: string
  receptor: string
  envio: 'delivery' | 'tienda' | ''
  fecha: string
  hora: string
}

/* ---------- estados iniciales ---------- */
const initDatos: DatosPersonales = {
  email: '',
  nombres: '',
  apellidos: '',
  documento: '',
  telefono: '',
  factura: false,
  aceptaDatos: false,
  aceptaTerminos: false,
}

const initEntrega: DatosEntrega = {
  calle: '',
  numero: '',
  piso: '',
  departamento: '',
  provincia: '',
  distrito: '',
  receptor: '',
  envio: '',
  fecha: '',
  hora: '09:00 – 17:00',
}

/* =================================================================== */
/*                               PAGE                                  */
/* =================================================================== */
export default function CheckoutPage () {
  /* contextos */
  const router                      = useRouter()
  const { items, totalPrice, changeQty } = useCart()
  const { location }                = useLocation()

  /* pasos */
  const [step, setStep]   = useState<1 | 2 | 3>(1)
  const [datos, setDatos] = useState<DatosPersonales>(initDatos)
  const [envio, setEnvio] = useState<DatosEntrega>(initEntrega)

  /* ---------- validaciones ---------- */
  const datosOk = useMemo(() =>
    datos.email   && datos.nombres && datos.apellidos &&
    datos.documento && datos.telefono &&
    datos.aceptaDatos && datos.aceptaTerminos
  , [datos])

  const envioOk = useMemo(() =>
    envio.calle && envio.numero && envio.provincia &&
    envio.distrito && envio.envio && envio.fecha
  , [envio])

  /* ---------- helpers ---------- */
  const setDato = <K extends keyof DatosPersonales>(k: K, v: DatosPersonales[K]) =>
    setDatos(prev => ({ ...prev, [k]: v }))

  const setEnv  = <K extends keyof DatosEntrega>(k: K, v: DatosEntrega[K]) =>
    setEnvio(prev => ({ ...prev, [k]: v }))

  /* ---------- render ---------- */
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-10">
      {/* ----------------------- Columna izquierda ----------------------- */}
      <div className="flex-1">
        {/* banner */}
        <img src="/pago/pago.jpeg" alt="Checkout" className="w-full rounded mb-6"/>

        {/***************** PASO 1 *****************/}
        <Section
          number={1}
          title="Datos Personales"
          open={step === 1}
          done={step > 1}
          resumen={
            <ul className="text-sm text-emerald-700 list-disc ml-4 space-y-1">
              <li>{datos.email}</li>
              <li>{datos.nombres} {datos.apellidos}</li>
              <li>{datos.documento} • {datos.telefono}</li>
            </ul>
          }
          onEdit={() => setStep(1)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="input col-span-2" placeholder="Correo"
              value={datos.email} onChange={e => setDato('email', e.target.value)} />
            <input className="input" placeholder="Nombres"
              value={datos.nombres} onChange={e => setDato('nombres', e.target.value)} />
            <input className="input" placeholder="Apellidos"
              value={datos.apellidos} onChange={e => setDato('apellidos', e.target.value)} />
            <input className="input" placeholder="Documento de identidad"
              value={datos.documento} onChange={e => setDato('documento', e.target.value)} />
            <input className="input" placeholder="Teléfono"
              value={datos.telefono} onChange={e => setDato('telefono', e.target.value)} />
          </div>

          <label className="flex items-center gap-2 text-sm text-red-600 mt-2">
            <input type="checkbox" checked={datos.factura}
              onChange={e => setDato('factura', e.target.checked)} />
            ¿Deseas factura?
          </label>

          <div className="space-y-2 mt-3">
            <label className="flex items-center gap-2 text-xs">
              <input type="checkbox" checked={datos.aceptaDatos}
                onChange={e => setDato('aceptaDatos', e.target.checked)} />
              Acepto el tratamiento de datos personales
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input type="checkbox" checked={datos.aceptaTerminos}
                onChange={e => setDato('aceptaTerminos', e.target.checked)} />
              He leído y acepto las&nbsp;
              <Link href="#" className="text-emerald-600 underline">políticas</Link>&nbsp;y&nbsp;
              <Link href="#" className="text-emerald-600 underline">términos</Link>
            </label>
          </div>

          <button
            disabled={!datosOk}
            onClick={() => setStep(2)}
            className="btn-primary mt-4 disabled:opacity-40"
          >
            Continuar
          </button>
        </Section>

        {/***************** PASO 2 *****************/}
        <Section
          number={2}
          title="Datos de entrega"
          open={step === 2}
          done={step > 2}
          resumen={
            <ul className="text-sm text-emerald-700 list-disc ml-4 space-y-1">
              <li>{envio.calle} {envio.numero}</li>
              <li>{envio.provincia}, {envio.distrito}</li>
              <li>{envio.envio === 'delivery'
                    ? `Delivery ${envio.fecha} / ${envio.hora}`
                    : `Recojo en tienda ${envio.fecha}`}</li>
            </ul>
          }
          onEdit={() => setStep(2)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="input col-span-2" placeholder="Calle"
              value={envio.calle} onChange={e => setEnv('calle', e.target.value)} />
            <input className="input" placeholder="Número"
              value={envio.numero} onChange={e => setEnv('numero', e.target.value)} />
            <input className="input" placeholder="Piso / Dpto."
              value={envio.piso} onChange={e => setEnv('piso', e.target.value)} />
            <input className="input" placeholder="Departamento"
              value={envio.departamento} onChange={e => setEnv('departamento', e.target.value)} />
            <input className="input" placeholder="Provincia"
              value={envio.provincia} onChange={e => setEnv('provincia', e.target.value)} />
            <input className="input" placeholder="Distrito"
              value={envio.distrito} onChange={e => setEnv('distrito', e.target.value)} />
            <input className="input col-span-2" placeholder="Receptor"
              value={envio.receptor} onChange={e => setEnv('receptor', e.target.value)} />
          </div>

          <p className="text-xs text-red-600 mt-3">Elige tipo de envío</p>
          <div className="flex gap-3">
            <button
              className={`btn-chip ${envio.envio==='delivery' && 'btn-chip-active'}`}
              onClick={() => setEnv('envio', 'delivery')}
            >Delivery</button>
            <button
              className={`btn-chip ${envio.envio==='tienda' && 'btn-chip-active'}`}
              onClick={() => setEnv('envio', 'tienda')}
            >Recojo en tienda</button>
          </div>

          <p className="text-xs text-red-600 mt-4">Fecha de entrega</p>
          <input type="date" className="input w-48"
            value={envio.fecha} onChange={e => setEnv('fecha', e.target.value)} />

          <p className="text-xs mt-4">Hora de entrega</p>
          <input className="input w-48"
            value={envio.hora} onChange={e => setEnv('hora', e.target.value)} />

          <button
            disabled={!envioOk}
            onClick={() => setStep(3)}
            className="btn-primary mt-4 disabled:opacity-40"
          >
            Continuar
          </button>
        </Section>

        {/***************** PASO 3 *****************/}
        <Section
          number={3}
          title="Métodos de pago"
          open={step === 3}
        >
          <Tabs/>
          <CardForm total={totalPrice}/>
          <button className="btn-primary mt-6 w-full" onClick={() => router.push('/thanks')}>
            Finalizar compra
          </button>
        </Section>
      </div>

      {/* ----------------------- Resumen carrito ----------------------- */}
      <ResumenCarrito
        items={items}
        total={totalPrice}
        changeQty={changeQty}
        location={location}
      />
    </div>
  )
}

/* =================================================================== */
/*                        COMPONENTES AUXILIARES                        */
/* =================================================================== */

function Section ({
  number, title, open, done, children, resumen, onEdit,
}: {
  number: number
  title: string
  open: boolean
  done?: boolean
  children: React.ReactNode
  resumen?: React.ReactNode
  onEdit?: () => void
}) {
  return (
    <div>
      <button
        className={`w-full flex items-center justify-between px-4 py-2 rounded
          ${open ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        onClick={() => !open && onEdit?.()}
      >
        <span className="flex items-center gap-2 font-semibold">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 font-bold">
            {number}
          </span>
          {title}
        </span>
        {open ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
      </button>

      {/* contenido */}
      <div className={`overflow-hidden transition-all ${open ? 'max-h-[2000px] mt-4' : 'max-h-0'}`}>
        {open && children}
      </div>

      {/* resumen */}
      {!open && done && resumen && (
        <div className="bg-gray-100 rounded px-4 py-3 mt-1 relative">
          {resumen}
          {onEdit && (
            <button onClick={onEdit}
              className="absolute top-2 right-2 text-gray-500 hover:text-emerald-700">
              <Pencil size={18}/>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function Tabs () {
  const [active, set] = useState(1) // 0-TX,1-card,2-contra
  const labels = ['Transferencia', 'Tarjeta', 'Contraentrega']
  return (
    <div className="flex gap-2 mt-4">
      {labels.map((l,i)=>(
        <button key={l}
          onClick={()=>set(i)}
          className={`flex-1 text-xs py-2 rounded font-medium
            ${active===i?'bg-emerald-600 text-white':'bg-gray-200 text-gray-700'}`}>
          {l}
        </button>
      ))}
    </div>
  )
}

function CardForm ({ total }: { total: number }) {
  return (
    <div className="bg-gray-100 rounded p-5 mt-4 space-y-4 text-sm">
      <div>
        <label className="font-semibold">Número de tarjeta</label>
        <input className="input mt-1 w-full" placeholder="XXXX XXXX XXXX XXXX"/>
      </div>

      {/* Logos inline */}
      <div className="flex gap-4 justify-center">
        <svg width="44" viewBox="0 0 48 30"><rect width="48" height="30" rx="4" fill="#1A1F71"/><path d="M25 21l2-12h4l-2 12h-4zM35.5 9c-1 0-1.9.2-2.7.5L33 12c.6-.4 1.4-.6 2.1-.6.8 0 1.4.2 1.4.8 0 .4-.3.7-1 .9l-.7.3c-2 .6-3.3 1.5-3.3 3.2 0 1.9 1.7 3 4 3 1.2 0 2.2-.2 3.1-.7l-.6-2.7c-.7.3-1.4.5-2.1.5-.8 0-1.3-.3-1.3-.8 0-.4.4-.7 1.1-.9l.7-.3c1.8-.6 3.1-1.5 3.1-3.2 0-1.8-1.5-2.9-3.8-2.9z" fill="#fff"/></svg>
        <svg width="44" viewBox="0 0 48 30"><rect width="48" height="30" rx="4" fill="#EB001B"/><circle cx="30" cy="15" r="11" fill="#F79E1B"/><circle cx="18" cy="15" r="11" fill="#FF5F00"/></svg>
        <svg width="44" viewBox="0 0 48 30"><rect width="48" height="30" rx="4" fill="#0077A6"/><path d="M20 9h9c5 0 9 4 9 9s-4 9-9 9h-9V9z" fill="#fff"/><path d="M29 9h-9c5 0 9 4 9 9s-4 9-9 9h9c5 0 9-4 9-9s-4-9-9-9z" fill="#00A1E0"/></svg>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label>Vencimiento</label>
          <div className="flex gap-1">
            <input className="input" placeholder="MM"/>
            <input className="input" placeholder="YY"/>
          </div>
        </div>
        <div>
          <label>CVV</label>
          <input className="input" placeholder="***"/>
        </div>
      </div>

      <p className="text-xs flex items-center gap-1">
        <span className="i-lucide:lock"/> Ambiente seguro
      </p>

      <p className="font-semibold text-center">Total S/ {total.toFixed(2)}</p>
    </div>
  )
}

function ResumenCarrito ({
  items, total, changeQty, location,
}: {
  items: CartItem[]
  total: number
  changeQty: (id: CartItem['id'], qty: number) => void
  location: string | null
}) {
  return (
    <aside className="w-full lg:w-80">
      <div className="bg-white rounded-xl shadow border">
        <h2 className="bg-emerald-600 text-white text-center py-3 rounded-t-xl font-semibold">
          Mi carrito de compras
        </h2>

        <div className="divide-y">
          {items.map(it => (
            <div key={it.id} className="flex gap-3 p-4">
              <img src={imgUrl(it.image)} alt={it.name} className="w-12 h-12 rounded"/>
              <div className="flex-1">
                <p className="text-sm">{it.name}</p>
                <p className="text-emerald-600 text-sm font-semibold">S/ {it.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center bg-gray-100 rounded-full">
                <button onClick={() => changeQty(it.id, it.qty-1)} disabled={it.qty===1}
                  className="p-1.5 hover:text-emerald-600 disabled:opacity-40"><Minus size={14}/></button>
                <span className="px-3 text-xs font-bold">{it.qty} U</span>
                <button onClick={() => changeQty(it.id, it.qty+1)}
                  className="p-1.5 hover:text-emerald-600"><Plus size={14}/></button>
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-4 text-sm space-y-1">
          <div className="flex justify-between"><span>Costo de productos</span><span>S/ {total.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Costo de envío</span><span>S/ 8.50</span></div>
          <div className="flex justify-between"><span>IGV</span><span>S/ 0.00</span></div>
          {location && <p className="text-xs text-center text-gray-500 mt-2">Entrega en {location}</p>}
        </div>
      </div>
    </aside>
  )
}

/* ------------------------------------------------------------------ */
/*    Clases utilitarias FALTANTES – añade a tu globals.css            */
/* ------------------------------------------------------------------ */
/*
.btn-chip      { @apply rounded bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-2; }
.btn-chip-active{ @apply bg-emerald-600 text-white; }
*/
