import Link from 'next/link';
import { yoneticiyiZorunluKil } from '@/lib/auth';
import { cikisYap } from '../actions/auth';

export const metadata = { title: 'Yönetim Paneli', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
    const yonetici = await yoneticiyiZorunluKil();

  const baglanti = 'px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-orange-600';

  return (
    <div className="min-h-screen bg-[#faf6f0]">
      <header className="border-b-2 border-stone-800 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center gap-x-2 gap-y-2">
          <span className="w-8 h-8 bg-orange-600 text-white font-mono font-bold text-xs flex items-center justify-center mr-2">
            SS
          </span>
          <nav className="flex flex-wrap items-center">
            <Link href="/admin" className={baglanti}>Özet</Link>
            <Link href="/admin/ziyaretci-defteri" className={baglanti}>Ziyaretçi Defteri</Link>
            <Link href="/admin/mesajlar" className={baglanti}>Mesajlar</Link>
            <Link href="/admin/sifre" className={baglanti}>Şifre</Link>
            <a href="/" className={baglanti}>Siteyi Gör</a>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden sm:inline text-[11px] font-mono text-stone-500">{yonetici.eposta}</span>
            <form action={cikisYap}>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-bold text-white bg-stone-800 hover:bg-stone-900"
              >
                Çıkış
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
