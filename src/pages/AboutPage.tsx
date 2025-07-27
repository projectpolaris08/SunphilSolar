import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdCheckCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ChevronRight } from "lucide-react";

const AboutPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.75;
    }
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const [activeTab, setActiveTab] = useState<
    "core" | "admins" | "installers" | "builders"
  >("core");

  const coreTeam = [
    {
      initial: "K",
      name: "Ma. Katrina Bascon",
      title: "Owner",
      description:
        "Ma. Katrina Bascon owns Sunphil Solar and leads its day-to-day operations based in Fairview, Quezon City. She oversees sales, operations, legal, and finance, and manages the company's customer relationship management (CRM) system to keep client interactions organized and efficient. Katrina is passionate about expanding access to clean energy and building a reliable, customer-focused solar company.",
      image: "/images/Sunphil.jpg",
    },
    {
      initial: "J",
      name: 'Jhayar "Gar" Bacolod',
      title: "Owner/Head of Operations",
      description:
        "Jhayar is the Head of Operations and Chief Technical Officer at Sunphil Solar. He oversees daily operations and drives the company's technical direction—from system design to installation. Known for his hands-on expertise and strong leadership, Jhayar works closely with teams to ensure every project is completed efficiently, safely, and on time.",
      image: "/images/Sunphil.jpg",
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
      initial: "E",
      name: "Emz",
      title: "Admin Assistant",
      description: "Building strong client relationships daily.",
      image: "/images/Emz.jpg",
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
      image: "/images/Sunphil.jpg",
    },
    {
      initial: "J",
      name: "Jen",
      title: "Admin Assistant",
      description: "Building strong client relationships daily.",
      image: "/images/Sunphil.jpg",
    },
    {
      initial: "J",
      name: "Jayar",
      title: "Admin Assistant/Web Developer",
      description: "Building strong client relationships daily.",
      image: "/images/Jayar.jpeg",
    },
    {
      initial: "S",
      name: "Smile",
      title: "Admin Assistant",
      description: "Building strong client relationships daily.",
      image: "/images/Smile.jpg",
    },
    {
      initial: "A",
      name: "Aleth",
      title: "Admin Assistant",
      description: "Building strong client relationships daily.",
      image: "/images/Aleth.jpg",
    },
    {
      initial: "A",
      name: "Arni",
      title: "Admin Assistant",
      description: "Building strong client relationships daily.",
      image: "/images/Arni.jpg",
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
    {
      initial: "A",
      name: "Alvin",
      title: "Installer",
      description: "Helping build solar systems safely and securely.",
      image: "/images/Alvin.jpg",
    },
    {
      initial: "J",
      name: "Jun-Jun",
      title: "Installer",
      description: "Helping build solar systems safely and securely.",
      image: "/images/Jun-Jun.jpg",
    },
    {
      initial: "J",
      name: "Joel",
      title: "Installer",
      description: "Helping build solar systems safely and securely.",
      image: "/images/Joel.jpg",
    },
    {
      initial: "R",
      name: "Rogelio",
      title: "Installer",
      description: "Helping build solar systems safely and securely.",
      image: "/images/Rogelio.jpg",
    },
  ];

  const builders = [
    {
      initial: "J",
      name: "Joshua",
      title: "Builder",
      description: "Inverter Technical Specialist.",
      image: "/images/Joshua.jpg",
    },
    {
      initial: "D",
      name: "David",
      title: "Builder",
      description: "Inverter Technical Specialist.",
      image: "/images/David.jpg",
    },
    {
      initial: "M",
      name: "Mark",
      title: "Builder",
      description: "Expert in hybrid inverter setups and connections.",
      image: "/images/Mark.jpeg",
    },
    {
      initial: "J",
      name: "Jaxel",
      title: "Builder",
      description: "Expert in hybrid inverter setups and connections.",
      image: "/images/Jaxel.jpg",
    },
    {
      initial: "A",
      name: "Anthony",
      title: "Builder",
      description: "Expert in hybrid inverter setups and connections.",
      image: "/images/Anthony.jpg",
    },
    {
      initial: "JP",
      name: "John Paul",
      title: "Builder",
      description: "Expert in hybrid inverter setups and connections.",
      image: "/images/John-Paul.jpg",
    },
    {
      initial: "E",
      name: "Eron",
      title: "Builder",
      description: "Expert in hybrid inverter setups and connections.",
      image: "/images/Eron.jpg",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Helmet>
        <title>About Us | Sunphil Solar</title>
        <meta
          name="description"
          content="Meet the Sunphil Solar team and learn about our mission, values, and expertise in solar power installation across the Philippines."
        />
      </Helmet>
      <div className="container mx-auto px-4 py-20">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-white/80">
            <li>
              <Link to="/" className="flex items-center hover:text-blue-400">
                <svg
                  className="mr-2"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9.75L12 4l9 5.75V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.75Z" />
                  <path d="M9 22V12h6v10" />
                </svg>
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={16} className="mx-1" />
              <span className="text-blue-400">About Us</span>
            </li>
          </ol>
        </nav>
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={handleVideoLoad}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                isVideoLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src="/videos/earth-space.mp4" type="video/mp4" />
            </video>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl sm:text-2xl max-w-3xl mx-auto">
              Empowering the Philippines with Clean, Affordable Solar Energy
            </p>
          </div>
        </section>

        <section id="about" className="py-20 bg-secondary-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Company Info */}
            <div className="bg-white rounded-lg p-10 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-2xl font-semibold text-secondary-900 mb-6">
                Our Story
              </h3>
              <p className="text-secondary-600 mb-6">
                Sunphil Solar, also known in the community as Fairview
                Solarista, was founded in 2021 from a simple dream—to bring
                affordable and reliable solar energy to Filipino homes and
                businesses. What started as a local initiative powered by
                passion and grit has grown into one of Metro Manila's trusted
                names in solar power solutions. Our journey began with a small
                team of electricians who believed that clean energy should not
                be a luxury. With hard work, dedication, and community trust,
                we've installed hundreds of solar systems across Luzon and
                Visayas helping our clients reduce electricity bills and
                transition toward sustainable living. Today, Sunphil Solar
                specializes in solar panel installations, hybrid inverters,
                battery storage systems, and custom solar solutions for
                residential and commercial.
              </p>

              <h3 className="text-2xl font-semibold text-secondary-900 mb-6">
                Our Vision
              </h3>
              <p className="text-secondary-600 mb-6">
                To be the leading force in making solar energy a standard in
                every Filipino home and business—empowering communities to
                achieve energy freedom, sustainability, and resilience through
                innovation, integrity, and care.
              </p>

              <h3 className="text-2xl font-semibold text-secondary-900 mb-6">
                Our Mission
              </h3>
              <p className="text-secondary-600 mb-6">
                To deliver high-quality, affordable, and reliable solar energy
                solutions that empower our customers to take control of their
                energy needs — reducing costs while protecting the environment
                for generations to come.
              </p>

              <h3 className="text-2xl font-semibold text-secondary-900 mb-6">
                Why Choose Us?
              </h3>
              <ul className="space-y-5 text-secondary-600">
                <li className="flex items-start gap-3">
                  <MdCheckCircle className="text-green-500 mt-1" size={24} />
                  <div>
                    <span className="font-bold text-secondary-900">
                      Local Expertise with a National Reach
                    </span>
                    <br />
                    We understand the Filipino climate, energy consumption
                    habits, and building structures—allowing us to offer
                    tailored solar solutions that work for you.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MdCheckCircle className="text-green-500 mt-1" size={24} />
                  <div>
                    <span className="font-bold text-secondary-900">
                      High-Quality Products
                    </span>
                    <br />
                    We use only top-tier solar panels, inverters, and batteries
                    backed by trusted international brands and solid
                    manufacturer warranties.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MdCheckCircle className="text-green-500 mt-1" size={24} />
                  <div>
                    <span className="font-bold text-secondary-900">
                      Professional, Certified Installation Team
                    </span>
                    <br />
                    Our team is composed of trained and accredited installers
                    committed to safe, efficient, and standards-compliant system
                    design.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MdCheckCircle className="text-green-500 mt-1" size={24} />
                  <div>
                    <span className="font-bold text-secondary-900">
                      Transparent Pricing, No Hidden Costs
                    </span>
                    <br />
                    We provide detailed system proposals and clear pricing,
                    helping clients make informed decisions without pressure.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MdCheckCircle className="text-green-500 mt-1" size={24} />
                  <div>
                    <span className="font-bold text-secondary-900">
                      Exceptional After-Sales Support
                    </span>
                    <br />
                    From monitoring to maintenance, our team is always one call
                    away. We treat your solar system as our long-term
                    commitment.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MdCheckCircle className="text-green-500 mt-1" size={24} />
                  <div>
                    <span className="font-bold text-secondary-900">
                      Customized Solutions
                    </span>
                    <br />
                    No two homes or businesses are the same. We assess your
                    power needs and recommend the best system for maximum
                    savings and performance.
                  </div>
                </li>
              </ul>

              {/* Certificates and Registration Section */}
              <div className="mt-10">
                <h3 className="text-2xl font-semibold text-secondary-900 mb-6">
                  Certificates and Registration
                </h3>
                <p className="text-secondary-600 mb-6">
                  Sunphil Solar operates with full compliance and proper
                  registration under Philippine law. We maintain all necessary
                  permits and certifications to ensure our operations meet the
                  highest standards of safety, quality, and legal compliance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-200">
                    <div className="flex items-center gap-3 mb-3">
                      <MdCheckCircle className="text-green-500" size={24} />
                      <h4 className="text-lg font-semibold text-secondary-900">
                        Department of Trade and Industry (DTI)
                      </h4>
                    </div>
                    <p className="text-secondary-600 text-sm">
                      Registered business entity with DTI, ensuring compliance
                      with Philippine business regulations and consumer
                      protection standards.
                    </p>
                  </div>
                  <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-200">
                    <div className="flex items-center gap-3 mb-3">
                      <MdCheckCircle className="text-green-500" size={24} />
                      <h4 className="text-lg font-semibold text-secondary-900">
                        Bureau of Internal Revenue (BIR)
                      </h4>
                    </div>
                    <p className="text-secondary-600 text-sm">
                      Fully compliant with tax regulations, properly registered
                      and authorized to issue official receipts and invoices.
                    </p>
                  </div>
                  <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-200">
                    <div className="flex items-center gap-3 mb-3">
                      <MdCheckCircle className="text-green-500" size={24} />
                      <h4 className="text-lg font-semibold text-secondary-900">
                        Mayor's Permit
                      </h4>
                    </div>
                    <p className="text-secondary-600 text-sm">
                      Licensed to operate within the city with proper business
                      permits and local government compliance.
                    </p>
                  </div>
                  <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-200">
                    <div className="flex items-center gap-3 mb-3">
                      <MdCheckCircle className="text-green-500" size={24} />
                      <h4 className="text-lg font-semibold text-secondary-900">
                        Barangay Permit
                      </h4>
                    </div>
                    <p className="text-secondary-600 text-sm">
                      Registered at the barangay level, ensuring community
                      compliance and local business authorization.
                    </p>
                  </div>
                  <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-200 md:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <MdCheckCircle className="text-green-500" size={24} />
                      <h4 className="text-lg font-semibold text-secondary-900">
                        Bureau of Fire Protection (BFP) Fire and Safety
                      </h4>
                    </div>
                    <p className="text-secondary-600 text-sm">
                      Certified for fire safety compliance, ensuring our
                      installations and business operations meet all fire safety
                      standards and regulations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Our Promise Section */}
              <div className="mt-10">
                <h3 className="text-xl font-bold mb-2 text-secondary-900">
                  Our Promise
                </h3>
                <p className="text-secondary-700 mb-6">
                  At Sunphil Solar, we're not just installing solar panels—we're{" "}
                  <span className="font-bold">powering a movement</span>. A
                  movement for cleaner air, lower electricity bills, and
                  empowered Filipino households. Whether you're a homeowner
                  looking to reduce your Meralco bill or a business owner
                  seeking energy resilience, we're here to guide you every step
                  of the way.
                </p>
                <hr className="my-6" />
                <div className="flex items-start gap-3 mt-6">
                  <span className="text-2xl mt-1 text-yellow-500">
                    <MdCheckCircle />
                  </span>
                  <div>
                    <span className="text-lg font-bold text-secondary-900">
                      Ready to Go Solar?
                    </span>
                    <p className="mt-1">
                      <span className="font-bold">
                        <Link
                          to="/contact"
                          className="text-primary-600 hover:underline"
                        >
                          Get in touch with us
                        </Link>
                      </span>{" "}
                      for a free consultation and discover how solar energy can
                      work for you.
                    </p>
                  </div>
                </div>
              </div>
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
      </div>
    </div>
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
