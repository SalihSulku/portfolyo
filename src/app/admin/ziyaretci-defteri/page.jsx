import { sql } from '@/lib/db';
import { yoneticiyiZorunluKil } from '@/lib/auth';
import { defterEkle, defterGuncelle, defterSil, yayinDegistir } from '../../actions/admin';
import OnayliForm from '../OnayliForm';

const alan =
  'w-full px-3 py-2 bg-stone-50 border border-stone-300 text-sm focus:outline-none focus:border-orange-600';
const etiket = 'block text-xs font-semibold text-stone-800 mb-1';

function tarih(d) {
  return d
    ? new Date(d).toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul', dateStyle: 'short', timeStyle: 'short' })
    : '-';
}

function DefterFormu({ kayit, etiketler }) {
  const duzenleme = Boolean(kayit);
  return (
    <form action={duzenleme ? defterGuncelle : defterEkle} className="grid sm:grid-cols-2 gap-3">
      {duzenleme && <input type="hidden" name="id" value={kayit.id} />}
      <div>
        <label className={etiket} htmlFor="ad">Ad *</label>
        <input id="ad" name="ad" required maxLength={80} defaultValue={kayit?.ad ?? ''} className={alan} />
      </div>
      <div>
        <label className={etiket} htmlFor="sehir">Şehir</label>
        <input id="sehir" name="sehir" maxLength={60} defaultValue={kayit?.sehir ?? ''} className={alan} />
      </div>
      <div className="sm:col-span-2">
        <label className={etiket} htmlFor="mesaj">Mesaj *</label>
        <textarea
          id="mesaj"
          name="mesaj"
          required
          rows={3}
          maxLength={500}
          defaultValue={kayit?.mesaj ?? ''}
          className={`${alan} resize-none`}
        />
      </div>
      <div>
        <label className={etiket} htmlFor="kategori_id">Konu etiketi</label>
        <select id="kategori_id" name="kategori_id" defaultValue={kayit?.kategori_id ?? ''} className={alan}>
          <option value="">(Yok)</option>
          {etiketler.map((e) => (
            <option key={e.id} value={e.id}>{e.ad}</option>
          ))}
        </select>
      </div>
      <label className="flex items-center gap-2 text-sm text-stone-800 sm:self-end sm:pb-2">
        <input type="checkbox" name="yayinda" defaultChecked={duzenleme ? kayit.yayinda : true} />
        Yayında
      </label>
      <div className="sm:col-span-2 flex gap-2">
        <button type="submit" className="px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700">
          {duzenleme ? 'Kaydet' : 'Ekle'}
        </button>
        {duzenleme && (
          <a href="/admin/ziyaretci-defteri" className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-200 hover:bg-stone-300">
            Vazgeç
          </a>
        )}
      </div>
    </form>
  );
}

export default async function DefterSayfasi({ searchParams }) {
  await yoneticiyiZorunluKil();
  const sp = await searchParams;
  const duzenleId = /^\d{1,9}$/.test(sp?.duzenle ?? '') ? Number(sp.duzenle) : null;

  // JOIN: her kaydın konu etiketi adıyla birlikte listelenmesi
  const kayitlar = await sql`
    SELECT d.id, d.ad, d.mesaj, d.sehir, d.yayinda, d.yazma_zamani, d.kategori_id, k.ad AS kategori
    FROM ziyaretci_defteri d
    LEFT JOIN konu_etiketleri k ON k.id = d.kategori_id
    ORDER BY d.id DESC
  `;
  const etiketler = await sql`SELECT id, ad FROM konu_etiketleri ORDER BY ad`;
  const duzenlenen = duzenleId ? kayitlar.find((k) => k.id === duzenleId) : null;

  return (
    <div className="space-y-6">
      <div className="border-b-2 border-stone-800 pb-3">
        <h1 className="text-2xl font-extrabold text-stone-900">Ziyaretçi Defteri</h1>
        <p className="text-xs text-stone-600 mt-1">
          Ziyaretçi notları varsayılan olarak yayında değildir; onayladığınız notlar sitede görünür.
        </p>
      </div>

      {sp?.hata && (
        <p role="alert" className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">{sp.hata}</p>
      )}
      {sp?.basari && (
        <p role="status" className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">{sp.basari}</p>
      )}

      <section className="p-5 bg-white border-2 border-stone-800">
        <h2 className="text-sm font-bold text-stone-900 mb-3">
          {duzenlenen ? `Kayıt #${duzenlenen.id} düzenleniyor` : 'Yeni kayıt ekle'}
        </h2>
        <DefterFormu key={duzenlenen?.id ?? 'yeni'} kayit={duzenlenen} etiketler={etiketler} />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-bold text-stone-900">Tüm kayıtlar ({kayitlar.length})</h2>
        {kayitlar.length === 0 && <p className="text-sm text-stone-600">Henüz kayıt yok.</p>}
        {kayitlar.map((k) => (
          <article key={k.id} className="p-4 bg-white border border-stone-300">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono text-stone-500">#{k.id}</span>
              <strong className="text-stone-900">{k.ad}</strong>
              {k.sehir && <span className="text-stone-500">· {k.sehir}</span>}
              {k.kategori && <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 font-semibold">{k.kategori}</span>}
              <span
                className={`px-1.5 py-0.5 font-semibold ${
                  k.yayinda ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                }`}
              >
                {k.yayinda ? 'Yayında' : 'Yayında değil'}
              </span>
              <span className="ml-auto text-stone-500 font-mono">{tarih(k.yazma_zamani)}</span>
            </div>
            <p className="mt-2 text-sm text-stone-800 whitespace-pre-wrap break-words">{k.mesaj}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <form action={yayinDegistir}>
                <input type="hidden" name="id" value={k.id} />
                <button type="submit" className="px-3 py-1.5 text-xs font-bold text-white bg-stone-800 hover:bg-stone-900">
                  {k.yayinda ? 'Yayından kaldır' : 'Yayına al'}
                </button>
              </form>
              <a
                href={`/admin/ziyaretci-defteri?duzenle=${k.id}`}
                className="px-3 py-1.5 text-xs font-semibold text-stone-800 bg-stone-200 hover:bg-stone-300"
              >
                Düzenle
              </a>
              <OnayliForm action={defterSil} soru={`#${k.id} numaralı kayıt silinsin mi?`}>
                <input type="hidden" name="id" value={k.id} />
                <button type="submit" className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700">
                  Sil
                </button>
              </OnayliForm>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
