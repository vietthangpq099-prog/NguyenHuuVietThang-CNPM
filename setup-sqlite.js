const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'opticshop.db');

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  console.log('Đang tạo các bảng CSDL SQLite...');

  db.run(`
    CREATE TABLE users (
      id VARCHAR(10) PRIMARY KEY,
      ho_ten VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      mat_khau VARCHAR(255) NOT NULL,
      so_dien_thoai VARCHAR(15),
      dia_chi TEXT,
      vai_tro VARCHAR(20) DEFAULT 'customer',
      trang_thai VARCHAR(20) DEFAULT 'active',
      ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
      ngay_cap_nhat DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE login_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id VARCHAR(10) NOT NULL,
      email VARCHAR(100) NOT NULL,
      dia_chi_ip VARCHAR(50) NOT NULL,
      vi_tri VARCHAR(100),
      thiet_bi VARCHAR(200),
      loai_thiet_bi VARCHAR(20) DEFAULT 'desktop',
      trang_thai VARCHAR(20) DEFAULT 'thanh-cong',
      ly_do_that_bai VARCHAR(200),
      thoi_gian DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE products (
      id VARCHAR(10) PRIMARY KEY,
      ten VARCHAR(200) NOT NULL,
      thuong_hieu VARCHAR(100) NOT NULL,
      danh_muc VARCHAR(50) NOT NULL,
      gia DECIMAL(12,0) NOT NULL,
      gia_goc DECIMAL(12,0),
      mo_ta TEXT,
      chat_lieu_gong VARCHAR(100),
      dang_gong VARCHAR(50),
      trong INTEGER DEFAULT 0,
      danh_gia DECIMAL(3,1) DEFAULT 5.0,
      so_danh_gia INTEGER DEFAULT 0,
      la_moi INTEGER DEFAULT 0,
      dang_sale INTEGER DEFAULT 0,
      ban_chay INTEGER DEFAULT 0,
      ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE orders (
      id VARCHAR(20) PRIMARY KEY,
      user_id VARCHAR(10) NOT NULL,
      tong_tien DECIMAL(12,0) NOT NULL,
      phi_ship DECIMAL(10,0) DEFAULT 0,
      trang_thai VARCHAR(20) DEFAULT 'pending',
      dia_chi_giao TEXT NOT NULL,
      phuong_thuc_tt VARCHAR(100),
      ghi_chu TEXT,
      ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
      ngay_cap_nhat DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE order_details (
      order_id VARCHAR(20) NOT NULL,
      product_id VARCHAR(10) NOT NULL,
      so_luong INTEGER NOT NULL DEFAULT 1,
      don_gia DECIMAL(12,0) NOT NULL,
      PRIMARY KEY (order_id, product_id),
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  console.log('Tạo cấu trúc bảng SQLite thành công!');
});

db.close();
