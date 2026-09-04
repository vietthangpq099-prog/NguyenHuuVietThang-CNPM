'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { useGioHang } from '@/lib/context/CartContext';
import GioHangItem from '@/components/gio-hang/GioHangItem';
import TomTatDonHang from '@/components/gio-hang/TomTatDonHang';

export default function TrangGioHang() {
  const { gioHang, xoaHetGio } = useGioHang();

  // Giỏ hàng trống
  if (gioHang.danhSachMuc.length === 0) {
    return (
      <div className="container-main py-24 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={40} className="text-neutral-400" />
          </div>
          <h1 className="font-serif font-bold text-2xl text-neutral-900 mb-3">Giỏ hàng trống</h1>
          <p className="text-neutral-500 text-sm mb-8">
            Bạn chưa có sản phẩm nào trong giỏ hàng. Khám phá bộ sưu tập kính mắt cao cấp của chúng tôi!
          </p>
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 bg-neutral-950 text-white px-8 py-3.5 rounded-full font-bold hover:bg-neutral-700 transition-colors"
          >
            <ArrowLeft size={18} />
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-main py-10">
      {/* Tiêu đề */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif font-bold text-3xl text-neutral-950 mb-1">Giỏ Hàng</h1>
          <p className="text-neutral-500 text-sm">{gioHang.tongSoLuong} sản phẩm</p>
        </div>
        <button
          onClick={xoaHetGio}
          className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium transition-colors cursor-pointer"
        >
          <Trash2 size={15} />
          Xoá hết
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Danh sách sản phẩm — chiếm 2/3 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
            {gioHang.danhSachMuc.map((muc) => (
              <GioHangItem
                key={`${muc.sanPham.id}-${muc.mauDaChon}`}
                muc={muc}
              />
            ))}
          </div>

          {/* Nút quay lại */}
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Tiếp tục mua sắm
          </Link>
        </div>

        {/* Tóm tắt đơn hàng — chiếm 1/3 */}
        <div>
          <TomTatDonHang
            tamTinh={gioHang.tongTien}
            tongSoLuong={gioHang.tongSoLuong}
          />
        </div>
      </div>
    </div>
  );
}
