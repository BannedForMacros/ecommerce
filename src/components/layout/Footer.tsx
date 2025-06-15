// src/components/layout/Footer.tsx
import Image from 'next/image'
import Link  from 'next/link'
import { Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-secondary-gray-light text-secondary-gray-dark pt-10">
      {/* ──────────────────── columnas ──────────────────── */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-12 text-sm">
        {/* 1. Categorías */}
        <div>
          <h4 className="font-semibold text-base mb-3">Categorías</h4>
          <ul className="space-y-1">
            <li><Link href="#">Abarrotes</Link></li>
            <li><Link href="#">Bebidas</Link></li>
            <li><Link href="#">Saludable</Link></li>
            <li><Link href="#">Dulces</Link></li>
            <li><Link href="#">Postres</Link></li>
            <li><Link href="#">Frutas y Verduras</Link></li>
            <li><Link href="#">Licores</Link></li>
          </ul>
        </div>

        {/* 2. Información */}
        <div>
          <h4 className="font-semibold text-base mb-3">Información</h4>
          <ul className="space-y-1">
            <li><Link href="#">Nuestras tiendas</Link></li>
            <li><Link href="#">Nuestra historia</Link></li>
            <li><Link href="#">Dirección</Link></li>
            <li><Link href="#">Teléfonos</Link></li>
            <li><Link href="#">Términos y Condiciones</Link></li>
            <li><Link href="#">Políticas y cookies</Link></li>
          </ul>
        </div>

        {/* 3. Conócenos */}
        <div>
          <h4 className="font-semibold text-base mb-3">Conócenos</h4>
          <p className="mb-3">Encuentra nuestra app en</p>

          {/* Badges: coloca los SVG/PNG en /public/badges */}
          <div className="flex gap-2 mb-6">
            <Image
              src="/badges/google-play.svg"
              alt="Google Play"
              width={110}
              height={34}
              priority
            />
            <Image
              src="/badges/app-store.svg"
              alt="App Store"
              width={110}
              height={34}
            />
          </div>

          <p className="mb-2">Síguenos en</p>
          <div className="flex gap-3">
            <Link href="#" aria-label="Facebook">
              <Facebook size={20} />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* ───── línea gris + crédito ───── */}
      <div className="border-t border-gray-300 mt-10">
        <p className="text-center py-4 font-semibold">2025 Data Business</p>
      </div>
    </footer>
  )
}
