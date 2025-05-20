import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { CalculatorPage } from "../pages/CalculatorPage";
import { BlogPage } from "../pages/BlogPage";
import { Layout } from "../components/layout/Layout";
import ProductsPage from "../pages/ProductsPage";
import AboutPage from "../pages/AboutPage";
import { ContactForm } from "../components/sections/ContactForm";
import { PostPage } from "../pages/PostPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import WeatherWidget from "../components/weather/WeatherWidget";
import ProjectsPage from "../pages/ProjectsPage";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Cookies from "../pages/Cookies";

interface AppRoutesProps {
  googleMapsApiKey?: string;
  weatherApiKey?: string;
}

const AppRoutes = ({
  googleMapsApiKey,
  weatherApiKey,
}: AppRoutesProps = {}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        {/* Main layout wrapper */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/calculator"
            element={<Navigate to="/solarcalculator" replace />}
          />
          <Route path="/solarcalculator" element={<CalculatorPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<Cookies />} />

          {/* Weather widget route */}
          <Route
            path="/weather"
            element={
              <div className="container mx-auto py-6">
                <h1 className="text-3xl font-bold mb-6">Weather Forecast</h1>
                <WeatherWidget
                  apiKey={weatherApiKey}
                  googleMapsApiKey={googleMapsApiKey}
                />
              </div>
            }
          />

          {/* Blog routes */}
          <Route path="/blog">
            <Route index element={<BlogPage />} />
            <Route path=":slug" element={<PostPage />} />
          </Route>

          {/* 404 fallback */}
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
