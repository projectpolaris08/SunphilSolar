import BeamsBackground from "@/components/BeamsBackground";
import { Features } from "../components/sections/Features";
import { Services } from "../components/sections/Services";

const ServicesPage = () => {
  return (
    <BeamsBackground intensity="medium">
      <section id="features">
        <Features />
      </section>
      <section id="services">
        <Services />
      </section>
    </BeamsBackground>
  );
};

export default ServicesPage;
