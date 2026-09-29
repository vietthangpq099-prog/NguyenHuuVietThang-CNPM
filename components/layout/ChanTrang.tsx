import React from 'react';
import Link from 'next/link';
import { Eye, MapPin, Phone, Mail, Clock } from 'lucide-react';

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

const footerLinks = {
  products: [
    { label: 'Kính Mát',       href: '/san-pham?danh-muc=sunglasses' },
    { label: 'Kính Cận',       href: '/san-pham?danh-muc=eyeglasses' },
    { label: 'Kính Thời Trang', href: '/san-pham?danh-muc=fashion' },
    { label: 'Kính Thể Thao',  href: '/san-pham?danh-muc=sports' },
    { label: 'Sản Phẩm Mới',   href: '/san-pham' },
  ],
  services: [
    { label: 'Dịch Vụ Bảo Hành',   href: '/bao-hanh' },
    { label: 'Vệ Sinh Kính Miễn Phí', href: '/bao-hanh' },
    { label: 'Nắn Chỉnh Gọng',     href: '/bao-hanh' },
    { label: 'Đổi Trả 7 Ngày',     href: '/bao-hanh' },
    { label: 'Giao Hàng Toàn Quốc', href: '/san-pham' },
  ],
  company: [
    { label: 'Về Chúng Tôi',      href: '/gioi-thieu' },
    { label: 'Hệ Thống Cửa Hàng', href: '/gioi-thieu' },
    { label: 'Đơn Hàng Của Tôi',  href: '/don-hang' },
    { label: 'Đăng Nhập',         href: '/dang-nhap' },
    { label: 'Đăng Ký Tài Khoản', href: '/dang-ky' },
  ],
};

export default function ChanTrang() {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      {/* Main content */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 bg-[#C9A84C] rounded-xl flex items-center justify-center">
                <Eye size={20} className="text-white" />
              </div>
              <div className="leading-none">
                <span className="font-serif font-bold text-xl text-white block">Optic</span>
                <span className="text-xs text-[#C9A84C] font-semibold tracking-[0.2em] uppercase">Shop</span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-neutral-400 mb-6">
              Chuyên cung cấp kính mắt cao cấp chính hãng với đội ngũ chuyên gia đo thị lực giàu kinh
              nghiệm. Cam kết mang đến sự hoàn hảo cho đôi mắt của bạn.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <span>123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-[#C9A84C] flex-shrink-0" />
                <a href="tel:1800888999" className="hover:text-white transition-colors">1800-888-999</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-[#C9A84C] flex-shrink-0" />
                <a href="mailto:hello@opticshop.vn" className="hover:text-white transition-colors">
                  hello@opticshop.vn
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock size={16} className="text-[#C9A84C] flex-shrink-0" />
                <span>8:00 - 21:00 (Thứ 2 - Chủ nhật)</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-6">
              Sản Phẩm
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-[#C9A84C] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-6">
              Dịch Vụ
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-[#C9A84C] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-6">
              Công Ty
            </h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-[#C9A84C] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Warranty highlight */}
            <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800">
              <div className="text-2xl mb-2">🛡️</div>
              <p className="text-sm font-semibold text-white mb-1">Bảo Hành 24 Tháng</p>
              <p className="text-xs text-neutral-400">
                Cam kết bảo hành chính hãng cho tất cả sản phẩm
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="container-main py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500">© 2024 OpticShop. Tất cả quyền được bảo lưu.</p>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-neutral-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Facebook"
            >
              <FacebookIcon size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-neutral-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Instagram"
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-neutral-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Youtube"
            >
              <YoutubeIcon size={16} />
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">
              Chính Sách Bảo Mật
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">
              Điều Khoản Sử Dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
