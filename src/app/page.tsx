import HeroBanner   from '@/components/sections/HeroBanner';
import ProductSection from '@/components/sections/ProductSection';
import MegaSection  from '@/components/sections/CategoriesWave';
import WaveToRed    from '@/components/ui/WaveToRed';

import { promos, best, categories } from '@/data/homeMock';

export default function Home() {
  return (
    <>
      <HeroBanner />

      <ProductSection
        rows={[
          { title: 'Promociones',      products: promos, link: '/promos' },
          { title: 'Los más vendidos', products: best,   link: '/best'   },
          { title: 'Promociones',      products: promos, link: '/promos' },
        ]}
      />
      {/* 👉 Onda de transición */}
      <WaveToRed />

      <MegaSection categories={categories} />
    </>
  );
}
