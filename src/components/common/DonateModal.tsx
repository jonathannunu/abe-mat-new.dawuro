import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DONATION_TIERS } from '../../data/foundationData';
import { 
  X, 
  Heart, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Award, 
  Copy, 
  Check, 
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const [selectedTier, setSelectedTier] = useState<number>(3000); // Default 3 packs
  const [customPacks, setCustomPacks] = useState<number>(3);
  const [paymentChannel, setPaymentChannel] = useState<'telebirr' | 'cbe' | 'card'>('telebirr');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleTierSelect = (amountEtb: number, packs: number) => {
    setSelectedTier(amountEtb);
    setCustomPacks(packs);
  };

  const handleCustomPackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const packs = Math.max(1, parseInt(e.target.value) || 1);
    setCustomPacks(packs);
    setSelectedTier(packs * 1000);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(key);
    setTimeout(() => setCopiedAccount(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const currentTotalEtb = customPacks * 1000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl overflow-hidden my-8 border border-slate-100 dark:border-slate-800 max-h-[90vh] flex flex-col">
        
        {/* Top Banner Header */}
        <div className="bg-gradient-to-r from-blue-800 via-blue-900 to-slate-900 text-white p-6 sm:p-8 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 w-fit rounded-full text-xs font-bold mb-3 border border-amber-500/30">
            <Heart className="w-3.5 h-3.5 fill-amber-400" />
            <span>{t('campaignHeadline')}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
            {t('donateTitle')}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg leading-relaxed">
            {t('donateSubtitle')}
          </p>
        </div>

        {/* Modal Body */}
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
            
            {/* Impact Tier Cards */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                Select Educational Impact Package:
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DONATION_TIERS.map((tier) => {
                  const isSelected = selectedTier === tier.amountEtb;
                  return (
                    <div
                      key={tier.amountEtb}
                      onClick={() => handleTierSelect(tier.amountEtb, tier.packsProvided)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        isSelected 
                          ? 'border-blue-600 dark:border-amber-500 bg-blue-50/50 dark:bg-amber-950/20 shadow-md' 
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-800/60'
                      }`}
                    >
                      {tier.isPopular && (
                        <span className="absolute -top-2.5 right-4 px-2 py-0.5 bg-amber-500 text-slate-950 font-extrabold text-[10px] rounded-full uppercase tracking-wider shadow-sm">
                          Most Popular
                        </span>
                      )}

                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-blue-900 dark:text-amber-400 text-sm">
                          {language === 'am' ? tier.titleAm : tier.titleEn}
                        </span>
                        <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base">
                          {tier.amountEtb.toLocaleString()} ETB
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                        {language === 'am' ? tier.descAm : tier.descEn}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Custom Number of Packs */}
              <div className="mt-3 bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-amber-400 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Custom Student Packs:</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">1000 ETB per complete school pack</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={customPacks}
                    onChange={handleCustomPackChange}
                    className="w-20 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-center font-bold text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600"
                  />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Packs</span>
                </div>
              </div>
            </div>

            {/* Total Calculation Display */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold opacity-90 block">Total Donation Amount:</span>
                <span className="text-2xl font-black">
                  {currentTotalEtb.toLocaleString()} ETB
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold opacity-90 block">Direct Benefit:</span>
                <span className="text-sm font-extrabold text-amber-300">
                  {customPacks} {customPacks === 1 ? 'Student Supported' : 'Students Supported'}
                </span>
              </div>
            </div>

            {/* Payment Channel Tabs */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                {t('paymentMethod')}
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentChannel('telebirr')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer text-xs font-bold ${
                    paymentChannel === 'telebirr' 
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 shadow-sm' 
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Telebirr</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentChannel('cbe')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer text-xs font-bold ${
                    paymentChannel === 'cbe' 
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 shadow-sm' 
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>CBE Bank</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentChannel('card')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer text-xs font-bold ${
                    paymentChannel === 'card' 
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-300 shadow-sm' 
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span>Card / Int'l</span>
                </button>
              </div>

              {/* Account Details Panel */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                {paymentChannel === 'telebirr' && (
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100 mb-1">Telebirr Merchant / Phone Number:</p>
                    <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
                      <span>+251 917 411 711</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('+251917411711', 'telebirr')}
                        className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/60 hover:bg-emerald-200 text-emerald-800 dark:text-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1"
                      >
                        {copiedAccount === 'telebirr' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedAccount === 'telebirr' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Account Name: New Dawuro Media / Foundation</p>
                  </div>
                )}

                {paymentChannel === 'cbe' && (
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100 mb-1">Commercial Bank of Ethiopia (CBE) Account:</p>
                    <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-sm font-extrabold text-blue-800 dark:text-amber-400">
                      <span>1000543298711</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('1000543298711', 'cbe')}
                        className="px-2.5 py-1 bg-blue-100 dark:bg-slate-700 hover:bg-blue-200 text-blue-800 dark:text-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1"
                      >
                        {copiedAccount === 'cbe' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedAccount === 'cbe' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Account Name: New Dawuro Foundation</p>
                  </div>
                )}

                {paymentChannel === 'card' && (
                  <div className="space-y-2">
                    <p className="font-bold text-slate-900 dark:text-slate-100">Online Card Gateway (Visa, MasterCard, Amex):</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Card Number (4242 ...)"
                        defaultValue="4242 •••• •••• 4242"
                        className="p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-900 dark:text-slate-100"
                      />
                      <input
                        type="text"
                        placeholder="MM / YY"
                        defaultValue="12 / 28"
                        className="p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-900 dark:text-slate-100"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                Donor Contact Details:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={t('donorName')}
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  required={!isAnonymous}
                  disabled={isAnonymous}
                  className="p-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 disabled:bg-slate-100 dark:disabled:bg-slate-800"
                />
                <input
                  type="email"
                  placeholder={t('donorEmail')}
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="p-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 dark:border-slate-700 focus:ring-blue-500"
                />
                <label htmlFor="anonymousCheck" className="text-xs text-slate-600 dark:text-slate-300 font-medium cursor-pointer">
                  {t('anonymousOption')}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Heart className="w-5 h-5 fill-white/20" />
              <span>Confirm & Generate Donor Receipt ({currentTotalEtb.toLocaleString()} ETB)</span>
            </button>
          </form>
        ) : (
          /* Confirmation & Certificate Preview */
          <div className="p-6 sm:p-8 text-center space-y-6 overflow-y-auto flex-1">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                {language === 'am' ? 'ለግሳዎ በተሳካ ሁኔታ ተረጋግጧል!' : 'Thank You for Your Generous Support!'}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">
                {language === 'am'
                  ? `ለግሳዎ ${customPacks} ተማሪዎችን ለሙሉ ትምህርት ዘመን በደብተር እና እስክሪብቶ ለማሟላት ይውላል።`
                  : `Your contribution directly equips ${customPacks} children in Dawuro Zone with essential exercise notebooks and school materials.`}
              </p>
            </div>

            {/* Certificate Preview Card */}
            <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-amber-950/40 rounded-3xl border-2 border-amber-300 dark:border-amber-700 text-left relative overflow-hidden shadow-sm">
              <div className="flex items-center justify-between border-b border-amber-200 dark:border-amber-800 pb-3 mb-3">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-bold text-xs">
                  <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>NEW DAWURO FOUNDATION • OFFICIAL CERTIFICATE</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">REF: NDF-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
                This acknowledges that <span className="font-extrabold text-slate-900 dark:text-slate-100">{isAnonymous ? 'Generous Anonymous Supporter' : (donorName || 'Valued Donor')}</span> has sponsored:
              </p>

              <div className="text-xl font-black text-amber-900 dark:text-amber-300 mb-1">
                {customPacks} Student Educational Packages ({currentTotalEtb} ETB)
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">
                "No student should stay home because of lack of educational materials."
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
