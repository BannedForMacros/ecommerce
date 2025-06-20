import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FavoritesSidebar from '../components/layout/FavoritesSidebar';
import { FavoritesProvider } from '../context/FavoritesContext';

export const metadata = {
  title: 'Galvan Store',
  description: 'Tienda online',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-secondary-gray-light text-secondary-gray-dark">
        {/* 1) Envuelvo TODO en el provider */}
        <FavoritesProvider>
          {/* 2) El Navbar y el Sidebar (⚠️ no necesitas volver a incluirlo en cada página) */}
          <Navbar />
          <FavoritesSidebar />
          <main>{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
