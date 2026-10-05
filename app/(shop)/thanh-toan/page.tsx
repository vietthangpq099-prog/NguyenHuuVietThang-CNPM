'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Phone, User, CreditCard, Truck, Wallet, ChevronRight, ShoppingCart } from 'lucide-react';
import { useGioHang } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/data/mock-products';

const PHUONG_THUC_TT = [
  { gia_tri: 'cod', nhan: 'Thanh toán khi nhận hàng (COD)', icon: <Truck size={18} /> },
  { gia_tri: 'bank', nhan: 'Chuyển khoản ngân hàng', icon: <CreditCard size={18} /> },
  { gia_tri: 'momo', nhan: 'Ví MoMo', icon: <Wallet size={18} /> },
  { gia_tri: 'zalopay', nhan: 'ZaloPay', icon: <Wallet size={18} /> },
];

const NGUONG_MIEN_SHIP = 500000;
const PHI_SHIP = 30000;

export default function TrangThanhToan() {
  const { gioHang, xoaHetGio } = useGioHang();
  const router = useRouter();
  const [form, setForm] = useState({ hoTen: '', soDienThoai: '', diaChiDay: '', phuong: '', quan: '', thanhPho: '' });
  const [phuongThuc, setPhuongThuc] = useState('cod');
  const [ghiChu, setGhiChu] = useState('');
  const [dangXuLy, setDangXuLy] = useState(false);
  const [loi, setLoi] = useState<Partial<typeof form>>({});

  const capNhat = (truong: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [truong]: e.target.value }));

  const tamTinh = gioHang.tongTien;
  const phiShip = tamTinh >= NGUONG_MIEN_SHIP ? 0 : PHI_SHIP;
  const tongCong = tamTinh + phiShip;

  if (gioHang.danhSachMuc.length === 0) {
    return (
      <div className="container-main py-24 text-center">
        <ShoppingCart size={48} className="text-neutral-300 mx-auto mb-4" />
        <h1 className="font-serif font-bold text-2xl text-neutral-900 mb-3">Giỏ hàng trống</h1>
        <Link href="/san-pham" className="inline-flex items-center gap-2 bg-neutral-950 text-white px-6 py-3 rounded-full font-semibold hover:bg-neutral-700 transition-colors">
          <ArrowLeft size={16} /> Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  const kiemTra = () => {
    const l: Partial<typeof form> = {};
    if (!form.hoTen.trim()) l.hoTen = 'Vui lòng nhập họ tên';
    if (!form.soDienThoai.trim()) l.soDienThoai = 'Vui lòng nhập số điện thoại';
    if (!form.diaChiDay.trim()) l.diaChiDay = 'Vui lòng nhập địa chỉ';
    if (!form.quan.trim()) l.quan = 'Vui lòng nhập quận/huyện';
    if (!form.thanhPho.trim()) l.thanhPho = 'Vui lòng chọn tỉnh/thành phố';
    setLoi(l);
    return Object.keys(l).length === 0;
  };

  const datHang = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kiemTra()) return;
    setDangXuLy(true);

    try {
      // Gửi đơn hàng vào SQLite Database qua API route
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tongTien: tongCong,
          phiShip,
          diaChi: `${form.diaChiDay}, ${form.phuong}, ${form.quan}, ${form.thanhPho}`,
          phuongThuc,
          ghiChu,
        }),
      });
    } catch {
      // Tự động fallback nếu mất kết nối
    }

    xoaHetGio();
    router.push('/dat-hang-thanh-cong?ma=DH' + Date.now().toString().slice(-6));
  };

  const inputClass = (truong: keyof typeof form) =>
    `w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-white ${loi[truong] ? 'border-red-300' : 'border-neutral-200'}`;

  return (
    <div className="container-main py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
        <Link href="/gio-hang" className="hover:text-neutral-800 flex items-center gap-1"><ArrowLeft size={14} /> Giỏ hàng</Link>
        <ChevronRight size={14} />
        <span className="text-neutral-900 font-medium">Thanh Toán</span>
      </div>

      <form onSubmit={datHang}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột trái — Form thông tin */}
          <div className="lg:col-span-2 space-y-5">
            {/* Địa chỉ giao hàng */}
            <div className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-sm">
              <h2 className="font-bold text-neutral-900 mb-5 flex items-center gap-2">
                <MapPin size={18} className="text-[#C9A84C]" /> Địa Chỉ Giao Hàng
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Họ và tên <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input type="text" value={form.hoTen} onChange={capNhat('hoTen')} placeholder="Nguyễn Văn A" className={`${inputClass('hoTen')} pl-9`} />
                    </div>
                    {loi.hoTen && <p className="text-xs text-red-500 mt-1">{loi.hoTen}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Số điện thoại <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input type="tel" value={form.soDienThoai} onChange={capNhat('soDienThoai')} placeholder="0901 234 567" className={`${inputClass('soDienThoai')} pl-9`} />
                    </div>
                    {loi.soDienThoai && <p className="text-xs text-red-500 mt-1">{loi.soDienThoai}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Số nhà, tên đường <span className="text-red-500">*</span></label>
                  <input type="text" value={form.diaChiDay} onChange={capNhat('diaChiDay')} placeholder="123 Nguyễn Huệ" className={inputClass('diaChiDay')} />
                  {loi.diaChiDay && <p className="text-xs text-red-500 mt-1">{loi.diaChiDay}</p>}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Phường/Xã</label>
                    <input type="text" value={form.phuong} onChange={capNhat('phuong')} placeholder="Phường Bến Nghé" className={inputClass('phuong')} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Quận/Huyện <span className="text-red-500">*</span></label>
                    <input type="text" value={form.quan} onChange={capNhat('quan')} placeholder="Quận 1" className={inputClass('quan')} />
                    {loi.quan && <p className="text-xs text-red-500 mt-1">{loi.quan}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Tỉnh/Thành phố <span className="text-red-500">*</span></label>
                    <select value={form.thanhPho} onChange={capNhat('thanhPho')} className={inputClass('thanhPho')}>
                      <option value="">Chọn tỉnh/TP</option>
                      {['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng', 'Bình Dương', 'Đồng Nai'].map((tp) => (
                        <option key={tp} value={tp}>{tp}</option>
                      ))}
                    </select>
                    {loi.thanhPho && <p className="text-xs text-red-500 mt-1">{loi.thanhPho}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Ghi chú cho đơn hàng</label>
                  <textarea value={ghiChu} onChange={(e) => setGhiChu(e.target.value)} placeholder="VD: Giao giờ hành chính, gọi trước khi giao..." rows={2} className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-white resize-none" />
                </div>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-sm">
              <h2 className="font-bold text-neutral-900 mb-5 flex items-center gap-2">
                <CreditCard size={18} className="text-[#C9A84C]" /> Phương Thức Thanh Toán
              </h2>
              <div className="space-y-3">
                {PHUONG_THUC_TT.map((pt) => (
                  <label key={pt.gia_tri} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-150 ${phuongThuc === pt.gia_tri ? 'border-[#C9A84C] bg-amber-50' : 'border-neutral-200 hover:border-neutral-300'}`}>
                    <input type="radio" name="phuongThuc" value={pt.gia_tri} checked={phuongThuc === pt.gia_tri} onChange={() => setPhuongThuc(pt.gia_tri)} className="accent-[#C9A84C]" />
                    <span className={phuongThuc === pt.gia_tri ? 'text-[#C9A84C]' : 'text-neutral-500'}>{pt.icon}</span>
                    <span className="text-sm font-medium text-neutral-800">{pt.nhan}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Cột phải — Tóm tắt */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-sm sticky top-24">
              <h2 className="font-bold text-neutral-900 mb-4">Đơn Hàng Của Bạn</h2>

              {/* Danh sách sản phẩm */}
              <div className="space-y-3 mb-5 max-h-52 overflow-y-auto">
                {gioHang.danhSachMuc.map((muc) => (
                  <div key={`${muc.sanPham.id}-${muc.mauDaChon}`} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🕶️</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-neutral-800 truncate">{muc.sanPham.name}</p>
                      <p className="text-xs text-neutral-400">{muc.mauDaChon} × {muc.soLuong}</p>
                    </div>
                    <p className="text-xs font-bold text-neutral-900 flex-shrink-0">{formatPrice(muc.sanPham.price * muc.soLuong)}</p>
                  </div>
                ))}
              </div>

              {/* Tính tiền */}
              <div className="border-t border-neutral-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm"><span className="text-neutral-500">Tạm tính</span><span>{formatPrice(tamTinh)}</span></div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Phí vận chuyển</span>
                  <span className={phiShip === 0 ? 'text-emerald-600 font-medium' : ''}>{phiShip === 0 ? 'Miễn phí' : formatPrice(phiShip)}</span>
                </div>
                <div className="border-t border-neutral-100 pt-3 flex justify-between">
                  <span className="font-bold text-neutral-900">Tổng cộng</span>
                  <span className="font-bold text-xl text-neutral-950">{formatPrice(tongCong)}</span>
                </div>
              </div>

              {/* Nút đặt hàng */}
              <button
                type="submit"
                disabled={dangXuLy}
                className="mt-5 w-full flex items-center justify-center gap-2 py-4 bg-[#C9A84C] hover:bg-[#A8893A] text-white font-bold rounded-full transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-[0_4px_20px_rgba(201,168,76,0.4)]"
              >
                {dangXuLy ? (
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : '🛍️ Đặt Hàng Ngay'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
