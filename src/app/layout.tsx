import './globals.css';              // ya lo tenías
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const metadata = { title: 'Galvan Store', description: 'Tienda online' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-secondary-gray-light text-secondary-gray-dark">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
