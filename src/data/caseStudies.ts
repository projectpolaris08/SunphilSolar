export interface CaseStudyData {
  projectOverview: {
    challenge: string;
    solution: string;
    results: string;
  };
  financialAnalysis: {
    totalInvestment: number;
    monthlySavings: number;
    paybackPeriod: number;
    annualROI: number;
    lifetimeSavings: number;
  };
  environmentalImpact: {
    co2Reduction: number;
    treesEquivalent: number;
    annualEnergyProduction: number;
  };
  performanceMetrics: {
    systemEfficiency: number;
    uptime: number;
    peakOutput: number;
    averageDailyProduction: number;
  };
  challenges: string[];
  solutions: string[];
  testimonials?: {
    quote: string;
    author: string;
    role?: string;
  };
  beforeAfter?: {
    beforeImage: string;
    afterImage: string;
    beforeDescription: string;
    afterDescription: string;
    middleImage?: string;
    middleDescription?: string;
    videoUrl?: string;
    videoTimestamp?: number;
  };
  gallery?: {
    src: string;
    alt: string;
    caption: string;
  }[];
}

export const caseStudies: { [key: string]: CaseStudyData } = {
  "pinagsama-taguig-6kw-2025": {
    projectOverview: {
      challenge:
        "Jason Palafox was facing crippling Meralco bills of ₱5,711 monthly with 428 kWh consumption, running both his home and sari-sari store operations. The household's high energy demands were creating significant financial strain in Pinagsama, Taguig City, with complete grid dependency and no backup power system.",
      solution:
        "Sunphil Solar designed and installed a custom 6kW hybrid solar system on June 22, 2025, featuring a 6kW Deye Hybrid Inverter for intelligent energy management, 12 x 615W Canadian Bifacial Solar Panels (7.38kW total capacity) for maximum energy capture, and 2 x 51.2V 314Ah LiFePO4 Batteries (32.15kWh total storage) for reliable backup power and nighttime energy storage for both residential and commercial operations.",
      results:
        "Mr. Palafox's monthly consumption dropped from 428 kWh to just 4 kWh (99% reduction), with his Meralco bill plummeting from ₱5,711 to ₱77 achieving ₱5,634 monthly savings (98.6% cost reduction). The system now provides near-complete energy independence with reliable backup power for both household and sari-sari store operations.",
    },
    financialAnalysis: {
      totalInvestment: 375000,
      monthlySavings: 5634,
      paybackPeriod: 5.5,
      annualROI: 18.0,
      lifetimeSavings: 1352160,
    },
    environmentalImpact: {
      co2Reduction: 12000,
      treesEquivalent: 571,
      annualEnergyProduction: 13140,
    },
    performanceMetrics: {
      systemEfficiency: 96,
      uptime: 99.9,
      peakOutput: 6,
      averageDailyProduction: 36,
    },
    challenges: [
      "Crippling Meralco bills of ₱5,711 monthly with 428 kWh consumption",
      "High energy demands from both residential use and sari-sari store operations",
      "Complete dependence on grid power with no backup system for business operations",
      "Vulnerability to rising electricity rates affecting business profitability",
      "Risk of power outages disrupting sari-sari store operations",
      "No protection from Meralco rate hikes impacting monthly expenses",
    ],
    solutions: [
      "Custom-designed 6kW hybrid solar system with 7.38kW panel capacity for dual residential/commercial use",
      "Smart energy management with Deye Hybrid Inverter for optimal power flow",
      "High-efficiency Canadian Bifacial panels capturing maximum sunlight in urban environment",
      "Dual LiFePO4 battery storage (32.15kWh) for extended backup power during outages",
      "Reliable power supply for both household needs and sari-sari store operations",
      "99% reduction in grid consumption providing near-complete energy independence",
    ],
    testimonials: {
      quote:
        "Ito na yung bill ko salamat Sunphil Solar/Fairview Solarista at sa buong team niyo sana marami pa kayong matulungan. Napakasaya ko talaga Sir salamat talaga.",
      author: "Jason Palafox",
      role: "Homeowner & Sari-Sari Store Owner, Pinagsama, Taguig City",
    },
    beforeAfter: {
      beforeImage: "/images/Jason-before.jpg",
      afterImage: "/images/Jason-after.jpg",
      beforeDescription:
        "June 2025: Meralco bill at ₱5,711 with 428 kWh consumption, running both home and sari-sari store operations.",
      afterDescription:
        "August 2025: Bill reduced to just ₱77 with only 4 kWh consumption, achieving 98.6% savings and near-complete energy independence for both household and business operations.",
    },
    gallery: [
      {
        src: "/images/project76.jpg",
        alt: "6kW Hybrid Solar Installation for Jason Palafox in Pinagsama, Taguig",
        caption:
          "6kW hybrid solar system installation featuring 12 Canadian bifacial panels and dual battery storage for residential and sari-sari store operations.",
      },
    ],
  },
  "bagong-ilog-pasig": {
    projectOverview: {
      challenge:
        "Arjay Nepomuceno was facing his April 2025 Meralco bill hitting ₱6,695.57 and a disconnection threat after May 13 if left unpaid. Power-hungry appliances, unpredictable rate hikes, and full dependence on the grid had pushed his expenses to the breaking point, creating daily anxiety about energy costs.",
      solution:
        "Sunphil Solar designed and installed a custom 6kW hybrid solar system on April 21, 2025, featuring a 6kW Deye Hybrid Inverter for smart energy management, 12 x 615W Canadian Bifacial Solar Panels for maximum energy capture, and a 51.2V 314Ah LiFePO₄ Battery for reliable backup power and nighttime energy storage.",
      results:
        "In just two months, Sir Arjay's energy consumption from the grid dropped to 0 kWh, with his Meralco bill plummeting from ₱6,695.57 to just ₱24.07, a 99.6% reduction in electricity costs. The system eliminated the disconnection threat and provided complete energy independence.",
    },
    financialAnalysis: {
      totalInvestment: 295000,
      monthlySavings: 6671,
      paybackPeriod: 3.7,
      annualROI: 27.1,
      lifetimeSavings: 1601040,
    },
    environmentalImpact: {
      co2Reduction: 9600,
      treesEquivalent: 457,
      annualEnergyProduction: 9855,
    },
    performanceMetrics: {
      systemEfficiency: 95,
      uptime: 99.9,
      peakOutput: 6,
      averageDailyProduction: 27,
    },
    challenges: [
      "Crippling Meralco bill of ₱6,695.57 with disconnection threat",
      "Complete dependence on grid power with no backup system",
      "High energy consumption from power-hungry household appliances",
      "Unpredictable electricity rate hikes causing financial stress",
      "Daily anxiety about energy costs and potential disconnection",
    ],
    solutions: [
      "Custom-designed 6kW hybrid solar system tailored to household needs",
      "Smart energy management with Deye Hybrid Inverter for optimal power flow",
      "High-efficiency bifacial panels capturing maximum sunlight",
      "LiFePO₄ battery storage for nighttime use and backup power",
      "Complete energy independence eliminating grid dependency",
    ],
    testimonials: {
      quote:
        "Loko tong si Meralco, saan kay kinuha yan ₱24 pesos? Irereklamo ko pa ba yan kay Meralco? 😀😃",
      author: "Arjay Nepomuceno",
      role: "Homeowner, Bagong Ilog, Pasig City",
    },
    gallery: [
      {
        src: "/images/arjaybill.jpg",
        alt: "Meralco electric bill before solar installation - ₱6,695.57",
        caption:
          "April 2025: Meralco bill at ₱6,695.57 with disconnection threat.",
      },
      {
        src: "/images/arjaybill2.jpg",
        alt: "Meralco electric bill after solar installation - ₱24.07",
        caption:
          "June 2025: Bill reduced to just ₱24.07 after solar installation.",
      },
    ],
  },
  "bacoor-cavite-rescue": {
    projectOverview: {
      challenge:
        "Homeowner in Bacoor, Cavite was trapped with a failing 5kW solar system from a fly-by-night installer. System underperformed, bills rose to ₱23,110 monthly, and original installer abandoned support with no documentation or warranty.",
      solution:
        "Sunphil Solar conducted comprehensive system redesign: installed steel rooftop trusses for expansion, upgraded to 12kW Deye Hybrid Inverter, replaced panels with 14 x 615W Canadian Bifacial Panels, and added 2 x 51.2V 314Ah LiFePO4 batteries for optimal energy storage.",
      results:
        "Electric bill reduced from ₱23,110 to ₱6,787 within 30 days, achieving ₱16,323 monthly savings (₱192,000 annually). Client regained energy independence with reliable system, proper documentation, and ongoing support.",
    },
    financialAnalysis: {
      totalInvestment: 490000,
      monthlySavings: 16323,
      paybackPeriod: 2.5,
      annualROI: 40.0,
      lifetimeSavings: 3917520,
    },
    environmentalImpact: {
      co2Reduction: 2400,
      treesEquivalent: 120,
      annualEnergyProduction: 23360,
    },
    performanceMetrics: {
      systemEfficiency: 97,
      uptime: 99.9,
      peakOutput: 10.8,
      averageDailyProduction: 64,
    },
    challenges: [
      "Failed 5kW system from fly-by-night installer with no documentation",
      "Degraded 450W panels with significantly reduced output",
      "Overloaded inverter for current household energy demands",
      "No rooftop space for expansion under existing configuration",
      "Complete lack of warranty coverage or technical support",
      "Rising electricity bills despite solar installation",
    ],
    solutions: [
      "Comprehensive system redesign with steel rooftop truss expansion",
      "Upgraded to 12kW Deye Hybrid Inverter for better load handling",
      "Replaced outdated panels with high-efficiency 615W bifacial panels",
      "Integrated dual battery system for optimal energy storage",
      "Provided complete documentation, permits, and warranty coverage",
      "Established ongoing monitoring and support relationship",
    ],
    testimonials: {
      quote:
        "This is what solar should've felt like from the start. I made the mistake of choosing the cheapest offer before. But with Sunphil Solar, I got real savings, real service, and real peace of mind.",
      author: "Eduardo Pilapil",
      role: "Solar System Rescue Client",
    },
    beforeAfter: {
      beforeImage: "/images/failed-system.jpg",
      afterImage: "/images/project9.jpg",
      beforeDescription:
        "Failed 5kW system with degraded 450W panels, overloaded inverter, and no rooftop expansion space. Monthly bills at ₱23,110 with no support or warranty.",
      afterDescription:
        "Upgraded 12kW system with 615W bifacial panels, dual battery storage, and rooftop truss expansion. Monthly bills reduced to ₱6,787 with full support and warranty.",
    },
    gallery: [
      {
        src: "/images/truss-installation.jpg",
        alt: "Steel rooftop truss installation for solar panel expansion",
        caption: "Custom steel trusses installed to create more rooftop space.",
      },
      {
        src: "/images/truss-installation2.jpg",
        alt: "Additional view of the rooftop truss installation",
        caption: "Ensuring a solid foundation for the upgraded solar panels.",
      },
      {
        src: "/images/bill-comparison-before.jpg",
        alt: "Meralco electric bill before solar upgrade",
        caption: "Before Upgrade: The monthly electric bill was ₱23,110.",
      },
      {
        src: "/images/bill-comparison-after.jpg",
        alt: "Meralco electric bill after solar upgrade",
        caption: "After Upgrade: The bill dropped to just ₱6,787.",
      },
    ],
  },
  "commonwealth-quezon-city": {
    projectOverview: {
      challenge:
        "The client was experiencing high Meralco bills ranging from ₱4,000 to ₱6,000 due to a monthly consumption of 280-350 kWh. The rising costs were a constant financial stress for the household.",
      solution:
        "Sunphil Solar designed and installed a custom 6kW hybrid solar system. The setup includes a 6kW Deye inverter, 10 high-efficiency 615W Canadian Bifacial panels, and a 51.2V 314Ah LiFePO₄ battery for backup power and nighttime use.",
      results:
        "The client's Meralco bill plummeted to just ₱96.37 in the first month. Grid consumption was reduced by 98%, leading to monthly savings of over ₱5,000 and providing energy security during power outages.",
    },
    financialAnalysis: {
      totalInvestment: 280000,
      monthlySavings: 5000,
      paybackPeriod: 4.7,
      annualROI: 21.4,
      lifetimeSavings: 1200000,
    },
    environmentalImpact: {
      co2Reduction: 9600,
      treesEquivalent: 457,
      annualEnergyProduction: 9855,
    },
    performanceMetrics: {
      systemEfficiency: 90,
      uptime: 99.9,
      peakOutput: 6,
      averageDailyProduction: 27,
    },
    challenges: [
      "Soaring Meralco bills in the ₱4,000-₱6,000 range.",
      "High monthly energy consumption of 280-350 kWh.",
      "Lack of energy stability and no protection from power outages.",
      "Anticipated increase in electricity costs during summer.",
    ],
    solutions: [
      "Installation of a 6kW Deye Hybrid Inverter for smart energy management.",
      "Use of 10 high-efficiency 615W Canadian Bifacial Solar Panels to maximize generation.",
      "Integration of a 51.2V 314Ah LiFePO₄ Battery for backup and nighttime power.",
      "A custom-designed system tailored to the client's specific consumption patterns.",
      "The system is designed to be future-ready for easy upgrades.",
    ],
    testimonials: {
      quote:
        "Hindi ako nagkamali sa investment ko, saka syempre, hindi ako nagkamali na kayo nag-install. Sulit ang battery ninyo, hindi tulad ng iba na mababa ang capacity pero mahal.",
      author: "Gerry Pacammara",
      role: "Homeowner, Brgy. Commonwealth, Quezon City",
    },
    gallery: [
      {
        src: "/images/gerry-pacammara.jpg",
        alt: "Before and after Meralco bill for Gerry Pacammara",
        caption:
          "The client's bill dropped from over ₱5,000 to just ₱96.37 after the solar installation.",
      },
    ],
  },
  "naic-cavite": {
    projectOverview: {
      challenge:
        "Marvin Lucero was struggling with consistently high Meralco bills averaging ₱5,381.80 monthly, consuming 407 kWh per month. The financial burden of nearly ₱180 daily electricity costs was taking a toll on his household budget, despite efforts to conserve energy.",
      solution:
        "Sunphil Solar installed a custom 6kW hybrid solar system on February 28, 2025, featuring a 6kW Deye Hybrid Inverter for intelligent energy management, 13 x 600W Canadian Bifacial Solar Panels for maximum energy capture, and a 51.2V 314Ah LiFePO₄ Battery for reliable backup power and nighttime energy storage.",
      results:
        "Marvin's Meralco consumption dropped from 407 kWh to just 10 kWh, reducing his bill from ₱5,381.80 to ₱144.47, a 97.3% reduction. The system now generates nearly all his household energy needs, providing complete energy independence and significant monthly savings.",
    },
    financialAnalysis: {
      totalInvestment: 280000,
      monthlySavings: 5237,
      paybackPeriod: 4.5,
      annualROI: 22.4,
      lifetimeSavings: 1256880,
    },
    environmentalImpact: {
      co2Reduction: 9600,
      treesEquivalent: 457,
      annualEnergyProduction: 9855,
    },
    performanceMetrics: {
      systemEfficiency: 95,
      uptime: 99.9,
      peakOutput: 6,
      averageDailyProduction: 27,
    },
    challenges: [
      "Consistently high Meralco bills averaging ₱5,381.80 monthly",
      "High energy consumption of 407 kWh per month",
      "Daily electricity costs of nearly ₱180 putting strain on household budget",
      "Limited energy conservation options despite efforts to save",
      "No backup power system for outages or emergencies",
    ],
    solutions: [
      "Custom-designed 6kW hybrid solar system tailored to household energy needs",
      "Smart energy management with Deye Hybrid Inverter for optimal power flow",
      "High-efficiency bifacial panels capturing maximum sunlight even in variable weather",
      "LiFePO₄ battery storage for nighttime use and backup power during outages",
      "Complete energy independence reducing grid consumption by 97.3%",
    ],
    testimonials: {
      quote:
        "Very satisfied Sir. Nag bi-bills na lang ako ng ₱100 to ₱200 per month. Hindi na ako nangangamba tuwing dumarating ang bill. Alam ko na kaya ko na.",
      author: "Marvin Lucero",
      role: "Homeowner, Naic, Cavite",
    },
    gallery: [
      {
        src: "/images/marvin-cabuhat.jpg",
        alt: "Marvin Lucero's Meralco bill before solar installation",
        caption:
          "February 2025: Meralco bill at ₱5,381.80 with 407 kWh consumption.",
      },
      {
        src: "/images/marvin-cabuhat2.jpg",
        alt: "Marvin Lucero's Meralco bill after solar installation",
        caption:
          "June 2025: Bill reduced to just ₱144.47 with only 10 kWh consumption.",
      },
      {
        src: "/images/marvin-cabuhat3.jpg",
        alt: "Marvin Lucero's energy consumption chart showing dramatic reduction",
        caption:
          "Energy consumption chart showing the dramatic drop from 407 kWh to 10 kWh.",
      },
    ],
  },
  "upper-bicutan-taguig": {
    projectOverview: {
      challenge:
        "Jose Rey Paguiton Paz was facing crippling Meralco bills of ₱12,994.27 monthly with 960 kWh consumption, representing a daily electricity cost of over ₱430. The household's high energy demands and complete grid dependency were creating significant financial strain in Upper Bicutan, Taguig City.",
      solution:
        "Sunphil Solar designed and installed a custom 8kW hybrid solar system on June 6, 2025, featuring an 8kW Deye Hybrid Inverter, 18 x 620W AE Bifacial Solar Panels (11.16kW total capacity), and 2 x 51.2V 314Ah LiFePO4 Batteries (32.2kWh total storage) for maximum energy independence and backup power.",
      results:
        "Mr. Paz's monthly consumption dropped from 960 kWh to just 134 kWh (86% reduction), with his Meralco bill plummeting from ₱12,994.27 to ₱1,781.59 achieving ₱11,212.68 monthly savings (86% cost reduction). The system now provides near-complete energy independence with reliable backup power.",
    },
    financialAnalysis: {
      totalInvestment: 455000,
      monthlySavings: 11212,
      paybackPeriod: 3.4,
      annualROI: 29.6,
      lifetimeSavings: 2690880,
    },
    environmentalImpact: {
      co2Reduction: 9900,
      treesEquivalent: 471,
      annualEnergyProduction: 12100,
    },
    performanceMetrics: {
      systemEfficiency: 96,
      uptime: 99.9,
      peakOutput: 8,
      averageDailyProduction: 33,
    },
    challenges: [
      "Crippling Meralco bills of ₱12,994.27 monthly with 960 kWh consumption",
      "Daily electricity costs exceeding ₱430 putting severe strain on household budget",
      "Complete dependence on grid power with no backup system",
      "High energy consumption from power-hungry household appliances",
      "No protection from rising electricity rates in Metro Manila",
    ],
    solutions: [
      "Custom-designed 8kW hybrid solar system with 11.16kW panel capacity",
      "Smart energy management with Deye Hybrid Inverter for optimal power flow",
      "High-efficiency AE Bifacial panels capturing maximum sunlight",
      "Dual LiFePO4 battery storage (32.2kWh) for nighttime use and backup power",
      "Complete energy independence reducing grid consumption by 86%",
    ],
    testimonials: {
      quote:
        "Good day po. i-update ko lang po kayo ng performance ng installed 8kw solar, from almost 13k naging 1.7k na lang bill namin. thank you po ulit.",
      author: "Jose Rey Paguiton Paz",
      role: "Homeowner, Upper Bicutan, Taguig City",
    },
    beforeAfter: {
      beforeImage: "/images/Jose-Rey-before.jpg",
      afterImage: "/images/Jose-Rey-after.jpg",
      beforeDescription:
        "May 2025: Meralco bill at ₱12,994.27 with 960 kWh consumption, representing daily electricity costs of over ₱430.",
      afterDescription:
        "July 2025: Bill reduced to just ₱1,781.59 with only 134 kWh consumption, achieving 86% savings and near-complete energy independence.",
    },
  },
  "sampaloc-manila": {
    projectOverview: {
      challenge:
        "Kath Start was struggling with extremely high Meralco bills of ₱13,075.83 monthly with 977 kWh consumption, representing a daily electricity cost of over ₱435. The household's high energy demands in Manila's urban environment were creating significant financial strain in Sampaloc, Manila.",
      solution:
        "Sunphil Solar designed and installed a custom 6kW hybrid solar system on June 26, 2025, featuring a 6kW Deye Hybrid Inverter, 13 x 615W Canadian Bifacial Solar Panels (7.995kW total capacity), and a 51.2V 314Ah LiFePO4 Battery (16.1kWh storage) for optimal energy independence in Manila's urban environment.",
      results:
        "Kath's monthly consumption dropped from 977 kWh to just 265 kWh (73% reduction), with her Meralco bill plummeting from ₱13,075.83 to ₱3,444.99 achieving ₱9,630.84 monthly savings (74% cost reduction). The system now provides significant energy independence with reliable backup power in Manila's dense urban setting.",
    },
    financialAnalysis: {
      totalInvestment: 300000,
      monthlySavings: 9630,
      paybackPeriod: 2.6,
      annualROI: 38.5,
      lifetimeSavings: 2311200,
    },
    environmentalImpact: {
      co2Reduction: 8760,
      treesEquivalent: 417,
      annualEnergyProduction: 11680,
    },
    performanceMetrics: {
      systemEfficiency: 94,
      uptime: 99.9,
      peakOutput: 6,
      averageDailyProduction: 32,
    },
    challenges: [
      "Extremely high Meralco bills of ₱13,075.83 monthly with 977 kWh consumption",
      "Daily electricity costs exceeding ₱435 putting severe strain on household budget",
      "Complete dependence on grid power with no backup system in urban Manila",
      "High energy consumption from power-hungry household appliances",
      "No protection from rising electricity rates in Metro Manila",
    ],
    solutions: [
      "Custom-designed 6kW hybrid solar system with 7.995kW panel capacity",
      "Smart energy management with Deye Hybrid Inverter for optimal power flow",
      "High-efficiency Canadian Bifacial panels capturing maximum sunlight in urban environment",
      "LiFePO4 battery storage (16.1kWh) for nighttime use and backup power",
      "Significant energy independence reducing grid consumption by 73%",
    ],
    testimonials: {
      quote:
        "Good day po! I-uupdate ko lng kyo kc sobrang happy ko ngaun!dumating na kc un bill ko s meralco at sobrang nkka-excite ang bill ko! From 13k last june ngaun 3,400 nlng!! Salamat boss legit ang SunphilSolar/Fairview Solarista!",
      author: "Kath Start",
      role: "Homeowner, Sampaloc, Manila",
    },
    beforeAfter: {
      beforeImage: "/images/Kath-Start-before.jpg",
      afterImage: "/images/Kath-Start-after.jpg",
      beforeDescription:
        "June 2025: Meralco bill at ₱13,075.83 with 977 kWh consumption, representing daily electricity costs of over ₱435.",
      afterDescription:
        "July 2025: Bill reduced to just ₱3,444.99 with only 265 kWh consumption, achieving 74% savings and significant energy independence.",
    },
  },
  "antipolo-rizal": {
    projectOverview: {
      challenge:
        "Jay-r Jaminola Salvador was facing extremely high Meralco bills ranging from ₱24,000 to ₱28,000 monthly, with his highest bill reaching ₱28,000+. The household's high energy consumption and complete grid dependency were creating severe financial strain in Antipolo, Rizal, especially during the challenging typhoon season.",
      solution:
        "Sunphil Solar designed and installed a custom 12kW hybrid solar system on June 25, 2025, featuring a 12kW Deye Hybrid Inverter, 24 x 615W Canadian Bifacial Solar Panels (14.76kW total capacity), and 3 x 51.2V 314Ah LiFePO4 Batteries (48.3kWh total storage) for maximum energy independence and extended backup power during outages.",
      results:
        "Mr. Salvador's monthly bill dropped from ₱24,000-₱28,000 to just ₱8,031.74, achieving 68-71% reduction in electricity costs despite continuous storms. The system now provides significant energy independence with 48.3kWh battery backup for 16-20 hours of typical household consumption.",
    },
    financialAnalysis: {
      totalInvestment: 650000,
      monthlySavings: 16000,
      paybackPeriod: 3.4,
      annualROI: 29.5,
      lifetimeSavings: 3840000,
    },
    environmentalImpact: {
      co2Reduction: 13200,
      treesEquivalent: 629,
      annualEnergyProduction: 18000,
    },
    performanceMetrics: {
      systemEfficiency: 97,
      uptime: 99.9,
      peakOutput: 12,
      averageDailyProduction: 66,
    },
    challenges: [
      "Extremely high Meralco bills ranging from ₱24,000 to ₱28,000 monthly",
      "Highest recorded bill of ₱28,000+ creating severe financial strain",
      "Complete dependence on grid power with no backup system",
      "High energy consumption household with significant electrical load",
      "Challenging weather conditions with continuous storms and typhoons",
      "No protection from rising electricity rates in Antipolo, Rizal",
    ],
    solutions: [
      "Custom-designed 12kW hybrid solar system with 14.76kW panel capacity",
      "Smart energy management with Deye Hybrid Inverter for optimal power flow",
      "High-efficiency Canadian Bifacial panels capturing maximum sunlight",
      "Triple LiFePO4 battery storage (48.3kWh) for extended backup power",
      "Weather-resistant system design maintaining performance during storms",
      "Significant energy independence reducing grid consumption by 68-71%",
    ],
    testimonials: {
      quote: "Past bill 28k, 25k 24k to 8k puro bagyo pa, salamat po.",
      author: "Jay-r Jaminola Salvador",
      role: "Homeowner, Antipolo, Rizal",
    },
    beforeAfter: {
      beforeImage: "/images/Jay-r-before.jpg",
      afterImage: "/images/Jay-r-after.jpg",
      beforeDescription:
        "June-July 2025: Meralco bills ranging from ₱24,000 to ₱28,000 with highest recorded bill of ₱28,000+, representing severe financial strain.",
      afterDescription:
        "July 2025: Bill reduced to just ₱8,031.74 achieving 68-71% savings despite continuous storms and challenging weather conditions.",
    },
  },
  "vista-verde-north-caloocan": {
    projectOverview: {
      challenge:
        "Joel Padojinog was facing extremely high Meralco bills of ₱12,274.62 monthly with 910 kWh consumption, representing a daily electricity cost of over ₱410. The household's high energy demands in North Caloocan's urban environment were creating significant financial strain, with complete grid dependency and no backup power system.",
      solution:
        "Sunphil Solar designed and installed a custom 8kW hybrid solar system on June 21, 2025, featuring an 8kW Deye Hybrid Inverter, 18 x 620W AE Bifacial Solar Panels (11.16kW total capacity), and 2 x 51.2V 314Ah LiFePO4 Batteries (32.2kWh total storage) for maximum energy independence and extended backup power during outages.",
      results:
        "Mr. Padojinog's monthly consumption dropped from 910 kWh to just 16 kWh (98.2% reduction), with his Meralco bill plummeting from ₱12,274.62 to ₱225.03 achieving ₱12,049.59 monthly savings (98.2% cost reduction). The system now provides near-complete energy independence with reliable backup power, even during week-long storms.",
    },
    financialAnalysis: {
      totalInvestment: 470000,
      monthlySavings: 12049,
      paybackPeriod: 3.3,
      annualROI: 30.8,
      lifetimeSavings: 2891760,
    },
    environmentalImpact: {
      co2Reduction: 10920,
      treesEquivalent: 520,
      annualEnergyProduction: 15000,
    },
    performanceMetrics: {
      systemEfficiency: 96,
      uptime: 99.9,
      peakOutput: 8,
      averageDailyProduction: 41,
    },
    challenges: [
      "Extremely high Meralco bills of ₱12,274.62 monthly with 910 kWh consumption",
      "Daily electricity costs exceeding ₱410 putting severe strain on household budget",
      "Complete dependence on grid power with no backup system in urban North Caloocan",
      "High energy consumption from power-hungry household appliances",
      "No protection from rising electricity rates in Metro Manila",
      "Vulnerability to frequent power outages during storms",
    ],
    solutions: [
      "Custom-designed 8kW hybrid solar system with 11.16kW panel capacity",
      "Smart energy management with Deye Hybrid Inverter for optimal power flow",
      "High-efficiency AE Bifacial panels capturing maximum sunlight in urban environment",
      "Dual LiFePO4 battery storage (32.2kWh) for extended backup power during outages",
      "Weather-resistant system design maintaining performance during storms",
      "Near-complete energy independence reducing grid consumption by 98.2%",
    ],
    testimonials: {
      quote: "Solid kahit binagyo ng 1 week, laking ginhawa sa monthly bills.",
      author: "Joel Padojinog",
      role: "Homeowner, Vista Verde, North Caloocan",
    },
    beforeAfter: {
      beforeImage: "/images/Joel-Before.jpg",
      afterImage: "/images/Joel-After.jpg",
      beforeDescription:
        "May 2025: Meralco bill at ₱12,274.62 with 910 kWh consumption, representing daily electricity costs of over ₱410.",
      afterDescription:
        "August 2025: Bill reduced to just ₱225.03 with only 16 kWh consumption, achieving 98.2% savings and near-complete energy independence even during week-long storms.",
    },
  },
  "san-antonio-quezon": {
    projectOverview: {
      challenge:
        "Mr. Imperial was facing crippling Electricity bill of ₱38,000 monthly for his fighting cock farm in San Antonio, Quezon. The farm's massive energy consumption from lighting, ventilation, feeding systems, and climate control for hundreds of fighting cocks was creating severe financial strain, requiring a large-scale solar solution for agricultural operations.",
      solution:
        "Sunphil Solar designed and installed a massive 32kW hybrid solar system for the fighting cock farm, featuring multiple high-capacity Deye Hybrid Inverters, 52 x 615W Canadian Bifacial Solar Panels (32kW total capacity), and multiple 51.2V 314Ah LiFePO4 Batteries for maximum energy independence and extended backup power for agricultural operations.",
      results:
        "Mr. Imperial's monthly bill dropped from ₱38,000 to just ₱4,000, achieving ₱34,000 monthly savings (89.5% cost reduction). The massive 32kW system now provides near-complete energy independence for the fighting cock farm, representing one of the most significant agricultural solar transformations in the region.",
    },
    financialAnalysis: {
      totalInvestment: 1300000,
      monthlySavings: 34000,
      paybackPeriod: 3.2,
      annualROI: 31.4,
      lifetimeSavings: 8160000,
    },
    environmentalImpact: {
      co2Reduction: 38400,
      treesEquivalent: 1829,
      annualEnergyProduction: 52560,
    },
    performanceMetrics: {
      systemEfficiency: 98,
      uptime: 99.9,
      peakOutput: 32,
      averageDailyProduction: 144,
    },
    challenges: [
      "Crippling Electricity bill of ₱38,000 monthly for fighting cock farm operations",
      "Complete dependence on grid power with no backup system for agricultural operations",
      "High energy consumption from lighting, ventilation, and climate control systems",
      "Feeding systems and automated equipment requiring constant power supply",
      "No protection from rising electricity rates affecting farm profitability",
      "Requirement for large-scale solar solution to handle agricultural energy demands",
      "Complex installation requiring multiple inverters and extensive battery storage",
    ],
    solutions: [
      "Massive 32kW hybrid solar system with 32kW panel capacity for farm operations",
      "Multiple Deye Hybrid Inverters for smart energy management at agricultural scale",
      "High-efficiency Canadian Bifacial panels capturing maximum sunlight",
      "Multiple LiFePO4 battery storage units for extended backup power during outages",
      "Large-scale system design maintaining performance for agricultural energy demands",
      "Near-complete energy independence reducing grid consumption by 89.5%",
      "Reliable power supply for critical farm operations including lighting and ventilation",
    ],
    testimonials: {
      quote:
        "From ₱38,000 to ₱4,000 na lang ang bill namin. Sobrang laking tipid! Malaking tulong sa farm operations namin.",
      author: "Mr. Imperial",
      role: "Fighting Cock Farm Owner, San Antonio, Quezon",
    },
    beforeAfter: {
      beforeImage: "/images/project17.jpg",
      afterImage: "/images/project17.jpg",
      beforeDescription:
        "Before Installation: Electricity bill at ₱38,000 monthly for fighting cock farm operations, representing massive energy consumption and financial strain.",
      afterDescription:
        "After Installation: Bill reduced to just ₱4,000 achieving 89.5% savings and near-complete energy independence for farm operations.",
      videoUrl: "https://www.youtube.com/embed/ZEqo9-cJKbI",
      videoTimestamp: 1380, // 23:00 minutes = 1380 seconds
    },
    gallery: [
      {
        src: "https://img.youtube.com/vi/ZEqo9-cJKbI/maxresdefault.jpg",
        alt: "32kW Hybrid Solar Installation for Fighting Cock Farm in San Antonio, Quezon",
        caption:
          "Massive 32kW hybrid solar system installation for fighting cock farm featuring 52 bifacial panels and multiple inverters.",
      },
    ],
  },
  "mabalacat-pampanga-8kw": {
    projectOverview: {
      challenge:
        "Sir Yhe Yhe Lansang was facing high Meralco bills of ₱4,912.80 monthly with a due date of June 25, 2025. The household's energy consumption and complete grid dependency were creating financial strain in Mabalacat, Pampanga, requiring a reliable solar solution for energy independence.",
      solution:
        "Sunphil Solar designed and installed a custom 8kW hybrid solar system on June 20, 2025, featuring an 8kW Deye Hybrid Inverter for smart energy management, 14 x 615W Canadian Bifacial Solar Panels for maximum energy capture, and a 51.2V 314Ah LiFePO₄ Battery for reliable backup power and nighttime energy storage.",
      results:
        "Sir Yhe Yhe's monthly bill dropped from ₱4,912.80 to just ₱646.79, achieving ₱4,266.01 monthly savings (86.8% cost reduction). The system now provides significant energy independence with reliable backup power, reducing grid consumption by over 86%.",
    },
    financialAnalysis: {
      totalInvestment: 360000,
      monthlySavings: 4266,
      paybackPeriod: 7.0,
      annualROI: 14.2,
      lifetimeSavings: 1023840,
    },
    environmentalImpact: {
      co2Reduction: 9900,
      treesEquivalent: 471,
      annualEnergyProduction: 12100,
    },
    performanceMetrics: {
      systemEfficiency: 95,
      uptime: 99.9,
      peakOutput: 8,
      averageDailyProduction: 33,
    },
    challenges: [
      "High Meralco bills of ₱4,912.80 monthly with June 25, 2025 due date",
      "Complete dependence on grid power with no backup system",
      "High energy consumption from household appliances",
      "No protection from rising electricity rates in Pampanga",
      "Limited energy conservation options despite efforts to save",
    ],
    solutions: [
      "Custom-designed 8kW hybrid solar system tailored to household energy needs",
      "Smart energy management with Deye Hybrid Inverter for optimal power flow",
      "High-efficiency bifacial panels capturing maximum sunlight",
      "LiFePO₄ battery storage for nighttime use and backup power during outages",
      "Significant energy independence reducing grid consumption by 86.8%",
    ],
    testimonials: {
      quote:
        "From ₱4,912.80 to ₱646.79 na lang ang bill namin. Malaking tipid talaga! Salamat sa Sunphil Solar.",
      author: "Sir Yhe Yhe Lansang",
      role: "Homeowner, Mabalacat, Pampanga",
    },
    beforeAfter: {
      beforeImage: "/images/yhe-before.jpg",
      afterImage: "/images/yhe-after.jpg",
      beforeDescription:
        "June 2025: Meralco bill at ₱4,912.80 with due date June 25, 2025, representing high energy consumption and financial strain.",
      afterDescription:
        "July 2025: Bill reduced to just ₱646.79 with due date July 25, 2025, achieving 86.8% savings and significant energy independence.",
    },
  },
  "marikina-city-2025": {
    projectOverview: {
      challenge:
        "Richard Jay Baetiong was facing the dual burden that plagues many Filipino households: high electricity bills of ₱8,453.33 monthly (633 kWh consumption), frequent power outages disrupting daily life and business operations, and escalating MERALCO rates with no relief in sight. With electricity costs continuing to climb and grid reliability remaining questionable, Richard needed a solution that would provide both immediate savings and long-term energy security in Brgy. Nangka, Marikina City, Metro Manila.",
      solution:
        "Sunphil Solar engineered a comprehensive energy independence system tailored to Richard's consumption patterns and backup power needs. The custom 6kW hybrid solar system installed on July 2, 2025 features a 6kW Deye Hybrid Inverter with smart load management, 12 x 615W Canadian Solar Bifacial Panels (7.38kW total capacity) for maximum energy capture, and a 51.2V 314Ah LiFePO₄ Battery (16 kWh usable capacity) for reliable backup power and nighttime energy storage.",
      results:
        "Within 15 days post-installation, Richard's grid consumption dropped from 633 kWh (₱8,453.33) to 333 kWh (₱4,429.27), cutting the estimated bill in half. For the month following installation, actual Meralco-supplied energy was only 13 kWh, with the total bill amounting to just ₱194.69, achieving 97.7% cost reduction. The system now provides near-complete energy independence with 8-12 hours of backup power for essential loads.",
    },
    financialAnalysis: {
      totalInvestment: 300000,
      monthlySavings: 8258,
      paybackPeriod: 3.0,
      annualROI: 33.0,
      lifetimeSavings: 1981920,
    },
    environmentalImpact: {
      co2Reduction: 8760,
      treesEquivalent: 417,
      annualEnergyProduction: 11680,
    },
    performanceMetrics: {
      systemEfficiency: 95,
      uptime: 99.9,
      peakOutput: 6,
      averageDailyProduction: 32,
    },
    challenges: [
      "High Meralco bills of ₱8,453.33 monthly with 633 kWh consumption",
      "Frequent power outages affecting daily life and business operations",
      "Escalating MERALCO rates with no relief in sight",
      "Complete dependence on grid power with no backup system",
      "Rising electricity costs creating financial strain in Marikina City",
      "Unreliable grid infrastructure affecting daily operations",
    ],
    solutions: [
      "Comprehensive energy independence system with 7.38kW bifacial panel capacity",
      "Smart hybrid inverter with automatic switching between solar, battery, and grid power",
      "High-efficiency Canadian Solar bifacial panels capturing sunlight from both sides",
      "LiFePO₄ battery technology providing 6,000+ cycle lifespan with superior safety",
      "8-12 hours backup power capability for essential loads during outages",
      "Scalable design allowing for future expansion as energy needs grow",
    ],
    testimonials: {
      quote:
        "Salamat po! After 15 days, solar usage cut my bill from ₱8,453.33 (633 kWh) to ₱4,429.27 (333 kWh). Hindi ko inexpect na ganito kabilis makikita yung savings!",
      author: "Richard Jay Baetiong",
      role: "Homeowner, Marikina City, Metro Manila",
    },
    beforeAfter: {
      beforeImage: "/images/Richard-before.jpg",
      afterImage: "/images/Richard-after.jpg",
      beforeDescription:
        "Before Installation: Meralco bill at ₱8,453.33 monthly with 633 kWh consumption, representing high energy costs and grid dependency.",
      middleImage: "/images/richard-middle.jpg",
      middleDescription:
        "Results (Within 15 Days Post-Installation): Grid consumption dropped from about 600 kWh (₱8,453.33) to 333 kWh (₱4,429.27) per the Meralco app, cutting the estimated bill in half.",
      afterDescription:
        "After Installation: Bill reduced to just ₱194.69 with only 13 kWh consumption, achieving 97.7% savings and near-complete energy independence within weeks.",
    },
    gallery: [
      {
        src: "/images/Richard-before.jpg",
        alt: "Richard Jay Baetiong's Meralco bill before solar installation",
        caption:
          "Before Installation: Meralco bill at ₱8,453.33 monthly with 633 kWh consumption.",
      },
      {
        src: "/images/richard-middle.jpg",
        alt: "Richard Jay Baetiong's solar system installation progress",
        caption:
          "6kW hybrid solar system installation featuring 12 Canadian bifacial panels and LiFePO₄ battery storage.",
      },
      {
        src: "/images/Richard-after.jpg",
        alt: "Richard Jay Baetiong's Meralco bill after solar installation",
        caption:
          "After Installation: Bill reduced to just ₱194.69 with only 13 kWh consumption.",
      },
    ],
  },
  "buenavista-general-trias-cavite": {
    projectOverview: {
      challenge:
        "Our client in General Trias was struggling with consistently high electricity bills, consuming 618 kWh monthly with bills reaching ₱8,703.23. Living in a growing suburban area with increasing energy demands, they needed a robust solution for long-term energy independence.",
      solution:
        "Sunphil Solar designed and installed a comprehensive 8kW hybrid solar system on July 19, 2025, featuring an 8kW Deye Hybrid Inverter for smart energy management, 16 x 615W Canadian Solar Bifacial Panels for maximum energy capture, and a 51.2V 314Ah LiFePO₄ Battery for reliable backup power and nighttime energy storage.",
      results:
        "The client's monthly consumption dropped from 618 kWh to just 82 kWh (87% reduction), with their Meralco bill plummeting from ₱8,703.23 to ₱1,267.74 achieving ₱7,435.49 monthly savings (85.4% cost reduction). The system performed excellently during the rainy season, providing significant energy independence despite challenging weather conditions.",
    },
    financialAnalysis: {
      totalInvestment: 380000,
      monthlySavings: 7435,
      paybackPeriod: 4.3,
      annualROI: 23.5,
      lifetimeSavings: 1784400,
    },
    environmentalImpact: {
      co2Reduction: 10560,
      treesEquivalent: 503,
      annualEnergyProduction: 14400,
    },
    performanceMetrics: {
      systemEfficiency: 96,
      uptime: 99.9,
      peakOutput: 8,
      averageDailyProduction: 39,
    },
    challenges: [
      "Consistently high electricity bills of ₱8,703.23 monthly with 618 kWh consumption",
      "Growing suburban area with increasing energy demands",
      "Complete dependence on grid power with no backup system",
      "High energy consumption from household appliances",
      "No protection from rising electricity rates in Cavite",
      "Need for robust solution for long-term energy independence",
    ],
    solutions: [
      "Comprehensive 8kW hybrid solar system with 16 x 615W Canadian Solar Bifacial Panels",
      "Smart energy management with Deye Hybrid Inverter for optimal power flow",
      "High-efficiency Canadian Solar Bifacial panels capturing maximum sunlight",
      "LiFePO₄ battery storage for nighttime use and backup power",
      "Weather-resilient setup designed for Philippine rainy season performance",
      "Significant energy independence reducing grid consumption by 87%",
    ],
    testimonials: {
      quote:
        "We're happy sa significant decrease sa bill. Partida tag ulan pa.",
      author: "Client",
      role: "Homeowner, Buenavista I, General Trias, Cavite",
    },
    beforeAfter: {
      beforeImage: "/images/Asi-before.jpg",
      afterImage: "/images/Asi-after.jpg",
      beforeDescription:
        "June 20 - July 19, 2025: Meralco bill at ₱8,703.23 with 618 kWh consumption, representing high energy costs and grid dependency.",
      afterDescription:
        "July 20 - August 19, 2025: Bill reduced to just ₱1,267.74 with only 82 kWh consumption, achieving 85.4% savings and significant energy independence even during rainy season.",
    },
    gallery: [
      {
        src: "/images/Asi-before.jpg",
        alt: "Meralco electric bill before solar installation - ₱8,703.23",
        caption:
          "Before Installation: Meralco bill at ₱8,703.23 with 618 kWh consumption.",
      },
      {
        src: "/images/Asi-after.jpg",
        alt: "Meralco electric bill after solar installation - ₱1,267.74",
        caption:
          "After Installation: Bill reduced to just ₱1,267.74 with only 82 kWh consumption.",
      },
    ],
  },
  "los-banos-laguna-8kw-2025": {
    projectOverview: {
      challenge:
        "Edwin Lizarda was facing extremely high electricity bills of ₱14,868.84 monthly with 1,072 kWh consumption, representing a daily electricity cost of over ₱495. The household's high energy demands in Los Baños, Laguna were creating significant financial strain, with complete grid dependency and no backup power system.",
      solution:
        "Sunphil Solar designed and installed a custom 8kW hybrid solar system on June 6, 2025, featuring an 8kW Deye Hybrid Inverter for intelligent energy management, 16 x 615W Canadian Bifacial Solar Panels (9.84kW total capacity) for maximum energy capture, and a 51.2V 314Ah LiFePO₄ Battery (16kWh storage) for reliable backup power and nighttime energy storage.",
      results:
        "Mr. Lizarda's monthly bill dropped from ₱14,868.84 to just ₱1,691.15, achieving ₱13,177.69 monthly savings (88.6% cost reduction). The system now provides near-complete energy independence with reliable backup power, reducing grid consumption by approximately 89%.",
    },
    financialAnalysis: {
      totalInvestment: 375000,
      monthlySavings: 13177,
      paybackPeriod: 2.3,
      annualROI: 42.9,
      lifetimeSavings: 2841000,
    },
    environmentalImpact: {
      co2Reduction: 12600,
      treesEquivalent: 600,
      annualEnergyProduction: 12000,
    },
    performanceMetrics: {
      systemEfficiency: 95,
      uptime: 99.9,
      peakOutput: 8,
      averageDailyProduction: 40,
    },
    challenges: [
      "Extremely high electricity bills of ₱14,868.84 monthly with 1,072 kWh consumption",
      "Daily electricity costs exceeding ₱495 putting severe strain on household budget",
      "Complete dependence on grid power with no backup system in Los Baños, Laguna",
      "High energy consumption from power-hungry household appliances",
      "No protection from rising electricity rates in Laguna province",
      "Requirement for large-scale solar solution to handle high energy demands",
    ],
    solutions: [
      "Custom-designed 8kW hybrid solar system with 9.84kW panel capacity",
      "Smart energy management with Deye Hybrid Inverter for optimal power flow",
      "High-efficiency Canadian Bifacial panels capturing maximum sunlight",
      "LiFePO₄ battery storage (16kWh) for nighttime use and backup power",
      "Optimal system sizing providing 95% solar coverage of monthly consumption",
      "Near-complete energy independence reducing grid consumption by 88.6%",
    ],
    testimonials: {
      quote: "Nakakatuwa po, 1600 na lang po monthly from 15k.",
      author: "Edwin Lizarda",
      role: "Homeowner, Los Baños, Laguna",
    },
    beforeAfter: {
      beforeImage: "/images/Edwin-before.jpg",
      afterImage: "/images/Edwin-after.jpg",
      beforeDescription:
        "June 2025: Electricity bill at ₱14,868.84 with 1,072 kWh consumption, representing high energy costs and grid dependency.",
      afterDescription:
        "August 2025: Bill reduced to just ₱1,691.15 achieving 88.6% savings and near-complete energy independence with the 8kW hybrid solar system.",
    },
    gallery: [
      {
        src: "/images/Edwin-before.jpg",
        alt: "Edwin Lizarda's electricity bill before solar installation",
        caption:
          "Before Installation: Electricity bill at ₱14,868.84 with 1,072 kWh consumption.",
      },
      {
        src: "/images/Edwin-after.jpg",
        alt: "Edwin Lizarda's electricity bill after solar installation",
        caption:
          "After Installation: Bill reduced to just ₱1,691.15 achieving 88.6% savings and near-complete energy independence.",
      },
    ],
  },
  "taytay-rizal-6kw-2025": {
    projectOverview: {
      challenge:
        "Diana Concepcion was facing extremely high Meralco bills of ₱10,532.82 monthly with 762 kWh consumption, representing a daily electricity cost of over ₱340. The household's high energy demands in San Juan, Taytay, Rizal were creating significant financial strain, with complete grid dependency and no backup power system.",
      solution:
        "Sunphil Solar designed and installed a custom 6kW hybrid solar system on July 15, 2025, featuring a 6kW Deye Hybrid Inverter for intelligent energy management, 12 x 615W Canadian Bifacial Solar Panels (7.38kW total capacity) for maximum energy capture, and a 51.2V 314Ah LiFePO₄ Battery (16kWh storage) for reliable backup power and nighttime energy storage.",
      results:
        "Diana's monthly consumption dropped from 762 kWh to just 55 kWh (92.8% reduction), with her Meralco bill plummeting from ₱10,532.82 to ₱747.30 achieving ₱9,785.52 monthly savings (92.9% cost reduction). The system now provides near-complete energy independence with reliable backup power, representing one of the most successful residential solar transformations in the region.",
    },
    financialAnalysis: {
      totalInvestment: 310000,
      monthlySavings: 9785,
      paybackPeriod: 2.6,
      annualROI: 37.9,
      lifetimeSavings: 2935656,
    },
    environmentalImpact: {
      co2Reduction: 8400,
      treesEquivalent: 400,
      annualEnergyProduction: 12000,
    },
    performanceMetrics: {
      systemEfficiency: 98,
      uptime: 99.9,
      peakOutput: 6,
      averageDailyProduction: 40,
    },
    challenges: [
      "Extremely high Meralco bills of ₱10,532.82 monthly with 762 kWh consumption",
      "Daily electricity costs exceeding ₱340 putting severe strain on household budget",
      "Complete dependence on grid power with no backup system in San Juan, Taytay, Rizal",
      "High energy consumption from power-hungry household appliances",
      "No protection from rising electricity rates in Rizal province",
      "Vulnerability to frequent power outages during storms and maintenance",
    ],
    solutions: [
      "Custom-designed 6kW hybrid solar system with 7.38kW panel capacity",
      "Smart energy management with Deye Hybrid Inverter for optimal power flow",
      "High-efficiency Canadian Bifacial panels capturing maximum sunlight",
      "LiFePO₄ battery storage (16kWh) for nighttime use and backup power",
      "Optimal system sizing providing 95% solar coverage of monthly consumption",
      "Near-complete energy independence reducing grid consumption by 92.8%",
    ],
    testimonials: {
      quote:
        "Good afternoon po. Eto na po meralco bill ko, Salamat po sa inyo.",
      author: "Diana Concepcion",
      role: "Homeowner, San Juan, Taytay, Rizal",
    },
    beforeAfter: {
      beforeImage: "/images/Diana-Before.jpg",
      afterImage: "/images/Diana-After.jpg",
      beforeDescription:
        "June 29 - July 28, 2025: Meralco bill at ₱10,532.82 with 762 kWh consumption, representing daily electricity costs of over ₱340.",
      afterDescription:
        "July 29 - August 28, 2025: Bill reduced to just ₱747.30 with only 55 kWh consumption, achieving 92.8% savings and near-complete energy independence.",
    },
    gallery: [
      {
        src: "/images/Diana-Before.jpg",
        alt: "Diana Concepcion's Meralco bill before solar installation",
        caption:
          "Before Installation: Meralco bill at ₱10,532.82 with 762 kWh consumption.",
      },
      {
        src: "/images/Diana-After.jpg",
        alt: "Diana Concepcion's Meralco bill after solar installation",
        caption:
          "After Installation: Bill reduced to just ₱747.30 with only 55 kWh consumption, achieving 92.8% savings.",
      },
    ],
  },
};

export default caseStudies;
