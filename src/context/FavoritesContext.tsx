// src/context/FavoritesContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Product } from '@/components/sections/ProductSection';

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (p: Product) => void;
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Carga desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem('galvan-fav');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // Persiste en localStorage
  useEffect(() => {
    localStorage.setItem('galvan-fav', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.some(x => x.id === product.id);
      if (exists) return prev.filter(x => x.id !== product.id);
      return [...prev, product];
    });
    // sonido de feedback
    const audio = new Audio('/sounds/favorite.mp3');
    audio.volume = 0.5;
    audio.play();
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isOpen,
        openSidebar: () => setIsOpen(true),
        closeSidebar: () => setIsOpen(false)
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
