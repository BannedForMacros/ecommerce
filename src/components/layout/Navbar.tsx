// src/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, MapPin, ShoppingCart, User } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { useLocation } from '@/context/LocationContext';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import RegistrationModal from './RegistrationModal';

export default function Navbar() {
  const { openSidebar, favorites } = useFavorites();
  const { openLocationPicker, location } = useLocation();
  const path = usePathname();
  const [isRegOpen, setIsRegOpen] = useState(false);

  const tabs = [
    { label: 'Inicio',    href: '/' },
    { label: 'Góndolas',  href: '/gondolas' },
    { label: 'Favoritos', href: '/favoritos' },
  ];

  return (
    <>
      <header>
        {/* Franja roja */}
        <div className="bg-red-600 text-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Galvan" width={170} height={40} priority />
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <button onClick={openSidebar} className="flex items-center gap-1 hover:opacity-80">
                <Heart className="w-5 h-5" />
                <span>FAVORITOS
                  {favorites.length > 0 && (
                    <span className="ml-1 px-1 bg-white text-green-700 rounded text-xs">
                      {favorites.length}
                    </span>
                  )}
                </span>
              </button>
              <button onClick={openLocationPicker} className="flex items-center gap-1 hover:opacity-80">
                <MapPin className="w-5 h-5" />
                <span>MI UBICACIÓN
                  {location && (
                    <span className="ml-1 px-1 bg-white text-green-700 rounded text-xs whitespace-nowrap">
                      {location}
                    </span>
                  )}
                </span>
              </button>
              <button className="flex items-center gap-1 hover:opacity-80">
                <ShoppingCart className="w-5 h-5" />
                <span>CARRITO</span>
              </button>
              <button onClick={() => setIsRegOpen(true)} className="flex items-center gap-1 hover:opacity-80">
                <User className="w-5 h-5" />
                <span>REGISTRO</span>
              </button>
            </div>
          </div>
        </div>

        {/* Franja verde */}
        <div className="bg-green-600 text-white">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-2 px-4 py-2">
            <nav className="flex flex-wrap gap-2 w-full sm:w-auto">
              {tabs.map(({ label, href }) => {
                const isActive = path === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      px-3 py-1 rounded-full text-xs md:text-sm font-medium transition
                      ${isActive
                        ? 'bg-green-700 text-white'
                        : 'bg-white text-green-600 hover:bg-green-100'}
                    `}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
            <div className="w-full sm:max-w-md relative">
              <input
                type="text"
                placeholder="¿Qué producto estás buscando?"
                className="
                  block w-full pr-12 pl-3 py-2 rounded-full
                  border border-white bg-transparent
                  text-white placeholder-white/90 text-sm
                  focus:outline-none focus:ring-2 focus:ring-white
                "
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modal de Registro */}
      <RegistrationModal isOpen={isRegOpen} onClose={() => setIsRegOpen(false)} />
    </>
  );
}
