import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import logoImg from '../../assets/images/dawuro_foundation_official_logo_1786092990849.jpg';

interface LogoProps {
  variant?: 'light' | 'dark' | 'color';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'color',
  showSubtitle = true,
  className = '',
  onClick
}) => {
  const { language } = useLanguage();

  const textColorClass = variant === 'dark' ? 'text-slate-900 dark:text-slate-100' : variant === 'light' ? 'text-white' : 'text-slate-900 dark:text-slate-100';
  const subColorClass = variant === 'light' ? 'text-amber-300' : 'text-blue-700 dark:text-amber-400';

  return (
    <div 
      className={`flex items-center gap-3 cursor-pointer select-none group ${className}`}
      onClick={onClick}
    >
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-full overflow-hidden shadow-md ring-2 ring-amber-400/80 group-hover:scale-105 transition-transform duration-300 bg-white flex items-center justify-center p-0.5">
        <img
          src={logoImg}
          alt="New Dawuro Foundation Logo"
          className="w-full h-full object-contain rounded-full"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex flex-col">
        <span className={`font-bold tracking-tight text-base sm:text-lg leading-tight ${textColorClass}`}>
          NEW DAWURO <span className="text-amber-500">FOUNDATION</span>
        </span>
        {showSubtitle && (
          <span className={`text-[11px] sm:text-xs font-medium tracking-wide ${subColorClass}`}>
            {language === 'am' ? 'የአዲስ ዳዉሮ ፋውንዴሽን' : 'Tarcha, Dawuro Zone, Ethiopia'}
          </span>
        )}
      </div>
    </div>
  );
};
