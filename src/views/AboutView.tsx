import React from 'react';
import { 
  GraduationCap, MapPin, Languages, 
  Linkedin, Github, Compass, Award, ExternalLink 
} from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface AboutViewProps {
  onOpenContact: () => void;
  onOpenCV: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenContact, onOpenCV }) => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b-2 border-stone-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-orange-600 font-bold block mb-1">
          Hakkımda & Vizyon
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Eğitim & Kariyer Yolculuğum
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
          Veri analitiği, regresyon modelleri ve yazılım dünyasına olan ilgimin gelişimi, eğitim geçmişim ve hedeflerim.
        </p>
      </div>

      {/* Main Narrative Card (Sharp) */}
      <article className="bg-white border-2 border-stone-800 p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <Compass className="w-4 h-4 text-orange-600" />
          Kişisel Yaklaşımım & Hedefim
        </h2>
        <div className="space-y-3 text-stone-700 text-sm leading-relaxed">
          <p>
            Manisa Celal Bayar Üniversitesi Büyük Veri Analistliği programı öğrencisiyim. Veri bilimi, makine öğrenmesi algoritmaları ve veri odaklı yazılım mimarileri üzerine yoğunlaşıyorum.
          </p>
          <p>
            Büyük veri kümelerinden anlamlı içgörüler çıkarmak, doğrusal ve istatistiksel modeller kurmak, ilişkisel ve NoSQL veritabanlarını optimize etmek temel odak alanlarımdır. Çalışma hayatımda değer üretebileceğim ve uzmanlığımı pekiştireceğim ön tecrübeler edinmek istiyorum.
          </p>
          <p className="text-stone-600 text-xs sm:text-sm">
            Veri analizinde problem çözmeyi, karmaşık veri tablolarını sade ve anlaşılır raporlara dönüştürmeyi ve algoritma temelli yaklaşımlarla sonuca ulaşmayı seviyorum.
          </p>
        </div>

        {/* Social Links Bar */}
        <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-4 text-xs font-semibold">
          <a
            href={CV_DATA.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-stone-800 hover:text-orange-600 transition-colors"
          >
            <Linkedin className="w-4 h-4 text-orange-600" />
            <span>LinkedIn Profili</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>
          <span className="text-stone-300">•</span>
          <a
            href={CV_DATA.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-stone-800 hover:text-orange-600 transition-colors"
          >
            <Github className="w-4 h-4 text-orange-600" />
            <span>GitHub (SalihSulku)</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>
          <span className="text-stone-300">•</span>
          <span className="flex items-center gap-1 text-stone-600 font-normal">
            <MapPin className="w-3.5 h-3.5 text-orange-600" />
            {CV_DATA.location}
          </span>
        </div>
      </article>

      {/* Education Timeline (Sharp) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-stone-800 pb-2">
          <GraduationCap className="w-4 h-4 text-orange-600" />
          <h2 className="text-base font-bold text-stone-900 uppercase tracking-wide">
            Akademik Geçmiş
          </h2>
        </div>

        <div className="space-y-4">
          {/* MCBU */}
          <div className="bg-white border-2 border-stone-800 p-5 sm:p-6 space-y-3 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <span className="text-[11px] font-mono text-orange-600 font-bold">
                  2025 – Devam Ediyor • Aktif Öğrenim
                </span>
                <h3 className="text-base font-bold text-stone-900 mt-0.5">
                  MANİSA CELÂL BAYAR ÜNİVERSİTESİ
                </h3>
              </div>
              <span className="text-xs text-stone-500 font-mono">Manisa, Türkiye</span>
            </div>

            <p className="text-xs sm:text-sm text-stone-800 font-medium">
              Manisa Teknik Bilimler Meslek Yüksekokulu, İstatistik Bölümü, Büyük Veri Analistliği
            </p>

            <ul className="space-y-1.5 text-xs text-stone-600 pt-1">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>Büyük veri analitiği prensipleri, keşifçi veri analizi (EDA) ve veri ön işleme</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>İstatistiksel modelleme, korelasyon analizleri ve regresyon algoritmaları</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>İlişkisel (SQL) ve doküman/sütun bazlı NoSQL sistemlerin incelenmesi</span>
              </li>
            </ul>
          </div>

          {/* Lise */}
          <div className="bg-white border border-stone-300 p-5 sm:p-6 space-y-2 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <span className="text-[11px] font-mono text-stone-500">
                  2021 – 2025 • Mezun
                </span>
                <h3 className="text-base font-bold text-stone-900 mt-0.5">
                  NURİ ERBAK ANADOLU LİSESİ
                </h3>
              </div>
              <span className="text-xs text-stone-500 font-mono">Bursa, Türkiye</span>
            </div>

            <p className="text-xs text-stone-600">
              Eşit Ağırlık / Türkçe & Matematik Alanı — Matematiksel modelleme, analitik düşünme ve mantıksal problem çözme disiplini.
            </p>
          </div>
        </div>
      </section>

      {/* Languages & Staj (Sharp) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Language */}
        <div className="bg-white border border-stone-300 p-5 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <Languages className="w-4 h-4 text-orange-600" />
            <h3 className="text-sm font-bold text-stone-900">Yabancı Dil</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-stone-800">İngilizce</span>
              <span className="text-orange-600 font-mono font-bold">Orta – İleri Düzey (B2-C1)</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Yabancı kaynaklardan teknik dokümantasyon takibi, GitHub repo incelemeleri ve akademik veri analitiği literatürünü rahatlıkla anlama.
            </p>
            <div className="flex justify-between items-center pt-2 border-t border-stone-200">
              <span className="font-semibold text-stone-800">Türkçe</span>
              <span className="text-stone-500">Anadil</span>
            </div>
          </div>
        </div>

        {/* Working Style / Staj */}
        <div className="bg-white border border-stone-300 p-5 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-orange-600" />
            <h3 className="text-sm font-bold text-stone-900">Çalışma & Staj Hedefi</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Teorik istatistik ve büyük veri analitiği bilgisini gerçek projelerde sınamak, veri odaklı ekiplere katkı sağlamak ve sektörel deneyim kazanmak istiyorum.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenContact}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
            >
              Görüşme ve staj teklifleri için iletişime geçin →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
