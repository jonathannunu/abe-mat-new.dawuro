import { ProgramSector, WoredaImpact, CampaignYear, GalleryItem, NewsArticle, TeamMember, DonationOption } from '../types';

export const PROGRAM_SECTORS: ProgramSector[] = [
  {
    id: 'education',
    titleKey: 'progEducation',
    descKey: 'progEducationDesc',
    iconName: 'GraduationCap',
    bgImage: '/images/campaigns/one_pack_distribution_real.jpg',
    altEn: 'Authentic photo of New Dawuro Foundation school supply pack distribution for primary students in Dawuro Zone',
    altAm: 'የአዲስ ዳዉሮ ፋውንዴሽን የትምህርት ቁሳቁስ ድጋፍ ለሕፃናት ተማሪዎች ሲደርስ የሚያሳይ እውነተኛ ፎቶግራፍ',
    isRealPhoto: true,
    goals: [
      'Provide yearly notebook & pen packages to 1,000+ vulnerable students',
      'Establish mini-school libraries and reading corners in rural schools',
      'Recognize and reward high-achieving student girls in Dawuro Zone',
      'Support tutorial programs for national exam candidates'
    ],
    impactMetric: '580+ Students Equipped in 2018 E.C.',
    futureProjects: ['Dawuro Youth Digital Skills Center in Tarcha', 'School Supply Warehouse Expansion']
  },
  {
    id: 'health',
    titleKey: 'progHealth',
    descKey: 'progHealthDesc',
    iconName: 'HeartPulse',
    bgImage: '/images/placeholders/placeholder_health.svg',
    altEn: 'Official sector graphic for New Dawuro Foundation community healthcare and hygiene initiatives',
    altAm: 'የአዲስ ዳዉሮ ፋውንዴሽን የማህበረሰብ ጤና እና ንፅህና ፕሮግራም ይፋዊ ምስል',
    isRealPhoto: false,
    goals: [
      'Conduct community hygiene and health awareness sessions',
      'Distribute sanitary pads and personal hygiene kits to female students',
      'Support rural health posts with basic medical supplies',
      'Organize blood donation drives with local health authorities'
    ],
    impactMetric: '1,200+ Community Members Reached via Health Workshops',
    futureProjects: ['Mobile Health Screening Unit', 'Maternal Health Awareness Campaign']
  },
  {
    id: 'water',
    titleKey: 'progWater',
    descKey: 'progWaterDesc',
    iconName: 'Droplets',
    bgImage: '/images/placeholders/placeholder_water.svg',
    altEn: 'Official sector graphic for clean water and natural spring protection projects in Dawuro Zone',
    altAm: 'የንጹሕ ውኃ እና የተፈጥሮ ምንጭ ማጎልበት ፕሮጀክቶች ይፋዊ ምስል',
    isRealPhoto: false,
    goals: [
      'Protect natural water springs in remote rural kebales',
      'Construct hand-pump water wells near primary schools',
      'Train local Water Management Committees (WMCs) for maintenance',
      'Reduce waterborne illnesses among children and families'
    ],
    impactMetric: '3 Spring Cappings Completed in Rural Woredas',
    futureProjects: ['Solar-Powered Water Borehole in Gena Woreda', 'Clean Water for Schools Initiative']
  },
  {
    id: 'agriculture',
    titleKey: 'progAgriculture',
    descKey: 'progAgricultureDesc',
    iconName: 'Sprout',
    bgImage: '/images/gallery/regenerated_image_1787410219227.jpg',
    altEn: 'Sustainable agriculture and seedling distribution initiative in Dawuro Zone',
    altAm: 'በዳውሮ ዞን የተካሄደ የዘላቂ ግብርና እና የችግኝ ስርጭት ፕሮግራም',
    isRealPhoto: true,
    goals: [
      'Promote climate-smart agricultural techniques among smallholders',
      'Distribute high-yield vegetable seeds and fruit seedlings',
      'Encourage school gardening programs for student nutrition',
      'Support women farmers through self-help micro-initiatives'
    ],
    impactMetric: '450 Smallholder Farmers Trained in Soil Conservation',
    futureProjects: ['Dawuro Agro-Forestry Nursery', 'Model Organic Demonstration Farm']
  },
  {
    id: 'elderly',
    titleKey: 'progElderly',
    descKey: 'progElderlyDesc',
    iconName: 'Users',
    bgImage: '/images/placeholders/placeholder_elderly.svg',
    altEn: 'Official sector graphic for elderly care, nutrition packages, and home repairs in Dawuro Zone',
    altAm: 'የአረጋውያን ክብካቤ፣ የምግብ ድጋፍ እና የቤት እድሳት ፕሮግራም ይፋዊ ምስል',
    isRealPhoto: false,
    goals: [
      'Provide monthly food aid packages to vulnerable elderly individuals',
      'Repair corrugated iron roofs for low-income elderly households',
      'Organize holiday meals and community companionship visits',
      'Facilitate free medical check-ups in collaboration with Tarcha Hospital'
    ],
    impactMetric: '85 Elderly Residents Supported with Regular Essentials',
    futureProjects: ['Elderly Dignity Housing Repair Project', 'Community Senior Care Network']
  },
  {
    id: 'media',
    titleKey: 'progMedia',
    descKey: 'progMediaDesc',
    iconName: 'Tv',
    bgImage: '/images/placeholders/placeholder_media.svg',
    altEn: 'Official sector graphic for New Dawuro Media community broadcast and civic education channels',
    altAm: 'የአዲስ ዳዉሮ ማህበረሰብ ሚዲያ እና የዜግነት ትምህርት ስርጭት ይፋዊ ምስል',
    isRealPhoto: false,
    goals: [
      'Produce educational broadcasts and community cultural stories',
      'Document development challenges and solutions across Dawuro Zone',
      'Mobilize diaspora and local public support via New Dawuro Media',
      'Promote civic dialogue, youth talent, and local language preservation'
    ],
    impactMetric: '50,000+ Viewers Reached via Digital Channels',
    futureProjects: ['New Dawuro Community Radio Broadcasting Studio', 'Youth Journalist Training']
  }
];

export const CAMPAIGN_TIMELINE: CampaignYear[] = [
  {
    yearEC: '2015 E.C.',
    yearGC: '2022 / 2023 G.C.',
    studentsSupported: 350,
    etbRaised: 140000,
    highlightEn: 'Initiated the "One Pack for One Child" movement in Tarcha City & Gena Woreda with 350 student beneficiaries.',
    highlightAm: 'የ "አንድ እሽግ ለአንድ ልጅ" ዘመቻ በታርቻ ከተማ እና ገና ወረዳ 350 ተማሪዎችን በመደገፍ ተጀመረ።'
  },
  {
    yearEC: '2016 E.C.',
    yearGC: '2023 / 2024 G.C.',
    studentsSupported: 520,
    etbRaised: 218000,
    highlightEn: 'Expanded coverage to Zaba Gazo and Loma Woredas, reaching 520 students with comprehensive supply packs.',
    highlightAm: 'ድጋፉ ወደ ዛባ ጋዞ እና ሎማ ወረዳዎች በማስፋፋት 520 ተማሪዎችን ተዳራሽ አደረገ።'
  },
  {
    yearEC: '2017 E.C.',
    yearGC: '2024 / 2025 G.C.',
    studentsSupported: 350,
    etbRaised: 165000,
    highlightEn: 'Sustained distribution during challenging economic periods, ensuring no enrolled child dropped out.',
    highlightAm: 'በአስቸጋሪ የኢኮኖሚ ወቅትም ቢሆን 350 ተማሪዎች ከትምህርት እንዳይሰናከሉ ተደረገ።'
  },
  {
    yearEC: '2018 E.C.',
    yearGC: '2025 / 2026 G.C.',
    studentsSupported: 580,
    etbRaised: 257500,
    highlightEn: 'Record-breaking year with 580+ students supported across 4 Woredas and 257,500 ETB raised in community contributions.',
    highlightAm: 'በ4 ወረዳዎች 580+ ተማሪዎችን በመደገፍ እና 257,500 ብር በማሰባሰብ ከፍተኛው ተፅዕኖ ተመዘገበ።'
  }
];

export const WOREDA_BENEFICIARIES: WoredaImpact[] = [
  {
    id: 'tarcha',
    nameEn: 'Tarcha City',
    nameAm: 'ታርቻ ከተማ',
    students: 200,
    percentage: 34.5,
    descriptionEn: 'Serving urban and peri-urban low-income students in Tarcha town schools.',
    descriptionAm: 'በታርቻ ከተማ እና ዙሪያ ባሉ አነስተኛ ገቢ ያላቸው ተማሪዎችን መደገፍ።',
    coordinates: { x: 48, y: 42 }
  },
  {
    id: 'gena',
    nameEn: 'Gena Woreda',
    nameAm: 'ገና ወረዳ',
    students: 108,
    percentage: 18.6,
    descriptionEn: 'Supporting rural primary students in remote mountainous schools.',
    descriptionAm: 'በገና ወረዳ የገጠር መጀመሪያ ደረጃ ተማሪዎችን መደገፍ።',
    coordinates: { x: 32, y: 58 }
  },
  {
    id: 'zaba',
    nameEn: 'Zaba Gazo Woreda',
    nameAm: 'ዛባ ጋዞ ወረዳ',
    students: 106,
    percentage: 18.3,
    descriptionEn: 'Providing essential supplies to vulnerable agricultural community children.',
    descriptionAm: 'በዛባ ጋዞ ወረዳ የአቅመ ደካማ አርሶ አደር ልጆችን መደገፍ።',
    coordinates: { x: 62, y: 35 }
  },
  {
    id: 'loma',
    nameEn: 'Loma Woreda',
    nameAm: 'ሎማ ወረዳ',
    students: 166,
    percentage: 28.6,
    descriptionEn: 'Extending impact to Loma Woreda border communities and cluster schools.',
    descriptionAm: 'በሎማ ወረዳ ድንበር አቅራቢያ የሚገኙ ትምህርት ቤቶችን ተዳራሽ ማድረግ።',
    coordinates: { x: 55, y: 68 }
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'hero-distribution',
    titleEn: 'One Pack for One Child Challenge Official Closing Ceremony',
    titleAm: 'የአንድ እሽግ ለአንድ ልጅ ዘመቻ ይፋዊ ማጠቃለያ እና የደብተር ስርጭት',
    category: 'One Pack for One Child Campaign',
    imageUrl: '/images/gallery/one_pack_distribution_real.jpg',
    altEn: 'Authentic photograph of New Dawuro Foundation volunteers and students at the One Pack for One Child school supply distribution event in Dawuro Zone',
    altAm: 'በዳውሮ ዞን በተካሄደው የአንድ እሽግ ለአንድ ልጅ የደብተር ድጋፍ ስርጭት ላይ የተነሳ እውነተኛ ፎቶግራፍ',
    isRealPhoto: true,
    date: 'October 2025 (2018 E.C.)',
    locationEn: 'Angala Cluster School & Tarcha, Dawuro Zone',
    locationAm: 'አንጋላ ክላስተር ትምህርት ቤት እና ታርቻ፣ ዳውሮ ዞን',
    descriptionEn: 'Official field photograph documenting foundation volunteers and student beneficiaries during the dozen-pack exercise notebook and pen distribution.',
    descriptionAm: 'የፋውንዴሽኑ በጎ ፈቃደኞች እና ተማሪዎች የደብተር እና እስክሪብቶ ድጋፍ ሲረከቡ የሚያሳይ የመስክ እውነተኛ የምስል ሰነድ።',
    isFeatured: true
  },
  {
    id: 'tarcha-assembly',
    titleEn: 'Tarcha City Student Beneficiary Assembly',
    titleAm: 'የታርቻ ከተማ ተማሪዎች የድጋፍ ስብሰባ',
    category: 'Tarcha',
    imageUrl: '/images/placeholders/placeholder_community.svg',
    altEn: 'Official program overview graphic for Tarcha City student support initiatives',
    altAm: 'የታርቻ ከተማ የተማሪዎች ድጋፍ ፕሮግራም ይፋዊ ማሳያ ምስል',
    isRealPhoto: false,
    date: 'September 2025',
    locationEn: 'Tarcha Administrative Center, Dawuro Zone',
    locationAm: 'ታርቻ አስተዳደር ማዕከል፣ ዳውሮ ዞን',
    descriptionEn: 'Over 200 students gathered with parents and community elders for the annual education material hand-over event.',
    descriptionAm: 'ከ 200 በላይ ተማሪዎች ከወላጆቻቸው ጋር በመሆን የትምህርት ቁሳቁስ ድጋፉን ሲረከቡ።',
    isFeatured: true
  },
  {
    id: 'gena-woreda-distribution',
    titleEn: 'Gena Woreda Clean Water & School Support',
    titleAm: 'የገና ወረዳ የንጹሕ ውኃ እና የትምህርት ድጋፍ',
    category: 'Gena Woreda',
    imageUrl: '/images/placeholders/placeholder_water.svg',
    altEn: 'Official project graphic for clean water spring protection and school assistance in Gena Woreda',
    altAm: 'በገና ወረዳ የተካሄደ የንጹሕ ውኃ ምንጭ እና የትምህርት ድጋፍ ፕሮጀክት ይፋዊ ምስል',
    isRealPhoto: false,
    date: 'October 2025',
    locationEn: 'Gena Woreda Primary Center',
    locationAm: 'ገና ወረዳ መጀመሪያ ደረጃ ትምህርት ቤት',
    descriptionEn: 'Clean water spring protection and school supply deliveries directly reaching remote mountainous schools in Gena Woreda.',
    descriptionAm: 'በገና ወረዳ ለሚገኙ 108 ተማሪዎች የትምህርት ቁሳቁስና የንጹሕ ውኃ ድጋፍ ሲደረግ።',
    isFeatured: false
  },
  {
    id: 'angala-cluster-event',
    titleEn: 'Angala Cluster School Supply Ceremony',
    titleAm: 'የአንጋላ ክላስተር ትምህርት ቤት ድጋፍ ሥነ-ሥርዓት',
    category: 'Angala Cluster',
    imageUrl: '/images/campaigns/one_pack_distribution_real.jpg',
    altEn: 'Real field photo of school children with notebook packages at Angala Cluster School in Dawuro Zone',
    altAm: 'በአንጋላ ክላስተር ትምህርት ቤት የደብተር እሽግ የተረከቡ ተማሪዎች እውነተኛ ፎቶግራፍ',
    isRealPhoto: true,
    date: 'November 2025',
    locationEn: 'Angala Secondary & Primary School',
    locationAm: 'አንጋላ 2ኛ እና 1ኛ ደረጃ ትምህርት ቤት',
    descriptionEn: 'Cluster teachers and community leaders applauding student academic persistence and celebrating educational supply support.',
    descriptionAm: 'የአንጋላ ክላስተር መምህራን እና የአካባቢው ጎልማሶች የተማሪዎችን ጥረት ሲያደንቁ።',
    isFeatured: false
  },
  {
    id: 'zima-bosa-support',
    titleEn: 'Zima Bosa Kebele Agricultural & School Support',
    titleAm: 'የዚማ ቦሳ ቀበሌ የግብርና እና የትምህርት ድጋፍ',
    category: 'Zima Bosa School Support',
    imageUrl: '/images/gallery/regenerated_image_1787410219227.jpg',
    altEn: 'Field photograph of agricultural and educational support activities in Zima Bosa Kebele, Dawuro Zone',
    altAm: 'በዳውሮ ዞን በዚማ ቦሳ ቀበሌ የተካሄደ የግብርና እና የትምህርት ድጋፍ መስክ ፎቶግራፍ',
    isRealPhoto: true,
    date: 'December 2025',
    locationEn: 'Zima Bosa Kebele',
    locationAm: 'ዚማ ቦሳ ቀበሌ',
    descriptionEn: 'Equipping students in Zima Bosa Kebele with pens, rulers, exercise books, and study guides alongside school garden initiatives.',
    descriptionAm: 'በዚማ ቦሳ ቀበሌ ለሚገኙ ተማሪዎች ደብተር፣ እስክሪብቶ እና ማስመሪያ ሲታደል::',
    isFeatured: false
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-2018-campaign-success',
    titleEn: '2018 E.C. One Pack for One Child Campaign Reaches Record 580 Students',
    titleAm: 'በ 2018 ዓ.ም የ "አንድ እሽግ ለአንድ ልጅ" ዘመቻ 580 ተማሪዎችን በመደገፍ አዲስ ታሪክ አስመዘገበ',
    date: 'October 12, 2025',
    category: 'Campaign Update',
    summaryEn: 'Through generous local and diaspora donations totaling 257,500 ETB, New Dawuro Foundation provided exercise notebook bundles to 580 children across Tarcha, Gena, Zaba Gazo, and Loma Woredas.',
    summaryAm: 'በተሰበሰበው 257,500 ብር ድጋፍ አዲስ ዳዉሮ ፋውንዴሽን በታርቻ፣ ገና፣ ዛባ ጋዞ እና ሎማ ወረዳዎች ለሚገኙ 580 ተማሪዎች ሙሉ የደብተር እሽግ አቅርቧል።',
    contentEn: 'New Dawuro Foundation is proud to announce the successful conclusion of the 2018 E.C. "One Pack for One Child" distribution. Over 580 children received 1 dozen exercise notebooks each, complete with pens, pencils, and mathematical sets. Foundation Executive Directors expressed profound gratitude to all community members, diaspora supporters, and New Dawuro Media partners.',
    contentAm: 'የአዲስ ዳዉሮ ፋውንዴሽን የ 2018 ዓ.ም የ "አንድ እሽግ ለአንድ ልጅ" ዘመቻ በታላቅ ስኬት መጠናቀቁን በደስታ ይገልጻል። ከ 580 በላይ ተማሪዎች እያንዳንዳቸው 1 ደስቲን ደብተር፣ እስክሪብቶዎች እና የጂኦሜትሪ እቃዎችን ተረክበዋል።',
    author: 'New Dawuro Foundation Media Team',
    imageUrl: '/images/campaigns/one_pack_distribution_real.jpg',
    altEn: 'Authentic photo of student beneficiaries and organizers holding One Pack for One Child school supply bundles in Dawuro Zone',
    altAm: 'የአዲስ ዳዉሮ ፋውንዴሽን የደብተር እሽግ ያገኙ ተማሪዎች እና አስተባባሪዎች እውነተኛ ፎቶግራፍ',
    isRealPhoto: true
  },
  {
    id: 'report-annual-2024-2025',
    titleEn: 'Annual Activity & Financial Performance Report 2024/2025 (2017 E.C.)',
    titleAm: 'የ 2017 ዓ.ም ዓመታዊ የሥራ እና የፋይናንስ እንቅስቃሴ ሪፖርት',
    date: 'August 30, 2025',
    category: 'Annual Report',
    summaryEn: 'Comprehensive official audit report detailing revenue, project expenditures, student support numbers, and clean water spring cappings across Dawuro Zone.',
    summaryAm: 'የድርጅቱን ገቢ፣ የወጣ ወጪ፣ የተደገፉ ተማሪዎችን ቁጥር እና የውኃ ፕሮጀክቶችን በዝርዝር የሚያሳይ ይፋዊ ዓመታዊ ሪፖርት።',
    contentEn: 'Transparency is the bedrock of New Dawuro Foundation. Our 2024/2025 Annual Report provides full line-item clarity on every ETB raised and spent. 92% of all donated funds directly financed school supplies and community clean water points, with minimal operational overhead.',
    contentAm: 'ግልፅነት የአዲስ ዳዉሮ ፋውንዴሽን መሠረት ነው። የ 2017 ዓ.ም ዓመታዊ ሪፖርታችን የእያንዳንዱን ብር አጠቃቀም በግልጽ ያሳያል። 92% የሚሆነው ገቢ በቀጥታ ለተማሪዎች ድጋፍ እና ለንጹሕ ውኃ ፕሮጀክቶች ውሏል።',
    author: 'Board Audit Committee',
    imageUrl: '/images/placeholders/placeholder_report.svg',
    altEn: 'Official Annual Performance and Financial Audit Report document graphic for New Dawuro Foundation',
    altAm: 'የአዲስ ዳዉሮ ፋውንዴሽን ይፋዊ ዓመታዊ የፋይናንስ እና የሥራ ኦዲት ሪፖርት ማሳያ',
    isRealPhoto: false,
    downloadUrl: '/docs/New_Dawuro_Foundation_Annual_Report_2024_2025.pdf'
  },
  {
    id: 'news-clean-water-initiative',
    titleEn: 'Spring Protection Project Completed in Gena Woreda Kebele',
    titleAm: 'በገና ወረዳ የንጹሕ ምንጭ ውኃ ማጎልበት ፕሮጀክት ተጠናቀቀ',
    date: 'January 15, 2026',
    category: 'Community Story',
    summaryEn: 'Over 400 rural households now have safe, clean drinking water following the completion of the Gena Spring Protection structure constructed by foundation volunteers.',
    summaryAm: 'በገና ወረዳ በበጎ ፈቃደኞች የተገነባው የንጹሕ ምንጭ ውኃ ፕሮጀክት በመጠናቀቁ ከ 400 በላይ አባወራዎች የንጹሕ ውኃ ተጠቃሚ ሆነዋል።',
    contentEn: 'Clean water is directly linked to student school attendance. Previously, young girls spent 3 hours daily fetching river water. With our new protected spring capping, clean water is accessible in under 10 minutes.',
    contentAm: 'ንጹሕ ውኃ ከተማሪዎች የትምህርት ገበታ መገኘት ጋር በቀጥታ የተያያዘ ነው። አሁን ልጃገረዶች በቀላሉ የንጹሕ ውኃ ተጠቃሚ በመሆናቸው ወደ ትምህርት ቤት በሰዓቱ መሄድ ችለዋል።',
    author: 'Water Program Unit',
    imageUrl: '/images/placeholders/placeholder_water.svg',
    altEn: 'Official Clean Water and Spring Protection Project overview graphic for Gena Woreda',
    altAm: 'በገና ወረዳ የተካሄደ የንጹሕ ውኃ ምንጭ ጥበቃ ፕሮጀክት ይፋዊ ማሳያ',
    isRealPhoto: false
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'director-1',
    name: 'Wondwossen Tadesse',
    roleEn: 'Executive Director & Co-Founder',
    roleAm: 'ሥራ አስፈፃሚ ዳይሬክተር እና መስራች',
    bioEn: 'Community organizer passionate about education equity and sustainable development in Dawuro Zone.',
    bioAm: 'በዳውሮ ዞን በትምህርት እኩልነት እና በዘላቂ ልማት ላይ የሚሰራ የማህበረሰብ አስተባባሪ።',
    photoUrl: '/images/placeholders/placeholder_team_avatar.svg',
    altEn: 'Executive Director Wondwossen Tadesse official leadership profile icon',
    altAm: 'ሥራ አስፈፃሚ ዳይሬክተር ወንድወሰን ታደሰ ይፋዊ የመሪነት ማሳያ',
    phone: '+251917411711',
    email: 'newdawuromedia@gmail.com'
  },
  {
    id: 'director-2',
    name: 'Melesse Wolde',
    roleEn: 'Program Coordinator & Campaign Manager',
    roleAm: 'የፕሮግራም አስተባባሪ እና የዘመቻ መሪ',
    bioEn: 'Oversees the field operations and supply logistics for the "One Pack for One Child" campaign.',
    bioAm: 'የ "አንድ እሽግ ለአንድ ልጅ" ዘመቻ የሜዳ ላይ ስርጭት እና ሎጅስቲክስ የበላይ ተቆጣጣሪ::',
    photoUrl: '/images/placeholders/placeholder_team_avatar.svg',
    altEn: 'Program Coordinator Melesse Wolde official leadership profile icon',
    altAm: 'የፕሮግራም አስተባባሪ መለሰ ወልዴ ይፋዊ የመሪነት ማሳያ'
  },
  {
    id: 'director-3',
    name: 'Birtukan Bekele',
    roleEn: 'Community Health & Gender Lead',
    roleAm: 'የማህበረሰብ ጤና እና የሴቶች መሪ',
    bioEn: 'Leads hygiene awareness programs and educational scholarship initiatives for female students.',
    bioAm: 'የንጽህና ግንዛቤ ፕሮግራሞችን እና የልጃገረዶች የትምህርት ድጋፍ የሚያስተባብሩ::',
    photoUrl: '/images/placeholders/placeholder_team_avatar.svg',
    altEn: 'Community Health Lead Birtukan Bekele official leadership profile icon',
    altAm: 'የማህበረሰብ ጤና መሪ ብርቱካን በቀለ ይፋዊ የመሪነት ማሳያ'
  }
];

export const DONATION_TIERS: DonationOption[] = [
  {
    amountEtb: 1000,
    amountUsd: 3.50,
    packsProvided: 1,
    titleEn: '1 Student Pack',
    titleAm: '1 የተማሪ እሽግ',
    descEn: 'Provides 1 dozen exercise books, 6 pens, pencils & ruler for 1 student for a full school year.',
    descAm: 'ለ1 ተማሪ ለሙሉ ዓመት የሚሆን 1 ደስቲን ደብተር፣ 6 እስክሪብቶዎች እና ማስመሪያ ያቀርባል።'
  },
  {
    amountEtb: 3000,
    amountUsd: 10,
    packsProvided: 3,
    titleEn: '3 Students Supported',
    titleAm: '3 ተማሪዎችን መደገፍ',
    descEn: 'Keeps 3 vulnerable rural students fully equipped throughout the academic year.',
    descAm: '3 አቅመ ደካማ ተማሪዎችን ለሙሉ ዓመት በትምህርት ቁሳቁስ ያሟላል።',
    isPopular: true
  },
  {
    amountEtb: 10000,
    amountUsd: 35,
    packsProvided: 10,
    titleEn: 'Classroom Supporter (10 Students)',
    titleAm: 'የክፍል ድጋፍ (10 ተማሪዎች)',
    descEn: 'Equips an entire small primary classroom cluster with notebooks, pens, and geometry sets.',
    descAm: '10 ተማሪዎችን ሙሉ በሙሉ የትምህርት ቁሳቁስ በማሟላት ይደግፋል።'
  },
  {
    amountEtb: 25000,
    amountUsd: 90,
    packsProvided: 25,
    titleEn: 'School Cluster Champion (25 Students)',
    titleAm: 'የትምህርት ቤት አምባሳደር (25 ተማሪዎች)',
    descEn: 'Major educational sponsorship providing complete materials for 25 rural students.',
    descAm: 'ለ 25 ተማሪዎች ሙሉ ዓመታዊ የትምህርት ቁሳቁስ ዋስትና የሚሰጥ ትልቅ ድጋፍ።'
  }
];
