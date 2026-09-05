'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ShoppingBag, Home, Package } from 'lucide-react';
import { Suspense } from 'react';

function NoiDung() {
  const params = useSearchParams();
  const maDonHang = params.get('ma') || 'DH000000';

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-md w-full">
        {/* Icon thành công */}
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle size={48} className="text-emerald-600" />
        </div>

        <h1 className="font-serif font-bold text-3xl text-neutral-950 mb-3">Đặt Hàng Thành Công!</h1>
        <p className="text-neutral-500 mb-2">Cảm ơn bạn đã mua hàng tại OpticShop 🎉</p>

        {/* Mã đơn hàng */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 mb-6">
          <p className="text-sm text-neutral-500 mb-1">Mã đơn hàng của bạn</p>
          <p className="font-mono font-bold text-2xl text-neutral-950">#{maDonHang}</p>
          <p className="text-xs text-neutral-400 mt-2">Lưu lại mã này để tra cứu đơn hàng</p>
        </div>

        {/* Các bước tiếp theo */}
        <div className="bg-white border border-neutral-100 rounded-2xl p-5 mb-6 text-left space-y-3 shadow-sm">
          <p className="font-semibold text-neutral-800 text-sm mb-3">Các bước tiếp theo:</p>
          {[
            { so: '1', noi: 'Chúng tôi sẽ xác nhận đơn hàng trong vòng 30 phút' },
            { so: '2', noi: 'Đơn hàng được đóng gói và bàn giao cho đơn vị vận chuyển' },
            { so: '3', noi: 'Giao hàng trong 24-48h tại TP.HCM & Hà Nội' },
            { so: '4', noi: 'Nhận hàng và kiểm tra sản phẩm trước khi thanh toán (nếu COD)' },
          ].map((b) => (
            <div key={b.so} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#C9A84C] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{b.so}</span>
              <p className="text-sm text-neutral-600">{b.noi}</p>
            </div>
          ))}
        </div>

        {/* Nút điều hướng */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/san-pham" className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-neutral-200 text-neutral-700 font-semibold rounded-full hover:bg-neutral-50 transition-colors text-sm">
            <ShoppingBag size={16} /> Tiếp tục mua sắm
          </Link>
          <Link href="/" className="flex-1 flex items-center justify-center gap-2 py-3 bg-neutral-950 text-white font-semibold rounded-full hover:bg-neutral-700 transition-colors text-sm">
            <Home size={16} /> Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function TrangDatHangThanhCong() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center"><Package size={32} className="animate-pulse text-neutral-300" /></div>}>
      <NoiDung />
    </Suspense>
  );
}
