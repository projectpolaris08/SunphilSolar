import { Link } from "react-router-dom";
import {
  ChevronRight,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Award,
  MapPin,
} from "lucide-react";

const SpecialOfferPage = () => {
  const offers = [
    {
      id: 1,
      title: "Complete Solar Installation Package",
      originalPrice: "₱300,000.00",
      discountedPrice: "₱225,000.00",
      discount: "25% OFF",
      description:
        "Complete solar panel installation with premium components and professional service",
      features: [
        "10pcs 615W High-efficiency solar panels",
        "6kW Deye Hybrid Inverter",
        "51.2v 200Ah (10.24 kWh) LiFePO₄ Battery",
        "Professional installation",
        "Smart energy monitoring",
        "Hybrid Capability",
      ],
      validUntil: "December 31, 2025",
      badge: "Limited Time Offer",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-950 via-blue-950 to-neutral-950">
      <div className="container mx-auto px-4 py-20">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-white/80">
            <li>
              <Link
                to="/"
                className="flex items-center hover:text-blue-400 transition-colors"
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
              <Link
                to="/services"
                className="hover:text-blue-400 transition-colors"
              >
                Services
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={16} className="mx-1" />
              <span className="text-blue-400">Special Offers</span>
            </li>
          </ol>
        </nav>

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Zap className="w-4 h-4" />
            LIMITED TIME OFFER
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Special{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Solar Offer
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Take advantage of our exclusive year-end deal and save 25% on our
            premium solar installation package. Transform your home into an
            energy-efficient powerhouse with this limited-time offer.
          </p>
          <div className="flex items-center justify-center gap-6 text-white/70">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Limited Time</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Full Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Premium Quality</span>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="flex justify-center mb-16">
          <div className="max-w-md w-full">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                {/* Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                    {offer.badge}
                  </span>
                </div>

                {/* Discount Badge */}
                <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {offer.discount}
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {offer.title}
                  </h3>
                  <p className="text-white/70 mb-4">{offer.description}</p>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-3xl font-bold text-white">
                        {offer.discountedPrice}
                      </span>
                      <span className="text-lg text-white/50 line-through">
                        {offer.originalPrice}
                      </span>
                    </div>
                    <p className="text-sm text-green-400 font-medium">
                      You save ₱
                      {parseInt(offer.originalPrice.replace(/[₱,]/g, "")) -
                        parseInt(offer.discountedPrice.replace(/[₱,]/g, ""))}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {offer.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Valid Until */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 text-yellow-400 mb-4">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Valid until {offer.validUntil}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  to="/#contact"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-500/25"
                >
                  Get This Offer
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Terms & Conditions
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
              <p className="text-yellow-400 font-medium text-center">
                ⚠️ Conditions may apply. Please review the following terms
                before proceeding.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    Site Status
                  </h3>
                  <p className="text-white/70">
                    The installation site must be in good condition, with a
                    stable structure capable of supporting solar panels and
                    related equipment. Any necessary repairs or reinforcements
                    must be completed prior to installation.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-400" />
                    Location
                  </h3>
                  <p className="text-white/70">
                    Offer is valid for customers within the Greater Manila Area.
                    Additional fees may apply for installations outside this
                    area.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-400" />
                    Access to the Roof
                  </h3>
                  <p className="text-white/70">
                    Safe and unobstructed access to the roof is required. The
                    roof must have sufficient space for the solar panels and be
                    free from excessive shading caused by trees, nearby
                    buildings, or other obstructions.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Upgradability
                  </h3>
                  <p className="text-white/70">
                    This package is expandable up to 13 pcs 615W solar panels
                    and supports the addition of an extra 51.2V 200Ah LiFePO₄
                    battery for increased storage capacity.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-orange-400" />
                    Supported Appliances
                  </h3>
                  <div className="text-white/70 space-y-2">
                    <p className="font-medium text-white">
                      Sample Load Capacity:
                    </p>
                    <ul className="space-y-1 ml-4">
                      <li>• Air Conditioners – up to a combined 3000W</li>
                      <li>• LED Lighting – standard household lighting</li>
                      <li>• Refrigerator – energy-efficient models</li>
                      <li>• LED TV</li>
                      <li>• Washing Machine</li>
                    </ul>
                    <p className="text-sm text-white/60 mt-3">
                      (Load capacity may vary depending on usage patterns and
                      simultaneous operation of appliances.)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Benefits Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Why Choose Our Special Offer?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Premium Quality
              </h3>
              <p className="text-white/70">
                Only the highest quality solar components and professional
                installation services.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Extended Warranty
              </h3>
              <p className="text-white/70">
                Comprehensive warranty coverage for peace of mind and long-term
                protection.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Expert Support
              </h3>
              <p className="text-white/70">
                Dedicated customer support and maintenance services from our
                certified technicians.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Go Solar?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Don't miss out on this exclusive offer. Contact us today for a free
            consultation and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#contact"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/calculator"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-white/20"
            >
              Calculate Savings
              <Zap className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferPage;
