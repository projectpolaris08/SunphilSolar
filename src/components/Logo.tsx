import React from 'react';

interface LogoProps {
  scrolled: boolean;
}

export const Logo: React.FC<LogoProps> = ({ scrolled }) => {
  return (
    <div className="flex items-center">
      <img
        src="/Sunphil.jpg"
        alt="Sunphil Solar Logo"
        className={`h-10 w-auto transition duration-300 ${scrolled ? 'opacity-100' : 'opacity-90'}`}
      />
      <div className="ml-2">
        <span
          className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
            scrolled ? 'text-secondary-900' : 'text-white'
          }`}
        >
          sunphil<span className="text-secondary-400">solar</span>
        </span>
        <div
          className={`text-xs tracking-wide transition-colors duration-300 ${
            scrolled ? 'text-secondary-600' : 'text-secondary-200'
          }`}
        >
          SOLAR POWER INSTALLATION SERVICES
        </div>
      </div>
    </div>
  );
};
