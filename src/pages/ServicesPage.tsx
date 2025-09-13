import { Features } from "../components/sections/Features";
import { Services } from "../components/sections/Services";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const ServicesPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-950 via-blue-950 to-neutral-900">
      <div className="container mx-auto px-4 py-20">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-white/80">
            <li>
              <Link to="/" className="flex items-center hover:text-blue-400">
                <svg
                  className="mr-2"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9.75L12 4l9 5.75V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.75Z" />
                  <path d="M9 22V12h6v10" />
                </svg>
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={16} className="mx-1" />
              <span className="text-blue-400">Services</span>
            </li>
          </ol>
        </nav>
        <section
          id="features"
          className="text-white py-12 rounded-xl mb-10 shadow-lg"
        >
          <Features />
        </section>
        <section id="services">
          <Services />
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;
