import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { GioHangProvider } from '@/lib/context/CartContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'OpticShop — Kính Mắt Cao Cấp', template: '%s | OpticShop' },
  description: 'Khám phá bộ sưu tập kính mắt cao cấp: kính mát, kính cận, kính thời trang và kính thể thao.',
  keywords: ['kính mắt', 'kính mát', 'kính cận', 'gọng kính', 'opticshop'],
  openGraph: { type: 'website', locale: 'vi_VN', siteName: 'OpticShop' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white">
        <GioHangProvider>
          {children}
        </GioHangProvider>
      </body>
    </html>
  );
}
