import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { WOREDA_BENEFICIARIES } from '../../data/foundationData';
import { WoredaImpact } from '../../types';
import { MapPin, Users, Award, Compass, ChevronRight } from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedWoreda, setSelectedWoreda] = useState<WoredaImpact>(WOREDA_BENEFICIARIES[0]);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-blue-700 dark:text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-blue-100 dark:bg-slate-800 px-3 py-1 rounded-full inline-block">
            GEOGRAPHIC BENEFICIARY COVERAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {t('woredaTitle')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('woredaSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          
          {/* Visual Interactive Dawuro Map Canvas */}
          <div className="lg:col-span-7 relative bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 min-h-[380px] flex flex-col justify-between overflow-hidden text-white border border-slate-800">
            
            {/* Stylized Topographic Map Background SVG */}
            <svg 
              className="absolute inset-0 w-full h-full opacity-20" 
              viewBox="0 0 500 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M50 100 Q150 50 250 120 T450 100 L450 350 L50 350 Z" stroke="#3B82F6" strokeWidth="2" fill="#1E3A8A" opacity="0.3" />
              <path d="M100 150 Q200 80 300 180 T420 160" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="240" cy="180" r="120" stroke="#10B981" strokeWidth="1" opacity="0.4" />
            </svg>

            {/* Map Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>DAWURO ZONE, TARCHA • ETHIOPIA REGIONAL COVERAGE</span>
              </div>
              <span className="text-[10px] bg-blue-900/80 text-blue-200 px-2 py-0.5 rounded font-mono">
                Total: 580 Students
              </span>
            </div>

            {/* Interactive Pins on Map Canvas */}
            <div className="relative z-10 my-12 h-64 w-full">
              {WOREDA_BENEFICIARIES.map((w) => {
                const isSelected = selectedWoreda.id === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWoreda(w)}
                    style={{ left: `${w.coordinates.x}%`, top: `${w.coordinates.y}%` }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all cursor-pointer group flex flex-col items-center ${
                      isSelected ? 'scale-125 z-30' : 'scale-100 z-10 hover:scale-110'
                    }`}
                  >
                    {/* Glowing Ripple Pulse */}
                    <span className={`absolute w-8 h-8 rounded-full ${isSelected ? 'bg-amber-500 animate-ping opacity-75' : 'bg-blue-500 opacity-30'}`} />

                    {/* Pin Icon */}
                    <div className={`p-2 rounded-full shadow-lg ${isSelected ? 'bg-amber-500 text-slate-950 font-black' : 'bg-blue-600 text-white'}`}>
                      <MapPin className="w-5 h-5" />
                    </div>

                    {/* Pin Label */}
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full mt-1 whitespace-nowrap shadow ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-200'
                    }`}>
                      {language === 'am' ? w.nameAm : w.nameEn} ({w.students})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="relative z-10 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-3">
              <span>Click pins or cards to inspect beneficiary details</span>
              <span className="text-amber-400 font-bold">100% Transparency Verified</span>
            </div>

          </div>

          {/* Selected Location Detail Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-md">
                Selected Beneficiary Zone
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                {language === 'am' ? selectedWoreda.nameAm : selectedWoreda.nameEn}
              </h3>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Student Beneficiaries Supported:</span>
                <span className="text-xl font-black text-blue-900 dark:text-amber-300">{selectedWoreda.students} Students</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  <span>Share of Total 580 Campaign Goal</span>
                  <span>{selectedWoreda.percentage}%</span>
                </div>
                <div className="w-full h-3 bg-blue-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${selectedWoreda.percentage}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {language === 'am' ? selectedWoreda.descriptionAm : selectedWoreda.descriptionEn}
              </p>
            </div>

            {/* All Woreda Selector List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                All 4 Beneficiary Locations:
              </span>

              <div className="grid grid-cols-2 gap-2">
                {WOREDA_BENEFICIARIES.map((w) => {
                  const active = selectedWoreda.id === w.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWoreda(w)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        active 
                          ? 'border-blue-600 bg-blue-600 text-white shadow-md' 
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span>{language === 'am' ? w.nameAm : w.nameEn}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${active ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                        {w.students}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
