'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { oturumOlustur, oturumuKapat } from '@/lib/auth';

const HATA = { hata: 'E-posta veya şifre hatalı' };

let sahteHash;

export async function girisYap(oncekiDurum, formData) {
  const eposta = String(formData.get('eposta') ?? '').trim().toLowerCase();
  const sifre = String(formData.get('sifre') ?? '');

  if (!eposta || !sifre || eposta.length > 254 || sifre.length > 200) return HATA;

  const satirlar = await sql`
    SELECT id, sifre_hash FROM yoneticiler WHERE lower(eposta) = ${eposta}
  `;
  const yonetici = satirlar[0];

  sahteHash ??= bcrypt.hashSync('kullanici-yok', 12);
  const dogru = await bcrypt.compare(sifre, yonetici ? yonetici.sifre_hash : sahteHash);

  if (!yonetici || !dogru) return HATA;

  await sql`DELETE FROM oturumlar WHERE bitis < now()`;
  await oturumOlustur(yonetici.id);
  redirect('/admin');
}

export async function cikisYap() {
  await oturumuKapat();
  redirect('/giris');
}
