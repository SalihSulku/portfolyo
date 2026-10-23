'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { sql } from '@/lib/db';
import { yoneticiyiZorunluKil } from '@/lib/auth';
import { sifreGucluMu } from '@/lib/sifre';
import { LIMIT, temizle, tamSayiVeyaNull } from '@/lib/dogrulama';


const DEFTER = '/admin/ziyaretci-defteri';

function defteriYenile() {
  revalidatePath('/'); // sitedeki liste
  revalidatePath(DEFTER);
  revalidatePath('/admin');
}

function hataylaDon(mesaj, ek = '') {
  redirect(`${DEFTER}?hata=${encodeURIComponent(mesaj)}${ek}`);
}

function defterAlanlari(formData) {
  const ad = temizle(formData.get('ad'));
  const mesaj = temizle(formData.get('mesaj'));
  const sehir = temizle(formData.get('sehir'));
  const kategoriId = tamSayiVeyaNull(formData.get('kategori_id'));
  const yayinda = formData.get('yayinda') === 'on';

  let hata = null;
  if (!ad || !mesaj) hata = 'Ad ve mesaj zorunludur.';
  else if (ad.length > LIMIT.ad) hata = `Ad en fazla ${LIMIT.ad} karakter olabilir.`;
  else if (sehir.length > LIMIT.sehir) hata = `Şehir en fazla ${LIMIT.sehir} karakter olabilir.`;
  else if (mesaj.length > LIMIT.defterMesaj) hata = `Mesaj en fazla ${LIMIT.defterMesaj} karakter olabilir.`;

  return { ad, mesaj, sehir: sehir || null, kategoriId, yayinda, hata };
}

// ---------- Ziyaretçi defteri ----------

export async function defterEkle(formData) {
  await yoneticiyiZorunluKil();
  const { ad, mesaj, sehir, kategoriId, yayinda, hata } = defterAlanlari(formData);
  if (hata) hataylaDon(hata);

  await sql`
    INSERT INTO ziyaretci_defteri (ad, mesaj, sehir, kategori_id, yayinda)
    VALUES (${ad}, ${mesaj}, ${sehir}, ${kategoriId}, ${yayinda})
  `;
  defteriYenile();
  redirect(`${DEFTER}?basari=${encodeURIComponent('Kayıt eklendi.')}`);
}

export async function defterGuncelle(formData) {
  await yoneticiyiZorunluKil();
  const id = tamSayiVeyaNull(formData.get('id'));
  if (id === null) hataylaDon('Geçersiz kayıt.');

  const { ad, mesaj, sehir, kategoriId, yayinda, hata } = defterAlanlari(formData);
  if (hata) hataylaDon(hata, `&duzenle=${id}`);

  await sql`
    UPDATE ziyaretci_defteri
    SET ad = ${ad}, mesaj = ${mesaj}, sehir = ${sehir},
        kategori_id = ${kategoriId}, yayinda = ${yayinda}
    WHERE id = ${id}
  `;
  defteriYenile();
  redirect(`${DEFTER}?basari=${encodeURIComponent('Kayıt güncellendi.')}`);
}

export async function defterSil(formData) {
  await yoneticiyiZorunluKil();
  const id = tamSayiVeyaNull(formData.get('id'));
  if (id === null) hataylaDon('Geçersiz kayıt.');

  await sql`DELETE FROM ziyaretci_defteri WHERE id = ${id}`;
  defteriYenile();
  redirect(`${DEFTER}?basari=${encodeURIComponent('Kayıt silindi.')}`);
}

export async function yayinDegistir(formData) {
  await yoneticiyiZorunluKil();
  const id = tamSayiVeyaNull(formData.get('id'));
  if (id === null) hataylaDon('Geçersiz kayıt.');

  await sql`UPDATE ziyaretci_defteri SET yayinda = NOT yayinda WHERE id = ${id}`;
  defteriYenile();
  redirect(DEFTER);
}

// ---------- İletişim mesajları ----------

export async function mesajOkundu(formData) {
  await yoneticiyiZorunluKil();
  const id = tamSayiVeyaNull(formData.get('id'));
  if (id === null) return;

  await sql`UPDATE iletisim_mesajlari SET okundu = true WHERE id = ${id}`;
  revalidatePath('/admin/mesajlar');
  revalidatePath('/admin');
}

export async function mesajSil(formData) {
  await yoneticiyiZorunluKil();
  const id = tamSayiVeyaNull(formData.get('id'));
  if (id === null) return;

  await sql`DELETE FROM iletisim_mesajlari WHERE id = ${id}`;
  revalidatePath('/admin/mesajlar');
  revalidatePath('/admin');
}

// ---------- Güvenli şifre değiştirme ----------

export async function sifreDegistir(oncekiDurum, formData) {
  const yonetici = await yoneticiyiZorunluKil();

  const eski = String(formData.get('eski') ?? '');
  const yeni = String(formData.get('yeni') ?? '');
  const tekrar = String(formData.get('tekrar') ?? '');

  if (!eski || !yeni || !tekrar) return { hata: 'Tüm alanları doldurun.' };

  // 1) Eski şifreyi doğrula
  const satirlar = await sql`SELECT sifre_hash FROM yoneticiler WHERE id = ${yonetici.id}`;
  const eskiDogru = satirlar[0] && (await bcrypt.compare(eski, satirlar[0].sifre_hash));
  if (!eskiDogru) return { hata: 'Eski şifre yanlış.' };

  // 2) Yeni şifre kontrolleri
  if (yeni !== tekrar) return { hata: 'Yeni şifre ile tekrarı aynı değil.' };
  if (!sifreGucluMu(yeni)) {
    return { hata: 'Şifre en az 10 karakter olmalı; harf, rakam ve özel karakter içermelidir.' };
  }
  // bcrypt yalnızca ilk 72 baytı dikkate alır; fazlası sessizce yok sayılır.
  if (Buffer.byteLength(yeni, 'utf8') > 72) return { hata: 'Şifre en fazla 72 bayt olabilir.' };
  if (yeni === eski) return { hata: 'Yeni şifre eskisiyle aynı olamaz.' };

  // 3) Özetle ve kaydet
  const hash = await bcrypt.hash(yeni, 12);
  await sql`
    UPDATE yoneticiler SET sifre_hash = ${hash}, sifre_degisim = now()
    WHERE id = ${yonetici.id}
  `;

  // 4) Bu oturum dışındaki tüm oturumları kapat
  await sql`
    DELETE FROM oturumlar WHERE yonetici_id = ${yonetici.id} AND token <> ${yonetici.token}
  `;

  revalidatePath('/admin');
  return { basari: 'Şifreniz değiştirildi. Diğer cihazlardaki oturumlar kapatıldı.' };
}
