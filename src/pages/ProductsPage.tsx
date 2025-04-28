import React, { useState } from 'react';
import { Battery, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'battery' | 'inverter'>('battery');
  const navigate = useNavigate();

  const batteries = [
    {
      id: 'battery-1',
      icon: <Battery className="h-10 w-10 text-primary-500" />, 
      title: '24V 280AH (6.7kWh) LiFePO4 Battery',
      brand: 'EVE Brand',
      warranty: '3 Years Warranty',
      price: 'Php 45,000.00',
    },
    {
      id: 'battery-2',
      icon: <Battery className="h-10 w-10 text-primary-500" />, 
      title: '24V 314AH (7.5kWh) LiFePO4 Battery',
      brand: 'EVE Brand',
      warranty: '3 Years Warranty',
      price: 'Php 57,000.00',
    },
    {
      id: 'battery-3',
      icon: <Battery className="h-10 w-10 text-primary-500" />, 
      title: '51.2V 280AH (14kWh) LiFePO4 Battery',
      brand: 'EVE Brand',
      warranty: '3 Years Warranty',
      price: 'Php 85,000.00',
    },
    {
      id: 'battery-4',
      icon: <Battery className="h-10 w-10 text-primary-500" />, 
      title: '51.2V 314AH (16kWh) LiFePO4 Battery',
      brand: 'EVE Brand',
      warranty: '3 Years Warranty',
      price: 'Php 95,000.00',
    },
  ];

  const inverters = [
    {
      id: 'inverter-1',
      icon: <Zap className="h-10 w-10 text-primary-500" />, 
      title: '3kW LVTOPSUN Hybrid Inverter',
      brand: 'LVTOPSUN',
      warranty: '5 Years Warranty',
      price: 'Php 35,000.00',
    },
    {
      id: 'inverter-2',
      icon: <Zap className="h-10 w-10 text-primary-500" />, 
      title: '6kW Deye Hybrid Inverter',
      brand: 'Deye',
      warranty: '5 Years Warranty',
      price: 'Php 70,000.00',
    },
    {
      id: 'inverter-3',
      icon: <Zap className="h-10 w-10 text-primary-500" />, 
      title: '8kW Deye Hybrid Inverter',
      brand: 'Deye',
      warranty: '5 Years Warranty',
      price: 'Php 100,000.00',
    },
    {
      id: 'inverter-4',
      icon: <Zap className="h-10 w-10 text-primary-500" />, 
      title: '12kW Deye Hybrid Inverter',
      brand: 'Deye',
      warranty: '5 Years Warranty',
      price: 'Php 135,000.00',
    },
    {
      id: 'inverter-5',
      icon: <Zap className="h-10 w-10 text-primary-500" />, 
      title: '16kW Deye Hybrid Inverter',
      brand: 'Deye',
      warranty: '5 Years Warranty',
      price: 'Php 175,000.00',
    },
  ];

  const handleBuyNow = (product: { id: string; title: string; price: string }) => {
    navigate('/contact', {
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
    <section id="products" className="py-20 bg-secondary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">Our Products</h2>
          <div className="h-1 w-20 bg-primary-500 mx-auto rounded mb-6"></div>
          <p className="text-lg text-secondary-600">
            Explore our high-quality batteries and pre-assembled hybrid inverters.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 space-x-4">
          <button
            onClick={() => setActiveTab('battery')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeTab === 'battery'
                ? 'bg-primary-500 text-white shadow-elevation-2'
                : 'bg-white text-secondary-700 border border-primary-500 hover:bg-primary-100'
            }`}
          >
            Battery Storage
          </button>
          <button
            onClick={() => setActiveTab('inverter')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeTab === 'inverter'
                ? 'bg-primary-500 text-white shadow-elevation-2'
                : 'bg-white text-secondary-700 border border-primary-500 hover:bg-primary-100'
            }`}
          >
            Pre-assembled Inverters
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === 'battery' ? batteries : inverters).map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="mb-5 text-center">{product.icon}</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3 text-center">
                {product.title}
              </h3>
              <div className="flex flex-col items-center space-y-2 mb-4">
                <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: '#0077b6', color: 'white' }}>
                  {product.brand}
                </span>
                <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: '#ffd500', color: 'black' }}>
                  {product.warranty}
                </span>
              </div>
              <p className="text-primary-500 font-bold mb-4 text-center">{product.price}</p>
              <button
                onClick={() => handleBuyNow(product)}
                className="block w-full text-center px-4 py-2 bg-primary-500 text-white font-semibold rounded-md hover:bg-primary-600 transition-colors duration-300"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
