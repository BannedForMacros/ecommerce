// src/components/layout/FavoritesSidebar.tsx
'use client';

import { useFavorites } from '@/context/FavoritesContext';
import { X, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FavoritesSidebar() {
  const { favorites, isOpen, closeSidebar, toggleFavorite } = useFavorites();
  const [redBarHeight, setRedBarHeight] = useState(0);
  const [fullHeaderHeight, setFullHeaderHeight] = useState(0);

  // Mide la franja roja y el header completo
  useEffect(() => {
    const redEl = document.querySelector('.bg-red-600');
    if (redEl) setRedBarHeight(redEl.getBoundingClientRect().height);
    const headerEl = document.querySelector('header');
    if (headerEl) setFullHeaderHeight(headerEl.getBoundingClientRect().height);
  }, []);

  // Cuando el sidebar abre, bloquea scroll y compensa el scrollbar width
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - html.clientWidth;
      body.style.overflow = 'hidden';
      html.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      body.style.overflow = '';
      html.style.paddingRight = '';
    }
    return () => {
      body.style.overflow = '';
      html.style.paddingRight = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay gris con blur y fade */}
      <div
        style={{
          top: fullHeaderHeight,
          height: `calc(100vh - ${fullHeaderHeight}px)`,
        }}
        className={`
          fixed inset-x-0 bg-black/30 backdrop-blur-sm
          transition-opacity duration-500 ease-out
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          z-40
        `}
        onClick={closeSidebar}
      />

      {/* Sidebar animado */}
      <aside
        style={{
          top: redBarHeight,
          height: `calc(100vh - ${redBarHeight}px)`,
        }}
        className={`
          fixed right-0 w-80 bg-white shadow-2xl rounded-l-2xl
          transform transition-all duration-500 ease-out origin-top-right
          ${isOpen
            ? 'translate-x-0 scale-100 opacity-100'
            : 'translate-x-full scale-95 opacity-0'}
          z-50
        `}
      >
        {/* Cabecera */}
        <div className="bg-green-600 text-white px-4 py-3 flex items-center justify-between rounded-tl-2xl">
          <h2 className="font-semibold text-lg">Mi Lista de Favoritos</h2>
          <button onClick={closeSidebar}>
            <X size={20} />
          </button>
        </div>

        {/* Contenido scrollable */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-7rem)]">
          {favorites.length === 0 ? (
            <p className="text-gray-500">Aún no tienes favoritos.</p>
          ) : (
            favorites.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 border-b pb-3 last:border-b-0"
              >
                <img
                  src={`/products/${p.image}.jpg`}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium leading-tight">{p.name}</p>
                  <p className="text-emerald-600 text-sm">
                    S/{p.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => toggleFavorite(p)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Quitar
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pie: Vaciar todos */}
        {favorites.length > 0 && (
          <div className="p-4 border-t">
            <button
              onClick={() => favorites.forEach(toggleFavorite)}
              className="w-full flex items-center justify-center gap-2 text-sm
                         px-4 py-2 rounded border text-gray-600 hover:bg-gray-100 transition"
            >
              <Trash2 size={16} /> Vaciar Favoritos
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
