import Link from 'next/link';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="font-serif font-bold text-[120px] leading-none text-neutral-100 select-none mb-4">
          404
        </div>
        <h1 className="font-serif font-bold text-2xl text-neutral-900 mb-3">
          Không Tìm Thấy Trang
        </h1>
        <p className="text-neutral-500 text-sm mb-8">
          Trang bạn đang tìm không tồn tại hoặc đã bị xoá. Hãy thử tìm kiếm sản phẩm hoặc quay về trang chủ.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-neutral-950 text-white font-semibold rounded-full hover:bg-neutral-700 transition-colors text-sm"
          >
            🏠 Về trang chủ
          </Link>
          <Link
            href="/san-pham"
            className="px-6 py-3 border-2 border-neutral-200 text-neutral-700 font-semibold rounded-full hover:bg-neutral-50 transition-colors text-sm flex items-center gap-2 justify-center"
          >
            <Search size={15} /> Xem sản phẩm
          </Link>
        </div>
      </div>
    </div>
  );
}
