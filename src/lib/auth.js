import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import crypto from 'node:crypto';
import { sql } from './db';

export const COOKIE_ADI = 'admin_oturum';
const SURE_SANIYE = 2 * 60 * 60; // 2 saat

export async function oturumOlustur(yoneticiId) {
  const token = crypto.randomBytes(32).toString('hex');
  await sql`
    INSERT INTO oturumlar (token, yonetici_id, bitis)
    VALUES (${token}, ${yoneticiId}, now() + interval '2 hours')
  `;
  const jar = await cookies();
  jar.set(COOKIE_ADI, token, {
    httpOnly: true, // JavaScript okuyamaz (XSS ile çalınmasını zorlaştırır)
    secure: process.env.NODE_ENV === 'production', // yalnızca HTTPS
    sameSite: 'lax', // başka sitelerden gelen isteklerde gönderilmez (CSRF)
    path: '/',
    maxAge: SURE_SANIYE,
  });
}

export const mevcutYonetici = cache(async () => {
  const jar = await cookies();
  const token = jar.get(COOKIE_ADI)?.value;
  if (!token || !/^[0-9a-f]{64}$/.test(token)) return null;

  const satirlar = await sql`
    SELECT y.id, y.eposta, y.sifre_degisim, o.token
    FROM oturumlar o
    JOIN yoneticiler y ON y.id = o.yonetici_id
    WHERE o.token = ${token} AND o.bitis > now()
  `;
  return satirlar[0] ?? null;
});

export async function yoneticiyiZorunluKil() {
  const yonetici = await mevcutYonetici();
  if (!yonetici) redirect('/giris');
  return yonetici;
}

export async function oturumuKapat() {
  const jar = await cookies();
  const token = jar.get(COOKIE_ADI)?.value;
  if (token) {
    await sql`DELETE FROM oturumlar WHERE token = ${token}`;
  }
  jar.delete(COOKIE_ADI);
}
