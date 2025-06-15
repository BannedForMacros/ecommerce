// src/components/sections/HeroBanner.tsx
import Image from 'next/image';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Imagen de fondo */}
      <Image
        src="/images/banner.jpg"
        alt="Banner principal"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Ajustamos la altura:  h-36 = 9rem; h-48 = 12rem; h-56 = 14rem */}
      <div className="h-36 md:h-48 lg:h-56 w-full" />
    </section>
  );
}
