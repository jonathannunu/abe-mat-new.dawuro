import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CAMPAIGN_TIMELINE, WOREDA_BENEFICIARIES } from '../../data/foundationData';
import { PageRoute } from '../../types';
import { 
  Heart, 
  BookOpen, 
  Sparkles, 
  MapPin, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  Calculator
} from 'lucide-react';

interface FeaturedCampaignProps {
  setActiveRoute: (route: PageRoute) => void;
  onOpenDonateModal: () => void;
}

export const FeaturedCampaign: React.FC<FeaturedCampaignProps> = ({
  setActiveRoute,
  onOpenDonateModal
}) => {
  const { language, t } = useLanguage();
  const [interactivePacks, setInteractivePacks] = useState<number>(5);

  const calculatedEtb = interactivePacks * 1000;

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      
      {/* Background Accent Graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Campaign Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span>FLAGSHIP CAMPAIGN</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              {t('campaignHeadline')}
            </h2>
            <p className="text-amber-300 font-bold text-lg mt-1">
              "{t('campaignAmharicTitle')}"
            </p>
          </div>

          <button
            onClick={() => setActiveRoute('campaign')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all cursor-pointer"
          >
            <span>Full Campaign Story & Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Campaign Narrative & Quote */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Motto Box */}
            <div className="p-6 rounded-3xl bg-amber-500/15 border-2 border-amber-400/40 backdrop-blur-md">
              <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider block mb-1">
                CAMPAIGN CORE PRINCIPLE
              </span>
              <p className="text-xl sm:text-2xl font-black italic text-amber-200 leading-snug">
                "{t('campaignTagline')}"
              </p>
            </div>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {t('campaignPurpose')}
            </p>

            {/* Campaign Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-2xl sm:text-3xl font-black text-amber-400 block">580+</span>
                <span className="text-xs text-slate-300 font-semibold">Students Supported</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">257.5K</span>
                <span className="text-xs text-slate-300 font-semibold">ETB Raised</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-2xl sm:text-3xl font-black text-blue-400 block">4 Woredas</span>
                <span className="text-xs text-slate-300 font-semibold">Beneficiary Areas</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-2xl sm:text-3xl font-black text-purple-400 block">4+ Years</span>
                <span className="text-xs text-slate-300 font-semibold">Continuous Record</span>
              </div>
            </div>

            {/* Beneficiary Woreda Badges */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Primary Distribution Woredas:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {WOREDA_BENEFICIARIES.map((w) => (
                  <div key={w.id} className="p-3 bg-white/10 rounded-xl border border-white/15 text-xs">
                    <span className="font-bold text-white block">{language === 'am' ? w.nameAm : w.nameEn}</span>
                    <span className="text-amber-300 font-bold">{w.students} Students</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Impact Calculator Box */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-400/30 dark:border-amber-500/40">
            <div className="flex items-center gap-2 text-blue-800 dark:text-amber-400 font-extrabold text-xs uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4 text-amber-500" />
              <span>DIRECT IMPACT CALCULATOR</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-1">
              How Many Students Will You Support?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-6">
              1 Student Pack = 1 Dozen Exercise Notebooks + Pens + Supplies (1000 ETB).
            </p>

            {/* Slider Control */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Number of Children:</span>
                <span className="text-2xl font-black text-blue-900 dark:text-amber-300 bg-blue-50 dark:bg-slate-800 px-3 py-1 rounded-xl">
                  {interactivePacks} {interactivePacks === 1 ? 'Child' : 'Children'}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="50"
                value={interactivePacks}
                onChange={(e) => setInteractivePacks(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              <div className="flex justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <span>1 Child</span>
                <span>25 Children</span>
                <span>50 Children</span>
              </div>
            </div>

            {/* Total Cost Display */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white space-y-1 mb-6">
              <div className="flex justify-between items-center text-xs opacity-90">
                <span>Total Contribution Needed:</span>
                <span className="font-bold">1 Pack = 1000 ETB</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-black">{calculatedEtb.toLocaleString()} ETB</span>
                <span className="text-xs font-extrabold text-amber-300">{interactivePacks} {interactivePacks === 1 ? 'Student Pack' : 'Student Packs'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={onOpenDonateModal}
              className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Heart className="w-5 h-5 fill-slate-950" />
              <span>Sponsor {interactivePacks} Student Packs Now</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
