import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'sunglasses',
    name: 'Kính Mát',
    description: 'UV400 & Phân Cực',
    count: '48 mẫu',
    href: '/san-pham?danh-muc=sunglasses',
    emoji: '☀️',
    bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
    border: 'border-amber-100',
    textColor: 'text-amber-700',
    badgeBg: 'bg-amber-100',
    circleBg: 'bg-amber-100',
  },
  {
    id: 'eyeglasses',
    name: 'Kính Cận',
    description: 'Tròng Cường Độ Cao & Chống Ánh Sáng Xanh',
    count: '72 mẫu',
    href: '/san-pham?danh-muc=eyeglasses',
    emoji: '👓',
    bg: 'bg-gradient-to-br from-sky-50 to-blue-50',
    border: 'border-sky-100',
    textColor: 'text-sky-700',
    badgeBg: 'bg-sky-100',
    circleBg: 'bg-sky-100',
  },
  {
    id: 'fashion',
    name: 'Kính Thời Trang',
    description: 'Phụ Kiện Thời Trang Cao Cấp',
    count: '35 mẫu',
    href: '/san-pham?danh-muc=fashion',
    emoji: '✨',
    bg: 'bg-gradient-to-br from-rose-50 to-pink-50',
    border: 'border-rose-100',
    textColor: 'text-rose-700',
    badgeBg: 'bg-rose-100',
    circleBg: 'bg-rose-100',
  },
  {
    id: 'sports',
    name: 'Kính Thể Thao',
    description: 'Hiệu Năng & Độ Bền Cao',
    count: '24 mẫu',
    href: '/san-pham?danh-muc=sports',
    emoji: '🏃',
    bg: 'bg-gradient-to-br from-emerald-50 to-green-50',
    border: 'border-emerald-100',
    textColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100',
    circleBg: 'bg-emerald-100',
  },
];

export default function DanhMucTrangChu() {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-main">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">
            Danh Mục Sản Phẩm
          </p>
          <h2 className="heading-display text-4xl md:text-5xl text-neutral-950 mb-4">
            Tìm Kính Phù Hợp
            <span className="text-[#C9A84C] italic"> Với Bạn</span>
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm leading-relaxed font-sans">
            Từ kính mát thời trang đến kính thể thao chuyên dụng — chúng tôi có tất cả
            cho mọi phong cách và nhu cầu.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`group relative ${cat.bg} border ${cat.border} rounded-3xl p-8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              {/* Background circle decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 -translate-y-4 translate-x-4">
                <div className={`w-full h-full ${cat.circleBg} rounded-full opacity-50`} />
              </div>

              {/* Emoji */}
              <div className="relative text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {cat.emoji}
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="font-bold text-xl text-neutral-900 mb-1.5 font-serif">
                  {cat.name}
                </h3>
                <p className="text-sm text-neutral-500 mb-4 font-sans">{cat.description}</p>

                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${cat.textColor} ${cat.badgeBg} px-3 py-1 rounded-full`}>
                    {cat.count}
                  </span>
                  <span className={`${cat.textColor} group-hover:translate-x-1 transition-transform duration-200`}>
                    <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
