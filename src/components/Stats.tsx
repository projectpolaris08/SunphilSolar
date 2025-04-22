import React from 'react';
import { Sun, Battery, Home, Award } from 'lucide-react';

export const Stats: React.FC = () => {
  const stats = [
    {
      icon: <Sun className="h-8 w-8 text-primary-500" />,
      value: '5,585+',
      label: 'kW Installed',
      description: 'Solar Energy Capacity'
    },
    {
      icon: <Battery className="h-8 w-8 text-primary-500" />,
      value: '300+',
      label: 'Installations',
      description: 'Completed Projects'
    },
    {
      icon: <Home className="h-8 w-8 text-primary-500" />,
      value: '400+',
      label: 'Happy Clients',
      description: 'Residential & Commercial'
    },
    {
      icon: <Award className="h-8 w-8 text-primary-500" />,
      value: '98%',
      label: 'Satisfaction',
      description: 'Customer Rating'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-primary-50 p-4 rounded-full mb-4">
                {stat.icon}
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-900">{stat.value}</div>
                <div className="font-medium text-lg text-primary-600 mb-1">{stat.label}</div>
                <div className="text-sm text-secondary-500">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};