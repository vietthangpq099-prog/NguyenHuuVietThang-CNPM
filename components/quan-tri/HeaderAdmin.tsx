'use client';

import React from 'react';
import { Bell, Search } from 'lucide-react';
import { NutHamburgerAdmin } from './SidebarAdmin';

interface HeaderAdminProps {
  tieuDe: string;
  onMoMenuMobile: () => void;
}

export default function HeaderAdmin({ tieuDe, onMoMenuMobile }: HeaderAdminProps) {
  return (
    <header className="bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <NutHamburgerAdmin onClick={onMoMenuMobile} />
        <h1 className="font-bold text-lg text-neutral-900 font-sans">{tieuDe}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Tìm kiếm */}
        <div className="hidden sm:flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2">
          <Search size={15} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="bg-transparent text-sm text-neutral-700 outline-none w-36 placeholder:text-neutral-400"
          />
        </div>

        {/* Thông báo */}
        <button className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer">
          <Bell size={20} className="text-neutral-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 bg-[#C9A84C] rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
}
