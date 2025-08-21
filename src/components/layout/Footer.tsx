import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleNavigation = (path: string) => {
    if (path.startsWith("http")) {
      window.open(path, "_blank");
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        navigate(path);
      }, 300);
    }
  };

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-4">
              <div className="text-xl font-bold tracking-tight">
                sunphil<span className="text-primary-400">solar</span>
              </div>
            </div>
            <p className="text-secondary-400 mb-6">
              Leading provider of solar power installation services, committed
              to helping you reduce your carbon footprint and energy costs.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  icon: <Facebook size={20} />,
                  href: "https://www.facebook.com/profile.php?id=100094173168805",
                  label: "Facebook",
                },
                { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
                {
                  icon: <Instagram size={20} />,
                  href: "#",
                  label: "Instagram",
                },
                { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-secondary-800 hover:bg-primary-600 transition-colors h-10 w-10 rounded-full flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Calculator", path: "/calculator" },
                { label: "Products", path: "/products" },
                { label: "Blog", path: "/blog" },
                { label: "About Us", path: "/about" },
                { label: "Features", path: "#features" },
                { label: "Services", path: "#services" },
                { label: "Contact", path: "#contact" },
                { label: "FAQ", path: "/faq" },
              ].map((link, index) => (
                <li key={index}>
                  {link.path.startsWith("#") ? (
                    <HashLink
                      smooth
                      to={isHomePage ? link.path : `/${link.path}`}
                      className="text-secondary-400 hover:text-primary-400 transition-colors"
                      scroll={(el) =>
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        })
                      }
                    >
                      {link.label}
                    </HashLink>
                  ) : (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(link.path);
                      }}
                      className="text-secondary-400 hover:text-primary-400 transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Residential Solar Panels",
                "Commercial Installations",
                "Solar Battery Storage",
                "System Maintenance",
                "Energy Consultation",
                "Performance Monitoring",
              ].map((service, index) => (
                <li key={index} className="text-secondary-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/place/Sunphil+Solar+Installation+Services/@14.7133426,121.0545736,17z/data=!4m6!3m5!1s0x3397b1a837ab86cd:0x12fa7ee4ac4b47b!8m2!3d14.7133374!4d121.0571432!16s%2Fg%2F11vwtgf832?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-400 hover:text-primary-400 transition-colors"
                >
                  28C North Fairview Phase 8 Subdivision, Blk 85 Yen, Quezon
                  City, 1121 Metro Manila
                </a>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                <a
                  href="tel:+639606921760"
                  className="text-secondary-400 hover:text-primary-400 transition-colors"
                >
                  (+63) 960 692 1760
                </a>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                <a
                  href="mailto:sunphilsolar@sunphilsolar.com"
                  className="text-secondary-400 hover:text-primary-400 transition-colors"
                >
                  sunphilsolar@sunphilsolar.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-800 text-center text-secondary-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Sunphil Solar. All rights
            reserved.
          </p>
          <p className="mt-1">
            Developed by{" "}
            <a
              href="https://www.facebook.com/jayar.barallas/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Jayar Barallas
            </a>
          </p>
          <div className="mt-2 space-x-4">
            <a
              href="/privacy-policy"
              className="text-secondary-400 hover:text-primary-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("/privacy-policy");
              }}
            >
              Privacy Policy
            </a>
            <a
              href="/cookies"
              className="text-secondary-400 hover:text-primary-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("/cookies");
              }}
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
