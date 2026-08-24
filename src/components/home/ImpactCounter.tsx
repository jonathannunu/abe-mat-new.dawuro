import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { GraduationCap, Coins, Layers, Calendar, ArrowUpRight } from 'lucide-react';

export const ImpactCounter: React.FC<{ onExploreCampaign?: () => void }> = ({ onExploreCampaign }) => {
  const { t } = useLanguage();

  const stats = [
    {
      value: t('statStudents'),
      label: t('statStudentsLabel'),
      desc: t('statStudentsDesc'),
      icon: GraduationCap,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      value: t('statRaised'),
      label: t('statRaisedLabel'),
      desc: t('statRaisedDesc'),
      icon: Coins,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      value: t('statSectors'),
      label: t('statSectorsLabel'),
      desc: t('statSectorsDesc'),
      icon: Layers,
      color: 'from-blue-600 to-indigo-700',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      value: t('statYears'),
      label: t('statYearsLabel'),
      desc: t('statYearsDesc'),
      icon: Calendar,
      color: 'from-purple-600 to-pink-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <section className="relative -mt-10 sm:-mt-14 z-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((st, idx) => {
          const IconComponent = st.icon;
          return (
            <div
              key={idx}
              className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border ${st.borderColor} dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative group overflow-hidden`}
            >
              {/* Subtle accent bar at top */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${st.color}`} />

              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${st.bgColor} dark:bg-slate-800 ${st.textColor}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                {onExploreCampaign && (
                  <button 
                    onClick={onExploreCampaign}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer"
                    title="View Details"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight block">
                  {st.value}
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
                  {st.label}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                  {st.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
