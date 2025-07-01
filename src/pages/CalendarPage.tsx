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
  solarPanels?: string;
  battery?: string;
  batteryMultiplier?: number;
  clientName?: string;
  adminClient?: string;
  adminClientOther?: string;
}

// Custom event component for calendar
const CalendarEvent: React.FC<{ event: ProjectEvent }> = ({ event }) => (
  <div className="bg-white border border-blue-300 rounded p-0.5 shadow text-[11px] min-h-[28px] leading-tight">
    <div className="font-semibold text-gray-900 truncate">
      {event.clientName || event.title}
    </div>
    {event.projectType && (
      <div className="text-gray-800 truncate">{event.projectType}</div>
    )}
    {event.location && (
      <div className="text-gray-700 truncate">{event.location}</div>
    )}
    {event.systemCapacity && (
      <div className="text-gray-700 truncate">{event.systemCapacity}</div>
    )}
  </div>
);

const CalendarPage: React.FC = () => {
  const { events, setEvents } = useCalendarEvents();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<
    Partial<ProjectEvent> & { startTime?: string; endTime?: string }
  >({
    start: new Date(),
    end: new Date(),
    startTime: format(new Date(), "HH:mm"),
    endTime: format(new Date(), "HH:mm"),
  });
  const [selected, setSelected] = useState<ProjectEvent | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const [showDayModal, setShowDayModal] = useState(false);
  const [modalEvents, setModalEvents] = useState<any[]>([]);

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
          solarPanels: event.solar_panels,
          battery: event.battery,
          batteryMultiplier: event.battery_multiplier,
          clientName: event.client_name,
          adminClient: event.admin_client,
          adminClientOther: event.admin_client_other,
        }));
        setEvents(mappedEvents);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [setEvents]);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setForm({ start, end });
    setSelected(null);
    setShowForm(true);
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

      setEvents(
        events.map((ev) =>
          ev.id === selected.id
            ? ({ ...form, id: selected.id, title: eventTitle } as ProjectEvent)
            : ev
        )
      );
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
        solarPanels: form.solarPanels,
        battery: form.battery,
        batteryMultiplier: form.batteryMultiplier,
        clientName: form.clientName,
        adminClient: form.adminClient,
        adminClientOther: form.adminClientOther,
      };

      setEvents([...events, newEvent]);
    }

    setShowForm(false);
    setForm({
      start: new Date(),
      end: new Date(),
      startTime: format(new Date(), "HH:mm"),
      endTime: format(new Date(), "HH:mm"),
    });
    setSelected(null);
  };

  return (
    <div className="max-w-full w-full mx-auto py-8 px-4 md:px-8">
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="focus:outline-none hover:bg-gray-100 rounded-full p-1"
          aria-label="Back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold">Project Calendar</h1>
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
                <option value="Jhoy Bengzon">Jhoy Bengzon</option>
                <option value="Retchel Grace Tillo">Retchel Grace Tillo</option>
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
                  <option value="Delivery">Delivery</option>
                  <option value="For Pick-up">For Pick-up</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs mb-1 dark:text-gray-200">
                  System Capacity
                </label>
                <select
                  value={form.systemCapacity || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, systemCapacity: e.target.value }))
                  }
                  className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  required
                >
                  <option value="" disabled>
                    Select Capacity
                  </option>
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
            <div className="flex gap-4 mt-2">
              <div className="flex-1">
                <label className="block text-xs mb-1 dark:text-gray-200">
                  Solar Panels Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.solarPanels || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, solarPanels: e.target.value }))
                  }
                  className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  placeholder="Number of panels"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs mb-1 dark:text-gray-200">
                  Battery
                </label>
                <select
                  value={form.battery || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, battery: e.target.value }))
                  }
                  className="border px-3 py-2 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                >
                  <option value="">None</option>
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
