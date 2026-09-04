import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'OpticShop — Kính Mắt Cao Cấp',
    template: '%s | OpticShop',
  },
  description:
    'Khám phá bộ sưu tập kính mắt cao cấp: kính mát, kính cận, kính thời trang và kính thể thao. Chất lượng đảm bảo, bảo hành 2 năm, giao hàng toàn quốc.',
  keywords: ['kính mắt', 'kính mát', 'kính cận', 'gọng kính', 'opticshop'],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://opticshop.vn',
    siteName: 'OpticShop',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
