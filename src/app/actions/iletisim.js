'use server';

import { sql } from '@/lib/db';
import { KONULAR, LIMIT, epostaGecerli, temizle } from '@/lib/dogrulama';

export async function mesajGonder(girdi) {
  if (temizle(girdi?.website)) return { ok: true };

  const adSoyad = temizle(girdi?.adSoyad);
  const eposta = temizle(girdi?.eposta).toLowerCase();
  const mesaj = temizle(girdi?.mesaj);
  const telefon = temizle(girdi?.telefon);
  const konu = temizle(girdi?.konu);
  const kvkk = girdi?.kvkk === true;

  if (!adSoyad || !eposta || !mesaj) {
    return { ok: false, hata: 'Ad soyad, e-posta ve mesaj alanları zorunludur.' };
  }
  if (adSoyad.length > LIMIT.ad) return { ok: false, hata: `Ad soyad en fazla ${LIMIT.ad} karakter olabilir.` };
  if (!epostaGecerli(eposta)) return { ok: false, hata: 'Geçerli bir e-posta adresi girin.' };
  if (mesaj.length > LIMIT.iletisimMesaj) {
    return { ok: false, hata: `Mesaj en fazla ${LIMIT.iletisimMesaj} karakter olabilir.` };
  }
  if (telefon && (telefon.length > LIMIT.telefon || !/^[0-9+()\s-]+$/.test(telefon))) {
    return { ok: false, hata: 'Telefon numarası geçersiz.' };
  }
  if (konu && !KONULAR.includes(konu)) return { ok: false, hata: 'Geçersiz konu seçimi.' };
  if (!kvkk) return { ok: false, hata: 'Devam etmek için KVKK aydınlatma metnini onaylamalısınız.' };

  const govde =
    (konu ? `[Konu: ${konu}]\n` : '') + (telefon ? `[Telefon: ${telefon}]\n` : '') + mesaj;

  try {
    await sql`
      INSERT INTO iletisim_mesajlari (ad_soyad, eposta, mesaj, kvkk_onay)
      VALUES (${adSoyad}, ${eposta}, ${govde}, true)
    `;
    return { ok: true };
  } catch (e) {
    console.error('mesajGonder hatası:', e);
    return { ok: false, hata: 'Mesajınız kaydedilemedi, lütfen daha sonra tekrar deneyin.' };
  }
}
