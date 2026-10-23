import React from 'react';
import { Menu, X, FileText, Send, Github, Linkedin } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenContactModal: () => void;
  onOpenCVModal: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const NAV_ITEMS = [
  { id: 'home', label: 'Giriş' },
  { id: 'about', label: 'Hakkımda & Eğitim' },
  { id: 'skills', label: 'Yetkinlikler' },
  { id: 'projects', label: 'Projeler' },
  { id: 'guestbook', label: 'Ziyaretçi Defteri' },
  { id: 'contact', label: 'İletişim' }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenContactModal,
  onOpenCVModal,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf6f0]/95 backdrop-blur-md border-b border-stone-300/80 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo (Sharp corners, no cat icon) */}
        <button
          onClick={() => {
            onSelectTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-none bg-orange-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
            SS
          </div>
          <div>
            <span className="text-sm sm:text-base font-bold text-stone-900 tracking-tight block">
              {CV_DATA.name}
            </span>
            <span className="block text-[11px] text-stone-500 font-normal -mt-0.5">
              Büyük Veri Analistliği & Portföy
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-none transition-colors border-b-2 ${
                  isActive
                    ? 'text-orange-600 border-orange-600 bg-orange-50/50'
                    : 'text-stone-600 hover:text-stone-900 border-transparent hover:border-stone-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Social Links & Action Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          {/* LinkedIn */}
          <a
            href={CV_DATA.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-none text-stone-500 hover:text-orange-600 hover:bg-stone-200/60 transition-colors"
            title="LinkedIn Profili"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* GitHub */}
          <a
            href={CV_DATA.github}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-none text-stone-500 hover:text-orange-600 hover:bg-stone-200/60 transition-colors"
            title="GitHub Profili"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <div className="h-4 w-px bg-stone-300 mx-1" />

          {/* Contact Popup Modal Trigger */}
          <button
            onClick={onOpenContactModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 hover:ring-2 hover:ring-orange-400/50 shadow-xs transition-colors duration-200"
          >
            <Send className="w-3.5 h-3.5" />
            İletişim
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <a
            href={CV_DATA.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-stone-600 hover:text-orange-600"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenContactModal}
            className="p-2 text-orange-600"
            title="İletişim Popup"
            aria-label="İletişim Formu Aç"
          >
            <Send className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-none text-stone-700 hover:text-black"
            aria-label={mobileMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
