import React from "react";
import { Sun, Battery, Zap, ShieldCheck, PiggyBank, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Sun className="h-10 w-10 text-primary-500" />,
      title: "Solar Panels",
      description:
        "Premium quality solar panels professionally installed to maximize energy production and efficiency.",
      link: "/solar-panel-installation",
    },
    {
      icon: <Battery className="h-10 w-10 text-primary-500" />,
      title: "Battery Storage",
      description:
        "Store excess energy with cutting-edge battery solutions for use when the sun isn't shining.",
      link: "/products#battery",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary-500" />,
      title: "Inverter Solutions",
      description:
        "Deye Hybrid Inverters that efficiently convert solar energy into usable electricity for your home.",
      link: "/products#inverter",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary-500" />,
      title: "Maintenance & Support",
      description:
        "Regular system checks and maintenance to ensure optimal performance throughout the year.",
      link: "/aftersales",
    },
    {
      icon: <PiggyBank className="h-10 w-10 text-primary-500" />,
      title: "Financing Options",
      description:
        "Currently accepting cash payments, with flexible financing options coming soon to make solar energy even more accessible!",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary-500" />,
      title: "12-Year Warranty",
      description:
        "Industry-leading warranty coverage for peace of mind and long-term investment protection.",
    },
  ];

  return (
    <section id="features" className="py-20 text-white px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Our Solar Energy Solutions
        </h2>
        <div className="h-1 w-20 bg-primary-500 mx-auto rounded mb-6"></div>
        <p className="text-lg text-white/80">
          Comprehensive solar services designed to power your home or business
          with clean, renewable energy while reducing your electricity bills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {features.map((feature, index) => {
          const content = (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/80 flex-grow">{feature.description}</p>
            </div>
          );

          return feature.link ? (
            <Link to={feature.link} key={index} className="block">
              {content}
            </Link>
          ) : (
            content
          );
        })}
      </div>
    </section>
  );
};
