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
import BeamsBackground from "@/components/BeamsBackground";
import CaseStudy from "@/components/CaseStudy";
import { caseStudies } from "@/data/caseStudies";

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
  "vista-verde-north-caloocan": {
    image: "/images/project25.jpg",
    location: "Vista Verde, North Caloocan, Metro Manila, PH",
    system: "8kW Hybrid Solar",
    date: "2025-06-21",
    clientType: "Residential",
    specification: [
      "8kW Deye Hybrid Inverter – A versatile and intelligent inverter that balances solar power, battery storage, and grid connection for optimal performance.",
      "18 × 620W AE Bifacial Solar Panels – Bifacial panels capture sunlight from both sides, increasing power production especially in rooftops with reflective surfaces or open surroundings.",
      "2 × 51.2V 314Ah LiFePO₄ Lithium Batteries – Reliable and long-lasting battery setup that stores solar power for nighttime use and acts as backup during power interruptions.",
    ],
    benefits: [
      "Up to 80–85% reduction in electricity bills",
      "Battery-powered backup keeps essential appliances running during brownouts",
      "Reduces an estimated 1,100–1,300 kg of CO₂ emissions monthly",
      "Ideal for Metro Manila homes with frequent grid fluctuations or peak demand periods",
    ],
    description:
      "Sunphil Solar completed an 8kW hybrid solar installation in Vista Verde, North Caloocan, providing the homeowner with clean energy generation, seamless battery backup, and significant monthly savings. Designed for energy-conscious urban families, this system is ideal for homes looking to cut costs and secure reliable power during outages. Sunphil Solar continues to bring high-quality hybrid solar systems to urban communities in North Caloocan, Bagumbong, Novaliches, and nearby areas. This project highlights our ability to deliver energy freedom in tightly packed residential villages without compromising system performance.",
  },
  "sariaya-quezon": {
    image: "/images/project1.jpg",
    location: "Sariaya, Quezon, PH",
    system: "32kW Hybrid Solar",
    date: "2025-04-30",
    clientType: "Residential",
    specification: [
      "2 x 16kW Deye Hybrid Inverter",
      "54 x 615W Canadian Bifacial Solar Panels",
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
      "48 x 610W Canadian Bifacial Solar Panels",
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
      "24 x 615W Canadian Bifacial Solar Panels",
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
      "18 x 615W Canadian Bifacial Solar Panels",
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
      "24 x 615W Canadian Bifacial Solar Panels",
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
      "13 x 615W Canadian Bifacial Solar Panels",
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
      "18 x 615W Canadian Bifacial Solar Panels",
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
      "16 x 615W Canadian Bifacial Solar Panels",
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
      "14 x 615W Canadian Solar Bifacial Panels",
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
  "bacoor-cavite-rescue": {
    image: "/images/project9.jpg",
    location: "Bacoor, Cavite, PH (Rescue)",
    system: "12kW Hybrid Solar (Upgraded)",
    date: "2025-05-19",
    clientType: "Residential",
    specification: [
      "12kW Deye Hybrid Inverter (Upgraded)",
      "14 x 615W Canadian Bifacial Solar Panels",
      "2 x 51.2V 314Ah LiFePO4 Batteries",
      "Rooftop Truss Expansion for additional panel support",
    ],
    benefits: [
      "Over ₱16,000 in monthly savings",
      "Complete energy independence from unreliable grid",
      "Full system warranty and ongoing support",
      "Redemption from a failed solar installation by another provider",
    ],
    description:
      "This project is a testament to our commitment to rescuing homeowners from failed solar installations. The client was left with an underperforming 5kW system and rising bills. Sunphil Solar stepped in to redesign and upgrade the entire system, transforming a story of frustration into one of significant savings and energy independence.",
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
  "taytay-rizal": {
    image: "/images/project19.jpg",
    location: "Taytay, Rizal, PH",
    system: "12kW Hybrid Solar",
    date: "2025-06-09",
    clientType: "Residential",
    specification: [
      "12kW Deye Hybrid Inverter – Smart inverter system balancing solar input, battery storage, and grid usage for optimal efficiency.",
      "18 × 620W AE Bifacial Solar Panels – Bifacial panels designed to capture sunlight from both sides, enhancing output and maximizing rooftop potential.",
      "51.2V 314Ah LiFePO₄ Battery – Reliable lithium battery that stores surplus solar energy for night-time use and backup during power outages.",
    ],
    benefits: [
      "Energy Savings: Offsets up to 80% of the household's monthly electricity bill",
      "Backup Capability: Provides seamless backup power for essential appliances during grid interruptions",
      "Environmental Contribution: Reduces carbon emissions by approximately 1,000–1,200 kg per month",
      "Optimized for Urban Living: Ideal system for households in Rizal Province seeking both cost efficiency and energy resilience",
    ],
    description:
      "Sunphil Solar completed a 12kW hybrid solar energy system installation in Taytay, Rizal, empowering the homeowner with reliable, renewable energy and substantial savings on electricity costs. This hybrid system is perfectly suited for urban and suburban households with high power demands and a desire for grid independence. Sunphil Solar proudly delivers advanced hybrid solar installations across Taytay, Antipolo, Cainta, Binangonan, and the entire Rizal area. We help homeowners and businesses gain energy freedom and contribute to a more sustainable Philippines.",
  },
  "batasan-qc": {
    image: "/images/project20.jpg",
    location: "Batasan, Quezon City, Metro Manila, PH",
    system: "6kW Hybrid Solar",
    date: "2025-06-10",
    clientType: "Residential",
    specification: [
      "6kW Deye Hybrid Inverter – Smart inverter technology that seamlessly manages solar energy, battery storage, and grid supply.",
      "13 × 620W AE Bifacial Solar Panels – Advanced bifacial panels that maximize solar power generation by capturing light from both sides, increasing efficiency.",
      "51.2V 314Ah LiFePO₄ Battery – High-performance battery enabling energy independence and providing reliable backup power during blackouts.",
    ],
    benefits: [
      "Energy Savings: Offsets up to 75% of monthly household electricity consumption",
      "Backup Power: Keeps essential devices and appliances running during grid outages",
      "Carbon Reduction: Helps reduce carbon footprint by an estimated 600–800 kg per month",
      "Urban Suitability: Tailored for homes in Metro Manila, where hybrid systems offer the best balance of savings and energy resilience",
    ],
    description:
      "Sunphil Solar installed a 6kW hybrid solar system for a residential property in Batasan, Quezon City. Designed to provide energy savings and backup power, this system is ideal for Metro Manila households facing high electricity costs and frequent grid interruptions. Sunphil Solar is committed to helping residents in Quezon City and throughout Metro Manila enjoy the benefits of hybrid solar power—from reducing electricity bills to ensuring reliable energy access during outages. We proudly serve Batasan Hills, Fairview, Diliman, Commonwealth, and surrounding communities.",
  },
  "san-mateo-rizal": {
    image: "/images/project21.jpg",
    location: "San Mateo, Rizal, PH",
    system: "8kW Hybrid Solar",
    date: "2025-06-13",
    clientType: "Residential",
    specification: [
      "8kW Deye Hybrid Inverter – Smart energy controller that balances solar, battery, and grid power to ensure continuous and optimized performance.",
      "16 × 615W Canadian Bifacial Solar Panels – High-efficiency panels that absorb sunlight from both front and rear sides, maximizing energy yield throughout the day.",
      "51.2V 314Ah LiFePO₄ Lithium Battery – Long-lasting lithium battery for storing excess solar power and supplying energy at night or during brownouts.",
    ],
    benefits: [
      "Reduced Power Bills: Cuts electricity consumption by up to 75–85%",
      "Energy Security: Keeps essential loads running during grid failures",
      "Eco-Friendly Impact: Helps reduce over 900–1,100 kg of CO₂ emissions monthly",
      "Adapted for Rizal Homes: Excellent choice for residential homes in elevated and flood-prone areas like San Mateo, ensuring reliable power even during storm seasons",
    ],
    description:
      "Sunphil Solar completed a custom-designed 8kW hybrid solar energy system for a home in San Mateo, Rizal. This hybrid solution provides sustainable energy, efficient battery storage, and strong protection against power outages—ideal for Rizal households that want to lower electricity bills and boost energy independence. Sunphil Solar proudly serves San Mateo, Rodriguez (Montalban), Antipolo, and the entire Rizal Province, offering expert solutions in hybrid solar installations for homeowners who want cost-effective, green, and dependable power.",
  },
  "san-mateo-rizal-2": {
    image: "/images/project22.jpg",
    location: "San Mateo, Rizal, PH",
    system: "8kW Hybrid Solar",
    date: "2025-06-12",
    clientType: "Residential",
    specification: [
      "8kW Deye Hybrid Inverter – Automatically manages solar, battery, and grid input for smart, uninterrupted power flow.",
      "16 × 620W AE Bifacial Solar Panels – Advanced bifacial technology captures sunlight from both sides, boosting daily power generation by up to 15%.",
      "51.2V 314Ah LiFePO₄ Battery – High-capacity battery bank ensures backup power during brownouts or peak usage hours.",
    ],
    benefits: [
      "Save Up to 80% on monthly electricity bills",
      "Automatic Power Backup for key appliances (lights, fridge, fans, Wi-Fi, etc.)",
      "Lower Carbon Emissions by an estimated 900–1,100 kg of CO₂ monthly",
      "Built for Metro Suburbs – Ideal for homes in elevated zones like San Mateo, where blackouts and grid instability are common",
    ],
    description:
      "Sunphil Solar recently completed an 8kW hybrid solar system for a residential property in San Mateo, Rizal. This setup provides reliable, clean energy during the day and seamless battery backup at night or during outages—perfect for households looking to cut electricity costs and increase energy security. Sunphil Solar is proud to bring modern hybrid solar energy solutions to families in San Mateo, Antipolo, Rodriguez (Montalban), Taytay, and nearby Rizal towns—delivering dependable systems tailored for both everyday and emergency power needs.",
  },
  "lemery-batangas-2": {
    image: "/images/project23.jpg",
    location: "Lemery, Batangas, PH",
    system: "12kW Hybrid Solar",
    date: "2025-06-15",
    clientType: "Residential (Off-grid-ready)",
    specification: [
      "12kW Deye Hybrid Inverter – A smart hybrid inverter that efficiently distributes solar power, manages battery charging, and syncs with the grid when needed.",
      "20 × 615W Canadian Bifacial Solar Panels – These high-efficiency panels collect sunlight from both sides, generating more energy even during cloudy weather or reflected light conditions.",
      "51.2V 314Ah LiFePO₄ Battery – A reliable and durable battery system that stores excess solar energy for nighttime use and backup during outages.",
    ],
    benefits: [
      "Significant Savings: Offsets up to 85% of monthly electricity consumption",
      "Reliable Backup: Keeps lights, fridge, and other essentials running during power outages",
      "Eco-Friendly: Helps reduce over 1,200 kg of CO₂ emissions per month",
      "Local Adaptation: Engineered for Batangas' coastal climate, including heat resistance and enhanced panel durability",
    ],
    description:
      "Sunphil Solar successfully completed a 12kW hybrid solar installation for a private residence in Lemery, Batangas. Designed for both power savings and energy resilience, this setup ensures the homeowner enjoys clean, reliable electricity—especially during grid interruptions, which are common in semi-rural and coastal areas like Lemery. Sunphil Solar is proud to support homeowners in Lemery, Taal, Calaca, and nearby areas with reliable hybrid solar solutions. Our systems are built for rural and semi-urban settings that require both cost-efficiency and dependable backup power.",
  },
  "san-fernando-pampanga": {
    image: "/images/project24.jpg",
    location: "San Fernando, Pampanga, PH",
    system: "18kW Hybrid Solar",
    date: "2025-06-16",
    clientType: "Residential / Light Commercial",
    specification: [
      "18kW Deye Hybrid Inverter – Versatile and powerful, this hybrid inverter intelligently manages solar production, grid interaction, and battery storage for optimal performance.",
      "30 × 615W Canadian Bifacial Solar Panels – Top-tier bifacial technology allows these panels to generate more electricity by absorbing sunlight from both sides—maximizing output even in diffused light conditions.",
      "2 × 51.2V 314Ah LiFePO₄ Batteries – High-capacity lithium batteries ensure critical appliances stay powered during blackouts and nighttime hours, with long lifecycle and safe energy storage.",
    ],
    benefits: [
      "Massive Energy Savings: Offset up to 90% of monthly electricity usage",
      "24/7 Reliability: Provides uninterrupted power for key household or business systems",
      "Carbon Reduction: Reduces over 1,800 kg of CO₂ emissions per month",
      "Built for Pampanga: Tailored for the area's hot climate and regular power fluctuations",
    ],
    description:
      "This project in San Fernando, Pampanga features one of the latest additions to Sunphil Solar's hybrid lineup—the new 18kW Deye Hybrid Inverter. Engineered for homes or small businesses with higher power demands, this system delivers exceptional energy performance, smart backup, and maximum solar savings.",
  },
  "dasmariñas-cavite": {
    image: "/images/project26.jpg",
    location: "Dasmariñas, Cavite, PH",
    system: "8kW Hybrid Solar",
    date: "2025-06-22",
    clientType: "Residential",
    specification: [
      "8kW Deye Hybrid Inverter – A smart hybrid inverter that manages solar energy generation, battery charging, and grid power seamlessly.",
      "16 × 615W Canadian Bifacial Solar Panels – Bifacial technology increases energy production by capturing sunlight from both sides, maximizing output even in low-light or reflective rooftop environments.",
      "51.2V 314Ah LiFePO₄ Battery – High-capacity lithium battery provides energy storage for night-time use or during brownouts, with long life and high safety standards.",
    ],
    benefits: [
      "Up to 80% monthly savings on electricity",
      "Uninterrupted power for appliances during blackouts",
      "Estimated 1,100–1,300 kg CO₂ reduction per month",
      "Perfect for suburban homes in Cavite dealing with high utility rates and inconsistent power",
    ],
    description:
      "Sunphil Solar completed an 8kW hybrid solar installation for a residence in Dasmariñas, Cavite—a growing suburban area where reliable and cost-effective energy is in high demand. This system combines high-efficiency bifacial panels, smart energy management, and battery backup, ensuring the client experiences lower electricity bills and 24/7 energy reliability. Sunphil Solar proudly delivers modern solar energy systems across Dasmariñas, Imus, General Trias, and nearby towns—designed for long-term savings and energy security. Our hybrid systems are optimized for both on-grid use and emergency backup, giving Cavite homeowners peace of mind.",
  },
  // Add more projects as needed
};

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects[projectId as keyof typeof projects];
  const caseStudyData = caseStudies[projectId as keyof typeof caseStudies];

  if (!project) {
    return (
      <BeamsBackground intensity="medium">
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
      </BeamsBackground>
    );
  }

  return (
    <BeamsBackground intensity="medium">
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

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 sm:p-6 mb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                Key Benefits
              </h2>
              <ul className="space-y-2">
                {project.benefits?.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/90">
                    <CheckCircle
                      className="text-green-400 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                Project Overview
              </h2>
              <p className="text-white/80 leading-relaxed">
                {project.description}
              </p>
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
    </BeamsBackground>
  );
};

export default ProjectDetailPage;
