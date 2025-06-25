import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Calculator,
  BookOpen,
  Info,
  HelpCircle,
  Briefcase,
  Layers,
  List,
  Package,
  Building2,
  FileText,
  LifeBuoy,
  BarChart2,
} from "lucide-react";
import { Logo } from "../Logo";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useSound } from "react-sounds";

interface NavbarProps {
  scrolled?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { play: playButton } = useSound("ui/button_hard", { volume: 0.4 });

  const toggleMenu = () => {
    playButton();
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home, color: "text-blue-500" },
    {
      name: "Calculator",
      path: "/calculator",
      icon: Calculator,
      color: "text-green-500",
    },
    { name: "Blog", path: "/blog", icon: BookOpen, color: "text-yellow-500" },
    { name: "About Us", path: "/about", icon: Info, color: "text-purple-500" },
    { name: "FAQ", path: "/faq", icon: HelpCircle, color: "text-pink-500" },
  ];

  const isOnHomePage = location.pathname === "/";

  const handleNavClick = (path: string) => {
    playButton();
    if (
      location.pathname === path ||
      (path === "/" && location.pathname === "/")
    ) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    setIsOpen(false); // For mobile menu
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md text-gray-900"
          : "bg-white/80 backdrop-blur-md text-gray-900"
      }`}
      style={{ height: "5rem" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Updated Logo with RouterLink */}
          <RouterLink to="/" onClick={() => handleNavClick("/")}>
            <Logo />
          </RouterLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-10">
            {navItems.map((item) =>
              item.name === "Services" ? null : item.path.startsWith("#") ? (
                <HashLink
                  key={item.name}
                  smooth
                  to={isOnHomePage ? item.path : `/${item.path}`}
                  className="flex items-center gap-2 text-base font-medium transition-all duration-300 hover:text-primary-600 hover:underline hover:underline-offset-4 hover:decoration-2 whitespace-nowrap"
                  onClick={() => handleNavClick(item.path)}
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  {item.name}
                </HashLink>
              ) : (
                <RouterLink
                  key={item.name}
                  to={item.path}
                  className="flex items-center gap-2 text-base font-medium transition-all duration-300 hover:text-primary-600 hover:underline hover:underline-offset-4 hover:decoration-2 whitespace-nowrap"
                  onClick={() => handleNavClick(item.path)}
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  {item.name}
                </RouterLink>
              )
            )}
            {/* Services Dropdown */}
            <div className="relative group">
              <span className="flex items-center gap-2 text-base font-medium transition-all duration-300 hover:text-primary-600 hover:underline hover:underline-offset-4 hover:decoration-2 whitespace-nowrap cursor-pointer">
                <Briefcase className="w-5 h-5 text-orange-500" />
                Services
              </span>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50">
                <RouterLink
                  to="/services"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-primary-100 text-gray-900"
                  onClick={() => handleNavClick("/services")}
                >
                  <Layers className="w-5 h-5 text-blue-500" />
                  All Services
                </RouterLink>
                <RouterLink
                  to="/services#services"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-primary-100 text-gray-900"
                  onClick={() => handleNavClick("/services#services")}
                >
                  <List className="w-5 h-5 text-green-500" />
                  Service List
                </RouterLink>
                <RouterLink
                  to="/products"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-primary-100 text-gray-900"
                  onClick={() => handleNavClick("/products")}
                >
                  <Package className="w-5 h-5 text-yellow-500" />
                  Products
                </RouterLink>
                <RouterLink
                  to="/solarprojects"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-primary-100 text-gray-900"
                  onClick={() => handleNavClick("/solarprojects")}
                >
                  <Building2 className="w-5 h-5 text-purple-500" />
                  Projects
                </RouterLink>
                <RouterLink
                  to="/case-studies"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-primary-100 text-gray-900"
                  onClick={() => handleNavClick("/case-studies")}
                >
                  <FileText className="w-5 h-5 text-pink-500" />
                  Case Studies
                </RouterLink>
                <RouterLink
                  to="/aftersales"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-primary-100 text-gray-900"
                  onClick={() => handleNavClick("/aftersales")}
                >
                  <LifeBuoy className="w-5 h-5 text-red-500" />
                  After Sales
                </RouterLink>
                <RouterLink
                  to="/statistics"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-primary-100 text-gray-900"
                  onClick={() => handleNavClick("/statistics")}
                >
                  <BarChart2 className="w-5 h-5 text-cyan-600" />
                  Statistics
                </RouterLink>
              </div>
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <div className="animated-gradient-border rounded-full inline-block">
              <HashLink
                smooth
                to={isOnHomePage ? "#contact" : "/#contact"}
                className="relative z-10 transition-all duration-300 inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-full text-base font-medium text-white bg-primary-600 hover:bg-primary-700 whitespace-nowrap"
                onClick={() => playButton()}
              >
                Get a Quote
                <span className="ml-2">→</span>
              </HashLink>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
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
        className={`lg:hidden fixed top-20 left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ zIndex: 40 }}
      >
        <div className="px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) =>
            item.name === "Services" ? null : item.path.startsWith("#") ? (
              <HashLink
                key={item.name}
                smooth
                to={isOnHomePage ? item.path : `/${item.path}`}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-gray-900 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                onClick={() => {
                  handleNavClick(item.path);
                  toggleMenu();
                }}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                {item.name}
              </HashLink>
            ) : (
              <RouterLink
                key={item.name}
                to={item.path}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-gray-900 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                onClick={() => {
                  handleNavClick(item.path);
                  toggleMenu();
                }}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                {item.name}
              </RouterLink>
            )
          )}
          {/* Services Dropdown */}
          <div className="flex items-center gap-2 px-4 py-3 text-base font-medium text-gray-900">
            <Briefcase className="w-5 h-5 text-orange-500" />
            Services
          </div>
          <div className="pl-6 space-y-1">
            <RouterLink
              to="/services"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-primary-100 text-gray-900"
              onClick={() => {
                handleNavClick("/services");
                toggleMenu();
              }}
            >
              <Layers className="w-5 h-5 text-blue-500" />
              All Services
            </RouterLink>
            <RouterLink
              to="/services#services"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-primary-100 text-gray-900"
              onClick={() => {
                handleNavClick("/services#services");
                toggleMenu();
              }}
            >
              <List className="w-5 h-5 text-green-500" />
              Service List
            </RouterLink>
            <RouterLink
              to="/products"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-primary-100 text-gray-900"
              onClick={() => {
                handleNavClick("/products");
                toggleMenu();
              }}
            >
              <Package className="w-5 h-5 text-yellow-500" />
              Products
            </RouterLink>
            <RouterLink
              to="/solarprojects"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-primary-100 text-gray-900"
              onClick={() => {
                handleNavClick("/solarprojects");
                toggleMenu();
              }}
            >
              <Building2 className="w-5 h-5 text-purple-500" />
              Projects
            </RouterLink>
            <RouterLink
              to="/case-studies"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-primary-100 text-gray-900"
              onClick={() => {
                handleNavClick("/case-studies");
                toggleMenu();
              }}
            >
              <FileText className="w-5 h-5 text-pink-500" />
              Case Studies
            </RouterLink>
            <RouterLink
              to="/aftersales"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-primary-100 text-gray-900"
              onClick={() => {
                handleNavClick("/aftersales");
                toggleMenu();
              }}
            >
              <LifeBuoy className="w-5 h-5 text-red-500" />
              After Sales
            </RouterLink>
            <RouterLink
              to="/statistics"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-primary-100 text-gray-900"
              onClick={() => {
                handleNavClick("/statistics");
                toggleMenu();
              }}
            >
              <BarChart2 className="w-5 h-5 text-cyan-600" />
              Statistics
            </RouterLink>
          </div>
          <div className="pt-2">
            <HashLink
              smooth
              to={isOnHomePage ? "#contact" : "/#contact"}
              className="transition-all duration-200 inline-flex items-center justify-center w-full px-6 py-3 border border-transparent rounded-full text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
              onClick={toggleMenu}
            >
              Get Started
              <span className="ml-2">→</span>
            </HashLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
