'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { mockProducts } from '@/lib/data/mock-products';
import { ProductCategory, FrameShape, FrameStyle, Gender } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import BoDanhmuc from '@/components/san-pham/BoDanhmuc';
import ThanhSapXep from '@/components/san-pham/ThanhSapXep';

type KieuSapXep = 'moi-nhat' | 'gia-tang' | 'gia-giam' | 'danh-gia';
type KieuHienThi = 'luoi' | 'danh-sach';

export default function TrangSanPham() {
  const [danhMuc, setDanhMuc] = useState<ProductCategory | ''>('');
  const [dangGong, setDangGong] = useState<FrameShape | ''>('');
  const [phongCach, setPhongCach] = useState<FrameStyle | ''>('');
  const [gioiTinh, setGioiTinh] = useState<Gender | ''>('');
  const [giaMin, setGiaMin] = useState(0);
  const [giaMax, setGiaMax] = useState(5000000);
  const [sapXep, setSapXep] = useState<KieuSapXep>('moi-nhat');
  const [hienThi, setHienThi] = useState<KieuHienThi>('luoi');
  const [moBoLocMobile, setMoBoLocMobile] = useState(false);

  const xoaBoLoc = useCallback(() => {
    setDanhMuc(''); setDangGong(''); setPhongCach('');
    setGioiTinh(''); setGiaMin(0); setGiaMax(5000000);
  }, []);

  const danhSachLocVaSapXep = useMemo(() => {
    let ds = mockProducts.filter((sp) => {
      if (danhMuc && sp.category !== danhMuc) return false;
      if (dangGong && sp.frameShape !== dangGong) return false;
      if (phongCach && sp.frameStyle !== phongCach) return false;
      if (gioiTinh && sp.gender !== gioiTinh) return false;
      if (sp.price < giaMin || sp.price > giaMax) return false;
      return true;
    });

    switch (sapXep) {
      case 'gia-tang': ds = [...ds].sort((a, b) => a.price - b.price); break;
      case 'gia-giam': ds = [...ds].sort((a, b) => b.price - a.price); break;
      case 'danh-gia': ds = [...ds].sort((a, b) => b.rating - a.rating); break;
      default: ds = [...ds].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    return ds;
  }, [danhMuc, dangGong, phongCach, gioiTinh, giaMin, giaMax, sapXep]);

  const coBoLoc = danhMuc || dangGong || phongCach || gioiTinh;

  return (
    <div className="container-main py-10">
      {/* Tiêu đề trang */}
      <div className="mb-8">
        <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-2">Danh Mục</p>
        <h1 className="heading-display text-4xl text-neutral-950">Tất Cả Sản Phẩm</h1>
      </div>

      <div className="flex gap-8">
        {/* Sidebar bộ lọc — Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <BoDanhmuc
              danhMucDaChon={danhMuc}
              dangGongDaChon={dangGong}
              phongCachDaChon={phongCach}
              gioiTinhDaChon={gioiTinh}
              giaMin={giaMin}
              giaMax={giaMax}
              onThayDoiDanhMuc={setDanhMuc}
              onThayDoiDangGong={setDangGong}
              onThayDoiPhongCach={setPhongCach}
              onThayDoiGioiTinh={setGioiTinh}
              onThayDoiGiaMin={setGiaMin}
              onThayDoiGiaMax={setGiaMax}
              onXoaBoLoc={xoaBoLoc}
            />
          </div>
        </aside>

        {/* Khu vực sản phẩm */}
        <div className="flex-1 min-w-0">
          {/* Thanh công cụ mobile */}
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <button
              onClick={() => setMoBoLocMobile(true)}
              className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-full text-sm font-medium text-neutral-700 hover:bg-neutral-50 cursor-pointer"
            >
              <SlidersHorizontal size={16} />
              Bộ lọc
              {coBoLoc && (
                <span className="bg-[#C9A84C] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">!</span>
              )}
            </button>
            {coBoLoc && (
              <button onClick={xoaBoLoc} className="flex items-center gap-1 text-sm text-red-500 cursor-pointer">
                <X size={14} /> Xoá lọc
              </button>
            )}
          </div>

          {/* Thanh sắp xếp */}
          <ThanhSapXep
            tongKetQua={danhSachLocVaSapXep.length}
            kieuSapXep={sapXep}
            onThayDoiSapXep={setSapXep}
            dangHienThi={hienThi}
            onThayDoiHienThi={setHienThi}
          />

          {/* Lưới sản phẩm */}
          {danhSachLocVaSapXep.length > 0 ? (
            <div
              className={
                hienThi === 'luoi'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'flex flex-col gap-4'
              }
            >
              {danhSachLocVaSapXep.map((sp) => (
                <ProductCard key={sp.id} product={sp} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-serif text-xl font-bold text-neutral-800 mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-neutral-500 text-sm mb-6">Thử thay đổi bộ lọc để xem thêm sản phẩm.</p>
              <button
                onClick={xoaBoLoc}
                className="px-6 py-2.5 bg-neutral-950 text-white text-sm font-semibold rounded-full hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                Xoá bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal bộ lọc mobile */}
      {moBoLocMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMoBoLocMobile(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-5">
              <span className="font-bold text-lg">Bộ Lọc</span>
              <button onClick={() => setMoBoLocMobile(false)} className="p-2 rounded-full hover:bg-neutral-100 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <BoDanhmuc
              danhMucDaChon={danhMuc}
              dangGongDaChon={dangGong}
              phongCachDaChon={phongCach}
              gioiTinhDaChon={gioiTinh}
              giaMin={giaMin}
              giaMax={giaMax}
              onThayDoiDanhMuc={setDanhMuc}
              onThayDoiDangGong={setDangGong}
              onThayDoiPhongCach={setPhongCach}
              onThayDoiGioiTinh={setGioiTinh}
              onThayDoiGiaMin={setGiaMin}
              onThayDoiGiaMax={setGiaMax}
              onXoaBoLoc={xoaBoLoc}
            />
            <button
              onClick={() => setMoBoLocMobile(false)}
              className="w-full mt-4 py-3 bg-neutral-950 text-white font-semibold rounded-full hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              Xem {danhSachLocVaSapXep.length} sản phẩm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
