import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TheThongKeProps {
  tieu_de: string;
  gia_tri: string;
  tang_truong?: number;
  mo_ta?: string;
  icon: React.ReactNode;
  mau?: 'vang' | 'xanh' | 'tim' | 'do';
}

const bangMau = {
  vang: 'bg-amber-50 text-amber-600',
  xanh: 'bg-emerald-50 text-emerald-600',
  tim: 'bg-purple-50 text-purple-600',
  do: 'bg-red-50 text-red-600',
};

export default function TheThongKe({ tieu_de, gia_tri, tang_truong, mo_ta, icon, mau = 'vang' }: TheThongKeProps) {
  const tangTruongDuong = tang_truong !== undefined && tang_truong >= 0;

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-neutral-500">{tieu_de}</p>
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', bangMau[mau])}>
          {icon}
        </div>
      </div>

      <p className="font-bold text-2xl text-neutral-950 mb-1">{gia_tri}</p>

      {(tang_truong !== undefined || mo_ta) && (
        <div className="flex items-center gap-1.5">
          {tang_truong !== undefined && (
            <>
              {tangTruongDuong
                ? <TrendingUp size={14} className="text-emerald-500" />
                : <TrendingDown size={14} className="text-red-500" />}
              <span className={cn('text-xs font-semibold', tangTruongDuong ? 'text-emerald-600' : 'text-red-600')}>
                {tangTruongDuong ? '+' : ''}{tang_truong}%
              </span>
              <span className="text-xs text-neutral-400">so với tháng trước</span>
            </>
          )}
          {mo_ta && !tang_truong && (
            <span className="text-xs text-neutral-400">{mo_ta}</span>
          )}
        </div>
      )}
    </div>
  );
}
