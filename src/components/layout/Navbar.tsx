import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "../Logo";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Calculator", path: "/calculator" },
    { name: "Products", path: "#products" },
    { name: "Features", path: "#features" },
    { name: "Services", path: "#services" },
    { name: "Blog", path: "/blog" },
    { name: "About Us", path: "#about-us" },
  ];

  const isOnHomePage = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md text-gray-900"
          : "bg-white/80 backdrop-blur-md text-gray-900"
      }`}
      style={{ height: "6rem" }} // Lock header height
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {navItems.map((item) =>
              item.path.startsWith("#") ? (
                <HashLink
                  key={item.name}
                  smooth
                  to={isOnHomePage ? item.path : `/${item.path}`}
                  className="text-base font-medium transition-all duration-300 hover:text-primary-600 hover:underline hover:underline-offset-4 hover:decoration-2"
                >
                  {item.name}
                </HashLink>
              ) : (
                <RouterLink
                  key={item.name}
                  to={item.path}
                  className="text-base font-medium transition-all duration-300 hover:text-primary-600 hover:underline hover:underline-offset-4 hover:decoration-2"
                >
                  {item.name}
                </RouterLink>
              )
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <HashLink
              smooth
              to={isOnHomePage ? "#contact" : "/#contact"}
              className="transition-all duration-300 inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-full text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Get Started
              <span className="ml-2">→</span>
            </HashLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
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

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white shadow-md">
          {navItems.map((item) =>
            item.path.startsWith("#") ? (
              <HashLink
                key={item.name}
                smooth
                to={isOnHomePage ? item.path : `/${item.path}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-primary-50 hover:text-primary-600"
                onClick={toggleMenu}
              >
                {item.name}
              </HashLink>
            ) : (
              <RouterLink
                key={item.name}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-primary-50 hover:text-primary-600"
                onClick={toggleMenu}
              >
                {item.name}
              </RouterLink>
            )
          )}
          <HashLink
            smooth
            to={isOnHomePage ? "#contact" : "/#contact"}
            className="transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-full text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            Get Started
            <span className="ml-2">→</span>
          </HashLink>

        </div>
      </div>
    </header>
  );
};
