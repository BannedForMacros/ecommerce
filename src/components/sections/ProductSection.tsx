// src/components/sections/ProductSection.tsx
'use client';

import React, { useRef, useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Tilt from 'react-parallax-tilt';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
  Star,
  X
} from 'lucide-react';

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

/* ────────────────── ProductSection ────────────────── */
export default function ProductSection({ rows }: Props) {
  const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute('data-row-index'));
            setVisibleRows(v => new Set(v).add(idx));
          }
        });
      },
      { threshold: 0.1, rootMargin: '20px' }
    );
    document.querySelectorAll<HTMLElement>('[data-row-index]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ───────── Sección de filas ───────── */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {rows.map((row, idx) => (
            <div
              key={idx}
              data-row-index={idx}
              className={`transition-all duration-700 ease-out ${
                visibleRows.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <RowBlock
                title={row.title}
                link={row.link}
                products={row.products}
                onProductClick={p => setModalProduct(p)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ───────── Modal ───────── */}
      <Transition.Root show={!!modalProduct} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          open={!!modalProduct}
          onClose={() => setModalProduct(null)}
        >
          <div className="flex min-h-screen items-center justify-center px-4 text-center">
            {/* Overlay semitransparente */}
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/40 pointer-events-none" />
            </Transition.Child>

            {/* Centrado vertical */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            {/* Panel */}
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {modalProduct && (
                <Dialog.Panel className="relative z-50 inline-block w-full max-w-3xl p-4 md:p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  {/* Botón de cerrar */}
                  <button
                    className="absolute top-4 right-4 z-20 text-gray-500 hover:text-gray-700"
                    onClick={() => setModalProduct(null)}
                  >
                    <X size={24} />
                  </button>

                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Imagen interactiva 3D */}
                    <Tilt
                      glareEnable
                      glareMaxOpacity={0.25}
                      glareColor="#ffffff"
                      tiltMaxAngleX={20}
                      tiltMaxAngleY={20}
                      className="z-0 w-full md:w-1/2 h-64 md:h-auto rounded-lg overflow-hidden bg-gray-100"
                    >
                      <img
                        src={`/products/${modalProduct.image}.jpg`}
                        alt={modalProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </Tilt>

                    {/* Detalles del producto */}
                    <div className="flex-1 space-y-4">
                      <Dialog.Title as="h3" className="text-xl md:text-2xl font-bold text-gray-900">
                        {modalProduct.name}
                      </Dialog.Title>

                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 text-xl font-bold">
                          S/{modalProduct.price.toFixed(2)}
                        </span>
                        {modalProduct.originalPrice && (
                          <span className="text-gray-400 line-through">
                            S/{modalProduct.originalPrice.toFixed(2)}
                          </span>
                        )}
                        {modalProduct.discount && (
                          <span className="ml-auto bg-red-500 text-white px-2 py-0.5 rounded text-sm">
                            -{modalProduct.discount}%
                          </span>
                        )}
                      </div>

                      {modalProduct.rating != null && (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              className={
                                i < Math.floor(modalProduct.rating!)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }
                            />
                          ))}
                          <span className="text-gray-500 text-sm">({modalProduct.reviews})</span>
                        </div>
                      )}

                      <p className="text-gray-700 text-sm">
                        Aquí puedes detallar ingredientes, usos y toda la información del producto.
                      </p>

                      <button
                        onClick={() => setModalProduct(null)}
                        className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={18} /> Agregar al carrito
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              )}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

/* ────────────────── RowBlock ────────────────── */
function RowBlock({
  title,
  link = '#',
  products,
  onProductClick
}: Row & { onProductClick: (p: Product) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setCanLeft(track.scrollLeft > 5);
      setCanRight(track.scrollLeft < track.scrollWidth - track.clientWidth - 5);
    };
    track.addEventListener('scroll', update);
    update();
    return () => track.removeEventListener('scroll', update);
  }, []);

  const handleScroll = (dir: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;
    const amount = window.innerWidth < 768 ? track.clientWidth : 340;
    track.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <a
          href={link}
          className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1"
        >
          Ver más <ChevronRight size={16} />
        </a>
      </div>

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
            <ProductCard key={p.id} product={p} index={i} onClick={() => onProductClick(p)} />
          ))}
        </div>

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

/* ────────────────── ProductCard ────────────────── */
function ProductCard({
  product,
  index,
  onClick
}: {
  product: Product;
  index: number;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  const [liked, setLiked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && !loaded) setLoaded(true);
  }, [loaded]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="cursor-pointer snap-start relative flex-shrink-0 w-[calc((100vw-88px)/2)] md:w-72 bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300"
      style={{ animationDelay: `${index * 80}ms`, transform: hover ? 'translateY(-4px)' : 'translateY(0px)' }}
    >
      {product.discount && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
          -{product.discount}%
        </div>
      )}
      {product.badge && (
        <div
          className={`absolute top-3 right-3 z-10 px-2 py-1 rounded-md text-xs font-semibold text-white ${
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

      <div
        className={`absolute top-3 right-3 z-10 flex flex-col gap-2 transition-all duration-300 ${
          hover ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
      >
        <button
          onClick={e => {
            e.stopPropagation();
            setLiked(!liked);
          }}
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

      <div className="relative h-32 md:h-48 bg-gray-100 overflow-hidden">
        {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        <img
          ref={imgRef}
          src={`/products/${product.image}.jpg`}
          alt={product.name}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hover ? 'scale-105' : 'scale-100'
          } ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <div className="p-3 md:p-4 space-y-2 md:space-y-3">
        {product.rating != null && (
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
          <span className="font-bold text-sm md:text-lg text-emerald-600">
            S/{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-xs md:text-sm">
              S/{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 md:py-2.5 px-2 md:px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-xs md:text-sm">
          <ShoppingCart size={14} className="md:w-4 md:h-4" /> Agregar
        </button>
      </div>
    </div>
  );
}
