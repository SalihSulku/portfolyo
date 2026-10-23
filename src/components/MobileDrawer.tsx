import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ChevronRight, FileText, Send, Github, 
  Linkedin, Phone, Mail, MapPin 
} from 'lucide-react';
import { CV_DATA } from '../data/cvData';
import { NAV_ITEMS } from './Navbar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenContact: () => void;
  onOpenCV: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  onOpenContact,
  onOpenCV
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 md:hidden flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
        />

        {/* Slide-in panel (Sharp corners) */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-4/5 max-w-xs h-full bg-[#faf6f0] border-l border-stone-300 p-6 flex flex-col justify-between shadow-xl z-10 overflow-y-auto"
        >
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-5 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-none bg-orange-600 text-white font-mono font-bold flex items-center justify-center text-xs">
                  SS
                </div>
                <div>
                  <span className="font-bold text-sm text-stone-900 block">{CV_DATA.name}</span>
                  <span className="text-[10px] text-stone-500 font-mono">Büyük Veri & Portföy</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-none text-stone-500 hover:text-stone-900"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links (Sharp) */}
            <div className="py-5 space-y-1">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-2 px-2">
                Sayfalar
              </span>
              {NAV_ITEMS.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-none text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'text-stone-700 hover:bg-stone-200/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Social Channels */}
            <div className="pt-3 border-t border-stone-200 space-y-1">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 px-2 mb-1">
                Bağlantılar
              </span>
              <a
                href={CV_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 text-xs text-stone-700 hover:text-orange-600 hover:bg-stone-200/50 rounded-none transition-colors"
              >
                <Linkedin className="w-4 h-4 text-orange-600" />
                <span>LinkedIn Profili</span>
              </a>
              <a
                href={CV_DATA.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 text-xs text-stone-700 hover:text-orange-600 hover:bg-stone-200/50 rounded-none transition-colors"
              >
                <Github className="w-4 h-4 text-orange-600" />
                <span>GitHub (SalihSulku)</span>
              </a>
            </div>

            {/* Actions (Sharp) */}
            <div className="space-y-2 pt-4 border-t border-stone-200">
              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-none text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                İletişim Formunu Aç
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenCV();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-none text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-300"
              >
                <FileText className="w-3.5 h-3.5 text-stone-500" />
                Özgeçmiş (CV)
              </button>
            </div>
          </div>

          {/* Bottom details */}
          <div className="pt-4 border-t border-stone-200 text-[11px] text-stone-500 space-y-1">
            <p className="flex items-center gap-1.5 truncate">
              <Mail className="w-3 h-3 text-orange-600 shrink-0" />
              <span className="truncate">{CV_DATA.email}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-orange-600 shrink-0" />
              <span>{CV_DATA.formattedPhone}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
