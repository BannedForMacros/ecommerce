import './globals.css'
import Navbar        from '@/components/layout/Navbar'
import Footer        from '@/components/layout/Footer'
import FavoritesSidebar from '@/components/layout/FavoritesSidebar'
import CartSidebar   from '@/components/layout/CartSidebar'
import LocationPicker from '@/components/ui/LocationPicker'

import { FavoritesProvider } from '@/context/FavoritesContext'
import { LocationProvider  } from '@/context/LocationContext'
import { CartProvider      } from '@/context/CartContext'

export const metadata = {
  title: 'Galvan Store',
  description: 'Tienda online',
}

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-secondary-gray-light text-secondary-gray-dark">
        <FavoritesProvider>
          <LocationProvider>
            <CartProvider>
              <Navbar />
              <FavoritesSidebar />
              <CartSidebar />
              <LocationPicker />

              <main>{children}</main>
              <Footer />
            </CartProvider>
          </LocationProvider>
        </FavoritesProvider>
      </body>
    </html>
  )
}
