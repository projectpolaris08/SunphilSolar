import { useEffect } from "react";
import Calculator from "../components/Calculator";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ChevronRight } from "lucide-react";

export const CalculatorPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("CalculatorPage mounted, current path:", location.pathname);
    return () => console.log("CalculatorPage unmounted");
  }, [location.pathname]);

  return (
    <section className="py-20 bg-white">
      <Helmet>
        <title>Calculator | Sunphil Solar</title>
      </Helmet>
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-700">
            <li>
              <Link to="/" className="flex items-center hover:text-blue-600">
                <svg
                  className="mr-2"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9.75L12 4l9 5.75V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.75Z" />
                  <path d="M9 22V12h6v10" />
                </svg>
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={16} className="mx-1" />
              <span className="text-blue-600">Calculator</span>
            </li>
          </ol>
        </nav>
        <h1 className="text-3xl font-bold mb-8">Solar System Calculator</h1>
        <Calculator />
      </div>
    </section>
  );
};
