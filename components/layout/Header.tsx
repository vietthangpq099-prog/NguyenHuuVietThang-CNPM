'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, ChevronDown, User, Eye } from 'lucide-react';
import { useGioHang } from '@/lib/context/CartContext';

const danhMuc = [
  { tenHienThi: 'Kính Mát', duongDan: '/san-pham?danh-muc=sunglasses', bieu: '☀️' },
  { tenHienThi: 'Kính Cận', duongDan: '/san-pham?danh-muc=eyeglasses', bieu: '👓' },
  { tenHienThi: 'Kính Thời Trang', duongDan: '/san-pham?danh-muc=fashion', bieu: '✨' },
  { tenHienThi: 'Kính Thể Thao', duongDan: '/san-pham?danh-muc=sports', bieu: '🏃' },
];

const menuDieuHuong = [
  { tenHienThi: 'Sản Phẩm', duongDan: '/san-pham', coDropdown: true },
  { tenHienThi: 'Dịch Vụ', duongDan: '/dich-vu', coDropdown: false },
  { tenHienThi: 'Bảo Hành', duongDan: '/bao-hanh', coDropdown: false },
  { tenHienThi: 'Về Chúng Tôi', duongDan: '/gioi-thieu', coDropdown: false },
];

export default function Header() {
  const [moMenuMobile, setMoMenuMobile] = useState(false);
  const [daScroll, setDaScroll] = useState(false);
  const [moTimKiem, setMoTimKiem] = useState(false);
  const [tuKhoa, setTuKhoa] = useState('');
  const [moDropdown, setMoDropdown] = useState(false);
  const refTimKiem = useRef<HTMLInputElement>(null);
  const { gioHang } = useGioHang();

  useEffect(() => {
    const xuLyScroll = () => setDaScroll(window.scrollY > 20);
    window.addEventListener('scroll', xuLyScroll);
    return () => window.removeEventListener('scroll', xuLyScroll);
  }, []);

  useEffect(() => {
    if (moTimKiem) refTimKiem.current?.focus();
  }, [moTimKiem]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        daScroll
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100'
          : 'bg-white'
      }`}
    >
      {/* Thanh thông báo */}
      <div className="bg-neutral-950 text-neutral-300 text-xs py-2">
        <div className="container-main flex justify-between items-center">
          <span>📦 Miễn phí vận chuyển cho đơn hàng trên 500.000đ</span>
          <div className="hidden sm:flex items-center gap-4">
            <span>📞 1800-888-999</span>
            <span>|</span>
            <span>⏰ 8:00 - 21:00 hàng ngày</span>
          </div>
        </div>
      </div>

      {/* Header chính */}
      <div className="container-main">
        <div className="flex items-center h-16 gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 bg-neutral-950 rounded-xl flex items-center justify-center group-hover:bg-[#C9A84C] transition-colors duration-200">
              <Eye size={20} className="text-white" />
            </div>
            <div className="leading-none">
              <span className="font-serif font-bold text-xl text-neutral-950 block">Optic</span>
              <span className="text-xs text-[#C9A84C] font-semibold tracking-[0.2em] uppercase">Shop</span>
            </div>
          </Link>

          {/* Menu điều hướng desktop */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {menuDieuHuong.map((muc) =>
              muc.coDropdown ? (
                <div
                  key={muc.tenHienThi}
                  className="relative"
                  onMouseEnter={() => setMoDropdown(true)}
                  onMouseLeave={() => setMoDropdown(false)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950 rounded-lg hover:bg-neutral-50 transition-all duration-150 cursor-pointer">
                    {muc.tenHienThi}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${moDropdown ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                      moDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 w-56">
                      {danhMuc.map((dm) => (
                        <Link
                          key={dm.duongDan}
                          href={dm.duongDan}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 transition-colors duration-150 group/dm"
                        >
                          <span className="text-lg">{dm.bieu}</span>
                          <span className="font-medium group-hover/dm:translate-x-0.5 transition-transform duration-150">
                            {dm.tenHienThi}
                          </span>
                        </Link>
                      ))}
                      <div className="border-t border-neutral-100 mt-2 pt-2">
                        <Link
                          href="/san-pham"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#C9A84C] hover:bg-amber-50 transition-colors duration-150"
                        >
                          Xem tất cả sản phẩm →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={muc.tenHienThi}
                  href={muc.duongDan}
                  className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950 rounded-lg hover:bg-neutral-50 transition-all duration-150"
                >
                  {muc.tenHienThi}
                </Link>
              )
            )}
          </nav>

          {/* Các nút phía phải */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Tìm kiếm */}
            <div className="relative flex items-center">
              {moTimKiem && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2">
                  <input
                    ref={refTimKiem}
                    type="text"
                    value={tuKhoa}
                    onChange={(e) => setTuKhoa(e.target.value)}
                    placeholder="Tìm kiếm kính mắt..."
                    className="w-64 sm:w-72 pl-4 pr-10 py-2 text-sm border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent bg-neutral-50"
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') { setMoTimKiem(false); setTuKhoa(''); }
                    }}
                  />
                  <button
                    onClick={() => { setMoTimKiem(false); setTuKhoa(''); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>
              )}
              <button
                onClick={() => setMoTimKiem(!moTimKiem)}
                className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all duration-200 cursor-pointer"
                aria-label="Tìm kiếm"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Giỏ hàng */}
            <Link
              href="/gio-hang"
              className="relative p-2 rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all duration-200"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart size={20} />
              {gioHang.tongSoLuong > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C9A84C] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                  {gioHang.tongSoLuong > 99 ? '99+' : gioHang.tongSoLuong}
                </span>
              )}
            </Link>

            {/* Đăng nhập */}
            <Link
              href="/dang-nhap"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-neutral-950 rounded-full hover:bg-neutral-700 transition-all duration-200"
            >
              <User size={15} />
              Đăng nhập
            </Link>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMoMenuMobile(!moMenuMobile)}
              className="lg:hidden p-2 rounded-full text-neutral-600 hover:bg-neutral-100 cursor-pointer"
              aria-label="Menu"
            >
              {moMenuMobile ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          moMenuMobile ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-main pb-6 pt-2 border-t border-neutral-100">
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Tìm kiếm kính mắt..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-neutral-50"
            />
          </div>
          <div className="space-y-1 mb-4">
            {menuDieuHuong.map((muc) => (
              <Link
                key={muc.tenHienThi}
                href={muc.duongDan}
                className="block px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-xl"
                onClick={() => setMoMenuMobile(false)}
              >
                {muc.tenHienThi}
              </Link>
            ))}
          </div>
          <div className="border-t border-neutral-100 pt-4">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-4 mb-2">
              Danh mục
            </p>
            <div className="grid grid-cols-2 gap-2">
              {danhMuc.map((dm) => (
                <Link
                  key={dm.duongDan}
                  href={dm.duongDan}
                  className="flex items-center gap-2 px-4 py-3 bg-neutral-50 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                  onClick={() => setMoMenuMobile(false)}
                >
                  <span>{dm.bieu}</span>
                  {dm.tenHienThi}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-4 pt-4 border-t border-neutral-100">
            <Link
              href="/dang-nhap"
              className="flex-1 text-center py-2.5 text-sm font-semibold border-2 border-neutral-900 text-neutral-900 rounded-full hover:bg-neutral-900 hover:text-white transition-all duration-200"
              onClick={() => setMoMenuMobile(false)}
            >
              Đăng nhập
            </Link>
            <Link
              href="/dang-ky"
              className="flex-1 text-center py-2.5 text-sm font-semibold bg-[#C9A84C] text-white rounded-full hover:bg-[#A8893A] transition-all duration-200"
              onClick={() => setMoMenuMobile(false)}
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
