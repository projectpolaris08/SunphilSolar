import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  notes?: string;
  projectType?: string;
  systemCapacity?: string;
  solarPanels?: string;
  battery?: string;
  batteryMultiplier?: number;
  clientName?: string;
  adminClient?: string;
  adminClientOther?: string;
}

interface CalendarEventsContextType {
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const CalendarEventsContext = createContext<
  CalendarEventsContextType | undefined
>(undefined);

export const useCalendarEvents = () => {
  const ctx = useContext(CalendarEventsContext);
  if (!ctx)
    throw new Error(
      "useCalendarEvents must be used within CalendarEventsProvider"
    );
  return ctx;
};

export const CalendarEventsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from("calendar_events")
        .select("*");

      if (supabaseError) {
        setError(supabaseError.message);
        return;
      }

      if (data) {
        const mappedEvents = data.map((ev: any) => ({
          ...ev,
          start: new Date(ev.start_date),
          end: new Date(ev.end_date),
          systemCapacity: ev.system_capacity,
          solarPanels: ev.solar_panels,
          batteryMultiplier: ev.battery_multiplier,
          projectType: ev.project_type,
          // Add more mappings as needed
        }));
        setEvents(mappedEvents);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <CalendarEventsContext.Provider
      value={{
        events,
        setEvents,
        loading,
        error,
        refetch: fetchEvents,
      }}
    >
      {children}
    </CalendarEventsContext.Provider>
  );
};
