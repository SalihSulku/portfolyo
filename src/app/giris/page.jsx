import { redirect } from 'next/navigation';
import { mevcutYonetici } from '@/lib/auth';
import GirisFormu from './GirisFormu';

export const metadata = { title: 'Yönetici Girişi', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function GirisSayfasi() {
  if (await mevcutYonetici()) redirect('/admin');

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border-2 border-stone-800 shadow-sm">
        <div className="h-1.5 w-full bg-orange-600" />
        <div className="p-6">
          <span className="text-[11px] font-mono uppercase tracking-wider text-orange-600 font-bold block mb-1">
            Yönetim Paneli
          </span>
          <h1 className="text-xl font-bold text-stone-900 mb-4">Yönetici Girişi</h1>
          <GirisFormu />
          <a href="/" className="block mt-4 text-xs text-stone-500 hover:text-orange-600">
            ← Siteye dön
          </a>
        </div>
      </div>
    </main>
  );
}
