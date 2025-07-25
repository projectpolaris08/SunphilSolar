import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../calendar-dark.css";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useCalendarEvents } from "../contexts/CalendarEventsContext";
import { supabase } from "../lib/supabaseClient";
import DayEventsModal from "../components/DayEventsModal";

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface ProjectEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  notes?: string;
  projectType?: string;
  systemCapacity?: string;
  systemCapacityMultiplier?: number;
  solarPanels?: string;
  battery?: string;
  batteryMultiplier?: number;
  clientName?: string;
  adminClient?: string;
  adminClientOther?: string;
}

// Color palettes for admin clients
const adminBorderColors = [
  "border-blue-500",
  "border-green-500",
  "border-yellow-500",
  "border-purple-500",
  "border-pink-500",
  "border-red-500",
  "border-indigo-500",
  "border-teal-500",
  "border-orange-500",
  "border-cyan-500",
  "border-blue-700",
  "border-green-700",
  "border-yellow-700",
  "border-purple-700",
  "border-pink-700",
  "border-red-700",
  "border-indigo-700",
  "border-teal-700",
  "border-orange-700",
  "border-cyan-700",
];
const adminBgColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-red-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-cyan-500",
  "bg-blue-700",
  "bg-green-700",
  "bg-yellow-700",
  "bg-purple-700",
  "bg-pink-700",
  "bg-red-700",
  "bg-indigo-700",
  "bg-teal-700",
  "bg-orange-700",
  "bg-cyan-700",
];

const CalendarPage: React.FC = () => {
  const { setEvents } = useCalendarEvents();
  const [events, setLocalEvents] = useState<ProjectEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<
    Partial<ProjectEvent> & { startTime?: string; endTime?: string }
  >({
    start: new Date(),
    end: new Date(),
    startTime: format(new Date(), "HH:mm"),
    endTime: format(new Date(), "HH:mm"),
    systemCapacityMultiplier: 1,
  });
  const [selected, setSelected] = useState<ProjectEvent | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const [showDayModal, setShowDayModal] = useState(false);
  const [modalEvents, setModalEvents] = useState<any[]>([]);

  // Get unique admin clients and assign colors
  const uniqueAdminClients = Array.from(
    new Set(events.map((ev) => ev.adminClient).filter(Boolean))
  );
  // Count events per admin client
  const adminClientEventCount: Record<string, number> = events.reduce(
    (acc, ev) => {
      if (ev.adminClient) {
        acc[ev.adminClient] = (acc[ev.adminClient] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  // Calculate total system capacity and battery requirements
  const capacitySummary = events.reduce(
    (acc, event) => {
      if (event.systemCapacity) {
        const capacity = event.systemCapacity.replace("kW", "");
        const capacityNum = parseFloat(capacity);
        if (!isNaN(capacityNum)) {
          const multiplier = event.systemCapacityMultiplier || 1;
          acc.totalSystemCapacity += capacityNum * multiplier;
          acc.capacityBreakdown[capacity] =
            (acc.capacityBreakdown[capacity] || 0) + multiplier;
        }
      }

      if (event.battery && event.battery !== "None") {
        const batteryKey = event.battery;
        acc.batteryBreakdown[batteryKey] =
          (acc.batteryBreakdown[batteryKey] || 0) +
          (event.batteryMultiplier || 1);
        acc.totalBatteries += event.batteryMultiplier || 1;
      }

      return acc;
    },
    {
      totalSystemCapacity: 0,
      capacityBreakdown: {} as Record<string, number>,
      batteryBreakdown: {} as Record<string, number>,
      totalBatteries: 0,
    }
  );
  const adminClientColorMap = uniqueAdminClients.reduce((acc, client, idx) => {
    if (client === "Boss Gar") {
      acc[client] = { border: "border-orange-600", bg: "bg-orange-400" };
    } else if (client === "Madam Kat") {
      acc[client] = { border: "border-fuchsia-600", bg: "bg-fuchsia-400" };
    } else {
      acc[client!] = {
        border: adminBorderColors[idx % adminBorderColors.length],
        bg: adminBgColors[idx % adminBgColors.length],
      };
    }
    return acc;
  }, {} as Record<string, { border: string; bg: string }>);

  // Fetch events from Supabase on mount
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("calendar_events")
        .select("*")
        .order("start_date", { ascending: true });

      if (error) {
        console.error("Error fetching calendar events:", error);
      } else {
        const mappedEvents = (data || []).map((event) => ({
          id: event.id,
          title: event.title,
          start: new Date(event.start_date),
          end: new Date(event.end_date),
          location: event.location,
          notes: event.notes,
          projectType: event.project_type,
          systemCapacity: event.system_capacity,
          systemCapacityMultiplier: event.system_capacity_multiplier,
          solarPanels: event.solar_panels,
          battery: event.battery,
          batteryMultiplier: event.battery_multiplier,
          clientName: event.client_name,
          adminClient: event.admin_client,
          adminClientOther: event.admin_client_other,
        }));
        setLocalEvents(mappedEvents);
        setEvents(mappedEvents);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [setEvents]);

  const handleSelectSlot = ({ start }: { start: Date }) => {
    // Normalize the clicked day to midnight
    const clickedDay = new Date(start);
    clickedDay.setHours(0, 0, 0, 0);

    // Find all events for the clicked day
    const eventsForDay = events.filter((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      eventStart.setHours(0, 0, 0, 0);
      eventEnd.setHours(0, 0, 0, 0);
      return eventStart <= clickedDay && eventEnd >= clickedDay;
    });

    setModalEvents(eventsForDay);
    setShowDayModal(true);
  };

  const handleSelectEvent = (event: ProjectEvent) => {
    setForm(event);
    setSelected(event);
    setShowForm(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    setDeleteEventId(eventId);
    setShowDeleteModal(true);
  };

  const confirmDeleteEvent = async () => {
    if (!deleteEventId) return;
    const { error } = await supabase
      .from("calendar_events")
      .delete()
      .eq("id", deleteEventId);
    if (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    } else {
      setLocalEvents(events.filter((ev) => ev.id !== deleteEventId));
      setEvents(events.filter((ev) => ev.id !== deleteEventId));
      setShowForm(false);
      setSelected(null);
      await supabase.from("admin_activity").insert([
        {
          module: "calendar",
          record_id: deleteEventId,
          action: "deleted",
          description: `Deleted calendar event (${deleteEventId})`,
          actor: null,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
    setShowDeleteModal(false);
    setDeleteEventId(null);
  };

  const cancelDeleteEvent = () => {
    setShowDeleteModal(false);
    setDeleteEventId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.start || !form.end || !form.startTime || !form.endTime) return;

    // Combine date and time for start
    const startDate = new Date(form.start);
    const [startHour, startMinute] = form.startTime.split(":");
    startDate.setHours(Number(startHour), Number(startMinute), 0, 0);

    // Combine date and time for end
    const endDate = new Date(form.end);
    const [endHour, endMinute] = form.endTime.split(":");
    endDate.setHours(Number(endHour), Number(endMinute), 0, 0);

    const eventTitle =
      form.clientName && form.projectType
        ? `${form.clientName} - ${form.projectType}`
        : form.clientName || form.projectType || "Project";

    const eventData = {
      title: eventTitle,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      location: form.location,
      notes: form.notes,
      project_type: form.projectType,
      system_capacity: form.systemCapacity,
      system_capacity_multiplier: form.systemCapacityMultiplier,
      solar_panels: form.solarPanels,
      battery: form.battery,
      battery_multiplier: form.batteryMultiplier,
      client_name: form.clientName,
      admin_client: form.adminClient,
      admin_client_other: form.adminClientOther,
    };

    if (selected) {
      // Update existing event
      const { error } = await supabase
        .from("calendar_events")
        .update(eventData)
        .eq("id", selected.id);

      if (error) {
        console.error("Error updating event:", error);
        alert("Failed to update event");
        return;
      }
      await supabase.from("admin_activity").insert([
        {
          module: "calendar",
          record_id: selected.id,
          action: "updated",
          description: `Updated calendar event: ${eventTitle}`,
          actor: null,
          timestamp: new Date().toISOString(),
        },
      ]);

      const updatedEvents = events.map((ev) =>
        ev.id === selected.id
          ? ({
              ...form,
              id: selected.id,
              title: eventTitle,
              systemCapacityMultiplier: form.systemCapacityMultiplier,
            } as ProjectEvent)
          : ev
      );
      setLocalEvents(updatedEvents);
      setEvents(updatedEvents);
    } else {
      // Create new event
      const { data, error } = await supabase
        .from("calendar_events")
        .insert(eventData)
        .select()
        .single();

      if (error) {
        console.error("Error creating event:", error);
        alert("Failed to create event");
        return;
      }
      await supabase.from("admin_activity").insert([
        {
          module: "calendar",
          record_id: data.id,
          action: "created",
          description: `Created calendar event: ${eventTitle}`,
          actor: null,
          timestamp: new Date().toISOString(),
        },
      ]);

      const newEvent: ProjectEvent = {
        id: data.id,
        title: eventTitle,
        start: startDate,
        end: endDate,
        location: form.location,
        notes: form.notes,
        projectType: form.projectType,
        systemCapacity: form.systemCapacity,
        systemCapacityMultiplier: form.systemCapacityMultiplier,
        solarPanels: form.solarPanels,
        battery: form.battery,
        batteryMultiplier: form.batteryMultiplier,
        clientName: form.clientName,
        adminClient: form.adminClient,
        adminClientOther: form.adminClientOther,
      };

      setLocalEvents([...events, newEvent]);
      setEvents([...events, newEvent]);
    }

    setShowForm(false);
    setForm({
      start: new Date(),
      end: new Date(),
      startTime: format(new Date(), "HH:mm"),
      endTime: format(new Date(), "HH:mm"),
      systemCapacityMultiplier: 1,
    });
    setSelected(null);
  };

  // Custom event component for calendar (now inside CalendarPage)
  const CalendarEvent: React.FC<{ event: ProjectEvent }> = ({ event }) => {
    const colorClass =
      event.adminClient &&
      typeof event.adminClient === "string" &&
      adminClientColorMap[event.adminClient]
        ? adminClientColorMap[event.adminClient].border
        : "border-blue-300";
    return (
      <div
        className={`border-2 ${colorClass} border-opacity-80 rounded p-0.5 shadow text-[11px] min-h-[28px] leading-tight bg-white dark:bg-gray-900`}
      >
        <div className="font-semibold text-gray-900 dark:text-gray-100 truncate">
          {event.clientName || event.title}
        </div>
        {event.projectType && (
          <div className="text-gray-800 dark:text-gray-200 truncate">
            {event.projectType}
          </div>
        )}
        {event.location && (
          <div className="text-gray-700 dark:text-gray-300 truncate">
            {event.location}
          </div>
        )}
        {event.systemCapacity && (
          <div className="text-gray-700 dark:text-gray-300 truncate">
            {event.systemCapacity}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-full w-full mx-auto py-8 px-4 md:px-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1"
            aria-label="Back"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold">Project Calendar</h1>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow flex items-center gap-2"
          onClick={() => {
            setForm({
              start: new Date(),
              end: new Date(),
              startTime: format(new Date(), "HH:mm"),
              endTime: format(new Date(), "HH:mm"),
            });
            setSelected(null);
            setShowForm(true);
          }}
        >
          + Add Schedule
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="text-lg">Loading calendar events...</div>
        </div>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 900, width: "100%" }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          popup
          onShowMore={(events, date) => {
            // Filter events that actually occur on the clicked date
            const filteredEvents = events.filter((event) => {
              const eventStart = new Date(event.start);
              const eventEnd = new Date(event.end);
              // Normalize times for all-day comparison
              const clicked = new Date(date);
              clicked.setHours(0, 0, 0, 0);
              eventStart.setHours(0, 0, 0, 0);
              eventEnd.setHours(0, 0, 0, 0);
              // Check if the clicked date is within the event's start and end (inclusive)
              return eventStart <= clicked && eventEnd >= clicked;
            });
            setModalEvents(filteredEvents);
            setShowDayModal(true);
          }}
          messages={{
            showMore: (total) => `+${total} more events`,
          }}
          components={{ event: CalendarEvent }}
        />
      )}

      {/* Capacity and Battery Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow">
          <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            System Capacity Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Total Capacity:
              </span>
              <span className="font-bold text-blue-600">
                {capacitySummary.totalSystemCapacity} kW
              </span>
            </div>
            <div className="border-t pt-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Breakdown:
              </span>
              {Object.entries(capacitySummary.capacityBreakdown).map(
                ([capacity, count]) => (
                  <div key={capacity} className="flex justify-between text-sm">
                    <span>{capacity}kW:</span>
                    <span className="font-medium">{count} units</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow">
          <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            Battery Requirements
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Total Batteries:
              </span>
              <span className="font-bold text-green-600">
                {capacitySummary.totalBatteries} units
              </span>
            </div>
            <div className="border-t pt-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Breakdown:
              </span>
              {Object.entries(capacitySummary.batteryBreakdown).map(
                ([battery, count]) => (
                  <div key={battery} className="flex justify-between text-sm">
                    <span>{battery}:</span>
                    <span className="font-medium">{count} units</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Client Legend */}
      <div className="mt-8 flex flex-wrap gap-4 items-center justify-center">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 shadow text-gray-900 dark:text-gray-100">
          <span className="font-semibold mr-2">Legend: Admin Clients</span>
          {uniqueAdminClients.map((client) =>
            typeof client === "string" ? (
              <span
                key={client}
                className="inline-flex items-center mr-3 mb-1 px-2 py-1 rounded text-xs font-medium"
              >
                <span
                  className={`w-3 h-3 rounded-full mr-2 inline-block ${adminClientColorMap[client].bg}`}
                ></span>
                {client}{" "}
                <span className="ml-1 text-gray-500 dark:text-gray-400">
                  ({adminClientEventCount[client] || 0})
                </span>
              </span>
            ) : null
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto text-gray-900 dark:text-gray-100"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold dark:text-gray-100">
                {selected ? "Edit" : "Add"} Project Schedule
              </h2>
              {selected && (
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(selected.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Delete event"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
            <input
              required
              value={form.clientName || ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, clientName: e.target.value }))
              }
              placeholder="Client's Name"
              className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            />
            <input
              required
              value={form.location || ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
              placeholder="Project Location"
              className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            />
            <div className="mt-2">
              <label className="block text-xs mb-1 dark:text-gray-200">
                Admin Client
              </label>
              <select
                value={form.adminClient || ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    adminClient: e.target.value,
                    adminClientOther: "",
                  }))
                }
                className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                required
              >
                <option value="" disabled>
                  Select Admin Client
                </option>
                <option value="Admin Thea">Admin Thea</option>
                <option value="Admin Ely">Admin Ely</option>
                <option value="Admin Nat">Admin Nat</option>
                <option value="Admin Diana">Admin Diana</option>
                <option value="Admin Jen">Admin Jen</option>
                <option value="Admin Aira">Admin Aira</option>
                <option value="Mark">Mark</option>
                <option value="Erwin">Erwin</option>
                <option value="Admin Jayar">Admin Jayar</option>
                <option value="Ruel">Ruel</option>
                <option value="Admin Aleth">Admin Aleth</option>
                <option value="Admin Smile">Admin Smile</option>
                <option value="Admin Arni">Admin Arni</option>
                <option value="Admin Emz">Admin Emz</option>
                <option value="Boss Gar">Boss Gar</option>
                <option value="Madam Kat">Madam Kat</option>
                <option value="Others">Others</option>
              </select>
              {form.adminClient === "Others" && (
                <input
                  type="text"
                  value={form.adminClientOther || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, adminClientOther: e.target.value }))
                  }
                  placeholder="Enter admin client name"
                  className="border px-3 py-2 rounded w-full mt-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  required
                />
              )}
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs mb-1 dark:text-gray-200">
                  Project Type
                </label>
                <select
                  value={form.projectType || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, projectType: e.target.value }))
                  }
                  className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  required
                >
                  <option value="" disabled>
                    Select Project Type
                  </option>
                  <option value="Residential Solar Installation">
                    Residential Solar Installation
                  </option>
                  <option value="Commercial Solar Installation">
                    Commercial Solar Installation
                  </option>
                  <option value="Battery Only">Battery Only</option>
                  <option value="Inverter Only">Inverter Only</option>
                  <option value="Solar Panels Only">Solar Panels Only</option>
                  <option value="Delivery">Delivery</option>
                  <option value="For Pick-up">For Pick-up</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs mb-1 dark:text-gray-200">
                  System Capacity (Optional)
                </label>
                <select
                  value={form.systemCapacity || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, systemCapacity: e.target.value }))
                  }
                  className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                >
                  <option value="">Select Capacity (Optional)</option>
                  <option value="6kW">6kW</option>
                  <option value="8kW">8kW</option>
                  <option value="12kW">12kW</option>
                  <option value="16kW">16kW</option>
                  <option value="18kW">18kW</option>
                  <option value="24kW">24kW</option>
                  <option value="32kW">32kW</option>
                </select>
              </div>
            </div>
            {form.systemCapacity && (
              <div className="mt-2">
                <label className="block text-xs mb-1 dark:text-gray-200">
                  System Capacity Multiplier
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.systemCapacityMultiplier || 1}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      systemCapacityMultiplier: Number(e.target.value),
                    }))
                  }
                  className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  placeholder="1"
                />
              </div>
            )}
            <div className="flex gap-4 mt-2">
              <div className="flex-1">
                <label className="block text-xs mb-1 dark:text-gray-200">
                  Solar Panels Quantity (Optional)
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.solarPanels || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, solarPanels: e.target.value }))
                  }
                  className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  placeholder="Number of panels (optional)"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs mb-1 dark:text-gray-200">
                  Battery (Optional)
                </label>
                <select
                  value={form.battery || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, battery: e.target.value }))
                  }
                  className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                >
                  <option value="">None</option>
                  <option value="12v 280Ah">12v 280Ah</option>
                  <option value="12v 314Ah">12v 314Ah</option>
                  <option value="24v 280Ah">24v 280Ah</option>
                  <option value="24v 314Ah">24v 314Ah</option>
                  <option value="48v 280Ah">48v 280Ah</option>
                  <option value="48v 314Ah">48v 314Ah</option>
                  <option value="51.2v 280Ah">51.2v 280Ah</option>
                  <option value="51.2v 314Ah">51.2v 314Ah</option>
                </select>
              </div>
            </div>
            {form.battery && (
              <div className="mt-2">
                <label className="block text-xs mb-1 dark:text-gray-200">
                  Battery Multiplier
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.batteryMultiplier || 1}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      batteryMultiplier: Number(e.target.value),
                    }))
                  }
                  className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  placeholder="1"
                />
              </div>
            )}
            <div className="flex gap-4 mt-2">
              <div className="flex-1">
                <label className="block text-xs mb-1 dark:text-gray-200">
                  Start Date
                </label>
                <input
                  type="date"
                  value={form.start ? format(form.start, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    const newDate = new Date(
                      e.target.value + "T" + (form.startTime || "00:00")
                    );
                    setForm((f) => ({
                      ...f,
                      start: newDate,
                      end:
                        !selected || (f.end && f.end < newDate)
                          ? newDate
                          : f.end,
                    }));
                  }}
                  className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs mb-1 dark:text-gray-200">
                  End Date
                </label>
                <input
                  type="date"
                  value={form.end ? format(form.end, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    const newDate = new Date(
                      e.target.value + "T" + (form.endTime || "00:00")
                    );
                    setForm((f) => ({ ...f, end: newDate }));
                  }}
                  className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <div className="flex-1">
                <label className="block text-xs mb-1 dark:text-gray-200">
                  Start Time
                </label>
                <input
                  type="time"
                  value={form.startTime || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, startTime: e.target.value }))
                  }
                  className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs mb-1 dark:text-gray-200">
                  End Time
                </label>
                <input
                  type="time"
                  value={form.endTime || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, endTime: e.target.value }))
                  }
                  className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  required
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-xs mb-1 dark:text-gray-200">
                Notes
              </label>
              <textarea
                value={form.notes || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                rows={2}
                placeholder="Enter notes (optional)"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setSelected(null);
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {showDayModal && (
        <DayEventsModal
          events={modalEvents}
          onClose={() => setShowDayModal(false)}
          onEdit={(event) => {
            setForm({
              ...event,
              startTime: format(new Date(event.start), "HH:mm"),
              endTime: format(new Date(event.end), "HH:mm"),
            });
            setSelected(event);
            setShowForm(true);
            setShowDayModal(false);
          }}
          onDelete={(event) => {
            setDeleteEventId(event.id);
            setShowDeleteModal(true);
            setShowDayModal(false);
          }}
        />
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-2 text-center text-gray-900 dark:text-gray-100">
              Delete Schedule?
            </h3>
            <p className="mb-4 text-center text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this event? This action cannot be
              undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDeleteEvent}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteEvent}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
