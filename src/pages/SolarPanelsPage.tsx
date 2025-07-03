import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const SolarPanelsPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
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
              <span className="text-blue-400">Solar Panels</span>
            </li>
          </ol>
        </nav>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Solar Panels</h1>
          <p className="text-lg max-w-2xl mx-auto mb-6">
            Premium quality solar panels professionally installed to maximize
            energy production and efficiency for your home or business.
          </p>
          <img
            src="/images/CanadianSolar.png"
            alt="Canadian Solar Panels"
            className="mx-auto mb-8 max-h-56 object-contain"
          />
          {/* Product Image */}
          <div
            className="flex justify-center mb-8"
            style={{ perspective: "1000px" }}
          >
            <img
              src="/images/Canadian615W.jpg"
              alt="Canadian Solar 615W Panel"
              className="rounded-lg shadow-2xl max-w-full h-auto object-contain transition-transform duration-500"
              style={{
                maxHeight: "350px",
                transform: "rotateY(-12deg) rotateX(6deg)",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.4), 0 1.5px 8px rgba(0,0,0,0.15)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform =
                  "rotateY(-6deg) rotateX(0deg)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform =
                  "rotateY(-12deg) rotateX(6deg)")
              }
            />
          </div>
        </section>

        {/* Product Highlights */}
        <section className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
          <div className="bg-white/10 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Canadian Solar Panels 615W
            </h2>
            <ul className="mb-4 list-disc list-inside text-white/90">
              <li>Model NO: Canadian Solar 615W</li>
              <li>Weight: 32.8 kg</li>
              <li>Dimensions: 2382 × 1134 × 30 mm</li>
              <li>Origin: China</li>
              <li>Brand: Canadian Solar</li>
              <li>Module efficiency up to 23.1%</li>
              <li>
                Up to 85% Power Bifaciality (more power from the back side)
              </li>
              <li>
                Excellent anti-LeTID & anti-PID performance (low power
                degradation, high energy yield)
              </li>
              <li>
                Lower temperature coefficient (Pmax): -0.29%/°C (increases
                energy yield in hot climate)
              </li>
              <li>Lower LCOE & system cost</li>
              <li>
                Tested up to ice ball of 35 mm diameter (IEC 61215 standard)
              </li>
              <li>Minimizes micro-crack impacts</li>
              <li>Heavy snow load up to 5400 Pa, wind load up to 2400 Pa</li>
            </ul>
            <div className="mb-4">
              <span className="block font-semibold text-lg mb-1">Warranty</span>
              <ul className="list-disc list-inside text-white/90">
                <li>
                  12 Years Enhanced Product Warranty on Materials and
                  Workmanship
                </li>
                <li>30 Years Linear Power Performance Warranty</li>
                <li>1st year power degradation no more than 1%</li>
                <li>Subsequent annual power degradation no more than 0.4%</li>
              </ul>
            </div>
            <div className="mb-4">
              <span className="block font-semibold text-lg mb-1">
                Certificates
              </span>
              <ul className="list-disc list-inside text-white/90">
                <li>ISO 9001, ISO 14001, ISO 45001, IEC 62941</li>
                <li>IEC 61215, IEC 61730, CE, MC5, UKCA, INMETRO, CGC</li>
                <li>IEC 61701, IEC 62716, IEC 60068-2-68, EN 13501-1</li>
                <li>Class 1 / Take-e-way</li>
              </ul>
            </div>
            <a
              href="https://www.shanxusolar.com/product-item-30.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              View Official Product Page
            </a>
          </div>
          <div className="bg-white/10 rounded-lg p-8 shadow-lg h-full flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4">Product Description</h3>
            <p className="mb-4">
              This high-efficiency Canadian Solar 615W panel is designed for
              both residential and commercial installations. It delivers up to
              23.1% module efficiency and features up to 85% power bifaciality,
              providing more power from the back side. The panel is engineered
              for excellent anti-LeTID and anti-PID performance, ensuring low
              power degradation and high energy yield over time. Its lower
              temperature coefficient (Pmax: -0.29%/°C) increases energy yield
              in hot climates, while the robust construction minimizes
              micro-crack impacts and supports heavy snow (up to 5400 Pa) and
              wind loads (up to 2400 Pa).
            </p>
            <p className="mb-4">
              The Canadian Solar 615W panel is tested up to ice ball impact of
              35 mm diameter according to IEC 61215 standard, ensuring
              reliability in harsh conditions. It is backed by a 12-year
              enhanced product warranty on materials and workmanship, and a
              30-year linear power performance warranty, with first-year power
              degradation no more than 1% and subsequent annual degradation no
              more than 0.4%.
            </p>
            <p className="mb-4">
              Certified to the highest international standards (ISO 9001, ISO
              14001, ISO 45001, IEC 62941, IEC 61215, IEC 61730, CE, MC5, UKCA,
              INMETRO, CGC, and more), this panel offers lower LCOE and system
              cost, making it an excellent choice for maximizing your solar
              energy production in any environment.
            </p>
            <h3 className="text-xl font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-white/90 mb-4">
              <li>High power output for greater energy yield</li>
              <li>Robust construction for long-term reliability</li>
              <li>Suitable for various installation environments</li>
              <li>Backed by Canadian Solar's global reputation</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Applications</h3>
            <ul className="list-disc list-inside text-white/90">
              <li>Residential rooftops</li>
              <li>Commercial buildings</li>
              <li>Industrial facilities</li>
              <li>Large-scale solar farms</li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <section
          id="contact"
          className="container mx-auto px-4 py-10 text-center"
        >
          <h3 className="text-2xl font-semibold mb-4">Ready to Go Solar?</h3>
          <p className="mb-6">
            Contact us today to schedule a consultation or request a quote for
            your solar panel installation.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  );
};

export default SolarPanelsPage;
