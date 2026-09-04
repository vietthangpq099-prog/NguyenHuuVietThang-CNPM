'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { Product } from '@/types';

export interface MucGioHang {
  sanPham: Product;
  soLuong: number;
  mauDaChon: string;
}

interface TrangThaiGioHang {
  danhSachMuc: MucGioHang[];
  tongSoLuong: number;
  tongTien: number;
}

type HanhDong =
  | { type: 'THEM_VAO_GIO'; sanPham: Product; mau: string }
  | { type: 'XOA_KHOI_GIO'; sanPhamId: string; mau: string }
  | { type: 'CAP_NHAT_SO_LUONG'; sanPhamId: string; mau: string; soLuong: number }
  | { type: 'XOA_HET_GIO' }
  | { type: 'KHOI_PHUC'; danhSach: MucGioHang[] };

function tinhTong(danhSach: MucGioHang[]): { tongSoLuong: number; tongTien: number } {
  return danhSach.reduce(
    (acc, muc) => ({
      tongSoLuong: acc.tongSoLuong + muc.soLuong,
      tongTien: acc.tongTien + muc.sanPham.price * muc.soLuong,
    }),
    { tongSoLuong: 0, tongTien: 0 }
  );
}

function gioHangReducer(state: TrangThaiGioHang, action: HanhDong): TrangThaiGioHang {
  let danhSachMoi: MucGioHang[];

  switch (action.type) {
    case 'THEM_VAO_GIO': {
      const viTriHienCo = state.danhSachMuc.findIndex(
        (m) => m.sanPham.id === action.sanPham.id && m.mauDaChon === action.mau
      );
      if (viTriHienCo >= 0) {
        danhSachMoi = state.danhSachMuc.map((m, i) =>
          i === viTriHienCo ? { ...m, soLuong: m.soLuong + 1 } : m
        );
      } else {
        danhSachMoi = [
          ...state.danhSachMuc,
          { sanPham: action.sanPham, soLuong: 1, mauDaChon: action.mau },
        ];
      }
      break;
    }
    case 'XOA_KHOI_GIO':
      danhSachMoi = state.danhSachMuc.filter(
        (m) => !(m.sanPham.id === action.sanPhamId && m.mauDaChon === action.mau)
      );
      break;
    case 'CAP_NHAT_SO_LUONG':
      if (action.soLuong <= 0) {
        danhSachMoi = state.danhSachMuc.filter(
          (m) => !(m.sanPham.id === action.sanPhamId && m.mauDaChon === action.mau)
        );
      } else {
        danhSachMoi = state.danhSachMuc.map((m) =>
          m.sanPham.id === action.sanPhamId && m.mauDaChon === action.mau
            ? { ...m, soLuong: action.soLuong }
            : m
        );
      }
      break;
    case 'XOA_HET_GIO':
      danhSachMoi = [];
      break;
    case 'KHOI_PHUC':
      danhSachMoi = action.danhSach;
      break;
    default:
      return state;
  }

  const { tongSoLuong, tongTien } = tinhTong(danhSachMoi);
  return { danhSachMuc: danhSachMoi, tongSoLuong, tongTien };
}

interface GioHangContextType {
  gioHang: TrangThaiGioHang;
  themVaoGio: (sanPham: Product, mau: string) => void;
  xoaKhoiGio: (sanPhamId: string, mau: string) => void;
  capNhatSoLuong: (sanPhamId: string, mau: string, soLuong: number) => void;
  xoaHetGio: () => void;
}

const GioHangContext = createContext<GioHangContextType | null>(null);

const TRANG_THAI_MAC_DINH: TrangThaiGioHang = {
  danhSachMuc: [],
  tongSoLuong: 0,
  tongTien: 0,
};

export function GioHangProvider({ children }: { children: React.ReactNode }) {
  const [gioHang, dispatch] = useReducer(gioHangReducer, TRANG_THAI_MAC_DINH);

  // Khôi phục giỏ hàng từ localStorage khi tải trang
  useEffect(() => {
    try {
      const duLieuLuu = localStorage.getItem('opticshop_gio_hang');
      if (duLieuLuu) {
        const danhSach: MucGioHang[] = JSON.parse(duLieuLuu);
        dispatch({ type: 'KHOI_PHUC', danhSach });
      }
    } catch {
      // Bỏ qua lỗi parse
    }
  }, []);

  // Lưu giỏ hàng vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('opticshop_gio_hang', JSON.stringify(gioHang.danhSachMuc));
  }, [gioHang.danhSachMuc]);

  const themVaoGio = useCallback((sanPham: Product, mau: string) => {
    dispatch({ type: 'THEM_VAO_GIO', sanPham, mau });
  }, []);

  const xoaKhoiGio = useCallback((sanPhamId: string, mau: string) => {
    dispatch({ type: 'XOA_KHOI_GIO', sanPhamId, mau });
  }, []);

  const capNhatSoLuong = useCallback((sanPhamId: string, mau: string, soLuong: number) => {
    dispatch({ type: 'CAP_NHAT_SO_LUONG', sanPhamId, mau, soLuong });
  }, []);

  const xoaHetGio = useCallback(() => {
    dispatch({ type: 'XOA_HET_GIO' });
  }, []);

  return (
    <GioHangContext.Provider value={{ gioHang, themVaoGio, xoaKhoiGio, capNhatSoLuong, xoaHetGio }}>
      {children}
    </GioHangContext.Provider>
  );
}

export function useGioHang() {
  const ctx = useContext(GioHangContext);
  if (!ctx) throw new Error('useGioHang phải được dùng bên trong GioHangProvider');
  return ctx;
}
