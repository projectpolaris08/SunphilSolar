import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { format } from "date-fns";

const batteryTypes = [
  "12v 280Ah",
  "12v 314Ah",
  "24v 280Ah",
  "24v 314Ah",
  "48v 280Ah",
  "48v 314Ah",
  "51.2v 280Ah",
  "51.2v 314Ah",
];

const builderNames = [
  "Joshua",
  "David",
  "Mark",
  "Eron",
  "Sam",
  "Buboy",
  "Jaxel",
];
const statusOptions = ["In Progress", "Done"];

type BatteryBuild = {
  id: number;
  type: string;
  description: string;
  builder: string;
  status: string;
  serial_number: string | null;
  date_started: string | null;
  date_completed: string | null;
};

// Assign a unique color to each builder
const builderColorMap: Record<
  string,
  { text: string; invBg: string; batBg: string }
> = {
  Joshua: {
    text: "text-blue-700 dark:text-blue-200",
    invBg: "bg-blue-600",
    batBg: "bg-green-600",
  },
  David: {
    text: "text-green-700 dark:text-green-200",
    invBg: "bg-green-600",
    batBg: "bg-green-600",
  },
  Mark: {
    text: "text-purple-700 dark:text-purple-200",
    invBg: "bg-purple-600",
    batBg: "bg-green-600",
  },

  Sam: {
    text: "text-orange-700 dark:text-orange-200",
    invBg: "bg-orange-600",
    batBg: "bg-green-600",
  },
  Eron: {
    text: "text-cyan-700 dark:text-cyan-200",
    invBg: "bg-cyan-600",
    batBg: "bg-green-600",
  },
  Buboy: {
    text: "text-indigo-700 dark:text-indigo-200",
    invBg: "bg-indigo-600",
    batBg: "bg-green-600",
  },
  Jaxel: {
    text: "text-yellow-700 dark:text-yellow-200",
    invBg: "bg-yellow-500",
    batBg: "bg-green-600",
  },
};

const BuildersBatteryPage = () => {
  const navigate = useNavigate();
  const [builds, setBuilds] = useState<BatteryBuild[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [newBuild, setNewBuild] = useState({
    type: batteryTypes[0],
    description: "",
    builder: builderNames[0],
    status: "In Progress",
    serial_number: "",
    date_started: null,
    date_completed: null,
  });

  // Fetch builds and calendar events from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Fetch battery builds
      const { data: buildsData, error: buildsError } = await supabase
        .from("battery_builds")
        .select("*")
        .order("created_at", { ascending: false });

      // Fetch calendar events
      const { data: eventsData, error: eventsError } = await supabase
        .from("calendar_events")
        .select("*")
        .order("start_date", { ascending: true });

      if (!buildsError && buildsData) setBuilds(buildsData);
      if (!eventsError && eventsData) setCalendarEvents(eventsData);

      setLoading(false);
    };
    fetchData();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    const now = new Date().toISOString();
    const update: { status: string; date_completed?: string | null } = {
      status,
    };
    if (status === "Done") update.date_completed = now;
    if (status === "In Progress") update.date_completed = null;

    const { data, error } = await supabase
      .from("battery_builds")
      .update(update)
      .eq("id", id)
      .select()
      .single();

    if (!error && data) {
      setBuilds((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...data } : b))
      );
      // Log activity
      await supabase.from("admin_activity").insert([
        {
          module: "builder",
          record_id: id,
          action: "status_changed",
          description: `Changed status of battery build (${data.type}) for ${data.builder} to ${status}`,
          actor: null,
          timestamp: now,
        },
      ]);
    }
  };

  const handleDelete = async (id: number) => {
    // Find the build for description
    const build = builds.find((b) => b.id === id);
    const { error } = await supabase
      .from("battery_builds")
      .delete()
      .eq("id", id);
    if (!error) {
      setBuilds((prev) => prev.filter((b) => b.id !== id));
      // Log activity
      await supabase.from("admin_activity").insert([
        {
          module: "builder",
          record_id: id,
          action: "deleted",
          description: build
            ? `Deleted battery build (${build.type}) for ${build.builder}`
            : `Deleted battery build (${id})`,
          actor: null,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  const filteredBuilds = filterType
    ? builds.filter((b) => b.type === filterType)
    : builds;

  // Pagination calculations
  const totalPages = Math.ceil(filteredBuilds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBuilds = filteredBuilds.slice(startIndex, endIndex);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

  // Summary calculations
  const totalBuilds = builds.length;
  const inProgressCount = builds.filter(
    (b) => b.status === "In Progress"
  ).length;
  const doneCount = builds.filter((b) => b.status === "Done").length;
  const builderCounts = builderNames.map((name) => ({
    name,
    count: builds.filter((b) => b.builder === name).length,
  }));
  const batteryTypeCounts = batteryTypes.map((type) => ({
    type,
    count: builds.filter((b) => b.type === type).length,
  }));

  // Monthly distribution from calendar events (batteries only)
  const monthlyDistribution = calendarEvents.reduce(
    (acc, event) => {
      if (event.battery && event.battery !== "None") {
        const monthKey = format(new Date(event.start_date), "yyyy-MM");
        const monthName = format(new Date(event.start_date), "MMMM yyyy");

        if (!acc[monthKey]) {
          acc[monthKey] = {
            monthName,
            totalBatteries: 0,
            batteryBreakdown: {} as Record<string, number>,
          };
        }

        // Count batteries
        const batteryMultiplier = event.battery_multiplier || 1;
        acc[monthKey].totalBatteries += batteryMultiplier;

        if (!acc[monthKey].batteryBreakdown[event.battery]) {
          acc[monthKey].batteryBreakdown[event.battery] = 0;
        }
        acc[monthKey].batteryBreakdown[event.battery] += batteryMultiplier;
      }
      return acc;
    },
    {} as Record<
      string,
      {
        monthName: string;
        totalBatteries: number;
        batteryBreakdown: Record<string, number>;
      }
    >
  );

  // Sort months in descending order (most recent first)
  const sortedMonths = Object.keys(monthlyDistribution).sort((a, b) =>
    b.localeCompare(a)
  );

  // Add build handler
  const handleAddBuild = async () => {
    if (!newBuild.description.trim()) {
      alert("Description is required.");
      return;
    }
    const now = new Date().toISOString().slice(0, 10);
    const buildToInsert = {
      ...newBuild,
      date_started: now,
      date_completed: newBuild.status === "Done" ? now : null,
    };
    const { data, error } = await supabase
      .from("battery_builds")
      .insert([buildToInsert])
      .select()
      .single();
    if (!error && data) {
      setBuilds((prev) => [data, ...prev]);
      setNewBuild({
        type: batteryTypes[0],
        description: "",
        builder: builderNames[0],
        status: "In Progress",
        serial_number: "",
        date_started: null,
        date_completed: null,
      });
      // Log activity
      await supabase.from("admin_activity").insert([
        {
          module: "builder",
          record_id: data.id,
          action: "created",
          description: `Added battery build (${data.type}) for ${data.builder}`,
          actor: null,
          timestamp: new Date().toISOString(),
        },
      ]);
    } else {
      alert("Failed to add build.");
    }
  };

  // Pagination controls
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  return (
    <div className="max-w-full w-full mx-auto py-8 px-4 md:px-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/admin")}
          className="focus:outline-none"
          aria-label="Back to Dashboard"
        >
          <svg
            className="h-6 w-6 text-black dark:text-gray-100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-black dark:text-gray-100">
          Battery Builders
        </h1>
      </div>
      {/* Summary Section */}
      <div className="text-2xl font-bold mb-2 dark:text-gray-100">
        Total Builds:{" "}
        <span className="text-black dark:text-gray-100">{totalBuilds}</span>
      </div>
      <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 mt-4">
        By Builder
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        {builderCounts.map((bc) => (
          <span
            key={bc.name}
            className={`inline-block px-4 py-2 rounded-full text-base font-bold shadow-sm text-white ${
              builderColorMap[bc.name]?.invBg || "bg-blue-600"
            }`}
          >
            {bc.name}: {bc.count}
          </span>
        ))}
      </div>
      <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 mt-4">
        By Status
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-4 py-2 rounded-full text-base font-bold shadow-sm">
          In Progress: {inProgressCount}
        </span>
        <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-4 py-2 rounded-full text-base font-bold shadow-sm">
          Done: {doneCount}
        </span>
      </div>
      <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 mt-4">
        By Battery Type
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
        {batteryTypeCounts.map((itc) => (
          <span
            key={itc.type}
            className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-base font-bold shadow-sm text-center"
          >
            {itc.type}: {itc.count}
          </span>
        ))}
      </div>

      {/* Monthly Distribution from Calendar */}
      {sortedMonths.length > 0 && (
        <>
          <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 mt-6">
            Monthly Distribution (from Calendar)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {sortedMonths.map((monthKey) => {
              const monthData = monthlyDistribution[monthKey];

              return (
                <div
                  key={monthKey}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow"
                >
                  <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 border-b pb-2">
                    {monthData.monthName}
                  </h4>

                  {/* Battery Section */}
                  <div>
                    <h5 className="text-sm font-medium text-green-600 mb-2">
                      Batteries: {monthData.totalBatteries} units
                    </h5>
                    {Object.keys(monthData.batteryBreakdown).length > 0 ? (
                      <div className="space-y-1">
                        {Object.entries(monthData.batteryBreakdown)
                          .sort(([, a], [, b]) => (b as number) - (a as number))
                          .map(([battery, count]) => (
                            <div
                              key={battery}
                              className="flex justify-between text-xs"
                            >
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {battery}:
                              </span>
                              <span className="font-medium">
                                {count as number} units
                              </span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        No battery data
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6 mt-4">
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Battery Type
          </label>
          <select
            value={newBuild.type}
            onChange={(e) =>
              setNewBuild((prev) => ({ ...prev, type: e.target.value }))
            }
            className="border rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {batteryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Description
          </label>
          <input
            type="text"
            value={newBuild.description}
            onChange={(e) =>
              setNewBuild((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Add new build description"
            className="border rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Serial Number
          </label>
          <input
            type="text"
            value={newBuild.serial_number}
            onChange={(e) =>
              setNewBuild((prev) => ({
                ...prev,
                serial_number: e.target.value,
              }))
            }
            placeholder="Enter serial number"
            className="border rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Builder Name
          </label>
          <select
            value={newBuild.builder}
            onChange={(e) =>
              setNewBuild((prev) => ({ ...prev, builder: e.target.value }))
            }
            className="border rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {builderNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Status
          </label>
          <select
            value={newBuild.status}
            onChange={(e) =>
              setNewBuild((prev) => ({ ...prev, status: e.target.value }))
            }
            className="border rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition mt-4 md:mt-0"
          onClick={handleAddBuild}
        >
          Add
        </button>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
          Filter by Battery Type
        </label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">All Types</option>
          {batteryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
        {loading ? (
          <div className="text-gray-700 dark:text-gray-200">Loading...</div>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-900 border-b dark:border-gray-700">
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                    Battery Type
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                    Description
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                    Builder Name
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                    Serial Number
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                    Date Started
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                    Date Completed
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentBuilds.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-gray-400 dark:text-gray-500 px-4 py-2 text-center"
                    >
                      No builds found.
                    </td>
                  </tr>
                )}
                {currentBuilds.map((b) => (
                  <tr key={b.id} className="border-b">
                    <td className="px-4 py-2">{b.type}</td>
                    <td className="px-4 py-2">{b.description}</td>
                    <td className="px-4 py-2">{b.builder}</td>
                    <td className="px-4 py-2">{b.serial_number || "-"}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <select
                        value={b.status}
                        onChange={(e) =>
                          handleStatusChange(b.id, e.target.value)
                        }
                        className="border rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:text-gray-400 dark:disabled:text-gray-500"
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {b.status === "In Progress" && (
                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                          <svg
                            className="animate-spin h-3 w-3 mr-1 text-blue-500"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                          Building
                        </span>
                      )}
                      {b.status === "Done" && (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                          <svg
                            className="h-3 w-3 mr-1 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Done
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {b.date_started ? b.date_started.slice(0, 10) : ""}
                    </td>
                    <td className="px-4 py-2">
                      {b.date_completed ? b.date_completed.slice(0, 10) : ""}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <span>
                    Showing {startIndex + 1} to{" "}
                    {Math.min(endIndex, filteredBuilds.length)} of{" "}
                    {filteredBuilds.length} builds
                  </span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`px-3 py-1 text-sm border rounded ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BuildersBatteryPage;
