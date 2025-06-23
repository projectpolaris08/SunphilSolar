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
  };
  gallery?: {
    src: string;
    alt: string;
    caption: string;
  }[];
}

export const caseStudies: { [key: string]: CaseStudyData } = {
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
      annualROI: 40,
      lifetimeSavings: 4406900,
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
};

export default caseStudies;
