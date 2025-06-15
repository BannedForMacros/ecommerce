'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import ProductCard, { Product } from '../product/ProductCard';

/* ───────────── Tipos ───────────── */
export interface Row {
  title: string;
  products: Product[];
  link?: string;
}
interface Props {
  rows: Row[];
  /** Porcentaje de alto ocupado por el verde (0-100).  Default 60 % */
  greenPercent?: number;
}

const BG = '#e6f8ee';

/* ───────────── Sección ───────────── */
export default function ProductSection({ rows, greenPercent = 60 }: Props) {
  return (
    <section
      className="relative overflow-hidden"
      /* Fondo: verde arriba, blanco abajo */
      style={{
        background: `linear-gradient(to bottom, ${BG} 0% ${greenPercent}%, #ffffff ${greenPercent}%, #ffffff 100%)`,
      }}
    >
      {/* Contenido */}
      <div className="relative z-10 max-w-6xl mx-auto space-y-14 px-4 pt-16 pb-32">
        {rows.map((row, idx) => (
          <RowBlock key={`${row.title}-${idx}`} {...row} />
        ))}
      </div>

      {/* Ola que se llena de blanco */}
      <WaveBottom />
    </section>
  );
}

/* ───────────── Fila (tarjeta blanca) ───────────── */
function RowBlock({ title, link = '#', products }: Row) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'l' | 'r') =>
    track.current?.scrollBy({ left: dir === 'l' ? -352 : 352, behavior: 'smooth' });

  return (
    <div className="bg-white rounded-xl shadow-sm px-6">
      <header className="flex items-center justify-between py-6">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <a href={link} className="text-primary-green text-sm hover:underline">
          ver más &gt;
        </a>
      </header>

      <div className="relative pb-6 overflow-hidden">
        <button
          onClick={() => scroll('l')}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20
                     w-10 h-10 bg-white rounded-full shadow items-center justify-center
                     hover:shadow-lg"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll('r')}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20
                     w-10 h-10 bg-white rounded-full shadow items-center justify-center
                     hover:shadow-lg"
        >
          <ChevronRight size={20} />
        </button>

        <div
          ref={track}
          className="flex w-max gap-4 overflow-x-auto scroll-smooth
                     snap-x snap-mandatory pl-14 pr-14"
        >
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Ola inferior ───────────── */
function WaveBottom() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full pointer-events-none"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
    >
      <path
        fill="#ffffff"
        d="M0 30 Q180 60 360 50 C720 10 1080 30 1440 80 L1440 120 L0 120 Z"
      />
      <rect x="1440" y="0" width="100%" height="120" fill="#ffffff" />
    </svg>
  );
}
