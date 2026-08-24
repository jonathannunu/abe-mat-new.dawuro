import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, UserPlus, CheckCircle2, HeartHandshake, MapPin } from 'lucide-react';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [woreda, setWoreda] = useState('Tarcha City');
  const [skills, setSkills] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const availableSkills = [
    'School Supply Distribution',
    'Media & Photography',
    'Community Health Awareness',
    'Clean Water Construction',
    'Teaching & Tutoring',
    'Translation (Amharic/Dawuro/English)',
    'Logistics & Transport'
  ];

  const toggleSkill = (skill: string) => {
    setSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl overflow-hidden my-8 border border-slate-100 dark:border-slate-800 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 w-fit rounded-full text-xs font-bold mb-2 border border-amber-500/30">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
            <span>Join Our Grassroots Team</span>
          </div>

          <h2 className="text-xl font-bold">
            {language === 'am' ? 'የበጎ ፈቃደኝነት ምዝገባ' : 'Become a Foundation Volunteer'}
          </h2>
          <p className="text-slate-300 text-xs mt-1">
            {language === 'am'
              ? 'በዳውሮ ዞን ማህበረሰባዊ ለውጥ ለማምጣት በበጎ ፈቃደኝነት ያገለግሉ::'
              : 'Support material distributions, health workshops, and media storytelling across Dawuro Zone.'}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name:</label>
              <input
                type="text"
                required
                placeholder="e.g. Abera Desta"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number:</label>
                <input
                  type="tel"
                  required
                  placeholder="+251 9..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address:</label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Preferred Location / Woreda:</label>
              <select
                value={woreda}
                onChange={(e) => setWoreda(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
              >
                <option value="Tarcha City">Tarcha City</option>
                <option value="Gena Woreda">Gena Woreda</option>
                <option value="Zaba Gazo Woreda">Zaba Gazo Woreda</option>
                <option value="Loma Woreda">Loma Woreda</option>
                <option value="Other Dawuro Kebele">Other Dawuro Kebele</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">Areas of Interest / Skills:</label>
              <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
                {availableSkills.map((sk) => {
                  const checked = skills.includes(sk);
                  return (
                    <button
                      type="button"
                      key={sk}
                      onClick={() => toggleSkill(sk)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all border flex items-center justify-between cursor-pointer ${
                        checked 
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-600 dark:border-emerald-500 text-emerald-900 dark:text-emerald-300' 
                          : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{sk}</span>
                      {checked && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Submit Volunteer Application</span>
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4 overflow-y-auto flex-1">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Application Received!</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xs mx-auto">
              Thank you {fullName}! Our community coordinator in {woreda} will contact you shortly via phone (+251 {phone}).
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
