'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, MapPin } from 'lucide-react';

export default function Navbar() {
  return (
    <header>
      {/* ── Franja roja superior ─────────────────────────────── */}
      <div className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          {/* Logo: imagen en vez de texto/ícono */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"          /* ⇠ logo en public/images/ */
              alt="Galvan"
              width={200}
              height={200}
              priority
            />
          </Link>

          {/* Íconos lado derecho */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>MIS FAVORITOS</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>MI UBICACIÓN</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Franja verde con navegación + buscador ───────────── */}
      <div className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 py-2">
          {/* Botones */}
          <button className="bg-green-700 hover:bg-green-800 px-3 py-1 rounded text-xs md:text-sm font-medium">
            🏠 INICIO
          </button>
          <button className="hover:bg-green-700 px-3 py-1 rounded text-xs md:text-sm font-medium">
            📋 CATÁLOGO
          </button>
          <button className="hover:bg-green-700 px-3 py-1 rounded text-xs md:text-sm font-medium">
            ❤️ FAVORITOS
          </button>

          {/* Buscador */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="¿Qué producto estás buscando?"
                className="
                  w-full pr-9 pl-3 py-1.5 rounded
                  border border-white             /* borde blanco */
                  text-black placeholder-gray-500 /* texto más negro */
                  text-sm focus:outline-none focus:ring-2 focus:ring-white
                "
              />
              <button
                className="absolute right-1 top-1/2 -translate-y-1/2
                           bg-green-600 hover:bg-green-700 p-1 rounded"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
