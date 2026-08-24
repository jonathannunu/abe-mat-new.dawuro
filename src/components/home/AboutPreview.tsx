import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PageRoute } from '../../types';
import { Target, Compass, Sparkles, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';

export const AboutPreview: React.FC<{ setActiveRoute: (route: PageRoute) => void }> = ({ setActiveRoute }) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image & Vision Badge Visual Stack */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <img
                src="/images/campaigns/one_pack_distribution_real.jpg"
                alt={t('heroRealAlt')}
                className="w-full h-[400px] sm:h-[480px] object-cover object-top hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md text-white border border-slate-700">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block mb-1">
                  OFFICIAL CIVIC NGO
                </span>
                <p className="text-xs text-slate-200">
                  Registered civic foundation operating in Tarcha, Gena, Zaba Gazo, and Loma Woredas.
                </p>
              </div>
            </div>

            {/* Floating Vision Badge */}
            <div className="absolute -top-6 -right-4 sm:-right-6 p-5 rounded-3xl bg-amber-500 text-slate-950 shadow-2xl max-w-xs border-2 border-amber-300 transform rotate-2 hidden sm:block">
              <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>FOUNDATION VISION</span>
              </div>
              <p className="font-extrabold text-sm sm:text-base leading-tight">
                "{t('visionAmharicText')}"
              </p>
              <span className="text-xs font-semibold block text-slate-900 mt-1">
                ({t('visionText')})
              </span>
            </div>
          </div>

          {/* Text & Mission Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <span className="text-blue-700 dark:text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-blue-100 dark:bg-slate-800 px-3 py-1 rounded-full w-fit block">
                ORGANIZATION STORY
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                {t('aboutHeadline')}
              </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {t('aboutBrief')}
            </p>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  <Compass className="w-5 h-5 text-amber-500" />
                  <span>{t('ourVisionTitle')}</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  "{t('visionText')}"
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Amharic: {t('visionAmharicText')}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  <Target className="w-5 h-5 text-emerald-500" />
                  <span>{t('ourMissionTitle')}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  {t('ourMissionDesc')}
                </p>
              </div>

            </div>

            {/* Action Link */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => setActiveRoute('about')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>{t('readMoreAbout')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveRoute('contact')}
                className="px-5 py-3.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 font-bold text-sm transition-colors cursor-pointer"
              >
                {t('navContact')}
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
