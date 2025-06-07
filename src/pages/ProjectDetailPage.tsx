import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  MdArrowBack,
  MdCalendarToday,
  MdLocationOn,
  MdHome,
  MdSolarPower,
} from "react-icons/md";
import { CheckCircle, Star } from "lucide-react";
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
    date: "2025-04-30",
    clientType: "Residential",
    specification: [
      "2 x 16kW Deye Hybrid Inverter",
      "54 pcs 615W Canadian Bifacial Solar Panel",
      "4 x 51.2v 280Ah LiFePO₄ Batteries",
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
    date: "2025-03-18",
    clientType: "Residential / Small Commercial",
    specification: [
      "2 x 12kW Deye Hybrid Inverter",
      "48 pcs 610W Canadian Bifacial Solar Panel",
      "4 x 51.2v 314Ah LiFePO₄ Batteries",
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
    date: "2025-04-12",
    clientType: "Residential",
    specification: [
      "12kW Deye Hybrid Inverter",
      "24 pcs 615W Canadian Bifacial Solar Panel",
      "2 x 51.2v 280Ah LiFePO₄ Batteries",
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
    date: "2025-03-03",
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
    date: "2025-03-07",
    clientType: "Residential",
    specification: [
      "12kW Deye Hybrid Inverter",
      "24 pcs 615W Canadian Bifacial Solar Panel",
      "3 x 51.2v 280Ah LiFePO₄ Batteries",
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
    date: "2025-03-15",
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
    date: "2025-05-08",
    clientType: "Residential",
    specification: [
      "8kW Deye Hybrid Inverter",
      "18 pcs 615W Canadian Bifacial Solar Panel",
      "2 x 51.2v 314Ah LiFePO₄ Batteries",
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
    date: "2025-05-13",
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
    date: "2025-05-19",
    clientType: "Residential",
    specification: [
      "12kW Deye Hybrid Inverter",
      "14 615W Canadian Solar Bifacial Panels",
      "2 x 51.2V 314Ah LiFePO₄ Batteries",
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
  "bagumbong-caloocan": {
    image: "/images/project10.jpg",
    location: "Bagumbong, Caloocan, Metro Manila, PH",
    system: "6kW Hybrid Solar",
    date: "2025-05-25",
    clientType: "Residential",
    specification: [
      "6kW Deye Hybrid Inverter – Handles energy from solar, grid, and battery sources with seamless switching and intelligent load management.",
      "13 × 615W Canadian Solar Bifacial Panels – High-efficiency panels that harvest energy from both sides for maximum performance, even on limited rooftop space.",
      "51.2V 314Ah LiFePO₄ Battery – Long-lasting and safe battery backup system for night use and power interruptions.",
    ],
    benefits: [
      "Cost Savings: Offsets a major portion of daily electricity use, reducing bills by up to 60%.",
      "Backup Protection: Ensures that essential appliances like lights, Wi-Fi, fans, and refrigerators stay powered during brownouts.",
      "Smart Solar Investment: Provides reliable performance, low maintenance, and a strong ROI within 5–6 years.",
      "Clean Power for Caloocan: Offsets approximately 400–600 kg of CO₂ emissions monthly, promoting sustainable living in the city.",
    ],
    description:
      "Sunphil Solar delivered a compact yet powerful 6kW hybrid solar system for a homeowner in Bagumbong, Caloocan. This system is engineered to handle the home's daily energy needs while providing dependable backup power during outages, which are common in densely populated areas of Metro Manila. This installation reflects Sunphil Solar's dedication to bringing sustainable energy solutions to urban households in Caloocan, Quezon City, Valenzuela, and surrounding communities. Whether you're dealing with high bills or frequent outages, our hybrid systems offer the flexibility and performance you need.",
  },
  "lemery-batangas": {
    image: "/images/project11.jpg",
    location: "Lemery, Batangas, PH",
    system: "8kW Hybrid Solar",
    date: "2025-05-10",
    clientType: "Residential",
    specification: [
      "8kW Deye Hybrid Inverter – Supports grid, solar, and battery input with intelligent energy management for seamless performance.",
      "16 × 615W Canadian Solar Bifacial Panels – Premium bifacial modules that capture sunlight from both sides, ideal for maximizing solar output in sunny Batangas.",
      "51.2V 314Ah LiFePO₄ Battery – High-capacity lithium battery designed for long lifespan, safety, and deep discharge for nighttime and emergency use.",
    ],
    benefits: [
      "Energy Savings: Cuts monthly electric bills by up to 65%.",
      "Backup Power: Keeps appliances like lights, fans, and refrigerators running during outages.",
      "Environmentally Friendly: Reduces carbon emissions by an estimated 600–800 kg/month.",
      "Low Maintenance: Clean energy system with minimal upkeep and strong long-term value.",
    ],
    description:
      "This 8kW hybrid solar system installed in Lemery, Batangas is designed to meet the growing energy needs of a modern household while providing reliable backup power during grid interruptions. With efficient solar harvesting and battery storage, the system helps the homeowner save on electricity costs and ensures peace of mind during brownouts. This Lemery-based project showcases Sunphil Solar's expertise in delivering hybrid solar solutions tailored to the needs of homeowners in Batangas, including Tanauan, Lipa, and Taal. Our systems are built for reliability, cost-efficiency, and long-term performance.",
  },
  "pandacan-manila": {
    image: "/images/project12.jpg",
    location: "Pandacan, Manila, NCR, PH",
    system: "8kW Hybrid Solar",
    date: "2025-05-26",
    clientType: "Residential",
    specification: [
      "8kW Deye Hybrid Inverter – Smart inverter capable of managing solar, grid, and battery sources for optimized energy flow and seamless switching.",
      "16 × 615W Canadian Solar Bifacial Panels – High-efficiency bifacial modules that capture sunlight from both sides for increased energy generation in limited rooftop spaces.",
      "51.2V 314Ah LiFePO₄ Battery – Advanced energy storage with deep-cycle capabilities and long lifespan, ideal for city homes with frequent brownouts.",
    ],
    benefits: [
      "Monthly Savings: Offsets grid consumption by up to 60%, lowering electric bills significantly.",
      "Power Security: Keeps essential home appliances running during power outages.",
      "Sustainable Solution: Reduces carbon emissions by around 600–800 kg per month.",
      "Ideal for Urban Homes: Compact system layout suited for residential rooftops in dense city areas.",
    ],
    description:
      "Sunphil Solar successfully installed an 8kW hybrid solar system in Pandacan, Manila, tailored to meet the high daytime energy demand of a Metro Manila household while ensuring dependable backup power. This setup provides clean, sustainable electricity and protection from frequent urban power interruptions. This project highlights Sunphil Solar's commitment to helping Manila residents gain energy independence through high-performance hybrid solar systems. From Pandacan to Sampaloc, Tondo, and beyond—we bring solar energy to every home that needs it.",
  },
  "alisha-nueva-ecija": {
    image: "/images/project13.jpg",
    location: "Alisha, Nueva Ecija, PH",
    system: "6kW Hybrid Solar",
    date: "2025-05-27",
    clientType: "Residential",
    specification: [
      "6kW Deye Hybrid Inverter – Supports seamless switching between solar, grid, and battery power with intelligent energy management.",
      "13 × 615W Canadian Bifacial Solar Panels – High-performance panels capable of absorbing sunlight from both front and rear sides, delivering enhanced power generation even in shaded or diffused light conditions.",
      "51.2V 314Ah LiFePO₄ Battery – Advanced lithium battery offering long-lasting storage, safety, and deep cycling for optimal night-time or emergency usage.",
    ],
    benefits: [
      "Lower Energy Bills: Offsets a large portion of grid electricity use, saving the homeowner up to 60% monthly.",
      "Uninterrupted Power: Supports lighting, refrigeration, internet routers, and other essentials during brownouts.",
      "Eco-Friendly: Helps reduce approximately 400–600 kg of CO₂ emissions per month.",
      "Rural-Ready: Durable and low-maintenance—perfect for homes in provincial areas.",
    ],
    description:
      "Sunphil Solar deployed a 6kW hybrid solar energy system for a residential client in Alisha, Nueva Ecija, tailored to handle everyday household power needs while ensuring reliable energy supply during frequent grid interruptions. This system is an ideal choice for provinces where stable energy access is crucial for comfort and savings. This project is part of Sunphil Solar's expanding reach in Central Luzon, delivering quality hybrid solar systems to residential communities in Alisha, Cabanatuan, San Jose, and beyond. Our mission is to bring affordable, clean, and reliable power to Filipino homes—wherever they are.",
  },
  "iba-zambales": {
    image: "/images/project14.jpg",
    location: "Iba, Zambales, PH",
    system: "8kW Hybrid Solar",
    date: "2025-05-28",
    clientType: "Residential",
    specification: [
      "8kW Deye Hybrid Inverter – Smart inverter that integrates solar, grid, and battery inputs to ensure consistent, efficient power flow.",
      "13 × 615W Canadian Solar Bifacial Panels – High-efficiency panels with bifacial technology to harvest more sunlight—even from reflective surfaces—maximizing output.",
      "51.2V 314Ah LiFePO₄ Battery – Long-lasting, high-capacity battery designed to supply energy during nighttime use and grid outages.",
    ],
    benefits: [
      "Significant Cost Reduction: Reduces monthly electricity bills by up to 60%.",
      "Power Stability: Keeps household essentials running even during power outages.",
      "Environmentally Friendly: Offsets an estimated 600–800 kg of CO₂ emissions monthly.",
      "Perfect for Provincial Homes: Designed for homes that experience voltage fluctuations or unreliable grid access.",
    ],
    description:
      "Sunphil Solar completed a customized 8kW hybrid solar system for a residential property in Iba, Zambales, offering dependable daytime power generation and seamless backup support during brownouts. This installation is designed to address the energy needs of modern homes in rural and coastal areas, where energy reliability is essential. This solar installation reflects Sunphil Solar's growing footprint in Western Luzon, bringing clean, hybrid solar power to areas like Iba, Subic, San Narciso, and nearby communities. Our hybrid systems are tailor-fit for coastal regions that experience frequent brownouts and rising electricity costs.",
  },
  "binangonan-rizal": {
    image: "/images/project15.jpg",
    location: "Binangonan, Rizal, PH",
    system: "16kW Hybrid Solar",
    date: "2025-05-29",
    clientType: "Residential",
    specification: [
      "1 × 16kW Deye Hybrid Inverter – Advanced hybrid inverter that efficiently balances power between solar input, grid supply, and battery storage.",
      "30 × 615W Canadian Bifacial Solar Panels – Premium high-efficiency panels with bifacial technology that captures sunlight from both sides for enhanced output.",
      "2 × 51.2V 314Ah LiFePO₄ Batteries – Durable, high-capacity lithium batteries ideal for storing surplus solar energy for nighttime use or grid outages.",
    ],
    benefits: [
      "Massive Energy Offset: Covers up to 80–90% of the household's monthly electricity usage.",
      "Backup Readiness: Provides full backup power for essentials during blackouts or peak demand.",
      "Sustainability: Reduces carbon emissions by approximately 1,200–1,600 kg per month.",
      "Perfect for Expanding Households: Future-ready system that supports additional loads or electric vehicle charging.",
    ],
    description: `Sunphil Solar delivered a high-capacity 16kW hybrid solar system in Binangonan, Rizal, designed for a large household with high energy consumption. This setup ensures uninterrupted power, significant savings, and long-term energy independence in a growing urban community. Sunphil Solar is proud to support homeowners in Binangonan and throughout Rizal Province with dependable hybrid solar solutions. Our installations empower customers to take control of their energy while reducing dependency on the national grid. Considering going solar in Binangonan or nearby areas like Antipolo, Taytay, or Angono? Sunphil Solar offers customized systems with expert installation and lifetime support. Big System Capacity | Expert Design | Eco-Friendly Power.`,
  },
  "siruma-camarines-sur": {
    image: "/images/project16.jpg",
    location: "Siruma, Camarines Sur, PH",
    system: "32kW Hybrid Solar",
    date: "2025-05-31",
    clientType: "Residential / Small Commercial",
    specification: [
      "2 × 16kW Deye Hybrid Inverters – Smart and scalable solution capable of handling large loads and ensuring seamless switching between solar, battery, and grid power sources.",
      "56 × 620W Canadian Bifacial Solar Panels – State-of-the-art bifacial modules with high conversion efficiency and dual-sided sunlight absorption, ideal for maximizing energy yield in open or rural settings.",
      "4 × 51.2V 314Ah LiFePO₄ Batteries – Long-lasting, deep-cycle batteries designed to store substantial amounts of energy for reliable nighttime and blackout use.",
    ],
    benefits: [
      "Massive Power Capacity: Supports an entire household or small business operation including air conditioning, refrigeration, water pumps, and appliances.",
      "Off-Grid Ready: Perfect for remote locations like Siruma where grid reliability may be limited.",
      "Energy Cost Savings: Reduces electricity expenses by up to 80–90% monthly.",
      "Environmental Impact: Cuts down approximately 2,000–2,400 kg of CO₂ emissions per month.",
    ],
    description:
      "Sunphil Solar successfully installed a 32kW hybrid solar energy system in the remote coastal municipality of Siruma, Camarines Sur. Designed to meet the high energy demands of a large residence or small business, this system provides powerful off-grid backup capabilities while significantly reducing electricity bills and environmental impact. This Siruma project demonstrates Sunphil Solar's commitment to bringing clean, renewable energy to rural and hard-to-reach areas. Whether for residential or commercial use, our high-performance hybrid systems are tailored to provide power independence in off-grid or low-grid environments.",
  },
  "san-antonio-quezon": {
    image: "/images/project17.jpg",
    location: "San Antonio, Quezon, PH",
    system: "32kW Hybrid Solar",
    date: "2025-06-04",
    clientType: "Residential Estate / Small Business",
    specification: [
      "2 × 16kW Deye Hybrid Inverters – Intelligent hybrid inverters capable of managing high power loads and optimizing the use of solar, battery, and grid energy.",
      "56 × 615W Canadian Bifacial Solar Panels – High-performance bifacial modules that capture sunlight from both sides, maximizing efficiency and output—perfect for open installations in provincial areas.",
      "5 × 51.2V 314Ah LiFePO₄ Batteries – Large-capacity lithium batteries offering extended backup capabilities and deep-cycle performance for reliable, long-lasting energy storage.",
    ],
    benefits: [
      "Significant Power Capacity: Covers virtually all electrical needs including air conditioning, heavy appliances, refrigeration, and business operations.",
      "Energy Independence: Enables off-grid capability or reduced reliance on the grid—essential in areas with unreliable electricity supply.",
      "Major Cost Savings: Offsets up to 90% of monthly electricity costs, with long-term savings over the system's lifespan.",
      "Environmental Impact: Reduces carbon emissions by an estimated 2,000–2,600 kg per month.",
    ],
    description:
      "Sunphil Solar designed and installed a powerful 32kW hybrid solar system for a large property in San Antonio, Quezon. This installation supports the energy needs of a spacious household or a small commercial operation, providing reliable daytime power and substantial energy storage for night use or grid outages. The system offers an excellent return on investment while promoting environmental sustainability. Sunphil Solar is committed to helping communities in Quezon Province—including San Antonio, Lucena, Candelaria, and beyond—achieve energy independence through advanced hybrid solar systems. Our mission is to make solar energy accessible, reliable, and financially rewarding for every Filipino home and business.",
  },
  "upper-bicutan-taguig": {
    image: "/images/project18.jpg",
    location: "Upper Bicutan, Taguig City, Metro Manila, PH",
    system: "8kW Hybrid Solar",
    date: "2025-06-06",
    clientType: "Residential",
    specification: [
      "8kW Deye Hybrid Inverter – Manages the flow of energy between solar panels, battery storage, and the grid for optimal efficiency and reliability.",
      "18 × 620W AE Bifacial Solar Panels – High-performance bifacial panels designed to maximize sunlight capture from both front and rear sides, delivering higher energy yields.",
      "2 × 51.2V 314Ah LiFePO₄ Batteries – Large-capacity lithium batteries that store excess solar energy for use at night or during power interruptions.",
    ],
    benefits: [
      "Energy Savings: Offsets up to 70–80% of the household's electricity consumption",
      "Backup Power: Maintains essential loads during grid outages, ensuring continuous power for lights, appliances, and home electronics",
      "Environmentally Friendly: Reduces carbon emissions by approximately 800–1,000 kg per month",
      "Ideal for Urban Homes: Hybrid system provides both energy savings and power stability in Metro Manila's urban environment",
    ],
    description:
      "Sunphil Solar installed a modern 8kW hybrid solar system for a home in Upper Bicutan, Taguig. This system offers clean, renewable energy with battery storage—perfect for homeowners in Metro Manila looking to reduce electricity costs and stay protected during grid outages. Sunphil Solar is dedicated to providing reliable hybrid solar systems in Taguig and across Metro Manila, helping families and businesses gain energy independence and cost control in a fast-growing urban setting.",
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
          <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
            <img
              src={project.image}
              alt={project.location}
              className="absolute inset-0 w-full h-full object-cover filter blur-lg scale-110"
              aria-hidden="true"
            />
            <img
              src={project.image}
              alt={project.location}
              className="relative z-10 max-h-full max-w-full object-contain"
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
              <a
                href="/contact"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors mt-4"
              >
                Book a Free Solar Consultation Now
              </a>
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
