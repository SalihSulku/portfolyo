import { sql } from '@/lib/db';
import { yoneticiyiZorunluKil } from '@/lib/auth';

export default async function AdminAnaSayfa() {
  const yonetici = await yoneticiyiZorunluKil();

  const [ozet] = await sql`
    SELECT
      (SELECT COUNT(*) FROM iletisim_mesajlari WHERE okundu = false)::int AS okunmamis,
      (SELECT COUNT(*) FROM ziyaretci_defteri)::int AS defter_sayisi,
      (SELECT CURRENT_DATE - sifre_degisim::date FROM yoneticiler WHERE id = ${yonetici.id}) AS sifre_gun
  `;

  const kartlar = [
    { baslik: 'Okunmamış mesaj', deger: ozet.okunmamis, link: '/admin/mesajlar' },
    { baslik: 'Ziyaretçi defteri kaydı', deger: ozet.defter_sayisi, link: '/admin/ziyaretci-defteri' },
  ];

  const gun = ozet.sifre_gun;

  return (
    <div className="space-y-6">
      <div className="border-b-2 border-stone-800 pb-3">
        <h1 className="text-2xl font-extrabold text-stone-900">Özet</h1>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {kartlar.map((k) => (
          <a
            key={k.baslik}
            href={k.link}
            className="block p-5 bg-white border border-stone-300 hover:border-orange-600"
          >
            <span className="block text-3xl font-extrabold text-orange-600">{k.deger}</span>
            <span className="text-xs text-stone-600">{k.baslik}</span>
          </a>
        ))}
      </div>

      <p className="text-sm text-stone-700 p-4 bg-white border border-stone-300">
        {gun === null || gun === undefined
          ? 'Şifre değişim tarihi kayıtlı değil.'
          : gun === 0
            ? 'Şifreniz bugün değiştirildi.'
            : `Şifreniz ${gun} gün önce değiştirildi.`}{' '}
        <a href="/admin/sifre" className="text-orange-600 font-semibold hover:underline">
          Şifreyi değiştir
        </a>
      </p>
    </div>
  );
}
