import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const batteryTypes = [
  "24v 280Ah",
  "24v 314Ah",
  "48v 280Ah",
  "48v 314Ah",
  "51.2v 280Ah",
  "51.2v 314Ah",
];

const builderNames = ["Joshua", "David", "Mark", "Dong"];
const statusOptions = ["In Progress", "Done"];

type BatteryBuild = {
  id: number;
  type: string;
  description: string;
  builder: string;
  status: string;
  date_started: string | null;
  date_completed: string | null;
};

const BuildersBatteryPage = () => {
  const navigate = useNavigate();
  const [builds, setBuilds] = useState<BatteryBuild[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [newBuild, setNewBuild] = useState({
    type: batteryTypes[0],
    description: "",
    builder: builderNames[0],
    status: "In Progress",
    date_started: null,
    date_completed: null,
  });

  // Fetch builds from Supabase on mount
  useEffect(() => {
    const fetchBuilds = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("battery_builds")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setBuilds(data);
      setLoading(false);
    };
    fetchBuilds();
  }, []);

  const handleAddBuild = async () => {
    if (!newBuild.description) return;
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("battery_builds")
      .insert([
        {
          type: newBuild.type,
          description: newBuild.description,
          builder: newBuild.builder,
          status: newBuild.status,
          date_started: now,
          date_completed: newBuild.status === "Done" ? now : null,
        },
      ])
      .select()
      .single();
    if (!error && data) {
      setBuilds((prev) => [data, ...prev]);
      setNewBuild({
        type: batteryTypes[0],
        description: "",
        builder: builderNames[0],
        status: "In Progress",
        date_started: null,
        date_completed: null,
      });
      setFilterType("");
      // Log activity
      await supabase.from("admin_activity").insert([
        {
          module: "builder",
          record_id: data.id,
          action: "created",
          description: `Created battery build (${data.type}) for ${data.builder}`,
          actor: null,
          timestamp: now,
        },
      ]);
    }
  };

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

  return (
    <div className="max-w-full w-full mx-auto py-8 px-4 md:px-8">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/admin")}
          className="focus:outline-none"
          aria-label="Back to Dashboard"
        >
          <svg
            className="h-6 w-6 text-black"
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
        <h1 className="text-2xl font-bold text-black">Battery Builders</h1>
      </div>
      {/* Summary Section */}
      <div className="mb-6 bg-gray-50 rounded p-6 flex flex-col gap-4 shadow-sm">
        <div className="text-2xl font-bold mb-2">
          Total Builds: <span className="text-black">{totalBuilds}</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-600 mb-1">
            By Builder
          </div>
          <div className="flex flex-wrap gap-3">
            {builderCounts.map((bc) => (
              <span
                key={bc.name}
                className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-base font-bold shadow-sm"
              >
                {bc.name}: {bc.count}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-600 mb-1">
            By Status
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-base font-bold shadow-sm">
              In Progress: {inProgressCount}
            </span>
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-base font-bold shadow-sm">
              Done: {doneCount}
            </span>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-600 mb-1">
            By Battery Type
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {batteryTypeCounts.map((btc) => (
              <span
                key={btc.type}
                className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-base font-bold shadow-sm text-center"
              >
                {btc.type}: {btc.count}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Battery Type</label>
          <select
            value={newBuild.type}
            onChange={(e) =>
              setNewBuild((prev) => ({ ...prev, type: e.target.value }))
            }
            className="border rounded px-3 py-2 w-full"
          >
            {batteryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            value={newBuild.description}
            onChange={(e) =>
              setNewBuild((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Add new build description"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Builder Name</label>
          <select
            value={newBuild.builder}
            onChange={(e) =>
              setNewBuild((prev) => ({ ...prev, builder: e.target.value }))
            }
            className="border rounded px-3 py-2 w-full"
          >
            {builderNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={newBuild.status}
            onChange={(e) =>
              setNewBuild((prev) => ({ ...prev, status: e.target.value }))
            }
            className="border rounded px-3 py-2 w-full"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="self-end">
          <button
            type="button"
            onClick={handleAddBuild}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={!newBuild.description.trim()}
          >
            Add
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Filter by Battery Type
        </label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-xs"
        >
          <option value="">All Types</option>
          {batteryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-white rounded shadow p-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left">Battery Type</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Builder Name</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date Started</th>
                <th className="px-4 py-2 text-left">Date Completed</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuilds.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-gray-400 px-4 py-2 text-center"
                  >
                    No builds yet.
                  </td>
                </tr>
              )}
              {filteredBuilds.map((b) => (
                <tr key={b.id} className="border-b">
                  <td className="px-4 py-2">{b.type}</td>
                  <td className="px-4 py-2">{b.description}</td>
                  <td className="px-4 py-2">{b.builder}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                      className="border rounded px-2 py-1"
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
        )}
      </div>
    </div>
  );
};

export default BuildersBatteryPage;
