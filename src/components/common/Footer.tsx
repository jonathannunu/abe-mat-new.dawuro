import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PageRoute } from '../../types';
import { Logo } from './Logo';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Check, 
  Globe, 
  Share2, 
  Award,
  ArrowUp,
  Facebook,
  Youtube,
  Instagram,
  MessageCircle,
  Video,
  ExternalLink,
  Radio
} from 'lucide-react';

interface FooterProps {
  setActiveRoute: (route: PageRoute) => void;
  onOpenDonateModal: () => void;
}

interface SocialPlatform {
  id: string;
  name: string;
  handle: string;
  description: string;
  descriptionAm: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
  hoverBorder: string;
}

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    handle: '@newdawuromedia',
    description: 'Official Page, Community Updates & Live Streams',
    descriptionAm: 'ኦፊሴላዊ ገጽ፣ የማህበረሰብ ዜናዎችና የቀጥታ ስርጭቶች',
    url: 'https://facebook.com/newdawuromedia',
    icon: Facebook,
    accentColor: 'text-blue-400 group-hover:text-blue-300',
    badgeBg: 'bg-blue-600/20 group-hover:bg-blue-600 text-blue-300 group-hover:text-white',
    hoverBorder: 'hover:border-blue-500/60 hover:bg-slate-800/90'
  },
  {
    id: 'telegram',
    name: 'Telegram Channel',
    handle: '@newdawuromedia',
    description: 'Instant News, Bulletins & Campaign Announcements',
    descriptionAm: 'አስቸኳይ ዜናዎች፣ መግለጫዎችና የዘመቻ ጥሪዎች',
    url: 'https://t.me/newdawuromedia',
    icon: Send,
    accentColor: 'text-sky-400 group-hover:text-sky-300',
    badgeBg: 'bg-sky-500/20 group-hover:bg-sky-500 text-sky-300 group-hover:text-white',
    hoverBorder: 'hover:border-sky-500/60 hover:bg-slate-800/90'
  },
  {
    id: 'youtube',
    name: 'YouTube Channel',
    handle: '@NewDawuroMedia',
    description: 'Documentaries, Student Stories & Field Coverage',
    descriptionAm: 'ዶክመንተሪዎች፣ የተማሪዎች ታሪኮችና የመስክ ቪዲዮዎች',
    url: 'https://youtube.com/@NewDawuroMedia',
    icon: Youtube,
    accentColor: 'text-red-400 group-hover:text-red-300',
    badgeBg: 'bg-red-600/20 group-hover:bg-red-600 text-red-300 group-hover:text-white',
    hoverBorder: 'hover:border-red-500/60 hover:bg-slate-800/90'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@newdawuromedia',
    description: 'Youth Initiatives & Short Cultural Spotlights',
    descriptionAm: 'የወጣቶች ፕሮግራሞችና አጫጭር የባህል ትዕይንቶች',
    url: 'https://tiktok.com/@newdawuromedia',
    icon: Video,
    accentColor: 'text-cyan-400 group-hover:text-cyan-300',
    badgeBg: 'bg-cyan-500/20 group-hover:bg-cyan-500 text-cyan-300 group-hover:text-white',
    hoverBorder: 'hover:border-cyan-500/60 hover:bg-slate-800/90'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@newdawurofoundation',
    description: 'Photo Galleries, School Supplies & Impact Stories',
    descriptionAm: 'የፎቶ ጋለሪዎች፣ የደብተር ድጋፍና እውነተኛ ምስሎች',
    url: 'https://instagram.com/newdawuromedia',
    icon: Instagram,
    accentColor: 'text-pink-400 group-hover:text-pink-300',
    badgeBg: 'bg-pink-600/20 group-hover:bg-pink-600 text-pink-300 group-hover:text-white',
    hoverBorder: 'hover:border-pink-500/60 hover:bg-slate-800/90'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Support',
    handle: '+251 917 411 711',
    description: 'Direct Inquiries, Donor Care & Volunteer Contact',
    descriptionAm: 'የቀጥታ ግንኙነት፣ የለጋሾች ድጋፍና የበጎ ፈቃድ መረጃ',
    url: 'https://wa.me/251917411711',
    icon: MessageCircle,
    accentColor: 'text-emerald-400 group-hover:text-emerald-300',
    badgeBg: 'bg-emerald-600/20 group-hover:bg-emerald-600 text-emerald-300 group-hover:text-white',
    hoverBorder: 'hover:border-emerald-500/60 hover:bg-slate-800/90'
  }
];

export const Footer: React.FC<FooterProps> = ({
  setActiveRoute,
  onOpenDonateModal
}) => {
  const { language, t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-amber-500 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Registration */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" onClick={() => setActiveRoute('home')} />
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {t('footerDesc')}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-lg border border-slate-700 text-xs text-amber-400 font-medium">
                <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Officially Registered Civic NGO (Ethiopia)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-lg border border-slate-700 text-xs text-slate-300 font-medium">
                <Radio className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>New Dawuro Media</span>
              </div>
            </div>

            {/* Quick-action Social Pills */}
            <div className="pt-2">
              <p className="text-xs text-slate-400 mb-2.5 font-medium flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'am' ? 'ፈጣን የማህበራዊ ሚዲያ ሊንኮች:' : 'Quick Social Links:'}</span>
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {SOCIAL_PLATFORMS.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <a
                      key={platform.id}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border border-slate-700/70 hover:border-slate-600 shadow-sm"
                      title={`${platform.name} - ${platform.handle}`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${platform.accentColor}`} />
                      <span>{platform.name.split(' ')[0]}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm tracking-wide uppercase border-b border-amber-500/30 pb-2 inline-block">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActiveRoute('about')} className="hover:text-amber-400 transition-colors text-left">
                  {t('navAbout')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('campaign')} className="hover:text-amber-400 transition-colors flex items-center gap-1 text-left">
                  <span>{t('navCampaign')}</span>
                  <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-[10px] rounded font-semibold">Featured</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('programs')} className="hover:text-amber-400 transition-colors text-left">
                  {t('navPrograms')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('gallery')} className="hover:text-amber-400 transition-colors text-left">
                  {t('navGallery')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('news')} className="hover:text-amber-400 transition-colors text-left">
                  {t('navNews')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('contact')} className="hover:text-amber-400 transition-colors text-left">
                  {t('navContact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Program Sectors */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm tracking-wide uppercase border-b border-amber-500/30 pb-2 inline-block">
              Development Sectors
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• {t('progEducation')}</li>
              <li>• {t('progHealth')}</li>
              <li>• {t('progWater')}</li>
              <li>• {t('progAgriculture')}</li>
              <li>• {t('progElderly')}</li>
              <li>• {t('progMedia')}</li>
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wide uppercase border-b border-amber-500/30 pb-2 inline-block">
              {t('contactInfo')}
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Dawro Zone, Tarcha, Ethiopia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="tel:+251917411711" className="hover:text-amber-400 transition-colors font-medium">
                  +251 917 411 711
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="mailto:newdawuromedia@gmail.com" className="hover:text-emerald-400 transition-colors font-medium">
                  newdawuromedia@gmail.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="pt-1">
              <p className="text-xs font-semibold text-white mb-2">Subscribe for Campaign Updates:</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="bg-slate-800 text-slate-100 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-amber-400 w-full"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-2 rounded-lg text-xs transition-colors flex-shrink-0 cursor-pointer"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 mt-1">Thank you for subscribing!</p>
              )}
            </div>
          </div>

        </div>

        {/* Dedicated Social Media Section */}
        <div className="py-10 border-b border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Globe className="w-4 h-4" />
                <span>{t('socialMediaTitle')}</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
                {t('socialMediaSub')}
              </p>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <span>Verified Organization Handles</span>
              <Award className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {SOCIAL_PLATFORMS.map((platform) => {
              const Icon = platform.icon;
              return (
                <a
                  key={platform.id}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-3.5 bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700/70 ${platform.hoverBorder} transition-all duration-200 flex items-center justify-between gap-3`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${platform.badgeBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                          {platform.name}
                        </h4>
                      </div>
                      <p className="text-xs font-semibold text-slate-400 group-hover:text-slate-300 truncate">
                        {platform.handle}
                      </p>
                      <p className="text-[11px] text-slate-500 group-hover:text-slate-400 truncate mt-0.5">
                        {language === 'am' ? platform.descriptionAm : platform.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-1.5 rounded-lg bg-slate-700/50 group-hover:bg-slate-700 text-slate-400 group-hover:text-amber-400 transition-colors flex-shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">{t('legalNotice')}</p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenDonateModal} 
              className="text-amber-400 hover:underline font-semibold cursor-pointer"
            >
              Support One Pack Campaign
            </button>
            <span>•</span>
            <button 
              onClick={scrollToTop}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Back to Top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
