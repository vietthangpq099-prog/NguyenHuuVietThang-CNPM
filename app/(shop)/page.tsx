import HeroBanner from '@/components/home/HeroBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PromoSection from '@/components/home/PromoSection';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
       {/* Liên kết Banner hiện lên Trang chủ */}
      <CategoryGrid />
      <FeaturedProducts />
      <PromoSection />
    </>
  );
}
