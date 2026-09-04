'use client';

import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductCategory, FrameShape, FrameStyle, Gender } from '@/types';

export interface BoDanhMucProps {
  danhMucDaChon: ProductCategory | '';
  dangGongDaChon: FrameShape | '';
  phongCachDaChon: FrameStyle | '';
  gioiTinhDaChon: Gender | '';
  giaMin: number;
  giaMax: number;
  onThayDoiDanhMuc: (v: ProductCategory | '') => void;
  onThayDoiDangGong: (v: FrameShape | '') => void;
  onThayDoiPhongCach: (v: FrameStyle | '') => void;
  onThayDoiGioiTinh: (v: Gender | '') => void;
  onThayDoiGiaMin: (v: number) => void;
  onThayDoiGiaMax: (v: number) => void;
  onXoaBoLoc: () => void;
}

const danhMucOptions = [
  { gia_tri: 'sunglasses' as ProductCategory, nhan: 'Kính Mát', bieu: '☀️' },
  { gia_tri: 'eyeglasses' as ProductCategory, nhan: 'Kính Cận', bieu: '👓' },
  { gia_tri: 'fashion' as ProductCategory, nhan: 'Kính Thời Trang', bieu: '✨' },
  { gia_tri: 'sports' as ProductCategory, nhan: 'Kính Thể Thao', bieu: '🏃' },
];

const dangGongOptions = [
  { gia_tri: 'round' as FrameShape, nhan: 'Tròn' },
  { gia_tri: 'square' as FrameShape, nhan: 'Vuông' },
  { gia_tri: 'cat-eye' as FrameShape, nhan: 'Mắt Mèo' },
  { gia_tri: 'aviator' as FrameShape, nhan: 'Aviator' },
  { gia_tri: 'rectangle' as FrameShape, nhan: 'Chữ Nhật' },
  { gia_tri: 'oval' as FrameShape, nhan: 'Oval' },
];

const phongCachOptions = [
  { gia_tri: 'vintage' as FrameStyle, nhan: 'Vintage' },
  { gia_tri: 'casual' as FrameStyle, nhan: 'Thông Thường' },
  { gia_tri: 'sport' as FrameStyle, nhan: 'Thể Thao' },
  { gia_tri: 'luxury' as FrameStyle, nhan: 'Sang Trọng' },
  { gia_tri: 'minimalist' as FrameStyle, nhan: 'Tối Giản' },
];

const gioiTinhOptions = [
  { gia_tri: 'men' as Gender, nhan: 'Nam' },
  { gia_tri: 'women' as Gender, nhan: 'Nữ' },
  { gia_tri: 'unisex' as Gender, nhan: 'Unisex' },
];

function NhomBoLoc({ tieu_de, children }: { tieu_de: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-neutral-100 pb-5 mb-5">
      <h3 className="font-semibold text-sm text-neutral-800 mb-3">{tieu_de}</h3>
      {children}
    </div>
  );
}

export default function BoDanhmuc({
  danhMucDaChon, dangGongDaChon, phongCachDaChon, gioiTinhDaChon,
  giaMin, giaMax,
  onThayDoiDanhMuc, onThayDoiDangGong, onThayDoiPhongCach, onThayDoiGioiTinh,
  onThayDoiGiaMin, onThayDoiGiaMax, onXoaBoLoc,
}: BoDanhMucProps) {
  const coBoLoc = danhMucDaChon || dangGongDaChon || phongCachDaChon || gioiTinhDaChon;

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
      {/* Tiêu đề sidebar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-neutral-700" />
          <span className="font-bold text-neutral-900">Bộ Lọc</span>
        </div>
        {coBoLoc && (
          <button
            onClick={onXoaBoLoc}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
          >
            <X size={12} />
            Xoá hết
          </button>
        )}
      </div>

      {/* Lọc theo danh mục */}
      <NhomBoLoc tieu_de="Danh Mục">
        <div className="space-y-2">
          {danhMucOptions.map((opt) => (
            <button
              key={opt.gia_tri}
              onClick={() => onThayDoiDanhMuc(danhMucDaChon === opt.gia_tri ? '' : opt.gia_tri)}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-150 cursor-pointer text-left',
                danhMucDaChon === opt.gia_tri
                  ? 'bg-neutral-950 text-white font-semibold'
                  : 'hover:bg-neutral-50 text-neutral-700'
              )}
            >
              <span>{opt.bieu}</span>
              {opt.nhan}
            </button>
          ))}
        </div>
      </NhomBoLoc>

      {/* Lọc theo dáng gọng */}
      <NhomBoLoc tieu_de="Dáng Gọng">
        <div className="flex flex-wrap gap-2">
          {dangGongOptions.map((opt) => (
            <button
              key={opt.gia_tri}
              onClick={() => onThayDoiDangGong(dangGongDaChon === opt.gia_tri ? '' : opt.gia_tri)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer border',
                dangGongDaChon === opt.gia_tri
                  ? 'bg-[#C9A84C] text-white border-[#C9A84C]'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
              )}
            >
              {opt.nhan}
            </button>
          ))}
        </div>
      </NhomBoLoc>

      {/* Lọc theo phong cách */}
      <NhomBoLoc tieu_de="Phong Cách">
        <div className="flex flex-wrap gap-2">
          {phongCachOptions.map((opt) => (
            <button
              key={opt.gia_tri}
              onClick={() => onThayDoiPhongCach(phongCachDaChon === opt.gia_tri ? '' : opt.gia_tri)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer border',
                phongCachDaChon === opt.gia_tri
                  ? 'bg-[#C9A84C] text-white border-[#C9A84C]'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
              )}
            >
              {opt.nhan}
            </button>
          ))}
        </div>
      </NhomBoLoc>

      {/* Lọc theo giới tính */}
      <NhomBoLoc tieu_de="Giới Tính">
        <div className="flex gap-2">
          {gioiTinhOptions.map((opt) => (
            <button
              key={opt.gia_tri}
              onClick={() => onThayDoiGioiTinh(gioiTinhDaChon === opt.gia_tri ? '' : opt.gia_tri)}
              className={cn(
                'flex-1 py-2 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer border',
                gioiTinhDaChon === opt.gia_tri
                  ? 'bg-neutral-950 text-white border-neutral-950'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
              )}
            >
              {opt.nhan}
            </button>
          ))}
        </div>
      </NhomBoLoc>

      {/* Lọc theo khoảng giá */}
      <div>
        <h3 className="font-semibold text-sm text-neutral-800 mb-3">Khoảng Giá</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-neutral-500 mb-1 block">Từ: {new Intl.NumberFormat('vi-VN').format(giaMin)}đ</label>
            <input
              type="range"
              min={0}
              max={5000000}
              step={100000}
              value={giaMin}
              onChange={(e) => onThayDoiGiaMin(Number(e.target.value))}
              className="w-full accent-[#C9A84C]"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-500 mb-1 block">Đến: {new Intl.NumberFormat('vi-VN').format(giaMax)}đ</label>
            <input
              type="range"
              min={0}
              max={5000000}
              step={100000}
              value={giaMax}
              onChange={(e) => onThayDoiGiaMax(Number(e.target.value))}
              className="w-full accent-[#C9A84C]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
