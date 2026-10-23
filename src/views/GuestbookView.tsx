import React, { useState } from 'react';
import { BookOpen, Send, CheckCircle2, MapPin } from 'lucide-react';
import { defterNotuEkle } from '../app/actions/ziyaretci';

export interface DefterVerisi {
  hata: boolean;
  etiketler: { id: number; ad: string }[];
  kayitlar: {
    id: number;
    ad: string;
    sehir: string | null;
    mesaj: string;
    kategori: string | null;
    zaman: string | null;
  }[];
}

interface GuestbookViewProps {
  defter: DefterVerisi;
}

const BOS_FORM = { ad: '', sehir: '', kategoriId: '', mesaj: '', website: '' };

export const GuestbookView: React.FC<GuestbookViewProps> = ({ defter }) => {
  const [form, setForm] = useState(BOS_FORM);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [gonderildi, setGonderildi] = useState(false);
  const [hata, setHata] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGonderiliyor(true);
    setHata(null);
    try {
      // Not yayinda = false olarak kaydedilir; yönetici onaylayınca görünür.
      const sonuc = await defterNotuEkle(form);
      if (sonuc.ok) {
        setGonderildi(true);
        setForm(BOS_FORM);
      } else {
        setHata(sonuc.hata || 'Notunuz kaydedilemedi.');
      }
    } catch {
      setHata('Bir ağ sorunu oluştu. Lütfen tekrar deneyin.');
    } finally {
      setGonderiliyor(false);
    }
  };

  const alan =
    'w-full px-3 py-2 rounded-none bg-stone-50 border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-600';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b-2 border-stone-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-orange-600 font-bold block mb-1">
          Ziyaretçi Defteri
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Bir Not Bırakın
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
          Tebrik, öneri ya da soru: notunuzu yazın. Notlar yönetici onayından sonra burada yayımlanır.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Form */}
        <div className="md:col-span-5">
          <div className="p-6 bg-white border-2 border-stone-800 shadow-sm">
            <h2 className="text-base font-bold text-stone-900 mb-3">Not Yazın</h2>

            {gonderildi ? (
              <div className="p-5 bg-orange-50 border border-orange-200 text-center space-y-2.5">
                <div className="w-10 h-10 bg-orange-600 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">Notunuz alındı!</h3>
                <p className="text-xs text-stone-600">
                  Yönetici onayından sonra defterde görünecek.
                </p>
                <button
                  onClick={() => setGonderildi(false)}
                  className="mt-2 px-3.5 py-1.5 text-xs text-stone-800 bg-stone-200 hover:bg-stone-300 font-semibold"
                >
                  Yeni Not Yaz
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Adınız <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={80}
                    value={form.ad}
                    onChange={(e) => setForm({ ...form, ad: e.target.value })}
                    placeholder="Ad"
                    className={alan}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">Şehir</label>
                    <input
                      type="text"
                      maxLength={60}
                      value={form.sehir}
                      onChange={(e) => setForm({ ...form, sehir: e.target.value })}
                      placeholder="İsteğe bağlı"
                      className={alan}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">Konu</label>
                    <select
                      value={form.kategoriId}
                      onChange={(e) => setForm({ ...form, kategoriId: e.target.value })}
                      className={alan}
                    >
                      <option value="">Seçiniz...</option>
                      {defter.etiketler.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.ad}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-stone-800">
                      Mesajınız <span className="text-orange-600">*</span>
                    </label>
                    <span className="text-[10px] text-stone-400 font-mono">{form.mesaj.length} / 500</span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    maxLength={500}
                    value={form.mesaj}
                    onChange={(e) => setForm({ ...form, mesaj: e.target.value })}
                    placeholder="Notunuzu buraya yazın..."
                    className={`${alan} resize-none`}
                  />
                </div>

                {/* Bot tuzağı: insanlar görmez, botlar doldurur */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="hidden"
                />

                {hata && (
                  <p role="alert" className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
                    {hata}
                  </p>
                )}

                <p className="text-[11px] text-stone-500 leading-snug">
                  Yazdığınız ad, şehir ve not onaydan sonra herkese açık yayımlanır.
                </p>

                <button
                  type="submit"
                  disabled={gonderiliyor}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  {gonderiliyor ? 'Gönderiliyor...' : 'Notu Gönder'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Yayındaki notlar */}
        <div className="md:col-span-7 space-y-3">
          {defter.hata && (
            <p className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
              Defter şu an yüklenemedi. Lütfen sayfayı daha sonra yenileyin.
            </p>
          )}
          {!defter.hata && defter.kayitlar.length === 0 && (
            <div className="p-6 bg-white border border-stone-300 text-center text-sm text-stone-600">
              <BookOpen className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              Henüz yayımlanmış not yok. İlk notu siz yazın!
            </div>
          )}
          {defter.kayitlar.map((k) => (
            <article key={k.id} className="p-4 bg-white border border-stone-300">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <strong className="text-stone-900">{k.ad}</strong>
                {k.sehir && (
                  <span className="inline-flex items-center gap-1 text-stone-500">
                    <MapPin className="w-3 h-3" />
                    {k.sehir}
                  </span>
                )}
                {k.kategori && (
                  <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 font-semibold">
                    {k.kategori}
                  </span>
                )}
                {k.zaman && (
                  <span className="ml-auto font-mono text-[11px] text-stone-400">
                    {new Date(k.zaman).toLocaleDateString('tr-TR', { timeZone: 'Europe/Istanbul' })}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-stone-800 whitespace-pre-wrap break-words">{k.mesaj}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
