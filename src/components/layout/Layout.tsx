import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";

export const Layout: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll behavior on route changes
  useEffect(() => {
    const smoothScroll = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    // Scroll to top when path changes
    smoothScroll();

    // Handle hash links
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.pathname, location.hash]);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar scrolled={scrolled} />
      {/* Main content area with smooth scroll padding */}
      <main className="flex-grow pt-20 scroll-smooth overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
