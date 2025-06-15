// src/components/sections/HeroBanner.tsx
import Image from 'next/image';

export default function HeroBanner() {
  return (
    <section className="bg-white py-6">
      {/* Contenedor centrado */}
      <div className="relative mx-auto w-full max-w-5xl">
        {/* Imagen — ocupa SOLO el ancho del contenedor, no el viewport */}
        <Image
          src="/images/banner.jpg"
          alt="Banner principal"
          width={1200}          // ajusta a tu archivo
          height={320}          // mantiene proporción
          priority
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>
    </section>
  );
}
