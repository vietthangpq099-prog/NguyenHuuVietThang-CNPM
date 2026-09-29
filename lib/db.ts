import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// Khởi tạo kết nối đến file SQLite opticshop.db
export async function connectDB() {
  const dbPath = path.join(process.cwd(), 'database', 'opticshop.db');
  
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  return db;
}

// Hàm ví dụ: Lấy toàn bộ sản phẩm
export async function getAllProducts() {
  const db = await connectDB();
  const products = await db.all('SELECT * FROM products');
  return products;
}

// Hàm ví dụ: Lấy đơn hàng theo user_id
export async function getOrdersByUser(userId: string) {
  const db = await connectDB();
  const orders = await db.all('SELECT * FROM orders WHERE user_id = ?', [userId]);
  return orders;
}
