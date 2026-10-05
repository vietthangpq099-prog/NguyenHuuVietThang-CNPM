import { NextResponse, NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    const db = await connectDB();
    const orders = await db.all('SELECT * FROM orders ORDER BY ngay_tao DESC');
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi truy vấn đơn hàng từ SQLite' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await connectDB();
    const orderId = 'DH' + Date.now().toString().slice(-6);

    await db.run(
      `INSERT INTO orders (id, user_id, tong_tien, phi_ship, trang_thai, dia_chi_giao, phuong_thuc_tt, ghi_chu)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        body.userId || 'u001',
        body.tongTien || 0,
        body.phiShip || 0,
        'pending',
        body.diaChi || '123 Đường mẫu',
        body.phuongThuc || 'cod',
        body.ghiChu || ''
      ]
    );

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi lưu đơn hàng vào SQLite' }, { status: 500 });
  }
}
