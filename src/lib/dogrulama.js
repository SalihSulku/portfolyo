
export const LIMIT = {
  ad: 80,
  sehir: 60,
  defterMesaj: 500,
  eposta: 254,
  iletisimMesaj: 500,
  telefon: 20,
};

export const KONULAR = [
  'Staj & İş Teklifi',
  'Büyük Veri & Proje',
  'Makine Öğrenmesi',
  'Genel Tanışma',
];

export function temizle(v) {
  return typeof v === 'string' ? v.trim() : '';
}

export function epostaGecerli(e) {
  return e.length <= LIMIT.eposta && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export function tamSayiVeyaNull(v) {
  const s = temizle(String(v ?? ''));
  if (!/^\d{1,9}$/.test(s)) return null;
  return Number(s);
}
