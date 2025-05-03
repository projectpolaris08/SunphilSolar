import { ReactNode } from "react";

export type BlogPost = {
  id: number;
  title: string;
  author: string;
  date: string; // Changed to ISO format (YYYY-MM-DD)
  slug: string;
  tags: string[];
  excerpt: string;
  metaDescription: string;
  featuredImage?: {
    url: string;
    alt: string;
    width?: number; // Added for performance
    height?: number; // Added for performance
  };
  fullContent: ReactNode;
  readingTime?: number; // Added for UX
  isFeatured?: boolean; // Added for featured posts
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Why Solar Energy is the Future",
    author: "Admin Jayar",
    date: "2025-04-26", // Updated to ISO format
    slug: "why-solar-energy-is-the-future",
    tags: ["solar energy", "renewable", "sustainability"],
    excerpt:
      "In today's world, energy consumption is higher than ever. As we face environmental challenges, Solar Energy offers a clean, renewable solution that benefits both the planet and your wallet.",
    metaDescription:
      "Discover why solar energy is becoming the preferred renewable energy solution for homes and businesses. Learn about cost savings and environmental benefits.",
    featuredImage: {
      url: "/images/solar-panels.jpg",
      alt: "Solar panels on a residential rooftop with blue sky background",
      width: 1200,
      height: 630,
    },
    fullContent: (
      <>
        <p className="text-secondary-700 mb-6">
          In today's world, energy consumption is higher than ever. As we face
          environmental challenges, Solar Energy offers a clean, renewable
          solution that benefits both the planet and your wallet.
        </p>
        <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
          The Key Benefits of Solar Power
        </h3>
        <ul className="list-disc list-inside text-secondary-700 mb-6 space-y-2">
          <li>
            <strong>Cost Savings:</strong> Reduce electricity bills
            significantly over time.
          </li>
          <li>
            <strong>Clean Energy:</strong> Solar reduces greenhouse gas
            emissions and your carbon footprint.
          </li>
          <li>
            <strong>Energy Independence:</strong> Generate your own power and
            rely less on traditional utilities.
          </li>
        </ul>
        <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
          Conclusion
        </h3>
        <p className="text-secondary-700">
          Transitioning to solar energy is more affordable and easier than ever.
          If you're ready to make a positive change, there's no better time to
          go solar!
        </p>
      </>
    ),
    readingTime: 4,
  },
  {
    id: 2,
    title: "How Solar Panels Work: A Beginner's Guide",
    author: "Admin Jayar",
    date: "2025-04-27", // Updated to ISO format
    slug: "how-solar-panels-work",
    tags: ["solar panels", "technology", "education"],
    excerpt:
      "Have you ever wondered how solar panels turn sunlight into usable electricity? It's a fascinating process that harnesses the power of nature and transforms it into energy we can use every day.",
    metaDescription:
      "Learn how solar panels convert sunlight into electricity with this beginner-friendly guide to photovoltaic technology and solar energy systems.",
    featuredImage: {
      url: "/images/solar-tech.jpg",
      alt: "Close-up of solar panel cells showing photovoltaic technology",
      width: 1200,
      height: 630,
    },
    fullContent: (
      <>
        <p className="text-secondary-700 mb-6">
          Have you ever wondered how solar panels turn sunlight into usable
          electricity? It's a fascinating process that harnesses the power of
          nature and transforms it into energy we can use every day.
        </p>
        <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
          The Science Behind Solar Power
        </h3>
        <p className="text-secondary-700 mb-6">
          Solar panels are made up of photovoltaic (PV) cells. When sunlight
          hits these cells, it creates an electric field. This direct current
          (DC) electricity is then converted into alternating current (AC)
          electricity through an inverter — the type of power your home uses.
        </p>
        <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
          What Happens to Extra Energy?
        </h3>
        <p className="text-secondary-700">
          If your system produces more energy than you need, the surplus can be
          stored in batteries or fed back into the electrical grid — often
          earning you credits on your bill through a process called net
          metering.
        </p>
      </>
    ),
    readingTime: 5,
  },
  {
    id: 3,
    title: "Top 5 Reasons to Install Solar Panels on Your Home",
    author: "Admin Jayar",
    date: "2025-04-25", // Updated to ISO format
    slug: "top-5-reasons-to-install-solar-panels",
    tags: ["home solar", "investment", "benefits"],
    excerpt:
      "Thinking about making the switch to solar energy? Here are five compelling reasons why installing solar panels is one of the best decisions you can make for your home and future.",
    metaDescription:
      "Discover the top 5 benefits of residential solar panel installation including cost savings, increased home value, and environmental impact.",
    featuredImage: {
      url: "/images/home-solar.jpg",
      alt: "Modern home with solar panels on the roof",
      width: 1200,
      height: 630,
    },
    fullContent: (
      <>
        <p className="text-secondary-700 mb-6">
          Thinking about making the switch to solar energy? Here are five
          compelling reasons why installing solar panels is one of the best
          decisions you can make for your home and future.
        </p>
        <ol className="list-decimal list-inside text-secondary-700 mb-6 space-y-2">
          <li>
            <strong>Lower Energy Bills:</strong> Solar panels can drastically
            reduce monthly utility costs.
          </li>
          <li>
            <strong>Increase Home Value:</strong> Homes equipped with solar
            energy systems often sell faster and at higher prices.
          </li>
          <li>
            <strong>Eco-Friendly Living:</strong> Reduce your dependence on
            fossil fuels and shrink your carbon footprint.
          </li>
          <li>
            <strong>Energy Security:</strong> Protect yourself from rising
            electricity rates and blackouts.
          </li>
          <li>
            <strong>Incentives and Tax Credits:</strong> Take advantage of
            government programs that make going solar even more affordable.
          </li>
        </ol>
        <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
          Final Thoughts
        </h3>
        <p className="text-secondary-700">
          Solar energy isn't just good for the environment — it's a smart
          investment in your financial future. Ready to get started? Contact us
          today to explore your solar options!
        </p>
      </>
    ),
    readingTime: 6,
    isFeatured: true,
  },
  {
    id: 4,
    title: "How Solar Energy is Powering EVs in the Philippines",
    author: "Admin Jayar",
    date: "2025-04-20", // Updated to ISO format
    slug: "solar-energy-powering-evs-philippines",
    tags: ["electric vehicles", "Philippines", "sustainable transportation"],
    excerpt:
      "With electric vehicles (EVs) becoming increasingly popular in the Philippines, many are now exploring how solar energy can power their eco-friendly rides.",
    metaDescription:
      "Learn how solar energy is revolutionizing electric vehicle charging in the Philippines, creating sustainable transportation solutions.",
    featuredImage: {
      url: "/images/ev-charging.jpg",
      alt: "Electric vehicle charging at a solar-powered station",
      width: 1200,
      height: 630,
    },
    fullContent: (
      <>
        <p className="text-secondary-700 mb-6">
          With electric vehicles (EVs) becoming increasingly popular in the
          Philippines, many are now exploring how solar energy can power their
          eco-friendly rides. Installing solar panels at home or business not
          only charges EVs with clean energy but also helps drivers save on
          electricity costs.
        </p>
        <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
          Solar-Powered Charging Stations
        </h3>
        <p className="text-secondary-700 mb-6">
          Homeowners and businesses are setting up solar-powered EV chargers,
          making it possible to run vehicles purely on sunlight. This setup
          reduces reliance on the grid and maximizes sustainability.
        </p>
        <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
          A Perfect Match: EV + Solar
        </h3>
        <p className="text-secondary-700">
          By combining EVs with solar energy, you lower your carbon footprint
          even further. As the Philippines moves toward cleaner transportation,
          solar energy will be a major player in making EV ownership more
          affordable and sustainable.
        </p>
      </>
    ),
    readingTime: 5,
  },
  {
    id: 5,
    title: "Latest Solar Technology Trends in 2025 You Need to Know",
    author: "Admin Jayar",
    date: "2025-04-28", // Updated to ISO format
    slug: "latest-solar-technology-trends-2025",
    tags: ["technology", "trends", "innovation"],
    excerpt:
      "The solar industry is evolving fast in 2025! New technology such as ultra-efficient solar panels, improved battery storage, and smart energy management systems are changing the way Filipinos use solar power.",
    metaDescription:
      "Stay updated with the latest solar technology trends in 2025 including high-efficiency panels, advanced battery storage, and smart energy solutions.",
    featuredImage: {
      url: "/images/solar-tech-trends.jpg",
      alt: "High-tech solar panels with futuristic design",
      width: 1200,
      height: 630,
    },
    fullContent: (
      <>
        <p className="text-secondary-700 mb-6">
          The solar industry is evolving fast in 2025! New technology such as
          ultra-efficient solar panels, improved battery storage, and smart
          energy management systems are changing the way Filipinos use solar
          power.
        </p>
        <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
          Smarter, Stronger Solar Panels
        </h3>
        <p className="text-secondary-700 mb-6">
          Solar panels today are more efficient than ever, with some models
          converting over 23% of sunlight into electricity. This means you can
          generate more power even with limited roof space.
        </p>
        <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
          Better Batteries, Better Savings
        </h3>
        <p className="text-secondary-700">
          Advanced solar batteries allow households to store more energy,
          ensuring power availability even during brownouts. It's a game-changer
          for energy independence in the Philippines.
        </p>
      </>
    ),
    readingTime: 4,
  },
  {
    id: 6,
    title:
      "Japan's Perovskite Solar Revolution: Matching 20 Nuclear Reactors by 2040",
    author: "Admin Jayar",
    date: "2025-04-30", // ISO format
    slug: "japan-perovskite-solar-revolution-2040",
    tags: [
      "Japan",
      "perovskite",
      "renewable energy",
      "solar technology",
      "clean energy",
    ],
    excerpt:
      "Japan is leading a clean energy revolution with perovskite solar cells (PSCs), aiming to produce 20 GW—equivalent to 20 nuclear reactors—by 2040. Learn how this breakthrough could transform renewable energy.",
    metaDescription:
      "Discover Japan's ambitious plan to generate 20 GW of electricity using perovskite solar cells by 2040—equivalent to 20 nuclear reactors. Explore the technology, challenges, and future impact.",
    featuredImage: {
      url: "/images/perovskite.jpg",
      alt: "Scientists testing perovskite solar cells in a Japanese laboratory",
      width: 1200,
      height: 630,
    },
    fullContent: (
      <>
        <h2 className="text-2xl font-bold mb-4">
          Japan's Ambitious Perovskite Solar Vision
        </h2>
        <p className="text-secondary-700 mb-6">
          Japan is accelerating its transition to renewable energy with a
          groundbreaking commitment to perovskite solar cell (PSC) technology.
          According to a{" "}
          <a
            href="https://www.nedo.go.jp/english/news/AA5en_100001.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            NEDO report
          </a>
          , the government plans to deploy PSCs capable of generating{" "}
          <strong>20 gigawatts (GW) by 2040</strong>—equivalent to the output of
          20 nuclear reactors.
        </p>

        <h3 className="text-xl font-semibold mb-3">
          Why Perovskite Solar Cells?
        </h3>
        <p className="mb-4">
          Perovskite solar cells are cheaper and more efficient than traditional
          silicon-based panels. Recent breakthroughs by institutions like{" "}
          <a
            href="https://www.riken.jp/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            RIKEN
          </a>{" "}
          have pushed their efficiency to over{" "}
          <strong>25% in lab conditions</strong>, rivaling silicon while using
          low-cost materials.
        </p>

        <h3 className="text-xl font-semibold mb-3">Challenges Ahead</h3>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">
            <strong>Durability:</strong> PSCs degrade faster than silicon under
            humidity and heat.
          </li>
          <li className="mb-2">
            <strong>Scaling Up:</strong> Mass production remains untested at
            this scale.
          </li>
          <li>
            <strong>Policy Support:</strong> Japan’s{" "}
            <a
              href="https://www.meti.go.jp/english/policy/energy_environment/global_warming/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Green Growth Strategy
            </a>{" "}
            includes subsidies to accelerate commercialization.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Global Implications</h3>
        <p>
          If successful, Japan’s initiative could reduce global reliance on
          fossil fuels and position the country as a leader in next-gen solar
          tech. Analysts from{" "}
          <a
            href="https://www.iea.org/reports/solar-energy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            IEA
          </a>{" "}
          suggest PSCs could cut solar energy costs by 30% by 2035.
        </p>
      </>
    ),
    readingTime: 4,
  },
  {
    id: 7,
    title: "The Best Roofs for Solar Panel Installation",
    author: "Admin Jayar",
    date: "2025-05-02", // Updated to ISO format
    slug: "best-roofs-for-solar-panel-installation",
    tags: ["installation", "roofing", "home improvement"],
    excerpt:
      "Wondering if your roof is suitable for solar panels? Discover the best roof types, materials, and factors to consider for an efficient solar installation.",
    metaDescription:
      "Find out which roof types are best for solar panel installation and learn what factors make a roof suitable for solar energy systems.",
    featuredImage: {
      url: "/images/roof-types.jpg",
      alt: "Different roof types with solar panel installations",
      width: 1200,
      height: 630,
    },
    fullContent: (
      <>
        <p className="text-secondary-700 mb-6">
          Switching to solar energy is a smart way to cut down on electricity
          bills and reduce your carbon footprint. But before you invest in solar
          panels, it's important to know whether your roof is suitable for
          installation. Not all roofs are created equal—some are better suited
          for solar panels than others.
        </p>

        <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
          What Makes a Roof Suitable for Solar Panels?
        </h3>
        <p className="text-secondary-700 mb-4">
          Before installing solar panels, your roof should meet certain
          criteria:
        </p>

        <h4 className="text-xl font-semibold text-secondary-900 mb-2">
          1. Roof Material
        </h4>
        <p className="text-secondary-700 mb-4">
          Some roofing materials are easier to work with than others. The most
          solar-friendly options include:
        </p>
        <ul className="list-disc list-inside text-secondary-700 mb-6 space-y-2">
          <li>
            <strong>Asphalt Shingles</strong> – Easy to install panels on and
            widely available.
          </li>
          <li>
            <strong>Metal Roofs</strong> – Durable and ideal for solar panel
            mounting.
          </li>
          <li>
            <strong>Tile Roofs (Clay or Concrete)</strong> – Possible but may
            require special mounting hardware.
          </li>
          <li>
            <strong>Flat Roofs</strong> – Need tilt mounts to angle panels
            correctly.
          </li>
        </ul>
        <p className="text-secondary-700 mb-6">
          Less ideal materials include wood or slate shingles which are fragile
          and may require extra reinforcement.
        </p>

        <h4 className="text-xl font-semibold text-secondary-900 mb-2">
          2. Roof Age & Condition
        </h4>
        <p className="text-secondary-700 mb-6">
          If your roof is over <strong>15-20 years old</strong>, consider
          replacing it before solar installation to avoid removing panels later
          for roof repairs.
        </p>

        <h4 className="text-xl font-semibold text-secondary-900 mb-2">
          3. Roof Angle & Orientation
        </h4>
        <ul className="list-disc list-inside text-secondary-700 mb-6 space-y-2">
          <li>
            <strong>South-facing roofs</strong> (in the Northern Hemisphere) get
            the most sunlight.
          </li>
          <li>
            <strong>30-45-degree angles</strong> are optimal for energy
            production.
          </li>
        </ul>

        <h4 className="text-xl font-semibold text-secondary-900 mb-2">
          4. Shading & Obstructions
        </h4>
        <p className="text-secondary-700 mb-6">
          Avoid heavy shading from trees, chimneys, or nearby buildings, as it
          reduces solar efficiency.
        </p>

        <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
          Best Roof Types for Solar Panel Installation
        </h3>

        <h4 className="text-xl font-semibold text-secondary-900 mb-2">
          1. Asphalt Shingle Roofs
        </h4>
        <p className="text-secondary-700 mb-2">
          <strong>Pros:</strong>
        </p>
        <ul className="list-disc list-inside text-secondary-700 mb-4 space-y-2">
          <li>Most common and cost-effective</li>
          <li>Easy to install solar panels with standard mounting systems</li>
        </ul>
        <p className="text-secondary-700 mb-6">
          <strong>Cons:</strong> Lifespan (20-30 years) may require replacement
          before panels.
        </p>

        <h4 className="text-xl font-semibold text-secondary-900 mb-2">
          2. Metal Roofs
        </h4>
        <p className="text-secondary-700 mb-2">
          <strong>Pros:</strong>
        </p>
        <ul className="list-disc list-inside text-secondary-700 mb-4 space-y-2">
          <li>Long-lasting (40-70 years)</li>
          <li>Great for solar panel installation with clamp-based mounts</li>
        </ul>
        <p className="text-secondary-700 mb-6">
          <strong>Cons:</strong> Higher upfront cost than asphalt.
        </p>

        <h4 className="text-xl font-semibold text-secondary-900 mb-2">
          3. Tile Roofs (Clay or Concrete)
        </h4>
        <p className="text-secondary-700 mb-2">
          <strong>Pros:</strong>
        </p>
        <ul className="list-disc list-inside text-secondary-700 mb-4 space-y-2">
          <li>Aesthetic appeal and durability</li>
        </ul>
        <p className="text-secondary-700 mb-6">
          <strong>Cons:</strong> Requires specialized mounting, increasing
          installation costs.
        </p>

        <h4 className="text-xl font-semibold text-secondary-900 mb-2">
          4. Flat Roofs
        </h4>
        <p className="text-secondary-700 mb-2">
          <strong>Pros:</strong>
        </p>
        <ul className="list-disc list-inside text-secondary-700 mb-4 space-y-2">
          <li>Flexible panel placement with tilt mounts</li>
        </ul>
        <p className="text-secondary-700 mb-6">
          <strong>Cons:</strong> Needs ballasted or angled racks for optimal sun
          exposure.
        </p>

        <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
          How to Check If Your Roof Is Solar-Ready
        </h3>
        <ol className="list-decimal list-inside text-secondary-700 mb-6 space-y-2">
          <li>
            <strong>Assess Roof Condition</strong> – Look for damage, leaks, or
            aging.
          </li>
          <li>
            <strong>Check Sun Exposure</strong> – Use tools like Google's{" "}
            <strong>Project Sunroof</strong> to analyze sunlight.
          </li>
          <li>
            <strong>Consult a Solar Installer</strong> – Professionals can
            evaluate structural integrity.
          </li>
        </ol>

        <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
          Final Tips for Homeowners
        </h3>
        <ul className="list-disc list-inside text-secondary-700 mb-6 space-y-2">
          <li>
            <strong>Inspect your roof first</strong> – Ensure it's in good shape
            before installation.
          </li>
          <li>
            <strong>Consider roof warranty</strong> – Some manufacturers may
            void warranties if solar panels are installed.
          </li>
          <li>
            <strong>Opt for energy-efficient roofing</strong> – Cool roofs or
            reflective materials can improve solar efficiency.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
          Conclusion
        </h3>
        <p className="text-secondary-700 mb-6">
          Choosing the right <strong>roof for solar panel installation</strong>{" "}
          can maximize energy savings and system longevity. Whether you have an
          asphalt, metal, or tile roof, understanding compatibility will help
          you make an informed decision.
        </p>
        <p className="text-secondary-700">
          Ready to go solar?{" "}
          <a
            href="https://sunphilsolar.com/#contact"
            className="text-blue-500 hover:underline"
          >
            Contact us today for a free consultation!
          </a>
        </p>
      </>
    ),
    readingTime: 8,
    isFeatured: true,
  },
  {
    id: 8,
    title:
      "World’s Most Powerful Flexible Solar Cell: Japan’s 26.5% Efficiency Breakthrough Sets Global Standard",
    author: "Admin Jayar",
    date: "2025-05-03", // ISO format
    slug: "japan-flexible-solar-cell-26-percent-efficiency",
    tags: [
      "Japan",
      "solar energy",
      "renewable technology",
      "photovoltaics",
      "energy innovation",
    ],
    excerpt:
      "Japanese researchers have shattered records with a flexible perovskite solar cell achieving 26.5% efficiency—surpassing silicon in performance while being lightweight and bendable. Discover the science behind this leap.",
    metaDescription:
      "Japan unveils the world’s most efficient flexible solar cell at 26.5%, outperforming rigid silicon panels. Learn how this breakthrough could revolutionize solar energy applications.",
    featuredImage: {
      url: "/images/flexible-perovskite-solar.jpg",
      alt: "Japanese engineer holding a thin, flexible perovskite solar cell",
      width: 1200,
      height: 630,
    },
    fullContent: (
      <>
        <h2 className="text-2xl font-bold mb-4">
          A New Era for Solar Technology
        </h2>
        <p className="text-secondary-700 mb-6">
          A team from Japan’s{" "}
          <a
            href="https://www.kyoto-u.ac.jp/en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Kyoto University
          </a>{" "}
          and{" "}
          <a
            href="https://www.aist.go.jp/index_en.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            AIST
          </a>{" "}
          has developed a flexible perovskite solar cell (PSC) with a{" "}
          <strong>record-breaking 26.5% efficiency</strong>—surpassing
          conventional rigid silicon panels (typically 22–24%) and setting a new
          global benchmark for bendable solar tech.{" "}
          <a
            href="https://www.nature.com/articles/s41560-024-01596-6"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            (Source: Nature Energy, 2025)
          </a>
          .
        </p>

        <h3 className="text-xl font-semibold mb-3">Why This Matters</h3>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">
            <strong>Lightweight & Flexible:</strong> Can be integrated into
            curved surfaces, vehicles, and even clothing.
          </li>
          <li className="mb-2">
            <strong>High Efficiency:</strong> Matches silicon while using
            cheaper materials and low-temperature manufacturing.
          </li>
          <li>
            <strong>Scalability:</strong> Achieved via a novel{" "}
            <a
              href="https://pubs.acs.org/doi/10.1021/acsenergylett.4c00012"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              "layer-engineering" technique
            </a>{" "}
            that minimizes defects.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">
          Overcoming Past Limitations
        </h3>
        <p className="mb-4">
          Earlier flexible PSCs struggled with durability and efficiency losses
          under real-world conditions. The team’s innovation—published in{" "}
          <a
            href="https://www.science.org/doi/10.1126/science.adn2636"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Science
          </a>
          —uses a <strong>stabilized perovskite compound</strong> that retains
          90% performance after 1,000 hours of exposure to heat and humidity.
        </p>

        <h3 className="text-xl font-semibold mb-3">Future Applications</h3>
        <p className="mb-2">
          <strong>1. Building-Integrated PV:</strong> Transparent, bendable
          cells could turn windows into power generators.
          <br />
          <strong>2. Wearable Tech:</strong> Solar-powered jackets or backpacks
          for charging devices.
          <br />
          <strong>3. Space Missions:</strong> NASA and JAXA are testing PSCs for
          satellites due to their{" "}
          <a
            href="https://www.nasa.gov/directorates/stmd/nasa-japan-advance-perovskite-solar-cells-for-space/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            lightweight radiation resistance
          </a>
          .
        </p>

        <p className="mt-4">
          Japan’s{" "}
          <a
            href="https://www.meti.go.jp/english/policy/energy_environment/global_warming/roadmap.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Green Innovation Fund
          </a>{" "}
          is investing ¥150 billion ($1B) to commercialize the tech by 2028,
          aiming to reduce solar energy costs by 40%.
        </p>
      </>
    ),
    readingTime: 5,
    isFeatured: true,
  },
];

// Utility functions for handling large datasets
export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);

export const getFeaturedPosts = (): BlogPost[] =>
  blogPosts.filter((post) => post.isFeatured);

export const getPostsByTag = (tag: string): BlogPost[] =>
  blogPosts.filter((post) => post.tags.includes(tag));

export const getRecentPosts = (limit = 5): BlogPost[] =>
  [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

export const getPaginatedPosts = (page: number, perPage = 10) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    posts: blogPosts.slice(start, end),
    totalPages: Math.ceil(blogPosts.length / perPage),
    currentPage: page,
  };
};

export const searchPosts = (query: string): BlogPost[] => {
  const searchTerms = query.toLowerCase().split(" ");
  return blogPosts.filter((post) =>
    searchTerms.some(
      (term) =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term))
    )
  );
};
