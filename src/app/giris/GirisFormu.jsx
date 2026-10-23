'use client';

import { useActionState } from 'react';
import { girisYap } from '../actions/auth';

export default function GirisFormu() {
  const [durum, eylem, bekliyor] = useActionState(girisYap, null);

  return (
    <form action={eylem} className="space-y-3.5">
      <div>
        <label htmlFor="eposta" className="block text-xs font-semibold text-stone-800 mb-1">
          E-posta
        </label>
        <input
          id="eposta"
          name="eposta"
          type="email"
          required
          autoComplete="username"
          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 text-sm focus:outline-none focus:border-orange-600"
        />
      </div>
      <div>
        <label htmlFor="sifre" className="block text-xs font-semibold text-stone-800 mb-1">
          Şifre
        </label>
        <input
          id="sifre"
          name="sifre"
          type="password"
          required
          autoComplete="current-password"
          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 text-sm focus:outline-none focus:border-orange-600"
        />
      </div>

      {durum?.hata && (
        <p role="alert" className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
          {durum.hata}
        </p>
      )}

      <button
        type="submit"
        disabled={bekliyor}
        className="w-full px-4 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
      >
        {bekliyor ? 'Giriş yapılıyor...' : 'Giriş Yap'}
      </button>
    </form>
  );
}
