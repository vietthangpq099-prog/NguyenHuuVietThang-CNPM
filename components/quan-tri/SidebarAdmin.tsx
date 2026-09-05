'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, Warehouse, ShoppingBag, Users,
  ChevronRight, Eye, X, Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuAdmin = [
  { nhan: 'Tổng Quan', duongDan: '/quan-tri', bieu: LayoutDashboard },
  { nhan: 'Sản Phẩm', duongDan: '/quan-tri/san-pham', bieu: Package },
  { nhan: 'Kho Hàng', duongDan: '/quan-tri/kho-hang', bieu: Warehouse },
  { nhan: 'Đơn Hàng', duongDan: '/quan-tri/don-hang', bieu: ShoppingBag },
  { nhan: 'Người Dùng', duongDan: '/quan-tri/nguoi-dung', bieu: Users },
];

interface SidebarAdminProps {
  moMobile: boolean;
  onDong: () => void;
}

function NoiDungSidebar({ onDong }: { onDong?: () => void }) {
  const duongDanHienTai = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-neutral-800">
        <Link href="/quan-tri" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-[#C9A84C] rounded-lg flex items-center justify-center">
            <Eye size={17} className="text-white" />
          </div>
          <div className="leading-none">
            <span className="font-serif font-bold text-base text-white block">Optic</span>
            <span className="text-[10px] text-[#C9A84C] font-semibold tracking-[0.15em] uppercase">Admin</span>
          </div>
        </Link>
        {onDong && (
          <button onClick={onDong} className="lg:hidden p-1 text-neutral-400 hover:text-white cursor-pointer">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuAdmin.map((muc) => {
          const laDangChon = duongDanHienTai === muc.duongDan ||
            (muc.duongDan !== '/quan-tri' && duongDanHienTai.startsWith(muc.duongDan));
          return (
            <Link
              key={muc.duongDan}
              href={muc.duongDan}
              onClick={onDong}
              className={cn(
                'flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 group',
                laDangChon
                  ? 'bg-[#C9A84C] text-white shadow-[0_2px_10px_rgba(201,168,76,0.4)]'
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
              )}
            >
              <div className="flex items-center gap-3">
                <muc.bieu size={18} />
                {muc.nhan}
              </div>
              {laDangChon && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      {/* Thông tin admin */}
      <div className="px-4 py-4 border-t border-neutral-800">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-800">
          <div className="w-9 h-9 bg-[#C9A84C] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            A
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">Quản Trị Viên</p>
            <p className="text-xs text-neutral-400 truncate">admin@opticshop.vn</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 mt-3 py-2 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          ← Về trang khách hàng
        </Link>
      </div>
    </div>
  );
}

export default function SidebarAdmin({ moMobile, onDong }: SidebarAdminProps) {
  return (
    <>
      {/* Sidebar Desktop — cố định */}
      <aside className="hidden lg:flex flex-col w-60 bg-neutral-950 border-r border-neutral-800 fixed top-0 left-0 h-screen z-40">
        <NoiDungSidebar />
      </aside>

      {/* Sidebar Mobile — overlay */}
      {moMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onDong} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-neutral-950 flex flex-col">
            <NoiDungSidebar onDong={onDong} />
          </aside>
        </div>
      )}
    </>
  );
}

export function NutHamburgerAdmin({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 cursor-pointer"
    >
      <Menu size={22} />
    </button>
  );
}
