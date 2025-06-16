/* eslint-disable @next/next/no-img-element */
// src/components/CategoriesWave.tsx
'use client'

import Image  from 'next/image'
import { useEffect, useState } from 'react'
import { Category } from '@/types'
import { Clock4, ChefHat, ShieldCheck } from 'lucide-react'

/* ------------ DATA ------------ */
const perks = [
  { icon: Clock4,  title: 'Ahorra tiempo',     desc: 'Pide lo que quieras desde la comodidad de tu casa.' },
  { icon: ChefHat, title: 'En manos expertas', desc: 'Nuestro equipo prepara tus pedidos de forma segura.' },
  { icon: ShieldCheck, title: 'Garantía 100 %', desc: 'Compra segura: tus datos están protegidos.' },
]

/* ------------ COMPONENT ------------ */
export default function CategoriesWave ({ categories }: { categories: Category[] }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t) }, [])

  return (
    <section className='relative bg-gradient-to-br from-primary-red via-primary-red to-red-600 text-white overflow-hidden'>

      {/* ---------- SIMPLE DECOR (blob y partículas) ---------- */}
      {/* … si ya lo tenías, déjalo igual – no usa <style jsx> … */}

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20
                       transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* ---------- TÍTULO ---------- */}
        <header className='text-center mb-14'>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6
                          bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent
                          transition-all duration-1000 delay-300
                          ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            ¡Descubre toda nuestra variedad!
          </h2>
          <div className={`flex justify-center transition-all duration-700 delay-500
                           ${visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
          </div>
        </header>

        {/* ---------- CATEGORÍAS ---------- */}
        <div className='flex flex-wrap justify-center gap-6 md:gap-8 pb-16'>
          {categories.map((c, i) => (
            <CategoryCard key={c.id} {...c} index={i} visible={visible}/>
          ))}
        </div>

        {/* ---------- BENEFICIOS ---------- */}
        <Perks visible={visible}/>

        {/* ---------- FAQ ---------- */}
        <Faq visible={visible}/>
      </div>
    </section>
  )
}

/* ------------ CATEGORY CARD (sin cambios sustanciales) ------------ */
function CategoryCard ({ name, image, index, visible }:
  Category & { index:number; visible:boolean }) {

  const [hover, setHover] = useState(false)
  return (
    <div
      className={`w-40 md:w-48 lg:w-56 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl
                 hover:shadow-3xl hover:bg-white transition-all duration-700 delay-${index * 100}
                 ${visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-16 opacity-0 scale-95'}
                 hover:-translate-y-4 hover:scale-105 cursor-pointer border border-white/20`}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      <header className={`bg-gradient-to-r from-primary-green to-emerald-500 py-4 rounded-t-3xl
                         text-sm md:text-base font-bold text-center relative overflow-hidden
                         transition-shadow duration-500 ${hover ? 'shadow-lg' : ''}`}>
        <span className='relative z-10'>{name}</span>
      </header>

      <div className='flex items-center justify-center h-36 md:h-44 lg:h-48 p-6'>
        <Image src={`/categories/${image}`} alt={name} width={160} height={160}
               className={`object-contain w-full h-full transition-all duration-500
                            ${hover ? 'scale-110 rotate-3' : ''}`}/>
      </div>
    </div>
  )
}

/* ------------ PERKS ------------ */
function Perks ({ visible }: { visible:boolean }) {
  return (
    <div className='grid md:grid-cols-3 gap-12 mt-12 mb-16'>
      {perks.map((p,i)=>(
        <article key={p.title}
          className={`text-center transition-all duration-700 delay-${(i+1)*200}
                     ${visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
                     hover:scale-105 hover:-translate-y-2`}>
          <span className='inline-flex items-center justify-center p-5 bg-white/15 rounded-2xl backdrop-blur-sm'>
            <p.icon size={48}/>
          </span>
          <h3 className='font-bold text-xl mt-4 mb-2'>{p.title}</h3>
          <p className='text-base opacity-90'>{p.desc}</p>
        </article>
      ))}
    </div>
  )
}

/* ------------ FAQ ------------ */
function Faq ({ visible }: { visible:boolean }) {
  const faqs = [
    { q:'¿Cuál es el tiempo de espera para tu pedido en domicilio?', a:'Aproximadamente 45 min según tu zona.' },
    { q:'¿Por qué es importante crearme un usuario?',                a:'Podrás seguir tus pedidos y recibir ofertas personalizadas.' },
    { q:'¿Cuánto es el costo de delivery en FastMarket?',            a:'Desde S/ 4.90 dependiendo del distrito.' },
  ]

  return (
    <div className={`mt-20 rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 delay-800
                     ${visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}
                     hover:scale-[1.02] hover:shadow-3xl border border-white/10 backdrop-blur-sm`}>

      {/* Header con rotación “moneda” */}
      <div className='flex items-center gap-4 bg-gradient-to-r from-primary-green via-emerald-500 to-primary-green
                      py-6 px-8 md:px-10 text-xl font-bold'>
        <svg
          className='w-6 h-6 text-white drop-shadow-lg animate-[swing_2s_ease-in-out_infinite]'
          viewBox='0 0 20 20' fill='currentColor'>
          <path fillRule='evenodd' d='M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-3a1 1 0 0 0-.867.5 1 1 0 1 1-1.731-1A3 3 0 0 1 13 8a3 3 0 0 1-2 2.83V11a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1 1 1 0 0 0 0-2Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z' clipRule='evenodd'/>
        </svg>
        <span className='bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent'>Preguntas Frecuentes</span>
      </div>

      <div className='bg-gradient-to-b from-primary-green/95 to-primary-green/90'>
        {faqs.map(f => <FaqItem key={f.q} {...f}/>)}
      </div>
    </div>
  )
}

/* ------------ FAQ ITEM ------------ */
function FaqItem ({ q, a }: { q:string; a:string }) {
  const [open,   setOpen]   = useState(false)
  const [hover,  setHover]  = useState(false)

  return (
    <div className={`border-b border-white/10 last:border-b-0 transition-colors
                     ${open || hover ? 'bg-white/5' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        className='w-full flex items-center justify-between py-6 px-8 md:px-10 text-left hover:bg-white/10'>
        <span className={`text-sm md:text-base pr-4 leading-relaxed
                         ${open ? 'font-semibold text-white' : 'text-white/95'}`}>
          {q}
        </span>
        <svg className={`w-6 h-6 text-white transition-transform duration-500 ${open ? 'rotate-180' : ''}`}
             viewBox='0 0 24 24' strokeWidth='2.5' stroke='currentColor' fill='none'>
          <path d='M6 9l6 6 6-6'/>
        </svg>
      </button>

      <div className={`transition-all duration-500 overflow-hidden
                      ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className='px-8 md:px-10 pb-8'>
          <div className={`relative bg-gradient-to-r from-white to-gray-50 text-primary-green/90
                          rounded-2xl p-6 shadow-xl border border-primary-green/10
                          transition-transform duration-500 ${open ? 'translate-y-0' : 'translate-y-4 scale-95'}`}>
            {/* flecha */}
            <div className='absolute -left-4 top-6'>
              <div className='w-0 h-0 border-y-8 border-r-8 border-y-transparent border-r-white'/>
              <div className='absolute -top-[10px] -left-[10px] w-0 h-0 border-y-[10px] border-r-[10px]
                              border-y-transparent border-r-primary-green/20'/>
            </div>
            <p className='text-sm md:text-base leading-relaxed font-medium'>{a}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
