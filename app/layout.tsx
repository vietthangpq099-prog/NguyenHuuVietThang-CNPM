import type { Metadata } from 'next';
import './globals.css';
import { GioHangProvider } from '@/lib/context/CartContext';

export const metadata: Metadata = {
  title: { default: 'OpticShop — Kính Mắt Cao Cấp', template: '%s | OpticShop' },
  description: 'Khám phá bộ sưu tập kính mắt cao cấp: kính mát, kính cận, kính thời trang và kính thể thao.',
  keywords: ['kính mắt', 'kính mát', 'kính cận', 'gọng kính', 'opticshop'],
  openGraph: { type: 'website', locale: 'vi_VN', siteName: 'OpticShop' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
        <GioHangProvider>
          {children}
        </GioHangProvider>
      </body>
    </html>
  );
}
