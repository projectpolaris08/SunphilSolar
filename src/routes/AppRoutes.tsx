import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { CalculatorPage } from '../pages/CalculatorPage';
import { BlogPage } from '../pages/BlogPage';
import { Layout } from '../components/layout/Layout';
import ProductsPage from '../pages/ProductsPage';
import AboutPage from '../pages/AboutPage';

const AppRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Full page structure */}
      <Routes>
        {/* Wrap main pages inside Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
