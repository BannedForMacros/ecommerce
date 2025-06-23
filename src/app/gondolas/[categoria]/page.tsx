'use client';

import { notFound } from 'next/navigation';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import Image from 'next/image';
import Link  from 'next/link';

import ProductSection, {
  type Product,
} from '@/components/sections/ProductSection';

/* -------------------------------------------------------------------
   ▸  Mapa de categorías → sub-categorías → productos
   ------------------------------------------------------------------- */
const DATA: Record<
  string,
  {
    title: string;
    subcats: Record<string, Product[]>;
  }
> = {
  licores: {
    title: 'Licores',
    subcats: {
      Cervezas:  [],         // ←   pon aquí tus productos reales
      Whiskys:   [],
      Cócteles:  [],
      Vinos:     [],
      'Licores varios': [],
    },
  },
  // … otras categorías
};

/* ------------------------------------------------------------------
   ▸  Page component
   ------------------------------------------------------------------ */
export default function SubGondolaPage({
  params: { categoria },
}: {
  params: { categoria: string };
}) {
  /* 1️⃣  Comprobamos que exista la categoría ----------------------- */
  const cat = DATA[categoria];
  if (!cat) notFound();

  /* 2️⃣  URL ?sub=…  (puede ser null en la 1.ª hidrata → encadenado ?.) */
  const searchParams = useSearchParams();
  const subcatSel =
    searchParams?.get('sub') ?? Object.keys(cat.subcats)[0]; // fallback

  /* 3️⃣  Cambio de sub-categoría sin recargar página --------------- */
  const router = useRouter();
  const changeSub = (sub: string) =>
    router.replace(`?sub=${encodeURIComponent(sub)}`, { scroll: false });

  /* 4️⃣  Lista de sub-categorías, memorizada ----------------------- */
  const subcatKeys = useMemo(() => Object.keys(cat.subcats), [cat]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* ▸ Migas de pan */}
      <nav className="text-sm text-gray-500 space-x-1">
        <Link href="/gondolas" className="text-emerald-600 hover:underline">
          Góndolas
        </Link>
        <span>/</span>
        <span className="capitalize text-emerald-600">{cat.title}</span>
        <span>/</span>
        <span className="capitalize">{subcatSel}</span>
      </nav>

      <div className="flex gap-8">
        {/* ▸ Menú lateral */}
        <aside className="w-44 shrink-0">
          <Image
            src={`/gondolas/${categoria}.jpg`}
            alt={cat.title}
            width={176}
            height={88}
            className="w-full h-24 object-cover rounded-t-xl"
          />

          <ul className="bg-white border border-gray-200 rounded-b-xl">
            {subcatKeys.map(key => (
              <li key={key}>
                <button
                  onClick={() => changeSub(key)}
                  className={`block w-full px-4 py-2 text-left text-sm
                              hover:bg-gray-50
                              ${key === subcatSel
                                ? 'text-emerald-600 font-semibold'
                                : 'text-gray-700'}`}
                >
                  {key}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* ▸ Productos */}
        <section className="flex-1">
          <ProductSection
            rows={[
              {
                title: subcatSel,
                products: cat.subcats[subcatSel],
              },
            ]}
          />
        </section>
      </div>
    </main>
  );
}
