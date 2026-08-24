import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PROGRAM_SECTORS } from '../../data/foundationData';
import { PageRoute, ProgramSector } from '../../types';
import { 
  GraduationCap, 
  HeartPulse, 
  Droplets, 
  Sprout, 
  Users, 
  Tv, 
  CheckCircle2, 
  ArrowRight, 
  Heart,
  Sparkles,
  Rocket
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  GraduationCap,
  HeartPulse,
  Droplets,
  Sprout,
  Users,
  Tv
};

interface ProgramsPageProps {
  setActiveRoute: (route: PageRoute) => void;
  onOpenDonateModal: () => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ setActiveRoute, onOpenDonateModal }) => {
  const { language, t } = useLanguage();
  const [selectedProgram, setSelectedProgram] = useState<ProgramSector>(PROGRAM_SECTORS[0]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-4">
          <span className="px-3.5 py-1.5 bg-amber-500/20 text-amber-300 font-extrabold text-xs rounded-full border border-amber-400/30 uppercase tracking-widest inline-block">
            DAWURO DEVELOPMENT SECTORS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {t('programsTitle')}
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed">
            {t('programsSubtitle')}
          </p>
        </div>

        {/* Sector Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PROGRAM_SECTORS.map((prog) => {
            const IconComponent = iconMap[prog.iconName] || GraduationCap;
            const isActive = selectedProgram.id === prog.id;
            return (
              <button
                key={prog.id}
                onClick={() => setSelectedProgram(prog)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/30' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{t(prog.titleKey)}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Program Showcase Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Program Image Banner */}
          <div className="lg:col-span-6 relative h-80 lg:h-auto min-h-[380px]">
            <img
              src={selectedProgram.bgImage}
              alt={language === 'am' ? (selectedProgram.altAm || t(selectedProgram.titleKey)) : (selectedProgram.altEn || t(selectedProgram.titleKey))}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md text-white border border-white/20">
              <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider block mb-1">
                SECTOR IMPACT RECORD
              </span>
              <p className="text-sm font-bold text-white">
                {selectedProgram.impactMetric}
              </p>
            </div>
          </div>

          {/* Program Content */}
          <div className="lg:col-span-6 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full w-fit">
                <Sparkles className="w-4 h-4" />
                <span>FEATURED PROGRAM SECTOR</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                {t(selectedProgram.titleKey)}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {t(selectedProgram.descKey)}
              </p>

              {/* Core Goals List */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Core Strategic Objectives:
                </h3>
                <div className="space-y-2">
                  {selectedProgram.goals.map((goal, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Future Projects Roadmap */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                  <Rocket className="w-4 h-4 text-blue-600" />
                  <span>Upcoming & Pipeline Projects:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProgram.futureProjects.map((fp, idx) => (
                    <span key={idx} className="text-xs bg-white text-slate-800 font-semibold px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
                      • {fp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-3">
              <button
                onClick={onOpenDonateModal}
                className="flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>Support This Sector</span>
              </button>

              <button
                onClick={() => setActiveRoute('volunteer')}
                className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
              >
                Volunteer for Program
              </button>
            </div>

          </div>

        </div>

        {/* All 6 Sectors Overview Grid */}
        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-black text-slate-900">
            All 6 Foundation Sectors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAM_SECTORS.map((s) => {
              const IconComponent = iconMap[s.iconName] || GraduationCap;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedProgram(s)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                    selectedProgram.id === s.id
                      ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-600/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {t(s.titleKey)}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {t(s.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
