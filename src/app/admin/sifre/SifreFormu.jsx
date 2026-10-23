'use client';

import { useActionState } from 'react';
import { sifreDegistir } from '../../actions/admin';

const alan =
  'w-full px-3 py-2 bg-stone-50 border border-stone-300 text-sm focus:outline-none focus:border-orange-600';
const etiket = 'block text-xs font-semibold text-stone-800 mb-1';

export default function SifreFormu() {
  const [durum, eylem, bekliyor] = useActionState(sifreDegistir, null);

  return (
    <form action={eylem} className="space-y-3.5">
      <div>
        <label htmlFor="eski" className={etiket}>Eski şifre</label>
        <input id="eski" name="eski" type="password" required autoComplete="current-password" className={alan} />
      </div>
      <div>
        <label htmlFor="yeni" className={etiket}>Yeni şifre</label>
        <input id="yeni" name="yeni" type="password" required minLength={10} autoComplete="new-password" className={alan} />
      </div>
      <div>
        <label htmlFor="tekrar" className={etiket}>Yeni şifre (tekrar)</label>
        <input id="tekrar" name="tekrar" type="password" required autoComplete="new-password" className={alan} />
      </div>

      {durum?.hata && (
        <p role="alert" className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">{durum.hata}</p>
      )}
      {durum?.basari && (
        <p role="status" className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">{durum.basari}</p>
      )}

      <button
        type="submit"
        disabled={bekliyor}
        className="px-4 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
      >
        {bekliyor ? 'Kaydediliyor...' : 'Şifreyi Değiştir'}
      </button>
    </form>
  );
}
