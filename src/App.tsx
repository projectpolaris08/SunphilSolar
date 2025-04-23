import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Features } from './components/Features';
import Calculator from './components/Calculator';
import { Services } from './components/Services';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

function App() {
  return (
    <Layout>
      <Hero />
      <Stats />
      <Features />
      <Calculator />
      <Services />
      <ContactForm />
      <Footer />
    </Layout>
  );
}

export default App;