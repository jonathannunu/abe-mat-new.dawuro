import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PageRoute } from '../../types';
import { Heart, ArrowRight, BookOpen, Users, Award, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  setActiveRoute: (route: PageRoute) => void;
  onOpenDonateModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setActiveRoute,
  onOpenDonateModal
}) => {
  const { language, t } = useLanguage();

  return (
    <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
      
      {/* Background Image Overlay with Dark Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/campaigns/one_pack_distribution_real.jpg"
          alt={t('heroRealAlt')}
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-blue-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      {/* Decorative Brand Accent Grid */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-left">
        <div className="max-w-3xl space-y-6">
          
          {/* Top Organization Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-inner">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{t('brandName')} • Dawuro Zone, Tarcha, Ethiopia</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white drop-shadow-md">
            {t('heroTitle')}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-200 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
            {t('heroSubtitle')}
          </p>

          {/* Amharic Vision Banner */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-4 max-w-xl">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-300 font-bold block">
                {t('ourVisionTitle')}
              </span>
              <p className="text-sm sm:text-base font-bold text-white tracking-wide">
                "{t('visionAmharicText')}" — {t('visionText')}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenDonateModal}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-slate-950" />
              <span>{t('heroBtnDonate')}</span>
            </button>

            <button
              onClick={() => setActiveRoute('campaign')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm sm:text-base shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{t('heroBtnCampaign')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveRoute('about')}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              {t('readMoreAbout')}
            </button>
          </div>

          {/* Key Metric Quick Ticker */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 max-w-2xl text-xs text-slate-300">
            <div>
              <span className="block font-black text-amber-400 text-lg sm:text-xl">580+</span>
              <span>Students Supported</span>
            </div>
            <div>
              <span className="block font-black text-emerald-400 text-lg sm:text-xl">257,500 ETB</span>
              <span>Community Raised</span>
            </div>
            <div>
              <span className="block font-black text-blue-400 text-lg sm:text-xl">4 Woredas</span>
              <span>Beneficiary Reach</span>
            </div>
            <div>
              <span className="block font-black text-purple-400 text-lg sm:text-xl">4+ Years</span>
              <span>Campaign History</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
