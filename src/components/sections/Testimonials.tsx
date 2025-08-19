import React from "react";
import Slider from "react-slick";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom styles for the slider
const sliderStyles = `
  .testimonials-slider .slick-prev,
  .testimonials-slider .slick-next {
    width: 40px;
    height: 40px;
    background: #3b82f6;
    border-radius: 50%;
    z-index: 10;
  }
  
  .testimonials-slider .slick-prev:hover,
  .testimonials-slider .slick-next:hover {
    background: #2563eb;
  }
  
  .testimonials-slider .slick-prev:before,
  .testimonials-slider .slick-next:before {
    font-size: 20px;
    color: white;
  }
  
  .testimonials-slider .slick-dots {
    bottom: -40px;
  }
  
  .testimonials-slider .slick-dots li button:before {
    font-size: 12px;
    color: #3b82f6;
  }
  
  .testimonials-slider .slick-dots li.slick-active button:before {
    color: #2563eb;
  }
`;

const testimonials = [
  {
    name: "Jason Palafox",
    photo: "/images/Jason-after.jpg",
    text: "Ito na yung bill ko salamat Sunphil Solar/Fairview Solarista at sa buong team niyo sana marami pa kayong matulungan. Napakasaya ko talaga Sir salamat talaga.",
    rating: 5,
    source: "Case Study",
    badge: "/images/facebook-badge.png",
    savings: "₱5,634/month",
    location: "Pinagsama, Taguig City",
    system: "6kW Hybrid Solar",
    beforeAfter: "₱5,711 → ₱77 (98.6% savings)",
    caseStudySlug: "pinagsama-taguig-6kw-2025",
  },
  {
    name: "Arjay Nepomuceno",
    photo: "/images/arjaybill2.jpg",
    text: "Loko tong si Meralco, saan kay kinuha yan ₱24 pesos? Irereklamo ko pa ba yan kay Meralco? 😀😃",
    rating: 5,
    source: "Case Study",
    badge: "/images/facebook-badge.png",
    savings: "₱6,671/month",
    location: "Bagong Ilog, Pasig City",
    system: "6kW Hybrid Solar",
    beforeAfter: "₱6,695 → ₱24 (99.6% savings)",
    caseStudySlug: "bagong-ilog-pasig",
  },
  {
    name: "Eduardo Pilapil",
    photo: "/images/project9.jpg",
    text: "This is what solar should've felt like from the start. I made the mistake of choosing the cheapest offer before. But with Sunphil Solar, I got real savings, real service, and real peace of mind.",
    rating: 5,
    source: "Case Study",
    badge: "/images/facebook-badge.png",
    savings: "₱16,323/month",
    location: "Bacoor, Cavite",
    system: "12kW Hybrid Solar",
    beforeAfter: "₱23,110 → ₱6,787 (70.6% savings)",
    caseStudySlug: "bacoor-cavite-rescue",
  },
  {
    name: "Jose Rey Paguiton Paz",
    photo: "/images/Jose-Rey-after.jpg",
    text: "Good day po. i-update ko lang po kayo ng performance ng installed 8kw solar, from almost 13k naging 1.7k na lang bill namin. thank you po ulit.",
    rating: 5,
    source: "Case Study",
    badge: "/images/facebook-badge.png",
    savings: "₱11,212/month",
    location: "Upper Bicutan, Taguig City",
    system: "8kW Hybrid Solar",
    beforeAfter: "₱12,994 → ₱1,781 (86% savings)",
    caseStudySlug: "upper-bicutan-taguig",
  },
  {
    name: "Kath Start",
    photo: "/images/Kath-Start-after.jpg",
    text: "Good day po! I-uupdate ko lng kyo kc sobrang happy ko ngaun!dumating na kc un bill ko s meralco at sobrang nkka-excite ang bill ko! From 13k last june ngaun 3,400 nlng!! Salamat boss legit ang SunphilSolar/Fairview Solarista!",
    rating: 5,
    source: "Case Study",
    badge: "/images/facebook-badge.png",
    savings: "₱9,630/month",
    location: "Sampaloc, Manila",
    system: "6kW Hybrid Solar",
    beforeAfter: "₱13,075 → ₱3,444 (74% savings)",
    caseStudySlug: "sampaloc-manila",
  },
  {
    name: "Richard Jay Baetiong",
    photo: "/images/Richard-after.jpg",
    text: "Salamat po! After 15 days, solar usage cut my bill from ₱8,500 (600 kWh) to ₱4,300 (333 kWh). Hindi ko inexpect na ganito kabilis makikita yung savings!",
    rating: 5,
    source: "Case Study",
    badge: "/images/facebook-badge.png",
    savings: "₱8,305/month",
    location: "Marikina City",
    system: "6kW Hybrid Solar",
    beforeAfter: "₱8,500 → ₱194 (97.7% savings)",
    caseStudySlug: "marikina-city-2025",
  },
  {
    name: "Gerry Pacammara",
    photo: "/images/gerry-pacammara.jpg",
    text: "Hindi ako nagkamali sa investment ko, saka syempre, hindi ako nagkamali na kayo nag-install. Sulit ang battery ninyo, hindi tulad ng iba na mababa ang capacity pero mahal.",
    rating: 5,
    source: "Case Study",
    badge: "/images/facebook-badge.png",
    savings: "₱5,000/month",
    location: "Commonwealth, Quezon City",
    system: "6kW Hybrid Solar",
    beforeAfter: "₱5,000 → ₱96 (98% savings)",
    caseStudySlug: "commonwealth-quezon-city",
  },
  {
    name: "Marvin Lucero",
    photo: "/images/marvin-cabuhat2.jpg",
    text: "Very satisfied Sir. Nag bi-bills na lang ako ng ₱100 to ₱200 per month. Hindi na ako nangangamba tuwing dumarating ang bill. Alam ko na kaya ko na.",
    rating: 5,
    source: "Case Study",
    badge: "/images/facebook-badge.png",
    savings: "₱5,237/month",
    location: "Naic, Cavite",
    system: "6kW Hybrid Solar",
    beforeAfter: "₱5,381 → ₱144 (97.3% savings)",
    caseStudySlug: "naic-cavite",
  },
  {
    name: "Sir Yhe Yhe Lansang",
    photo: "/images/yhe-after.jpg",
    text: "From ₱4,912.80 to ₱646.79 na lang ang bill namin. Malaking tipid talaga! Salamat sa Sunphil Solar.",
    rating: 5,
    source: "Case Study",
    badge: "/images/facebook-badge.png",
    savings: "₱4,266/month",
    location: "Mabalacat, Pampanga",
    system: "8kW Hybrid Solar",
    beforeAfter: "₱4,912 → ₱646 (86.8% savings)",
    caseStudySlug: "mabalacat-pampanga-8kw",
  },
];

export const Testimonials: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  const navigate = useNavigate();

  const handleCardClick = (caseStudySlug: string) => {
    navigate(`/case-studies/${caseStudySlug}`);
  };

  return (
    <section className="py-16 bg-white">
      <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
      <div className="container mx-auto px-2 sm:px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-secondary-900 text-center">
          Real Customer Results
        </h2>
        <div className="relative">
          <Slider {...settings} className="testimonials-slider">
            {testimonials.map((t, idx) => (
              <div key={idx} className="px-3">
                <div
                  className="bg-white border-2 border-blue-500 rounded-2xl shadow-2xl p-6 flex flex-col h-[520px] cursor-pointer hover:shadow-3xl transition-all duration-300 hover:border-blue-600"
                  onClick={() => handleCardClick(t.caseStudySlug)}
                >
                  {/* Header Section */}
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-primary-500 mb-3"
                    />
                    <div className="flex items-center justify-center mb-2">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="text-yellow-400 fill-yellow-400"
                          size={18}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote Section */}
                  <div className="flex-1 mb-4">
                    <p className="text-sm sm:text-base text-secondary-800 text-center leading-relaxed">
                      "{t.text}"
                    </p>
                  </div>

                  {/* Customer Info Section */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="font-semibold text-primary-600 text-sm sm:text-base">
                      {t.name}
                    </span>
                    <img
                      src={t.badge}
                      alt={t.source + " review"}
                      className="h-4 sm:h-5"
                    />
                  </div>

                  {/* Details Section */}
                  <div className="text-center space-y-1 mb-3">
                    <p className="text-xs sm:text-sm text-gray-600">
                      {t.location}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {t.system}
                    </p>
                  </div>

                  {/* Savings Highlight */}
                  <div className="bg-green-100 rounded-lg p-3 mt-auto">
                    <p className="text-base sm:text-lg font-bold text-green-700 text-center">
                      {t.savings}
                    </p>
                    <p className="text-xs text-green-600 text-center mt-1">
                      {t.beforeAfter}
                    </p>
                  </div>

                  {/* Click to view more indicator */}
                  <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                    View Details
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
