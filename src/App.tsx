import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { PageRoute } from './types';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { DonateModal } from './components/common/DonateModal';
import { VolunteerModal } from './components/common/VolunteerModal';

// Pages
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ProgramsPage } from './components/pages/ProgramsPage';
import { CampaignPage } from './components/pages/CampaignPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { NewsPage } from './components/pages/NewsPage';
import { ContactPage } from './components/pages/ContactPage';
import { AdminPage } from './components/pages/AdminPage';
import { GmailPage } from './components/pages/GmailPage';

function AppContent() {
  const [activeRoute, setActiveRoute] = useState<PageRoute>('home');
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);

  const handleOpenDonate = () => setIsDonateOpen(true);
  const handleOpenVolunteer = () => setIsVolunteerOpen(true);

  const handleRouteClick = (route: PageRoute) => {
    if (route === 'volunteer') {
      setIsVolunteerOpen(true);
      return;
    }
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between font-sans selection:bg-amber-400 selection:text-slate-950 transition-colors duration-200">
      
      {/* Top Header Navigation */}
      <Header
        activeRoute={activeRoute}
        setActiveRoute={handleRouteClick}
        onOpenDonateModal={handleOpenDonate}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {activeRoute === 'home' && (
          <HomePage
            setActiveRoute={handleRouteClick}
            onOpenDonateModal={handleOpenDonate}
          />
        )}

        {activeRoute === 'about' && (
          <AboutPage
            setActiveRoute={handleRouteClick}
            onOpenDonateModal={handleOpenDonate}
          />
        )}

        {activeRoute === 'programs' && (
          <ProgramsPage
            setActiveRoute={handleRouteClick}
            onOpenDonateModal={handleOpenDonate}
          />
        )}

        {activeRoute === 'campaign' && (
          <CampaignPage
            setActiveRoute={handleRouteClick}
            onOpenDonateModal={handleOpenDonate}
          />
        )}

        {activeRoute === 'gallery' && (
          <GalleryPage />
        )}

        {activeRoute === 'news' && (
          <NewsPage />
        )}

        {activeRoute === 'contact' && (
          <ContactPage onOpenGmail={() => handleRouteClick('gmail')} />
        )}

        {activeRoute === 'gmail' && (
          <GmailPage />
        )}

        {activeRoute === 'admin' && (
          <AdminPage />
        )}
      </main>

      {/* Footer Navigation */}
      <Footer setActiveRoute={handleRouteClick} />

      {/* Global Modals */}
      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
      />

      <VolunteerModal
        isOpen={isVolunteerOpen}
        onClose={() => setIsVolunteerOpen(false)}
      />

    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
