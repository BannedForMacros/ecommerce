/* eslint-disable @next/next/no-img-element */
// src/components/layout/FavoritesSidebar.tsx
'use client';

import { useFavorites } from '@/context/FavoritesContext';
import { useLocation  } from '@/context/LocationContext';
import { X, Trash2, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

/* helper muy pequeño */
const resolveImg = (v: string) =>
  /^https?:\/\//.test(v) ? v : `/products/${v}.jpg`;

export default function FavoritesSidebar() {
  const { favorites, isOpen, closeSidebar, toggleFavorite } = useFavorites();
  const { location } = useLocation();

  const [redBarHeight,   setRedBarHeight]   = useState(0);
  const [fullHeaderHeight, setFullHeaderHeight] = useState(0);

  /* mide alturas del header */
  useEffect(() => {
    const redEl    = document.querySelector('.bg-red-600');
    if (redEl) setRedBarHeight(redEl.getBoundingClientRect().height);

    const headerEl = document.querySelector('header');
    if (headerEl) setFullHeaderHeight(headerEl.getBoundingClientRect().height);
  }, []);

  /* bloquea scroll / compensa scrollbar */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isOpen) {
      const sbw = window.innerWidth - html.clientWidth;
      body.style.overflow = 'hidden';
      html.style.paddingRight = `${sbw}px`;
    } else {
      body.style.overflow   = '';
      html.style.paddingRight = '';
    }
    return () => {
      body.style.overflow   = '';
      html.style.paddingRight = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* overlay */}
      <div
        style={{ top: fullHeaderHeight, height: `calc(100vh - ${fullHeaderHeight}px)` }}
        className={`
          fixed inset-x-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          z-40`}
        onClick={closeSidebar}
      />

      {/* sidebar */}
      <aside
        style={{ top: redBarHeight, height: `calc(100vh - ${redBarHeight}px)` }}
        className={`
          fixed right-0 w-full sm:w-80 bg-white shadow-2xl rounded-l-2xl flex flex-col
          transform transition-all duration-500 origin-top-right
          ${isOpen ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
          z-50`}
      >
        {/* cabecera */}
        <div className="bg-green-600 text-white px-4 py-3 flex items-center justify-between rounded-tl-2xl">
          <h2 className="font-semibold text-lg">Mi Lista de Favoritos</h2>
          <button onClick={closeSidebar} aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        {/* lista */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {favorites.length === 0 ? (
            <p className="text-gray-500 text-center">Aún no tienes favoritos.</p>
          ) : (
            favorites.map(p => (
              <div key={p.id} className="flex items-center gap-3 border-b pb-3 last:border-b-0">
                {/* -------- única línea cambiada: */}
                <img
                  src={resolveImg(p.image)}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="font-medium leading-tight">{p.name}</p>
                  <p className="text-emerald-600 text-sm">S/{p.price.toFixed(2)}</p>
                </div>

                <button
                  onClick={() => toggleFavorite(p)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Eliminar favorito"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* ubicación */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 text-gray-600 text-sm">
          <MapPin size={16} />
          {location ? <span>{location}</span> : <span className="italic">Seleccione ubicación</span>}
        </div>

        {/* vaciar */}
        {favorites.length > 0 && (
          <div className="px-4 py-3 border-t">
            <button
              onClick={() => favorites.forEach(toggleFavorite)}
              className="w-full flex items-center justify-center gap-2 text-sm py-2 rounded border text-gray-600 hover:bg-gray-100 transition"
            >
              <Trash2 size={16} /> Vaciar favoritos
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
