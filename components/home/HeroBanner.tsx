'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';


const slides = [
  {
    id: 1,
    badge: '✦ Bộ Sưu Tập Mới 2024',
    
    headline: 'Định Nghĩa Lại',
   
    headlineAccent: 'Phong Cách Của Bạn',

    subheadline:
      'Khám phá hàng trăm mẫu kính mắt cao cấp. Từ kính mát thời trang đến kính cận chính xác — mỗi đôi kính là một tuyên ngôn phong cách.',
    
      cta: 'Khám Phá Ngay',
      ctaHref: '/products',
    
    secondaryCta: 'Đặt Lịch Đo Mắt',
    secondaryCtaHref: '/services/eye-test',

    // THỐNG KÊ: 3 con số hiển thị phía dưới nút bấm
    stats: [
      { value: '500+', label: 'Mẫu Kính' },
      { value: '10K+', label: 'Khách Hàng' },
      { value: '4.9★', label: 'Đánh Giá' },
    ],

    // MÀU NỀN: Gradient đen sang nâu đá
    bgClass: 'from-neutral-950 via-neutral-900 to-stone-900',
  },
  {
    id: 2,
    
    badge: '⚡ Flash Sale — Giảm Đến 40%',

    headline: 'Kính Mát Cao Cấp',

    headlineAccent: 'Giá Ưu Đãi Hôm Nay',


    subheadline:
      'Hàng trăm mẫu kính mát phân cực bảo vệ UV400. Thương hiệu uy tín, chất lượng đảm bảo, bảo hành 2 năm.',

    // NÚT VÀNG slide 2
    cta: 'Mua Ngay',
    ctaHref: '/products?category=sunglasses&filter=sale',

    // NÚT VIỀN TRẮNG slide 2
    secondaryCta: 'Xem Tất Cả Sale',
    secondaryCtaHref: '/products?filter=sale',

    // THỐNG KÊ slide 2
    stats: [
      { value: '-40%', label: 'Giảm Giá' },
      { value: '48h', label: 'Còn Lại' },
      { value: 'Free', label: 'Ship' },
    ],

    // MÀU NỀN slide 2
    bgClass: 'from-neutral-950 via-stone-900 to-neutral-900',
  },
];


const perks = [
  { icon: ShieldCheck, label: 'Bảo hành 24 tháng' },
  { icon: Truck,       label: 'Giao hàng miễn phí' },
  { icon: Sparkles,    label: 'Đo mắt miễn phí' },
];


export default function HeroBanner() {
  // activeSlide: slide đang hiển thị (0 = slide 1, 1 = slide 2)
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  // TỰ ĐỘNG CHUYỂN SLIDE mỗi 6 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval); 
  }, []);

  return (
    <section className="relative overflow-hidden">

      {/*  */}
      <div
        className={`relative bg-gradient-to-br ${slide.bgClass} min-h-[92vh] flex items-center transition-all duration-1000`}
      >
        {/* Hoạ tiết lưới mờ phía sau (opacity 3%) */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/*  */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-amber-300/5 rounded-full blur-2xl pointer-events-none" />

        <div className="container-main relative z-10 py-20">
          <div className="max-w-3xl">

            {/* 
                 Bộ Sưu Tập Mới 2024"
                 Flash Sale — Giảm Đến 40%"
               */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-8">
              {slide.badge}
            </div>

            {/* Headline */}
            <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-[1.1]">
              {/* Dòng 1: Chữ trắng */}
              {slide.headline}
              <br />
              {/* Dòng 2: Chữ vàng nghiêng (#C9A84C) */}
              <span className="text-[#C9A84C] italic">{slide.headlineAccent}</span>
            </h1>

            {/* --------------------------------------------------               */}
            <p className="text-lg text-neutral-300 mb-10 leading-relaxed max-w-2xl font-sans">
              {slide.subheadline}
            </p>

            {/*  */}
            <div className="flex flex-wrap gap-4 mb-14">
              {/* Nút vàng chính */}
              <Link
                href={slide.ctaHref}
                /*Mua ngay / Khám phá ngay*/
                className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#A8893A] text-white font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-[0_4px_20px_rgba(201,168,76,0.4)] hover:shadow-[0_8px_30px_rgba(201,168,76,0.5)] hover:-translate-y-0.5 text-base"
              >
                {slide.cta}
                <ArrowRight size={18} />
              </Link>
              {/* Nút viền trắng phụ */}
              <Link
                href={slide.secondaryCtaHref}
                /*Dat lich do may/ xem tat ca sale */
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all duration-200 text-base backdrop-blur-sm"
              >
                {slide.secondaryCta}
              </Link>
            </div>

            {/* 
                THỐNG KÊ — 3 con số phía dưới nút bấm
                Slide 1: 500+ Mẫu Kính | 10K+ Khách Hàng | 4.9★ Đánh Giá
                Slide 2: -40% Giảm Giá | 48h Còn Lại | Free Ship*/}
            <div className="flex flex-wrap gap-10">
              {slide.stats.map((stat) => (
                <div key={stat.label}>
                  {/* Con số lớn màu trắng */}
                  <p className="text-3xl font-bold text-white font-serif">{stat.value}</p>
                  {/* Nhãn nhỏ màu xám */}
                  <p className="text-sm text-neutral-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/*  */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                i === activeSlide ? 'w-8 h-2 bg-[#C9A84C]' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Trang trí emoji kính góc phải (ẩn trên mobile, hiện trên màn hình lớn) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block select-none pointer-events-none">
          <div className="text-[180px] opacity-5">🕶️</div>
          <div className="absolute -top-12 -right-12 text-[80px] opacity-5 rotate-12">👓</div>
        </div>
      </div>

      {/* 
           Bảo hành 24 tháng | Giao hàng miễn phí |  Đo mắt miễn phí */}
      <div className="bg-white border-b border-neutral-100">
        <div className="container-main py-5">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-around gap-4 sm:gap-0">
            {perks.map((perk, i) => (
              <React.Fragment key={perk.label}>
                {/* Mỗi tiện ích: icon vàng + chữ mô tả */}
                <div className="flex items-center gap-3 text-sm font-medium text-neutral-700">
                  <div className="w-9 h-9 bg-amber-50 rounded-full flex items-center justify-center">
                    <perk.icon size={18} className="text-[#C9A84C]" />
                  </div>
                  {perk.label}
                </div>
                {/* Đường kẻ ngăn cách giữa các tiện ích */}
                {i < perks.length - 1 && (
                  <div className="hidden sm:block w-px h-6 bg-neutral-200" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
