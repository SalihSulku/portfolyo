import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface SkillsViewProps {
  onNavigateProjects: () => void;
}

export const SkillsView: React.FC<SkillsViewProps> = ({ onNavigateProjects }) => {
  const [selectedCat, setSelectedCat] = useState<string>('Hepsi');

  const categories = ['Hepsi', ...CV_DATA.skillCategories.map((c) => c.title)];

  const allSkills = CV_DATA.skillCategories.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, category: cat.title }))
  );

  const filtered = allSkills.filter((s) => {
    return selectedCat === 'Hepsi' || s.category === selectedCat;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b-2 border-stone-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-orange-600 font-bold block mb-1">
          Yetenekler & Ekosistem
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Teknik Yetkinlikler
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
          Veri analitiği, regresyon modelleme, veritabanı yönetimi ve masaüstü yazılım geliştirme süreçlerinde kullandığım teknolojiler.
        </p>
      </div>

      {/* Category Filter Bar (Equalized, semi-transparent modern styling) */}
      <div className="p-2 sm:p-2.5 bg-white/75 backdrop-blur-xs border border-stone-300/80 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 w-full">
          {categories.map((c, i) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-2 py-2 sm:py-2.5 rounded-none text-xs font-bold transition-all duration-200 flex items-center justify-center text-center leading-tight ${
                i === 0 ? 'col-span-2 sm:col-span-1' : 'col-span-1'
              } ${
                selectedCat === c
                  ? 'bg-orange-600/90 text-white shadow-xs'
                  : 'bg-white/40 hover:bg-white/80 text-stone-700 hover:text-stone-900 border border-stone-200/70 hover:border-orange-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid (Sharp Cards, preserved dimensions, NO percentage numbers, stationary hover border) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((skill, idx) => (
          <div
            key={idx}
            className="p-5 bg-white border border-stone-300 hover:border-orange-600 transition-colors duration-200 flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-orange-600 font-bold">
                  {skill.tag}
                </span>
                <span className="text-[10px] font-mono text-stone-600 bg-stone-100 px-2 py-0.5 border border-stone-300">
                  {skill.level}
                </span>
              </div>

              <h3 className="text-base font-bold text-stone-900">
                {skill.name}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed mt-2">
                {skill.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500 font-mono">
              <span>Yetkinlik Alanı</span>
              <span className="text-stone-800 font-semibold">{skill.tag}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Link to projects with color transition */}
      <div className="p-4 bg-white border border-stone-300 text-xs text-stone-600 flex items-center justify-between gap-4 shadow-xs">
        <span>Projelerimde bu teknolojilerin nasıl kullanıldığını görmek ister misiniz?</span>
        <button
          onClick={onNavigateProjects}
          className="shrink-0 font-bold text-orange-600 hover:text-orange-700 transition-colors duration-200 inline-flex items-center gap-1"
        >
          Projeleri İncele <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
