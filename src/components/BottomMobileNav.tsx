import React from 'react';
import { Home, User, Code2, FolderGit2, Mail, BookOpen } from 'lucide-react';

interface BottomMobileNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const BottomMobileNav: React.FC<BottomMobileNavProps> = ({
  currentTab,
  onSelectTab
}) => {
  const items = [
    { id: 'home', label: 'Giriş', icon: Home },
    { id: 'about', label: 'Hakkımda', icon: User },
    { id: 'skills', label: 'Yetkinlik', icon: Code2 },
    { id: 'projects', label: 'Projeler', icon: FolderGit2 },
    { id: 'guestbook', label: 'Defter', icon: BookOpen },
    { id: 'contact', label: 'İletişim', icon: Mail }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#faf6f0]/95 backdrop-blur-md border-t border-stone-300 px-2 py-1 safe-area-pb shadow-md">
      <div className="grid grid-cols-6 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-none transition-colors ${
                isActive
                  ? 'text-orange-600 font-bold bg-orange-100/60'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[10px] mt-0.5 leading-none ${isActive ? 'text-orange-600 font-bold' : 'text-stone-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
