import { useEffect } from 'react';
import Calculator from '../components/Calculator';
import { useLocation } from 'react-router-dom';

export const CalculatorPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('CalculatorPage mounted, current path:', location.pathname);
    return () => console.log('CalculatorPage unmounted');
  }, [location.pathname]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Solar System Calculator</h1>
        
        {/* Only show calculator in development */}
        {import.meta.env.DEV ? (
          <Calculator />
        ) : (
          <div className="p-6 bg-gray-50 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Calculator Maintenance</h2>
            <p>Our solar calculator is currently being upgraded. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};