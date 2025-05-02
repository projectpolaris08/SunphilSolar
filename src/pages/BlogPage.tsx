import { useState, useRef, useEffect } from "react";

export const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const postRef = useRef<HTMLDivElement>(null);

  const handlePostClick = (postId: number) => {
    setSelectedPost(postId);
  };

  useEffect(() => {
    if (selectedPost !== null && postRef.current) {
      postRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedPost]);

  const blogPosts = [
    {
      id: 1,
      title: "Why Solar Energy is the Future",
      author: "Admin Jayar",
      excerpt:
        "In today's world, energy consumption is higher than ever. As we face environmental challenges, Solar Energy offers a clean, renewable solution that benefits both the planet and your wallet.",
      fullContent: (
        <>
          <p className="text-secondary-700 mb-6">
            In today's world, energy consumption is higher than ever. As we face environmental challenges, Solar Energy offers a clean, renewable solution that benefits both the planet and your wallet. Investing in solar panels is not just a trend — it's a smart move for a brighter future.
          </p>
          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
            The Key Benefits of Solar Power
          </h3>
          <ul className="list-disc list-inside text-secondary-700 mb-6 space-y-2">
            <li><strong>Cost Savings:</strong> Reduce electricity bills significantly over time.</li>
            <li><strong>Clean Energy:</strong> Solar reduces greenhouse gas emissions and your carbon footprint.</li>
            <li><strong>Energy Independence:</strong> Generate your own power and rely less on traditional utilities.</li>
          </ul>
          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">Conclusion</h3>
          <p className="text-secondary-700">
            Transitioning to solar energy is more affordable and easier than ever. If you're ready to make a positive change, there's no better time to go solar!
          </p>
        </>
      ),
    },
    {
      id: 2,
      title: "How Solar Panels Work: A Beginner's Guide",
      author: "Admin Jayar",
      excerpt:
        "Have you ever wondered how solar panels turn sunlight into usable electricity? It's a fascinating process that harnesses the power of nature and transforms it into energy we can use every day.",
      fullContent: (
        <>
          <p className="text-secondary-700 mb-6">
            Have you ever wondered how solar panels turn sunlight into usable electricity? It's a fascinating process that harnesses the power of nature and transforms it into energy we can use every day.
          </p>
          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
            The Science Behind Solar Power
          </h3>
          <p className="text-secondary-700 mb-6">
            Solar panels are made up of photovoltaic (PV) cells. When sunlight hits these cells, it creates an electric field. This direct current (DC) electricity is then converted into alternating current (AC) electricity through an inverter — the type of power your home uses.
          </p>
          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
            What Happens to Extra Energy?
          </h3>
          <p className="text-secondary-700">
            If your system produces more energy than you need, the surplus can be stored in batteries or fed back into the electrical grid — often earning you credits on your bill through a process called net metering.
          </p>
        </>
      ),
    },
    {
      id: 3,
      title: "Top 5 Reasons to Install Solar Panels on Your Home",
      author: "Admin Jayar",
      excerpt:
        "Thinking about making the switch to solar energy? Here are five compelling reasons why installing solar panels is one of the best decisions you can make for your home and future.",
      fullContent: (
        <>
          <p className="text-secondary-700 mb-6">
            Thinking about making the switch to solar energy? Here are five compelling reasons why installing solar panels is one of the best decisions you can make for your home and future.
          </p>
          <ol className="list-decimal list-inside text-secondary-700 mb-6 space-y-2">
            <li><strong>Lower Energy Bills:</strong> Solar panels can drastically reduce monthly utility costs.</li>
            <li><strong>Increase Home Value:</strong> Homes equipped with solar energy systems often sell faster and at higher prices.</li>
            <li><strong>Eco-Friendly Living:</strong> Reduce your dependence on fossil fuels and shrink your carbon footprint.</li>
            <li><strong>Energy Security:</strong> Protect yourself from rising electricity rates and blackouts.</li>
            <li><strong>Incentives and Tax Credits:</strong> Take advantage of government programs that make going solar even more affordable.</li>
          </ol>
          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">Final Thoughts</h3>
          <p className="text-secondary-700">
            Solar energy isn't just good for the environment — it's a smart investment in your financial future. Ready to get started? Contact us today to explore your solar options!
          </p>
        </>
      ),
    },
    {
      id: 4,
      title: "How Solar Energy is Powering EVs in the Philippines",
      author: "Admin Jayar",
      excerpt:
        "With electric vehicles (EVs) becoming increasingly popular in the Philippines, many are now exploring how solar energy can power their eco-friendly rides.",
      fullContent: (
        <>
          <p className="text-secondary-700 mb-6">
            With electric vehicles (EVs) becoming increasingly popular in the Philippines, many are now exploring how solar energy can power their eco-friendly rides. Installing solar panels at home or business not only charges EVs with clean energy but also helps drivers save on electricity costs.
          </p>
          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">Solar-Powered Charging Stations</h3>
          <p className="text-secondary-700 mb-6">
            Homeowners and businesses are setting up solar-powered EV chargers, making it possible to run vehicles purely on sunlight. This setup reduces reliance on the grid and maximizes sustainability.
          </p>
          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">A Perfect Match: EV + Solar</h3>
          <p className="text-secondary-700">
            By combining EVs with solar energy, you lower your carbon footprint even further. As the Philippines moves toward cleaner transportation, solar energy will be a major player in making EV ownership more affordable and sustainable.
          </p>
        </>
      ),
    },
    {
      id: 5,
      title: "Latest Solar Technology Trends in 2025 You Need to Know",
      author: "Admin Jayar",
      excerpt:
        "The solar industry is evolving fast in 2025! New technology such as ultra-efficient solar panels, improved battery storage, and smart energy management systems are changing the way Filipinos use solar power.",
      fullContent: (
        <>
          <p className="text-secondary-700 mb-6">
            The solar industry is evolving fast in 2025! New technology such as ultra-efficient solar panels, improved battery storage, and smart energy management systems are changing the way Filipinos use solar power.
          </p>
          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">Smarter, Stronger Solar Panels</h3>
          <p className="text-secondary-700 mb-6">
            Solar panels today are more efficient than ever, with some models converting over 23% of sunlight into electricity. This means you can generate more power even with limited roof space.
          </p>
          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">Better Batteries, Better Savings</h3>
          <p className="text-secondary-700">
            Advanced solar batteries allow households to store more energy, ensuring power availability even during brownouts. It's a game-changer for energy independence in the Philippines.
          </p>
        </>
      ),
    },
    {
      id: 6,
      title: "Japan's Perovskite Solar Revolution: Matching 20 Nuclear Reactors by 2040",
      author: "Admin Jayar",
      excerpt:
        "Japan is charting a bold course toward a sustainable future with its investment in perovskite solar cell (PSC) technology.",
      fullContent: (
        <>
          <p className="text-secondary-700 mb-6">
            Japan is charting a bold course toward a sustainable future with its investment in perovskite solar cell (PSC) technology. The government aims to generate 20 gigawatts (GW) of electricity through PSCs by 2040...
          </p>
        </>
      ),
    },
    {
      id: 7,
      title: "The Best Roofs for Solar Panel Installation",
      author: "Admin Jayar",
      excerpt:
        "Wondering if your roof is suitable for solar panels? Discover the best roof types, materials, and factors to consider for an efficient solar installation.",
      fullContent: (
        <>
          <p className="text-secondary-700 mb-6">
            Switching to solar energy is a smart way to cut down on electricity bills and reduce your carbon footprint. But before you invest in solar panels, it's important to know whether your roof is suitable for installation. Not all roofs are created equal—some are better suited for solar panels than others.
          </p>
          
          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">What Makes a Roof Suitable for Solar Panels?</h3>
          <p className="text-secondary-700 mb-4">Before installing solar panels, your roof should meet certain criteria:</p>
          
          <h4 className="text-xl font-semibold text-secondary-900 mb-2">1. Roof Material</h4>
          <p className="text-secondary-700 mb-4">Some roofing materials are easier to work with than others. The most solar-friendly options include:</p>
          <ul className="list-disc list-inside text-secondary-700 mb-6 space-y-2">
            <li><strong>Asphalt Shingles</strong> – Easy to install panels on and widely available.</li>
            <li><strong>Metal Roofs</strong> – Durable and ideal for solar panel mounting.</li>
            <li><strong>Tile Roofs (Clay or Concrete)</strong> – Possible but may require special mounting hardware.</li>
            <li><strong>Flat Roofs</strong> – Need tilt mounts to angle panels correctly.</li>
          </ul>
          <p className="text-secondary-700 mb-6">Less ideal materials include wood or slate shingles which are fragile and may require extra reinforcement.</p>
          
          <h4 className="text-xl font-semibold text-secondary-900 mb-2">2. Roof Age & Condition</h4>
          <p className="text-secondary-700 mb-6">If your roof is over <strong>15-20 years old</strong>, consider replacing it before solar installation to avoid removing panels later for roof repairs.</p>
          
          <h4 className="text-xl font-semibold text-secondary-900 mb-2">3. Roof Angle & Orientation</h4>
          <ul className="list-disc list-inside text-secondary-700 mb-6 space-y-2">
            <li><strong>South-facing roofs</strong> (in the Northern Hemisphere) get the most sunlight.</li>
            <li><strong>30-45-degree angles</strong> are optimal for energy production.</li>
          </ul>
          
          <h4 className="text-xl font-semibold text-secondary-900 mb-2">4. Shading & Obstructions</h4>
          <p className="text-secondary-700 mb-6">Avoid heavy shading from trees, chimneys, or nearby buildings, as it reduces solar efficiency.</p>
          
          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">Best Roof Types for Solar Panel Installation</h3>
          
          <h4 className="text-xl font-semibold text-secondary-900 mb-2">1. Asphalt Shingle Roofs</h4>
          <p className="text-secondary-700 mb-2"><strong>Pros:</strong></p>
          <ul className="list-disc list-inside text-secondary-700 mb-4 space-y-2">
            <li>Most common and cost-effective</li>
            <li>Easy to install solar panels with standard mounting systems</li>
          </ul>
          <p className="text-secondary-700 mb-6"><strong>Cons:</strong> Lifespan (20-30 years) may require replacement before panels.</p>
          
          <h4 className="text-xl font-semibold text-secondary-900 mb-2">2. Metal Roofs</h4>
          <p className="text-secondary-700 mb-2"><strong>Pros:</strong></p>
          <ul className="list-disc list-inside text-secondary-700 mb-4 space-y-2">
            <li>Long-lasting (40-70 years)</li>
            <li>Great for solar panel installation with clamp-based mounts</li>
          </ul>
          <p className="text-secondary-700 mb-6"><strong>Cons:</strong> Higher upfront cost than asphalt.</p>
          
          <h4 className="text-xl font-semibold text-secondary-900 mb-2">3. Tile Roofs (Clay or Concrete)</h4>
          <p className="text-secondary-700 mb-2"><strong>Pros:</strong></p>
          <ul className="list-disc list-inside text-secondary-700 mb-4 space-y-2">
            <li>Aesthetic appeal and durability</li>
          </ul>
          <p className="text-secondary-700 mb-6"><strong>Cons:</strong> Requires specialized mounting, increasing installation costs.</p>
          
          <h4 className="text-xl font-semibold text-secondary-900 mb-2">4. Flat Roofs</h4>
          <p className="text-secondary-700 mb-2"><strong>Pros:</strong></p>
          <ul className="list-disc list-inside text-secondary-700 mb-4 space-y-2">
            <li>Flexible panel placement with tilt mounts</li>
          </ul>
          <p className="text-secondary-700 mb-6"><strong>Cons:</strong> Needs ballasted or angled racks for optimal sun exposure.</p>
          
          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">How to Check If Your Roof Is Solar-Ready</h3>
          <ol className="list-decimal list-inside text-secondary-700 mb-6 space-y-2">
            <li><strong>Assess Roof Condition</strong> – Look for damage, leaks, or aging.</li>
            <li><strong>Check Sun Exposure</strong> – Use tools like Google's <strong>Project Sunroof</strong> to analyze sunlight.</li>
            <li><strong>Consult a Solar Installer</strong> – Professionals can evaluate structural integrity.</li>
          </ol>
          
          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">Final Tips for Homeowners</h3>
          <ul className="list-disc list-inside text-secondary-700 mb-6 space-y-2">
            <li><strong>Inspect your roof first</strong> – Ensure it's in good shape before installation.</li>
            <li><strong>Consider roof warranty</strong> – Some manufacturers may void warranties if solar panels are installed.</li>
            <li><strong>Opt for energy-efficient roofing</strong> – Cool roofs or reflective materials can improve solar efficiency.</li>
          </ul>
          
          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">Conclusion</h3>
          <p className="text-secondary-700 mb-6">
            Choosing the right <strong>roof for solar panel installation</strong> can maximize energy savings and system longevity. Whether you have an asphalt, metal, or tile roof, understanding compatibility will help you make an informed decision.
          </p>
          <p className="text-secondary-700">
            Ready to go solar? <a href="https://sunphilsolar.com/#contact" className="text-blue-500 hover:underline">Contact us today for a free consultation!</a>
          </p>
        </>
      ),
    },
  ];

  if (selectedPost !== null) {
    const post = blogPosts.find((post) => post.id === selectedPost);
    if (!post) return <div>Post not found</div>;

    return (
      <section 
        ref={postRef}
        className="py-20 bg-gradient-to-b from-secondary-900 to-secondary-800"
      >
        <div className="container mx-auto px-4">
          <button
            onClick={() => setSelectedPost(null)}
            className="text-white mb-8 flex items-center hover:underline"
          >
            <span className="mr-2">←</span> Back to all posts
          </button>
          <article className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">{post.title}</h2>
            <p className="text-secondary-500 text-sm mb-4">Author: {post.author}</p>
            {post.fullContent}
          </article>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-secondary-900 to-secondary-800">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-12">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:shadow-xl hover:-translate-y-1"
              onClick={() => handlePostClick(post.id)}
            >
              <div className="p-6">
                <div className="text-blue-500 mb-4">
                  {post.id === 1 && <SunIcon />}
                  {post.id === 2 && <LightbulbIcon />}
                  {post.id === 3 && <ListIcon />}
                  {post.id === 4 && <CarIcon />}
                  {post.id === 5 && <TrendingUpIcon />}
                  {post.id === 6 && <LabIcon />}
                  {post.id === 7 && <HomeIcon />}
                </div>
                <h2 className="text-xl font-bold text-secondary-900 mb-2">{post.title}</h2>
                <p className="text-secondary-700 text-sm mb-4">{post.excerpt}</p>
                <p className="text-blue-500 font-medium">Read more →</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Icon Components
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const CarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const LabIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

export default BlogPage;