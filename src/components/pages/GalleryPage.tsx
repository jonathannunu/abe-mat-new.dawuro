import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { GALLERY_ITEMS } from '../../data/foundationData';
import { GalleryItem } from '../../types';
import { Maximize2, MapPin, Calendar, X, Filter, Search, Image as ImageIcon } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'One Pack for One Child Campaign',
    'Tarcha',
    'Gena Woreda',
    'Angala Cluster',
    'Zima Bosa School Support'
  ];

  const filteredItems = GALLERY_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleAm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locationEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-4">
          <span className="px-3.5 py-1.5 bg-amber-500/20 text-amber-300 font-extrabold text-xs rounded-full border border-amber-400/30 uppercase tracking-widest inline-block">
            AUTHENTIC FIELD DOCUMENTATION
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {t('galleryTitle')}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            {t('gallerySub')}
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-700 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'All' ? t('galleryFilterAll') : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search photos & locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600"
              />
            </div>

          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group relative h-80 rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={language === 'am' ? (item.altAm || item.titleAm) : (item.altEn || item.titleEn)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900/80 backdrop-blur-md text-amber-300 text-[11px] font-bold rounded-lg border border-white/10">
                  {item.category}
                </div>

                <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

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
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-2">
            <ImageIcon className="w-10 h-10 mx-auto text-slate-400" />
            <p className="font-bold">No photos found matching your search filter.</p>
          </div>
        )}

      </div>

      {/* Lightbox Zoom Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl my-8">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeItem.imageUrl}
                alt={language === 'am' ? (activeItem.altAm || activeItem.titleAm) : (activeItem.altEn || activeItem.titleEn)}
                className="max-h-[65vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-slate-900 text-white space-y-3">
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
              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{language === 'am' ? activeItem.locationAm : activeItem.locationEn}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
