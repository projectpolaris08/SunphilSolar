import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 to-secondary-800/60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white max-w-2xl">
            <div className="mb-6">
              <h1 className="text-display font-bold leading-tight mb-6 animate-[fadeIn_1s_ease-in]">
                The Power of Renewable Energy!
              </h1>
              <div className="h-1 w-20 bg-primary-500 rounded mb-6"></div>
              <p className="text-subtitle text-secondary-100 mb-8">
                Explore the endless possibilities of renewable energy with Sunphil Solar. Our innovative solutions harness the power of nature to provide sustainable, reliable, and eco-friendly energy. Join us in making a difference for a greener future.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-full text-base font-medium bg-primary-600 text-white hover:bg-primary-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Calculate Your Needs
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/30 rounded-full text-base font-medium text-white hover:bg-white/10 transition duration-300 ease-in-out"
              >
                Learn More <ArrowRight size={18} className="ml-2" />
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-elevation-3 border border-white/20">
              <h3 className="text-white text-xl font-semibold mb-4">
                Why Choose Solar Energy?
              </h3>
              <ul className="space-y-3">
                {[
                  'Reduce your electricity bills by up to 70%',
                  'Environmentally friendly renewable energy source',
                  'Increase your property value',
                  'Energy independence and security',
                  'Low maintenance costs and long lifespan',
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
                  25 Year Panel Warranty
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};