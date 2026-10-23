import { sql } from '@/lib/db';
import { yoneticiyiZorunluKil } from '@/lib/auth';
import { mesajOkundu, mesajSil } from '../../actions/admin';
import OnayliForm from '../OnayliForm';

export default async function MesajlarSayfasi() {
  await yoneticiyiZorunluKil();

  // Yeniden eskiye
  const mesajlar = await sql`
    SELECT id, ad_soyad, eposta, mesaj, kvkk_onay, okundu, gonderim_zamani
    FROM iletisim_mesajlari
    ORDER BY gonderim_zamani DESC, id DESC
  `;

  return (
    <div className="space-y-6">
      <div className="border-b-2 border-stone-800 pb-3">
        <h1 className="text-2xl font-extrabold text-stone-900">İletişim Mesajları</h1>
        <p className="text-xs text-stone-600 mt-1">
          {mesajlar.length} mesaj, {mesajlar.filter((m) => !m.okundu).length} okunmamış.
        </p>
      </div>

      {mesajlar.length === 0 && <p className="text-sm text-stone-600">Henüz mesaj yok.</p>}

      <div className="space-y-3">
        {mesajlar.map((m) => (
          <article
            key={m.id}
            className={`p-4 border ${m.okundu ? 'bg-white border-stone-300' : 'bg-orange-50 border-orange-300'}`}
          >
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {!m.okundu && <span className="px-1.5 py-0.5 bg-orange-600 text-white font-bold">Yeni</span>}
              <strong className="text-stone-900">{m.ad_soyad}</strong>
              <a href={`mailto:${m.eposta}`} className="text-orange-700 hover:underline break-all">{m.eposta}</a>
              <span className="ml-auto font-mono text-stone-500">
                {new Date(m.gonderim_zamani).toLocaleString('tr-TR', {
                  timeZone: 'Europe/Istanbul',
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}
              </span>
            </div>
            <p className="mt-2 text-sm text-stone-800 whitespace-pre-wrap break-words">{m.mesaj}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {!m.okundu && (
                <form action={mesajOkundu}>
                  <input type="hidden" name="id" value={m.id} />
                  <button type="submit" className="px-3 py-1.5 text-xs font-bold text-white bg-stone-800 hover:bg-stone-900">
                    Okundu işaretle
                  </button>
                </form>
              )}
              <OnayliForm action={mesajSil} soru="Bu mesaj silinsin mi?">
                <input type="hidden" name="id" value={m.id} />
                <button type="submit" className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700">
                  Sil
                </button>
              </OnayliForm>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
