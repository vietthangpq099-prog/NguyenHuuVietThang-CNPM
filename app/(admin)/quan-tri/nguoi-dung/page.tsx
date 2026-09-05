'use client';

import React, { useState } from 'react';
import { mockNguoiDung } from '@/lib/data/mock-admin';
import { User } from '@/types';
import { Search, ShieldCheck, UserCheck, User as UserIcon } from 'lucide-react';

const NHAN_VAI: Record<string, { nhan: string; mau: string; icon: React.ReactNode }> = {
  admin:    { nhan: 'Quản trị viên', mau: 'bg-purple-100 text-purple-700', icon: <ShieldCheck size={12} /> },
  staff:    { nhan: 'Nhân viên',     mau: 'bg-blue-100 text-blue-700',    icon: <UserCheck size={12} /> },
  customer: { nhan: 'Khách hàng',    mau: 'bg-neutral-100 text-neutral-700', icon: <UserIcon size={12} /> },
};

export default function TrangQuanLyNguoiDung() {
  const [danhSach, setDanhSach] = useState<User[]>(mockNguoiDung);
  const [tuKhoa, setTuKhoa] = useState('');
  const [locVai, setLocVai] = useState('');

  const ndHienThi = danhSach.filter((nd) => {
    const khopTen = nd.name.toLowerCase().includes(tuKhoa.toLowerCase()) || nd.email.toLowerCase().includes(tuKhoa.toLowerCase());
    const khopVai = !locVai || nd.role === locVai;
    return khopTen && khopVai;
  });

  const doiVai = (id: string, vaiMoi: User['role']) => {
    setDanhSach((prev) => prev.map((nd) => nd.id === id ? { ...nd, role: vaiMoi } : nd));
  };

  return (
    <div className="space-y-5">
      {/* Thống kê nhanh */}
      <div className="grid grid-cols-3 gap-4">
        {(['admin', 'staff', 'customer'] as const).map((vai) => {
          const info = NHAN_VAI[vai];
          const so = danhSach.filter((nd) => nd.role === vai).length;
          return (
            <div key={vai} className={`${info.mau} rounded-2xl p-4 border border-current/10`}>
              <p className="text-xs font-medium opacity-70 mb-1">{info.nhan}</p>
              <p className="font-bold text-2xl">{so}</p>
            </div>
          );
        })}
      </div>

      {/* Thanh tìm kiếm + lọc */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text" placeholder="Tìm tên, email..."
            value={tuKhoa} onChange={(e) => setTuKhoa(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-white"
          />
        </div>
        <select
          value={locVai} onChange={(e) => setLocVai(e.target.value)}
          className="px-3 py-2 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-white"
        >
          <option value="">Tất cả vai trò</option>
          <option value="admin">Quản trị viên</option>
          <option value="staff">Nhân viên</option>
          <option value="customer">Khách hàng</option>
        </select>
      </div>

      {/* Bảng người dùng */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100">
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Người Dùng</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Số Điện Thoại</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Ngày Tham Gia</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Vai Trò</th>
                <th className="text-center px-4 py-3 font-semibold text-neutral-600">Phân Quyền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {ndHienThi.map((nd) => {
                const vai = NHAN_VAI[nd.role];
                return (
                  <tr key={nd.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#C9A84C]/20 rounded-full flex items-center justify-center text-[#C9A84C] font-bold text-sm flex-shrink-0">
                          {nd.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">{nd.name}</p>
                          <p className="text-xs text-neutral-400">{nd.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 text-xs">{nd.phone || '—'}</td>
                    <td className="px-4 py-3 text-neutral-500 text-xs">
                      {new Date(nd.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1 w-fit px-2.5 py-1 rounded-full text-xs font-semibold ${vai.mau}`}>
                        {vai.icon}{vai.nhan}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <select
                        value={nd.role}
                        onChange={(e) => doiVai(nd.id, e.target.value as User['role'])}
                        disabled={nd.role === 'admin'}
                        className="px-2 py-1 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9A84C] bg-white disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <option value="customer">Khách hàng</option>
                        <option value="staff">Nhân viên</option>
                        <option value="admin">Quản trị viên</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-neutral-100">
          <p className="text-sm text-neutral-500">Hiển thị <span className="font-bold">{ndHienThi.length}</span> / {danhSach.length} người dùng</p>
        </div>
      </div>
    </div>
  );
}
