import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  MapPin,
  Sun,
  Calendar,
  Settings,
  PanelTop,
  Battery,
  Star,
  ChevronRight,
  Home,
} from "lucide-react";
import { Helmet } from "react-helmet";
import BeamsBackground from "@/components/BeamsBackground";

const projects = [
  {
    id: "siruma-camarines-sur",
    image: "/images/project16.jpg",
    location: "Siruma, Camarines Sur, PH",
    system: "32kW Hybrid Solar",
    date: "2025-05-31",
    specification: [
      "2 × 16kW Deye Hybrid Inverters",
      "56 × 620W Canadian Bifacial Solar Panels",
      "4 × 51.2V 314Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "sariaya-quezon",
    image: "/images/project1.jpg",
    location: "Sariaya, Quezon, PH",
    system: "32kW Hybrid Solar",
    date: "2025-04-30",
    specification: [
      "2 x 16kW Deye Hybrid Inverter",
      "54 pcs 615W Canadian Bifacial Solar Panel",
      "4 x 51.2v 280Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "goa-camarines-sur",
    image: "/images/project2.jpg",
    location: "Goa, Camarines Sur, PH",
    system: "24kW Hybrid Solar",
    date: "2025-03-18",
    specification: [
      "2 x 12kW Hybrid Inverter",
      "48 pcs 610W Canadian Bifacial Solar Panel",
      "4 x 51.2v 314Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "cabanatuan-nueva-ecija",
    image: "/images/project3.jpg",
    location: "Cabanatuan City, Nueva Ecija, PH",
    system: "12kW Hybrid Solar",
    date: "2025-04-12",
    specification: [
      "12kW Hybrid Inverter",
      "24 pcs 615W Canadian Bifacial Solar Panel",
      "2 x 51.2v 280Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "porac-pampanga",
    image: "/images/project4.jpg",
    location: "Porac, Pampanga, PH",
    system: "8kW Hybrid Solar",
    date: "2025-03-03",
    specification: [
      "8kW Deye Hybrid Inverter",
      "18 pcs 615W Canadian Bifacial Solar Panel",
      "51.2v 280Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "birvillage-qc",
    image: "/images/project5.jpg",
    location: "BIR Village, Quezon City, Metro Manila, PH",
    system: "12kW Hybrid Solar",
    date: "2025-03-07",
    specification: [
      "12kW Deye Hybrid Inverter",
      "24 pcs 615W Canadian Bifacial Solar Panel",
      "3 x 51.2v 280Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "cabanatuan-nueva-ecija-6kw",
    image: "/images/project6.jpg",
    location: "Cabanatuan City, Nueva Ecija, PH",
    system: "6kW Hybrid Solar",
    date: "2025-03-15",
    specification: [
      "6kW Deye Hybrid Inverter",
      "13 pcs 615W Canadian Bifacial Solar Panel",
      "51.2v 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "lubao-pampanga",
    image: "/images/project7.jpg",
    location: "Lubao, Pampanga, PH",
    system: "8kW Hybrid Solar",
    date: "2025-05-08",
    specification: [
      "8kW Deye Hybrid Inverter",
      "18 pcs 615W Canadian Bifacial Solar Panel",
      "2 x 51.2v 314Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "umingan-pangasinan",
    image: "/images/project8.jpg",
    location: "Umingan, Pangasinan, PH",
    system: "8kW Hybrid Solar",
    date: "2025-05-13",
    specification: [
      "8kW Deye Hybrid Inverter",
      "16 pcs 615W Canadian Bifacial Solar Panel",
      "51.2v 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "bacoor-cavite",
    image: "/images/project9.jpg",
    location: "Bacoor, Cavite, PH",
    system: "12kW Hybrid Solar",
    date: "2025-05-19",
    specification: [
      "12kW Deye Hybrid Inverter",
      "14 pcs 615W Canadian Bifacial Solar Panel",
      "2 x 51.2v 314Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "bagumbong-caloocan",
    image: "/images/project10.jpg",
    location: "Bagumbong, Caloocan, Metro Manila, PH",
    system: "6kW Hybrid Solar",
    date: "2025-05-25",
    specification: [
      "6kW Deye Hybrid Inverter",
      "13 × 615W Canadian Solar Bifacial Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "lemery-batangas",
    image: "/images/project11.jpg",
    location: "Lemery, Batangas, PH",
    system: "8kW Hybrid Solar",
    date: "2025-05-10",
    specification: [
      "8kW Deye Hybrid Inverter",
      "16 × 615W Canadian Solar Bifacial Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "pandacan-manila",
    image: "/images/project12.jpg",
    location: "Pandacan, Manila, NCR, PH",
    system: "8kW Hybrid Solar",
    date: "2025-05-26",
    specification: [
      "8kW Deye Hybrid Inverter",
      "16 × 615W Canadian Solar Bifacial Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "alisha-nueva-ecija",
    image: "/images/project13.jpg",
    location: "Alisha, Nueva Ecija, PH",
    system: "6kW Hybrid Solar",
    date: "2025-05-27",
    specification: [
      "6kW Deye Hybrid Inverter",
      "13 × 615W Canadian Bifacial Solar Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "iba-zambales",
    image: "/images/project14.jpg",
    location: "Iba, Zambales, PH",
    system: "8kW Hybrid Solar",
    date: "2025-05-28",
    specification: [
      "8kW Deye Hybrid Inverter",
      "13 × 615W Canadian Solar Bifacial Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "binangonan-rizal",
    image: "/images/project15.jpg",
    location: "Binangonan, Rizal, PH",
    system: "16kW Hybrid Solar",
    date: "2025-05-29",
    specification: [
      "16kW Deye Hybrid Inverter",
      "30 × 615W Canadian Bifacial Solar Panels",
      "2 × 51.2V 314Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "san-antonio-quezon",
    image: "/images/project17.jpg",
    location: "San Antonio, Quezon, PH",
    system: "32kW Hybrid Solar",
    date: "2025-06-04",
    specification: [
      "2 × 16kW Deye Hybrid Inverters",
      "56 × 615W Canadian Bifacial Solar Panels",
      "5 × 51.2V 314Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "upper-bicutan-taguig",
    image: "/images/project18.jpg",
    location: "Upper Bicutan, Taguig City, Metro Manila, PH",
    system: "8kW Hybrid Solar",
    date: "2025-06-06",
    specification: [
      "8kW Deye Hybrid Inverter",
      "18 × 620W AE Bifacial Solar Panels",
      "2 × 51.2V 314Ah LiFePO₄ Batteries",
    ],
  },
  {
    id: "taytay-rizal",
    image: "/images/project19.jpg",
    location: "Taytay, Rizal, PH",
    system: "12kW Hybrid Solar",
    date: "2025-06-09",
    specification: [
      "12kW Deye Hybrid Inverter",
      "18 × 620W AE Bifacial Solar Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "batasan-qc",
    image: "/images/project20.jpg",
    location: "Batasan, Quezon City, Metro Manila, PH",
    system: "6kW Hybrid Solar",
    date: "2025-06-10",
    specification: [
      "6kW Deye Hybrid Inverter",
      "13 × 620W AE Bifacial Solar Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "san-mateo-rizal",
    image: "/images/project21.jpg",
    location: "San Mateo, Rizal, PH",
    system: "8kW Hybrid Solar",
    date: "2025-06-13",
    specification: [
      "8kW Deye Hybrid Inverter",
      "16 × 615W Canadian Bifacial Solar Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  {
    id: "san-mateo-rizal-2",
    image: "/images/project22.jpg",
    location: "San Mateo, Rizal, PH",
    system: "8kW Hybrid Solar",
    date: "2025-06-12",
    specification: [
      "8kW Deye Hybrid Inverter",
      "16 × 620W AE Bifacial Solar Panels",
      "51.2V 314Ah LiFePO₄ Battery",
    ],
  },
  // Add more projects as needed
];

projects.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const projectsPerPage = 6;

const ProjectsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const paginated = projects.slice(
    (page - 1) * projectsPerPage,
    page * projectsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, [page]);

  // Enhanced structured data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SunPhil Solar Projects Portfolio",
    description:
      "Explore our portfolio of hybrid solar installations across the Philippines, featuring residential and commercial projects with premium components from trusted brands.",
    url: window.location.href,
    numberOfItems: projects.length,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: window.location.origin,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: window.location.href,
        },
      ],
    },
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Project",
        name: `${project.system} Installation in ${project.location}`,
        description: `Hybrid solar installation featuring ${project.specification.join(
          ", "
        )}`,
        location: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: project.location,
          },
        },
        startDate: project.date,
        image: {
          "@type": "ImageObject",
          url: project.image,
          width: "800",
          height: "600",
        },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        },
      },
    })),
  };

  return (
    <BeamsBackground intensity="medium">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <Helmet>
          <title>
            Solar Projects Portfolio | SunPhil Solar - Hybrid Solar
            Installations in Philippines
          </title>
          <meta
            name="description"
            content="Explore SunPhil Solar's portfolio of hybrid solar installations across the Philippines. From residential rooftops to commercial buildings, discover our high-performance solar solutions."
          />
          <meta
            name="keywords"
            content="solar projects, hybrid solar, solar installation, Philippines, SunPhil Solar, solar energy, renewable energy"
          />
          <meta
            property="og:title"
            content="Solar Projects Portfolio | SunPhil Solar"
          />
          <meta
            property="og:description"
            content="Explore our portfolio of hybrid solar installations across the Philippines, featuring residential and commercial projects."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={window.location.href} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Solar Projects Portfolio | SunPhil Solar"
          />
          <meta
            name="twitter:description"
            content="Explore our portfolio of hybrid solar installations across the Philippines."
          />
          <link rel="canonical" href={window.location.href} />
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
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
              <span className="text-blue-400">Projects</span>
            </li>
          </ol>
        </nav>

        <header className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-center text-white">
            Our Hybrid Solar Installations Across the Philippines
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-center max-w-2xl mx-auto text-white/80 px-2 sm:px-4">
            At Sunphil Solar, we specialize in high-performance hybrid solar
            installations for homes and businesses across the Philippines. As a
            leading solar company in the Philippines, we provide turnkey solar
            energy solutions—from residential solar panel installations in
            Quezon City and large-scale solar systems in Quezon Province, to
            off-grid solar projects in Camarines Sur and Metro Manila. Our
            expert team helps customers achieve energy independence, reduce
            electricity costs, and embrace renewable energy for a sustainable
            future. Every solar project is custom-designed to meet your unique
            needs, whether you require a 6kW hybrid solar system for your home,
            a 32kW commercial solar installation, or a fully off-grid solution.
            We use only premium components from trusted brands like Deye,
            Canadian Solar, and LiFePO₄ batteries to ensure durability,
            efficiency, and maximum savings. Explore our portfolio of solar
            installations and discover why Sunphil Solar is the trusted choice
            for solar energy in the Philippines. Contact us today to start your
            journey toward clean, reliable, and affordable solar power.
          </p>
        </header>
        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {paginated.map((proj, idx) => (
              <article
                key={idx}
                className="flex flex-col bg-white/10 backdrop-blur-lg rounded-lg p-3 sm:p-4 shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-2 text-center border border-white/20 hover:border-blue-400 cursor-pointer min-h-[480px] sm:min-h-[540px]"
              >
                <Link
                  to={`/solarprojects/${proj.id}`}
                  className="flex flex-col h-full"
                >
                  <div className="relative w-full h-40 sm:h-48 mb-2 bg-gray-900/50 rounded overflow-hidden">
                    <img
                      src={proj.image}
                      alt={`${proj.system} installation in ${proj.location}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width="800"
                      height="600"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/placeholder.jpg";
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-1 sm:gap-2 font-bold text-white mb-1 text-sm sm:text-base">
                    <MapPin className="text-blue-400" size={16} />
                    <span className="truncate">{proj.location}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 sm:gap-2 text-white mb-1 text-sm sm:text-base">
                    <Sun className="text-yellow-400" size={16} />
                    <span>{proj.system}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 sm:gap-2 text-white text-sm sm:text-base">
                    <Calendar className="text-blue-400" size={16} />
                    <span>{proj.date}</span>
                  </div>
                  <div className="bg-white/5 rounded p-2 sm:p-3 mt-2 sm:mt-3 text-left flex flex-col flex-grow">
                    <ul className="pl-4 sm:pl-5 text-white font-semibold space-y-1 sm:space-y-2 text-sm sm:text-base">
                      {proj.specification.map((spec, i) => {
                        let Icon = CheckCircle;
                        if (/inverter/i.test(spec)) Icon = Settings;
                        else if (/solar panel/i.test(spec)) Icon = PanelTop;
                        else if (/battery/i.test(spec)) Icon = Battery;
                        return (
                          <li
                            key={i}
                            className="flex items-start gap-1 sm:gap-2 text-white font-semibold"
                          >
                            <Icon
                              className="text-blue-400 mt-1 flex-shrink-0"
                              size={18}
                            />
                            <span className="line-clamp-2">{spec}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="flex items-center gap-1 sm:gap-2 mt-auto pt-2 sm:pt-4">
                      <CheckCircle
                        className="text-green-400 flex-shrink-0"
                        size={18}
                      />
                      <span className="font-semibold text-white text-sm sm:text-base">
                        Client Review:
                      </span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="text-yellow-400 fill-yellow-400"
                            size={16}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="inline-block text-blue-400 hover:text-blue-300 font-medium mt-2 text-sm sm:text-base transition-colors">
                      Read more &rarr;
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </main>
        <nav
          aria-label="Project pagination"
          className="flex justify-center mt-6 sm:mt-8 gap-2"
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-blue-500 text-white disabled:bg-gray-600 text-sm sm:text-base hover:bg-blue-600 transition-colors"
            aria-label="Previous page"
          >
            Prev
          </button>
          <span
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-white"
            aria-current="page"
          >
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-blue-500 text-white disabled:bg-gray-600 text-sm sm:text-base hover:bg-blue-600 transition-colors"
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      </div>
    </BeamsBackground>
  );
};

export default ProjectsPage;
