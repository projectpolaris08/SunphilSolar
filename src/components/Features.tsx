import React from 'react';
import { Sun, Battery, Zap, ShieldCheck, PiggyBank, Clock } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Sun className="h-10 w-10 text-primary-500" />,
      title: 'Solar Panel Installation',
      description: 'Premium quality solar panels professionally installed to maximize energy production and efficiency.'
    },
    {
      icon: <Battery className="h-10 w-10 text-primary-500" />,
      title: 'Battery Storage',
      description: "Store excess energy with cutting-edge battery solutions for use when the sun isn't shining."
    },
    {
      icon: <Zap className="h-10 w-10 text-primary-500" />,
      title: 'Inverter Solutions',
      description: 'Deye Hybrid Inverters that efficiently convert solar energy into usable electricity for your home.'
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary-500" />,
      title: 'Maintenance & Support',
      description: 'Regular system checks and maintenance to ensure optimal performance throughout the year.'
    },
    {
      icon: <PiggyBank className="h-10 w-10 text-primary-500" />,
      title: 'Financing Options',
      description: 'Flexible payment plans and financing solutions to make solar energy accessible to everyone.'
    },
    {
      icon: <Clock className="h-10 w-10 text-primary-500" />,
      title: '12-Year Warranty',
      description: 'Industry-leading warranty coverage for peace of mind and long-term investment protection.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-secondary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">Our Solar Energy Solutions</h2>
          <div className="h-1 w-20 bg-primary-500 mx-auto rounded mb-6"></div>
          <p className="text-lg text-secondary-600">
            Comprehensive solar services designed to power your home or business with clean, 
            renewable energy while reducing your electricity bills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-8 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">{feature.title}</h3>
              <p className="text-secondary-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};