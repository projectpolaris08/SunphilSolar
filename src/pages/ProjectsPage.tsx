import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: "sariaya-quezon",
    image: "/images/project1.jpg",
    location: "Sariaya, Quezon, PH",
    system: "32kW Hybrid Solar",
    date: "2024-04-30",
    specification: [
      "2 units 16kW Deye Hybrid Inverter",
      "54 pcs 615W Canadian Bifacial Solar Panel",
      "4 units 51.2v 280Ah LiFePO4 Battery",
    ],
  },
  {
    id: "goa-camarines-sur",
    image: "/images/project2.jpg",
    location: "Goa, Camarines Sur, PH",
    system: "24kW Hybrid Solar",
    date: "2024-03-18",
    specification: [
      "2 units 12kW Hybrid Inverter",
      "48 pcs 610W Canadian Bifacial Solar Panel",
      "4 units 51.2v 314Ah LiFePO4 Battery",
    ],
  },
  {
    id: "cabanatuan-nueva-ecija",
    image: "/images/project3.jpg",
    location: "Cabanatuan City, Nueva Ecija, PH",
    system: "12kW Hybrid Solar",
    date: "2024-04-12",
    specification: [
      "1 unit 12kW Hybrid Inverter",
      "24 pcs 615W Canadian Bifacial Solar Panel",
      "2 units 51.2v 280Ah LiFePO4 Battery",
    ],
  },
  {
    id: "porac-pampanga",
    image: "/images/project4.jpg",
    location: "Porac, Pampanga, PH",
    system: "8kW Hybrid Solar",
    date: "2024-03-03",
    specification: [
      "1 unit 8kW Deye Hybrid Inverter",
      "18 pcs 615W Canadian Bifacial Solar Panel",
      "1 unit 51.2v 280Ah LiFePO4 Battery",
    ],
  },
  {
    id: "birvillage-qc",
    image: "/images/project5.jpg",
    location: "BIR Village, Quezon City, Metro Manila, PH",
    system: "12kW Hybrid Solar",
    date: "2024-03-07",
    specification: [
      "1 unit 12kW Deye Hybrid Inverter",
      "24 pcs 615W Canadian Bifacial Solar Panel",
      "3 units 51.2v 280Ah LiFePO4 Battery",
    ],
  },
  {
    id: "cabanatuan-nueva-ecija-6kw",
    image: "/images/project6.jpg",
    location: "Cabanatuan City, Nueva Ecija, PH",
    system: "6kW Hybrid Solar",
    date: "2024-03-15",
    specification: [
      "1 unit 6kW Deye Hybrid Inverter",
      "13 pcs 615W Canadian Bifacial Solar Panel",
      "1 unit 51.2v 314Ah LiFePO4 Battery",
    ],
  },
  {
    id: "lubao-pampanga",
    image: "/images/project7.jpg",
    location: "Lubao, Pampanga, PH",
    system: "8kW Hybrid Solar",
    date: "2024-05-08",
    specification: [
      "1 unit 8kW Deye Hybrid Inverter",
      "18 pcs 615W Canadian Bifacial Solar Panel",
      "2 units 51.2v 314Ah LiFePO4 Battery",
    ],
  },
  {
    id: "umingan-pangasinan",
    image: "/images/project8.jpg",
    location: "Umingan, Pangasinan, PH",
    system: "8kW Hybrid Solar",
    date: "2024-05-13",
    specification: [
      "1 unit 8kW Deye Hybrid Inverter",
      "16 pcs 615W Canadian Bifacial Solar Panel",
      "1 unit 51.2v 314Ah LiFePO4 Battery",
    ],
  },
  // Add more projects as needed
];

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
              <div className="font-bold text-black">{proj.location}</div>
              <div className="text-black">{proj.system}</div>
              <div className="text-black">{proj.date}</div>
              <div className="bg-gray-50 rounded p-3 mt-3 text-left">
                <ul className="list-disc pl-5 text-black font-semibold">
                  {proj.specification.map((spec, i) => (
                    <li key={i} className="text-black font-semibold">
                      {spec}
                    </li>
                  ))}
                </ul>
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
