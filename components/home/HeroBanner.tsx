'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';

const slides = [
  {
    id: 1,
    badge: '✦ Bộ Sưu Tập Mới 2026',
    headline: 'Định Nghĩa Lại',
    headlineAccent: 'Phong Cách Của Bạn',
    subheadline: 'Khám phá hàng trăm mẫu kính mắt cao cấp. Từ kính mát thời trang đến kính cận chính xác — mỗi đôi kính là một tuyên ngôn phong cách.',
    cta: 'Khám Phá Ngay',
    ctaHref: '/san-pham',
    secondaryCta: 'Chính Sách Bảo Hành',
    secondaryCtaHref: '/bao-hanh',
    stats: [
      { value: '1,000+', label: 'Mẫu Kính' },
      { value: '50K+', label: 'Khách Hàng' },
      { value: '4.9★', label: 'Đánh Giá' },
    ],
    anhUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=900&q=90&auto=format&fit=crop',
    bgClass: 'from-neutral-950 via-neutral-900 to-stone-900',
  },
  {
    id: 2,
    badge: '⚡ Flash Sale — Giảm Đến 40%',
    headline: 'Kính Mát Cao Cấp',
    headlineAccent: 'Giá Ưu Đãi Hôm Nay',
    subheadline: 'Hàng trăm mẫu kính mát phân cực bảo vệ UV400. Thương hiệu uy tín, chất lượng đảm bảo, bảo hành 2 năm chính hãng.',
    cta: 'Mua Ngay',
    ctaHref: '/san-pham?danh-muc=sunglasses',
    secondaryCta: 'Xem Tất Cả Sản Phẩm',
    secondaryCtaHref: '/san-pham',
    stats: [
      { value: '-40%', label: 'Giảm Giá' },
      { value: 'Free', label: 'Vận Chuyển' },
      { value: '25+', label: 'Chi Nhánh' },
    ],
    anhUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=900&q=90&auto=format&fit=crop',
    bgClass: 'from-neutral-950 via-stone-900 to-neutral-900',
  },
];

const perks = [
  { icon: ShieldCheck, label: 'Bảo hành chính hãng' },
  { icon: Truck, label: 'Miễn phí từ 500.000đ' },
  { icon: Sparkles, label: 'Vệ sinh kính trọn đời' },
];

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const slide = slides[activeSlide];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    setLoaded(true);
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const doiSlide = (i: number) => {
    setActiveSlide(i);
    startTimer();
  };

  return (
    <section className="relative overflow-hidden">
      {/* Main hero */}
      <div className={`relative bg-gradient-to-br ${slide.bgClass} min-h-[92vh] flex items-center transition-all duration-1000`}>
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-amber-300/5 rounded-full blur-2xl pointer-events-none" />

        <div className="container-main relative z-10 py-20">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
            {/* Cột trái — text */}
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-8">
                {slide.badge}
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-[1.1]" style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 700 }}>
                {slide.headline}<br />
                <span className="text-[#C9A84C] italic">{slide.headlineAccent}</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-neutral-300 mb-10 leading-relaxed max-w-xl">
                {slide.subheadline}
              </p>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 mb-14">
                <Link href={slide.ctaHref} className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#A8893A] text-white font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-[0_4px_20px_rgba(201,168,76,0.4)] hover:shadow-[0_8px_30px_rgba(201,168,76,0.5)] hover:-translate-y-0.5 text-base">
                  {slide.cta} <ArrowRight size={18} />
                </Link>
                <Link href={slide.secondaryCtaHref} className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all duration-200 text-base backdrop-blur-sm">
                  {slide.secondaryCta}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-10">
                {slide.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-neutral-400 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cột phải — Ảnh kính thật */}
            <div className="hidden xl:flex justify-center items-center relative">
              <div className="relative w-[420px] h-[420px] rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_80px_rgba(201,168,76,0.2)]">
                {loaded && (
                  <Image
                    src={slide.anhUrl}
                    alt={slide.headlineAccent}
                    fill
                    className="object-cover transition-opacity duration-700"
                    sizes="420px"
                    priority={activeSlide === 0}
                  />
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent" />
              </div>
              {/* Decoration rings */}
              <div className="absolute inset-0 rounded-full border border-white/5 scale-110 pointer-events-none" />
              <div className="absolute inset-0 rounded-full border border-[#C9A84C]/10 scale-125 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => doiSlide(i)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${i === activeSlide ? 'w-8 h-2 bg-[#C9A84C]' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Perks bar */}
      <div className="bg-white border-b border-neutral-100">
        <div className="container-main py-5">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-around gap-4 sm:gap-0">
            {perks.map((perk, i) => (
              <React.Fragment key={perk.label}>
                <div className="flex items-center gap-3 text-sm font-medium text-neutral-700">
                  <div className="w-9 h-9 bg-amber-50 rounded-full flex items-center justify-center">
                    <perk.icon size={18} className="text-[#C9A84C]" />
                  </div>
                  {perk.label}
                </div>
                {i < perks.length - 1 && <div className="hidden sm:block w-px h-6 bg-neutral-200" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
