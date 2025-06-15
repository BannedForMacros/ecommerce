'use client';

/* ────────────────────────────────
   Sección roja con ola, slider de
   categorías (ahora con imágenes),
   beneficios y FAQ.
   ──────────────────────────────── */

import Image from 'next/image';
import { Category } from '@/types';
import {
  Clock4,
  ChefHat,
  ShieldCheck,
} from 'lucide-react';

/* Beneficios */
const perks = [
  {
    icon: Clock4,
    title: 'Ahorra tiempo',
    desc: 'Pide lo que quieras desde la comodidad de tu casa.',
  },
  {
    icon: ChefHat,
    title: 'En manos expertas',
    desc: 'Tenemos un equipo que prepara tus pedidos de manera segura.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía 100%',
    desc: 'Realiza una compra segura, tus datos están protegidos.',
  },
];

export default function CategoriesWave({ categories }: { categories: Category[] }) {
  return (
    <section className="relative bg-primary-red text-white overflow-hidden">
      {/* Ola superior */}
      <WaveTop />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-14">
        {/* Título */}
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">
          ¡Descubre toda nuestra variedad de productos!
        </h2>

        {/* Slider de categorías */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mx-auto pb-8">
          {categories.map(cat => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>

        {/* Beneficios */}
        <div className="grid gap-8 mt-8 md:grid-cols-3 text-center">
          {perks.map(p => (
            <div key={p.title} className="flex flex-col items-center gap-3">
              <p.icon size={42} />
              <p className="font-semibold">{p.title}</p>
              <p className="text-sm max-w-xs">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <FaqBlock />
      </div>

      {/* Ola inferior */}
      <WaveBottom />
    </section>
  );
}

/* ──────────────── Tarjeta de categoría ──────────────── */
function CategoryCard({ name, image }: Category) {
  return (
    <div className="w-36 md:w-44 rounded-xl shadow-product-hover">
      {/* encabezado verde */}
      <div className="bg-primary-green text-white rounded-t-xl px-3 py-2 text-xs md:text-sm font-semibold text-center">
        {name}
      </div>

      {/* cuerpo blanco con imagen */}
      <div className="h-28 md:h-32 bg-white flex items-center justify-center rounded-b-xl">
        <Image
          src={`/categories/${image}`}
          alt={name}
          width={64}
          height={64}
          className="object-contain"
        />
      </div>
    </div>
  );
}

/* Ola superior con más altura (panza más baja) */
function WaveTop() {
  return (
    <svg
      className="absolute -top-px left-0 w-full pointer-events-none"
      viewBox="0 0 1440 200"          /* ← altura total 200 px */
      preserveAspectRatio="none"
    >
      <path
        fill="white"
        d="
          M0 150                         /* baja a 150 */
          C320 60  720 20  1120 90       /* ajusta control-points Y */
          Q1320 120 1440 110
          L1440 0 L0 0 Z
        "
      />
      <rect x="1440" y="0" width="100%" height="200" fill="white" />
    </svg>
  );
}



/* ───── Corte inferior (línea recta) ───── */
function WaveBottom() {
  return (
    <svg
      viewBox="0 0 1440 20"
      className="absolute bottom-0 left-0 w-full"
      preserveAspectRatio="none"
    >
    </svg>
  );
}


function FaqBlock() {
  const faqs = [
    {
      q: '¿Cuál es el tiempo de espera para tu pedido en domicilio?',
      a: 'Aproximadamente 45 minutos según tu zona.',
    },
    {
      q: '¿Por qué es importante crearme un usuario?',
      a: 'Podrás seguir tus pedidos y recibir ofertas personalizadas.',
    },
    {
      q: '¿Cuánto es el costo de delivery en fastmarket?',
      a: 'Desde S/ 4.90 dependiendo del distrito.',
    },
  ]

  return (
    <div className="bg-primary-green-light rounded-lg overflow-hidden mt-12">
      <h3 className="bg-primary-green text-white font-semibold py-3 px-6">
        Preguntas Frecuentes
      </h3>

      {faqs.map(({ q, a }) => (
        <details key={q} className="group border-t border-white/40">
          <summary className="cursor-pointer py-3 px-6 list-none flex justify-between items-center text-white">
            <span>{q}</span>
            <svg
              className="w-4 h-4 group-open:rotate-180 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <p className="px-6 pb-4 text-white/90">{a}</p>
        </details>
      ))}
    </div>
  )
}
