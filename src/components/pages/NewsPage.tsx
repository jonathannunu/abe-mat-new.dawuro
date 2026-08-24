import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { NEWS_ARTICLES } from '../../data/foundationData';
import { NewsArticle } from '../../types';
import { Calendar, Download, FileText, ArrowRight, X, Eye, Newspaper, ShieldCheck } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-4">
          <span className="px-3.5 py-1.5 bg-amber-500/20 text-amber-300 font-extrabold text-xs rounded-full border border-amber-400/30 uppercase tracking-widest inline-block">
            COMMUNITY MEDIA & REPORTS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {t('newsTitle')}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            {t('newsSub')}
          </p>
        </div>

        {/* Featured Report Download Box */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-amber-300">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-slate-950/10 px-3 py-1 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>OFFICIAL ANNUAL AUDIT REPORT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Annual Activity & Financial Audit Report (2024/2025 - 2017 E.C.)
            </h2>
            <p className="text-xs sm:text-sm font-semibold max-w-2xl text-slate-900">
              Complete line-item transparency on all funds raised and disbursed for school material distributions and water projects in Dawuro Zone.
            </p>
          </div>

          <button
            onClick={() => {
              alert('Downloading official PDF: New_Dawuro_Foundation_Annual_Report_2024_2025.pdf');
            }}
            className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white font-black text-sm rounded-2xl shadow-xl flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <Download className="w-5 h-5 text-amber-400" />
            <span>Download PDF Report</span>
          </button>
        </div>

        {/* News Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-52 overflow-hidden">
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
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{article.date}</span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                    {language === 'am' ? article.titleAm : article.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {language === 'am' ? article.summaryAm : article.summaryEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    By {article.author}
                  </span>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Read Full</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl my-8 border border-slate-100 max-h-[85vh] flex flex-col">
            
            <div className="p-6 bg-slate-900 text-white relative">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">
                {selectedArticle.category} • {selectedArticle.date}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white pr-8">
                {language === 'am' ? selectedArticle.titleAm : selectedArticle.titleEn}
              </h2>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-slate-700 text-sm leading-relaxed">
              <img
                src={selectedArticle.imageUrl}
                alt={language === 'am' ? (selectedArticle.altAm || selectedArticle.titleAm) : (selectedArticle.altEn || selectedArticle.titleEn)}
                className="w-full h-56 object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />

              <p className="font-semibold text-slate-900">
                {language === 'am' ? selectedArticle.summaryAm : selectedArticle.summaryEn}
              </p>

              <p>
                {language === 'am' ? selectedArticle.contentAm : selectedArticle.contentEn}
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
                Published officially by <span className="font-bold">{selectedArticle.author}</span> for New Dawuro Foundation.
              </div>
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 text-right">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
