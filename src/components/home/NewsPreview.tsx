import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { NEWS_ARTICLES } from '../../data/foundationData';
import { PageRoute } from '../../types';
import { FileText, Download, Calendar, ArrowRight, Newspaper } from 'lucide-react';

export const NewsPreview: React.FC<{ setActiveRoute: (route: PageRoute) => void }> = ({ setActiveRoute }) => {
  const { language, t } = useLanguage();

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-blue-700 dark:text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-blue-100 dark:bg-slate-800 px-3 py-1 rounded-full inline-block">
              PUBLIC TRANSPARENCY & FIELD UPDATES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {t('newsTitle')}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {t('newsSub')}
            </p>
          </div>

          <button
            onClick={() => setActiveRoute('news')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer w-fit"
          >
            <span>View All News & Reports</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={language === 'am' ? (article.altAm || article.titleAm) : (article.altEn || article.titleEn)}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-slate-900/90 text-amber-300 text-[11px] font-bold rounded-lg backdrop-blur-md">
                  {article.category}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-400 text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{article.date}</span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 leading-snug hover:text-blue-700 dark:hover:text-amber-400 transition-colors">
                    {language === 'am' ? article.titleAm : article.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {language === 'am' ? article.summaryAm : article.summaryEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    By {article.author}
                  </span>

                  {article.downloadUrl ? (
                    <a
                      href={article.downloadUrl}
                      download
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Downloading official document: ${article.titleEn}`);
                      }}
                      className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-800 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => setActiveRoute('news')}
                      className="flex items-center gap-1 text-xs font-bold text-blue-700 dark:text-blue-400 hover:text-blue-900 cursor-pointer"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
