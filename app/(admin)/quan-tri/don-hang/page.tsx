'use client';

import React, { useState } from 'react';
import { mockDonHang, nhanTrangThaiDonHang, formatTien } from '@/lib/data/mock-admin';
import { Order } from '@/types';
import { ChevronDown } from 'lucide-react';

const TAB_TRANG_THAI = [
  { gia_tri: '', nhan: 'Tất cả' },
  { gia_tri: 'pending', nhan: 'Chờ xác nhận' },
  { gia_tri: 'confirmed', nhan: 'Đã xác nhận' },
  { gia_tri: 'processing', nhan: 'Đang xử lý' },
  { gia_tri: 'shipped', nhan: 'Đang giao' },
  { gia_tri: 'delivered', nhan: 'Đã giao' },
  { gia_tri: 'cancelled', nhan: 'Đã huỷ' },
];

const BUOC_TIEP_THEO: Record<string, string> = {
  pending: 'confirmed', confirmed: 'processing',
  processing: 'shipped', shipped: 'delivered',
};

export default function TrangQuanLyDonHang() {
  const [danhSach, setDanhSach] = useState<Order[]>(mockDonHang);
  const [tabHienTai, setTabHienTai] = useState('');

  const dhHienThi = tabHienTai ? danhSach.filter((dh) => dh.status === tabHienTai) : danhSach;

  const capNhatTrangThai = (id: string, trangThai: string) => {
    setDanhSach((prev) => prev.map((dh) => dh.id === id ? { ...dh, status: trangThai as Order['status'] } : dh));
  };

  const demTheoTrangThai = (tt: string) => danhSach.filter((dh) => dh.status === tt).length;

  return (
    <div className="space-y-5">
      {/* Tab lọc */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {TAB_TRANG_THAI.map((tab) => {
          const so = tab.gia_tri ? demTheoTrangThai(tab.gia_tri) : danhSach.length;
          return (
            <button
              key={tab.gia_tri}
              onClick={() => setTabHienTai(tab.gia_tri)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                tabHienTai === tab.gia_tri ? 'bg-neutral-950 text-white' : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {tab.nhan}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${tabHienTai === tab.gia_tri ? 'bg-white/20' : 'bg-neutral-100'}`}>{so}</span>
            </button>
          );
        })}
      </div>

      {/* Bảng đơn hàng */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100">
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Mã Đơn</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Địa Chỉ Giao</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Ngày Đặt</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Tổng Tiền</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Trạng Thái</th>
                <th className="text-center px-4 py-3 font-semibold text-neutral-600">Cập Nhật</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {dhHienThi.map((dh) => {
                const tt = nhanTrangThaiDonHang[dh.status];
                const buocTiep = BUOC_TIEP_THEO[dh.status];
                return (
                  <tr key={dh.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-neutral-900">#{dh.id}</td>
                    <td className="px-4 py-3 text-neutral-600 max-w-[180px]">
                      <p className="truncate text-xs">{dh.shippingAddress}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{dh.paymentMethod}</p>
                    </td>
                    <td className="px-4 py-3 text-neutral-500 text-xs">
                      {new Date(dh.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-4 py-3 font-bold text-neutral-900">{formatTien(dh.total)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tt.mau}`}>{tt.nhan}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {buocTiep ? (
                        <button
                          onClick={() => capNhatTrangThai(dh.id, buocTiep)}
                          className="flex items-center gap-1 mx-auto px-3 py-1.5 bg-[#C9A84C] hover:bg-[#A8893A] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          <ChevronDown size={12} className="-rotate-90" />
                          {nhanTrangThaiDonHang[buocTiep]?.nhan}
                        </button>
                      ) : (
                        <span className="text-xs text-neutral-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-neutral-100">
          <p className="text-sm text-neutral-500">Tổng cộng <span className="font-bold">{dhHienThi.length}</span> đơn hàng</p>
        </div>
      </div>
    </div>
  );
}
