import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-neutral-50">{children}</main>
      <Footer />
    </div>
  );
}
