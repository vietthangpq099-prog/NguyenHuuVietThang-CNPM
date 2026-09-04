'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type KieuSapXep = 'moi-nhat' | 'gia-tang' | 'gia-giam' | 'danh-gia';

interface ThanhSapXepProps {
  tongKetQua: number;
  kieuSapXep: KieuSapXep;
  onThayDoiSapXep: (kieu: KieuSapXep) => void;
  dangHienThi: 'luoi' | 'danh-sach';
  onThayDoiHienThi: (kieu: 'luoi' | 'danh-sach') => void;
}

const tuySapXep: { gia_tri: KieuSapXep; nhan: string }[] = [
  { gia_tri: 'moi-nhat', nhan: 'Mới nhất' },
  { gia_tri: 'gia-tang', nhan: 'Giá tăng dần' },
  { gia_tri: 'gia-giam', nhan: 'Giá giảm dần' },
  { gia_tri: 'danh-gia', nhan: 'Đánh giá cao' },
];

export default function ThanhSapXep({
  tongKetQua, kieuSapXep, onThayDoiSapXep, dangHienThi, onThayDoiHienThi,
}: ThanhSapXepProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-100">
      <p className="text-sm text-neutral-500">
        Tìm thấy <span className="font-bold text-neutral-900">{tongKetQua}</span> sản phẩm
      </p>

      <div className="flex items-center gap-3">
        {/* Dropdown sắp xếp */}
        <div className="relative">
          <select
            value={kieuSapXep}
            onChange={(e) => onThayDoiSapXep(e.target.value as KieuSapXep)}
            className="appearance-none pl-4 pr-9 py-2 text-sm border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-white cursor-pointer font-medium text-neutral-700"
          >
            {tuySapXep.map((opt) => (
              <option key={opt.gia_tri} value={opt.gia_tri}>{opt.nhan}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
        </div>

        {/* Nút chuyển kiểu hiển thị */}
        <div className="flex border border-neutral-200 rounded-xl overflow-hidden">
          <button
            onClick={() => onThayDoiHienThi('luoi')}
            className={cn(
              'px-3 py-2 transition-colors cursor-pointer',
              dangHienThi === 'luoi' ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-500 hover:bg-neutral-50'
            )}
            aria-label="Hiển thị dạng lưới"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="0" width="7" height="7" rx="1"/>
              <rect x="9" y="0" width="7" height="7" rx="1"/>
              <rect x="0" y="9" width="7" height="7" rx="1"/>
              <rect x="9" y="9" width="7" height="7" rx="1"/>
            </svg>
          </button>
          <button
            onClick={() => onThayDoiHienThi('danh-sach')}
            className={cn(
              'px-3 py-2 transition-colors cursor-pointer',
              dangHienThi === 'danh-sach' ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-500 hover:bg-neutral-50'
            )}
            aria-label="Hiển thị dạng danh sách"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="0" width="16" height="4" rx="1"/>
              <rect x="0" y="6" width="16" height="4" rx="1"/>
              <rect x="0" y="12" width="16" height="4" rx="1"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
