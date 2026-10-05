import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/db';

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi truy vấn CSDL SQLite (database/opticshop.db)' },
      { status: 500 }
    );
  }
}
