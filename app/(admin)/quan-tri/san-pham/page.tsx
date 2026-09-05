'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { mockProducts, formatPrice } from '@/lib/data/mock-products';
import { Product } from '@/types';

export default function TrangQuanLySanPham() {
  const [tuKhoa, setTuKhoa] = useState('');
  const [danhMucLoc, setDanhMucLoc] = useState('');
  const [danhSach, setDanhSach] = useState<Product[]>(mockProducts);

  const spHienThi = danhSach.filter((sp) => {
    const khopTen = sp.name.toLowerCase().includes(tuKhoa.toLowerCase()) ||
      sp.brand.toLowerCase().includes(tuKhoa.toLowerCase());
    const khopDanhMuc = !danhMucLoc || sp.category === danhMucLoc;
    return khopTen && khopDanhMuc;
  });

  const xoaSanPham = (id: string) => {
    if (confirm('Bạn có chắc muốn xoá sản phẩm này?')) {
      setDanhSach((prev) => prev.filter((sp) => sp.id !== id));
    }
  };

  return (
    <div className="space-y-5">
      {/* Thanh công cụ */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Tìm theo tên, thương hiệu..."
              value={tuKhoa}
              onChange={(e) => setTuKhoa(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-white w-64"
            />
          </div>
          <select
            value={danhMucLoc}
            onChange={(e) => setDanhMucLoc(e.target.value)}
            className="px-3 py-2 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-white"
          >
            <option value="">Tất cả danh mục</option>
            <option value="sunglasses">Kính Mát</option>
            <option value="eyeglasses">Kính Cận</option>
            <option value="fashion">Kính Thời Trang</option>
            <option value="sports">Kính Thể Thao</option>
          </select>
        </div>
        <Link
          href="/quan-tri/san-pham/them-moi"
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] hover:bg-[#A8893A] text-white text-sm font-bold rounded-xl transition-colors"
        >
          <Plus size={16} /> Thêm Sản Phẩm
        </Link>
      </div>

      {/* Bảng sản phẩm */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100">
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Sản Phẩm</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Danh Mục</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Giá</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Tồn Kho</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Trạng Thái</th>
                <th className="text-center px-4 py-3 font-semibold text-neutral-600">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {spHienThi.map((sp) => (
                <tr key={sp.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                        🕶️
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900 line-clamp-1">{sp.name}</p>
                        <p className="text-xs text-neutral-400">{sp.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {sp.category === 'sunglasses' ? 'Kính Mát' :
                     sp.category === 'eyeglasses' ? 'Kính Cận' :
                     sp.category === 'fashion' ? 'Thời Trang' : 'Thể Thao'}
                  </td>
                  <td className="px-4 py-3 font-semibold text-neutral-900">{formatPrice(sp.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${sp.stock < 5 ? 'text-red-600' : sp.stock < 10 ? 'text-orange-600' : 'text-emerald-600'}`}>
                      {sp.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {sp.isNew && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Mới</span>}
                      {sp.isBestseller && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">Bán chạy</span>}
                      {sp.isSale && <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Sale</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/quan-tri/san-pham/them-moi?id=${sp.id}`}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => xoaSanPham(sp.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Xoá"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-neutral-100 flex items-center justify-between">
          <p className="text-sm text-neutral-500">Hiển thị <span className="font-semibold">{spHienThi.length}</span> / {danhSach.length} sản phẩm</p>
        </div>
      </div>
    </div>
  );
}
