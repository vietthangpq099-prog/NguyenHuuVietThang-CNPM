'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryAnhProps {
  anhDanhSach: string[];
  tenSanPham: string;
}

export default function GalleryAnh({ anhDanhSach, tenSanPham }: GalleryAnhProps) {
  const [viTriHienTai, setViTriHienTai] = useState(0);
  const [moPhongTo, setMoPhongTo] = useState(false);

  const anhHienThi = anhDanhSach.length > 0 ? anhDanhSach : ['/placeholder.jpg'];

  const anhTruoc = () => setViTriHienTai((v) => (v - 1 + anhHienThi.length) % anhHienThi.length);
  const anhSau = () => setViTriHienTai((v) => (v + 1) % anhHienThi.length);

  return (
    <>
      <div className="space-y-3">
        {/* Ảnh chính */}
        <div className="relative aspect-square bg-neutral-100 rounded-3xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
            <span className="text-[120px] opacity-15 select-none">🕶️</span>
          </div>

          {/* Nút phóng to */}
          <button
            onClick={() => setMoPhongTo(true)}
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-sm"
            aria-label="Phóng to ảnh"
          >
            <ZoomIn size={18} className="text-neutral-700" />
          </button>

          {/* Nút điều hướng */}
          {anhHienThi.length > 1 && (
            <>
              <button
                onClick={anhTruoc}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={anhSau}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Số thứ tự ảnh */}
          {anhHienThi.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1 rounded-full">
              {viTriHienTai + 1} / {anhHienThi.length}
            </div>
          )}
        </div>

        {/* Danh sách thumbnail */}
        {anhHienThi.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {anhHienThi.map((_, i) => (
              <button
                key={i}
                onClick={() => setViTriHienTai(i)}
                className={cn(
                  'flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 border-2 transition-all duration-150 cursor-pointer',
                  i === viTriHienTai ? 'border-[#C9A84C]' : 'border-transparent hover:border-neutral-300'
                )}
              >
                <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                  <span className="text-2xl opacity-30 select-none">🕶️</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal phóng to */}
      {moPhongTo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setMoPhongTo(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white cursor-pointer"
            onClick={() => setMoPhongTo(false)}
          >
            <span className="text-2xl">✕</span>
          </button>
          <div className="max-w-2xl w-full aspect-square bg-neutral-200 rounded-3xl flex items-center justify-center">
            <span className="text-[150px] opacity-20 select-none">🕶️</span>
          </div>
          <p className="absolute bottom-6 text-white/50 text-sm">{tenSanPham}</p>
        </div>
      )}
    </>
  );
}
