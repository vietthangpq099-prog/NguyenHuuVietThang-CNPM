# OpticShop - Hệ Thống Website Bán Kính Mắt Trực Tuyến

Đồ án môn học: **Công Nghệ Phần Mềm (CNPM)**  
Sinh viên thực hiện: **Nguyễn Hữu Việt Thắng**

---

## 🏛️ Kiến Trúc Hệ Thống (System Architecture)

- **Frontend UI (Giao diện người dùng):** Next.js 16 (App Router), React, Tailwind CSS v4, Lucide Icons.
- **Backend API:** Next.js Route Handlers (`app/api/products`, `app/api/orders`).
- **Cơ Sở Dữ Liệu (Database):** SQLite Database lưu tại `database/opticshop.db`, kết nối thông qua module quản lý `lib/db.ts`.
- **Lưu trữ phiên & Giỏ hàng:** React Context (`CartContext.tsx`) kết hợp SQLite Order API.

---

## 🗄️ Cấu Trúc Cơ Sở Dữ Liệu SQLite (`database/opticshop.db`)

Hệ thống được thiết kế với 5 bảng dữ liệu quan hệ:
1. **users:** Lưu thông tin tài khoản, phân quyền (Quản trị viên / Nhân viên / Khách hàng).
2. **products:** Danh mục kính mắt, thương hiệu, chất liệu, giá bán và số lượng tồn kho.
3. **orders:** Thông tin đơn hàng (người mua, địa chỉ, phương thức thanh toán, tổng tiền, trạng thái).
4. **order_details:** Chi tiết sản phẩm trong từng đơn hàng (khóa chính kết hợp `order_id` và `product_id`).
5. **login_history:** Ghi nhận nhật ký đăng nhập, IP và thiết bị phục vụ bảo mật.

---

## 🚀 Khởi Chạy Dự Án

```bash
# 1. Cài đặt thư viện
npm install

# 2. Khởi tạo CSDL SQLite (nếu cần)
node setup-sqlite.js

# 3. Chạy môi trường phát triển
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để trải nghiệm website.
