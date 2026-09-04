import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Tag } from 'lucide-react';
import { formatPrice } from '@/lib/data/mock-products';

interface TomTatDonHangProps {
  tamTinh: number;
  tongSoLuong: number;
}

const NGUONG_MIEN_PHI_SHIP = 500000;
const PHI_SHIP = 30000;

export default function TomTatDonHang({ tamTinh, tongSoLuong }: TomTatDonHangProps) {
  const duocMienPhiShip = tamTinh >= NGUONG_MIEN_PHI_SHIP;
  const phiShip = duocMienPhiShip ? 0 : PHI_SHIP;
  const tongCong = tamTinh + phiShip;
  const conThieuDeMienPhi = NGUONG_MIEN_PHI_SHIP - tamTinh;

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-[0_2px_20px_rgba(0,0,0,0.06)] sticky top-24">
      <h2 className="font-serif font-bold text-lg text-neutral-950 mb-5">Tóm Tắt Đơn Hàng</h2>

      {/* Thông báo miễn phí ship */}
      {!duocMienPhiShip && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 mb-5">
          <div className="flex items-start gap-2">
            <Tag size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-700">
              Mua thêm <span className="font-bold">{formatPrice(conThieuDeMienPhi)}</span> để được miễn phí vận chuyển!
            </p>
          </div>
          {/* Thanh tiến trình */}
          <div className="mt-2 bg-amber-100 rounded-full h-1.5">
            <div
              className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((tamTinh / NGUONG_MIEN_PHI_SHIP) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Chi tiết giá */}
      <div className="space-y-3 mb-5">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Tạm tính ({tongSoLuong} sản phẩm)</span>
          <span className="font-medium text-neutral-900">{formatPrice(tamTinh)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Phí vận chuyển</span>
          {duocMienPhiShip ? (
            <span className="text-emerald-600 font-medium">Miễn phí</span>
          ) : (
            <span className="font-medium text-neutral-900">{formatPrice(PHI_SHIP)}</span>
          )}
        </div>
        <div className="border-t border-neutral-100 pt-3 flex justify-between">
          <span className="font-bold text-neutral-900">Tổng cộng</span>
          <span className="font-bold text-xl text-neutral-950">{formatPrice(tongCong)}</span>
        </div>
      </div>

      {/* Nút thanh toán */}
      <Link
        href="/thanh-toan"
        className="flex items-center justify-center gap-2 w-full py-4 bg-[#C9A84C] hover:bg-[#A8893A] text-white font-bold rounded-full transition-all duration-200 hover:shadow-[0_4px_20px_rgba(201,168,76,0.4)] hover:-translate-y-0.5 mb-3"
      >
        Tiến Hành Thanh Toán
        <ArrowRight size={18} />
      </Link>

      <Link
        href="/san-pham"
        className="flex items-center justify-center gap-2 w-full py-3 border-2 border-neutral-200 text-neutral-700 hover:border-neutral-400 font-semibold rounded-full transition-all duration-200 text-sm"
      >
        Tiếp tục mua sắm
      </Link>

      {/* Chính sách nhỏ */}
      <div className="mt-5 pt-5 border-t border-neutral-100 space-y-2">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <ShieldCheck size={14} className="text-[#C9A84C] flex-shrink-0" />
          Thanh toán an toàn & bảo mật
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <Truck size={14} className="text-[#C9A84C] flex-shrink-0" />
          Giao hàng 24-48h tại TP.HCM & Hà Nội
        </div>
      </div>
    </div>
  );
}
