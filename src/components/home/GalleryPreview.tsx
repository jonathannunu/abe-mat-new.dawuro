import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { GALLERY_ITEMS } from '../../data/foundationData';
import { GalleryItem, PageRoute } from '../../types';
import { Maximize2, MapPin, Calendar, ArrowRight, X } from 'lucide-react';

export const GalleryPreview: React.FC<{ setActiveRoute: (route: PageRoute) => void }> = ({ setActiveRoute }) => {
  const { language, t } = useLanguage();
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  return (
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full inline-block border border-amber-400/30">
              FIELD DOCUMENTATION & IMPACT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t('galleryTitle')}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t('gallerySub')}
            </p>
          </div>

          <button
            onClick={() => setActiveRoute('gallery')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition-all cursor-pointer w-fit"
          >
            <span>{t('viewGallery')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative h-80 rounded-3xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={item.imageUrl}
                alt={language === 'am' ? (item.altAm || item.titleAm) : (item.altEn || item.titleEn)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900/80 backdrop-blur-md text-amber-300 text-[11px] font-bold rounded-lg border border-white/10">
                {item.category}
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <h3 className="font-extrabold text-sm sm:text-base text-white line-clamp-2">
                  {language === 'am' ? item.titleAm : item.titleEn}
                </h3>
                <div className="flex items-center gap-3 text-slate-300 text-[11px]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-400" />
                    <span>{language === 'am' ? item.locationAm : item.locationEn}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-400" />
                    <span>{item.date}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Light Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.titleEn}
                className="max-h-[70vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-slate-900 text-white space-y-2">
              <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                <span>{activeItem.category}</span>
                <span>{activeItem.date}</span>
              </div>
              <h3 className="text-xl font-bold">
                {language === 'am' ? activeItem.titleAm : activeItem.titleEn}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'am' ? activeItem.descriptionAm : activeItem.descriptionEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
