import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`fixed w-full z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-elevation-1 text-secondary-900'
          : 'bg-transparent text-white'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo scrolled={scrolled} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {['About Us', 'Products', 'Features', 'Services', 'Support'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-base font-medium transition duration-300 hover:text-primary-500 ${
                  scrolled ? 'text-secondary-800' : 'text-white'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex">
            <a
              href="#contact"
              className="transition duration-300 inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-full text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Get Started
              <span className="ml-2">→</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                scrolled ? 'text-secondary-800' : 'text-white'
              } hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-elevation-2">
          {['About Us', 'Products', 'Features', 'Services', 'Support'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="block px-3 py-2 rounded-md text-base font-medium text-secondary-900 hover:bg-primary-50 hover:text-primary-600"
              onClick={toggleMenu}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="block w-full text-center mt-4 px-4 py-2 border border-transparent rounded-full text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
            onClick={toggleMenu}
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
};