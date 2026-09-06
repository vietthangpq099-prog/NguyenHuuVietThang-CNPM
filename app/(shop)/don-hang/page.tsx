'use client';

import React from 'react';
import Link from 'next/link';
import { mockDonHang, nhanTrangThaiDonHang, formatTien } from '@/lib/data/mock-admin';
import { Package, ArrowLeft, ChevronRight } from 'lucide-react';

export default function TrangLichSuDonHang() {
  // Giả lập đơn hàng của người dùng hiện tại (dùng 3 đơn đầu)
  const donHangCuaToi = mockDonHang.slice(0, 4);

  return (
    <div className="container-main py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/" className="p-2 rounded-xl hover:bg-neutral-100 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-serif font-bold text-2xl text-neutral-950">Đơn Hàng Của Tôi</h1>
          <p className="text-neutral-500 text-sm">{donHangCuaToi.length} đơn hàng</p>
        </div>
      </div>

      {donHangCuaToi.length === 0 ? (
        <div className="text-center py-24">
          <Package size={56} className="text-neutral-200 mx-auto mb-4" />
          <h2 className="font-serif font-bold text-xl text-neutral-700 mb-2">Bạn chưa có đơn hàng nào</h2>
          <p className="text-neutral-400 text-sm mb-6">Hãy khám phá bộ sưu tập kính mắt của chúng tôi!</p>
          <Link href="/san-pham" className="inline-flex items-center gap-2 bg-neutral-950 text-white px-6 py-3 rounded-full font-semibold hover:bg-neutral-700 transition-colors text-sm">
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {donHangCuaToi.map((dh) => {
            const tt = nhanTrangThaiDonHang[dh.status];
            return (
              <div key={dh.id} className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="font-bold text-neutral-900">#{dh.id}</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tt.mau}`}>{tt.nhan}</span>
                    </div>
                    <p className="text-sm text-neutral-500 mb-1">📍 {dh.shippingAddress}</p>
                    <p className="text-xs text-neutral-400">
                      📅 Đặt ngày {new Date(dh.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-neutral-400">💳 {dh.paymentMethod}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-lg text-neutral-900">{formatTien(dh.total)}</p>
                    <Link
                      href={`/don-hang/${dh.id}`}
                      className="inline-flex items-center gap-1 text-xs text-[#C9A84C] hover:underline mt-1"
                    >
                      Xem chi tiết <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>

                {/* Thanh tiến trình trạng thái */}
                <div className="mt-4 pt-4 border-t border-neutral-50">
                  <div className="flex items-center justify-between">
                    {['pending', 'confirmed', 'processing', 'shipped', 'delivered'].map((step, i) => {
                      const stepIndex = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'].indexOf(dh.status);
                      const currentIndex = i;
                      const daDen = dh.status !== 'cancelled' && currentIndex <= stepIndex;
                      const nhanBuoc = ['Chờ xác nhận', 'Xác nhận', 'Xử lý', 'Đang giao', 'Đã giao'];
                      return (
                        <React.Fragment key={step}>
                          <div className="flex flex-col items-center gap-1 flex-1">
                            <div className={`w-3 h-3 rounded-full transition-colors ${daDen ? 'bg-[#C9A84C]' : 'bg-neutral-200'}`} />
                            <span className={`text-[10px] text-center hidden sm:block ${daDen ? 'text-[#C9A84C] font-semibold' : 'text-neutral-400'}`}>
                              {nhanBuoc[i]}
                            </span>
                          </div>
                          {i < 4 && (
                            <div className={`flex-1 h-0.5 -mt-4 ${currentIndex < stepIndex && dh.status !== 'cancelled' ? 'bg-[#C9A84C]' : 'bg-neutral-200'}`} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
