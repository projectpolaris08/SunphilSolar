import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { CalculatorPage } from '../pages/CalculatorPage';
import { BlogPage } from '../pages/BlogPage';
import { Layout } from '../components/layout/Layout';
import ProductsPage from '../pages/ProductsPage';
import AboutPage from '../pages/AboutPage';
import { ContactForm } from '../components/sections/ContactForm'; 
import { PostPage } from '../pages/PostPage';
import { NotFoundPage } from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        {/* Main layout wrapper */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactForm />} />
          
          {/* Blog routes */}
          <Route path="/blog">
            <Route index element={<BlogPage />} />
            <Route path=":slug" element={<PostPage />} />
          </Route>
          
          {/* 404 handling */}
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;