import React from 'react';
import sunphilImg from '../assets/images/Sunphil.jpg'; // Adjust path as needed

interface LogoProps {
  scrolled?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ scrolled = false }) => {
  return (
    <div className="flex items-center transition-all duration-300">
      <img 
        src={sunphilImg} 
        alt="Sunphil Solar Logo"
        className={`h-10 w-auto transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'}`}
      />
      <div className="ml-2">
        <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-secondary-900' : 'text-secondary-900'}`}>
          sunphil<span className="text-secondary-400">solar</span>
        </span>
        <div className={`text-xs tracking-wide transition-colors duration-300 ${scrolled ? 'text-secondary-600' : 'text-secondary-600'}`}>
          SOLAR POWER INSTALLATION SERVICES
        </div>
      </div>
    </div>
  );
};
