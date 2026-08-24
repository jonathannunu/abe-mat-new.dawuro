import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CAMPAIGN_TIMELINE, WOREDA_BENEFICIARIES, DONATION_TIERS } from '../../data/foundationData';
import { PageRoute } from '../../types';
import { 
  Heart, 
  Sparkles, 
  BookOpen, 
  Calendar, 
  Coins, 
  GraduationCap, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';

interface CampaignPageProps {
  setActiveRoute: (route: PageRoute) => void;
  onOpenDonateModal: () => void;
}

export const CampaignPage: React.FC<CampaignPageProps> = ({ setActiveRoute, onOpenDonateModal }) => {
  const { language, t } = useLanguage();
  const [packCount, setPackCount] = useState<number>(5);

  const totalCostEtb = packCount * 1000;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Campaign Hero Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span>FEATURED CAMPAIGN STORY</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
              {t('campaignHeadline')}
            </h1>

            <p className="text-amber-300 font-extrabold text-xl sm:text-2xl">
              "{t('campaignAmharicTitle')}"
            </p>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <p className="text-lg sm:text-xl font-bold italic text-amber-200">
                "{t('campaignTagline')}"
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onOpenDonateModal}
                className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <Heart className="w-5 h-5 fill-slate-950" />
                <span>{t('heroBtnDonate')}</span>
              </button>

              <button
                onClick={() => setActiveRoute('gallery')}
                className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl backdrop-blur-md border border-white/20 transition-all cursor-pointer"
              >
                View Campaign Gallery
              </button>
            </div>

          </div>
        </div>

        {/* Animated Impact Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-2">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black text-slate-900 block">580+</span>
            <span className="text-xs font-bold text-slate-700 block">Students Supported</span>
            <p className="text-xs text-slate-500">Provided with full exercise notebook dozen packs & pens in 2018 E.C.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-2">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit">
              <Coins className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black text-slate-900 block">257,500 ETB</span>
            <span className="text-xs font-bold text-slate-700 block">Community Funds Raised</span>
            <p className="text-xs text-slate-500">Mobilized through local residents and diaspora contributions.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-2">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black text-slate-900 block">4+ Years</span>
            <span className="text-xs font-bold text-slate-700 block">Campaign Duration</span>
            <p className="text-xs text-slate-500">Continuous annual distributions since 2015 E.C.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-2">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl w-fit">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black text-slate-900 block">4 Woredas</span>
            <span className="text-xs font-bold text-slate-700 block">Beneficiary Reach</span>
            <p className="text-xs text-slate-500">Tarcha City, Gena, Zaba Gazo, and Loma Woredas.</p>
          </div>
        </div>

        {/* Campaign Problem vs Solution Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <span className="text-red-600 font-extrabold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full inline-block">
              THE EDUCATIONAL CHALLENGE
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Why Children Were Staying Home
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              In many rural kebeles of Dawuro Zone, agricultural families face extreme seasonal poverty. When the school year begins, parents are often forced to choose between purchasing basic food or buying exercise books for their children.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Without exercise notebooks, pens, and rulers, children are ashamed or barred from attending class, leading to alarming dropout rates among primary school students.
            </p>
          </div>

          <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-800 space-y-4">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full inline-block border border-amber-400/30">
              THE GRASSROOTS SOLUTION
            </span>
            <h2 className="text-2xl font-black text-white">
              One Pack for One Child
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              For just 1000 ETB, New Dawuro Foundation provides 1 complete educational pack containing 1 dozen high-quality exercise notebooks, 6 pens, pencils, a ruler, and protective book covers.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              This simple intervention ensures a student can attend school with dignity for an entire academic year without fear of supply shortages.
            </p>
          </div>

        </div>

        {/* Campaign Timeline (2015 E.C. - 2018 E.C.) */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-blue-700 font-extrabold text-xs uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full inline-block">
              YEAR-BY-YEAR IMPACT
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              {t('timelineTitle')}
            </h2>
            <p className="text-slate-600 text-sm">
              {t('timelineSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAMPAIGN_TIMELINE.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-blue-900">{item.yearEC}</span>
                  <span className="text-[11px] font-bold text-slate-500">{item.yearGC}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-2xl font-extrabold text-emerald-600 block">
                    {item.studentsSupported} Students
                  </span>
                  <span className="text-xs font-semibold text-slate-700 block">
                    {item.etbRaised.toLocaleString()} ETB Raised
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200 pt-2">
                  {language === 'am' ? item.highlightAm : item.highlightEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Woreda Breakdown Cards */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-amber-700 font-extrabold text-xs uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full inline-block">
              GEOGRAPHIC BENEFICIARIES
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              {t('woredaTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WOREDA_BENEFICIARIES.map((w) => (
              <div key={w.id} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-base">
                    {language === 'am' ? w.nameAm : w.nameEn}
                  </span>
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 font-black text-xs rounded-full">
                    {w.students}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'am' ? w.descriptionAm : w.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor a Package Interactive Box */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full uppercase tracking-wider">
              TAKE IMMEDIATE ACTION
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Sponsor Educational Packs for Rural Students
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              Every 1000 ETB keeps a child in school for the entire academic year. 100% of your donation directly buys notebooks and pens.
            </p>
          </div>

          <button
            onClick={onOpenDonateModal}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base rounded-2xl shadow-2xl flex-shrink-0 cursor-pointer transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <Heart className="w-5 h-5 fill-slate-950" />
            <span>Donate to One Pack Campaign</span>
          </button>
        </div>

      </div>
    </div>
  );
};
