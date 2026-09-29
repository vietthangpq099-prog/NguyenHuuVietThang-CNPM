'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { mockProducts } from '@/lib/data/mock-products';
import ProductCard from '@/components/product/ProductCard';

type FilterTab = 'all' | 'new' | 'bestseller' | 'sale';

const filterTabs: { id: FilterTab; label: string; emoji: string }[] = [
  { id: 'all', label: 'Tất Cả', emoji: '' },
  { id: 'new', label: 'Mới Nhất', emoji: '🆕' },
  { id: 'bestseller', label: 'Bán Chạy', emoji: '🔥' },
  { id: 'sale', label: 'Đang Sale', emoji: '💰' },
];

export default function SanPhamNoiBat() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filteredProducts = mockProducts
    .filter((p) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'new') return p.isNew;
      if (activeFilter === 'bestseller') return p.isBestseller;
      if (activeFilter === 'sale') return p.isSale;
      return true;
    })
    .slice(0, 8);

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">
              Bộ Sưu Tập
            </p>
            <h2 className="heading-display text-4xl md:text-5xl text-neutral-950">
              Sản Phẩm Nổi Bật
            </h2>
          </div>

          <Link
            href="/san-pham"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-[#C9A84C] transition-colors duration-200 group"
          >
            Xem tất cả
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {tab.emoji && <span>{tab.emoji}</span>}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-neutral-500 font-sans">Không có sản phẩm nào trong danh mục này.</p>
          </div>
        )}

        {/* Mobile view all */}
        <div className="sm:hidden text-center mt-8">
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 border-2 border-neutral-200 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 font-semibold px-8 py-3 rounded-full transition-all duration-200"
          >
            Xem tất cả sản phẩm
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
