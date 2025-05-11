import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "core" | "admins" | "installers" | "builders"
  >("core");

  const coreTeam = [
    {
      initial: "K",
      name: "Ma. Katrina Bascon",
      title: "Owner",
      description: "Leading our vision for a sustainable future.",
      image: "/images/Katrina.jpeg",
    },
    {
      initial: "J",
      name: 'Jhayar "Gar" Bacolod',
      title: "Owner/Head of Operations",
      description:
        "Ensuring smooth project execution and customer satisfaction.",
        image: "/images/Jhayar.jpeg",
    },
  ];

  const admins = [
    {
      initial: "D",
      name: "Diane",
      title: "Admin Officer",
      description: "Providing excellent administrative support every day.",
      image: "/images/Diane.jpeg",
    },
    {
      initial: "A",
      name: "Aira",
      title: "Admin Assistant",
      description: "Building strong client relationships daily.",
      image: "/images/Aira.jpeg",
    },
    {
      initial: "T",
      name: "Thea",
      title: "Admin Assistant",
      description: "Building strong client relationships daily.",
      image: "/images/Thea.jpeg",
    },
    {
      initial: "E",
      name: "Ely",
      title: "Admin Assistant",
      description: "Building strong client relationships daily.",
      image: "/images/Ely.jpeg",
    },
    {
      initial: "J",
      name: "Jen",
      title: "Admin Assistant",
      description: "Building strong client relationships daily.",
      image: "/images/Jen.jpeg",
    },
    {
      initial: "M",
      name: "Mark",
      title: "Admin Support Specialist",
      description: "Expert in hybrid inverter setups and connections.",
      image: "/images/Mark.jpeg",
    },
    {
      initial: "E",
      name: "Erwin",
      title: "Admin/Installer",
      description: "Building strong client relationships daily.",
      image: "/images/Erwin.jpeg",
    },
    {
      initial: "J",
      name: "Jayar",
      title: "Admin Assistant",
      description: "Building strong client relationships daily.",
      image: "/images/Jayar.jpeg",
    },
    {
      initial: "R",
      name: "Ruel",
      title: "Admin/Installer",
      description: "Building strong client relationships daily.",
      image: "/images/Ruel.jpeg",
    },
    {
      initial: "J",
      name: "Jhoy",
      title: "Admin Assistant",
      description: "Building strong client relationships daily.",
      image: "/images/Jhoy.jpeg",
    },
    {
      initial: "R",
      name: "Retchel Grace",
      title: "Admin Assistant",
      description: "Building strong client relationships daily.",
      image: "/images/Retchel Grace.jpeg",
    },
  ];

  const installers = [
    {
      initial: "J",
      name: "Joey",
      title: "Installer",
      description: "Overseeing on-site solar panel installations.",
      image: "/images/Joey.jpeg",
    },
    {
      initial: "J",
      name: "Jonis",
      title: "Installer",
      description: "Delivering quality and precision in every project.",
      image: "/images/Jonis.jpeg",
    },
    {
      initial: "B",
      name: "Buboy",
      title: "Installer",
      description: "Helping build solar systems safely and securely.",
      image: "/images/Buboy.jpeg",
    },
    {
      initial: "E",
      name: "Erwin",
      title: "Installer",
      description: "Helping build solar systems safely and securely.",
      image: "/images/Erwin.jpeg",
    },
    {
      initial: "R",
      name: "Ruel",
      title: "Installer",
      description: "Bringing expertise and dedication to the team.",
      image: "/images/Ruel.jpeg",
    },
    {
      initial: "J",
      name: "Jek Jek",
      title: "Installer",
      description: "Logistics Coordinator.",
      image: "/images/Jek Jek.jpeg",
    },
    {
      initial: "J",
      name: "Jimmy",
      title: "Installer",
      description: "Helping build solar systems safely and securely.",
      image: "/images/Jimmy.jpeg",
    },
    {
      initial: "B",
      name: "Bong",
      title: "Installer",
      description: "Expert in hybrid inverter setups and connections.",
      image: "/images/Bong.jpeg",
    },
    {
      initial: "M",
      name: "Mon-Mon",
      title: "Installer",
      description: "Helping build solar systems safely and securely.",
      image: "/images/Mon-Mon.jpeg",
    },
    {
      initial: "S",
      name: "Samuel",
      title: "Installer",
      description: "Helping build solar systems safely and securely.",
      image: "/images/Samuel.jpeg",
    },
    {
      initial: "A",
      name: "Allan",
      title: "Installer",
      description: "Helping build solar systems safely and securely.",
      image: "/images/Allan.jpeg",
    },
  ];

  const builders = [
    {
      initial: "J",
      name: "Joshua",
      title: "Builder",
      description: "Inverter Technical Specialist.",
      image: "/images/Joshua.jpeg",
    },
    {
      initial: "D",
      name: "David",
      title: "Builder",
      description: "Inverter Technical Specialist.",
      image: "/images/David.jpeg",
    },
    {
      initial: "D",
      name: "Dong",
      title: "Installer",
      description: "Battery Technician.",
      image: "/images/Dong.jpeg",
    },
  ];

  const teamData =
    activeTab === "core"
      ? coreTeam
      : activeTab === "admins"
      ? admins
      : activeTab === "installers"
      ? installers
      : builders;

  return (
    <section id="about" className="py-20 bg-secondary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
            About Us
          </h2>
          <div className="h-1 w-20 bg-primary-500 mx-auto rounded mb-6"></div>
          <p className="text-lg text-secondary-600">
            Empowering homes and businesses with clean, renewable energy
            solutions built on innovation, reliability, and a commitment to a
            sustainable future.
          </p>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-lg p-10 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 transform hover:-translate-y-2">
          <h3 className="text-2xl font-semibold text-secondary-900 mb-6">
            Our Story
          </h3>
          <p className="text-secondary-600 mb-6">
            Founded with a vision to make solar energy accessible to everyone,
            we are a team of dedicated professionals passionate about creating a
            greener planet. Our expertise spans across solar panel installation,
            hybrid inverters, battery storage solutions, and customer-first
            maintenance services. We believe in providing not just products, but
            a complete lifestyle transformation toward energy independence.
          </p>

          <h3 className="text-2xl font-semibold text-secondary-900 mb-6">
            Our Mission
          </h3>
          <p className="text-secondary-600 mb-6">
            To deliver high-quality, affordable, and reliable solar energy
            solutions that empower our customers to take control of their energy
            needs — reducing costs while protecting the environment for
            generations to come.
          </p>

          <h3 className="text-2xl font-semibold text-secondary-900 mb-6">
            Why Choose Us?
          </h3>
          <ul className="list-disc list-inside text-secondary-600 space-y-3">
            <li>
              Premium quality solar panels, inverters, and battery systems
            </li>
            <li>Expert installation with industry-leading workmanship</li>
            <li>Exceptional customer support and after-sales service</li>
            <li>
              Flexible, future-proof energy solutions tailored to your needs
            </li>
            <li>Transparent pricing and trusted partnerships</li>
          </ul>
        </div>

        {/* Meet Our Team */}
        <h3 className="text-2xl font-semibold text-secondary-900 mt-16 mb-10 text-center">
          Meet Our Team
        </h3>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-4">
          <TabButton
            label="Core Team"
            active={activeTab === "core"}
            onClick={() => setActiveTab("core")}
          />
          <TabButton
            label="Admins"
            active={activeTab === "admins"}
            onClick={() => setActiveTab("admins")}
          />
          <TabButton
            label="Installers"
            active={activeTab === "installers"}
            onClick={() => setActiveTab("installers")}
          />
          <TabButton
            label="Builders"
            active={activeTab === "builders"}
            onClick={() => setActiveTab("builders")}
          />
        </div>

        {/* Animated Team Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className={`grid gap-8 ${
              activeTab === "core"
                ? "grid-cols-1 sm:grid-cols-2 justify-center"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            }`}
          >
            {teamData.map((member, index) => (
              <TeamMember
                key={index}
                initial={member.initial}
                name={member.name}
                title={member.title}
                description={member.description}
                image={member.image}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// TabButton Component
interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full font-semibold transition ${
      active
        ? "bg-primary-500 text-white"
        : "bg-secondary-100 text-secondary-600 hover:bg-primary-100"
    }`}
  >
    {label}
  </button>
);

// TeamMember Component
interface TeamMemberProps {
  initial: string;
  name: string;
  title: string;
  description: string;
  image?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  initial,
  name,
  title,
  description,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 text-center shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 transform hover:-translate-y-2">
      <div className="w-24 h-24 mx-auto rounded-full bg-primary-100 flex items-center justify-center mb-4 overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="object-cover w-full h-full" />
        ) : (
          <span className="text-2xl font-bold text-primary-500">{initial}</span>
        )}
      </div>
      <h4 className="text-xl font-semibold text-secondary-900 mb-1">{name}</h4>
      <p className="text-primary-500 font-medium mb-2">{title}</p>
      <p className="text-secondary-600 text-sm">{description}</p>
    </div>
  );
};

export default AboutPage;
