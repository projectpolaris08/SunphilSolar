import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  MdArrowBack,
  MdCalendarToday,
  MdLocationOn,
  MdHome,
  MdSolarPower,
} from "react-icons/md";
import { CheckCircle, Star, } from "lucide-react";
import { Helmet } from "react-helmet";

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

const projects: { [key: string]: Project } = {
  "sariaya-quezon": {
    image: "/images/project1.jpg",
    location: "Sariaya, Quezon, PH",
    system: "32kW Hybrid Solar",
    date: "2024-04-30",
    clientType: "Residential",
    specification: [
      "2 x 16kW Deye Hybrid Inverter",
      "54 pcs 615W Canadian Bifacial Solar Panel",
      "4 x 51.2v 280Ah LiFePO₄ Battery",
    ],
    benefits: [
      "Energy Independence: This hybrid setup allows the homeowner to rely less on the grid and stay powered during outages.",
      "Significant Cost Savings: Reduced monthly electric bills by maximizing solar energy usage during peak hours.",
      "Eco-Friendly: Reduces the household's carbon footprint by over 1,200 kg of CO₂ per month.",
      "Smart Load Management: Automatically prioritizes essential appliances such as refrigerators, lighting, and air conditioning.",
      "Scalable Design: The system is designed for future expansion to accommodate growing energy needs.",
    ],
    description:
      "Sunphil Solar successfully installed a 32kW hybrid solar power system for a residential client in Sariaya, Quezon. This system was designed to provide reliable, uninterrupted energy while significantly reducing electricity costs through clean and renewable solar power.",
  },
  "goa-camarines-sur": {
    image: "/images/project2.jpg",
    location: "Goa, Camarines Sur, PH",
    system: "24kW Hybrid Solar",
    date: "2024-03-18",
    clientType: "Residential / Small Commercial",
    specification: [
      "2 x 12kW Deye Hybrid Inverter",
      "48 pcs 610W Canadian Bifacial Solar Panel",
      "4 x 51.2v 314Ah LiFePO₄ Battery",
    ],
    benefits: [
      "Hybrid Power Reliability: Offers energy independence and backup power capability in areas with unstable grid supply.",
      "High Energy Yield: Efficient solar generation from bifacial panels ensures maximum ROI on investment.",
      "Cost Efficiency: Lower electricity bills through self-consumption and intelligent power management.",
      "Environmentally Friendly: Helps reduce over 1 ton of CO₂ emissions per month, contributing to a greener Camarines Sur.",
      "Flexible Design: The system is designed for future scalability and smart load distribution.",
    ],
    description:
      "Sunphil Solar completed a 24kW hybrid solar installation for a property in Goa, Camarines Sur, providing reliable, clean energy with backup capability. This custom-designed system supports high daily energy consumption while protecting the household or business from frequent power interruptions in the area.",
  },
  "cabanatuan-nueva-ecija": {
    image: "/images/project3.jpg",
    location: "Cabanatuan City, Nueva Ecija, PH",
    system: "12kW Hybrid Solar",
    date: "2024-04-12",
    clientType: "Residential",
    specification: [
      "12kW Deye Hybrid Inverter",
      "24 pcs 615W Canadian Bifacial Solar Panel",
      "2 x 51.2v 280Ah LiFePO₄ Battery",
    ],
    benefits: [
      "Lower Electricity Bills: Significantly reduces monthly Meralco or local utility charges through solar self-consumption.",
      "Reliable Backup Power: Keeps essential appliances like lights, fans, and refrigerators running during blackouts.",
      "Eco-Friendly: Helps reduce approximately 500–700 kg of CO₂ emissions per month.",
      "Smart Energy Management: Automatically prioritizes solar power and battery usage to optimize savings.",
      "Compact & Scalable: Ideal for medium-sized homes with room for future upgrades.",
    ],
    description:
      "Sunphil Solar installed a 12kW hybrid solar power system for a homeowner in Cabanatuan City, Nueva Ecija—a growing urban center in Central Luzon. This system provides clean and reliable energy with built-in battery storage, helping the client enjoy lower electricity bills and backup power during outages.",
  },
  "porac-pampanga": {
    image: "/images/project4.jpg",
    location: "Porac, Pampanga, PH",
    system: "8kW Hybrid Solar",
    date: "2024-03-03",
    clientType: "Residential",
    specification: [
      "8kW Deye Hybrid Inverter",
      "18 pcs 615W Canadian Bifacial Solar Panel",
      "51.2v 280Ah LiFePO₄ Battery",
    ],
    benefits: [
      "Lower Electric Bills: Reduces monthly energy costs through efficient solar generation and smart energy use.",
      "Backup Power: Ensures continuous power for essentials like lighting, fans, routers, and appliances during grid outages.",
      "Eco-Friendly Impact: Offsets approximately 300–500 kg of CO₂ emissions per month.",
      "Space-Saving Design: Compact setup suitable for homes with limited roof space.",
      "Expandable System: Can be upgraded in the future to support additional panels or batteries.",
    ],
    description:
      "Sunphil Solar completed an 8kW hybrid solar installation for a home in Porac, Pampanga, providing sustainable and uninterrupted energy. This system is ideal for small to mid-sized households looking to reduce power bills, enjoy backup power, and contribute to a greener future.",
  },
  "birvillage-qc": {
    image: "/images/project5.jpg",
    location: "BIR Village, Quezon City, Metro Manila, PH",
    system: "12kW Hybrid Solar",
    date: "2024-03-07",
    clientType: "Residential",
    specification: [
      "12kW Deye Hybrid Inverter",
      "24 pcs 615W Canadian Bifacial Solar Panel",
      "3 x 51.2v 280Ah LiFePO₄ Battery",
    ],
    benefits: [
      "Monthly Savings: Significant reduction in electricity bills through solar energy self-consumption.",
      "Backup Power Capability: Reliable energy source during brownouts or power interruptions in Quezon City.",
      "Eco-Friendly: Offsets approximately 700–900 kg of CO₂ emissions per month, contributing to a cleaner Metro Manila.",
      "Smart Load Handling: Prioritizes essential appliances like air conditioning, lighting, and refrigerators.",
      "Future-Ready: Easily expandable with more panels or batteries as the client's needs grow.",
    ],
    description:
      "Sunphil Solar installed a 12kW hybrid solar energy system for a household in BIR Village, Quezon City. Designed to optimize energy savings and provide backup during power outages, this system combines solar generation, battery storage, and smart energy management—ideal for homeowners in urban Metro Manila areas.",
  },
  "cabanatuan-nueva-ecija-6kw": {
    image: "/images/project6.jpg",
    location: "Cabanatuan City, Nueva Ecija, PH",
    system: "6kW Hybrid Solar",
    date: "2024-03-15",
    clientType: "Residential",
    specification: [
      "6kW Deye Hybrid Inverter",
      "13 pcs 615W Canadian Bifacial Solar Panel",
      "51.2v 314Ah LiFePO₄ Battery",
    ],
    benefits: [
      "Reduced Energy Bills: Homeowners enjoy monthly savings by relying on solar power for daily consumption.",
      "Backup Power During Outages: Ensures essential appliances stay powered during power interruptions.",
      "Environmental Impact: Offsets around 400–600 kg of CO₂ emissions per month, contributing to a greener Nueva Ecija.",
      "Compact Yet Powerful: Ideal for homes with average electricity consumption and limited roof space.",
      "Future-Proof Design: The system can be expanded to include more panels or additional batteries as energy needs grow.",
    ],
    description:
      "Sunphil Solar installed a 6kW hybrid solar power system for a home in Cabanatuan City, Nueva Ecija, enabling the client to benefit from reliable, clean energy with backup capability. This compact yet powerful setup is tailored for residential energy needs, especially in areas with frequent power interruptions.",
  },
  "lubao-pampanga": {
    image: "/images/project7.jpg",
    location: "Lubao, Pampanga, PH",
    system: "8kW Hybrid Solar",
    date: "2024-05-08",
    clientType: "Residential",
    specification: [
      "8kW Deye Hybrid Inverter",
      "18 pcs 615W Canadian Bifacial Solar Panel",
      "2 x 51.2v 314Ah LiFePO₄ Battery",
    ],
    benefits: [
      "Significant Monthly Savings: Reduces reliance on grid power and lowers electric bills.",
      "Reliable Backup Power: Keeps essential home appliances like refrigerators, fans, and lighting running during outages.",
      "Environmental Impact: Offsets up to 600–800 kg of CO₂ emissions per month, promoting a more sustainable lifestyle.",
      "High-Efficiency System: Built with industry-leading components for long-term reliability and performance.",
      "Expandable Setup: Can be scaled up in the future to meet growing energy needs.",
    ],
    description:
      "Sunphil Solar completed the installation of an 8kW hybrid solar system for a residential client in Lubao, Pampanga. This powerful system is designed to provide maximum solar energy savings while ensuring backup power during outages, ideal for homes in Central Luzon seeking energy independence and lower monthly bills.",
  },
  "umingan-pangasinan": {
    image: "/images/project8.jpg",
    location: "Umingan, Pangasinan, PH",
    system: "8kW Hybrid Solar",
    date: "2024-05-13",
    clientType: "Residential",
    specification: [
      "8kW Deye Hybrid Inverter",
      "16 pcs 615W Canadian Bifacial Solar Panel",
      "51.2v 314Ah LiFePO₄ Battery",
    ],
    benefits: [
      "Lower Power Bills: Reduces grid dependency and monthly expenses.",
      "Reliable Backup Energy: Protects against frequent brownouts by keeping essential appliances running.",
      "Green Energy Impact: Offsets approximately 500–700 kg of CO₂ emissions per month, supporting a cleaner Pangasinan.",
      "Space-Saving Design: Ideal for homes with limited rooftop space but high energy needs.",
      "Future-Proof Setup: Allows easy expansion with more panels or additional batteries as needed.",
    ],
    description:
      "Sunphil Solar successfully installed an 8kW hybrid solar system in Umingan, Pangasinan, designed to meet the energy needs of a modern Filipino household. With efficient solar panels, a powerful inverter, and reliable battery storage, this system ensures lower electricity bills and backup power during outages—perfect for rural and semi-urban homes in Northern Luzon.",
  },
  "bacoor-cavite": {
    image: "/images/project9.jpg",
    location: "Bacoor, Cavite, PH",
    system: "12kW Hybrid Solar",
    date: "2024-05-19",
    clientType: "Residential",
    specification: [
      "12kW Deye Hybrid Inverter",
      "14 615W Canadian Solar Bifacial Panels",
      "2 x 51.2V 314Ah LiFePO₄ Lithium Batteries",
    ],
    benefits: [
      "Lower Monthly Bills: Reduces grid electricity usage, resulting in significant savings.",
      "Reliable Backup Power: Ensures critical appliances stay operational during outages.",
      "Efficient Solar Harvesting: Bifacial panels deliver up to 10–15% more energy, especially in sunny Cavite.",
      "Clean Energy: Offsets approximately 800–1,000 kg of CO₂ emissions per month, contributing to a greener environment.",
      "Future-Ready Setup: Easily expandable with additional panels or batteries.",
    ],
    description:
      "Sunphil Solar completed a 12kW hybrid solar system installation for a residential client in Bacoor, Cavite, designed to deliver substantial energy savings while providing backup power during outages. This setup is ideal for households with high electricity usage and a need for uninterrupted power supply.",
  },
  // Add more projects as needed
};

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projects[projectId] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-secondary-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
            <Link
              to="/solarprojects"
              className="text-primary-600 hover:underline"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-20">
      <Helmet>
        <title>
          {project
            ? `${project.system} in ${project.location} | SunPhil Solar`
            : "Project Details | SunPhil Solar"}
        </title>
      </Helmet>
      <div className="container mx-auto px-4">
        <Link
          to="/solarprojects"
          className="inline-flex items-center text-primary-600 hover:underline mb-6"
        >
          <MdArrowBack className="mr-2" /> Back to Projects
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={project.image}
              alt={project.location}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">
              {project.system} Installation in {project.location}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center">
                <MdCalendarToday className="text-primary-500 mr-2" />
                <span>Completed: {project.date}</span>
              </div>
              <div className="flex items-center">
                <MdLocationOn className="text-primary-500 mr-2" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center">
                <MdHome className="text-primary-500 mr-2" />
                <span>{project.clientType}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-8">
              <CheckCircle className="text-green-500" size={20} />
              <span className="font-semibold text-black">Client Review:</span>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="text-yellow-400 fill-yellow-400"
                  size={20}
                />
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                🔋 Project Overview
              </h2>
              <p className="text-secondary-700">{project.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                ⚙️ System Specifications
              </h2>
              <div className="bg-secondary-50 rounded-lg p-6">
                <ul className="space-y-4">
                  {project.specification.map((spec, index) => (
                    <li key={index} className="flex items-start">
                      <MdSolarPower className="text-primary-500 mt-1 mr-2" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">🌞 Key Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.benefits?.map((benefit, index) => (
                  <div key={index} className="bg-secondary-50 rounded-lg p-4">
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-50 rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                📞 Start Your Solar Journey Today!
              </h2>
              <p className="mb-4">
                Looking to install a solar power system in {project.location} or
                anywhere in the Philippines?
              </p>
              <Link
                to="/contact"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Contact Us for a Free Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
