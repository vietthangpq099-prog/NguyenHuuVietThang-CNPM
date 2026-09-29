'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Phone, X, MessageCircle } from 'lucide-react';

/* Icon Zalo SVG */
function ZaloIcon() {
  return (
    <svg viewBox="0 0 50 50" width="24" height="24" fill="white">
      <path d="M25 2C12.318 2 2 12.318 2 25c0 3.96 1.023 7.854 2.963 11.29L2.037 46.73a1 1 0 0 0 1.232 1.232l10.44-2.926A22.94 22.94 0 0 0 25 48c12.682 0 23-10.318 23-23S37.682 2 25 2zm-7.5 15h15a1 1 0 1 1 0 2h-15a1 1 0 1 1 0-2zm0 5h10a1 1 0 1 1 0 2h-10a1 1 0 1 1 0-2zm16.5 8l-4.5-3H15a1 1 0 0 1-1-1V18a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-1v-1z"/>
    </svg>
  );
}

/* Icon Messenger SVG */
function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
      <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.822 1.37 5.338 3.52 7.004V22l3.2-1.753A10.655 10.655 0 0 0 12 20.518c5.523 0 10-4.145 10-9.259S17.523 2 12 2zm1.006 12.46l-2.549-2.718-4.976 2.718 5.477-5.815 2.612 2.718 4.913-2.718-5.477 5.815z"/>
    </svg>
  );
}

const nutLienHe = [
  {
    id: 'home',
    icon: <Home size={22} color="white" />,
    label: 'Trang chủ',
    href: '/',
    mauNen: 'bg-blue-600 hover:bg-blue-700',
    isLink: true,
  },
  {
    id: 'phone',
    icon: <Phone size={22} color="white" />,
    label: 'Gọi ngay: 1800-888-999',
    href: 'tel:1800888999',
    mauNen: 'bg-blue-500 hover:bg-blue-600',
    isLink: true,
  },
  {
    id: 'zalo',
    icon: <ZaloIcon />,
    label: 'Chat Zalo',
    href: 'https://zalo.me/0901234567',
    mauNen: 'bg-blue-500 hover:bg-blue-600',
    isLink: true,
  },
  {
    id: 'messenger',
    icon: <MessengerIcon />,
    label: 'Facebook Messenger',
    href: 'https://m.me/opticshop',
    mauNen: 'bg-blue-600 hover:bg-blue-700',
    isLink: true,
  },
];

export default function FloatingContact() {
  const [moTooltip, setMoTooltip] = useState<string | null>(null);
  const [anWidget, setAnWidget] = useState(false);

  if (anWidget) {
    return (
      <button
        onClick={() => setAnWidget(false)}
        className="fixed right-4 bottom-6 z-50 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors cursor-pointer"
        title="Liên hệ"
      >
        <MessageCircle size={22} color="white" />
      </button>
    );
  }

  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3 items-center">
      {/* Nút thu nhỏ */}
      <button
        onClick={() => setAnWidget(true)}
        className="w-8 h-8 bg-neutral-400 hover:bg-neutral-500 rounded-full flex items-center justify-center shadow cursor-pointer transition-colors"
        title="Ẩn"
      >
        <X size={14} color="white" />
      </button>

      {/* Các nút liên hệ */}
      {nutLienHe.map((nut) => (
        <div key={nut.id} className="relative flex items-center group">
          {/* Tooltip bên trái */}
          <div
            className={`absolute right-14 bg-neutral-900 text-white text-xs font-medium px-3 py-1.5 rounded-xl whitespace-nowrap shadow-lg transition-all duration-200 pointer-events-none ${
              moTooltip === nut.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            }`}
          >
            {nut.label}
            {/* Mũi tên */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-[6px] border-l-neutral-900" />
          </div>

          {/* Nút tròn */}
          {nut.isLink ? (
            <Link
              href={nut.href}
              target={nut.href.startsWith('http') ? '_blank' : undefined}
              rel={nut.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`w-13 h-13 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg ${nut.mauNen} transition-all duration-200 hover:scale-110 hover:shadow-xl cursor-pointer`}
              onMouseEnter={() => setMoTooltip(nut.id)}
              onMouseLeave={() => setMoTooltip(null)}
            >
              {nut.icon}
            </Link>
          ) : null}
        </div>
      ))}

      {/* Vòng sóng animation cho phone */}
      <style jsx>{`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
