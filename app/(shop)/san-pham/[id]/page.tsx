'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, Eye, ChevronRight, Minus, Plus } from 'lucide-react';
import { mockProducts, formatPrice } from '@/lib/data/mock-products';
import { useGioHang } from '@/lib/context/CartContext';
import GalleryAnh from '@/components/san-pham/GalleryAnh';
import ProductCard from '@/components/product/ProductCard';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const bangMauSac: Record<string, string> = {
  Gold: '#C9A84C', Silver: '#A8A9AD', Black: '#1a1a1a', Blue: '#3B82F6',
  Red: '#EF4444', Coral: '#EF4444', Green: '#22C55E', Rose: '#F43F5E',
  Pink: '#EC4899', Tortoise: '#8B4513', White: '#F5F5F5', Grey: '#6B7280',
  Bronze: '#CD7F32', Navy: '#1e3a5f', Lavender: '#9F7AEA',
};

function layMauHex(tenMau: string): string {
  for (const [key, hex] of Object.entries(bangMauSac)) {
    if (tenMau.includes(key)) return hex;
  }
  return '#9CA3AF';
}

export default function TrangChiTietSanPham({ params }: { params: { id: string } }) {
  const sanPham = mockProducts.find((sp) => sp.id === params.id);
  const { themVaoGio } = useGioHang();
  const [mauDaChon, setMauDaChon] = useState(sanPham?.colors[0] || '');
  const [soLuong, setSoLuong] = useState(1);
  const [daThich, setDaThich] = useState(false);
  const [daThemVaoGio, setDaThemVaoGio] = useState(false);

  if (!sanPham) {
    return (
      <div className="container-main py-24 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="font-serif text-2xl font-bold text-neutral-900 mb-3">Không tìm thấy sản phẩm</h1>
        <p className="text-neutral-500 mb-6">Sản phẩm này không tồn tại hoặc đã bị xóa.</p>
        <Link href="/san-pham" className="inline-flex items-center gap-2 bg-neutral-950 text-white px-6 py-3 rounded-full font-semibold hover:bg-neutral-700 transition-colors">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const phanTramGiam = sanPham.originalPrice
    ? Math.round(((sanPham.originalPrice - sanPham.price) / sanPham.originalPrice) * 100)
    : null;

  const sanPhamLienQuan = mockProducts
    .filter((sp) => sp.category === sanPham.category && sp.id !== sanPham.id)
    .slice(0, 4);

  const xuLyThemVaoGio = () => {
    for (let i = 0; i < soLuong; i++) {
      themVaoGio(sanPham, mauDaChon);
    }
    setDaThemVaoGio(true);
    setTimeout(() => setDaThemVaoGio(false), 2500);
  };

  const bangThongSo = [
    { nhan: 'Danh mục', giaTri: sanPham.category === 'sunglasses' ? 'Kính mát' : sanPham.category === 'eyeglasses' ? 'Kính cận' : sanPham.category === 'fashion' ? 'Kính thời trang' : 'Kính thể thao' },
    { nhan: 'Dáng gọng', giaTri: sanPham.frameShape },
    { nhan: 'Phong cách', giaTri: sanPham.frameStyle },
    { nhan: 'Chất liệu gọng', giaTri: sanPham.frameMaterial },
    { nhan: 'Loại tròng', giaTri: sanPham.lensType },
    { nhan: 'Giới tính', giaTri: sanPham.gender === 'men' ? 'Nam' : sanPham.gender === 'women' ? 'Nữ' : 'Unisex' },
    { nhan: 'Bảo hành', giaTri: `${sanPham.warrantyMonths} tháng` },
    { nhan: 'Tồn kho', giaTri: `${sanPham.stock} sản phẩm` },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-main pt-6 pb-2">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-800 transition-colors">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link href="/san-pham" className="hover:text-neutral-800 transition-colors">Sản phẩm</Link>
          <ChevronRight size={14} />
          <span className="text-neutral-900 font-medium line-clamp-1">{sanPham.name}</span>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container-main py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cột trái — Thư viện ảnh */}
          <GalleryAnh anhDanhSach={sanPham.images} tenSanPham={sanPham.name} />

          {/* Cột phải — Thông tin sản phẩm */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {sanPham.isNew && <Badge variant="new" />}
              {sanPham.isSale && <Badge variant="sale" />}
              {sanPham.isBestseller && <Badge variant="bestseller" />}
            </div>

            {/* Thương hiệu */}
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-2">
              {sanPham.brand}
            </p>

            {/* Tên sản phẩm */}
            <h1 className="font-serif font-bold text-3xl text-neutral-950 mb-4 leading-tight">
              {sanPham.name}
            </h1>

            {/* Đánh giá */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(sanPham.rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'} />
                ))}
              </div>
              <span className="text-sm text-neutral-600">{sanPham.rating} ({sanPham.reviewCount} đánh giá)</span>
            </div>

            {/* Giá */}
            <div className="flex items-baseline gap-3 mb-6 p-4 bg-neutral-50 rounded-2xl">
              <span className="font-bold text-3xl text-neutral-950">{formatPrice(sanPham.price)}</span>
              {sanPham.originalPrice && (
                <>
                  <span className="text-lg text-neutral-400 line-through">{formatPrice(sanPham.originalPrice)}</span>
                  <span className="bg-red-500 text-white text-sm font-bold px-2 py-0.5 rounded-full">-{phanTramGiam}%</span>
                </>
              )}
            </div>

            {/* Mô tả */}
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">{sanPham.description}</p>

            {/* Chọn màu */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-neutral-800 mb-2">
                Màu sắc: <span className="text-neutral-500 font-normal">{mauDaChon}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {sanPham.colors.map((mau) => (
                  <button
                    key={mau}
                    onClick={() => setMauDaChon(mau)}
                    title={mau}
                    className={cn(
                      'w-8 h-8 rounded-full border-2 transition-all duration-150 cursor-pointer hover:scale-110',
                      mauDaChon === mau ? 'border-neutral-900 scale-110 shadow-md' : 'border-neutral-200'
                    )}
                    style={{ backgroundColor: layMauHex(mau) }}
                  />
                ))}
              </div>
            </div>

            {/* Chọn số lượng + Thêm vào giỏ */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-neutral-200 rounded-full overflow-hidden">
                <button
                  onClick={() => setSoLuong((v) => Math.max(1, v - 1))}
                  className="px-4 py-3 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-semibold text-neutral-900">{soLuong}</span>
                <button
                  onClick={() => setSoLuong((v) => Math.min(sanPham.stock, v + 1))}
                  className="px-4 py-3 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-xs text-neutral-400">Còn {sanPham.stock} sản phẩm</p>
            </div>

            {/* Nút hành động */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={xuLyThemVaoGio}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm transition-all duration-200 cursor-pointer',
                  daThemVaoGio
                    ? 'bg-emerald-500 text-white'
                    : 'bg-neutral-950 hover:bg-neutral-700 text-white'
                )}
              >
                <ShoppingCart size={18} />
                {daThemVaoGio ? '✓ Đã thêm vào giỏ!' : 'Thêm vào giỏ hàng'}
              </button>
              <button
                onClick={() => setDaThich(!daThich)}
                className="p-3.5 rounded-full border-2 border-neutral-200 hover:border-red-300 transition-colors cursor-pointer"
                aria-label="Yêu thích"
              >
                <Heart size={18} className={daThich ? 'fill-red-500 text-red-500' : 'text-neutral-500'} />
              </button>
            </div>

            {/* Nút mua ngay */}
            <Link
              href="/gio-hang"
              onClick={xuLyThemVaoGio}
              className="block w-full text-center py-3.5 rounded-full font-bold text-sm bg-[#C9A84C] hover:bg-[#A8893A] text-white transition-all duration-200 mb-8"
            >
              Mua Ngay
            </Link>

            {/* Chính sách */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, tieu_de: 'Bảo hành', mo_ta: `${sanPham.warrantyMonths} tháng chính hãng` },
                { icon: Truck, tieu_de: 'Giao hàng', mo_ta: 'Miễn phí từ 500k' },
                { icon: RotateCcw, tieu_de: 'Đổi trả', mo_ta: '30 ngày dễ dàng' },
              ].map((cs) => (
                <div key={cs.tieu_de} className="bg-neutral-50 rounded-2xl p-3 text-center">
                  <cs.icon size={20} className="text-[#C9A84C] mx-auto mb-1.5" />
                  <p className="font-semibold text-xs text-neutral-800">{cs.tieu_de}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{cs.mo_ta}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Thông số kỹ thuật */}
        <div className="mt-16">
          <h2 className="font-serif font-bold text-2xl text-neutral-950 mb-6 flex items-center gap-2">
            <Eye size={22} className="text-[#C9A84C]" />
            Thông Số Kỹ Thuật
          </h2>
          <div className="bg-neutral-50 rounded-3xl overflow-hidden">
            {bangThongSo.map((dong, i) => (
              <div key={dong.nhan} className={cn('flex items-center px-6 py-4', i % 2 === 0 ? 'bg-white' : 'bg-neutral-50')}>
                <span className="w-40 text-sm text-neutral-500 font-medium">{dong.nhan}</span>
                <span className="text-sm text-neutral-900 font-semibold capitalize">{dong.giaTri}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sản phẩm liên quan */}
        {sanPhamLienQuan.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif font-bold text-2xl text-neutral-950 mb-6">Sản Phẩm Liên Quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sanPhamLienQuan.map((sp) => (
                <ProductCard key={sp.id} product={sp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
