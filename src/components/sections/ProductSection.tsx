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
  greenPercent?: number;
}

const BG_GREEN = '#e6f8ee';

export default function ProductSection({ rows, greenPercent = 60 }: Props) {
  const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-row-index') || '0');
            setVisibleRows(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    const rowElements = document.querySelectorAll('[data-row-index]');
    rowElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Fondo con división en forma de ola */}
      <div className="absolute inset-0">
        {/* Parte verde */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, ${BG_GREEN} 0%, #dcf4e3 100%)`,
            height: `${greenPercent}%`
          }}
        />
        
        {/* SVG de ola divisoria */}
        <svg 
          className="absolute left-0 w-full z-10"
          style={{ top: `${greenPercent - 10}%` }}
          viewBox="0 0 1440 200" 
          preserveAspectRatio="none"
        >
          {/* Ola animada de fondo */}
          <path
            fill="url(#waveGradientBg)"
            d="M0 60 C240 120 480 40 720 80 C960 120 1200 40 1440 60 L1440 200 L0 200 Z"
          >
            <animate
              attributeName="d"
              values="M0 60 C240 120 480 40 720 80 C960 120 1200 40 1440 60 L1440 200 L0 200 Z;
                      M0 80 C240 40 480 120 720 60 C960 40 1200 120 1440 80 L1440 200 L0 200 Z;
                      M0 60 C240 120 480 40 720 80 C960 120 1200 40 1440 60 L1440 200 L0 200 Z"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Ola principal blanca */}
          <path
            fill="#ffffff"
            d="M0 40 C240 100 480 20 720 60 C960 100 1200 20 1440 40 L1440 200 L0 200 Z"
          >
            <animate
              attributeName="d"
              values="M0 40 C240 100 480 20 720 60 C960 100 1200 20 1440 40 L1440 200 L0 200 Z;
                      M0 60 C240 20 480 100 720 40 C960 20 1200 100 1440 60 L1440 200 L0 200 Z;
                      M0 40 C240 100 480 20 720 60 C960 100 1200 20 1440 40 L1440 200 L0 200 Z"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
          
          <defs>
            <linearGradient id="waveGradientBg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.4 }} />
              <stop offset="50%" style={{ stopColor: '#34d399', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#6ee7b7', stopOpacity: 0.4 }} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Parte blanca */}
        <div 
          className="absolute inset-0 bg-white"
          style={{ 
            top: `${greenPercent}%`,
            height: `${100 - greenPercent}%`
          }}
        />
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-48 h-48 bg-green-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-emerald-100 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-green-300 rounded-full blur-2xl animate-pulse delay-3000"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 max-w-7xl mx-auto space-y-20 px-4 pt-24 pb-40">
        {rows.map((row, idx) => (
          <div
            key={`${row.title}-${idx}`}
            data-row-index={idx}
            className={`transform transition-all duration-1000 ease-out ${
              visibleRows.has(idx) 
                ? 'translate-y-0 opacity-100 scale-100' 
                : 'translate-y-16 opacity-0 scale-95'
            }`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <RowBlock {...row} />
          </div>
        ))}
      </div>

      <WaveBottomMulti />
    </section>
  );
}

/* ──────────── Fila/Row ultra mejorada ──────────── */
function RowBlock({ title, link = '#', products }: Row) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const updateScrollButtons = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => track.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const scroll = async (dir: 'l' | 'r') => {
    if (!trackRef.current || isScrolling) return;
    
    setIsScrolling(true);
    const scrollAmount = 380;
    
    trackRef.current.scrollBy({
      left: dir === 'l' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(() => setIsScrolling(false), 600);
  };

  return (
    <div className="group relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 border border-emerald-100/50 overflow-hidden">
      {/* Efectos de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Header premium */}
      <header className="relative bg-gradient-to-br from-emerald-50/80 to-green-50/80 backdrop-blur-sm px-10 py-8 border-b border-emerald-100/40">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="font-black text-3xl bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-800 bg-clip-text text-transparent">
              {title}
            </h3>
            <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>
          
          <a 
            href={link} 
            className="group/link relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              Ver más
              <ChevronRight 
                size={18} 
                className="transform group-hover/link:translate-x-1 transition-transform duration-300" 
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left"></div>
          </a>
        </div>
      </header>

      <div className="relative px-10 py-10">
        {/* Botones de navegación premium */}
        <button
          onClick={() => scroll('l')}
          disabled={!canScrollLeft}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 
                     w-14 h-14 rounded-full shadow-2xl backdrop-blur-xl
                     flex items-center justify-center transition-all duration-400
                     border-2 border-white/60 hover:scale-125 hover:shadow-3xl
                     ${canScrollLeft 
                       ? 'bg-white/95 text-emerald-600 hover:bg-white cursor-pointer hover:border-emerald-300' 
                       : 'bg-gray-100/50 text-gray-300 cursor-not-allowed'
                     }`}
        >
          <ChevronLeft size={24} className={`transition-all duration-300 ${!isScrolling && canScrollLeft ? 'hover:-translate-x-1' : ''}`} />
        </button>

        <button
          onClick={() => scroll('r')}
          disabled={!canScrollRight}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-30
                     w-14 h-14 rounded-full shadow-2xl backdrop-blur-xl
                     flex items-center justify-center transition-all duration-400
                     border-2 border-white/60 hover:scale-125 hover:shadow-3xl
                     ${canScrollRight 
                       ? 'bg-white/95 text-emerald-600 hover:bg-white cursor-pointer hover:border-emerald-300' 
                       : 'bg-gray-100/50 text-gray-300 cursor-not-allowed'
                     }`}
        >
          <ChevronRight size={24} className={`transition-all duration-300 ${!isScrolling && canScrollRight ? 'hover:translate-x-1' : ''}`} />
        </button>

        {/* Carrusel premium */}
        <div
          ref={trackRef}
          className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide px-20"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <PremiumProductCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>

        {/* Gradientes laterales mejorados */}
        <div className={`absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-25 transition-opacity duration-500 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full h-full bg-gradient-to-r from-white/95 via-white/60 to-transparent backdrop-blur-sm"></div>
        </div>
        <div className={`absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-25 transition-opacity duration-500 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full h-full bg-gradient-to-l from-white/95 via-white/60 to-transparent backdrop-blur-sm"></div>
        </div>
      </div>
    </div>
  );
}

/* ──────────── Tarjeta de producto ultra premium ──────────── */
function PremiumProductCard({ product, index }: { product: Product; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setShowHeartAnimation(true);
    setTimeout(() => setShowHeartAnimation(false), 600);
  };

    /* 👇 NUEVO */
    const imgRef = useRef<HTMLImageElement>(null);

    /* 👇 NUEVO
       Si la imagen estaba en caché cuando el componente se monta,
       `onLoad` ya se disparó y React no lo escuchó.
       Con este efecto comprobamos y marcamos la carga manualmente. */
    useEffect(() => {
      if (imgRef.current?.complete && !imageLoaded) {
        setImageLoaded(true);
      }
    }, []);
  

  return (
    <div
      className="group relative flex-shrink-0 w-80 bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-700 border border-gray-200/50 hover:border-emerald-300/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        animationDelay: `${index * 100}ms`,
        transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0px) scale(1)'
      }}
    >
      {/* Efecto de brillo en hover */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-emerald-100/20 to-transparent transform -skew-x-12 transition-all duration-700 ${
        isHovered ? 'translate-x-full' : '-translate-x-full'
      }`}></div>

      {/* Badge flotante premium */}
      {product.badge && (
        <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold text-white shadow-xl backdrop-blur-sm border border-white/30 transform transition-all duration-300 hover:scale-110
                        ${product.badge === 'New' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                          product.badge === 'Hot' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                          product.badge === 'Bestseller' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                          'bg-gradient-to-r from-purple-500 to-purple-600'}`}>
          {product.badge}
        </div>
      )}

      {/* Descuento premium */}
      {product.discount && (
        <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-xl backdrop-blur-sm border border-white/30 transform hover:scale-110 transition-all duration-300">
          -{product.discount}%
        </div>
      )}

      {/* Botones de acción rápida mejorados */}
      <div className={`absolute top-1/2 right-4 -translate-y-1/2 z-20 flex flex-col gap-3 transition-all duration-500 ${
        isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
      }`}>
        <button 
          onClick={handleLike}
          className={`relative p-3 rounded-full backdrop-blur-xl border-2 border-white/50 transition-all duration-300 hover:scale-125 shadow-xl ${
            isLiked ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-white/90 text-gray-600 hover:bg-white hover:text-emerald-500'
          }`}
        >
          <Heart size={18} className={`transition-all duration-300 ${isLiked ? 'fill-current scale-110' : ''}`} />
          
          {/* Animación de corazones flotantes */}
          {showHeartAnimation && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <Heart
                  key={i}
                  size={12}
                  className="absolute top-1/2 left-1/2 text-emerald-500 fill-current animate-ping"
                  style={{
                    animationDelay: `${i * 100}ms`,
                    animationDuration: '600ms',
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-${20 + i * 5}px)`
                  }}
                />
              ))}
            </div>
          )}
        </button>
        
        <button className="p-3 bg-white/90 backdrop-blur-xl rounded-full border-2 border-white/50 text-gray-600 hover:bg-white hover:scale-125 hover:text-emerald-500 transition-all duration-300 shadow-xl">
          <Eye size={18} />
        </button>
        
        <button className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 backdrop-blur-xl rounded-full border-2 border-white/50 text-white hover:from-emerald-600 hover:to-green-600 hover:scale-125 transition-all duration-300 shadow-xl">
          <ShoppingCart size={18} />
        </button>
      </div>

      {/* Imagen del producto mejorada */}
      <div className="relative h-64 overflow-hidden …">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      )}

      <img
        ref={imgRef}                                
        src={`/products/${product.image}.jpg`}
        alt={product.name}
        onLoad={() => setImageLoaded(true)}           
        className={`
          w-full h-full object-cover transition-all duration-700
          ${isHovered ? 'scale-115 rotate-1' : 'scale-100 rotate-0'}
          ${imageLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />
        
        {/* Overlay con gradiente dinámico */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>

        {/* Efecto de reflejo */}
        <div className={`absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>

      {/* Información del producto mejorada */}
      <div className="p-6 space-y-4 bg-gradient-to-b from-white to-gray-50/50">
        {/* Rating premium */}
        {product.rating && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="relative">
                  <Star size={16} className="text-gray-300" />
                  <div 
                    className="absolute inset-0 text-yellow-400 overflow-hidden transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, (product.rating! - i) * 100))}%` }}
                  >
                    <Star size={16} className="fill-current" />
                  </div>
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500 font-medium">
              {product.rating} ({product.reviews} reseñas)
            </span>
          </div>
        )}

        {/* Nombre del producto */}
        <h4 className="font-bold text-xl text-gray-800 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300 leading-tight">
          {product.name}
        </h4>

        {/* Precios premium */}
        <div className="flex items-center gap-4">
          <span className="font-black text-2xl bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-lg font-medium">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Botón de compra premium */}
        <button className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 shadow-lg">
          <span className="flex items-center justify-center gap-2">
            <ShoppingCart size={20} />
            Agregar al carrito
          </span>
        </button>
      </div>
    </div>
  );
}

/* ──────────── Ola inferior premium ──────────── */
function WaveBottomMulti() {
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <svg
        className="w-full pointer-events-none"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        {/* Múltiples capas de olas */}
        <path
          fill="url(#waveGradient1)"
          d="M0 80 C320 120 720 40 1120 80 C1280 100 1360 90 1440 80 L1440 120 L0 120 Z"
          opacity="0.3"
        >
          <animate
            attributeName="d"
            values="M0 80 C320 120 720 40 1120 80 C1280 100 1360 90 1440 80 L1440 120 L0 120 Z;
                    M0 60 C320 40 720 120 1120 60 C1280 40 1360 50 1440 60 L1440 120 L0 120 Z;
                    M0 80 C320 120 720 40 1120 80 C1280 100 1360 90 1440 80 L1440 120 L0 120 Z"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
        
        <path
          fill="url(#waveGradient2)"
          d="M0 60 C240 100 480 20 720 60 C960 100 1200 20 1440 60 L1440 120 L0 120 Z"
          opacity="0.5"
        >
          <animate
            attributeName="d"
            values="M0 60 C240 100 480 20 720 60 C960 100 1200 20 1440 60 L1440 120 L0 120 Z;
                    M0 80 C240 20 480 100 720 40 C960 20 1200 100 1440 80 L1440 120 L0 120 Z;
                    M0 60 C240 100 480 20 720 60 C960 100 1200 20 1440 60 L1440 120 L0 120 Z"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Ola principal */}
        <path
          fill="#ffffff"
          d="M0 40 C320 80 720 20 1120 40 C1280 50 1360 45 1440 40 L1440 120 L0 120 Z"
        >
          <animate
            attributeName="d"
            values="M0 40 C320 80 720 20 1120 40 C1280 50 1360 45 1440 40 L1440 120 L0 120 Z;
                    M0 60 C320 20 720 80 1120 60 C1280 70 1360 65 1440 60 L1440 120 L0 120 Z;
                    M0 40 C320 80 720 20 1120 40 C1280 50 1360 45 1440 40 L1440 120 L0 120 Z"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
        
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.6 }} />
            <stop offset="50%" style={{ stopColor: '#34d399', stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: '#6ee7b7', stopOpacity: 0.6 }} />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#059669', stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: '#10b981', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#34d399', stopOpacity: 0.8 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}