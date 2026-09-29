import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, Headphones, ArrowRight, Star } from 'lucide-react';

const dichVu = [
  { icon: ShieldCheck, tieu_de: 'Bảo Hành Chính Hãng', mo_ta: 'Tối thiểu 12 tháng cho mọi sản phẩm', href: '/bao-hanh' },
  { icon: Truck,       tieu_de: 'Miễn Phí Vận Chuyển',  mo_ta: 'Đơn hàng từ 500,000đ', href: '/san-pham' },
  { icon: RotateCcw,   tieu_de: 'Đổi Trả 7 Ngày',       mo_ta: 'Không cần lý do', href: '/bao-hanh' },
  { icon: Headphones,  tieu_de: 'Hỗ Trợ 7/7',           mo_ta: '8:00 – 22:00 mỗi ngày', href: '/gioi-thieu' },
];

const danhGia = [
  { ten: 'Minh Tuấn', noi_dung: '"Kính rất đẹp, chất lượng tuyệt vời. Nhân viên tư vấn tận tình. Sẽ mua thêm!"', sao: 5, san_pham: 'Lumière Aviator Classic' },
  { ten: 'Thu Hà', noi_dung: '"Giao hàng nhanh, đóng gói cẩn thận. Kính đúng mô tả, màu sắc đẹp hơn ngoài đời."', sao: 5, san_pham: 'Luna Cat-Eye Rose' },
  { ten: 'Văn Hùng', noi_dung: '"Bảo hành tốt, có vệ sinh miễn phí tại cửa hàng. Rất hài lòng với OpticShop."', sao: 5, san_pham: 'Noir Square Premium' },
];

const anhBanner = [
  {
    src: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&q=85&auto=format&fit=crop',
    alt: 'Kính mắt vintage',
    tieu_de: 'Kính Vintage',
    mo_ta: 'Phong cách cổ điển',
    href: '/san-pham?danh-muc=eyeglasses',
  },
  {
    src: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=85&auto=format&fit=crop',
    alt: 'Kính mát thời trang',
    tieu_de: 'Kính Mát Hot Trend',
    mo_ta: 'Bộ sưu tập mới nhất',
    href: '/san-pham?danh-muc=sunglasses',
  },
  {
    src: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=85&auto=format&fit=crop',
    alt: 'Kính thể thao',
    tieu_de: 'Kính Thể Thao',
    mo_ta: 'Hiệu năng vượt trội',
    href: '/san-pham?danh-muc=sports',
  },
  {
    src: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?w=800&q=85&auto=format&fit=crop',
    alt: 'Kính cao cấp',
    tieu_de: 'Hàng Cao Cấp',
    mo_ta: 'Sang trọng & đẳng cấp',
    href: '/san-pham?danh-muc=eyeglasses',
  },
];

export default function PromoSection() {
  return (
    <>
      {/* Cam kết dịch vụ */}
      <section className="py-12 bg-white border-t border-b border-neutral-100">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {dichVu.map((dv) => (
              <Link key={dv.tieu_de} href={dv.href} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 group hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 bg-neutral-950 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A84C] transition-colors duration-200">
                  <dv.icon size={22} className="text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-bold text-neutral-900 text-sm leading-tight">{dv.tieu_de}</p>
                  <p className="text-neutral-500 text-xs mt-0.5">{dv.mo_ta}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery 4 ảnh có link */}
      <section className="section-padding bg-neutral-50">
        <div className="container-main">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Bộ Sưu Tập</p>
            <h2 className="font-bold text-3xl md:text-4xl text-neutral-950">Khám Phá Thế Giới Kính Mắt</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {anhBanner.map((anh) => (
              <Link key={anh.href + anh.tieu_de} href={anh.href} className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={anh.src}
                  alt={anh.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-bold text-sm">{anh.tieu_de}</p>
                  <p className="text-white/70 text-xs mt-0.5">{anh.mo_ta}</p>
                  <span className="inline-flex items-center gap-1 text-[#C9A84C] text-xs font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Xem ngay <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Đánh giá khách hàng */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Đánh Giá</p>
            <h2 className="font-bold text-3xl md:text-4xl text-neutral-950">Khách Hàng Nói Gì?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {danhGia.map((dg) => (
              <div key={dg.ten} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                <div className="flex gap-1 mb-3">
                  {[...Array(dg.sao)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-700 text-sm leading-relaxed mb-5 italic">{dg.noi_dung}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
                  <div className="w-9 h-9 bg-[#C9A84C]/20 rounded-full flex items-center justify-center text-[#C9A84C] font-bold text-sm">
                    {dg.ten.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-sm">{dg.ten}</p>
                    <p className="text-neutral-400 text-xs">{dg.san_pham}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA cuối trang */}
      <section className="py-16 bg-neutral-950 text-white">
        <div className="container-main text-center">
          <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-4">Bắt Đầu Ngay Hôm Nay</p>
          <h2 className="font-bold text-3xl md:text-4xl mb-4">
            Tìm Cặp Kính Hoàn Hảo Cho Bạn
          </h2>
          <p className="text-neutral-400 text-sm mb-8 max-w-lg mx-auto">
            Hơn 1,000 mẫu kính đa dạng với giá từ 980,000đ. Giao hàng nhanh, bảo hành chính hãng.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/san-pham" className="px-8 py-3.5 bg-[#C9A84C] hover:bg-[#A8893A] text-white rounded-full font-bold transition-all duration-200 shadow-[0_4px_20px_rgba(201,168,76,0.4)]">
              🛍️ Mua Sắm Ngay
            </Link>
            <Link href="/bao-hanh" className="px-8 py-3.5 border-2 border-white/30 text-white hover:bg-white/10 rounded-full font-semibold transition-all duration-200">
              Xem Chính Sách Bảo Hành
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
