import BannerTrangChu from '@/components/home/BannerTrangChu';
import DanhMucTrangChu from '@/components/home/DanhMucTrangChu';
import SanPhamNoiBat from '@/components/home/SanPhamNoiBat';
import KhuVucGioiThieu from '@/components/home/KhuVucGioiThieu';

export default function HomePage() {
  return (
    <>
      <BannerTrangChu />
       {/* Liên kết Banner hiện lên Trang chủ */}
      <DanhMucTrangChu />
      <SanPhamNoiBat />
      <KhuVucGioiThieu />
    </>
  );
}
