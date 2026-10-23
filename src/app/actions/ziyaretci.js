'use server';

import { sql } from '@/lib/db';
import { LIMIT, temizle, tamSayiVeyaNull } from '@/lib/dogrulama';

export async function defterNotuEkle(girdi) {
  if (temizle(girdi?.website)) return { ok: true };

  const ad = temizle(girdi?.ad);
  const sehir = temizle(girdi?.sehir);
  const mesaj = temizle(girdi?.mesaj);
  const kategoriId = tamSayiVeyaNull(girdi?.kategoriId);

  if (!ad || !mesaj) return { ok: false, hata: 'Ad ve mesaj alanları zorunludur.' };
  if (ad.length > LIMIT.ad) return { ok: false, hata: `Ad en fazla ${LIMIT.ad} karakter olabilir.` };
  if (sehir.length > LIMIT.sehir) return { ok: false, hata: `Şehir en fazla ${LIMIT.sehir} karakter olabilir.` };
  if (mesaj.length > LIMIT.defterMesaj) {
    return { ok: false, hata: `Mesaj en fazla ${LIMIT.defterMesaj} karakter olabilir.` };
  }

  try {
    if (kategoriId !== null) {
      const var_mi = await sql`SELECT 1 FROM konu_etiketleri WHERE id = ${kategoriId}`;
      if (var_mi.length === 0) return { ok: false, hata: 'Geçersiz konu seçimi.' };
    }
    await sql`
      INSERT INTO ziyaretci_defteri (ad, mesaj, sehir, kategori_id, yayinda)
      VALUES (${ad}, ${mesaj}, ${sehir || null}, ${kategoriId}, false)
    `;
    return { ok: true };
  } catch (e) {
    console.error('defterNotuEkle hatası:', e);
    return { ok: false, hata: 'Notunuz kaydedilemedi, lütfen daha sonra tekrar deneyin.' };
  }
}
