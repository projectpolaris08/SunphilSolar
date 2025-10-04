import React from "react";
import { Helmet } from "react-helmet";
import CaseStudyGraphs from "../components/CaseStudyGraphs";

const CaseStudyGraphsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Solar Case Studies Performance Dashboard | Sunphil Solar</title>
        <meta
          name="description"
          content="Comprehensive performance analysis of our solar installations. View detailed charts showing monthly savings, ROI, system efficiency, and environmental impact across all our case studies."
        />
        <meta
          name="keywords"
          content="solar case studies, solar performance, solar ROI, solar savings, solar efficiency, solar statistics, solar dashboard"
        />
        <meta
          property="og:title"
          content="Solar Case Studies Performance Dashboard | Sunphil Solar"
        />
        <meta
          property="og:description"
          content="Comprehensive performance analysis of our solar installations with detailed charts and statistics."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Solar Case Studies Performance Dashboard | Sunphil Solar"
        />
        <meta
          name="twitter:description"
          content="Comprehensive performance analysis of our solar installations with detailed charts and statistics."
        />
      </Helmet>

      <div className="min-h-screen w-full bg-gradient-to-br from-neutral-950 via-blue-950 to-neutral-900">
        <CaseStudyGraphs />
      </div>
    </>
  );
};

export default CaseStudyGraphsPage;
