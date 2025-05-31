import React from "react";
import Slider from "react-slick";
import { Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Maria Santos",
    photo: "/images/Maria.jpeg",
    text: "Sunphil Solar made the whole process easy and stress-free. Our electric bill dropped by 60%! Highly recommended!",
    rating: 5,
    source: "Google",
    badge: "/images/google-badge.png", // Add this image to your public/images folder
  },
  {
    name: "Jerome Chua",
    photo: "/images/Jerome-Chua.jpg",
    text: "Professional team, fast installation, and great after-sales support. I love my new solar system!",
    rating: 5,
    source: "Facebook",
    badge: "/images/facebook-badge.png", // Add this image to your public/images folder
  },
  {
    name: "Aira Mendoza",
    photo: "/images/Aira-Mendoza.jpeg",
    text: "The best investment for our home. Clean energy and big savings every month!",
    rating: 5,
    source: "Google",
    badge: "/images/google-badge.png",
  },
  {
    name: "Marvin Lucero",
    photo: "/images/Marvin-Lucero.jpg",
    text: "Excellent workmanship and very responsive support team. My solar system works flawlessly!",
    rating: 5,
    source: "Google",
    badge: "/images/facebook-badge.png",
  },
  {
    name: "Teofilo Calderon",
    photo: "/images/Teofilo-Calderon.jpg",
    text: "Great value for money and professional installation. Highly satisfied with Sunphil Solar!",
    rating: 5,
    source: "Facebook",
    badge: "/images/facebook-badge.png",
  },
];

export const Testimonials: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-2 sm:px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-secondary-900 text-center">
          What Our Customers Say
        </h2>
        <Slider {...settings}>
          {testimonials.map((t, idx) => (
            <div key={idx} className="px-3">
              <div className="relative bg-white border-2 border-blue-500 rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col items-center h-full w-full min-h-[380px] transition-all duration-300">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-primary-500 mb-4"
                />
                <div className="flex items-center justify-center mb-2">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-yellow-400"
                      size={20}
                    />
                  ))}
                </div>
                <p className="text-base sm:text-lg text-secondary-800 mb-4 text-center">
                  “{t.text}”
                </p>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="font-semibold text-primary-600 text-sm sm:text-base">
                    {t.name}
                  </span>
                  <img
                    src={t.badge}
                    alt={t.source + " review"}
                    className="h-5 sm:h-6"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
