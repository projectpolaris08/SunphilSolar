import { Hero } from '../components/sections/Hero';
import { Stats } from '../components/sections/Stats';
import { Features } from '../components/sections/Features';
import { Services } from '../components/sections/Services';
import { ContactForm } from '../components/sections/ContactForm';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Services />
      <ContactForm />
    </>
  );
};