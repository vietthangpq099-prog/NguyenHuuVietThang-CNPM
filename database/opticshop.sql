-- ================================================================
-- OPTICSHOP DATABASE - Tạo và import vào phpMyAdmin
-- Hướng dẫn: Vào phpMyAdmin > SQL tab > paste toàn bộ > Thực thi
-- ================================================================

-- Tạo database
CREATE DATABASE IF NOT EXISTS `opticshop`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `opticshop`;

-- ================================================================
-- BẢNG 1: NGƯỜI DÙNG (users)
-- ================================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id`          VARCHAR(10)  NOT NULL,
  `ho_ten`      VARCHAR(100) NOT NULL,
  `email`       VARCHAR(100) NOT NULL UNIQUE,
  `mat_khau`    VARCHAR(255) NOT NULL COMMENT 'Đã hash bcrypt',
  `so_dien_thoai` VARCHAR(15),
  `dia_chi`     TEXT,
  `vai_tro`     ENUM('admin','staff','customer') DEFAULT 'customer',
  `trang_thai`  ENUM('active','inactive','banned') DEFAULT 'active',
  `ngay_tao`    DATETIME DEFAULT CURRENT_TIMESTAMP,
  `ngay_cap_nhat` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dữ liệu người dùng mẫu
INSERT INTO `users` VALUES
('u001','Nguyễn Minh Anh',    'minhanh@gmail.com',          '$2b$10$hashedpassword1', '0901234567', '123 Nguyễn Huệ, Q.1, TP.HCM',      'customer', 'active',   '2023-10-01 00:00:00', NOW()),
('u002','Trần Văn Hùng',      'vanhung@gmail.com',          '$2b$10$hashedpassword2', '0912345678', '456 Lê Lợi, Q.3, TP.HCM',          'customer', 'active',   '2023-11-15 00:00:00', NOW()),
('u003','Lê Thu Hà',          'thuha@gmail.com',            '$2b$10$hashedpassword3', '0923456789', '789 Trần Hưng Đạo, Q.5, TP.HCM',   'customer', 'active',   '2023-12-01 00:00:00', NOW()),
('u004','Phạm Quốc Bảo',      'quocbao@gmail.com',          '$2b$10$hashedpassword4', '0934567890', '321 Hai Bà Trưng, Q.1, TP.HCM',    'customer', 'active',   '2024-01-05 00:00:00', NOW()),
('u005','Võ Thị Lan',         'thilan@gmail.com',           '$2b$10$hashedpassword5', '0945678901', NULL,                                'customer', 'active',   '2024-01-10 00:00:00', NOW()),
('u006','Hoàng Đức Nam',      'ducnam.staff@opticshop.vn',  '$2b$10$hashedpassword6', '0956789012', 'Cơ sở OpticShop Q.1',               'staff',    'active',   '2023-06-01 00:00:00', NOW()),
('u007','Trịnh Thị Mai',      'thimai.staff@opticshop.vn',  '$2b$10$hashedpassword7', '0967890123', 'Cơ sở OpticShop Q.3',               'staff',    'active',   '2023-08-15 00:00:00', NOW()),
('u008','Nguyễn Quản Trị',    'admin@opticshop.vn',         '$2b$10$hashedpassword8', '0978901234', 'Văn phòng OpticShop',               'admin',    'active',   '2023-01-01 00:00:00', NOW());

-- ================================================================
-- BẢNG 2: LỊCH SỬ ĐĂNG NHẬP (login_history)
-- ================================================================
CREATE TABLE IF NOT EXISTS `login_history` (
  `id`          INT          NOT NULL AUTO_INCREMENT,
  `user_id`     VARCHAR(10)  NOT NULL,
  `email`       VARCHAR(100) NOT NULL,
  `dia_chi_ip`  VARCHAR(50)  NOT NULL,
  `vi_tri`      VARCHAR(100),
  `thiet_bi`    VARCHAR(200) COMMENT 'User-Agent string',
  `loai_thiet_bi` ENUM('desktop','mobile','tablet') DEFAULT 'desktop',
  `trang_thai`  ENUM('thanh-cong','that-bai','dang-xuat') DEFAULT 'thanh-cong',
  `ly_do_that_bai` VARCHAR(200) COMMENT 'Lý do nếu thất bại',
  `thoi_gian`   DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_thoi_gian` (`thoi_gian`),
  CONSTRAINT `fk_login_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dữ liệu lịch sử đăng nhập mẫu
INSERT INTO `login_history` (`user_id`, `email`, `dia_chi_ip`, `vi_tri`, `thiet_bi`, `loai_thiet_bi`, `trang_thai`, `ly_do_that_bai`, `thoi_gian`) VALUES
('u008','admin@opticshop.vn',         '127.0.0.1',       'TP. Hồ Chí Minh, VN', 'Chrome 127 / Windows 11',  'desktop', 'thanh-cong', NULL,                      '2026-09-07 09:30:00'),
('u008','admin@opticshop.vn',         '113.172.11.22',   'TP. Hồ Chí Minh, VN', 'Safari / iPhone 15 Pro',    'mobile',  'thanh-cong', NULL,                      '2026-09-06 21:14:00'),
('u001','minhanh@gmail.com',          '113.172.11.23',   'TP. Hồ Chí Minh, VN', 'Chrome 126 / Windows 10',  'desktop', 'thanh-cong', NULL,                      '2026-09-07 08:00:00'),
('u002','vanhung@gmail.com',          '27.68.45.120',    'Hà Nội, VN',           'Firefox 128 / Windows 11', 'desktop', 'that-bai',   'Sai mật khẩu',             '2026-09-06 15:02:00'),
('u002','vanhung@gmail.com',          '27.68.45.120',    'Hà Nội, VN',           'Firefox 128 / Windows 11', 'desktop', 'thanh-cong', NULL,                      '2026-09-06 15:05:00'),
('u003','thuha@gmail.com',            '118.70.22.88',    'Đà Nẵng, VN',          'Chrome / Android 14',       'mobile',  'thanh-cong', NULL,                      '2026-09-05 19:20:00'),
('u006','ducnam.staff@opticshop.vn',  '192.168.1.10',    'TP. Hồ Chí Minh, VN', 'Chrome / Windows 11',      'desktop', 'thanh-cong', NULL,                      '2026-09-07 07:45:00'),
('u001','minhanh@gmail.com',          '1.52.33.99',      'TP. Hồ Chí Minh, VN', 'Chrome / macOS Ventura',   'desktop', 'that-bai',   'Tài khoản bị khoá tạm',   '2026-09-04 11:30:00'),
('u008','admin@opticshop.vn',         '113.172.11.22',   'TP. Hồ Chí Minh, VN', 'Edge 125 / Windows 11',    'desktop', 'dang-xuat',  NULL,                      '2026-09-06 18:00:00'),
('u007','thimai.staff@opticshop.vn',  '192.168.1.11',    'TP. Hồ Chí Minh, VN', 'Chrome / Windows 10',      'desktop', 'thanh-cong', NULL,                      '2026-09-07 08:30:00');

-- ================================================================
-- BẢNG 3: SẢN PHẨM (products)
-- ================================================================
CREATE TABLE IF NOT EXISTS `products` (
  `id`            VARCHAR(10)  NOT NULL,
  `ten`           VARCHAR(200) NOT NULL,
  `thuong_hieu`   VARCHAR(100) NOT NULL,
  `danh_muc`      ENUM('sunglasses','eyeglasses','fashion','sports') NOT NULL,
  `gia`           DECIMAL(12,0) NOT NULL,
  `gia_goc`       DECIMAL(12,0),
  `mo_ta`         TEXT,
  `chat_lieu_gong` VARCHAR(100),
  `dang_gong`     VARCHAR(50),
  `trong`         INT DEFAULT 0,
  `danh_gia`      DECIMAL(3,1) DEFAULT 5.0,
  `so_danh_gia`   INT DEFAULT 0,
  `la_moi`        TINYINT(1) DEFAULT 0,
  `dang_sale`     TINYINT(1) DEFAULT 0,
  `ban_chay`      TINYINT(1) DEFAULT 0,
  `ngay_tao`      DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `products` VALUES
('p001','Lumière Aviator Classic','RayStyle','sunglasses', 2800000, 3500000,'Kính mát aviator phân cực UV400, gọng titanium siêu nhẹ','Titanium','Aviator', 25, 4.9, 128, 1, 1, 1, NOW()),
('p002','Shadow Wayfarer Pro',   'RayStyle','sunglasses', 1980000, NULL,   'Gọng acetate bền vững, tròng polycarbonate chống xước',   'Acetate', 'Wayfarer',18, 4.7,  89, 0, 0, 1, NOW()),
('p003','Vision Round Titanium', 'VisonLux','eyeglasses', 3200000, 3800000,'Gọng titanium siêu nhẹ 14g, phù hợp mọi khuôn mặt',       'Titanium','Round',   30, 4.8, 156, 1, 1, 0, NOW()),
('p004','Luna Cat-Eye Rose',     'ChicVision','fashion',  2400000, NULL,   'Kính mèo thời trang, màu rose gold sang trọng',           'Acetate', 'Cat-Eye',  12, 4.6,  67, 1, 0, 0, NOW()),
('p005','Sport Pro Wrap',        'RayStyle','sports',     2200000, 2800000,'Kính thể thao ôm mặt, chống tia UV và va đập',            'TR-90',   'Wrap',     20, 4.8,  94, 0, 1, 1, NOW()),
('p006','Noir Square Premium',   'VisonLux','eyeglasses', 1800000, NULL,   'Kính vuông tối giản, phù hợp phong cách công sở',         'Stainless','Square',  35, 4.5,  43, 0, 0, 0, NOW()),
('p007','Gold Rimless Elegance', 'ChicVision','fashion',  4200000, 4800000,'Kính rimless mạ vàng 18K, siêu sang trọng',               'Titanium','Rimless',   8, 4.9,  38, 1, 1, 0, NOW()),
('p008','Trail Blazer Sports',   'RayStyle','sports',     1650000, NULL,   'Kính thể thao đa năng, tròng đổi màu theo ánh sáng',      'TR-90',   'Shield',   15, 4.7,  71, 1, 0, 1, NOW());

-- ================================================================
-- BẢNG 4: ĐƠN HÀNG (orders)
-- ================================================================
CREATE TABLE IF NOT EXISTS `orders` (
  `id`            VARCHAR(20)  NOT NULL,
  `user_id`       VARCHAR(10)  NOT NULL,
  `tong_tien`     DECIMAL(12,0) NOT NULL,
  `phi_ship`      DECIMAL(10,0) DEFAULT 0,
  `trang_thai`    ENUM('pending','confirmed','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  `dia_chi_giao`  TEXT         NOT NULL,
  `phuong_thuc_tt` VARCHAR(100),
  `ghi_chu`       TEXT,
  `ngay_tao`      DATETIME DEFAULT CURRENT_TIMESTAMP,
  `ngay_cap_nhat` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_trang_thai` (`trang_thai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `orders` VALUES
('DH001','u001', 3700000,    0,'delivered', '123 Nguyễn Huệ, Q.1, TP.HCM',     'Thanh toán khi nhận hàng', NULL,                     '2024-01-15 08:30:00', '2024-01-17 14:00:00'),
('DH002','u002', 2200000,    0,'shipped',   '456 Lê Lợi, Q.3, TP.HCM',         'Chuyển khoản ngân hàng',   NULL,                     '2024-01-16 10:15:00', '2024-01-16 16:00:00'),
('DH003','u003', 1850000,30000,'processing','789 Trần Hưng Đạo, Q.5, TP.HCM',  'Ví điện tử MoMo',         NULL,                     '2024-01-17 09:00:00', '2024-01-17 09:30:00'),
('DH004','u004', 4200000,    0,'confirmed', '321 Hai Bà Trưng, Q.1, TP.HCM',   'Thanh toán khi nhận hàng', NULL,                     '2024-01-17 14:20:00', '2024-01-17 14:25:00'),
('DH005','u005',  980000,30000,'pending',   '654 Đinh Tiên Hoàng, Q.Bình Thạnh','Thanh toán khi nhận hàng', NULL,                     '2024-01-17 16:45:00', '2024-01-17 16:45:00'),
('DH006','u001', 1650000,    0,'cancelled', '123 Nguyễn Huệ, Q.1, TP.HCM',     'Chuyển khoản ngân hàng',  'Khách huỷ vì thay đổi ý', '2024-01-14 11:00:00', '2024-01-14 13:00:00'),
('DH007','u006', 3500000,    0,'delivered', '10 Võ Văn Tần, Q.3, TP.HCM',      'Ví điện tử ZaloPay',      NULL,                     '2024-01-13 09:30:00', '2024-01-15 10:00:00'),
('DH008','u007', 1350000,30000,'shipped',   '55 Pasteur, Q.1, TP.HCM',          'Thanh toán khi nhận hàng', NULL,                     '2024-01-17 08:00:00', '2024-01-17 15:00:00');

-- ================================================================
-- VIEWS tiện lợi để xem nhanh
-- ================================================================

-- View: Lịch sử đăng nhập kèm tên người dùng
CREATE OR REPLACE VIEW `v_lich_su_dang_nhap` AS
SELECT
  lh.id,
  lh.user_id,
  u.ho_ten,
  u.vai_tro,
  lh.email,
  lh.dia_chi_ip,
  lh.vi_tri,
  lh.thiet_bi,
  lh.loai_thiet_bi,
  lh.trang_thai,
  lh.ly_do_that_bai,
  lh.thoi_gian
FROM login_history lh
JOIN users u ON u.id = lh.user_id
ORDER BY lh.thoi_gian DESC;

-- View: Thống kê đăng nhập theo người dùng
CREATE OR REPLACE VIEW `v_thong_ke_dang_nhap` AS
SELECT
  u.id,
  u.ho_ten,
  u.email,
  u.vai_tro,
  COUNT(lh.id)                                     AS tong_lan_dang_nhap,
  SUM(lh.trang_thai = 'thanh-cong')                AS thanh_cong,
  SUM(lh.trang_thai = 'that-bai')                  AS that_bai,
  MAX(lh.thoi_gian)                                AS dang_nhap_cuoi,
  u.trang_thai
FROM users u
LEFT JOIN login_history lh ON lh.user_id = u.id
GROUP BY u.id
ORDER BY dang_nhap_cuoi DESC;

-- View: Tổng quan đơn hàng
CREATE OR REPLACE VIEW `v_don_hang_tong_quan` AS
SELECT
  o.id,
  u.ho_ten,
  u.email,
  o.tong_tien,
  o.phi_ship,
  o.trang_thai,
  o.phuong_thuc_tt,
  o.dia_chi_giao,
  o.ngay_tao
FROM orders o
JOIN users u ON u.id = o.user_id
ORDER BY o.ngay_tao DESC;

-- ================================================================
-- KIỂM TRA DỮ LIỆU SAU KHI IMPORT
-- ================================================================
SELECT '=== USERS ===' AS '';
SELECT id, ho_ten, email, vai_tro, trang_thai, DATE(ngay_tao) AS ngay_tao FROM users;

SELECT '=== LỊCH SỬ ĐĂNG NHẬP ===' AS '';
SELECT * FROM v_lich_su_dang_nhap LIMIT 10;

SELECT '=== THỐNG KÊ ĐĂNG NHẬP ===' AS '';
SELECT * FROM v_thong_ke_dang_nhap;

SELECT '=== ĐƠN HÀNG ===' AS '';
SELECT * FROM v_don_hang_tong_quan;
