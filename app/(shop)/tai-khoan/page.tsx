'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Phone, MapPin, Package, LogOut, Edit3, Save, X, ShieldCheck, Bell } from 'lucide-react';
import { mockDonHang, nhanTrangThaiDonHang, formatTien } from '@/lib/data/mock-admin';

const thongTinMau = {
  ten: 'Nguyễn Văn A',
  email: 'nguyenvana@gmail.com',
  sdt: '0901234567',
  diaChi: '123 Nguyễn Huệ, Quận 1, TP.HCM',
  ngayTao: '01/10/2023',
};

type Tab = 'ho-so' | 'don-hang' | 'bao-mat';

export default function TrangTaiKhoan() {
  const [tab, setTab] = useState<Tab>('ho-so');
  const [dangSua, setDangSua] = useState(false);
  const [thongTin, setThongTin] = useState(thongTinMau);
  const [temp, setTemp] = useState(thongTinMau);
  const [luuThanhCong, setLuuThanhCong] = useState(false);

  const luuThayDoi = () => {
    setThongTin(temp);
    setDangSua(false);
    setLuuThanhCong(true);
    setTimeout(() => setLuuThanhCong(false), 3000);
  };

  const huyThayDoi = () => {
    setTemp(thongTin);
    setDangSua(false);
  };

  const donHangCuaToi = mockDonHang.slice(0, 4);

  return (
    <div className="container-main py-10">
      <h1 className="font-bold text-2xl text-neutral-950 mb-8">Tài Khoản Của Tôi</h1>

      {luuThanhCong && (
        <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm font-medium flex items-center gap-2">
          ✓ Thông tin đã được cập nhật thành công!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-1">
          {/* Avatar */}
          <div className="flex flex-col items-center py-6 px-4 bg-neutral-50 rounded-2xl mb-4 text-center">
            <div className="w-16 h-16 bg-[#C9A84C]/20 rounded-full flex items-center justify-center text-[#C9A84C] font-bold text-2xl mb-3">
              {thongTin.ten.charAt(0)}
            </div>
            <p className="font-bold text-neutral-900 text-sm">{thongTin.ten}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{thongTin.email}</p>
            <span className="mt-2 px-3 py-1 bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-semibold rounded-full">Khách hàng</span>
          </div>

          {[
            { id: 'ho-so', icon: User, label: 'Hồ Sơ Cá Nhân' },
            { id: 'don-hang', icon: Package, label: 'Đơn Hàng Của Tôi' },
            { id: 'bao-mat', icon: ShieldCheck, label: 'Bảo Mật' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium text-left cursor-pointer ${
                tab === item.id ? 'bg-neutral-950 text-white' : 'hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-100 mt-2">
            <Link href="/dang-nhap" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
              <LogOut size={16} /> Đăng Xuất
            </Link>
          </div>
        </div>

        {/* Main */}
        <div className="lg:col-span-3">
          {/* Tab: Hồ sơ */}
          {tab === 'ho-so' && (
            <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg text-neutral-900">Hồ Sơ Cá Nhân</h2>
                {!dangSua ? (
                  <button onClick={() => setDangSua(true)} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-[#C9A84C] transition-colors cursor-pointer px-3 py-2 rounded-xl hover:bg-neutral-50">
                    <Edit3 size={15} /> Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={luuThayDoi} className="flex items-center gap-2 text-sm bg-emerald-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-emerald-600 font-semibold">
                      <Save size={14} /> Lưu
                    </button>
                    <button onClick={huyThayDoi} className="flex items-center gap-2 text-sm border-2 border-neutral-200 text-neutral-600 px-4 py-2 rounded-xl cursor-pointer hover:bg-neutral-50">
                      <X size={14} /> Huỷ
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {[
                  { icon: User, label: 'Họ và tên', key: 'ten', type: 'text' },
                  { icon: Mail, label: 'Email', key: 'email', type: 'email' },
                  { icon: Phone, label: 'Số điện thoại', key: 'sdt', type: 'tel' },
                  { icon: MapPin, label: 'Địa chỉ', key: 'diaChi', type: 'text' },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <f.icon size={12} /> {f.label}
                    </label>
                    {dangSua ? (
                      <input
                        type={f.type}
                        value={temp[f.key as keyof typeof temp]}
                        onChange={(e) => setTemp({ ...temp, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-[#C9A84C] focus:outline-none text-sm transition-colors"
                      />
                    ) : (
                      <p className="text-sm text-neutral-900 bg-neutral-50 px-4 py-3 rounded-xl border border-neutral-100">
                        {thongTin[f.key as keyof typeof thongTin]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-100">
                <p className="text-xs text-neutral-400">
                  📅 Thành viên từ: <span className="font-semibold text-neutral-600">{thongTin.ngayTao}</span>
                </p>
              </div>
            </div>
          )}

          {/* Tab: Đơn hàng */}
          {tab === 'don-hang' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                <h2 className="font-bold text-lg text-neutral-900 mb-5">Đơn Hàng Của Tôi</h2>
                {donHangCuaToi.map((dh) => {
                  const tt = nhanTrangThaiDonHang[dh.status];
                  return (
                    <div key={dh.id} className="border border-neutral-100 rounded-2xl p-4 mb-3 last:mb-0 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-bold text-neutral-900 text-sm">#{dh.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${tt.mau}`}>{tt.nhan}</span>
                          </div>
                          <p className="text-xs text-neutral-500">{dh.shippingAddress}</p>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            {new Date(dh.createdAt).toLocaleDateString('vi-VN')} · {dh.paymentMethod}
                          </p>
                        </div>
                        <p className="font-bold text-neutral-900 text-sm flex-shrink-0">{formatTien(dh.total)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center">
                <Link href="/don-hang" className="text-sm text-[#C9A84C] hover:underline font-medium">
                  Xem toàn bộ đơn hàng →
                </Link>
              </div>
            </div>
          )}

          {/* Tab: Bảo mật */}
          {tab === 'bao-mat' && (
            <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
              <h2 className="font-bold text-lg text-neutral-900 mb-6">Bảo Mật Tài Khoản</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-1 text-sm">Đổi Mật Khẩu</h3>
                  <p className="text-xs text-neutral-500 mb-4">Đảm bảo mật khẩu mới ít nhất 8 ký tự</p>
                  <div className="space-y-3">
                    <input type="password" placeholder="Mật khẩu hiện tại" className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-[#C9A84C] focus:outline-none text-sm" />
                    <input type="password" placeholder="Mật khẩu mới" className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-[#C9A84C] focus:outline-none text-sm" />
                    <input type="password" placeholder="Xác nhận mật khẩu mới" className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-[#C9A84C] focus:outline-none text-sm" />
                    <button className="px-6 py-2.5 bg-neutral-950 text-white rounded-xl font-semibold text-sm hover:bg-neutral-700 transition-colors cursor-pointer">
                      Cập nhật mật khẩu
                    </button>
                  </div>
                </div>
                <div className="pt-6 border-t border-neutral-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-neutral-800 text-sm flex items-center gap-2"><Bell size={14} /> Thông báo Email</h3>
                      <p className="text-xs text-neutral-500 mt-0.5">Nhận thông báo về đơn hàng và khuyến mãi</p>
                    </div>
                    <div className="w-12 h-6 bg-[#C9A84C] rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
