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
} from "lucide-react";
import { Helmet } from "react-helmet";

const projects = [
  {
    id: "sariaya-quezon",
    image: "/images/project1.jpg",
    location: "Sariaya, Quezon, PH",
    system: "32kW Hybrid Solar",
    date: "2024-04-30",
    specification: [
      "2 x 16kW Deye Hybrid Inverter",
      "54 pcs 615W Canadian Bifacial Solar Panel",
      "4 x 51.2v 280Ah LiFePO4 Battery",
    ],
  },
  {
    id: "goa-camarines-sur",
    image: "/images/project2.jpg",
    location: "Goa, Camarines Sur, PH",
    system: "24kW Hybrid Solar",
    date: "2024-03-18",
    specification: [
      "2 x 12kW Hybrid Inverter",
      "48 pcs 610W Canadian Bifacial Solar Panel",
      "4 x 51.2v 314Ah LiFePO4 Battery",
    ],
  },
  {
    id: "cabanatuan-nueva-ecija",
    image: "/images/project3.jpg",
    location: "Cabanatuan City, Nueva Ecija, PH",
    system: "12kW Hybrid Solar",
    date: "2024-04-12",
    specification: [
      "12kW Hybrid Inverter",
      "24 pcs 615W Canadian Bifacial Solar Panel",
      "2 x 51.2v 280Ah LiFePO4 Battery",
    ],
  },
  {
    id: "porac-pampanga",
    image: "/images/project4.jpg",
    location: "Porac, Pampanga, PH",
    system: "8kW Hybrid Solar",
    date: "2024-03-03",
    specification: [
      "8kW Deye Hybrid Inverter",
      "18 pcs 615W Canadian Bifacial Solar Panel",
      "51.2v 280Ah LiFePO4 Battery",
    ],
  },
  {
    id: "birvillage-qc",
    image: "/images/project5.jpg",
    location: "BIR Village, Quezon City, Metro Manila, PH",
    system: "12kW Hybrid Solar",
    date: "2024-03-07",
    specification: [
      "12kW Deye Hybrid Inverter",
      "24 pcs 615W Canadian Bifacial Solar Panel",
      "3 x 51.2v 280Ah LiFePO4 Battery",
    ],
  },
  {
    id: "cabanatuan-nueva-ecija-6kw",
    image: "/images/project6.jpg",
    location: "Cabanatuan City, Nueva Ecija, PH",
    system: "6kW Hybrid Solar",
    date: "2024-03-15",
    specification: [
      "6kW Deye Hybrid Inverter",
      "13 pcs 615W Canadian Bifacial Solar Panel",
      "51.2v 314Ah LiFePO4 Battery",
    ],
  },
  {
    id: "lubao-pampanga",
    image: "/images/project7.jpg",
    location: "Lubao, Pampanga, PH",
    system: "8kW Hybrid Solar",
    date: "2024-05-08",
    specification: [
      "8kW Deye Hybrid Inverter",
      "18 pcs 615W Canadian Bifacial Solar Panel",
      "2 x 51.2v 314Ah LiFePO4 Battery",
    ],
  },
  {
    id: "umingan-pangasinan",
    image: "/images/project8.jpg",
    location: "Umingan, Pangasinan, PH",
    system: "8kW Hybrid Solar",
    date: "2024-05-13",
    specification: [
      "8kW Deye Hybrid Inverter",
      "16 pcs 615W Canadian Bifacial Solar Panel",
      "51.2v 314Ah LiFePO4 Battery",
    ],
  },
  {
    id: "bacoor-cavite",
    image: "/images/project9.jpg",
    location: "Bacoor, Cavite, PH",
    system: "12kW Hybrid Solar",
    date: "2024-05-19",
    specification: [
      "12kW Deye Hybrid Inverter",
      "14 pcs 615W Canadian Bifacial Solar Panel",
      "2 x 51.2v 314Ah LiFePO4 Battery",
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
      "51.2V 314Ah LiFePO4 Lithium Battery",
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
      "51.2V 314Ah LiFePO4 Battery",
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
      "51.2V 314Ah LiFePO4 Lithium Battery",
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
      "51.2V 314Ah LiFePO4 Lithium Battery",
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
      "51.2V 314Ah LiFePO4 Lithium Battery",
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

  return (
    <section className="py-20 bg-secondary-50 min-h-screen">
      <Helmet>
        <title>Projects | SunPhil Solar</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Solar Projects</h2>
        <p className="text-center max-w-2xl mx-auto mb-8 text-secondary-700">
          At Sunphil Solar/Fairview Solarista, your energy needs come first.
          Whether you're powering a home or a business, we customize each solar
          installation to suit your lifestyle and goals—ensuring dependable,
          cost-effective, and sustainable energy for years to come.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {paginated.map((proj, idx) => (
            <Link
              to={`/solarprojects/${proj.id}`}
              key={idx}
              className="bg-white rounded-lg p-4 shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-2 text-center border border-gray-200 hover:border-primary-500 cursor-pointer"
            >
              <img
                src={proj.image}
                alt={proj.location}
                className="w-full h-50 object-contain rounded mb-2 bg-gray-100"
              />
              <div className="flex items-center justify-center gap-2 font-bold text-black mb-1">
                <MapPin className="text-primary-500" size={18} />
                <span>{proj.location}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-black mb-1">
                <Sun className="text-yellow-500" size={18} />
                <span>{proj.system}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-black">
                <Calendar className="text-primary-500" size={18} />
                <span>{proj.date}</span>
              </div>
              <div className="bg-gray-50 rounded p-3 mt-3 text-left">
                <ul className="pl-5 text-black font-semibold space-y-2">
                  {proj.specification.map((spec, i) => {
                    let Icon = CheckCircle;
                    if (/inverter/i.test(spec)) Icon = Settings;
                    else if (/solar panel/i.test(spec)) Icon = PanelTop;
                    else if (/battery/i.test(spec)) Icon = Battery;
                    return (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-black font-semibold"
                      >
                        <Icon className="text-primary-500 mt-1" size={20} />
                        <span>{spec}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex items-center gap-2 mt-4">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="font-semibold text-black">
                    Client Review:
                  </span>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-yellow-400"
                      size={20}
                    />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-primary-500 text-white disabled:bg-gray-300"
          >
            Prev
          </button>
          <span className="px-4 py-2">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded bg-primary-500 text-white disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
