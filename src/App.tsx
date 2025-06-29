import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // Correct path to your AppRoutes
import CookieBanner from "./components/CookieBanner";
import ScrollToTop from "./components/ScrollToTop";
import ChatBot from "./components/ChatBot";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { CalendarEventsProvider } from "./contexts/CalendarEventsContext";

function App() {
  const GOOGLE_MAPS_API_KEY =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY";
  const WEATHER_API_KEY =
    import.meta.env.VITE_WEATHER_API_KEY || "YOUR_OPENWEATHERMAP_API_KEY";

  return (
    <CalendarEventsProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <CookieBanner />
          <ScrollToTop />
          {/* You can pass your API keys as props to AppRoutes if needed */}
          <AppRoutes
            googleMapsApiKey={GOOGLE_MAPS_API_KEY}
            weatherApiKey={WEATHER_API_KEY}
          />
          <ChatBot />
        </BrowserRouter>
      </AdminAuthProvider>
    </CalendarEventsProvider>
  );
}

export default App;
