import React, { useState, useEffect, useRef } from "react";
import { Battery, Zap } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const ProductsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"battery" | "inverter">("battery");
  const location = useLocation();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash === "battery" || hash === "inverter") {
      setActiveTab(hash);
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Small delay to ensure DOM is ready
    }
  }, [location.hash]);

  const handleTabChange = (tab: "battery" | "inverter") => {
    setActiveTab(tab);
    navigate(`#${tab}`, { replace: true });
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const batteries = [
    {
      id: "battery-1",
      icon: <Battery className="h-10 w-10 text-primary-500" />,
      image: "/images/24v 280AH.png",
      title: "24V 280AH (6.7kWh) LiFePO4 Battery",
      brand: "EVE Brand",
      warranty: "3 Years Warranty",
      price: "Php 45,000.00",
    },
    {
      id: "battery-2",
      icon: <Battery className="h-10 w-10 text-primary-500" />,
      image: "/images/24v 314AH.png",
      title: "24V 314AH (7.5kWh) LiFePO4 Battery",
      brand: "EVE Brand",
      warranty: "3 Years Warranty",
      price: "Php 57,000.00",
    },
    {
      id: "battery-3",
      icon: <Battery className="h-10 w-10 text-primary-500" />,
      image: "/images/51.2v 280AH.png",
      title: "51.2V 280AH (14kWh) LiFePO4 Battery",
      brand: "EVE Brand",
      warranty: "3 Years Warranty",
      price: "Php 85,000.00",
    },
    {
      id: "battery-4",
      icon: <Battery className="h-10 w-10 text-primary-500" />,
      image: "/images/51.2v 314AH.png",
      title: "51.2V 314AH (16kWh) LiFePO4 Battery",
      brand: "EVE Brand",
      warranty: "3 Years Warranty",
      price: "Php 95,000.00",
    },
  ];

  const inverters = [
    {
      id: "inverter-1",
      icon: <Zap className="h-10 w-10 text-primary-500" />,
      image: "/images/LVTOPSUN-3kW.png",
      title: "3kW LVTOPSUN Hybrid Inverter",
      brand: "LVTOPSUN",
      warranty: "5 Years Warranty",
      price: "Php 35,000.00",
    },
    {
      id: "inverter-2",
      icon: <Zap className="h-10 w-10 text-primary-500" />,
      image: "/images/Deye-6kW.png",
      title: "6kW Deye Hybrid Inverter",
      brand: "Deye",
      warranty: "5 Years Warranty",
      price: "Php 70,000.00",
    },
    {
      id: "inverter-3",
      icon: <Zap className="h-10 w-10 text-primary-500" />,
      image: "/images/Deye-8kW.png",
      title: "8kW Deye Hybrid Inverter",
      brand: "Deye",
      warranty: "5 Years Warranty",
      price: "Php 100,000.00",
    },
    {
      id: "inverter-4",
      icon: <Zap className="h-10 w-10 text-primary-500" />,
      image: "/images/Deye-12kW.png",
      title: "12kW Deye Hybrid Inverter",
      brand: "Deye",
      warranty: "5 Years Warranty",
      price: "Php 135,000.00",
    },
    {
      id: "inverter-5",
      icon: <Zap className="h-10 w-10 text-primary-500" />,
      image: "/images/Deye-16kW.png",
      title: "16kW Deye Hybrid Inverter",
      brand: "Deye",
      warranty: "5 Years Warranty",
      price: "Php 175,000.00",
    },
  ];

  const handleBuyNow = (product: {
    id: string;
    title: string;
    price: string;
  }) => {
    navigate("/contact", {
      state: {
        product: {
          name: product.title,
          price: product.price,
          id: product.id,
        },
      },
    });
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-neutral-950 via-blue-950 to-neutral-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-white/70">
            <li>
              <Link
                to="/"
                className="flex items-center hover:text-blue-400 text-white/80"
              >
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
              <span className="text-blue-400">Products</span>
            </li>
          </ol>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Products
          </h2>
          <div className="h-1 w-20 bg-primary-500 mx-auto rounded mb-6"></div>
          <p className="text-lg text-white/80">
            Explore our high-quality batteries and pre-assembled hybrid
            inverters.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 space-x-4">
          <button
            onClick={() => handleTabChange("battery")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "battery"
                ? "bg-primary-500 text-white shadow-elevation-2"
                : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
            }`}
          >
            Battery Storage
          </button>
          <button
            onClick={() => handleTabChange("inverter")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "inverter"
                ? "bg-primary-500 text-white shadow-elevation-2"
                : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
            }`}
          >
            Pre-assembled Inverters
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === "battery" ? batteries : inverters).map(
            (product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="mb-5 text-center">
                  <div className="flex justify-center items-center mb-2">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-40 w-auto object-contain rounded shadow"
                      />
                    )}
                  </div>
                  {product.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {product.title}
                </h3>
                <div className="flex flex-col items-center space-y-2 mb-4">
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ backgroundColor: "#0077b6", color: "white" }}
                  >
                    {product.brand}
                  </span>
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ backgroundColor: "#ffd500", color: "black" }}
                  >
                    {product.warranty}
                  </span>
                </div>
                <p className="text-primary-500 font-bold mb-4 text-center">
                  {product.price}
                </p>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="block w-full text-center px-4 py-2 bg-primary-500 text-white font-semibold rounded-md hover:bg-primary-600 transition-colors duration-300"
                >
                  Buy Now
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
