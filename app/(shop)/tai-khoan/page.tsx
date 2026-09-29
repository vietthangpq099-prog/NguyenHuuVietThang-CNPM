'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User, Mail, Phone, MapPin, Package, LogOut, Edit3, Save, X,
  ShieldCheck, Bell, Clock, Monitor, Smartphone, Globe, CheckCircle, AlertCircle, Eye, EyeOff,
} from 'lucide-react';
import { mockDonHang, nhanTrangThaiDonHang, formatTien } from '@/lib/data/mock-admin';

const thongTinMau = {
  ten: 'Nguyễn Văn A',
  email: 'nguyenvana@gmail.com',
  sdt: '0901234567',
  diaChi: '123 Nguyễn Huệ, Quận 1, TP.HCM',
  ngayTao: '01/10/2023',
  matKhau: '••••••••',
};

// Dữ liệu lịch sử đăng nhập mẫu
const lichSuDangNhap = [
  {
    id: 1,
    thietBi: 'Chrome / Windows 11',
    loai: 'desktop',
    diaChi: '113.172.xxx.xxx',
    viTri: 'TP. Hồ Chí Minh, VN',
    thoiGian: '07/09/2026 09:30',
    trangThai: 'thanh-cong',
    hienTai: true,
  },
  {
    id: 2,
    thietBi: 'Safari / iPhone 15',
    loai: 'mobile',
    diaChi: '113.172.xxx.xxx',
    viTri: 'TP. Hồ Chí Minh, VN',
    thoiGian: '06/09/2026 21:14',
    trangThai: 'thanh-cong',
    hienTai: false,
  },
  {
    id: 3,
    thietBi: 'Chrome / Android',
    loai: 'mobile',
    diaChi: '27.68.xxx.xxx',
    viTri: 'Hà Nội, VN',
    thoiGian: '05/09/2026 15:02',
    trangThai: 'thanh-cong',
    hienTai: false,
  },
  {
    id: 4,
    thietBi: 'Firefox / Windows 10',
    loai: 'desktop',
    diaChi: '118.70.xxx.xxx',
    viTri: 'Đà Nẵng, VN',
    thoiGian: '03/09/2026 08:45',
    trangThai: 'that-bai',
    hienTai: false,
  },
  {
    id: 5,
    thietBi: 'Chrome / macOS',
    loai: 'desktop',
    diaChi: '113.172.xxx.xxx',
    viTri: 'TP. Hồ Chí Minh, VN',
    thoiGian: '01/09/2026 19:20',
    trangThai: 'thanh-cong',
    hienTai: false,
  },
];

type Tab = 'ho-so' | 'don-hang' | 'dang-nhap' | 'bao-mat';

export default function TrangTaiKhoan() {
  const [tab, setTab] = useState<Tab>('ho-so');
  const [dangSua, setDangSua] = useState(false);
  const [thongTin, setThongTin] = useState(thongTinMau);
  const [temp, setTemp] = useState(thongTinMau);
  const [luuThanhCong, setLuuThanhCong] = useState(false);
  const [hienMatKhauCu, setHienMatKhauCu] = useState(false);
  const [hienMatKhauMoi, setHienMatKhauMoi] = useState(false);
  const [matKhauCu, setMatKhauCu] = useState('');
  const [matKhauMoi, setMatKhauMoi] = useState('');
  const [xacNhanMK, setXacNhanMK] = useState('');
  const [doiMKThanhCong, setDoiMKThanhCong] = useState(false);

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

  const doiMatKhau = () => {
    if (!matKhauCu || !matKhauMoi || matKhauMoi !== xacNhanMK) return;
    setDoiMKThanhCong(true);
    setMatKhauCu(''); setMatKhauMoi(''); setXacNhanMK('');
    setTimeout(() => setDoiMKThanhCong(false), 3000);
  };

  const donHangCuaToi = mockDonHang.slice(0, 5);

  const tabList: { id: Tab; icon: React.ElementType; label: string }[] = [
    { id: 'ho-so',    icon: User,         label: 'Hồ Sơ Cá Nhân' },
    { id: 'don-hang', icon: Package,      label: 'Đơn Hàng' },
    { id: 'dang-nhap',icon: Clock,        label: 'Lịch Sử Đăng Nhập' },
    { id: 'bao-mat',  icon: ShieldCheck,  label: 'Bảo Mật' },
  ];

  return (
    <div className="container-main py-10">
      <h1 className="font-bold text-2xl text-neutral-950 mb-8">Tài Khoản Của Tôi</h1>

      {luuThanhCong && (
        <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm font-medium flex items-center gap-2">
          <CheckCircle size={16} /> Thông tin đã được cập nhật thành công!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ======== SIDEBAR ======== */}
        <div className="space-y-1">
          {/* Avatar card */}
          <div className="flex flex-col items-center py-6 px-4 bg-neutral-50 rounded-2xl mb-4 text-center border border-neutral-100">
            <div className="w-16 h-16 bg-[#C9A84C]/20 rounded-full flex items-center justify-center text-[#C9A84C] font-bold text-2xl mb-3">
              {thongTin.ten.charAt(0)}
            </div>
            <p className="font-bold text-neutral-900 text-sm">{thongTin.ten}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{thongTin.email}</p>
            <span className="mt-2 px-3 py-1 bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-semibold rounded-full">Khách hàng</span>
            <p className="text-xs text-neutral-400 mt-2">Thành viên từ {thongTin.ngayTao}</p>
          </div>

          {tabList.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
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

        {/* ======== NỘI DUNG ======== */}
        <div className="lg:col-span-3">

          {/* TAB: Hồ sơ */}
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
                  { icon: User,   label: 'Họ và tên',       key: 'ten',     type: 'text' },
                  { icon: Mail,   label: 'Email',            key: 'email',   type: 'email' },
                  { icon: Phone,  label: 'Số điện thoại',   key: 'sdt',     type: 'tel' },
                  { icon: MapPin, label: 'Địa chỉ',         key: 'diaChi',  type: 'text' },
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
            </div>
          )}

          {/* TAB: Đơn hàng */}
          {tab === 'don-hang' && (
            <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
              <h2 className="font-bold text-lg text-neutral-900 mb-5">Đơn Hàng Của Tôi</h2>
              <div className="space-y-3">
                {donHangCuaToi.map((dh) => {
                  const tt = nhanTrangThaiDonHang[dh.status];
                  return (
                    <div key={dh.id} className="border border-neutral-100 rounded-2xl p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-bold text-neutral-900 text-sm">#{dh.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${tt.mau}`}>{tt.nhan}</span>
                            {dh.status === 'delivered' && <CheckCircle size={13} className="text-emerald-500" />}
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
              <div className="text-center mt-4">
                <Link href="/don-hang" className="text-sm text-[#C9A84C] hover:underline font-medium">
                  Xem toàn bộ lịch sử đơn hàng →
                </Link>
              </div>
            </div>
          )}

          {/* TAB: Lịch sử đăng nhập */}
          {tab === 'dang-nhap' && (
            <div className="space-y-4">
              {/* Thông tin đăng nhập hiện tại */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                <h2 className="font-bold text-lg text-neutral-900 mb-5 flex items-center gap-2">
                  <User size={18} className="text-[#C9A84C]" /> Thông Tin Tài Khoản Đăng Nhập
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Tên đăng nhập (Email)', value: thongTin.email, icon: Mail },
                    { label: 'Mật khẩu', value: '••••••••', icon: ShieldCheck },
                    { label: 'Vai trò', value: 'Khách hàng (Customer)', icon: User },
                    { label: 'Phiên đăng nhập', value: 'Đang hoạt động ✓', icon: Clock },
                    { label: 'Đăng nhập lần cuối', value: '07/09/2026 lúc 09:30', icon: Clock },
                    { label: 'Địa chỉ IP hiện tại', value: '113.172.xxx.xxx', icon: Globe },
                  ].map((item) => (
                    <div key={item.label} className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <item.icon size={12} className="text-neutral-400" />
                        <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">{item.label}</p>
                      </div>
                      <p className="text-sm font-semibold text-neutral-900">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-3 flex-wrap">
                  <button
                    onClick={() => setTab('bao-mat')}
                    className="flex items-center gap-2 text-sm bg-neutral-950 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    <ShieldCheck size={14} /> Đổi mật khẩu
                  </button>
                  <Link href="/dang-nhap" className="flex items-center gap-2 text-sm border-2 border-red-200 text-red-500 px-4 py-2.5 rounded-xl font-semibold hover:bg-red-50 transition-colors">
                    <LogOut size={14} /> Đăng xuất tất cả thiết bị
                  </Link>
                </div>
              </div>

              {/* Lịch sử đăng nhập */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                <h2 className="font-bold text-lg text-neutral-900 mb-2 flex items-center gap-2">
                  <Clock size={18} className="text-[#C9A84C]" /> Lịch Sử Đăng Nhập
                </h2>
                <p className="text-xs text-neutral-400 mb-5">5 lần đăng nhập gần nhất từ tất cả thiết bị</p>

                <div className="space-y-3">
                  {lichSuDangNhap.map((ls) => (
                    <div
                      key={ls.id}
                      className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                        ls.hienTai
                          ? 'border-[#C9A84C]/30 bg-[#C9A84C]/5'
                          : ls.trangThai === 'that-bai'
                          ? 'border-red-100 bg-red-50'
                          : 'border-neutral-100 bg-neutral-50'
                      }`}
                    >
                      {/* Icon thiết bị */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        ls.trangThai === 'that-bai' ? 'bg-red-100' : ls.hienTai ? 'bg-[#C9A84C]/15' : 'bg-neutral-200'
                      }`}>
                        {ls.loai === 'mobile'
                          ? <Smartphone size={18} className={ls.trangThai === 'that-bai' ? 'text-red-500' : ls.hienTai ? 'text-[#C9A84C]' : 'text-neutral-500'} />
                          : <Monitor size={18} className={ls.trangThai === 'that-bai' ? 'text-red-500' : ls.hienTai ? 'text-[#C9A84C]' : 'text-neutral-500'} />
                        }
                      </div>

                      {/* Thông tin */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <p className="text-sm font-semibold text-neutral-900">{ls.thietBi}</p>
                          {ls.hienTai && (
                            <span className="px-2 py-0.5 bg-[#C9A84C] text-white text-xs font-bold rounded-full">Hiện tại</span>
                          )}
                          {ls.trangThai === 'that-bai' && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                              <AlertCircle size={10} /> Thất bại
                            </span>
                          )}
                          {ls.trangThai === 'thanh-cong' && !ls.hienTai && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                              <CheckCircle size={10} /> Thành công
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                          <p className="text-xs text-neutral-500 flex items-center gap-1">
                            <Globe size={10} /> {ls.diaChi}
                          </p>
                          <p className="text-xs text-neutral-500">{ls.viTri}</p>
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5 flex items-center gap-1">
                          <Clock size={10} /> {ls.thoiGian}
                        </p>
                      </div>

                      {/* Nút đăng xuất phiên đó */}
                      {!ls.hienTai && ls.trangThai === 'thanh-cong' && (
                        <button className="text-xs text-red-400 hover:text-red-600 hover:underline cursor-pointer flex-shrink-0 transition-colors">
                          Thu hồi
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                  <p className="text-xs text-amber-700 font-medium flex items-start gap-2">
                    <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                    Nếu bạn thấy đăng nhập không quen thuộc, hãy đổi mật khẩu ngay và nhấn &quot;Đăng xuất tất cả thiết bị&quot; để bảo vệ tài khoản.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Bảo mật */}
          {tab === 'bao-mat' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                <h2 className="font-bold text-lg text-neutral-900 mb-6">Đổi Mật Khẩu</h2>

                {doiMKThanhCong && (
                  <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-medium flex items-center gap-2">
                    <CheckCircle size={16} /> Mật khẩu đã được cập nhật thành công!
                  </div>
                )}

                <div className="space-y-4 max-w-md">
                  {/* Mật khẩu hiện tại */}
                  <div>
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 block">
                      Mật khẩu hiện tại
                    </label>
                    <div className="relative">
                      <input
                        type={hienMatKhauCu ? 'text' : 'password'}
                        value={matKhauCu}
                        onChange={(e) => setMatKhauCu(e.target.value)}
                        placeholder="Nhập mật khẩu hiện tại"
                        className="w-full px-4 py-3 pr-11 border-2 border-neutral-200 rounded-xl focus:border-[#C9A84C] focus:outline-none text-sm"
                      />
                      <button type="button" onClick={() => setHienMatKhauCu(!hienMatKhauCu)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer">
                        {hienMatKhauCu ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Mật khẩu mới */}
                  <div>
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 block">
                      Mật khẩu mới (ít nhất 8 ký tự)
                    </label>
                    <div className="relative">
                      <input
                        type={hienMatKhauMoi ? 'text' : 'password'}
                        value={matKhauMoi}
                        onChange={(e) => setMatKhauMoi(e.target.value)}
                        placeholder="Nhập mật khẩu mới"
                        className="w-full px-4 py-3 pr-11 border-2 border-neutral-200 rounded-xl focus:border-[#C9A84C] focus:outline-none text-sm"
                      />
                      <button type="button" onClick={() => setHienMatKhauMoi(!hienMatKhauMoi)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer">
                        {hienMatKhauMoi ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {/* Thanh độ mạnh */}
                    {matKhauMoi && (
                      <div className="mt-2 space-y-1">
                        <div className="flex gap-1">
                          {[1,2,3,4].map((i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
                              matKhauMoi.length < 6 ? (i === 1 ? 'bg-red-400' : 'bg-neutral-200') :
                              matKhauMoi.length < 8 ? (i <= 2 ? 'bg-amber-400' : 'bg-neutral-200') :
                              matKhauMoi.length < 12 ? (i <= 3 ? 'bg-blue-400' : 'bg-neutral-200') :
                              'bg-emerald-500'
                            }`} />
                          ))}
                        </div>
                        <p className="text-xs text-neutral-400">
                          Độ mạnh: {matKhauMoi.length < 6 ? '⚠️ Yếu' : matKhauMoi.length < 8 ? '🔶 Trung bình' : matKhauMoi.length < 12 ? '🔷 Khá mạnh' : '✅ Mạnh'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Xác nhận mật khẩu */}
                  <div>
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 block">
                      Xác nhận mật khẩu mới
                    </label>
                    <input
                      type="password"
                      value={xacNhanMK}
                      onChange={(e) => setXacNhanMK(e.target.value)}
                      placeholder="Nhập lại mật khẩu mới"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-sm transition-colors ${
                        xacNhanMK && matKhauMoi !== xacNhanMK
                          ? 'border-red-300 focus:border-red-400'
                          : xacNhanMK && matKhauMoi === xacNhanMK
                          ? 'border-emerald-300 focus:border-emerald-400'
                          : 'border-neutral-200 focus:border-[#C9A84C]'
                      }`}
                    />
                    {xacNhanMK && matKhauMoi !== xacNhanMK && (
                      <p className="text-xs text-red-500 mt-1">Mật khẩu không khớp</p>
                    )}
                  </div>

                  <button
                    onClick={doiMatKhau}
                    disabled={!matKhauCu || matKhauMoi.length < 8 || matKhauMoi !== xacNhanMK}
                    className="w-full px-6 py-3 bg-neutral-950 text-white rounded-xl font-semibold text-sm hover:bg-neutral-700 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Cập nhật mật khẩu
                  </button>
                </div>
              </div>

              {/* Cài đặt thông báo */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                <h2 className="font-bold text-lg text-neutral-900 mb-5">Cài Đặt Thông Báo</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Thông báo trạng thái đơn hàng', mo_ta: 'Nhận email khi đơn hàng được cập nhật', bat: true },
                    { label: 'Khuyến mãi & ưu đãi', mo_ta: 'Nhận email về chương trình giảm giá mới', bat: true },
                    { label: 'Đăng nhập lạ', mo_ta: 'Cảnh báo khi có đăng nhập từ thiết bị mới', bat: true },
                    { label: 'Bản tin hàng tuần', mo_ta: 'Nhận email tổng hợp sản phẩm mới mỗi tuần', bat: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-3 border-b border-neutral-50 last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-neutral-800">{item.label}</p>
                        <p className="text-xs text-neutral-400 mt-0.5">{item.mo_ta}</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${item.bat ? 'bg-[#C9A84C]' : 'bg-neutral-300'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${item.bat ? 'right-1' : 'left-1'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
