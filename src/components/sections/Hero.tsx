import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Sun, Zap, DollarSign } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { WeatherWidget } from "../weather";
import { useSound } from "react-sounds";

export const Hero: React.FC = () => {
  const [monthlyBill, setMonthlyBill] = useState("");
  const [estimatedSavings, setEstimatedSavings] = useState<number | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { play: playSubmit } = useSound("ui/submit", { volume: 0.5 });
  const { play: playButton } = useSound("ui/button_hard", { volume: 0.4 });
  const navigate = useNavigate();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      video.play().catch(console.error);
    };

    const handleEnded = () => {
      // Ensure smooth loop transition
      if (video.currentTime >= video.duration) {
        video.currentTime = 0;
        video.play().catch(console.error);
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", handleEnded);

    // Start loading the video
    video.load();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const calculateSavings = () => {
    if (!monthlyBill) return;
    const bill = parseFloat(monthlyBill);
    // Assuming average savings of 80% on solar
    const savings = bill * 0.8;
    setEstimatedSavings(savings);
    playSubmit();
  };

  const handleCalculatorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playButton();
    setTimeout(() => {
      navigate("/calculator");
    }, 120);
  };

  return (
    <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          onError={(e) => console.error("Video error:", e)}
        >
          <source src="/videos/earth-space.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/60 to-secondary-800/30"></div>
      </div>

      {/* Loading state */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 z-0 bg-secondary-900"></div>
      )}

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 md:pt-20 pb-16 md:pb-24 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-[fadeIn_1s_ease-in]">
              Solar Energy Made Simple and Affordable!
            </h1>

            <div className="h-1 w-20 bg-primary-500 rounded mb-6"></div>

            <p className="text-lg md:text-xl text-white-100 mb-8">
              Explore the endless possibilities of solar energy with Sunphil
              Solar. Our innovative solutions harness the power of Sun to
              provide sustainable, reliable, and eco-friendly energy. Join us in
              making a difference for a greener future.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-400">80%</div>
                <div className="text-sm text-white/100">Energy Savings</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-400">25+</div>
                <div className="text-sm text-white/100">Years Lifespan</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-400">100%</div>
                <div className="text-sm text-white/100">Clean Energy</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 px-2">
              <div className="animated-gradient-border rounded-full w-full sm:w-auto inline-block">
                <RouterLink
                  to="/calculator"
                  onClick={handleCalculatorClick}
                  className="relative z-10 inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 border border-transparent rounded-full text-base font-medium bg-primary-600 text-white hover:bg-primary-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Solar Energy Calculator
                </RouterLink>
              </div>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/30 rounded-full text-base font-medium text-white hover:bg-white/10 transition duration-300 ease-in-out"
              >
                Learn More <ArrowRight size={18} className="ml-2" />
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-elevation-3 border border-white/20">
              <h3 className="text-white text-xl font-semibold mb-4">
                Why Choose Solar Energy?
              </h3>
              <ul className="space-y-3">
                {[
                  "Reduce your electricity bills by up to 80%",
                  "Environmentally friendly renewable energy source",
                  "Increase your property value",
                  "Energy independence and security",
                  "Low maintenance costs and long lifespan",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-white/100">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-1 bg-primary-500/20 rounded-full text-white text-sm">
                  Power Up Your Future—Today!
                </span>
              </div>
            </div>

            {/* Quick Savings Calculator */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-elevation-3 border border-white/20">
              <h3 className="text-white text-xl font-semibold mb-4 text-center">
                Quick Savings Estimate
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="monthlyBill"
                    className="block text-white/100 mb-2"
                  >
                    Your Monthly Electric Bill
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
                      ₱
                    </span>
                    <input
                      type="number"
                      id="monthlyBill"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-8 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <button
                  onClick={calculateSavings}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                >
                  Calculate Savings
                </button>
                {estimatedSavings !== null && (
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-white/90 mb-2">
                      Estimated Monthly Savings
                    </div>
                    <div className="text-3xl font-bold text-primary-400">
                      ₱
                      {estimatedSavings.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-white/70 text-sm mt-2">
                      {`That's ₱${(estimatedSavings * 12).toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )} per year!`}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-center gap-4 text-white/100 text-sm">
                  <div className="flex items-center">
                    <Sun className="w-4 h-4 mr-1" />
                    Clean Energy
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 mr-1" />
                    Reliable Power
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Big Savings
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="hidden lg:block absolute top-2 right-12 z-30">
        <div className="text-white">
          <WeatherWidget />
        </div>
      </div>
    </section>
  );
};
