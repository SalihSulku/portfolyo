import React from 'react';
import { 
  ArrowRight, FileText, Github, Linkedin, 
  Mail, MapPin, GraduationCap, ArrowUpRight 
} from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onOpenContact: () => void;
  onOpenCV: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  onNavigate, 
  onOpenContact, 
  onOpenCV 
}) => {
  return (
    <div className="space-y-10">
      {/* Editorial Profile Header Card (Sharp Corners) */}
      <section className="bg-white border-2 border-stone-800 p-6 sm:p-10 space-y-6 shadow-sm">
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2 text-stone-600">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span className="font-semibold text-stone-800">Ön Tecrübe & Staj Fırsatlarına Açık</span>
            <span className="text-stone-300">•</span>
            <span className="flex items-center gap-1 text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-orange-600" />
              {CV_DATA.location}
            </span>
          </div>

          <div className="flex items-center gap-3 font-medium">
            <a
              href={CV_DATA.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-stone-700 hover:text-orange-600 transition-colors flex items-center gap-1 text-xs"
            >
              <Linkedin className="w-3.5 h-3.5 text-orange-600" />
              LinkedIn
            </a>
            <span className="text-stone-300">•</span>
            <a
              href={CV_DATA.github}
              target="_blank"
              rel="noreferrer"
              className="text-stone-700 hover:text-orange-600 transition-colors flex items-center gap-1 text-xs"
            >
              <Github className="w-3.5 h-3.5 text-orange-600" />
              GitHub
            </a>
          </div>
        </div>

        {/* Main Title & Bio */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-orange-600 font-bold block">
            Kişisel Portföy
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Merhaba, ben Salih Sülkü.
          </h1>
          <p className="text-base sm:text-lg text-orange-700 font-semibold">
            Büyük veri analitiği, makine öğrenmesi ve veri odaklı yazılım süreçleri üzerine çalışıyorum.
          </p>
        </div>

        {/* Academic Card (Sharp) */}
        <div className="flex items-start gap-3.5 p-4 bg-[#faf6f0] border border-stone-300">
          <div className="w-8 h-8 rounded-none bg-orange-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-stone-900 block text-sm">
              Manisa Celâl Bayar Üniversitesi
            </span>
            <span className="text-stone-600 block mt-0.5">
              İstatistik Bölümü • Büyük Veri Analistliği (2025 – Devam Ediyor)
            </span>
          </div>
        </div>

        {/* Action Buttons (Sharp with color highlight) */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-orange-600 hover:bg-orange-700 hover:ring-2 hover:ring-orange-400/40 text-white text-xs font-bold transition-all duration-200 shadow-xs"
          >
            Projelerimi İncele
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-white hover:bg-orange-50 text-stone-900 border-2 border-stone-800 hover:border-orange-600 hover:text-orange-600 text-xs font-bold transition-all duration-200 shadow-xs"
          >
            <Mail className="w-3.5 h-3.5 text-orange-600" />
            İletişim Kur
          </button>

          <button
            onClick={onOpenCV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none text-stone-600 hover:text-orange-600 text-xs font-semibold transition-colors duration-200"
          >
            <FileText className="w-3.5 h-3.5 text-stone-500" />
            Özgeçmiş (CV Önizle)
          </button>
        </div>
      </section>

      {/* Featured Projects Teaser */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-stone-800 pb-2">
          <h2 className="text-base font-bold text-stone-900 uppercase tracking-wide">
            Öne Çıkan Projeler
          </h2>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs text-orange-600 hover:text-orange-700 font-bold inline-flex items-center gap-1"
          >
            Tüm Projeleri Gör <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CV_DATA.projects.map((p) => (
            <div
              key={p.id}
              onClick={() => onNavigate('projects')}
              className="p-5 bg-white border border-stone-300 hover:border-orange-600 transition-all cursor-pointer group flex flex-col justify-between shadow-xs"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-orange-600 font-bold block mb-1">
                  {p.category}
                </span>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mt-2 line-clamp-3">
                  {p.shortDesc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-stone-500">
                  {p.technologies.slice(0, 3).join(' • ')}
                </span>
                <span className="text-orange-600 font-bold inline-flex items-center gap-1 text-xs group-hover:translate-x-0.5 transition-transform">
                  Detaylar <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Summary Strip */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-stone-800 pb-2">
          <h2 className="text-base font-bold text-stone-900 uppercase tracking-wide">
            Teknik Yetkinlikler
          </h2>
          <button
            onClick={() => onNavigate('skills')}
            className="text-xs text-orange-600 hover:text-orange-700 font-bold inline-flex items-center gap-1"
          >
            Tüm Yetkinlikleri İncele <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-4 bg-white border border-stone-300 shadow-xs">
            <span className="font-bold text-stone-900 block mb-0.5">Diller</span>
            <span className="text-stone-600 font-mono text-[11px]">Python, SQL, C#</span>
          </div>
          <div className="p-4 bg-white border border-stone-300 shadow-xs">
            <span className="font-bold text-stone-900 block mb-0.5">Veritabanları</span>
            <span className="text-stone-600 font-mono text-[11px]">SQL Server, MongoDB, Cassandra</span>
          </div>
          <div className="p-4 bg-white border border-stone-300 shadow-xs">
            <span className="font-bold text-stone-900 block mb-0.5">Veri Analitiği</span>
            <span className="text-stone-600 font-mono text-[11px]">Pandas, Seaborn, Excel</span>
          </div>
          <div className="p-4 bg-white border border-stone-300 shadow-xs">
            <span className="font-bold text-stone-900 block mb-0.5">Araçlar</span>
            <span className="text-stone-600 font-mono text-[11px]">VS, Colab, Jupyter, GitHub</span>
          </div>
        </div>
      </section>

      {/* Closing Call-to-action */}
      <section className="p-6 bg-white border-2 border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-700 shadow-sm">
        <div>
          <h3 className="font-bold text-stone-900 text-sm">Birlikte Çalışalım</h3>
          <p className="text-stone-600 mt-0.5">
            Büyük veri analitiği veya staj olanakları için dilediğiniz zaman iletişime geçebilirsiniz.
          </p>
        </div>
        <button
          onClick={onOpenContact}
          className="shrink-0 px-4 py-2 bg-orange-600 hover:bg-orange-700 hover:ring-2 hover:ring-orange-400/40 text-white font-bold transition-all duration-200 shadow-xs"
        >
          Mesaj Gönder
        </button>
      </section>
    </div>
  );
};
