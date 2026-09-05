'use client';

import React, { useState } from 'react';
import { mockProducts, formatPrice } from '@/lib/data/mock-products';
import { Save, AlertTriangle } from 'lucide-react';

export default function TrangKhoHang() {
  const [tonKho, setTonKho] = useState<Record<string, number>>(
    Object.fromEntries(mockProducts.map((sp) => [sp.id, sp.stock]))
  );
  const [daLuu, setDaLuu] = useState<Record<string, boolean>>({});

  const capNhatTon = (id: string, soLuong: number) => {
    setTonKho((p) => ({ ...p, [id]: soLuong }));
  };

  const luuTon = (id: string) => {
    setDaLuu((p) => ({ ...p, [id]: true }));
    setTimeout(() => setDaLuu((p) => ({ ...p, [id]: false })), 2000);
  };

  const tongTon = Object.values(tonKho).reduce((a, b) => a + b, 0);
  const spHetHang = Object.values(tonKho).filter((v) => v === 0).length;
  const spSapHet = Object.values(tonKho).filter((v) => v > 0 && v < 10).length;

  return (
    <div className="space-y-5">
      {/* Thống kê nhanh */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { nhan: 'Tổng Tồn Kho', gia_tri: `${tongTon} sản phẩm`, mau: 'bg-emerald-50 text-emerald-700' },
          { nhan: 'Sắp Hết Hàng (< 10)', gia_tri: `${spSapHet} loại`, mau: 'bg-orange-50 text-orange-700' },
          { nhan: 'Hết Hàng', gia_tri: `${spHetHang} loại`, mau: 'bg-red-50 text-red-700' },
        ].map((t) => (
          <div key={t.nhan} className={`${t.mau} rounded-2xl p-4 border border-current/10`}>
            <p className="text-xs font-medium opacity-70 mb-1">{t.nhan}</p>
            <p className="font-bold text-xl">{t.gia_tri}</p>
          </div>
        ))}
      </div>

      {/* Bảng kho hàng */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100">
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Sản Phẩm</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Danh Mục</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-600">Giá</th>
                <th className="text-center px-4 py-3 font-semibold text-neutral-600">Tình Trạng</th>
                <th className="text-center px-4 py-3 font-semibold text-neutral-600">Tồn Kho</th>
                <th className="text-center px-4 py-3 font-semibold text-neutral-600">Lưu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {mockProducts.map((sp) => {
                const ton = tonKho[sp.id] ?? sp.stock;
                const mucTon = ton === 0 ? 'het' : ton < 5 ? 'nguy-hiem' : ton < 10 ? 'thap' : 'du';
                const mauTon = { het: 'text-red-600 bg-red-50', 'nguy-hiem': 'text-red-600 bg-red-50', thap: 'text-orange-600 bg-orange-50', du: 'text-emerald-600 bg-emerald-50' };
                const nhanTon = { het: 'Hết hàng', 'nguy-hiem': 'Nguy hiểm', thap: 'Sắp hết', du: 'Còn hàng' };
                return (
                  <tr key={sp.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-neutral-100 rounded-xl flex items-center justify-center text-base flex-shrink-0">🕶️</div>
                        <div>
                          <p className="font-semibold text-neutral-900 line-clamp-1">{sp.name}</p>
                          <p className="text-xs text-neutral-400">{sp.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 text-xs">
                      {sp.category === 'sunglasses' ? 'Kính Mát' : sp.category === 'eyeglasses' ? 'Kính Cận' : sp.category === 'fashion' ? 'Thời Trang' : 'Thể Thao'}
                    </td>
                    <td className="px-4 py-3 font-semibold text-neutral-900">{formatPrice(sp.price)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${mauTon[mucTon]}`}>
                        {ton < 10 && <AlertTriangle size={10} className="inline mr-1" />}
                        {nhanTon[mucTon]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number" min={0} value={ton}
                        onChange={(e) => capNhatTon(sp.id, parseInt(e.target.value) || 0)}
                        className="w-20 mx-auto block text-center px-2 py-1.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => luuTon(sp.id)}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${daLuu[sp.id] ? 'bg-emerald-100 text-emerald-600' : 'bg-neutral-100 hover:bg-[#C9A84C] hover:text-white text-neutral-600'}`}
                        title="Lưu"
                      >
                        <Save size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
