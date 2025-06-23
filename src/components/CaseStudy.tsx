import React from "react";
import {
  TrendingUp,
  DollarSign,
  Leaf,
  Zap,
  Calendar,
  Target,
  CheckCircle,
  BarChart3,
  Lightbulb,
  Shield,
  AlertTriangle,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

interface CaseStudyData {
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

interface CaseStudyProps {
  data: CaseStudyData;
  projectId: string;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ data, projectId }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-PH").format(num);
  };

  // Check if this is a rescue case
  const isRescueCase = projectId === "bacoor-cavite-rescue";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Rescue Case Badge */}
      {isRescueCase && (
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-full shadow-lg">
            <Heart className="h-5 w-5 mr-2" />
            Solar System Rescue Success Story
          </div>
          <p className="text-white/80 mt-3 text-lg">
            How we rescued a failing solar system and transformed it into a
            success story
          </p>
        </div>
      )}

      {/* Project Overview */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {isRescueCase ? "System Rescue Analysis" : "Case Study Analysis"}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div
            className={`p-6 rounded-xl border ${
              isRescueCase
                ? "bg-gradient-to-br from-red-50 to-red-100 border-red-200"
                : "bg-gradient-to-br from-red-50 to-red-100 border-red-200"
            }`}
          >
            <div className="flex items-center mb-4">
              {isRescueCase ? (
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
              ) : (
                <Target className="h-6 w-6 text-red-600 mr-3" />
              )}
              <h3 className="text-lg font-semibold text-red-900">
                {isRescueCase ? "Failed System" : "Challenge"}
              </h3>
            </div>
            <p className="text-red-800">{data.projectOverview.challenge}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center mb-4">
              <Lightbulb className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-blue-900">Solution</h3>
            </div>
            <p className="text-blue-800">{data.projectOverview.solution}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-green-900">Results</h3>
            </div>
            <p className="text-green-800">{data.projectOverview.results}</p>
          </div>
        </div>
      </div>

      {/* Financial Analysis */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
          <DollarSign className="h-6 w-6 text-green-600 mr-3" />
          Financial Analysis
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-600">
                Total Investment
              </h4>
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(data.financialAnalysis.totalInvestment)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-600">
                Monthly Savings
              </h4>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(data.financialAnalysis.monthlySavings)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-600">
                Payback Period
              </h4>
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {data.financialAnalysis.paybackPeriod} years
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-600">Annual ROI</h4>
              <BarChart3 className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {data.financialAnalysis.annualROI}%
            </p>
          </div>

          <div className="md:col-span-2 lg:col-span-2 mt-8 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-green-600 mr-3" />
              <h4 className="text-lg font-semibold text-green-900">
                Lifetime Savings Projection
              </h4>
            </div>
            <p className="text-3xl font-bold text-green-700">
              {formatCurrency(data.financialAnalysis.lifetimeSavings)}
            </p>
            <p className="text-sm text-green-600 mt-2">
              Over 25-year system lifetime
            </p>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
          <Leaf className="h-6 w-6 text-green-600 mr-3" />
          Environmental Impact
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              CO₂ Reduction
            </h4>
            <p className="text-3xl font-bold text-green-600">
              {formatNumber(data.environmentalImpact.co2Reduction)} kg/year
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Carbon footprint reduction
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Energy Production
            </h4>
            <p className="text-3xl font-bold text-blue-600">
              {formatNumber(data.environmentalImpact.annualEnergyProduction)}{" "}
              kWh/year
            </p>
            <p className="text-sm text-gray-600 mt-2">Clean energy generated</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tree className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Trees Equivalent
            </h4>
            <p className="text-3xl font-bold text-purple-600">
              {formatNumber(data.environmentalImpact.treesEquivalent)}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Trees planted equivalent
            </p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
          <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
          System Performance
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">
              System Efficiency
            </h4>
            <p className="text-2xl font-bold text-blue-600">
              {data.performanceMetrics.systemEfficiency}%
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">
              System Uptime
            </h4>
            <p className="text-2xl font-bold text-green-600">
              {data.performanceMetrics.uptime}%
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">
              Peak Output
            </h4>
            <p className="text-2xl font-bold text-orange-600">
              {data.performanceMetrics.peakOutput} kW
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">
              Daily Production
            </h4>
            <p className="text-2xl font-bold text-purple-600">
              {data.performanceMetrics.averageDailyProduction} kWh
            </p>
          </div>
        </div>
      </div>

      {/* Challenges & Solutions */}
      <div className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              {isRescueCase ? (
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
              ) : (
                <Target className="h-6 w-6 text-red-600 mr-3" />
              )}
              {isRescueCase ? "System Failures" : "Challenges Faced"}
            </h3>
            <div className="space-y-4">
              {data.challenges.map((challenge, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-300">{challenge}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              {isRescueCase ? "Rescue Solutions" : "Solutions Implemented"}
            </h3>
            <div className="space-y-4">
              {data.solutions.map((solution, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-300">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Before/After Section */}
      {data.beforeAfter && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            {isRescueCase ? "Before & After Rescue" : "Before & After"}
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 p-4 rounded-xl shadow-lg border border-white/10">
              <img
                src={data.beforeAfter.beforeImage}
                alt="Before installation"
                className="w-full h-auto rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold text-white mb-2">
                {isRescueCase ? "Failed System" : "Before Installation"}
              </h4>
              <p className="text-gray-300">
                {data.beforeAfter.beforeDescription}
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl shadow-lg border border-white/10">
              <img
                src={data.beforeAfter.afterImage}
                alt="After installation"
                className="w-full h-auto rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold text-white mb-2">
                {isRescueCase ? "Rescued System" : "After Installation"}
              </h4>
              <p className="text-gray-300">
                {data.beforeAfter.afterDescription}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Project Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Project Gallery
          </h3>
          <div
            className={
              data.gallery.length === 1
                ? "flex justify-center"
                : "grid grid-cols-1 sm:grid-cols-2 gap-8"
            }
          >
            {data.gallery.map((image, index) => (
              <div
                key={index}
                className={`bg-white/5 p-4 rounded-xl shadow-lg border border-white/10 ${
                  data.gallery?.length === 1 ? "w-full max-w-2xl" : ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto rounded-lg mb-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // prevent infinite loop
                    target.src =
                      "https://via.placeholder.com/800x600?text=Image+Not+Found";
                  }}
                />
                <p className="text-center text-gray-300 text-sm italic">
                  {image.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      {data.testimonials && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            {isRescueCase
              ? "Client Testimonial - Rescue Success"
              : "Client Testimonial"}
          </h3>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200">
            <div className="text-center">
              <div className="text-4xl text-blue-400 mb-4">"</div>
              <p className="text-lg text-gray-700 mb-6 italic">
                {data.testimonials.quote}
              </p>
              <div className="border-t border-blue-200 pt-4">
                <p className="font-semibold text-gray-900">
                  {data.testimonials.author}
                </p>
                {data.testimonials.role && (
                  <p className="text-sm text-gray-600">
                    {data.testimonials.role}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rescue Case CTA */}
      {isRescueCase && (
        <div className="text-center">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-xl border border-red-200">
            <h3 className="text-2xl font-bold text-red-900 mb-4">
              Need to Rescue Your Solar System?
            </h3>
            <p className="text-red-800 mb-6 max-w-2xl mx-auto">
              Don't let a failed solar installation drain your wallet. We
              specialize in rescuing underperforming systems and turning them
              into success stories. Get a free system evaluation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <HashLink
                smooth
                to="/#contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300"
              >
                Free System Evaluation
                <ArrowRight className="ml-2" size={20} />
              </HashLink>
              <Link
                to="/case-studies"
                className="inline-flex items-center px-6 py-3 border border-red-500 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-all duration-300"
              >
                View More Success Stories
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple Tree icon component since it's not in lucide-react
const Tree: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 19h8" />
    <path d="M12 19V9" />
    <path d="M4 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    <path d="M19 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M14 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  </svg>
);

// Simple ArrowRight icon component
const ArrowRight: React.FC<{ className?: string; size?: number }> = ({
  className,
  size = 20,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

export default CaseStudy;
