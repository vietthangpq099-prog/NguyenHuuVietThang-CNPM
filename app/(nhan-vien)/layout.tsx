'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardList, CheckCircle, Eye, X, Menu, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuNhanVien = [
  { nhan: 'Tổng Quan', duongDan: '/nhan-vien', bieu: Eye },
  { nhan: 'Xử Lý Đơn Hàng', duongDan: '/nhan-vien/don-hang', bieu: ClipboardList },
  { nhan: 'Đơn Đã Xử Lý', duongDan: '/nhan-vien/da-xu-ly', bieu: CheckCircle },
];

function SidebarNoiDung({ onDong }: { onDong?: () => void }) {
  const duongDan = usePathname();
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-5 border-b border-neutral-800">
        <Link href="/nhan-vien" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Eye size={17} className="text-white" />
          </div>
          <div className="leading-none">
            <span className="font-serif font-bold text-base text-white block">Optic</span>
            <span className="text-[10px] text-blue-400 font-semibold tracking-[0.15em] uppercase">Nhân Viên</span>
          </div>
        </Link>
        {onDong && (
          <button onClick={onDong} className="lg:hidden p-1 text-neutral-400 hover:text-white cursor-pointer">
            <X size={18} />
          </button>
        )}
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuNhanVien.map((muc) => {
          const la = duongDan === muc.duongDan || (muc.duongDan !== '/nhan-vien' && duongDan.startsWith(muc.duongDan));
          return (
            <Link key={muc.duongDan} href={muc.duongDan} onClick={onDong}
              className={cn('flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150',
                la ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
              )}>
              <div className="flex items-center gap-3"><muc.bieu size={18} />{muc.nhan}</div>
              {la && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-4 border-t border-neutral-800">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-800 mb-3">
          <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">N</div>
          <div>
            <p className="text-sm font-semibold text-white">Nhân Viên</p>
            <p className="text-xs text-neutral-400">staff@opticshop.vn</p>
          </div>
        </div>
        <Link href="/" className="flex items-center justify-center gap-2 text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
          ← Về trang khách hàng
        </Link>
      </div>
    </div>
  );
}

export default function NhanVienLayout({ children }: { children: React.ReactNode }) {
  const [moMobile, setMoMobile] = useState(false);
  const duongDan = usePathname();
  const tenTrang: Record<string, string> = {
    '/nhan-vien': 'Tổng Quan',
    '/nhan-vien/don-hang': 'Xử Lý Đơn Hàng',
    '/nhan-vien/da-xu-ly': 'Đơn Đã Xử Lý',
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-60 bg-neutral-950 border-r border-neutral-800 fixed top-0 left-0 h-screen z-40">
        <SidebarNoiDung />
      </aside>

      {/* Sidebar mobile */}
      {moMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMoMobile(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-neutral-950 flex flex-col">
            <SidebarNoiDung onDong={() => setMoMobile(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <header className="bg-white border-b border-neutral-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button onClick={() => setMoMobile(true)} className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 cursor-pointer">
            <Menu size={22} />
          </button>
          <h1 className="font-bold text-lg text-neutral-900">{tenTrang[duongDan] || 'Nhân Viên'}</h1>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
