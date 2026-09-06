import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Users, MapPin, Eye, Heart, ShieldCheck, Star, ArrowRight } from 'lucide-react';

const congTyStats = [
  { so: '2015', mo_ta: 'Năm thành lập' },
  { so: '25+', mo_ta: 'Chi nhánh toàn quốc' },
  { so: '50,000+', mo_ta: 'Khách hàng tin dùng' },
  { so: '1,000+', mo_ta: 'Mẫu kính đa dạng' },
];

const giaTriCotLoi = [
  { icon: Eye, tieu_de: 'Chất Lượng Tầm Nhìn', mo_ta: 'Mỗi cặp kính đều được kiểm định nghiêm ngặt để bảo vệ tốt nhất đôi mắt quý giá của bạn.' },
  { icon: Heart, tieu_de: 'Tận Tâm Phục Vụ', mo_ta: 'Đội ngũ chuyên viên tư vấn nhiệt tình, lắng nghe nhu cầu và tư vấn phù hợp nhất cho từng khách hàng.' },
  { icon: ShieldCheck, tieu_de: 'Cam Kết Bảo Hành', mo_ta: 'Chính sách bảo hành toàn diện, vệ sinh & nắn chỉnh gọng trọn đời — không phát sinh chi phí.' },
  { icon: Award, tieu_de: 'Thương Hiệu Uy Tín', mo_ta: 'Nhà phân phối chính hãng các thương hiệu kính mắt cao cấp hàng đầu thế giới tại Việt Nam.' },
];

const doiNgu = [
  { ten: 'Nguyễn Văn Thành', chuc_vu: 'Giám Đốc Điều Hành', kinh_nghiem: '15 năm ngành kính mắt' },
  { ten: 'Trần Thị Hoa', chuc_vu: 'Trưởng Phòng Thiết Kế', kinh_nghiem: 'Đào tạo tại Ý & Pháp' },
  { ten: 'Lê Minh Khoa', chuc_vu: 'Chuyên Viên Kỹ Thuật', kinh_nghiem: '10 năm kinh nghiệm chỉnh quang' },
];

export default function TrangGioiThieu() {
  return (
    <div>
      {/* Hero */}
      <div className="relative bg-neutral-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1400&q=80&auto=format&fit=crop"
            alt="OpticShop showroom"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative container-main py-28 text-center">
          <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-4">Về Chúng Tôi</p>
          <h1 className="font-bold text-4xl md:text-6xl mb-6 leading-tight">
            OpticShop —<br />
            <span className="text-[#C9A84C]">Tầm Nhìn Cao Cấp</span>
          </h1>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Hơn 10 năm đồng hành, chúng tôi không chỉ bán kính — chúng tôi mang lại
            trải nghiệm thị giác tốt nhất cho mọi khách hàng Việt Nam.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#C9A84C] py-12">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {congTyStats.map((s) => (
              <div key={s.so}>
                <p className="font-bold text-4xl md:text-5xl mb-1">{s.so}</p>
                <p className="text-white/80 text-sm font-medium">{s.mo_ta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Câu chuyện thương hiệu */}
      <div className="container-main py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Câu Chuyện Của Chúng Tôi</p>
            <h2 className="font-bold text-3xl text-neutral-950 mb-6 leading-tight">
              Từ Một Cửa Hàng Nhỏ Đến Chuỗi 25+ Chi Nhánh
            </h2>
            <div className="space-y-4 text-neutral-600 text-sm leading-relaxed">
              <p>
                OpticShop được thành lập năm 2015 tại TP. Hồ Chí Minh với tầm nhìn đơn giản:
                <strong className="text-neutral-900"> mang những cặp kính đẹp nhất thế giới đến gần hơn với người Việt Nam</strong>,
                với mức giá hợp lý và dịch vụ chuyên nghiệp.
              </p>
              <p>
                Khởi đầu với một cửa hàng nhỏ tại Quận 1, chúng tôi đã không ngừng lớn mạnh
                nhờ sự tin tưởng của khách hàng. Hơn 50,000 khách hàng đã trải nghiệm dịch vụ
                của OpticShop và hơn 90% trong số đó quay lại mua hàng lần hai.
              </p>
              <p>
                Ngày nay, OpticShop là nhà phân phối chính thức của các thương hiệu kính mắt
                cao cấp như RayStyle, VisonLux, ChicVision — mang đến hàng ngàn mẫu mã đa dạng
                phù hợp mọi phong cách và nhu cầu.
              </p>
            </div>
            <Link href="/san-pham" className="inline-flex items-center gap-2 mt-8 bg-neutral-950 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-neutral-700 transition-colors">
              Khám phá bộ sưu tập <ArrowRight size={15} />
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=85&auto=format&fit=crop"
                alt="OpticShop cửa hàng"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white border border-neutral-100 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="font-bold text-neutral-900 text-sm">4.9/5 đánh giá</p>
              <p className="text-neutral-500 text-xs">Từ 50,000+ khách hàng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Giá trị cốt lõi */}
      <div className="bg-neutral-50 py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Giá Trị Cốt Lõi</p>
            <h2 className="font-bold text-3xl text-neutral-950">Tại Sao Chọn OpticShop?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {giaTriCotLoi.map((gtcl) => (
              <div key={gtcl.tieu_de} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-[#C9A84C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <gtcl.icon size={24} className="text-[#C9A84C]" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2 text-sm">{gtcl.tieu_de}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{gtcl.mo_ta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Đội ngũ */}
      <div className="container-main py-16">
        <div className="text-center mb-12">
          <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Đội Ngũ Chuyên Nghiệp</p>
          <h2 className="font-bold text-3xl text-neutral-950">Những Người Đứng Sau OpticShop</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {doiNgu.map((nv, i) => (
            <div key={nv.ten} className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-neutral-500">
                {['NT', 'TH', 'LK'][i]}
              </div>
              <h4 className="font-bold text-neutral-900 mb-1">{nv.ten}</h4>
              <p className="text-[#C9A84C] text-sm font-semibold mb-1">{nv.chuc_vu}</p>
              <p className="text-xs text-neutral-500">{nv.kinh_nghiem}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hệ thống cửa hàng */}
      <div className="bg-neutral-950 text-white py-16">
        <div className="container-main text-center">
          <MapPin size={32} className="text-[#C9A84C] mx-auto mb-4" />
          <h2 className="font-bold text-3xl mb-3">25+ Chi Nhánh Trên Toàn Quốc</h2>
          <p className="text-neutral-400 text-sm mb-8 max-w-lg mx-auto">
            Từ TP. Hồ Chí Minh, Hà Nội đến Đà Nẵng, Cần Thơ — luôn có một cửa hàng OpticShop gần bạn.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['TP. Hồ Chí Minh (12 chi nhánh)', 'Hà Nội (7 chi nhánh)', 'Đà Nẵng (3 chi nhánh)', 'Cần Thơ (2 chi nhánh)', 'Và nhiều tỉnh thành khác'].map((dia) => (
              <span key={dia} className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/80 border border-white/20">
                📍 {dia}
              </span>
            ))}
          </div>
          <div className="flex gap-4 justify-center">
            <Link href="/san-pham" className="px-8 py-3 bg-[#C9A84C] hover:bg-[#A8893A] text-white rounded-full font-bold transition-all text-sm shadow-[0_4px_20px_rgba(201,168,76,0.4)]">
              Mua Sắm Ngay
            </Link>
            <Link href="/bao-hanh" className="px-8 py-3 border-2 border-white/30 text-white hover:bg-white/10 rounded-full font-semibold transition-all text-sm">
              Dịch Vụ Bảo Hành
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
