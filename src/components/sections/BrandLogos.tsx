import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const brands = [
  {
    name: "LVTopSun",
    logo: "/images/lvtopsun.png",
  },
  {
    name: "EVE",
    logo: "/images/EVE.png",
  },
  {
    name: "Deye",
    logo: "/images/Deye.png",
  },
  {
    name: "Canadian Solar",
    logo: "/images/CanadianSolar.png",
  },
  {
    name: "AESolar",
    logo: "/images/AESolar.png",
  },
  {
    name: "TrinaSolar",
    logo: "/images/Trinasolar.png",
  },
];

export const BrandLogos: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Trusted Partners
        </h2>
        <Slider {...settings}>
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center p-4"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="w-full h-auto object-contain"
                style={{ maxHeight: "80px", maxWidth: "180px" }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
