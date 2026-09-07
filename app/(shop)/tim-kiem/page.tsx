'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ArrowLeft, SlidersHorizontal, X } from 'lucide-react';
import { mockProducts } from '@/lib/data/mock-products';
import ProductCard from '@/components/product/ProductCard';

function KetQuaTimKiem() {
  const searchParams = useSearchParams();
  const tuKhoa = searchParams.get('q') || '';
  const [tuKhoaInput, setTuKhoaInput] = useState(tuKhoa);

  const ketQua = useMemo(() => {
    if (!tuKhoa.trim()) return mockProducts.slice(0, 8);
    const lower = tuKhoa.toLowerCase();
    return mockProducts.filter((p) =>
      p.name.toLowerCase().includes(lower) ||
      p.brand.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.tags.some((t) => t.toLowerCase().includes(lower)) ||
      p.frameMaterial.toLowerCase().includes(lower)
    );
  }, [tuKhoa]);

  return (
    <div className="container-main py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/" className="p-2 rounded-xl hover:bg-neutral-100 transition-colors text-neutral-500">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-bold text-2xl text-neutral-950">Tìm Kiếm Sản Phẩm</h1>
          {tuKhoa && (
            <p className="text-sm text-neutral-500 mt-0.5">
              {ketQua.length} kết quả cho &quot;<span className="text-[#C9A84C] font-semibold">{tuKhoa}</span>&quot;
            </p>
          )}
        </div>
      </div>

      {/* Search box */}
      <form action="/tim-kiem" method="get" className="mb-10">
        <div className="relative max-w-2xl">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            name="q"
            type="text"
            value={tuKhoaInput}
            onChange={(e) => setTuKhoaInput(e.target.value)}
            placeholder="Tìm tên kính, thương hiệu, loại gọng..."
            className="w-full pl-12 pr-28 py-4 border-2 border-neutral-200 rounded-2xl focus:border-[#C9A84C] focus:outline-none text-neutral-900 bg-white text-sm shadow-sm"
            autoFocus
          />
          {tuKhoaInput && (
            <button
              type="button"
              onClick={() => setTuKhoaInput('')}
              className="absolute right-20 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-neutral-950 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#C9A84C] transition-colors cursor-pointer"
          >
            Tìm
          </button>
        </div>
      </form>

      {/* Gợi ý từ khoá */}
      {!tuKhoa && (
        <div className="mb-8">
          <p className="text-sm font-semibold text-neutral-500 mb-3">Gợi ý tìm kiếm phổ biến:</p>
          <div className="flex flex-wrap gap-2">
            {['Kính mát', 'Kính cận', 'Aviator', 'Round', 'Titanium', 'Polarized', 'Thể thao', 'Vintage'].map((goi) => (
              <Link
                key={goi}
                href={`/tim-kiem?q=${encodeURIComponent(goi)}`}
                className="px-4 py-2 bg-neutral-100 hover:bg-[#C9A84C] hover:text-white text-neutral-700 rounded-full text-sm font-medium transition-colors"
              >
                {goi}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Kết quả */}
      {tuKhoa && ketQua.length === 0 ? (
        <div className="text-center py-24">
          <Search size={56} className="text-neutral-200 mx-auto mb-4" />
          <h2 className="font-bold text-xl text-neutral-700 mb-2">Không tìm thấy kết quả</h2>
          <p className="text-neutral-400 text-sm mb-8">
            Thử từ khoá khác hoặc xem toàn bộ sản phẩm của chúng tôi
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {['Kính mát', 'Kính cận', 'Thể thao'].map((goi) => (
              <Link
                key={goi}
                href={`/tim-kiem?q=${encodeURIComponent(goi)}`}
                className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full text-sm font-medium transition-colors"
              >
                {goi}
              </Link>
            ))}
            <Link href="/san-pham" className="px-5 py-2.5 bg-neutral-950 text-white rounded-full text-sm font-semibold hover:bg-neutral-700 transition-colors">
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      ) : (
        <>
          {tuKhoa && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-neutral-500">
                Hiển thị <strong className="text-neutral-900">{ketQua.length}</strong> sản phẩm
              </p>
              <Link href="/san-pham" className="text-sm text-[#C9A84C] hover:underline font-medium flex items-center gap-1">
                <SlidersHorizontal size={14} /> Xem với bộ lọc nâng cao
              </Link>
            </div>
          )}
          {!tuKhoa && (
            <div className="mb-6">
              <h2 className="font-bold text-lg text-neutral-900 mb-1">Sản phẩm nổi bật</h2>
              <p className="text-sm text-neutral-500">Nhập từ khoá để tìm kiếm sản phẩm phù hợp</p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ketQua.map((sp) => (
              <ProductCard key={sp.id} product={sp} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function TrangTimKiem() {
  return (
    <Suspense fallback={
      <div className="container-main py-24 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#C9A84C] border-t-transparent rounded-full mx-auto" />
      </div>
    }>
      <KetQuaTimKiem />
    </Suspense>
  );
}
