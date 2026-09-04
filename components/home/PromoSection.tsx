import React from 'react';
import Link from 'next/link';
import { Eye, ShieldCheck, Truck, RotateCcw, Star, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Eye,
    title: 'Đo Mắt Miễn Phí',
    description:
      'Đội ngũ chuyên gia thị lực kinh nghiệm sẽ kiểm tra và tư vấn kính phù hợp nhất cho bạn, hoàn toàn miễn phí.',
    href: '/services/eye-test',
    cta: 'Đặt lịch ngay',
    highlight: true,
  },
  {
    icon: ShieldCheck,
    title: 'Bảo Hành 24 Tháng',
    description:
      'Tất cả sản phẩm đều được bảo hành chính hãng 24 tháng. Cam kết đổi mới nếu có lỗi từ nhà sản xuất.',
    href: '/warranty',
    cta: 'Xem chính sách',
    highlight: false,
  },
  {
    icon: Truck,
    title: 'Giao Hàng Toàn Quốc',
    description:
      'Giao hàng nhanh 24-48h tại TP.HCM và Hà Nội. Miễn phí vận chuyển cho đơn hàng từ 500.000đ.',
    href: '/shipping',
    cta: 'Tìm hiểu thêm',
    highlight: false,
  },
  {
    icon: RotateCcw,
    title: 'Đổi Trả 30 Ngày',
    description:
      'Không hài lòng? Đổi trả tự do trong 30 ngày đầu. Quy trình đơn giản, nhanh chóng, không rắc rối.',
    href: '/return-policy',
    cta: 'Xem điều khoản',
    highlight: false,
  },
];

const testimonials = [
  {
    name: 'Nguyễn Minh Anh',
    role: 'Khách hàng thân thiết',
    content:
      'Kính rất đẹp và chất lượng xuất sắc. Nhân viên tư vấn rất nhiệt tình. Tôi đã mua 3 đôi và sẽ tiếp tục ủng hộ OpticShop!',
    rating: 5,
    avatar: '👩',
  },
  {
    name: 'Trần Văn Hùng',
    role: 'Nhiếp ảnh gia',
    content:
      'Dịch vụ đo mắt miễn phí cực kỳ chuyên nghiệp. Gọng kính titan siêu nhẹ, đeo cả ngày không mỏi. Rất đáng tiền!',
    rating: 5,
    avatar: '👨',
  },
  {
    name: 'Lê Thu Hà',
    role: 'Giáo viên',
    content:
      'Giao hàng nhanh, đóng gói cẩn thận. Kính đúng như mô tả, màu sắc đẹp hơn cả trên ảnh. Shop rất uy tín!',
    rating: 5,
    avatar: '👩',
  },
];

export default function PromoSection() {
  return (
    <>
      {/* Services section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">
              Tại Sao Chọn Chúng Tôi
            </p>
            <h2 className="heading-display text-4xl md:text-5xl text-neutral-950 mb-4">
              Dịch Vụ Toàn Diện
            </h2>
            <p className="text-neutral-500 max-w-xl mx-auto text-sm leading-relaxed font-sans">
              Chúng tôi không chỉ bán kính — chúng tôi mang đến trải nghiệm chăm sóc mắt hoàn hảo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className={`relative rounded-3xl p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  service.highlight
                    ? 'bg-neutral-950 text-white'
                    : 'bg-white border border-neutral-100'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                    service.highlight ? 'bg-[#C9A84C]/20' : 'bg-neutral-100'
                  }`}
                >
                  <service.icon
                    size={24}
                    className={service.highlight ? 'text-[#C9A84C]' : 'text-neutral-700'}
                  />
                </div>

                <h3
                  className={`font-bold text-lg mb-3 font-serif ${
                    service.highlight ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-5 font-sans ${
                    service.highlight ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 group ${
                    service.highlight
                      ? 'text-[#C9A84C] hover:text-amber-300'
                      : 'text-neutral-700 hover:text-[#C9A84C]'
                  }`}
                >
                  {service.cta}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">
              Đánh Giá
            </p>
            <h2 className="heading-display text-4xl md:text-5xl text-neutral-950 mb-4">
              Khách Hàng Nói Gì
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-neutral-50 rounded-3xl p-7 border border-neutral-100 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-neutral-700 text-sm leading-relaxed mb-6 italic font-sans">
                  &ldquo;{t.content}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-neutral-900 font-sans">{t.name}</p>
                    <p className="text-xs text-neutral-400 font-sans">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-neutral-950 py-20">
        <div className="container-main text-center">
          <div className="text-5xl mb-6">👓</div>
          <h2 className="heading-display text-4xl md:text-5xl text-white mb-4">
            Sẵn Sàng Thay Đổi
            <span className="text-[#C9A84C] italic"> Phong Cách?</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto mb-8 font-sans">
            Đặt lịch đo mắt miễn phí hoặc khám phá ngay hàng trăm mẫu kính mắt cao cấp của chúng tôi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#A8893A] text-white font-bold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-[0_8px_30px_rgba(201,168,76,0.4)] hover:-translate-y-0.5"
            >
              Khám Phá Bộ Sưu Tập
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/services/eye-test"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all duration-200"
            >
              Đặt Lịch Đo Mắt Miễn Phí
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
