export type Language = 'en' | 'am';

export type PageRoute = 
  | 'home'
  | 'about'
  | 'programs'
  | 'campaign'
  | 'gallery'
  | 'news'
  | 'contact'
  | 'volunteer'
  | 'admin'
  | 'gmail';

export interface ProgramSector {
  id: string;
  titleKey: string;
  descKey: string;
  iconName: string;
  bgImage: string;
  altEn?: string;
  altAm?: string;
  isRealPhoto?: boolean;
  goals: string[];
  impactMetric: string;
  futureProjects: string[];
}

export interface WoredaImpact {
  id: string;
  nameEn: string;
  nameAm: string;
  students: number;
  percentage: number;
  descriptionEn: string;
  descriptionAm: string;
  coordinates: { x: number; y: number };
}

export interface CampaignYear {
  yearEC: string;
  yearGC: string;
  studentsSupported: number;
  etbRaised: number;
  highlightEn: string;
  highlightAm: string;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleAm: string;
  category: 'One Pack for One Child Campaign' | 'Tarcha' | 'Gena Woreda' | 'Angala Cluster' | 'Zima Bosa School Support';
  imageUrl: string;
  altEn?: string;
  altAm?: string;
  isRealPhoto?: boolean;
  date: string;
  locationEn: string;
  locationAm: string;
  descriptionEn: string;
  descriptionAm: string;
  isFeatured?: boolean;
}

export interface NewsArticle {
  id: string;
  titleEn: string;
  titleAm: string;
  date: string;
  category: 'Campaign Update' | 'Community Story' | 'Annual Report' | 'Press Release';
  summaryEn: string;
  summaryAm: string;
  contentEn: string;
  contentAm: string;
  author: string;
  imageUrl: string;
  altEn?: string;
  altAm?: string;
  isRealPhoto?: boolean;
  downloadUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  roleEn: string;
  roleAm: string;
  bioEn: string;
  bioAm: string;
  photoUrl: string;
  altEn?: string;
  altAm?: string;
  email?: string;
  phone?: string;
}

export interface DonationOption {
  amountEtb: number;
  amountUsd: number;
  packsProvided: number;
  titleEn: string;
  titleAm: string;
  descEn: string;
  descAm: string;
  isPopular?: boolean;
}
