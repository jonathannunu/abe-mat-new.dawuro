import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PROGRAM_SECTORS } from '../../data/foundationData';
import { PageRoute } from '../../types';
import { 
  GraduationCap, 
  HeartPulse, 
  Droplets, 
  Sprout, 
  Users, 
  Tv, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  GraduationCap,
  HeartPulse,
  Droplets,
  Sprout,
  Users,
  Tv
};

export const ProgramsPreview: React.FC<{ setActiveRoute: (route: PageRoute) => void }> = ({ setActiveRoute }) => {
  const { language, t } = useLanguage();

  return (
    <section className="py-20 bg-white dark:bg-slate-950 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-emerald-700 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-widest bg-emerald-100 dark:bg-slate-800 px-3 py-1 rounded-full inline-block">
            OUR MAIN DEVELOPMENT SECTORS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {t('programsTitle')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('programsSubtitle')}
          </p>
        </div>

        {/* 6 Program Sector Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAM_SECTORS.map((sector) => {
            const IconComponent = iconMap[sector.iconName] || GraduationCap;
            return (
              <div
                key={sector.id}
                className="group bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800/80 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Image Top Background Accent */}
                <div className="h-44 -mx-6 -mt-6 mb-6 overflow-hidden relative">
                  <img
                    src={sector.bgImage}
                    alt={language === 'am' ? (sector.altAm || t(sector.titleKey)) : (sector.altEn || t(sector.titleKey))}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Sector Badge */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-2 bg-slate-900/90 text-white px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/20">
                    <IconComponent className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold">{t(sector.titleKey)}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-amber-400 transition-colors">
                    {t(sector.titleKey)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t(sector.descKey)}
                  </p>

                  <div className="pt-2 space-y-1">
                    {sector.goals.slice(0, 2).map((goal, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg">
                    {sector.impactMetric}
                  </span>

                  <button
                    onClick={() => setActiveRoute('programs')}
                    className="flex items-center gap-1 text-xs font-bold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 cursor-pointer"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Programs CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setActiveRoute('programs')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm shadow-lg shadow-blue-700/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{t('viewAllPrograms')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
