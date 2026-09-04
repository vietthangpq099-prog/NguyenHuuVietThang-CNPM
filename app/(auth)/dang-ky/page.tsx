'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight, Check } from 'lucide-react';

export default function TrangDangKy() {
  const [form, setForm] = useState({
    hoTen: '', email: '', soDienThoai: '', matKhau: '', xacNhanMatKhau: '',
  });
  const [hienMatKhau, setHienMatKhau] = useState(false);
  const [hienXacNhan, setHienXacNhan] = useState(false);
  const [dangTai, setDangTai] = useState(false);
  const [loiForm, setLoiForm] = useState<Partial<typeof form & { chung: string }>>({});
  const [thanhCong, setThanhCong] = useState(false);

  const capNhatForm = (truong: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [truong]: e.target.value }));
    setLoiForm((prev) => ({ ...prev, [truong]: '' }));
  };

  const kiemTraHopLe = (): boolean => {
    const loi: Partial<typeof form & { chung: string }> = {};
    if (!form.hoTen.trim()) loi.hoTen = 'Vui lòng nhập họ tên.';
    if (!form.email) loi.email = 'Vui lòng nhập email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) loi.email = 'Email không hợp lệ.';
    if (!form.matKhau) loi.matKhau = 'Vui lòng nhập mật khẩu.';
    else if (form.matKhau.length < 6) loi.matKhau = 'Mật khẩu ít nhất 6 ký tự.';
    if (!form.xacNhanMatKhau) loi.xacNhanMatKhau = 'Vui lòng xác nhận mật khẩu.';
    else if (form.matKhau !== form.xacNhanMatKhau) loi.xacNhanMatKhau = 'Mật khẩu không khớp.';
    setLoiForm(loi);
    return Object.keys(loi).length === 0;
  };

  const xuLyDangKy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kiemTraHopLe()) return;
    setDangTai(true);
    await new Promise((r) => setTimeout(r, 1500));
    setDangTai(false);
    setThanhCong(true);
  };

  if (thanhCong) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-emerald-600" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-neutral-950 mb-3">Đăng ký thành công!</h2>
          <p className="text-neutral-500 text-sm mb-6">
            Chào mừng <span className="font-semibold text-neutral-800">{form.hoTen}</span> đến với OpticShop!
          </p>
          <Link
            href="/dang-nhap"
            className="inline-flex items-center gap-2 bg-neutral-950 text-white px-8 py-3.5 rounded-full font-bold hover:bg-neutral-700 transition-colors"
          >
            Đăng nhập ngay <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Tiêu đề */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-neutral-950 rounded-xl flex items-center justify-center">
              <Eye size={22} className="text-white" />
            </div>
            <div className="leading-none text-left">
              <span className="font-serif font-bold text-xl text-neutral-950 block">Optic</span>
              <span className="text-xs text-[#C9A84C] font-semibold tracking-[0.2em] uppercase">Shop</span>
            </div>
          </Link>
          <h1 className="font-serif font-bold text-3xl text-neutral-950 mb-2">Tạo tài khoản</h1>
          <p className="text-neutral-500 text-sm">Đăng ký để nhận ưu đãi độc quyền</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl border border-neutral-100 shadow-[0_4px_40px_rgba(0,0,0,0.08)] p-8">
          <form onSubmit={xuLyDangKy} className="space-y-4">
            {/* Họ tên */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Họ và Tên</label>
              <div className="relative">
                <User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={form.hoTen}
                  onChange={capNhatForm('hoTen')}
                  placeholder="Nguyễn Văn A"
                  className={`w-full pl-11 pr-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent bg-neutral-50 transition-all ${loiForm.hoTen ? 'border-red-300' : 'border-neutral-200'}`}
                />
              </div>
              {loiForm.hoTen && <p className="text-xs text-red-500 mt-1">{loiForm.hoTen}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={capNhatForm('email')}
                  placeholder="email@example.com"
                  className={`w-full pl-11 pr-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent bg-neutral-50 transition-all ${loiForm.email ? 'border-red-300' : 'border-neutral-200'}`}
                />
              </div>
              {loiForm.email && <p className="text-xs text-red-500 mt-1">{loiForm.email}</p>}
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Số Điện Thoại <span className="text-neutral-400 font-normal">(tuỳ chọn)</span></label>
              <div className="relative">
                <Phone size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="tel"
                  value={form.soDienThoai}
                  onChange={capNhatForm('soDienThoai')}
                  placeholder="0901 234 567"
                  className="w-full pl-11 pr-4 py-3 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent bg-neutral-50 transition-all"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Mật Khẩu</label>
              <div className="relative">
                <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type={hienMatKhau ? 'text' : 'password'}
                  value={form.matKhau}
                  onChange={capNhatForm('matKhau')}
                  placeholder="Ít nhất 6 ký tự"
                  className={`w-full pl-11 pr-12 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent bg-neutral-50 transition-all ${loiForm.matKhau ? 'border-red-300' : 'border-neutral-200'}`}
                />
                <button type="button" onClick={() => setHienMatKhau(!hienMatKhau)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer">
                  {hienMatKhau ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {loiForm.matKhau && <p className="text-xs text-red-500 mt-1">{loiForm.matKhau}</p>}
            </div>

            {/* Xác nhận mật khẩu */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Xác Nhận Mật Khẩu</label>
              <div className="relative">
                <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type={hienXacNhan ? 'text' : 'password'}
                  value={form.xacNhanMatKhau}
                  onChange={capNhatForm('xacNhanMatKhau')}
                  placeholder="Nhập lại mật khẩu"
                  className={`w-full pl-11 pr-12 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent bg-neutral-50 transition-all ${loiForm.xacNhanMatKhau ? 'border-red-300' : 'border-neutral-200'}`}
                />
                <button type="button" onClick={() => setHienXacNhan(!hienXacNhan)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer">
                  {hienXacNhan ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {loiForm.xacNhanMatKhau && <p className="text-xs text-red-500 mt-1">{loiForm.xacNhanMatKhau}</p>}
            </div>

            {/* Nút đăng ký */}
            <button
              type="submit"
              disabled={dangTai}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#C9A84C] hover:bg-[#A8893A] text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
            >
              {dangTai ? (
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>Tạo Tài Khoản <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          {/* Đã có tài khoản */}
          <p className="text-center text-sm text-neutral-600 mt-6">
            Đã có tài khoản?{' '}
            <Link href="/dang-nhap" className="text-[#C9A84C] font-semibold hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
