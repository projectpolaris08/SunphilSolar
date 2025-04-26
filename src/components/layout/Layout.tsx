import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer'; // Make sure you import Footer!

export const Layout: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main content area */}
      <main className="flex-grow pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
