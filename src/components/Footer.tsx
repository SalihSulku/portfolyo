import React from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUp, FileText, Send } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenContact: () => void;
  onOpenCV: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenContact,
  onOpenCV
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-stone-300 bg-[#f7f2ea]/90 text-stone-600 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-300">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-none bg-orange-600 text-white font-mono font-bold flex items-center justify-center text-xs shadow-xs">
              SS
            </div>
            <div>
              <span className="font-bold text-stone-900 block text-sm">
                {CV_DATA.name}
              </span>
              <span className="text-[11px] text-stone-500">
                Büyük Veri Analistliği & Portföy • Bursa, Türkiye
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href={CV_DATA.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-stone-700 hover:text-orange-600 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-orange-600" />
              <span>LinkedIn</span>
            </a>
            <span className="text-stone-300">•</span>
            <a
              href={CV_DATA.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-stone-700 hover:text-orange-600 transition-colors"
            >
              <Github className="w-4 h-4 text-orange-600" />
              <span>GitHub</span>
            </a>
            <span className="text-stone-300">•</span>
            <button
              onClick={onOpenContact}
              className="text-stone-700 hover:text-orange-600 transition-colors"
            >
              İletişim
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <div>
            <span>© {new Date().getFullYear()} Salih Sülkü • Kişisel Portföy & CV</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCV}
              className="hover:text-stone-900 transition-colors"
            >
              Özgeçmiş (CV)
            </button>
            <span>•</span>
            <a href="/cerez-politikasi" className="hover:text-stone-900 transition-colors">
              Çerez Politikası
            </a>
            <span>•</span>
            <a href="/giris" className="hover:text-stone-900 transition-colors">
              Yönetici
            </a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-stone-900 flex items-center gap-1 transition-colors"
            >
              <span>Yukarı çık</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
