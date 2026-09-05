'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, X, Save } from 'lucide-react';

const DANH_MUC = [
  { gia_tri: 'sunglasses', nhan: 'Kính Mát' },
  { gia_tri: 'eyeglasses', nhan: 'Kính Cận' },
  { gia_tri: 'fashion', nhan: 'Kính Thời Trang' },
  { gia_tri: 'sports', nhan: 'Kính Thể Thao' },
];
const DANG_GONG = ['round', 'square', 'cat-eye', 'aviator', 'rectangle', 'oval'];
const PHONG_CACH = ['vintage', 'casual', 'sport', 'luxury', 'minimalist'];
const CHAT_LIEU = ['Titanium', 'Acetate', 'TR90', 'Stainless Steel', 'Alloy', 'Carbon Fiber'];
const LOAI_TRONG = ['Phân cực UV400', 'Chống ánh sáng xanh', 'Đổi màu Photochromic', 'Tráng phủ AR', 'Cường lực', 'Thường'];
const GIOI_TINH = [{ gia_tri: 'men', nhan: 'Nam' }, { gia_tri: 'women', nhan: 'Nữ' }, { gia_tri: 'unisex', nhan: 'Unisex' }];

interface FormState {
  tenSanPham: string; thuongHieu: string; danhMuc: string;
  gia: string; giaGoc: string; moTa: string;
  dangGong: string; phongCach: string; chatLieu: string;
  loaiTrong: string; gioiTinh: string; tonKho: string; baoHanh: string;
  mauSac: string[]; isNew: boolean; isSale: boolean; isBestseller: boolean;
}

export default function TrangThemSuaSanPham() {
  const [form, setForm] = useState<FormState>({
    tenSanPham: '', thuongHieu: '', danhMuc: 'sunglasses',
    gia: '', giaGoc: '', moTa: '',
    dangGong: 'round', phongCach: 'casual', chatLieu: 'Acetate',
    loaiTrong: 'Phân cực UV400', gioiTinh: 'unisex',
    tonKho: '', baoHanh: '24', mauSac: [], isNew: false, isSale: false, isBestseller: false,
  });
  const [mauMoi, setMauMoi] = useState('');
  const [daLuu, setDaLuu] = useState(false);

  const capNhat = (truong: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [truong]: e.target.value }));
  };

  const themMau = () => {
    if (mauMoi.trim() && !form.mauSac.includes(mauMoi.trim())) {
      setForm((p) => ({ ...p, mauSac: [...p.mauSac, mauMoi.trim()] }));
      setMauMoi('');
    }
  };

  const xoaMau = (mau: string) => setForm((p) => ({ ...p, mauSac: p.mauSac.filter((m) => m !== mau) }));

  const xuLyLuu = (e: React.FormEvent) => {
    e.preventDefault();
    setDaLuu(true);
    setTimeout(() => setDaLuu(false), 3000);
  };

  const InputGroup = ({ nhan, children, bat_buoc }: { nhan: string; children: React.ReactNode; bat_buoc?: boolean }) => (
    <div>
      <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
        {nhan} {bat_buoc && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );

  const inputClass = "w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-white";

  return (
    <form onSubmit={xuLyLuu} className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/quan-tri/san-pham" className="p-2 rounded-xl hover:bg-neutral-100 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <h2 className="font-bold text-neutral-900">Thêm Sản Phẩm Mới</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Cột trái — Thông tin chính */}
        <div className="xl:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-neutral-800 text-sm uppercase tracking-wide">Thông Tin Cơ Bản</h3>
            <InputGroup nhan="Tên sản phẩm" bat_buoc>
              <input type="text" value={form.tenSanPham} onChange={capNhat('tenSanPham')} placeholder="VD: Kính mát Rayban Aviator Classic" className={inputClass} required />
            </InputGroup>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup nhan="Thương hiệu" bat_buoc>
                <input type="text" value={form.thuongHieu} onChange={capNhat('thuongHieu')} placeholder="VD: Rayban, Gucci..." className={inputClass} required />
              </InputGroup>
              <InputGroup nhan="Danh mục" bat_buoc>
                <select value={form.danhMuc} onChange={capNhat('danhMuc')} className={inputClass}>
                  {DANH_MUC.map((d) => <option key={d.gia_tri} value={d.gia_tri}>{d.nhan}</option>)}
                </select>
              </InputGroup>
            </div>
            <InputGroup nhan="Mô tả sản phẩm">
              <textarea value={form.moTa} onChange={capNhat('moTa')} placeholder="Mô tả chi tiết về sản phẩm..." rows={4} className={`${inputClass} resize-none`} />
            </InputGroup>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-neutral-800 text-sm uppercase tracking-wide">Giá & Kho</h3>
            <div className="grid grid-cols-3 gap-4">
              <InputGroup nhan="Giá bán (đ)" bat_buoc>
                <input type="number" value={form.gia} onChange={capNhat('gia')} placeholder="1500000" className={inputClass} required />
              </InputGroup>
              <InputGroup nhan="Giá gốc (đ)">
                <input type="number" value={form.giaGoc} onChange={capNhat('giaGoc')} placeholder="2000000" className={inputClass} />
              </InputGroup>
              <InputGroup nhan="Tồn kho" bat_buoc>
                <input type="number" value={form.tonKho} onChange={capNhat('tonKho')} placeholder="50" className={inputClass} required />
              </InputGroup>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-neutral-800 text-sm uppercase tracking-wide">Thông Số Kỹ Thuật</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup nhan="Dáng gọng">
                <select value={form.dangGong} onChange={capNhat('dangGong')} className={inputClass}>
                  {DANG_GONG.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </InputGroup>
              <InputGroup nhan="Phong cách">
                <select value={form.phongCach} onChange={capNhat('phongCach')} className={inputClass}>
                  {PHONG_CACH.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </InputGroup>
              <InputGroup nhan="Chất liệu gọng">
                <select value={form.chatLieu} onChange={capNhat('chatLieu')} className={inputClass}>
                  {CHAT_LIEU.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </InputGroup>
              <InputGroup nhan="Loại tròng">
                <select value={form.loaiTrong} onChange={capNhat('loaiTrong')} className={inputClass}>
                  {LOAI_TRONG.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </InputGroup>
              <InputGroup nhan="Giới tính">
                <select value={form.gioiTinh} onChange={capNhat('gioiTinh')} className={inputClass}>
                  {GIOI_TINH.map((g) => <option key={g.gia_tri} value={g.gia_tri}>{g.nhan}</option>)}
                </select>
              </InputGroup>
              <InputGroup nhan="Bảo hành (tháng)">
                <input type="number" value={form.baoHanh} onChange={capNhat('baoHanh')} className={inputClass} />
              </InputGroup>
            </div>
          </div>

          {/* Màu sắc */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-neutral-800 text-sm uppercase tracking-wide">Màu Sắc</h3>
            <div className="flex gap-2">
              <input
                type="text" value={mauMoi} onChange={(e) => setMauMoi(e.target.value)}
                placeholder="VD: Black, Gold, Silver..." className={`${inputClass} flex-1`}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); themMau(); } }}
              />
              <button type="button" onClick={themMau} className="px-4 py-2 bg-neutral-950 text-white rounded-xl text-sm font-semibold hover:bg-neutral-700 transition-colors cursor-pointer">
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.mauSac.map((mau) => (
                <span key={mau} className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 rounded-full text-sm font-medium text-neutral-700">
                  {mau}
                  <button type="button" onClick={() => xoaMau(mau)} className="text-neutral-400 hover:text-red-500 cursor-pointer"><X size={12} /></button>
                </span>
              ))}
              {form.mauSac.length === 0 && <p className="text-sm text-neutral-400">Chưa có màu nào. Thêm màu sắc cho sản phẩm.</p>}
            </div>
          </div>
        </div>

        {/* Cột phải — Tuỳ chọn */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-neutral-800 text-sm uppercase tracking-wide">Nhãn Hiển Thị</h3>
            {[
              { truong: 'isNew' as const, nhan: '🆕 Sản phẩm mới' },
              { truong: 'isBestseller' as const, nhan: '🔥 Bán chạy nhất' },
              { truong: 'isSale' as const, nhan: '💰 Đang sale' },
            ].map((opt) => (
              <label key={opt.truong} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox" checked={form[opt.truong] as boolean}
                  onChange={(e) => setForm((p) => ({ ...p, [opt.truong]: e.target.checked }))}
                  className="w-4 h-4 accent-[#C9A84C] cursor-pointer"
                />
                <span className="text-sm text-neutral-700 group-hover:text-neutral-900">{opt.nhan}</span>
              </label>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-sm text-amber-700">
            <p className="font-semibold mb-1">📷 Ảnh sản phẩm</p>
            <p className="text-xs">Tính năng upload ảnh sẽ được tích hợp khi kết nối với database ở giai đoạn sau.</p>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#C9A84C] hover:bg-[#A8893A] text-white font-bold rounded-xl transition-all duration-200 cursor-pointer shadow-[0_2px_10px_rgba(201,168,76,0.4)]"
          >
            {daLuu ? '✓ Đã lưu thành công!' : <><Save size={18} /> Lưu Sản Phẩm</>}
          </button>
          <Link href="/quan-tri/san-pham" className="block w-full text-center py-3 border-2 border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-50 transition-colors text-sm">
            Huỷ
          </Link>
        </div>
      </div>
    </form>
  );
}
