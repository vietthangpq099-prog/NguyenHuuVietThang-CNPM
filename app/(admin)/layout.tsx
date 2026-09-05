'use client';

import React, { useState } from 'react';
import SidebarAdmin from '@/components/quan-tri/SidebarAdmin';
import HeaderAdmin from '@/components/quan-tri/HeaderAdmin';
import { usePathname } from 'next/navigation';

const tenTrang: Record<string, string> = {
  '/quan-tri': 'Tổng Quan',
  '/quan-tri/san-pham': 'Quản Lý Sản Phẩm',
  '/quan-tri/san-pham/them-moi': 'Thêm Sản Phẩm Mới',
  '/quan-tri/kho-hang': 'Quản Lý Kho Hàng',
  '/quan-tri/don-hang': 'Quản Lý Đơn Hàng',
  '/quan-tri/nguoi-dung': 'Quản Lý Người Dùng',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [moMenuMobile, setMoMenuMobile] = useState(false);
  const duongDan = usePathname();
  const tieuDe = tenTrang[duongDan] || 'Quản Trị';

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <SidebarAdmin moMobile={moMenuMobile} onDong={() => setMoMenuMobile(false)} />
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <HeaderAdmin tieuDe={tieuDe} onMoMenuMobile={() => setMoMenuMobile(true)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
