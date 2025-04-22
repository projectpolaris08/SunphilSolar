import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
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
              Leading provider of solar power installation services, committed to helping you reduce your carbon footprint and energy costs.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
                { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
                { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
                { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-secondary-800 hover:bg-primary-600 transition-colors h-10 w-10 rounded-full flex items-center justify-center"
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
                { label: 'About Us', href: '#about-us' },
                { label: 'Our Services', href: '#services' },
                { label: 'Products', href: '#products' },
                { label: 'Solar Calculator', href: '#calculator' },
                { label: 'Get a Quote', href: '#contact' },
                { label: 'FAQ', href: '#faq' },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                'Residential Solar Panels',
                'Commercial Installations',
                'Solar Battery Storage',
                'System Maintenance',
                'Energy Consultation',
                'Performance Monitoring',
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
                <span className="text-secondary-400">
                  123 Solar Street, Sunny City, SC 12345
                </span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-secondary-400 hover:text-primary-400 transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                <a href="mailto:info@sunphilsolar.com" className="text-secondary-400 hover:text-primary-400 transition-colors">
                  info@sunphilsolar.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-800 text-center text-secondary-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sunphil Solar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};