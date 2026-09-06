import React from 'react';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, Wrench, Sparkles, Clock, Phone, MapPin, CheckCircle, Award } from 'lucide-react';

const danhSachChinhSach = [
  {
    icon: RefreshCw,
    tieu_de: 'Bảo Hành 1 Đổi 1 Trong 7 Ngày',
    mau: 'bg-emerald-50 border-emerald-100 text-emerald-600',
    mauNen: 'bg-emerald-100',
    noi_dung: 'Nếu sản phẩm có lỗi do nhà sản xuất trong vòng 7 ngày kể từ ngày mua, chúng tôi cam kết đổi mới 100% sản phẩm tương đương hoặc hoàn tiền toàn bộ, không phát sinh chi phí.',
    dieu_kien: [
      'Sản phẩm còn nguyên tem, nhãn và phụ kiện đi kèm',
      'Lỗi do nhà sản xuất, không phải do va đập hay sử dụng sai cách',
      'Hóa đơn mua hàng còn hiệu lực',
      'Chưa qua sửa chữa hoặc chỉnh sửa bởi bên thứ ba',
    ],
  },
  {
    icon: Sparkles,
    tieu_de: 'Vệ Sinh Kính Bằng Sóng Siêu Âm Trọn Đời',
    mau: 'bg-blue-50 border-blue-100 text-blue-600',
    mauNen: 'bg-blue-100',
    noi_dung: 'Mang kính đến bất kỳ cửa hàng OpticShop nào, chúng tôi sẽ vệ sinh miễn phí bằng máy sóng siêu âm chuyên dụng giúp loại bỏ hoàn toàn bụi bẩn, vi khuẩn và dầu thừa trong mọi kẽ hở của gọng kính.',
    dieu_kien: [
      'Áp dụng cho tất cả sản phẩm mua tại OpticShop',
      'Không giới hạn số lần, miễn phí trọn đời',
      'Khuyến nghị vệ sinh định kỳ 1-3 tháng/lần',
      'Thời gian thực hiện: 15-30 phút',
    ],
  },
  {
    icon: Wrench,
    tieu_de: 'Nắn Chỉnh Gọng Kính Trọn Đời',
    mau: 'bg-amber-50 border-amber-100 text-amber-600',
    mauNen: 'bg-amber-100',
    noi_dung: 'Gọng kính bị lệch sau thời gian sử dụng hoặc sau va đập nhẹ? Đội ngũ kỹ thuật viên của chúng tôi sẽ nắn chỉnh lại gọng chuẩn xác miễn phí, đảm bảo kính vừa vặn và thoải mái như mới.',
    dieu_kien: [
      'Áp dụng cho gọng kính mua tại OpticShop',
      'Miễn phí trọn đời, không giới hạn lần',
      'Không áp dụng cho gọng bị gãy hoàn toàn hoặc biến dạng nặng',
      'Thực hiện trực tiếp tại cửa hàng, trong ngày',
    ],
  },
  {
    icon: ShieldCheck,
    tieu_de: 'Bảo Dưỡng Định Kỳ Miễn Phí',
    mau: 'bg-purple-50 border-purple-100 text-purple-600',
    mauNen: 'bg-purple-100',
    noi_dung: 'Mỗi 6 tháng, bạn có thể mang kính đến để chúng tôi kiểm tra toàn bộ: xiết vít gọng, kiểm tra tròng, vệ sinh tổng thể và tư vấn bảo quản — hoàn toàn miễn phí.',
    dieu_kien: [
      'Áp dụng cho sản phẩm còn trong thời hạn bảo hành chính hãng',
      'Khuyến nghị thực hiện định kỳ 2 lần/năm',
      'Bao gồm kiểm tra, vệ sinh và xiết lại vít gọng',
      'Xuất trình hóa đơn mua hàng khi đến bảo dưỡng',
    ],
  },
];

const buocThucHien = [
  { so: '01', tieu_de: 'Mang Sản Phẩm Đến Cửa Hàng', mo_ta: 'Mang kính cùng hóa đơn mua hàng đến bất kỳ chi nhánh OpticShop nào.' },
  { so: '02', tieu_de: 'Nhân Viên Kiểm Tra', mo_ta: 'Kỹ thuật viên sẽ kiểm tra tình trạng sản phẩm và xác nhận dịch vụ áp dụng.' },
  { so: '03', tieu_de: 'Thực Hiện Dịch Vụ', mo_ta: 'Vệ sinh, nắn chỉnh hoặc đổi mới sản phẩm theo đúng cam kết.' },
  { so: '04', tieu_de: 'Nhận Lại Sản Phẩm', mo_ta: 'Nhận lại kính sạch đẹp, hoạt động tốt như mới. Miễn phí hoàn toàn.' },
];

export default function TrangBaoHanh() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-neutral-950 to-neutral-800 text-white py-20">
        <div className="container-main text-center">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Award size={15} /> Cam Kết Chất Lượng
          </div>
          <h1 className="font-bold text-4xl md:text-5xl mb-5 leading-tight">
            Dịch Vụ Bảo Hành<br />
            <span className="text-[#C9A84C]">Toàn Diện & Trọn Đời</span>
          </h1>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Tại OpticShop, chúng tôi không chỉ bán kính — chúng tôi cam kết đồng hành cùng bạn
            suốt hành trình sử dụng sản phẩm với các dịch vụ hậu mãi hoàn toàn miễn phí.
          </p>
        </div>
      </div>

      {/* Các chính sách bảo hành */}
      <div className="container-main py-16">
        <div className="text-center mb-12">
          <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Chính Sách Của Chúng Tôi</p>
          <h2 className="font-bold text-3xl md:text-4xl text-neutral-950">4 Cam Kết Vàng OpticShop</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {danhSachChinhSach.map((cs) => (
            <div key={cs.tieu_de} className={`border-2 ${cs.mau.split(' ')[1]} rounded-3xl p-7 ${cs.mau.split(' ')[0]}`}>
              <div className={`w-14 h-14 ${cs.mauNen} rounded-2xl flex items-center justify-center mb-5`}>
                <cs.icon size={26} className={cs.mau.split(' ')[2]} />
              </div>
              <h3 className="font-bold text-xl text-neutral-900 mb-3">{cs.tieu_de}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-5">{cs.noi_dung}</p>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Điều kiện áp dụng:</p>
                {cs.dieu_kien.map((dk, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle size={14} className={`${cs.mau.split(' ')[2]} flex-shrink-0 mt-0.5`} />
                    <span className="text-sm text-neutral-700">{dk}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quy trình */}
      <div className="bg-neutral-50 py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl text-neutral-950 mb-3">Quy Trình Bảo Hành Đơn Giản</h2>
            <p className="text-neutral-500 text-sm">Chỉ 4 bước đơn giản, nhận dịch vụ miễn phí trong ngày</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {buocThucHien.map((buoc) => (
              <div key={buoc.so} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#C9A84C] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {buoc.so}
                </div>
                <h4 className="font-bold text-neutral-900 mb-2 text-sm">{buoc.tieu_de}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">{buoc.mo_ta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Liên hệ */}
      <div className="container-main py-16">
        <div className="bg-gradient-to-r from-neutral-950 to-neutral-800 rounded-3xl p-10 text-center text-white">
          <h2 className="font-bold text-3xl mb-3">Cần Hỗ Trợ Ngay?</h2>
          <p className="text-neutral-300 mb-8 max-w-lg mx-auto text-sm">
            Đội ngũ chuyên viên của chúng tôi luôn sẵn sàng hỗ trợ bạn từ thứ 2 đến thứ 7, 8:00 – 20:00.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {[
              { icon: Phone, nhan: 'Gọi Ngay', mo_ta: '1800 9999 (Miễn phí)', href: 'tel:18009999' },
              { icon: MapPin, nhan: 'Tìm Cửa Hàng', mo_ta: '25+ chi nhánh toàn quốc', href: '/gioi-thieu' },
              { icon: Clock, nhan: 'Giờ Hoạt Động', mo_ta: 'Thứ 2 – Thứ 7: 8:00–20:00', href: '#' },
            ].map((ct) => (
              <Link key={ct.nhan} href={ct.href} className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-2xl px-6 py-4 text-left">
                <ct.icon size={22} className="text-[#C9A84C] flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{ct.nhan}</p>
                  <p className="text-neutral-300 text-xs">{ct.mo_ta}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/san-pham" className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#A8893A] text-white px-8 py-3 rounded-full font-bold transition-all duration-200 shadow-[0_4px_20px_rgba(201,168,76,0.4)]">
            Mua Sắm Ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
