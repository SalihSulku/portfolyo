import { sql } from '@/lib/db';

export const metadata = { title: 'Çerez Politikası - Salih Sülkü' };
export const dynamic = 'force-dynamic';

const TUR_ACIKLAMA = {
  zorunlu: 'Sitenin veya istenen bir hizmetin çalışması için gereklidir. Bu çerezler için açık rıza aranmaz, bilgilendirme yapılır.',
  işlevsel: 'Tercihlerinizi hatırlamak gibi kolaylıklar sağlar. Açık rıza gerektirir.',
  analitik: 'Ziyaretçi sayısı ve davranışı gibi istatistikleri ölçer. Açık rıza gerektirir.',
  pazarlama: 'Reklam ve profil oluşturma amacıyla kullanılır. Açık rıza gerektirir.',
};

async function cerezleriGetir() {
  try {
    return { hata: false, satirlar: await sql`SELECT ad, tur, amac, sure FROM cerezler ORDER BY tur, ad` };
  } catch (e) {
    console.error('Çerezler okunamadı:', e);
    return { hata: true, satirlar: [] };
  }
}

export default async function CerezPolitikasi() {
  const { hata, satirlar } = await cerezleriGetir();

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <a href="/" className="text-xs text-stone-500 hover:text-orange-600">← Siteye dön</a>

        <div className="border-b-2 border-stone-800 pb-3">
          <span className="text-xs font-mono uppercase tracking-widest text-orange-600 font-bold block mb-1">
            KVKK & Çerezler
          </span>
          <h1 className="text-3xl font-extrabold text-stone-900">Çerez Politikası</h1>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed">
          Çerez, ziyaret ettiğiniz sitenin tarayıcınıza bıraktığı küçük bir metin dosyasıdır. Bu sitede
          reklam, pazarlama veya ziyaretçi takibi amaçlı çerez kullanılmaz. Aşağıda sitenin kullandığı
          çerezler listelenmiştir.
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900">Kullanılan çerezler</h2>
          {hata && (
            <p className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
              Çerez listesi şu an yüklenemedi. Lütfen daha sonra tekrar deneyin.
            </p>
          )}
          {!hata && satirlar.length === 0 && <p className="text-sm text-stone-600">Kayıtlı çerez yok.</p>}
          {satirlar.length > 0 && (
            <div className="overflow-x-auto bg-white border border-stone-300">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-700">
                  <tr>
                    <th className="p-3 font-bold">Ad</th>
                    <th className="p-3 font-bold">Tür</th>
                    <th className="p-3 font-bold">Amaç</th>
                    <th className="p-3 font-bold">Süre</th>
                  </tr>
                </thead>
                <tbody>
                  {satirlar.map((c) => (
                    <tr key={c.ad} className="border-t border-stone-200 align-top">
                      <td className="p-3 font-mono font-semibold text-stone-900">{c.ad}</td>
                      <td className="p-3">{c.tur}</td>
                      <td className="p-3 text-stone-700">{c.amac}</td>
                      <td className="p-3 whitespace-nowrap">{c.sure}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">Çerez türleri</h2>
          <dl className="space-y-2 text-sm">
            {Object.entries(TUR_ACIKLAMA).map(([tur, aciklama]) => (
              <div key={tur} className="p-3 bg-white border border-stone-300">
                <dt className="font-bold text-stone-900 capitalize">{tur}</dt>
                <dd className="text-stone-700">{aciklama}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">İletişim formu ve KVKK</h2>
          <p className="text-sm text-stone-700 leading-relaxed">
            İletişim formunda paylaştığınız ad soyad, e-posta adresi ve mesaj; yalnızca mesajınıza yanıt
            vermek amacıyla işlenir ve site sahibi tarafından yönetim panelinde görüntülenir. Ziyaretçi
            defterine yazdığınız ad, şehir ve not, yönetici onayından sonra sitede herkese açık olarak
            yayımlanır. Verilerinizin silinmesini talep etmek için sayfadaki iletişim bilgilerinden
            ulaşabilirsiniz.
          </p>
        </section>
      </div>
    </main>
  );
}
