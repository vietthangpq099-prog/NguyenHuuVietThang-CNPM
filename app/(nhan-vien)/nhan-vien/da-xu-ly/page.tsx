import React from 'react';
import { mockDonHang, nhanTrangThaiDonHang, formatTien } from '@/lib/data/mock-admin';
import { CheckCircle } from 'lucide-react';

const donHoanThanh = mockDonHang.filter((dh) => dh.status === 'delivered');

export default function TrangDaXuLy() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-500">Danh sách {donHoanThanh.length} đơn hàng đã giao thành công.</p>
      {donHoanThanh.map((dh) => {
        const tt = nhanTrangThaiDonHang[dh.status];
        return (
          <div key={dh.id} className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <CheckCircle size={24} className="text-emerald-500 flex-shrink-0" />
              <div>
                <p className="font-bold text-neutral-900">#{dh.id}</p>
                <p className="text-sm text-neutral-500">{dh.shippingAddress}</p>
                <p className="text-xs text-neutral-400">{new Date(dh.updatedAt).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-neutral-900">{formatTien(dh.total)}</p>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tt.mau}`}>{tt.nhan}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
