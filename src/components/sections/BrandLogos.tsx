import React from "react";

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
];

export const BrandLogos: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Trusted Partners
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="w-full max-w-[200px] p-4 flex items-center justify-center hover:scale-105 transition-transform duration-300"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="w-full h-auto object-contain"
                style={{ maxHeight: "80px" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
