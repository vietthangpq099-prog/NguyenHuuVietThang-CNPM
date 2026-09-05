import React from 'react';
import Link from 'next/link';
import { mockDonHang, nhanTrangThaiDonHang, formatTien } from '@/lib/data/mock-admin';
import { ClipboardList, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const donCho = mockDonHang.filter((dh) => dh.status === 'pending' || dh.status === 'confirmed');
const donDangXuLy = mockDonHang.filter((dh) => dh.status === 'processing' || dh.status === 'shipped');
const donHoanThanh = mockDonHang.filter((dh) => dh.status === 'delivered');

export default function TrangTongQuanNhanVien() {
  return (
    <div className="space-y-6">
      {/* Thẻ thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { nhan: 'Đơn Chờ Xử Lý', so: donCho.length, mau: 'bg-yellow-50 text-yellow-700 border-yellow-100', icon: <Clock size={22} /> },
          { nhan: 'Đang Xử Lý', so: donDangXuLy.length, mau: 'bg-blue-50 text-blue-700 border-blue-100', icon: <ClipboardList size={22} /> },
          { nhan: 'Đã Hoàn Thành', so: donHoanThanh.length, mau: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: <CheckCircle size={22} /> },
        ].map((t) => (
          <div key={t.nhan} className={`${t.mau} border rounded-2xl p-5 flex items-center justify-between`}>
            <div>
              <p className="text-sm font-medium opacity-70 mb-1">{t.nhan}</p>
              <p className="font-bold text-3xl">{t.so}</p>
            </div>
            <div className="opacity-40">{t.icon}</div>
          </div>
        ))}
      </div>

      {/* Đơn hàng cần xử lý ngay */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-neutral-100">
          <h2 className="font-bold text-neutral-900">Đơn Hàng Cần Xử Lý</h2>
          <Link href="/nhan-vien/don-hang" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
            Xem tất cả <ArrowRight size={14} />
          </Link>
        </div>
        <div className="divide-y divide-neutral-50">
          {mockDonHang.slice(0, 5).map((dh) => {
            const tt = nhanTrangThaiDonHang[dh.status];
            return (
              <div key={dh.id} className="flex items-center justify-between px-5 py-4 hover:bg-neutral-50">
                <div>
                  <p className="font-semibold text-neutral-900 text-sm">#{dh.id}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{dh.shippingAddress}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tt.mau}`}>{tt.nhan}</span>
                <p className="font-bold text-sm text-neutral-900">{formatTien(dh.total)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
