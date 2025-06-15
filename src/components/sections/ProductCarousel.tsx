'use client';

import { useRef } from 'react';
import ProductCard, { Product } from '../product/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  title: string;
  products: Product[];
}

export default function ProductCarousel({ title, products }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (dir: 'l' | 'r') =>
    ref.current?.scrollBy({
      left: dir === 'l' ? -320 : 320,
      behavior: 'smooth',
    });

  return (
    <section className="my-12">
      {/* Cabecera */}
      <header className="section-title">
        {title}
        <div className="flex gap-1">
          <button onClick={() => move('l')}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => move('r')}>
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      {/* Carrusel */}
      <div className="overflow-x-auto pb-2">
        <div
          ref={ref}
          className="flex w-max mx-auto gap-4 snap-x snap-mandatory scroll-smooth"
        >
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
