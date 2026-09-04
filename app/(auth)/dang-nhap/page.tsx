'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';

export default function TrangDangNhap() {
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [hienMatKhau, setHienMatKhau] = useState(false);
  const [dangTai, setDangTai] = useState(false);
  const [loiForm, setLoiForm] = useState('');

  const xuLyDangNhap = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoiForm('');

    if (!email || !matKhau) {
      setLoiForm('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLoiForm('Email không hợp lệ.');
      return;
    }
    if (matKhau.length < 6) {
      setLoiForm('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    setDangTai(true);
    // Giả lập API call
    await new Promise((r) => setTimeout(r, 1200));
    setDangTai(false);
    // TODO: Tích hợp auth thực tế ở giai đoạn sau
    alert('Đăng nhập thành công! (Demo)');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo nhỏ */}
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
          <h1 className="font-serif font-bold text-3xl text-neutral-950 mb-2">Chào mừng trở lại!</h1>
          <p className="text-neutral-500 text-sm">Đăng nhập để tiếp tục mua sắm</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl border border-neutral-100 shadow-[0_4px_40px_rgba(0,0,0,0.08)] p-8">
          <form onSubmit={xuLyDangNhap} className="space-y-5">
            {/* Thông báo lỗi */}
            {loiForm && (
              <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm text-red-600">
                {loiForm}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                Địa chỉ Email
              </label>
              <div className="relative">
                <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full pl-11 pr-4 py-3 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent bg-neutral-50 transition-all"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-neutral-700">Mật Khẩu</label>
                <Link href="/quen-mat-khau" className="text-xs text-[#C9A84C] hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type={hienMatKhau ? 'text' : 'password'}
                  value={matKhau}
                  onChange={(e) => setMatKhau(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className="w-full pl-11 pr-12 py-3 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent bg-neutral-50 transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setHienMatKhau(!hienMatKhau)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  {hienMatKhau ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Nút đăng nhập */}
            <button
              type="submit"
              disabled={dangTai}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-neutral-950 hover:bg-neutral-700 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {dangTai ? (
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>Đăng Nhập <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          {/* Phân cách */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-neutral-100" />
            <span className="text-xs text-neutral-400 font-medium">hoặc</span>
            <div className="flex-1 h-px bg-neutral-100" />
          </div>

          {/* Chưa có tài khoản */}
          <p className="text-center text-sm text-neutral-600">
            Chưa có tài khoản?{' '}
            <Link href="/dang-ky" className="text-[#C9A84C] font-semibold hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
