import { useState } from 'react';
// Remove the React import since it's not needed with modern JSX transform
// Remove unused navigate import

export const BlogPage = () => {
  // Remove unused navigate declaration
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  // Blog post data
  const blogPosts = [
    {
      id: 1,
      title: "Why Solar Energy is the Future",
      author: "Admin Jayar",
      excerpt: "In today's world, energy consumption is higher than ever. As we face environmental challenges, Solar Energy offers a clean, renewable solution that benefits both the planet and your wallet.",
      fullContent: (
        <>
          <p className="text-secondary-700 mb-6">
            In today's world, energy consumption is higher than ever. As we face environmental challenges, Solar Energy offers a clean, renewable solution 
            that benefits both the planet and your wallet. Investing in solar panels is not just a trend — it's a smart move for a brighter future.
          </p>

          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">The Key Benefits of Solar Power</h3>
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
      )
    },
    {
      id: 2,
      title: "How Solar Panels Work: A Beginner's Guide",
      author: "Admin Jayar",
      excerpt: "Have you ever wondered how solar panels turn sunlight into usable electricity? It's a fascinating process that harnesses the power of nature and transforms it into energy we can use every day.",
      fullContent: (
        <>
          <p className="text-secondary-700 mb-6">
            Have you ever wondered how solar panels turn sunlight into usable electricity? It's a fascinating process that harnesses the power of nature 
            and transforms it into energy we can use every day.
          </p>

          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">The Science Behind Solar Power</h3>
          <p className="text-secondary-700 mb-6">
            Solar panels are made up of photovoltaic (PV) cells. When sunlight hits these cells, it creates an electric field. This direct current (DC) electricity 
            is then converted into alternating current (AC) electricity through an inverter — the type of power your home uses.
          </p>

          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">What Happens to Extra Energy?</h3>
          <p className="text-secondary-700">
            If your system produces more energy than you need, the surplus can be stored in batteries or fed back into the electrical grid — often earning you credits on your bill through a process called net metering.
          </p>
        </>
      )
    },
    {
      id: 3,
      title: "Top 5 Reasons to Install Solar Panels on Your Home",
      author: "Admin Jayar",
      excerpt: "Thinking about making the switch to solar energy? Here are five compelling reasons why installing solar panels is one of the best decisions you can make for your home and future.",
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
            Solar energy isn't just good for the environment — it's a smart investment in your financial future. Ready to get started? 
            Contact us today to explore your solar options!
          </p>
        </>
      )
    },
    {
      id: 4,
      title: "How Solar Energy is Powering EVs in the Philippines",
      author: "Admin Jayar",
      excerpt: "With electric vehicles (EVs) becoming increasingly popular in the Philippines, many are now exploring how solar energy can power their eco-friendly rides.",
      fullContent: (
        <>
          <p className="text-secondary-700 mb-6">
            With electric vehicles (EVs) becoming increasingly popular in the Philippines, many are now exploring how solar energy can power their eco-friendly rides. 
            Installing solar panels at home or business not only charges EVs with clean energy but also helps drivers save on electricity costs. 
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
      )
    },
    {
      id: 5,
      title: "Latest Solar Technology Trends in 2025 You Need to Know",
      author: "Admin Jayar",
      excerpt: "The solar industry is evolving fast in 2025! New technology such as ultra-efficient solar panels, improved battery storage, and smart energy management systems are changing the way Filipinos use solar power.",
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
      )
    },
    {
      id: 6,
      title: "Japan's Perovskite Solar Revolution: Matching 20 Nuclear Reactors by 2040",
      author: "Admin Jayar",
      excerpt: "Japan is charting a bold course toward a sustainable future with its investment in perovskite solar cell (PSC) technology.",
      fullContent: (
        <>
          <p className="text-secondary-700 mb-6">
            Japan is charting a bold course toward a sustainable future with its investment in perovskite solar cell (PSC) technology. The government aims to generate 20 gigawatts (GW) of electricity through PSCs by 2040, equivalent to the output of 20 nuclear reactors. This initiative is a cornerstone of Japan's strategy to achieve net-zero emissions by 2050 and to increase the share of renewable energy in its power mix to 36–38% by 2030.
          </p>

          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">What Are Perovskite Solar Cells?</h3>
          <p className="text-secondary-700 mb-6">
            Perovskite solar cells are a next-generation photovoltaic technology known for their lightweight and flexible properties. Unlike traditional silicon-based panels, PSCs can be applied to a variety of surfaces, including windows, walls, and even streetlights, turning urban environments into energy-generating landscapes.
          </p>

          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">Leveraging Domestic Resources</h3>
          <p className="text-secondary-700 mb-6">
            A significant advantage for Japan is its domestic supply of iodine, a critical component in PSC manufacturing. Japan holds approximately 30% of the global iodine production, enabling the country to build a stable and independent supply chain for this essential material.
          </p>

          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">Economic and Environmental Impact</h3>
          <p className="text-secondary-700 mb-6">
            The deployment of PSCs is expected to have a profound impact on both the environment and Japan's economy. The Japanese government has earmarked roughly $20 billion to scale up the commercialization of this technology, supporting domestic companies like Sekisui Chemical and EneCoat Technologies.
          </p>

          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">Cost and Scalability Targets</h3>
          <p className="text-secondary-700 mb-6">
            Japan plans to bring the production cost of PSCs down to ¥20 ($0.13) per watt by 2025, with further reductions to ¥14 by 2030 and ¥10 by 2040. These targets are designed to make perovskite solar cells competitive with traditional solar panels.
          </p>

          <h3 className="text-2xl font-semibold text-secondary-900 mb-2">Challenges Ahead</h3>
          <p className="text-secondary-700 mb-6">
            Despite their promise, perovskite cells face technical challenges like durability in harsh weather and long-term stability. Japan's roadmap anticipates resolving these hurdles before full-scale rollout in the 2030s.
          </p>

          <p className="text-secondary-700">
            With government backing, cutting-edge research, and the integration of PSCs into buildings and infrastructure, Japan is poised to become a global leader in next-generation solar power.
          </p>
        </>
      )
    }
  ];

  // If a blog post is selected, show the full post
  if (selectedPost !== null) {
    const post = blogPosts.find(post => post.id === selectedPost);
    
    if (!post) {
      return <div>Post not found</div>;
    }
    
    return (
      <section className="py-20 bg-gradient-to-b from-secondary-900 to-secondary-800">
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

  // Main blog listing with grid layout from first image
  return (
    <section className="py-20 bg-gradient-to-b from-secondary-900 to-secondary-800">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-12">Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <div 
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:shadow-xl hover:-translate-y-1"
              onClick={() => setSelectedPost(post.id)}
            >
              <div className="p-6">
                {/* Use appropriate icon for each post category */}
                <div className="text-blue-500 mb-4">
                  {post.id === 1 && <SunIcon />}
                  {post.id === 2 && <LightbulbIcon />}
                  {post.id === 3 && <ListIcon />}
                  {post.id === 4 && <CarIcon />}
                  {post.id === 5 && <TrendingUpIcon />}
                  {post.id === 6 && <LabIcon />}
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

// Simple icon components
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5C8.24 12.26 8.7 13.02 8.9 14" />
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const CarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
    <circle cx="6.5" cy="16.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const LabIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2v7.31" />
    <path d="M14 9.3V2" />
    <path d="M8.5 2h7" />
    <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
    <path d="M5.58 16.5h12.85" />
  </svg>
);

export default BlogPage;