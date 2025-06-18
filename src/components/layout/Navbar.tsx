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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Galvan"
              width={170}
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
        <div className="
            max-w-7xl mx-auto
            flex flex-col sm:flex-row
            items-start sm:items-center
            gap-2 px-4 py-2
          ">
          {/* Botones */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button className="bg-green-700 hover:bg-green-800 px-3 py-1 rounded text-xs md:text-sm font-medium">
              🏠 INICIO
            </button>
            <button className="hover:bg-green-700 px-3 py-1 rounded text-xs md:text-sm font-medium">
              📋 CATÁLOGO
            </button>
            <button className="hover:bg-green-700 px-3 py-1 rounded text-xs md:text-sm font-medium">
              ❤️ FAVORITOS
            </button>
          </div>

          {/* Buscador: full width en xs, inline sm+ */}
          <div className="w-full sm:max-w-md relative">
            <input
              type="text"
              placeholder="¿Qué producto estás buscando?"
              className="
                block w-full
                pr-12 pl-3 py-2 rounded
                border border-white bg-transparent
                text-white placeholder-white/90
                text-sm focus:outline-none focus:ring-2 focus:ring-white
              "
            />
            <button
              className="
                absolute right-0 top-1/2 -translate-y-1/2
                p-3 sm:p-2
                bg-white/10 hover:bg-white/20
                rounded transition-colors
                flex items-center justify-center
              "
            >
              <Search className="w-6 h-6 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
