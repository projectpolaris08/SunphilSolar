import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // Correct path to your AppRoutes
import CookieBanner from "./components/CookieBanner";
import ScrollToTop from "./components/ScrollToTop";
import ChatBot from "./components/ChatBot";
import SplashCursor from "./components/SplashCursor";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { CalendarEventsProvider } from "./contexts/CalendarEventsContext";

function App() {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // Add this inner component to access useLocation
  function AppWithChatBot() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");
    return (
      <>
        <CookieBanner />
        <ScrollToTop />
        <AppRoutes
          googleMapsApiKey={GOOGLE_MAPS_API_KEY}
          weatherApiKey={WEATHER_API_KEY}
        />
        {/* Only show ChatBot if not on /admin routes */}
        {!isAdminRoute && <ChatBot />}
      </>
    );
  }

  return (
    <CalendarEventsProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <AppWithChatBot />
          <SplashCursor />
        </BrowserRouter>
      </AdminAuthProvider>
    </CalendarEventsProvider>
  );
}

export default App;
