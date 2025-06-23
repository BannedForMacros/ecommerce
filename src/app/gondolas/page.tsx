// src/app/gondolas/page.tsx
'use client';

import Image from 'next/image';
import Link   from 'next/link';
import { Clock3, BadgeCheck, ShieldCheck } from 'lucide-react';

/* ────────── categorías (tarjetas superiores) ────────── */
const categories = [
  { slug: 'lacteos',    title: 'Lácteos',    items: ['Leches','Quesos','Yogurts','Bebibles'] },
  { slug: 'licores',    title: 'Licores',    items: ['Vinos','Cervezas','Whiskys','Licores varios'] },
  { slug: 'bebidas',    title: 'Bebidas',    items: ['Gaseosas','Jugos','Aguas','Bebida energética'] },
  { slug: 'abarrotes',  title: 'Abarrotes',  items: ['Arroz','Azúcar','Menestras','Aceites','Aderezos'] },
  { slug: 'snacks',     title: 'Snacks',     items: ['Leches','Quesos','Yogurts','Bebibles'] },
  { slug: 'congelados', title: 'Congelados', items: ['Camarones','Langostas','Mariscos','Carnes','Lomos','Pollos','Nuggets'] },
  { slug: 'embutidos',  title: 'Embutidos',  items: ['Jamones','Chorizos','Salchichas','Patés','Morcillas & Rellenos'] },
  { slug: 'enlatados',  title: 'Enlatados',  items: ['Atún','Anchoetas','Duraznos'] },
  { slug: 'pasteleria', title: 'Pastelería', items: ['Mazamorras','Harinas','Flanes','Chocolates','Pudín','Chocotajes'] },
  { slug: 'pastas',     title: 'Pastas',     items: ['Fideos','Macarrones','Salsas','Complementos'] },
  { slug: 'limpieza',   title: 'Limpieza',   items: ['Desodorantes','Shampoos','Jabones','Artículos femeninos','Artículos masculinos'] },
] as const;

/* ────────── página ─────────────────────────────────── */
export default function GondolasPage() {
  return (
    <main className="pb-24">
      {/* ≡≡≡ GÓNDOLAS ≡≡≡ */}
      <section className="max-w-7xl mx-auto px-4 pt-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 border-b pb-4">
          Góndola de alimentos
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(cat => (
            <article
              key={cat.slug}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col"
            >
              <Image
                src={`/gondolas/${cat.slug}.jpg`}
                alt={cat.title}
                width={400}
                height={180}
                className="h-28 w-full object-cover rounded-t-2xl"
              />

              <div className="flex-1 px-4 py-3">
                <h2 className="font-semibold text-gray-900 mb-2">{cat.title}</h2>
                <ul className="text-sm leading-5 text-gray-700 space-y-0.5">
                  {cat.items.slice(0, 6).map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>

              <Link
                href={`/gondolas/${cat.slug}`}
                className="group flex items-center justify-end gap-1 px-4 py-3 text-emerald-600 hover:text-emerald-700 text-sm font-semibold border-t rounded-b-2xl"
              >
                ver más
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                     viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5.004 5.004a1 1 0 010 1.414l-5.004 5.004a1 1 0 11-1.414-1.414L13.586 10 10.293 6.707a1 1 0 010-1.414zM3 10a1 1 0 011-1h10.586a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ≡≡≡ BLOQUE ILUSTRADO ≡≡≡ */}
      <section className="relative mt-24 overflow-hidden">
        {/* ondas suaves */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 220" preserveAspectRatio="none">
          <path d="M0 0h1200v90C980 120 820 120 600 90S220 60 0 90V0z" fill="#E7FAED" />
          <path d="M0 90h1200v90C980 210 820 210 600 180S220 150 0 180V90z" fill="#D1F2DF" />
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-20 pb-28">
          {/* título */}
          <h2 className="text-emerald-600 font-extrabold text-3xl md:text-4xl text-center leading-tight mb-16">
            ¡Siempre buscamos <br className="hidden md:block" /> lo mejor para ti!
          </h2>

          {/* tarjetas altas y delgadas */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
            {[
              {
                img: '/ilustracion/contacto.png',
                alt: 'Contacto',
                body: (
                  <>
                    ¿Necesitas comunicarte<br />con nosotros?<br />
                    <span className="font-bold text-emerald-600">01&nbsp;589&nbsp;800</span>
                  </>
                ),
              },
              {
                img: '/ilustracion/pago_seguro.png',
                alt: 'Pago seguro',
                body: (
                  <>
                    Paga rápido<br />y seguro
                    <p className="mt-1 text-sm md:text-xs text-gray-500">Todos tus datos están<br />100&nbsp;% seguros</p>
                  </>
                ),
              },
              {
                img: '/ilustracion/red_social.png',
                alt: 'Redes sociales',
                body: (
                  <>Síguenos en nuestras<br />redes sociales</>
                ),
              },
            ].map(card => (
              <div
                key={card.alt}
                className="
                  w-60 md:w-64 h-[26rem] bg-white rounded-2xl border border-gray-100 shadow-sm
                  px-6 pt-6 pb-8 text-center flex flex-col justify-between
                "
              >
                {/* Texto */}
                <div className="text-gray-700 leading-relaxed text-base md:text-[1.05rem]">
                  {card.body}
                </div>

                {/* Ilustración */}
                    <Image
                    src={card.img}
                    alt={card.alt}
                    width={600}
                    height={600}
                    className="
                        object-contain mx-auto          /* centra y conserva proporción  */
                        w-56  h-56                      /* ≈ 14 rem en pantallas chicas  */
                        md:w-64 md:h-64                 /* ≈ 16 rem en md (≥768 px)      */
                        lg:w-72 lg:h-72                 /* ≈ 18 rem en lg (≥1024 px)     */
                    "
                    />

              </div>
            ))}
          </div>

          {/* beneficios inferiores */}
          <div className="grid md:grid-cols-3 gap-10 md:gap-8 mt-24">
            {[
              {
                Icon: Clock3,
                title: 'Ahorra tiempo',
                desc: 'Pide lo que quieras desde la comodidad de tu casa',
              },
              {
                Icon: BadgeCheck,
                title: 'En manos expertas',
                desc: 'Un equipo especializado prepara tu pedido de manera segura.',
              },
              {
                Icon: ShieldCheck,
                title: 'Garantía 100 %',
                desc: 'Realiza una compra segura, tus datos están protegidos.',
              },
            ].map(i => (
              <div key={i.title} className="flex items-start gap-4">
                <i.Icon className="w-10 h-10 text-emerald-600 shrink-0" />
                <div>
                  <h3 className="font-extrabold text-gray-900 text-lg mb-1">{i.title}</h3>
                  <p className="text-gray-700 text-base">{i.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
