// src/components/layout/Navbar.tsx
import Link from 'next/link';
import { Search, Heart, MapPin, Car } from 'lucide-react';

export default function Navbar() {
  return (
    <header>
      {/* Sección Roja Superior */}
      <div className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo GALVAN con ícono de coche */}
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-white rounded-full p-1.5">
                <Car className="w-5 h-5 text-red-600" />
              </div>
              <span className="font-bold text-xl tracking-wider">GALVAN</span>
            </Link>
            
            {/* Íconos del lado derecho */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm">
                <Heart className="w-4 h-4" />
                <span>MIS FAVORITOS</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <MapPin className="w-4 h-4" />
                <span>MI UBICACIÓN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sección Verde Inferior */}
      <div className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-4">
            {/* Botones de navegación */}
            <button className="bg-green-700 hover:bg-green-800 px-3 py-1 rounded text-sm font-medium transition-colors">
              🏠 INICIO
            </button>
            <button className="hover:bg-green-700 px-3 py-1 rounded text-sm font-medium transition-colors">
              📋 CATÁLOGO
            </button>
            <button className="hover:bg-green-700 px-3 py-1 rounded text-sm font-medium transition-colors">
              ❤️ FAVORITOS
            </button>
            
            {/* Barra de búsqueda */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="¿Qué producto estás buscando?"
                  className="w-full px-3 py-1.5 rounded text-black-800 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 p-1 rounded transition-colors">
                  <Search className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}