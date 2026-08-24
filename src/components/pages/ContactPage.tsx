import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Phone, Mail, MapPin, Send, CheckCircle2, Share2, Globe, Clock, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC<{ onOpenGmail?: () => void }> = ({ onOpenGmail }) => {
  const { language, t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-4">
          <span className="px-3.5 py-1.5 bg-amber-500/20 text-amber-300 font-extrabold text-xs rounded-full border border-amber-400/30 uppercase tracking-widest inline-block">
            DIRECT COMMUNICATION
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {t('contactTitle')}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            {t('contactSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Info & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Foundation Office Info
              </h2>

              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Main Location:</span>
                    <span className="text-slate-600">Dawro Zone, Tarcha City, Ethiopia</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Phone / Telegram:</span>
                    <a href="tel:+251917411711" className="text-blue-700 hover:underline font-bold">
                      +251 917 411 711
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Official Email:</span>
                    <a href="mailto:newdawuromedia@gmail.com" className="text-emerald-700 hover:underline font-bold">
                      newdawuromedia@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl flex-shrink-0">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Social Media Channel:</span>
                    <span className="text-slate-600 font-semibold">New Dawuro Media</span>
                  </div>
                </li>
              </ul>

              {onOpenGmail && (
                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onOpenGmail}
                    className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-red-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open Interactive Gmail Hub</span>
                  </button>
                </div>
              )}
            </div>

            {/* Interactive Visual Location Map Card */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800 space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>MAP LOCATION • TARCHA, DAWURO ZONE</span>
              </div>

              <div className="h-44 bg-slate-800 rounded-2xl border border-slate-700 relative overflow-hidden flex items-center justify-center p-4">
                <div className="text-center space-y-2 z-10">
                  <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="font-black text-sm text-white block">New Dawuro Foundation Office</span>
                  <span className="text-xs text-amber-300">Tarcha Central Administrative Center</span>
                </div>
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-blue-700 font-extrabold text-xs uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full inline-block">
                    SEND A DIRECT MESSAGE
                  </span>
                  <h2 className="text-2xl font-black text-slate-900">
                    We Would Love to Hear From You
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {t('formNameLabel')} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {t('formEmailLabel')}
                    </label>
                    <input
                      type="email"
                      placeholder="name@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {t('formPhoneLabel')} *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+251 9..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {t('formSubjectLabel')}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Partnership Inquiry / Donation"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t('formMessageLabel')} *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write your inquiry or comment here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm shadow-lg shadow-blue-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('formSubmitBtn')}</span>
                </button>
              </form>
            ) : (
              <div className="p-8 text-center space-y-4 my-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  Message Sent Successfully!
                </h3>

                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  {t('formSuccessMsg')}
                </p>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
