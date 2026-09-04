'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, ChevronDown, User, Eye } from 'lucide-react';

const categories = [
  { label: 'Kính Mát', href: '/products?category=sunglasses', emoji: '☀️' },
  { label: 'Kính Cận', href: '/products?category=eyeglasses', emoji: '👓' },
  { label: 'Kính Thời Trang', href: '/products?category=fashion', emoji: '✨' },
  { label: 'Kính Thể Thao', href: '/products?category=sports', emoji: '🏃' },
];

const navLinks = [
  { label: 'Sản Phẩm', href: '/products', hasDropdown: true },
  { label: 'Dịch Vụ', href: '/services', hasDropdown: false },
  { label: 'Bảo Hành', href: '/warranty', hasDropdown: false },
  { label: 'Về Chúng Tôi', href: '/about', hasDropdown: false },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen) searchRef.current?.focus();
  }, [isSearchOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100'
          : 'bg-white'
      }`}
    >
      {/* Announcement bar */}
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

      {/* Main header */}
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                  onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950 rounded-lg hover:bg-neutral-50 transition-all duration-150 cursor-pointer">
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                      isCategoryDropdownOpen
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2'
                    }`}
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 w-56">
                      {categories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 transition-colors duration-150 group/cat"
                        >
                          <span className="text-lg">{cat.emoji}</span>
                          <span className="font-medium group-hover/cat:translate-x-0.5 transition-transform duration-150">
                            {cat.label}
                          </span>
                        </Link>
                      ))}
                      <div className="border-t border-neutral-100 mt-2 pt-2">
                        <Link
                          href="/products"
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
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950 rounded-lg hover:bg-neutral-50 transition-all duration-150"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Search */}
            <div className="relative flex items-center">
              {isSearchOpen && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm kính mắt..."
                    className="w-64 sm:w-72 pl-4 pr-10 py-2 text-sm border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent bg-neutral-50"
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }
                    }}
                  />
                  <button
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>
              )}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all duration-200 cursor-pointer"
                aria-label="Tìm kiếm"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all duration-200"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-0.5 -right-0.5 bg-[#C9A84C] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                0
              </span>
            </Link>

            {/* Login */}
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-neutral-950 rounded-full hover:bg-neutral-700 transition-all duration-200"
            >
              <User size={15} />
              Đăng nhập
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-neutral-600 hover:bg-neutral-100 cursor-pointer"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-main pb-6 pt-2 border-t border-neutral-100">
          {/* Mobile search */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Tìm kiếm kính mắt..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-neutral-50"
            />
          </div>

          {/* Mobile nav links */}
          <div className="space-y-1 mb-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile categories */}
          <div className="border-t border-neutral-100 pt-4">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-4 mb-2">
              Danh mục
            </p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="flex items-center gap-2 px-4 py-3 bg-neutral-50 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile auth */}
          <div className="flex gap-3 mt-4 pt-4 border-t border-neutral-100">
            <Link
              href="/login"
              className="flex-1 text-center py-2.5 text-sm font-semibold border-2 border-neutral-900 text-neutral-900 rounded-full hover:bg-neutral-900 hover:text-white transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="flex-1 text-center py-2.5 text-sm font-semibold bg-[#C9A84C] text-white rounded-full hover:bg-[#A8893A] transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
