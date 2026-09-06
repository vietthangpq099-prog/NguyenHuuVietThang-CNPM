'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/data/mock-products';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { useGioHang } from '@/lib/context/CartContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

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

export default function ProductCard({ product, className }: ProductCardProps) {
  const [daThich, setDaThich] = useState(false);
  const [daThemVaoGio, setDaThemVaoGio] = useState(false);
  const { themVaoGio } = useGioHang();

  const phanTramGiam = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const xuLyThemVaoGio = (e: React.MouseEvent) => {
    e.preventDefault();
    themVaoGio(product, product.colors[0] || 'Mặc định');
    setDaThemVaoGio(true);
    setTimeout(() => setDaThemVaoGio(false), 2000);
  };

  const anhChinh = product.images[0];

  return (
    <div
      className={cn(
        'group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1',
        'shadow-[0_2px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.15)]',
        className
      )}
    >
      {/* Ảnh sản phẩm */}
      <Link href={`/san-pham/${product.id}`}>
        <div className="relative aspect-square bg-neutral-100 overflow-hidden">
          {anhChinh ? (
            <Image
              src={anhChinh}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
              <span className="text-7xl opacity-20 select-none">🕶️</span>
            </div>
          )}

          {/* Overlay hover */}
          <div className="absolute inset-0 bg-neutral-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="flex items-center gap-2 bg-white text-neutral-900 text-sm font-semibold px-4 py-2 rounded-full shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Eye size={15} />
              Xem chi tiết
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isNew && <Badge variant="new" />}
            {product.isSale && <Badge variant="sale" />}
            {product.isBestseller && <Badge variant="bestseller" />}
          </div>
          {phanTramGiam && (
            <div className="absolute top-3 right-12 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              -{phanTramGiam}%
            </div>
          )}
        </div>
      </Link>

      {/* Nút yêu thích */}
      <button
        onClick={() => setDaThich(!daThich)}
        className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md text-neutral-400 hover:text-red-500 transition-colors duration-200 z-10 cursor-pointer"
        aria-label="Thêm vào yêu thích"
      >
        <Heart size={17} className={daThich ? 'fill-red-500 text-red-500' : ''} />
      </button>

      {/* Thông tin sản phẩm */}
      <div className="p-4">
        <Link href={`/san-pham/${product.id}`} className="block group/link">
          <p className="text-xs text-[#C9A84C] font-semibold uppercase tracking-wider mb-1">
            {product.brand}
          </p>
          <h3 className="font-semibold text-neutral-900 text-sm leading-tight mb-2 group-hover/link:text-[#C9A84C] transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Đánh giá */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'} />
            ))}
          </div>
          <span className="text-xs text-neutral-500">{product.rating} ({product.reviewCount})</span>
        </div>

        {/* Màu sắc */}
        <div className="flex items-center gap-1.5 mb-3">
          {product.colors.slice(0, 4).map((mau, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border border-neutral-200 cursor-pointer hover:scale-125 transition-transform"
              style={{ backgroundColor: layMauHex(mau) }}
              title={mau}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-neutral-400">+{product.colors.length - 4}</span>
          )}
        </div>

        {/* Giá + Thêm vào giỏ */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-neutral-900 text-sm">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-xs text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            onClick={xuLyThemVaoGio}
            className={cn(
              'p-2.5 rounded-full transition-all duration-200 cursor-pointer',
              daThemVaoGio
                ? 'bg-emerald-500 text-white'
                : 'bg-neutral-900 text-white hover:bg-[#C9A84C]'
            )}
            aria-label="Thêm vào giỏ hàng"
          >
            <ShoppingCart size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
