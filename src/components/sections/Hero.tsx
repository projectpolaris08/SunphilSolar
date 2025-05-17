import React from "react";
import { ArrowRight } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { WeatherWidget } from "../weather";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 to-secondary-800/60"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 md:pt-20 pb-16 md:pb-24 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-[fadeIn_1s_ease-in]">
              The Power of Renewable Energy!
            </h1>

            <div className="h-1 w-20 bg-primary-500 rounded mb-6"></div>

            <p className="text-lg md:text-xl text-secondary-100 mb-8">
              Explore the endless possibilities of renewable energy with Sunphil
              Solar. Our innovative solutions harness the power of nature to
              provide sustainable, reliable, and eco-friendly energy. Join us in
              making a difference for a greener future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 px-2">
              <div className="animated-gradient-border rounded-full w-full sm:w-auto inline-block">
                <RouterLink
                  to="/calculator"
                  className="relative z-10 inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 border border-transparent rounded-full text-base font-medium bg-primary-600 text-white hover:bg-primary-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Calculate Your Needs
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
                  "Reduce your electricity bills by up to 70%",
                  "Environmentally friendly renewable energy source",
                  "Increase your property value",
                  "Energy independence and security",
                  "Low maintenance costs and long lifespan",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-1 bg-primary-500/20 rounded-full text-primary-300 text-sm">
                  Power Up Your Future—Today!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Widget - always top left on mobile, top right on desktop */}
      <div className="hidden lg:block absolute top-2 right-12 z-30">
        <div className="text-white">
          <WeatherWidget />
        </div>
      </div>
    </section>
  );
};
