import React from 'react';
import { PageRoute } from '../../types';
import { HeroSection } from '../home/HeroSection';
import { ImpactCounter } from '../home/ImpactCounter';
import { AboutPreview } from '../home/AboutPreview';
import { ProgramsPreview } from '../home/ProgramsPreview';
import { FeaturedCampaign } from '../home/FeaturedCampaign';
import { InteractiveMap } from '../home/InteractiveMap';
import { GalleryPreview } from '../home/GalleryPreview';
import { NewsPreview } from '../home/NewsPreview';
import { ContactCTA } from '../home/ContactCTA';

interface HomePageProps {
  setActiveRoute: (route: PageRoute) => void;
  onOpenDonateModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveRoute,
  onOpenDonateModal
}) => {
  return (
    <div className="space-y-0">
      <HeroSection setActiveRoute={setActiveRoute} onOpenDonateModal={onOpenDonateModal} />
      <ImpactCounter onExploreCampaign={() => setActiveRoute('campaign')} />
      <AboutPreview setActiveRoute={setActiveRoute} />
      <ProgramsPreview setActiveRoute={setActiveRoute} />
      <FeaturedCampaign setActiveRoute={setActiveRoute} onOpenDonateModal={onOpenDonateModal} />
      <InteractiveMap />
      <GalleryPreview setActiveRoute={setActiveRoute} />
      <NewsPreview setActiveRoute={setActiveRoute} />
      <ContactCTA setActiveRoute={setActiveRoute} onOpenDonateModal={onOpenDonateModal} />
    </div>
  );
};
