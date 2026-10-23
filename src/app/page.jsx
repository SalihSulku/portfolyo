import App from '../App';
import { sql } from '@/lib/db';


export const dynamic = 'force-dynamic';

async function defteriGetir() {
  try {
    const kayitlar = await sql`
      SELECT d.id, d.ad, d.sehir, d.mesaj, d.yazma_zamani, k.ad AS kategori
      FROM ziyaretci_defteri d
      LEFT JOIN konu_etiketleri k ON k.id = d.kategori_id
      WHERE d.yayinda = true
      ORDER BY d.yazma_zamani DESC NULLS LAST, d.id DESC
      LIMIT 50
    `;
    const etiketler = await sql`SELECT id, ad FROM konu_etiketleri ORDER BY ad`;

    return {
      hata: false,
      etiketler: etiketler.map((e) => ({ id: e.id, ad: e.ad })),
      kayitlar: kayitlar.map((k) => ({
        id: k.id,
        ad: k.ad,
        sehir: k.sehir,
        mesaj: k.mesaj,
        kategori: k.kategori,
        zaman: k.yazma_zamani ? new Date(k.yazma_zamani).toISOString() : null,
      })),
    };
  } catch (e) {
    console.error('Ziyaretçi defteri okunamadı:', e);
    return { hata: true, etiketler: [], kayitlar: [] };
  }
}

export default async function Sayfa() {
  const defter = await defteriGetir();
  return <App defter={defter} />;
}
