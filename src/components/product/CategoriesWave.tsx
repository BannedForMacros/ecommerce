// src/components/sections/CategoriesWave.tsx
import { ReactNode } from 'react';

export interface Category {
  id: string;
  name: string;
  icon: ReactNode;
}

export default function CategoriesWave({ categories }: { categories: Category[] }) {
  return (
    <section className="relative bg-primary-red text-white mt-16">
      <svg
        viewBox="0 0 1440 100"
        className="absolute -top-1 w-full text-primary-red"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,138.7C672,139,768,149,864,170.7C960,192,1056,224,1152,202.7C1248,181,1344,107,1392,69.3L1440,32V0H0Z"
        />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-12 pt-20">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">
          ¡Descubre toda nuestra variedad de productos!
        </h2>

        <div className="flex overflow-x-auto gap-4 pb-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              className="min-w-[110px] h-24 bg-white/90 text-primary-green rounded-xl flex flex-col items-center justify-center gap-1 px-3 shadow-product-hover"
            >
              {cat.icon}
              <span className="text-sm font-medium text-primary-red text-center">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
