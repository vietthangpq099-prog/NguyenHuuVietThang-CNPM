import ThanhMenu from '@/components/layout/ThanhMenu';
import ChanTrang from '@/components/layout/ChanTrang';
import FloatingContact from '@/components/ui/FloatingContact';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ThanhMenu />
      {/* CỔNG LIÊN KẾT VỚI HEROBANNER (VÀ CÁC TRANG KHÁC):
          - Biến {children} đóng vai trò là phần thân của trang web.
          - Cơ chế Routing của Next.js sẽ tự động lấy nội dung của nơi chứa HeroBanner
            và bơm thẳng vào vị trí chữ {children} này.
          - Vì {children} nằm ngay dưới <ThanhMenu />, nên HeroBanner sẽ luôn nằm dưới thanh menu. */}
      <main className="flex-1">{children}</main>
      <ChanTrang />
      <FloatingContact />
    </div>
  );
}
