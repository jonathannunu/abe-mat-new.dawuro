import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { PageRoute } from '../../types';
import { Logo } from './Logo';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Menu, 
  X, 
  Heart, 
  BookOpen, 
  ChevronRight,
  ShieldAlert,
  Sun,
  Moon
} from 'lucide-react';

interface HeaderProps {
  activeRoute: PageRoute;
  setActiveRoute: (route: PageRoute) => void;
  onOpenDonateModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeRoute,
  setActiveRoute,
  onOpenDonateModal
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { route: PageRoute; labelKey: string }[] = [
    { route: 'home', labelKey: 'navHome' },
    { route: 'about', labelKey: 'navAbout' },
    { route: 'programs', labelKey: 'navPrograms' },
    { route: 'campaign', labelKey: 'navCampaign' },
    { route: 'gallery', labelKey: 'navGallery' },
    { route: 'news', labelKey: 'navNews' },
    { route: 'contact', labelKey: 'navContact' },
    { route: 'gmail', labelKey: 'navGmail' },
  ];

  const handleNavClick = (route: PageRoute) => {
    setActiveRoute(route);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-200">
      {/* Top Utility Contact Bar */}
      <div className="bg-slate-900 dark:bg-slate-950 text-slate-200 text-xs py-2 px-3 sm:px-6 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Contact Fast Info */}
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            <a 
              href="tel:+251917411711" 
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+251 917 411 711</span>
            </a>
            <a 
              href="mailto:newdawuromedia@gmail.com" 
              className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span className="truncate max-w-[180px] md:max-w-none">newdawuromedia@gmail.com</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Dawro Zone, Tarcha, Ethiopia</span>
            </div>
          </div>

          {/* Right Action Bar, Dark Mode & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition-all cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium text-xs border border-slate-700 transition-all cursor-pointer"
              title="Switch Language / ቋንቋ ይቀይሩ"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'en' ? 'አማርኛ' : 'English'}</span>
            </button>

            {/* Admin Portal Link */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`hidden lg:flex items-center gap-1 text-[11px] px-2 py-0.5 rounded ${activeRoute === 'admin' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <ShieldAlert className="w-3 h-3" />
              <span>CMS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo onClick={() => handleNavClick('home')} />

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeRoute === item.route;
            const isCampaign = item.route === 'campaign';
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  isActive 
                    ? 'text-blue-700 dark:text-amber-400 font-bold bg-blue-50/80 dark:bg-slate-800/80' 
                    : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-amber-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {t(item.labelKey)}
                {isCampaign && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-extrabold rounded-full animate-bounce">
                    580+
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('volunteer')}
            className="text-xs font-semibold px-3.5 py-2 text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            {t('navVolunteer')}
          </button>
          <button
            onClick={onOpenDonateModal}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white/20 animate-pulse" />
            <span>{t('navDonate')}</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenDonateModal}
            className="sm:hidden flex items-center gap-1 bg-emerald-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold shadow active:scale-95 transition-transform"
          >
            <Heart className="w-3.5 h-3.5 fill-white/20" />
            <span>Donate</span>
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200 text-slate-800 dark:text-slate-100">
          <div className="grid gap-1">
            {navItems.map((item) => {
              const isActive = activeRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-colors ${
                    isActive 
                      ? 'bg-blue-600 dark:bg-amber-500 text-white dark:text-slate-950 font-bold' 
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{t(item.labelKey)}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white dark:text-slate-950' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid gap-2">
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Appearance Mode</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Dark Theme</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-600" />
                    <span>Light Theme</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => handleNavClick('volunteer')}
              className="w-full text-center py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {t('navVolunteer')}
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenDonateModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold shadow"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{t('navDonate')}</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-center py-2 text-xs text-slate-500 dark:text-slate-400 underline"
            >
              CMS Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

