import React from 'react';
import { Github, ArrowUpRight, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

export const ProjectsView: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="border-b-2 border-stone-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-orange-600 font-bold block mb-1">
          Portföy & Çalışmalar
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Geliştirilen Projeler
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
          Etkileşimli veri hikâyeciliği (scrollytelling), makine öğrenmesi tahmin modelleri ve masaüstü veritabanı yazılımlarımın detayları.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-8">
        {/* Project 1: Kaygıyı Ne Büyütüyor? (Etkileşimli Veri Hikâyesi) */}
        <article className="bg-white border-2 border-stone-800 p-6 sm:p-8 space-y-5 shadow-sm transition-all duration-200 hover:border-orange-600 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-orange-600 font-bold">
                  Veri Görselleştirme & İstatistik
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-orange-100 text-orange-700 px-2 py-0.5 border border-orange-300">
                  <Sparkles className="w-3 h-3 text-orange-600" />
                  CANLI YAYINDA
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                Kaygıyı Ne Büyütüyor? (Etkileşimli Veri Hikâyesi)
              </h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href="https://salihsulku.github.io/Kaygi/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-700 hover:ring-2 hover:ring-orange-400/40 text-white text-xs font-bold transition-all duration-200 shadow-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Canlı Sitede İncele</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/SalihSulku/Kaygi"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all duration-200 shadow-xs"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 text-stone-700 text-sm leading-relaxed">
            <p>
              Kaggle’daki <strong>Social Anxiety Dataset (11.000 kayıt)</strong> içerisinden 300 kişilik rastgele örneklem kullanılarak; uyku saati, günlük kafein miktarı ve stres seviyesinin bireylerin kaygı puanıyla (1–10) olan ilişkisini anlatan <strong>etkileşimli bir veri hikâyesi (scrollytelling)</strong> geliştirildi.
            </p>
            <p className="text-stone-600 text-xs sm:text-sm">
              Ziyaretçilerin fare tekerleği veya ok tuşlarıyla adım adım ilerlediği, noktacıkların (scatter plot) dinamik animasyonlarla konum değiştirdiği ve kullanıcının kendi uyku süresini girerek ortalamaları test edebildiği interaktif bir hesaplayıcı modül tasarlandı.
            </p>
          </div>

          {/* Highlights / Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3 bg-[#faf6f0] border border-stone-300">
              <span className="block text-[10px] font-mono text-stone-500 uppercase">Veri Kümesi</span>
              <span className="text-xs font-bold text-stone-900">Kaggle (11.000 Kayıt)</span>
            </div>
            <div className="p-3 bg-[#faf6f0] border border-stone-300">
              <span className="block text-[10px] font-mono text-stone-500 uppercase">Örneklem</span>
              <span className="text-xs font-bold text-orange-600 font-mono">300 Kişilik Temsil</span>
            </div>
            <div className="p-3 bg-[#faf6f0] border border-stone-300">
              <span className="block text-[10px] font-mono text-stone-500 uppercase">Görselleştirme</span>
              <span className="text-xs font-bold text-stone-900">Scrollytelling & Scatter</span>
            </div>
            <div className="p-3 bg-[#faf6f0] border border-stone-300">
              <span className="block text-[10px] font-mono text-stone-500 uppercase">Yayın Durumu</span>
              <span className="text-xs font-bold text-stone-900">GitHub Pages (Canlı)</span>
            </div>
          </div>

          {/* Key Points */}
          <div className="pt-2 border-t border-stone-200">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span>300 kişilik örneği renk skalası ve dinamik koordinatlarla sunan scatter animasyonları</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span>5 saatten az uyuyanlarda kaygı ortalamasının (7,1) sıçradığını gösteren eşik analizi</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span>Kullanıcının kendi uyku süresini girerek ortalamayı deneyimlediği interaktif simülatör</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span>Korelasyon ile nedensellik ayrımına dikkat çeken istatistiksel veri etiği yaklaşımı</span>
              </li>
            </ul>
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-bold text-stone-800 mr-1">Teknolojiler:</span>
            {['JavaScript (ES6+)', 'HTML5 Canvas & SVG', 'Scrollytelling', 'Kaggle Dataset', 'Veri Gazeteciliği', 'CSS Animasyonları', 'GitHub Pages'].map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono text-stone-700 bg-stone-100 px-2 py-0.5 border border-stone-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </article>

        {/* Project 2: Öğrenci Not Tahmini ML */}
        <article className="bg-white border-2 border-stone-800 p-6 sm:p-8 space-y-5 shadow-sm transition-all duration-200 hover:border-orange-600">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-orange-600 font-bold block mb-0.5">
                Makine Öğrenmesi & Veri Analitiği
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                Öğrenci Not Tahmini Makine Öğrenmesi Uygulaması
              </h2>
            </div>
            <a
              href={CV_DATA.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-700 hover:ring-2 hover:ring-orange-400/40 text-white text-xs font-bold transition-all duration-200 shrink-0 shadow-xs"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Projesi</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Description */}
          <div className="space-y-3 text-stone-700 text-sm leading-relaxed">
            <p>
              Örneklemlerin diğer verilerinden yola çıkarak notlarını gerçeğe en yakın şekilde tahmin eden <strong>Doğrusal Regresyon (Linear Regression)</strong> modelinin kullanıldığı ve <strong>R² metriği</strong> ile başarı düzeylerinin ölçüldüğü bir tahmin algoritması oluşturuldu.
            </p>
            <p className="text-stone-600 text-xs sm:text-sm">
              Haftalık ders çalışma süresi, devamsızlık oranı ve vize sınavı gibi değişkenler arasındaki istatistiksel korelasyonlar incelenmiş; veri ön işleme, aykırı değer temizleme ve model doğrulama süreçleri Python ortamında gerçekleştirilmiştir.
            </p>
          </div>

          {/* Highlights / Metrics (Sharp) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3 bg-[#faf6f0] border border-stone-300">
              <span className="block text-[10px] font-mono text-stone-500 uppercase">Model</span>
              <span className="text-xs font-bold text-stone-900">Linear Regression</span>
            </div>
            <div className="p-3 bg-[#faf6f0] border border-stone-300">
              <span className="block text-[10px] font-mono text-stone-500 uppercase">R² Başarısı</span>
              <span className="text-xs font-bold text-orange-600 font-mono">0.892 (%89.2)</span>
            </div>
            <div className="p-3 bg-[#faf6f0] border border-stone-300">
              <span className="block text-[10px] font-mono text-stone-500 uppercase">Veri Bölümleme</span>
              <span className="text-xs font-bold text-stone-900 font-mono">%80 Train / %20 Test</span>
            </div>
            <div className="p-3 bg-[#faf6f0] border border-stone-300">
              <span className="block text-[10px] font-mono text-stone-500 uppercase">Metrikler</span>
              <span className="text-xs font-bold text-stone-900">R² & MSE Ölçümü</span>
            </div>
          </div>

          {/* Key Points */}
          <div className="pt-2 border-t border-stone-200">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span>Pandas ile veri temizleme ve eksik değerlerin tespiti</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span>Seaborn ile değişkenler arası korelasyon ve saçılım analizi</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span>Doğrusal Regresyon algoritması ile final notu kestirimi</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span>Jupyter Notebook ve Google Colab üzerinde geliştirme ve test</span>
              </li>
            </ul>
          </div>

          {/* Tech Badges (Sharp) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-bold text-stone-800 mr-1">Teknolojiler:</span>
            {['Python', 'Pandas', 'Seaborn', 'Scikit-Learn', 'Jupyter Notebook', 'Google Colab'].map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono text-stone-700 bg-stone-100 px-2 py-0.5 border border-stone-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </article>

        {/* Project 2: Stok ve Envanter Yönetim Sistemi (ZERO mentions of warnings/alerts) */}
        <article className="bg-white border-2 border-stone-800 p-6 sm:p-8 space-y-5 shadow-sm transition-all duration-200 hover:border-orange-600">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-orange-600 font-bold block mb-0.5">
                Masaüstü & Veritabanı Yazılımı
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                Stok ve Envanter Yönetim Sistemi
              </h2>
            </div>
            <a
              href={CV_DATA.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-700 hover:ring-2 hover:ring-orange-400/40 text-white text-xs font-bold transition-all duration-200 shrink-0 shadow-xs"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Projesi</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Description (Strictly per CV) */}
          <div className="space-y-3 text-stone-700 text-sm leading-relaxed">
            <p>
              <strong>C# ve WinForms</strong> kullanılarak <strong>DataGridView</strong> üzerinden ürün listeleme, veri ekleme/silme ve <strong>Excel/CSV veri dışa aktarma</strong> özelliklerine sahip temel bir stok yönetim arayüzü geliştirildi.
            </p>
            <p className="text-stone-600 text-xs sm:text-sm">
              Kullanıcıların envanter kalemlerini düzenli bir tablo yapısında listeleyebilmesini, yeni ürün ekleyip güncelleyebilmesini ve mevcut verileri standart Excel veya CSV formatlarında dışa aktarabilmesini sağlar.
            </p>
          </div>

          {/* Highlights (Sharp, No warnings) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3 bg-[#faf6f0] border border-stone-300">
              <span className="block text-[10px] font-mono text-stone-500 uppercase">Arayüz</span>
              <span className="text-xs font-bold text-stone-900">WinForms DataGridView</span>
            </div>
            <div className="p-3 bg-[#faf6f0] border border-stone-300">
              <span className="block text-[10px] font-mono text-stone-500 uppercase">Veri Aktarım</span>
              <span className="text-xs font-bold text-orange-600 font-mono">Excel / CSV Export</span>
            </div>
            <div className="p-3 bg-[#faf6f0] border border-stone-300">
              <span className="block text-[10px] font-mono text-stone-500 uppercase">İşlem Yeteneği</span>
              <span className="text-xs font-bold text-stone-900">Tam CRUD Desteği</span>
            </div>
            <div className="p-3 bg-[#faf6f0] border border-stone-300">
              <span className="block text-[10px] font-mono text-stone-500 uppercase">Veritabanı</span>
              <span className="text-xs font-bold text-stone-900">SQL Server & ADO.NET</span>
            </div>
          </div>

          {/* Key Points (No warnings) */}
          <div className="pt-2 border-t border-stone-200">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span>DataGridView kontrolü üzerinden hızlı ürün ve stok listeleme</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span>Yeni ürün kaydı girişi, veri düzenleme ve silme (CRUD) fonksiyonları</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span>Ürün kodu, adı ve kategoriye göre düzenli filtreleme ve listeleme</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span>Verilerin tek tıkla Excel ve CSV formatlarında dışa aktarılması</span>
              </li>
            </ul>
          </div>

          {/* Tech Badges (Sharp) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-bold text-stone-800 mr-1">Teknolojiler:</span>
            {['C#', '.NET WinForms', 'SQL Server / ADO.NET', 'DataGridView', 'Excel & CSV Export', 'Visual Studio'].map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono text-stone-700 bg-stone-100 px-2 py-0.5 border border-stone-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </article>
      </div>

      {/* Footer link to GitHub & LinkedIn with hover animations */}
      <div className="p-5 bg-white border border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600 shadow-xs">
        <span>Yeni projeler ve açık kaynak kodlarım için profillerimi takip edebilirsiniz:</span>
        <div className="flex items-center gap-4 font-bold">
          <a
            href={CV_DATA.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-stone-800 hover:text-orange-600 transition-colors duration-200 inline-flex items-center gap-1"
          >
            LinkedIn Profili →
          </a>
          <a
            href={CV_DATA.github}
            target="_blank"
            rel="noreferrer"
            className="text-stone-800 hover:text-orange-600 transition-colors duration-200 inline-flex items-center gap-1"
          >
            GitHub Profili →
          </a>
        </div>
      </div>
    </div>
  );
};
