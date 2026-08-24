import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  BarChart3, 
  Coins, 
  Users, 
  GraduationCap, 
  Plus, 
  Image as ImageIcon, 
  FileText, 
  CheckCircle2, 
  ShieldAlert,
  Search,
  Sliders,
  Save
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'campaign' | 'gallery' | 'news'>('overview');

  // Interactive mock state for management
  const [studentCount, setStudentCount] = useState<number>(580);
  const [fundsRaised, setFundsRaised] = useState<number>(257500);
  const [isSaved, setIsSaved] = useState(false);

  // New gallery image state
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('One Pack for One Child Campaign');
  const [galleryLocation, setGalleryLocation] = useState('Tarcha City');
  const [gallerySuccess, setGallerySuccess] = useState(false);

  const handleUpdateMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    setGallerySuccess(true);
    setTimeout(() => setGallerySuccess(false), 3000);
    setGalleryTitle('');
  };

  return (
    <div className="bg-slate-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Admin Dashboard Banner */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full w-fit mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>FOUNDATION INTERNAL MANAGEMENT PORTAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              New Dawuro Foundation CMS Dashboard
            </h1>
            <p className="text-xs text-slate-300">
              Logged in as Administrator • Dawuro Zone Headquarters, Tarcha
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-white">Database Online</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview' ? 'bg-blue-700 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Impact Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('campaign')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'campaign' ? 'bg-blue-700 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Campaign Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'gallery' ? 'bg-blue-700 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery Uploader</span>
          </button>
        </div>

        {/* Content Views */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 font-bold block">Current Active Beneficiaries</span>
                <span className="text-3xl font-black text-slate-900">{studentCount} Students</span>
                <span className="text-[11px] text-emerald-600 font-bold block">+80 students added in 2018 E.C.</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 font-bold block">Total Funds Mobilized</span>
                <span className="text-3xl font-black text-slate-900">{fundsRaised.toLocaleString()} ETB</span>
                <span className="text-[11px] text-blue-600 font-bold block">Verified by Annual Audit</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 font-bold block">Target Beneficiary Woredas</span>
                <span className="text-3xl font-black text-slate-900">4 Active Woredas</span>
                <span className="text-[11px] text-amber-600 font-bold block">Tarcha, Gena, Zaba Gazo, Loma</span>
              </div>
            </div>

            {/* Audit Logs */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-sm">
                Recent Sponsorship Activity Audit
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">10 Student Packs Sponsored</span>
                    <span className="text-slate-500">Anonymous Diaspora Contributor • CBE Transfer</span>
                  </div>
                  <span className="font-bold text-emerald-600">+4,500 ETB</span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">5 Student Packs Sponsored</span>
                    <span className="text-slate-500">Abebe Demisse • Telebirr</span>
                  </div>
                  <span className="font-bold text-emerald-600">+2,250 ETB</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaign' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6 max-w-xl">
            <h2 className="text-xl font-black text-slate-900">
              Update Live Foundation Campaign Metrics
            </h2>

            <form onSubmit={handleUpdateMetrics} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Total Supported Students Count:
                </label>
                <input
                  type="number"
                  value={studentCount}
                  onChange={(e) => setStudentCount(parseInt(e.target.value) || 0)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Total Funds Raised (ETB):
                </label>
                <input
                  type="number"
                  value={fundsRaised}
                  onChange={(e) => setFundsRaised(parseInt(e.target.value) || 0)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Live Metrics to Database</span>
              </button>

              {isSaved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Metrics updated successfully on live foundation website!</span>
                </div>
              )}
            </form>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6 max-w-xl">
            <h2 className="text-xl font-black text-slate-900">
              Upload Field Photos to Public Gallery
            </h2>

            <form onSubmit={handleAddGallery} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Photo Title / Caption:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distribution at Tarcha Primary School"
                  value={galleryTitle}
                  onChange={(e) => setGalleryTitle(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Category:
                </label>
                <select
                  value={galleryCategory}
                  onChange={(e) => setGalleryCategory(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="One Pack for One Child Campaign">One Pack for One Child Campaign</option>
                  <option value="Tarcha">Tarcha</option>
                  <option value="Gena Woreda">Gena Woreda</option>
                  <option value="Angala Cluster">Angala Cluster</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Image to Public Gallery</span>
              </button>

              {gallerySuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Photo published to gallery successfully!</span>
                </div>
              )}
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
