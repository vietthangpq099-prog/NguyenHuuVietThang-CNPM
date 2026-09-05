import React from 'react';
import Link from 'next/link';
import { DollarSign, ShoppingBag, Package, Users, AlertTriangle, ArrowRight } from 'lucide-react';
import TheThongKe from '@/components/quan-tri/TheThongKe';
import { mockDonHang, mockNguoiDung, thongKeDoanhThu, formatTien, nhanTrangThaiDonHang } from '@/lib/data/mock-admin';
import { mockProducts } from '@/lib/data/mock-products';

const spSapHetHang = mockProducts.filter((sp) => sp.stock < 10);
const donHangMoi = mockDonHang.filter((dh) => dh.status === 'pending' || dh.status === 'confirmed');
const topSanPham = [...mockProducts].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);

export default function TrangTongQuan() {
  return (
    <div className="space-y-6">
      {/* Thẻ thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <TheThongKe
          tieu_de="Doanh Thu Hôm Nay"
          gia_tri={formatTien(thongKeDoanhThu.homNay)}
          tang_truong={12.5}
          icon={<DollarSign size={20} />}
          mau="vang"
        />
        <TheThongKe
          tieu_de="Đơn Hàng Mới"
          gia_tri={String(donHangMoi.length)}
          mo_ta="đang chờ xử lý"
          icon={<ShoppingBag size={20} />}
          mau="xanh"
        />
        <TheThongKe
          tieu_de="Sản Phẩm Sắp Hết"
          gia_tri={String(spSapHetHang.length)}
          mo_ta="cần nhập thêm hàng"
          icon={<Package size={20} />}
          mau="do"
        />
        <TheThongKe
          tieu_de="Tổng Khách Hàng"
          gia_tri={String(mockNguoiDung.filter(u => u.role === 'customer').length)}
          tang_truong={8.2}
          icon={<Users size={20} />}
          mau="tim"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Đơn hàng gần đây */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between p-5 border-b border-neutral-100">
            <h2 className="font-bold text-neutral-900">Đơn Hàng Gần Đây</h2>
            <Link href="/quan-tri/don-hang" className="text-sm text-[#C9A84C] hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-neutral-50">
            {mockDonHang.slice(0, 5).map((dh) => {
              const tt = nhanTrangThaiDonHang[dh.status];
              return (
                <div key={dh.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-neutral-50 transition-colors">
                  <div>
                    <p className="font-semibold text-sm text-neutral-900">#{dh.id}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{new Date(dh.createdAt).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tt.mau}`}>{tt.nhan}</span>
                  <p className="font-bold text-sm text-neutral-900">{formatTien(dh.total)}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bên phải */}
        <div className="space-y-5">
          {/* Cảnh báo hàng sắp hết */}
          {spSapHetHang.length > 0 && (
            <div className="bg-white rounded-2xl border border-red-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-2 p-4 border-b border-red-100">
                <AlertTriangle size={16} className="text-red-500" />
                <h2 className="font-bold text-neutral-900 text-sm">Hàng Sắp Hết</h2>
              </div>
              <div className="divide-y divide-neutral-50">
                {spSapHetHang.slice(0, 5).map((sp) => (
                  <div key={sp.id} className="flex items-center justify-between px-4 py-3">
                    <p className="text-sm text-neutral-700 line-clamp-1 flex-1">{sp.name}</p>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${sp.stock < 5 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                      {sp.stock} cái
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-4 pt-0">
                <Link href="/quan-tri/kho-hang" className="block w-full text-center py-2 text-xs font-semibold text-[#C9A84C] hover:underline">
                  Xem kho hàng →
                </Link>
              </div>
            </div>
          )}

          {/* Top sản phẩm */}
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <div className="p-4 border-b border-neutral-100">
              <h2 className="font-bold text-neutral-900 text-sm">Sản Phẩm Bán Chạy</h2>
            </div>
            <div className="divide-y divide-neutral-50">
              {topSanPham.map((sp, i) => (
                <div key={sp.id} className="flex items-center gap-3 px-4 py-3">
                  <span className="w-5 h-5 rounded-full bg-neutral-100 text-xs font-bold text-neutral-500 flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-neutral-700 line-clamp-1 flex-1">{sp.name}</p>
                  <span className="text-xs font-semibold text-neutral-500">{sp.reviewCount} đ.g</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
