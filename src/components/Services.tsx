import React from 'react';
import { Home, Building2, Factory, Wrench, FileText, PieChart } from 'lucide-react';

export const Services: React.FC = () => {
  const services = [
    {
      icon: <Home className="h-12 w-12 text-primary-500" />,
      title: 'Residential Installation',
      description: 'Complete solar solutions for homes, including panel installation, inverter setup, and battery storage systems.'
    },
    {
      icon: <Building2 className="h-12 w-12 text-primary-500" />,
      title: 'Commercial Systems',
      description: 'Scalable solar installations for businesses, offices, and commercial properties to reduce operational costs.'
    },
    {
      icon: <Factory className="h-12 w-12 text-primary-500" />,
      title: 'Industrial Solutions',
      description: 'High-capacity solar systems for industrial facilities with significant energy requirements.'
    },
    {
      icon: <Wrench className="h-12 w-12 text-primary-500" />,
      title: 'Maintenance & Repair',
      description: 'Regular maintenance, system health checks, and prompt repair services for all solar installations.'
    },
    {
      icon: <FileText className="h-12 w-12 text-primary-500" />,
      title: 'Energy Audit',
      description: 'Comprehensive analysis of your current energy usage to design the most efficient solar solution.'
    },
    {
      icon: <PieChart className="h-12 w-12 text-primary-500" />,
      title: 'Performance Monitoring',
      description: 'Advanced monitoring systems to track your solar production and energy consumption in real-time.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-secondary-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-primary-500 to-transparent"></div>
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-b from-primary-400 to-transparent rounded-bl-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Services</h2>
          <div className="h-1 w-20 bg-primary-500 mx-auto rounded mb-6"></div>
          <p className="text-lg text-secondary-300">
            We offer a complete range of solar services from initial consultation to installation and ongoing support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-secondary-800 rounded-lg p-8 hover:bg-secondary-700 transition-all duration-300 border border-secondary-700 hover:border-primary-500 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-secondary-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};