// src/components/layout/Footer.tsx
/* eslint-disable @next/next/no-img-element */
'use client'

import Image from 'next/image'
import Link  from 'next/link'
import { Facebook, Instagram } from 'lucide-react'

export default function Footer () {
  return (
    /* ——— Fondo neutro (#F9FAFB ≈ gray-50) ——— */
    <footer className="bg-[#F9FAFB] text-gray-700 text-sm tracking-wide">

      {/* ══════════ columnas ══════════ */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-10
                          grid gap-14 sm:grid-cols-2 lg:grid-cols-3">

        {/* Categorías */}
        <Column title="Categorías">
          {[
            'Abarrotes','Bebidas','Saludable','Dulces',
            'Postres','Frutas y Verduras','Licores',
          ].map(t => <Bullet key={t} label={t}/>)}
        </Column>

        {/* Información */}
        <Column title="Información">
          {[
            'Nuestras tiendas','Nuestra historia','Dirección',
            'Teléfonos','Términos y Condiciones','Políticas y cookies',
          ].map(t => <Bullet key={t} label={t}/>)}
        </Column>

        {/* Conócenos */}
        <Column title="Conócenos" noList>
          <p className="mb-3">Encuentra nuestra app en</p>

          <div className="flex gap-3 mb-8">
            <Image
              src="/badges/google-play.svg"
              alt="Google Play"
              width={120} height={36} priority
              className="transition-transform hover:scale-105"
            />
            <Image
              src="/badges/app-store.svg"
              alt="App Store"
              width={120} height={36}
              className="transition-transform hover:scale-105"
            />
          </div>

          <p className="mb-3">Síguenos en</p>
          <div className="flex gap-4">
            <Social href="#" aria="Facebook"><Facebook size={20}/></Social>
            <Social href="#" aria="Instagram"><Instagram size={20}/></Social>
          </div>
        </Column>
      </section>

      {/* línea + copyright */}
      <div className="border-t border-gray-300/70 bg-white/60 backdrop-blur">
        <p className="text-center py-5 font-medium text-xs sm:text-sm">
          © 2025 Data Business · Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}

/* ——— helpers ——— */

function Column ({
  title,
  children,
  noList = false,
}: { title:string; children:React.ReactNode; noList?:boolean }) {
  return (
    <div>
      <h4 className="font-semibold text-base mb-4
                     after:block after:w-10 after:h-0.5 after:bg-gray-400/60 after:mt-1">
        {title}
      </h4>
      {noList ? children : <ul className="space-y-2">{children}</ul>}
    </div>
  )
}

/* punto que aparece al hacer hover */
function Bullet ({ label }:{ label:string }) {
  return (
    <li>
      <Link
        href="#"
        className="group flex items-center gap-2 text-gray-600
                   hover:text-gray-900 transition-colors"
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-current
                     transform opacity-0 -translate-x-1
                     group-hover:opacity-100 group-hover:translate-x-0
                     transition-all duration-200"
        />
        {label}
      </Link>
    </li>
  )
}

/* icono con pequeñísimo efecto “wiggle” */
function Social ({
  href, aria, children,
}: { href:string; aria:string; children:React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={aria}
      className="grid place-items-center w-11 h-11 rounded-xl border border-gray-300
                 hover:bg-white hover:shadow-md hover:rotate-3
                 transition-transform duration-300"
    >
      {children}
    </Link>
  )
}
