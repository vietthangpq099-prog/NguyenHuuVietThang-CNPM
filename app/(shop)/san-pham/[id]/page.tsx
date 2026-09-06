'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw,
  Eye, ChevronRight, Minus, Plus, Award
} from 'lucide-react';
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

// Dữ liệu đánh giá mẫu
const danhGiaMau = [
  { ten: 'Nguyễn Minh Tuấn', sao: 5, noi_dung: 'Kính rất đẹp, chất lượng tốt, đóng gói cẩn thận. Sẽ ủng hộ shop dài dài!', ngay: '12/08/2026' },
  { ten: 'Trần Thị Lan', sao: 4, noi_dung: 'Kính đúng mô tả, giao hàng nhanh. Màu sắc đẹp hơn ngoài đời, rất hài lòng.', ngay: '05/08/2026' },
  { ten: 'Phạm Văn Hùng', sao: 5, noi_dung: 'Mẫu mã hiện đại, đeo vào rất tự tin. Nhân viên tư vấn nhiệt tình.', ngay: '28/07/2026' },
];

export default function TrangChiTietSanPham({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const sanPham = mockProducts.find((sp) => sp.id === id);
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
    for (let i = 0; i < soLuong; i++) themVaoGio(sanPham, mauDaChon);
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
    { nhan: 'Bảo hành', giaTri: `${sanPham.warrantyMonths} tháng chính hãng` },
    { nhan: 'Tồn kho', giaTri: `${sanPham.stock} sản phẩm` },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-main pt-6 pb-2">
        <div className="flex items-center gap-2 text-sm text-neutral-500 flex-wrap">
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

          {/* Cột trái — Gallery ảnh thật */}
          <GalleryAnh anhDanhSach={sanPham.images} tenSanPham={sanPham.name} />

          {/* Cột phải — Thông tin */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {sanPham.isNew && <Badge variant="new" />}
              {sanPham.isSale && <Badge variant="sale" />}
              {sanPham.isBestseller && <Badge variant="bestseller" />}
            </div>

            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-2">{sanPham.brand}</p>

            <h1 className="font-bold text-3xl text-neutral-950 mb-4 leading-tight">{sanPham.name}</h1>

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
              <p className="text-sm font-semibold text-neutral-800 mb-3">
                Màu sắc: <span className="text-neutral-500 font-normal">{mauDaChon}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {sanPham.colors.map((mau) => (
                  <button
                    key={mau}
                    onClick={() => setMauDaChon(mau)}
                    title={mau}
                    className={cn(
                      'w-9 h-9 rounded-full border-2 transition-all duration-150 cursor-pointer hover:scale-110',
                      mauDaChon === mau ? 'border-neutral-900 scale-110 shadow-md ring-2 ring-neutral-200' : 'border-neutral-300'
                    )}
                    style={{ backgroundColor: layMauHex(mau) }}
                  />
                ))}
              </div>
            </div>

            {/* Số lượng */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border-2 border-neutral-200 rounded-full overflow-hidden">
                <button onClick={() => setSoLuong((v) => Math.max(1, v - 1))} className="px-4 py-3 hover:bg-neutral-50 transition-colors cursor-pointer text-neutral-700">
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-bold text-neutral-900">{soLuong}</span>
                <button onClick={() => setSoLuong((v) => Math.min(sanPham.stock, v + 1))} className="px-4 py-3 hover:bg-neutral-50 transition-colors cursor-pointer text-neutral-700">
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-xs text-neutral-400">Còn <strong className="text-neutral-700">{sanPham.stock}</strong> sản phẩm</p>
            </div>

            {/* Nút hành động */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={xuLyThemVaoGio}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm transition-all duration-200 cursor-pointer shadow-md',
                  daThemVaoGio
                    ? 'bg-emerald-500 text-white shadow-emerald-200'
                    : 'bg-neutral-950 hover:bg-neutral-700 text-white shadow-neutral-200'
                )}
              >
                <ShoppingCart size={18} />
                {daThemVaoGio ? '✓ Đã thêm vào giỏ!' : 'Thêm vào giỏ hàng'}
              </button>
              <button
                onClick={() => setDaThich(!daThich)}
                className="p-3.5 rounded-full border-2 border-neutral-200 hover:border-red-300 transition-all cursor-pointer"
              >
                <Heart size={18} className={daThich ? 'fill-red-500 text-red-500' : 'text-neutral-500'} />
              </button>
            </div>

            {/* Mua ngay */}
            <Link
              href="/thanh-toan"
              onClick={xuLyThemVaoGio}
              className="block w-full text-center py-3.5 rounded-full font-bold text-sm bg-[#C9A84C] hover:bg-[#A8893A] text-white transition-all duration-200 mb-8 shadow-[0_4px_20px_rgba(201,168,76,0.4)]"
            >
              🛍️ Mua Ngay
            </Link>

            {/* Chính sách */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, tieu_de: 'Bảo hành', mo_ta: `${sanPham.warrantyMonths} tháng chính hãng` },
                { icon: Truck, tieu_de: 'Giao hàng', mo_ta: 'Miễn phí từ 500k' },
                { icon: RotateCcw, tieu_de: 'Đổi trả', mo_ta: '7 ngày dễ dàng' },
              ].map((cs) => (
                <div key={cs.tieu_de} className="bg-neutral-50 rounded-2xl p-3 text-center border border-neutral-100">
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
          <h2 className="font-bold text-2xl text-neutral-950 mb-6 flex items-center gap-2">
            <Eye size={22} className="text-[#C9A84C]" /> Thông Số Kỹ Thuật
          </h2>
          <div className="bg-neutral-50 rounded-3xl overflow-hidden border border-neutral-100">
            {bangThongSo.map((dong, i) => (
              <div key={dong.nhan} className={cn('flex items-center px-6 py-4', i % 2 === 0 ? 'bg-white' : 'bg-neutral-50')}>
                <span className="w-44 text-sm text-neutral-500 font-medium">{dong.nhan}</span>
                <span className="text-sm text-neutral-900 font-semibold capitalize">{dong.giaTri}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Đánh giá khách hàng */}
        <div className="mt-16">
          <h2 className="font-bold text-2xl text-neutral-950 mb-2 flex items-center gap-2">
            <Award size={22} className="text-[#C9A84C]" /> Đánh Giá Từ Khách Hàng
          </h2>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-5xl font-bold text-neutral-900">{sanPham.rating}</span>
            <div>
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className={i < Math.floor(sanPham.rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'} />
                ))}
              </div>
              <p className="text-sm text-neutral-500">{sanPham.reviewCount} đánh giá</p>
            </div>
          </div>
          <div className="space-y-4">
            {danhGiaMau.map((dg, i) => (
              <div key={i} className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C9A84C]/20 rounded-full flex items-center justify-center text-[#C9A84C] font-bold">
                      {dg.ten.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm">{dg.ten}</p>
                      <p className="text-xs text-neutral-400">{dg.ngay}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={13} className={j < dg.sao ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">{dg.noi_dung}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sản phẩm liên quan */}
        {sanPhamLienQuan.length > 0 && (
          <div className="mt-16">
            <h2 className="font-bold text-2xl text-neutral-950 mb-6">Sản Phẩm Liên Quan</h2>
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
