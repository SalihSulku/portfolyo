import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, MapPin, Phone, Mail, Github, ExternalLink } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface PrintableCVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableCVModal: React.FC<PrintableCVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="relative w-full max-w-4xl bg-white text-stone-900 rounded-none border-2 border-stone-800 shadow-2xl overflow-hidden z-10 my-6 max-h-[90vh] flex flex-col"
        >
          {/* Top Control Bar (hidden in print) */}
          <div className="no-print p-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-none bg-orange-500" />
              <span className="text-sm font-semibold">Salih Sülkü - Özgeçmiş (CV Önizleme)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                Yazdır / PDF Kaydet
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-none text-stone-400 hover:text-white hover:bg-stone-800"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Area */}
          <div className="p-8 sm:p-12 overflow-y-auto bg-white text-slate-900 leading-relaxed font-sans text-sm selection:bg-orange-200">
            {/* CV Header */}
            <div className="border-b-2 border-slate-900 pb-5 mb-6">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
                {CV_DATA.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 font-medium mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-orange-600" />
                  {CV_DATA.location}
                </span>
                <span>•</span>
                <a href={`tel:${CV_DATA.phone}`} className="flex items-center gap-1 hover:text-orange-600">
                  <Phone className="w-3 h-3 text-orange-600" />
                  {CV_DATA.phone}
                </a>
                <span>•</span>
                <a href={`mailto:${CV_DATA.email}`} className="flex items-center gap-1 hover:text-orange-600">
                  <Mail className="w-3 h-3 text-orange-600" />
                  {CV_DATA.email}
                </a>
                <span>•</span>
                <a href={CV_DATA.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-orange-600">
                  <Github className="w-3 h-3 text-orange-600" />
                  github.com/SalihSulku
                </a>
                <span>•</span>
                <a href={CV_DATA.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-orange-600">
                  <span>LinkedIn: in/salih-sülkü</span>
                </a>
              </div>
            </div>

            {/* Hakkımda */}
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Hakkımda
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                • {CV_DATA.shortBio} {CV_DATA.longBio}
              </p>
            </section>

            {/* Eğitim */}
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Eğitim
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-sm">MANİSA CELÂL BAYAR ÜNİVERSİTESİ</h3>
                    <span className="text-xs font-mono text-slate-600">2025 – Devam Ediyor</span>
                  </div>
                  <p className="text-xs text-slate-700 italic">
                    Manisa Teknik Bilimler Meslek Yüksekokulu, İstatistik Bölümü, Büyük Veri Analistliği
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-sm">NURİ ERBAK ANADOLU LİSESİ</h3>
                    <span className="text-xs font-mono text-slate-600">2021 – 2025</span>
                  </div>
                  <p className="text-xs text-slate-700 italic">
                    Eşit Ağırlık / Türkçe & Matematik Alanı
                  </p>
                </div>
              </div>
            </section>

            {/* Teknik Yetkinlikler */}
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Teknik Yetkinlikler
              </h2>
              <div className="space-y-2 text-xs text-slate-800">
                <div>
                  <span className="font-bold uppercase text-slate-900">PROGRAMLAMA DİLLERİ:</span>{' '}
                  <span>Python, SQL, C#</span>
                </div>
                <div>
                  <span className="font-bold uppercase text-slate-900">VERİTABANI:</span>{' '}
                  <span>SQL Server, MongoDB (Temel Düzey), Apache Cassandra (Temel Düzey)</span>
                </div>
                <div>
                  <span className="font-bold uppercase text-slate-900">ARAÇLAR:</span>{' '}
                  <span>Excel, Visual Studio, Google Colab, GitHub, Jupyter Notebook, Pandas, Seaborn</span>
                </div>
                <div>
                  <span className="font-bold uppercase text-slate-900">YABANCI DİL:</span>{' '}
                  <span>İngilizce (Orta – İleri Düzey)</span>
                </div>
              </div>
            </section>

            {/* Projeler */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Projeler
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-sm uppercase">
                      KAYGIYI NE BÜYÜTÜYOR? (ETKİLEŞİMLİ VERİ HİKÂYESİ)
                    </h3>
                    <span className="text-[11px] font-mono text-orange-600 font-semibold">salihsulku.github.io/Kaygi</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    • Kaggle Social Anxiety veri setinden (11.000 kayıt) derlenen 300 kişilik temsil grubuyla uyku süresi, günlük kafein ve stresin kaygı puanıyla ilişkisini adım adım aktaran interaktif scrollytelling veri görselleştirme projesi geliştirildi.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-sm uppercase">
                      ÖĞRENCİ NOT TAHMİNİ MAKİNE ÖĞRENMESİ UYGULAMASI
                    </h3>
                  </div>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    • Örneklemlerin diğer verilerinden yola çıkarak notlarını gerçeğe en yakın şekilde tahmin eden Doğrusal Regresyon modelinin kullanıldığı ve R2 metriği ile başarı düzeylerinin ölçüldüğü bir tahmin algoritması oluşturuldu.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-sm">
                      Stok ve Envanter Yönetim Sistemi
                    </h3>
                  </div>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    • C# ve WinForms kullanılarak DataGridView üzerinden ürün listeleme, veri ekleme/silme ve Excel/CSV veri dışa aktarma özelliklerine sahip temel bir stok yönetim arayüzü geliştirildi.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
