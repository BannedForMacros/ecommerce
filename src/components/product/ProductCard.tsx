'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useState } from 'react';

/* ---------- tipos ---------- */
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;       // archivo en /public/products/
  discount?: number;
}

interface Props {
  product: Product;
  initiallyFav?: boolean;
}

/* ---------- tarjeta ---------- */
export default function ProductCard({ product, initiallyFav = false }: Props) {
  const [fav, setFav] = useState(initiallyFav);

  return (
    <article
      className="
        relative shrink-0 snap-start
        w-40 sm:w-44 lg:w-48 min-h-[240px]
        bg-white rounded-lg border border-gray-100
        shadow-sm hover:shadow-md transition-shadow
        overflow-hidden
      "
    >
      {/* Botón favorito */}
      <button
        onClick={() => setFav(!fav)}
        aria-label="Marcar favorito"
        className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center
          transition-colors ${fav ? 'bg-green-500 text-white' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
      >
        <Heart size={14} fill={fav ? 'currentColor' : 'none'} />
      </button>

      {/* Imagen */}
      <div className="h-32 flex items-center justify-center p-4">
        <Image
          src={`/products/${product.image}.jpg`}
          alt={product.name}
          width={100}
          height={100}
          className="object-contain max-h-full"
        />
      </div>

      {/* Descripción y precio */}
      <div className="p-3 pt-0">
        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {product.originalPrice && (
          <span className="text-xs text-gray-400 line-through">
            S/ {product.originalPrice.toFixed(2)}
          </span>
        )}

        <div className="flex items-center justify-between mt-1">
          <span className="text-lg font-bold text-red-600">
            S/ {product.price.toFixed(2)}
          </span>

          {product.discount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
