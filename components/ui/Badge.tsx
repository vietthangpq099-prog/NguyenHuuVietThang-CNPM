import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'new' | 'sale' | 'hot' | 'bestseller' | 'limited';

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const badgeConfig: Record<BadgeVariant, { label: string; className: string }> = {
  new: { label: 'Mới', className: 'bg-emerald-500 text-white' },
  sale: { label: 'Sale', className: 'bg-red-500 text-white' },
  hot: { label: 'Hot', className: 'bg-orange-500 text-white' },
  bestseller: { label: 'Bán Chạy', className: 'bg-amber-500 text-white' },
  limited: { label: 'Giới Hạn', className: 'bg-purple-500 text-white' },
};

export default function Badge({ variant, className }: BadgeProps) {
  const config = badgeConfig[variant];
  return (
    <span
      className={cn(
        'inline-block text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
