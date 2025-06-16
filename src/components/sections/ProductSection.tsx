'use client';
import { ChevronLeft, ChevronRight, Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

/* ────────────────── Tipos ────────────────── */
export interface Product {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  discount?: number;
}

export interface Row {
  title: string;
  products: Product[];
  link?: string;
}

interface Props {
  rows: Row[];
}


/* ────────────────── Sección ────────────────── */
export default function ProductSection({ rows }: Props) {
  const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());

  /* fade-in cuando entra en viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute('data-row-index') || '0');
            setVisibleRows(prev => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '20px' }
    );

    document.querySelectorAll('[data-row-index]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {rows.map((row, idx) => (
          <div
            key={`${row.title}-${idx}`}
            data-row-index={idx}
            className={`transition-all duration-700 ease-out
              ${visibleRows.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <RowBlock {...row} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────── Fila / Row ────────────────── */
function RowBlock({ title, link = '#', products }: Row) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  /* botones habilitados / deshabilitados */
  const updateButtons = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanLeft(scrollLeft > 5);
    setCanRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.addEventListener('scroll', updateButtons);
      updateButtons();
      return () => track.removeEventListener('scroll', updateButtons);
    }
  }, []);

  /* desplazamiento calculado */
  const handleScroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    const visible = trackRef.current.clientWidth;
    /* 👉 En móvil desplazamos exactamente el ancho de 2 tarjetas para mostrar siempre 2 */
    const amount = window.innerWidth < 768 ? visible : 340;

    trackRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <a
            href={link}
            className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1"
          >
            Ver más <ChevronRight size={16} />
          </a>
        </div>
      </div>

      {/* Carrusel */}
      <div className="relative p-6">
        {canLeft && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:border-emerald-200 transition-all duration-200 hover:scale-105"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {canRight && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:border-emerald-200 transition-all duration-200 hover:scale-105"
          >
            <ChevronRight size={20} />
          </button>
        )}

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-8 md:px-14 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {/* gradientes de desvanecimiento */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none transition-opacity duration-300 ${
            canLeft ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none transition-opacity duration-300 ${
            canRight ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
}

/* ────────────────── Tarjeta de Producto ────────────────── */
function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hover, setHover] = useState(false);
  const [liked, setLiked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && !loaded) setLoaded(true);
  }, [loaded]);

  return (
    /* 👉 Ancho calculado para que quepan exactamente 2 tarjetas en móvil:
        calc((100vw - 88px) / 2) considera: padding del contenedor (32px), gap (16px), padding interno (40px)
        En md y superiores mantiene w-72 */
    <div
      className="snap-start relative flex-shrink-0 w-[calc((100vw-88px)/2)] md:w-72 bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        animationDelay: `${index * 80}ms`,
        transform: hover ? 'translateY(-4px)' : 'translateY(0px)'
      }}
    >
      {/* Badges */}
      {product.discount && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
          -{product.discount}%
        </div>
      )}
      {product.badge && (
        <div
          className={`absolute top-3 right-3 z-10 px-2 py-1 rounded-md text-xs font-semibold text-white
            ${
              product.badge === 'New'
                ? 'bg-blue-500'
                : product.badge === 'Hot'
                ? 'bg-orange-500'
                : product.badge === 'Bestseller'
                ? 'bg-emerald-500'
                : 'bg-purple-500'
            }`}
        >
          {product.badge}
        </div>
      )}

      {/* Botones acción */}
      <div
        className={`absolute top-3 right-3 z-10 flex flex-col gap-2 transition-all duration-300 ${
          hover ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
      >
        <button
          onClick={() => setLiked(!liked)}
          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            liked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:text-red-500'
          }`}
        >
          <Heart size={16} className={liked ? 'fill-current' : ''} />
        </button>
        <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:text-emerald-600 transition-colors duration-200">
          <Eye size={16} />
        </button>
      </div>

      {/* Imagen */}
      <div className="relative h-32 md:h-48 bg-gray-100 overflow-hidden">
        {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        <img
          ref={imgRef}
          src={`/products/${product.image}.jpg`}
          alt={product.name}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            hover ? 'scale-105' : 'scale-100'
          } ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      {/* Info */}
      <div className="p-3 md:p-4 space-y-2 md:space-y-3">
        {product.rating && (
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={`md:w-3.5 md:h-3.5 ${
                    i < Math.floor(product.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        )}

        <h4 className="font-semibold text-gray-900 text-xs md:text-sm leading-tight line-clamp-2 hover:text-emerald-700 transition-colors duration-200">
          {product.name}
        </h4>

        <div className="flex items-center gap-2">
          <span className="font-bold text-sm md:text-lg text-emerald-600">S/{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-xs md:text-sm">
              S/{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 md:py-2.5 px-2 md:px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-xs md:text-sm">
          <ShoppingCart size={14} className="md:w-4 md:h-4" />
          Agregar
        </button>
      </div>
    </div>
  );
}