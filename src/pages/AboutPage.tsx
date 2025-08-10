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

  interface TeamMemberData {
    initial: string;
    name: string;
    title: string;
    description: string;
    image: string;
    facebook?: string;
    viber?: string;
    whatsapp?: string;
  }

  const coreTeam: TeamMemberData[] = [
    {
      initial: "K",
      name: "Ma. Katrina Bascon",
      title: "Owner",
      description:
        "Ma. Katrina Bascon owns Sunphil Solar and leads its day-to-day operations based in Fairview, Quezon City. She oversees sales, operations, legal, and finance, and manages the company's customer relationship management (CRM) system to keep client interactions organized and efficient. Katrina is passionate about expanding access to clean energy and building a reliable, customer-focused solar company.",
      image: "/images/Sunphil.jpg",
      facebook: "https://www.facebook.com/princesskkaaaatteee",
    },
    {
      initial: "J",
      name: 'Jhayar "Gar" Bacolod',
      title: "Owner/Head of Operations",
      description:
        "Jhayar is the Head of Operations and Chief Technical Officer at Sunphil Solar. He oversees daily operations and drives the company's technical direction - from system design to installation. Known for his hands-on expertise and strong leadership, Jhayar works closely with teams to ensure every project is completed efficiently, safely, and on time.",
      image: "/images/Sunphil.jpg",
      facebook: "https://www.facebook.com/jhayar.bacolod.9",
      viber: "+639353658092",
      whatsapp: "+639353658092",
    },
  ];

  const admins: TeamMemberData[] = [
    {
      initial: "D",
      name: "Diane",
      title: "Admin Officer",
      description: "Providing excellent administrative support every day.",
      image: "/images/Diane.jpeg",
      facebook: "https://www.facebook.com/fairview.solarista.admn.diana",
      viber: "+639923550463",
    },
    {
      initial: "A",
      name: "Aira",
      title: "Admin Assistant",
      description: "Building strong client relationships daily.",
      image: "/images/Aira.jpeg",
      facebook: "https://www.facebook.com/barallas.aira",
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
      facebook: "https://www.facebook.com/fairview.solarista.admn.jayar",
      viber: "+639164128813",
      whatsapp: "+639164128813",
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

  const installers: TeamMemberData[] = [
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
    {
      initial: "A",
      name: "Anthony",
      title: "Installer",
      description: "Helping build solar systems safely and securely.",
      image: "/images/Anthony.jpg",
    },
    {
      initial: "JP",
      name: "John Paul",
      title: "Installer",
      description: "Helping build solar systems safely and securely.",
      image: "/images/John-Paul.jpg",
    },
  ];

  const builders: TeamMemberData[] = [
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
                Solarista, was founded in 2021 from a simple dream - to bring
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
                every Filipino home and business - empowering communities to
                achieve energy freedom, sustainability, and resilience through
                innovation, integrity, and care.
              </p>

              <h3 className="text-2xl font-semibold text-secondary-900 mb-6">
                Our Mission
              </h3>
              <p className="text-secondary-600 mb-6">
                To deliver high-quality, affordable, and reliable solar energy
                solutions that empower our customers to take control of their
                energy needs - reducing costs while protecting the environment
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
                    habits, and building structures - allowing us to offer
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
                        Barangay's Permit
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
                  At Sunphil Solar, we're not just installing solar panels -
                  we're <span className="font-bold">powering a movement</span>.
                  A movement for cleaner air, lower electricity bills, and
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
                    ? "grid-cols-1 lg:grid-cols-2 justify-center max-w-4xl mx-auto"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
                    facebook={member.facebook}
                    viber={member.viber}
                    whatsapp={member.whatsapp}
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
  facebook?: string;
  viber?: string;
  whatsapp?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  initial,
  name,
  title,
  description,
  image,
  facebook,
  viber,
  whatsapp,
}) => {
  return (
    <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Profile image container */}
      <div className="relative z-10 mb-6">
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-blue-200 transition-colors duration-500">
            {image ? (
              <img
                src={image}
                alt={name}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{initial}</span>
              </div>
            )}
          </div>
          {/* Status indicator */}
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-lg"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center flex-1 flex flex-col">
        <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {name}
        </h4>
        <p className="text-blue-600 font-semibold mb-3 text-lg">{title}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Social links */}
        <div className="flex justify-center items-center mb-4 min-h-[40px]">
          <div className="flex space-x-3">
            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            )}
            {viber && (
              <a
                href={`viber://chat?number=${viber.replace("+", "")}`}
                className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                <img src="/images/viber.png" alt="Viber" className="w-5 h-5" />
              </a>
            )}
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Contact button */}
        <button
          onClick={() => {
            if (whatsapp) {
              window.open(
                `https://wa.me/${whatsapp.replace("+", "")}`,
                "_blank"
              );
            } else if (viber) {
              window.open(
                `viber://chat?number=${viber.replace("+", "")}`,
                "_blank"
              );
            }
          }}
          className="mt-auto w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg opacity-100"
        >
          Contact {name.split(" ")[0]}
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
    </div>
  );
};

export default AboutPage;
