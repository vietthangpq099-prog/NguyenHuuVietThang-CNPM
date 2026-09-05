'use client';

import React, { useState } from 'react';
import { mockDonHang, nhanTrangThaiDonHang, formatTien } from '@/lib/data/mock-admin';
import { Order } from '@/types';
import { ChevronDown, CheckCircle } from 'lucide-react';

const BUOC_TIEP: Record<string, string> = {
  pending: 'confirmed', confirmed: 'processing',
  processing: 'shipped', shipped: 'delivered',
};

export default function TrangXuLyDonHang() {
  const [danhSach, setDanhSach] = useState<Order[]>(
    mockDonHang.filter((dh) => dh.status !== 'delivered' && dh.status !== 'cancelled')
  );

  const capNhat = (id: string, buocTiep: string) => {
    setDanhSach((prev) => prev.map((dh) => dh.id === id ? { ...dh, status: buocTiep as Order['status'] } : dh));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-500">Hiển thị các đơn hàng cần xử lý — không bao gồm đơn đã giao và đã huỷ.</p>

      {danhSach.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-neutral-100">
          <CheckCircle size={48} className="text-emerald-400 mx-auto mb-3" />
          <p className="font-semibold text-neutral-700">Tất cả đơn hàng đã được xử lý!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {danhSach.map((dh) => {
            const tt = nhanTrangThaiDonHang[dh.status];
            const buocTiep = BUOC_TIEP[dh.status];
            const ttTiep = buocTiep ? nhanTrangThaiDonHang[buocTiep] : null;
            return (
              <div key={dh.id} className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-bold text-neutral-900">#{dh.id}</p>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tt.mau}`}>{tt.nhan}</span>
                    </div>
                    <p className="text-sm text-neutral-600">📍 {dh.shippingAddress}</p>
                    <p className="text-xs text-neutral-400 mt-1">💳 {dh.paymentMethod}</p>
                    <p className="text-xs text-neutral-400">📅 {new Date(dh.createdAt).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-neutral-900">{formatTien(dh.total)}</p>
                    {buocTiep && ttTiep && (
                      <button
                        onClick={() => capNhat(dh.id, buocTiep)}
                        className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        <ChevronDown size={14} className="-rotate-90" />
                        Chuyển sang: {ttTiep.nhan}
                      </button>
                    )}
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
