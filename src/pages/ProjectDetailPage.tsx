import React from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  MapPin,
  Sun,
  Calendar,
  Settings,
  Battery,
  ChevronRight,
  Home,
  CheckCircle,
} from "lucide-react";
import CaseStudy from "@/components/CaseStudy";
import { caseStudies } from "@/data/caseStudies";
import { projects as projectsArray } from "@/data/projects";

interface Project {
  image: string;
  location: string;
  system: string;
  date: string;
  specification: string[];
  clientType?: string;
  benefits?: string[];
  description?: string;
}

// Convert projects array to object for easy lookup by ID
const projects: { [key: string]: Project } = projectsArray.reduce(
  (acc, project) => {
    acc[project.id] = project;
    return acc;
  },
  {} as { [key: string]: Project }
);

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects[projectId as keyof typeof projects];
  const caseStudyData = caseStudies[projectId as keyof typeof caseStudies];

  if (!project) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-neutral-950 via-blue-950 to-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              Project Not Found
            </h1>
            <p className="text-white/80 mb-8">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/solarprojects"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-950 via-blue-950 to-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Helmet>
          <title>{`${project.system} Installation in ${project.location} | Sunphil Solar`}</title>
          <meta
            name="description"
            content={`Explore our ${project.system} installation in ${project.location}. ${project.description}`}
          />
          <meta
            name="keywords"
            content={`solar installation, ${project.system}, ${project.location}, Sunphil Solar, solar energy`}
          />
          <meta
            property="og:title"
            content={`${project.system} Installation in ${project.location} | Sunphil Solar`}
          />
          <meta
            property="og:description"
            content={`Explore our ${project.system} installation in ${project.location}. ${project.description}`}
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={window.location.href} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={`${project.system} Installation in ${project.location} | Sunphil Solar`}
          />
          <meta
            name="twitter:description"
            content={`Explore our ${project.system} installation in ${project.location}. ${project.description}`}
          />
          <link rel="canonical" href={window.location.href} />
        </Helmet>

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-white/80">
            <li>
              <Link to="/" className="flex items-center hover:text-blue-400">
                <Home size={14} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={14} className="mx-1" />
              <Link to="/solarprojects" className="hover:text-blue-400">
                Projects
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={14} className="mx-1" />
              <span className="text-blue-400">{project.system}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Project Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900/50 flex items-center justify-center">
            <img
              src={project.image}
              alt={`${project.system} installation in ${project.location}`}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>

          {/* Project Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
              {project.system} Installation
            </h1>
            <div className="flex items-center gap-2 text-white/80 mb-2">
              <MapPin className="text-blue-400" size={18} />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 mb-2">
              <Calendar className="text-blue-400" size={18} />
              <span>Completed: {project.date}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 mb-6">
              <Home className="text-yellow-400" size={18} />
              <span>{project.clientType}</span>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 sm:p-6 mb-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-4 sm:p-6 mb-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                  System Specifications
                </h2>
                <ul className="space-y-2">
                  {project.specification.map((spec, i) => {
                    let Icon = CheckCircle;
                    if (/inverter/i.test(spec)) Icon = Settings;
                    else if (/solar.*panel/i.test(spec)) Icon = Sun;
                    else if (/batter/i.test(spec)) Icon = Battery;
                    return (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-white/90"
                      >
                        {Icon === Sun ? (
                          <Sun
                            className="text-yellow-400 mt-1 flex-shrink-0"
                            size={18}
                          />
                        ) : (
                          <Icon
                            className="text-blue-400 mt-1 flex-shrink-0"
                            size={18}
                          />
                        )}
                        <span>{spec}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 sm:p-6 mb-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-4 sm:p-6 mb-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                  Key Benefits
                </h2>
                <ul className="space-y-2">
                  {project.benefits?.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-white/90"
                    >
                      <CheckCircle
                        className="text-green-400 mt-1 flex-shrink-0"
                        size={18}
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 sm:p-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                  Project Overview
                </h2>
                <p className="text-white/80 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Section */}
        {caseStudyData && (
          <div className="mt-16">
            <CaseStudy data={caseStudyData} projectId={projectId!} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
