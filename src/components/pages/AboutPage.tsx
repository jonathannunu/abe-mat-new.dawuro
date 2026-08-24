import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TEAM_MEMBERS } from '../../data/foundationData';
import { PageRoute } from '../../types';
import { 
  ShieldCheck, 
  Compass, 
  Target, 
  Heart, 
  CheckCircle2, 
  Award, 
  Building2, 
  MapPin, 
  Phone, 
  Mail,
  Users,
  Sparkles
} from 'lucide-react';

interface AboutPageProps {
  setActiveRoute: (route: PageRoute) => void;
  onOpenDonateModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveRoute, onOpenDonateModal }) => {
  const { language, t } = useLanguage();

  const values = [
    {
      titleEn: 'Educational Equity & Dignity',
      titleAm: 'የትምህርት እኩልነት እና ክብር',
      descEn: 'Believing no child should stay home due to lack of basic exercise notebooks and pens.',
      descAm: 'በደብተር እና እስክሪብቶ እጥረት ምክንያት አንድም ልጅ ከትምህርት ቤት መቅረት የለበትም::'
    },
    {
      titleEn: 'Grassroots Community Leadership',
      titleAm: 'የማህበረሰብ አቀፍ መሪነት',
      descEn: 'Founded and operated by native Dawuro community members, elders, and teachers.',
      descAm: 'በዳውሮ አካባቢ ተወላጆች፣ መምህራን እና የማህበረሰብ ጎልማሶች የተመሠረተ::'
    },
    {
      titleEn: '100% Public Transparency',
      titleAm: 'ሙሉ ይፋዊ ግልፅነት',
      descEn: 'Rigorous line-item reporting on every ETB raised from local and diaspora partners.',
      descAm: 'ከተሰበሰበው እያንዳንዱ ብር አጠቃቀም ላይ ግልጽ እና ሁልጊዜ የሚታይ ሪፖርት ማቅረብ::'
    },
    {
      titleEn: 'Cultural Identity Preservation',
      titleAm: 'የባህል እና ማንነት ጥበቃ',
      descEn: 'Honoring and preserving Dawuro linguistic heritage and community values.',
      descAm: 'የዳውሮን ቋንቋ፣ ባህል እና ማህበራዊ እሴቶች መንከባከብ እና ማስፋፋት::'
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="px-3.5 py-1.5 bg-amber-500/20 text-amber-300 font-extrabold text-xs rounded-full border border-amber-400/30 uppercase tracking-widest inline-block">
              ABOUT NEW DAWURO FOUNDATION
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Rooted in Dawuro, Committed to Sustainable Progress
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              New Dawuro Foundation is an officially recognized non-profit civic organization operating in Tarcha, Dawuro Zone, Ethiopia. We empower communities through education, clean water, agriculture, healthcare, elderly care, and media awareness.
            </p>
          </div>
        </div>

        {/* Vision & Mission Core Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-slate-950/10 px-3 py-1 rounded-full w-fit">
                <Compass className="w-4 h-4" />
                <span>FOUNDATION VISION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                "{t('visionText')}"
              </h2>
              <p className="text-lg font-extrabold text-slate-900">
                አማርኛ: "{t('visionAmharicText')}"
              </p>
            </div>
            <p className="text-xs text-slate-900 font-medium pt-6 border-t border-slate-950/20">
              Guiding all our educational programs, scholarship initiatives, and youth development centers across Dawuro Zone.
            </p>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full w-fit">
                <Target className="w-4 h-4" />
                <span>FOUNDATION MISSION</span>
              </div>
              <p className="text-base sm:text-lg font-medium text-slate-200 leading-relaxed">
                To create positive, lasting change in Dawuro Zone through education support, community development, health initiatives, clean water projects, sustainable agriculture, elderly support, and media awareness.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Location: Tarcha, Dawuro Zone</span>
              <span className="text-amber-400 font-bold">6 Active Sectors</span>
            </div>
          </div>

        </div>

        {/* Foundation Story & History */}
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-blue-700 dark:text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-blue-100 dark:bg-slate-800 px-3 py-1 rounded-full inline-block">
              OUR ORIGIN STORY
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-slate-100">
              From Community Initiative to Recognized Civic NGO
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <div className="space-y-4">
              <p>
                New Dawuro Foundation was born from a simple yet profound realization among local teachers, youth leaders, and elders in Tarcha City: bright children in rural Dawuro Zone were dropping out of primary school not because they lacked intellect, but because their families could not afford basic exercise notebooks and pens.
              </p>
              <p>
                In 2015 E.C. (2022 G.C.), the "One Pack for One Child" movement was launched as a small grassroots campaign. By pooling modest contributions from local residents and diaspora supporters, 350 students received complete supply packs in its inaugural year.
              </p>
            </div>

            <div className="space-y-4">
              <p>
                Seeing the transformative impact on school attendance and community morale, the founders formalized the organization into New Dawuro Foundation, expanding operations into clean water spring protection, agricultural training, elderly welfare, and community media broadcasting.
              </p>
              <p>
                Today, the foundation stands as a beacon of public trust, having raised over 257,500 ETB and supported 580+ students across Tarcha City, Gena Woreda, Zaba Gazo Woreda, and Loma Woreda.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-emerald-700 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-widest bg-emerald-100 dark:bg-slate-800 px-3 py-1 rounded-full inline-block">
              GUIDING PRINCIPLES
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-amber-400 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                  {language === 'am' ? v.titleAm : v.titleEn}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'am' ? v.descAm : v.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-amber-700 dark:text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-amber-100 dark:bg-slate-800 px-3 py-1 rounded-full inline-block">
              MEET OUR LEADERSHIP
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">
              Dedicated Executive Board & Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((m) => (
              <div key={m.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm p-6 text-center space-y-4">
                <img
                  src={m.photoUrl}
                  alt={m.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-amber-100 dark:ring-slate-800 shadow"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-slate-100">{m.name}</h3>
                  <p className="text-xs font-bold text-blue-700 dark:text-amber-400">
                    {language === 'am' ? m.roleAm : m.roleEn}
                  </p>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'am' ? m.bioAm : m.bioEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Registration & Governance Box */}
        <div className="bg-slate-900 text-slate-200 p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Award className="w-5 h-5 text-amber-400" />
              <span>OFFICIAL REGISTRATION & GOVERNANCE</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Officially Registered Civil Society Organization
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              New Dawuro Foundation operates under strict Ethiopian Civil Society Organizations Proclamation guidelines. All financial statements are audited annually and submitted to local regulatory bodies in Dawuro Zone.
            </p>
          </div>

          <button
            onClick={onOpenDonateModal}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg flex-shrink-0 cursor-pointer"
          >
            Support Our Organization
          </button>
        </div>

      </div>
    </div>
  );
};
