import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PageRoute } from '../../types';
import { Heart, UserPlus, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

interface ContactCTAProps {
  setActiveRoute: (route: PageRoute) => void;
  onOpenDonateModal: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ setActiveRoute, onOpenDonateModal }) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white relative overflow-hidden">
      
      {/* Decorative Blur Circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/20 rounded-full filter blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-widest border border-amber-400/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>JOIN NEW DAWURO FOUNDATION TODAY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Together We Can Raise an Educated Generation in Dawuro Zone
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you are a community member, diaspora donor, local institution, or international NGO partner, your involvement creates direct, measurable change in Tarcha and surrounding Woredas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenDonateModal}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-slate-950" />
              <span>Sponsor a Child Now</span>
            </button>

            <button
              onClick={() => setActiveRoute('volunteer')}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <UserPlus className="w-5 h-5" />
              <span>Apply as Volunteer</span>
            </button>

            <button
              onClick={() => setActiveRoute('contact')}
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              Contact Our Office
            </button>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-300">
            <a href="tel:+251917411711" className="flex items-center gap-2 hover:text-amber-400">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+251 917 411 711</span>
            </a>
            <span>•</span>
            <a href="mailto:newdawuromedia@gmail.com" className="flex items-center gap-2 hover:text-amber-400">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>newdawuromedia@gmail.com</span>
            </a>
            <span>•</span>
            <span>Tarcha, Dawuro Zone, Ethiopia</span>
          </div>

        </div>
      </div>
    </section>
  );
};
