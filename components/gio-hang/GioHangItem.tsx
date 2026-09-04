'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, Minus, Plus } from 'lucide-react';
import { MucGioHang } from '@/lib/context/CartContext';
import { useGioHang } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/data/mock-products';

interface GioHangItemProps {
  muc: MucGioHang;
}

const bangMauSac: Record<string, string> = {
  Gold: '#C9A84C', Silver: '#A8A9AD', Black: '#1a1a1a', Blue: '#3B82F6',
  Red: '#EF4444', Green: '#22C55E', Rose: '#F43F5E', Pink: '#EC4899',
  Tortoise: '#8B4513', White: '#F5F5F5', Grey: '#6B7280', Bronze: '#CD7F32',
};

function layMauHex(tenMau: string): string {
  for (const [key, hex] of Object.entries(bangMauSac)) {
    if (tenMau.includes(key)) return hex;
  }
  return '#9CA3AF';
}

export default function GioHangItem({ muc }: GioHangItemProps) {
  const { xoaKhoiGio, capNhatSoLuong } = useGioHang();
  const { sanPham, soLuong, mauDaChon } = muc;

  return (
    <div className="flex gap-4 py-5 border-b border-neutral-100 last:border-0">
      {/* Ảnh sản phẩm */}
      <Link href={`/san-pham/${sanPham.id}`} className="flex-shrink-0">
        <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl flex items-center justify-center">
          <span className="text-4xl opacity-25 select-none">🕶️</span>
        </div>
      </Link>

      {/* Thông tin */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-[#C9A84C] font-semibold uppercase tracking-wide mb-0.5">
              {sanPham.brand}
            </p>
            <Link href={`/san-pham/${sanPham.id}`}>
              <h3 className="font-semibold text-sm text-neutral-900 hover:text-[#C9A84C] transition-colors truncate">
                {sanPham.name}
              </h3>
            </Link>
            {/* Màu đã chọn */}
            <div className="flex items-center gap-1.5 mt-1">
              <div
                className="w-3.5 h-3.5 rounded-full border border-neutral-200"
                style={{ backgroundColor: layMauHex(mauDaChon) }}
              />
              <span className="text-xs text-neutral-500">{mauDaChon}</span>
            </div>
          </div>

          {/* Nút xoá */}
          <button
            onClick={() => xoaKhoiGio(sanPham.id, mauDaChon)}
            className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Xoá sản phẩm"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Số lượng + Giá */}
        <div className="flex items-center justify-between mt-3">
          {/* Điều chỉnh số lượng */}
          <div className="flex items-center border border-neutral-200 rounded-full overflow-hidden">
            <button
              onClick={() => capNhatSoLuong(sanPham.id, mauDaChon, soLuong - 1)}
              className="px-3 py-1.5 hover:bg-neutral-50 transition-colors cursor-pointer text-neutral-600"
              disabled={soLuong <= 1}
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-neutral-900">{soLuong}</span>
            <button
              onClick={() => capNhatSoLuong(sanPham.id, mauDaChon, soLuong + 1)}
              className="px-3 py-1.5 hover:bg-neutral-50 transition-colors cursor-pointer text-neutral-600"
              disabled={soLuong >= sanPham.stock}
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Giá */}
          <div className="text-right">
            <p className="font-bold text-neutral-900 text-sm">{formatPrice(sanPham.price * soLuong)}</p>
            {soLuong > 1 && (
              <p className="text-xs text-neutral-400">{formatPrice(sanPham.price)} / cái</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
