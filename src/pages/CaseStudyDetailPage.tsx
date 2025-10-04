import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  ArrowLeft,
  Home,
  ChevronRight,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Leaf,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Star,
  Zap,
  X,
  User,
} from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { projects } from "@/data/projects";
import { HashLink } from "react-router-hash-link";
import ShareButton from "../components/ShareButton";

const CaseStudyDetailPage: React.FC = () => {
  const { caseStudyId } = useParams<{ caseStudyId: string }>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");

  if (!caseStudyId || !caseStudies[caseStudyId]) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-neutral-950 via-blue-950 to-neutral-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <p className="text-white mb-6">
            The case study you're looking for doesn't exist.
          </p>
          <Link
            to="/case-studies"
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  const caseStudyData = caseStudies[caseStudyId];
  const projectData = projects.find((p) => p.id === caseStudyId);

  if (!projectData) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-neutral-950 via-blue-950 to-neutral-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Data Not Found</h1>
          <p className="text-white mb-6">
            The project data for this case study is missing.
          </p>
          <Link
            to="/case-studies"
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  const isRescueCase =
    caseStudyData.projectOverview.challenge?.toLowerCase().includes("failed") ||
    caseStudyData.projectOverview.challenge?.toLowerCase().includes("rescue") ||
    caseStudyData.projectOverview.challenge
      ?.toLowerCase()
      .includes("underperforming");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const openModal = (src: string, alt: string) => {
    setModalImageSrc(src);
    setModalImageAlt(alt);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-950 via-blue-950 to-neutral-900 text-white">
      <Helmet>
        <title>{`${projectData.system} Case Study - ${projectData.location} | Sunphil Solar`}</title>
        <meta
          name="description"
          content={`Detailed case study of ${projectData.system} solar installation in ${projectData.location}. See real results, savings, and environmental impact.`}
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-white mb-2">
            <li>
              <Link to="/" className="flex items-center hover:text-blue-400">
                <Home size={16} className="mr-2" />
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={16} className="mx-1" />
              <Link to="/case-studies" className="hover:text-blue-400">
                Case Studies
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={16} className="mx-1" />
              <span className="text-blue-400">{projectData.system}</span>
            </li>
          </ol>
        </nav>

        {/* Hero Section with Project Image */}
        <div className="relative mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Project Image */}
            <div className="relative group">
              <div
                className="relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer"
                onClick={() =>
                  openModal(
                    projectData.image,
                    `${projectData.system} installation in ${projectData.location}`
                  )
                }
              >
                <img
                  src={projectData.image}
                  alt={`${projectData.system} installation in ${projectData.location}`}
                  className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    {isRescueCase && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Rescue Success Story
                      </span>
                    )}
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {projectData.system}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {projectData.location}
                  </h1>
                  <div className="flex items-center gap-4 text-white/90 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{projectData.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{projectData.location}</span>
                    </div>
                  </div>
                </div>
                {/* Click indicator */}
                <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to enlarge
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                {isRescueCase && (
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Rescue Success Story
                  </span>
                )}
              </div>

              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                    {projectData.system}
                    <span className="block text-lg text-blue-400 mt-2 font-medium">
                      {projectData.location}
                    </span>
                    <span className="block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium mt-2 w-fit">
                      {caseStudyData.financialAnalysis.annualROI}% Annual ROI
                    </span>
                  </h1>
                </div>
                <ShareButton
                  url={window.location.href}
                  title={`${projectData.system} Case Study - ${projectData.location}`}
                  description={`See how this ${
                    projectData.system
                  } installation achieved ${
                    caseStudyData.financialAnalysis.annualROI
                  }% ROI and ${formatCurrency(
                    caseStudyData.financialAnalysis.monthlySavings
                  )} monthly savings.`}
                  className="flex-shrink-0"
                />
              </div>

              <p className="text-lg text-white mb-2 leading-relaxed font-normal">
                {projectData.description?.split("\n")[0] ||
                  `A comprehensive case study showcasing the successful installation and performance of our ${projectData.system} system.`}
              </p>

              {/* Key Metrics Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="text-green-400" size={16} />
                    <h3 className="font-medium text-white text-sm">
                      Monthly Savings
                    </h3>
                  </div>
                  <p className="text-xl font-bold text-green-400">
                    {formatCurrency(
                      caseStudyData.financialAnalysis.monthlySavings
                    )}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="text-blue-400" size={16} />
                    <h3 className="font-medium text-white text-sm">
                      CO₂ Reduction
                    </h3>
                  </div>
                  <p className="text-xl font-bold text-blue-400">
                    {caseStudyData.environmentalImpact.co2Reduction} kg/year
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-purple-400" size={16} />
                    <h3 className="font-medium text-white text-sm">
                      Payback Period
                    </h3>
                  </div>
                  <p className="text-xl font-bold text-purple-400">
                    {caseStudyData.financialAnalysis.paybackPeriod} Years
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-orange-400" size={16} />
                    <h3 className="font-medium text-white text-sm">
                      Annual ROI
                    </h3>
                  </div>
                  <p className="text-xl font-bold text-orange-400">
                    {caseStudyData.financialAnalysis.annualROI}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics - 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Project Overview */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="text-blue-400" size={20} />
              Project Overview
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">System Size:</span>
                <p className="font-semibold text-right">{projectData.system}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Location:</span>
                <p className="font-semibold text-right">
                  {projectData.location}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">
                  Installation Date:
                </span>
                <p className="font-semibold text-right">{projectData.date}</p>
              </div>
              {projectData.clientType && (
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Client Type:</span>
                  <p className="font-semibold text-right">
                    {projectData.clientType}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="text-green-400" size={20} />
              Financial Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Total Investment:</span>
                <p className="font-semibold text-green-400 text-right">
                  {formatCurrency(
                    caseStudyData.financialAnalysis.totalInvestment
                  )}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Monthly Savings:</span>
                <p className="font-semibold text-green-400 text-right">
                  {formatCurrency(
                    caseStudyData.financialAnalysis.monthlySavings
                  )}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Annual ROI:</span>
                <p className="font-semibold text-green-400 text-right">
                  {caseStudyData.financialAnalysis.annualROI}%
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Lifetime Savings:</span>
                <p className="font-semibold text-green-400 text-right">
                  {formatCurrency(
                    caseStudyData.financialAnalysis.lifetimeSavings
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="text-yellow-400" size={20} />
              Performance Metrics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">
                  System Efficiency:
                </span>
                <p className="font-semibold text-yellow-400 text-right">
                  {caseStudyData.performanceMetrics.systemEfficiency}%
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Uptime:</span>
                <p className="font-semibold text-green-400 text-right">
                  {caseStudyData.performanceMetrics.uptime}%
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Peak Output:</span>
                <p className="font-semibold text-blue-400 text-right">
                  {caseStudyData.performanceMetrics.peakOutput} kW
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Daily Production:</span>
                <p className="font-semibold text-purple-400 text-right">
                  {caseStudyData.performanceMetrics.averageDailyProduction} kWh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Before/After Section */}
        {caseStudyData.beforeAfter && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="text-green-400" size={24} />
              Before & After Results
            </h2>

            {/* Video Section */}
            {caseStudyData.beforeAfter.videoUrl && (
              <div className="mb-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Zap size={20} className="text-blue-400" />
                    Installation Video
                  </h3>
                  <div className="aspect-video w-full">
                    <iframe
                      src={`${caseStudyData.beforeAfter.videoUrl}?start=${
                        caseStudyData.beforeAfter.videoTimestamp || 0
                      }`}
                      title="Solar Installation Video"
                      className="w-full h-full rounded-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-white/70 text-sm">
                      Video courtesy of{" "}
                      <a
                        href="https://www.youtube.com/@kafarmlandtv851"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 font-medium"
                      >
                        KA FARMLAND TV
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div
              className={`grid gap-8 ${
                caseStudyData.beforeAfter.middleImage
                  ? "grid-cols-1 lg:grid-cols-3"
                  : "grid-cols-1 lg:grid-cols-2"
              }`}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-red-400" />
                  Before Installation
                </h3>
                <div
                  className="cursor-pointer group"
                  onClick={() =>
                    openModal(
                      caseStudyData.beforeAfter!.beforeImage,
                      "Before solar installation"
                    )
                  }
                >
                  <img
                    src={caseStudyData.beforeAfter.beforeImage}
                    alt="Before solar installation"
                    className="w-full h-48 object-cover rounded-lg mb-4 transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="text-center text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to enlarge
                  </div>
                </div>
                <p className="text-white/90">
                  {caseStudyData.beforeAfter.beforeDescription}
                </p>
              </div>

              {caseStudyData.beforeAfter.middleImage && (
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Zap size={20} className="text-blue-400" />
                    {isRescueCase ? "System Upgrade" : "Installation Progress"}
                  </h3>
                  <div
                    className="cursor-pointer group"
                    onClick={() =>
                      openModal(
                        caseStudyData.beforeAfter!.middleImage!,
                        "Installation progress"
                      )
                    }
                  >
                    <img
                      src={caseStudyData.beforeAfter.middleImage}
                      alt="Installation progress"
                      className="w-full h-48 object-cover rounded-lg mb-4 transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="text-center text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to enlarge
                    </div>
                  </div>
                  <p className="text-white/90">
                    {caseStudyData.beforeAfter.middleDescription ||
                      "Solar system installation in progress"}
                  </p>
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-400" />
                  After Installation
                </h3>
                <div
                  className="cursor-pointer group"
                  onClick={() =>
                    openModal(
                      caseStudyData.beforeAfter!.afterImage,
                      "After solar installation"
                    )
                  }
                >
                  <img
                    src={caseStudyData.beforeAfter.afterImage}
                    alt="After solar installation"
                    className="w-full h-48 object-cover rounded-lg mb-4 transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="text-center text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to enlarge
                  </div>
                </div>
                <p className="text-white/90">
                  {caseStudyData.beforeAfter.afterDescription}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Case Study Content */}
        <div className="space-y-8 mb-12">
          {/* Main Story Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Challenge/Problem */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="text-red-400" size={28} />
                <h2 className="text-2xl font-bold text-white">
                  {isRescueCase ? "Failed System" : "Challenge"}
                </h2>
              </div>
              <p className="text-white/90 leading-relaxed text-lg">
                {caseStudyData.projectOverview.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="text-green-400" size={28} />
                <h2 className="text-2xl font-bold text-white">
                  {isRescueCase ? "Rescue Solution" : "Solution"}
                </h2>
              </div>
              <p className="text-white/90 leading-relaxed text-lg">
                {caseStudyData.projectOverview.solution}
              </p>
            </div>
          </div>

          {/* Results - Full Width */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-green-400" size={28} />
              <h2 className="text-2xl font-bold text-white">Results</h2>
            </div>
            <p className="text-white/90 leading-relaxed text-lg">
              {caseStudyData.projectOverview.results}
            </p>
          </div>

          {/* Environmental Impact & Testimonial - 2 Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Environmental Impact */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Leaf className="text-green-400" size={24} />
                Environmental Impact
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-white/70 font-medium">
                    CO₂ Reduction:
                  </span>
                  <span className="font-semibold text-blue-400">
                    {caseStudyData.environmentalImpact.co2Reduction} kg/year
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-white/70 font-medium">
                    Trees Equivalent:
                  </span>
                  <span className="font-semibold text-green-400">
                    {Math.round(
                      caseStudyData.environmentalImpact.co2Reduction / 22
                    )}{" "}
                    trees
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-white/70 font-medium">
                    Annual Production:
                  </span>
                  <span className="font-semibold text-blue-400">
                    {caseStudyData.environmentalImpact.annualEnergyProduction}{" "}
                    kWh
                  </span>
                </div>
              </div>
            </div>

            {/* Client Testimonial */}
            {caseStudyData.testimonials && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <Star className="text-yellow-400" size={24} />
                  Client Testimonial
                </h3>
                <blockquote className="text-white/90 leading-relaxed text-lg italic mb-6">
                  "{caseStudyData.testimonials.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <User className="text-yellow-400" size={20} />
                  <div>
                    <p className="font-semibold text-white">
                      {caseStudyData.testimonials.author}
                    </p>
                    {caseStudyData.testimonials.role && (
                      <p className="text-white/70 text-sm">
                        {caseStudyData.testimonials.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Call to Action - Full Width */}
          <div className="bg-blue-600 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Get Your Own Solar System
            </h3>
            <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
              Ready to start saving on your electricity bills? Get a free
              consultation today and join hundreds of satisfied customers who
              have already made the switch to solar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <HashLink
                smooth
                to="/#contact"
                className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                Get Free Quote
              </HashLink>
              <Link
                to="/case-studies"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors text-lg"
              >
                View More Case Studies
              </Link>
            </div>
          </div>
        </div>

        {/* Rescue Case CTA */}
        {isRescueCase && (
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need to Rescue Your Solar System?
            </h3>
            <p className="text-white mb-6 max-w-2xl">
              Don't let a failed solar installation drain your wallet. We
              specialize in rescuing underperforming systems and turning them
              into success stories. Get a free system evaluation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <HashLink
                smooth
                to="/#contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Free System Evaluation
                <ArrowRight className="ml-2" size={20} />
              </HashLink>
              <Link
                to="/case-studies"
                className="inline-flex items-center px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                View More Success Stories
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal/Lightbox */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleModalKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-7xl max-h-full">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Image */}
            <img
              src={modalImageSrc}
              alt={modalImageAlt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image caption */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-lg font-medium bg-black/50 px-4 py-2 rounded-lg">
                {modalImageAlt}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudyDetailPage;
