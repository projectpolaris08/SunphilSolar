import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { ArrowLeft, Plus, RefreshCw, AlertTriangle } from "lucide-react";

interface BuildSummary {
  total: number;
  inProgress: number;
  done: number;
}

interface Build {
  id: number;
  type: string;
  description: string;
  builder: string;
  status: string;
  date_started: string | null;
  date_completed: string | null;
}

interface Activity {
  id: string;
  module: string;
  record_id: string;
  action: string;
  description: string;
  timestamp: string;
}

const inverterTypes = [
  "3kW",
  "6kW",
  "8kW",
  "12kW",
  "16kW",
  "18kW",
  "24kW",
  "32kW",
];
const batteryTypes = [
  "24v 280Ah",
  "24v 314Ah",
  "48v 280Ah",
  "48v 314Ah",
  "51.2v 280Ah",
  "51.2v 314Ah",
];
const builderNames = ["Joshua", "David", "Mark", "Dong"];

const BuildersPage = () => {
  const navigate = useNavigate();
  const [inverterSummary, setInverterSummary] = useState<BuildSummary>({
    total: 0,
    inProgress: 0,
    done: 0,
  });
  const [batterySummary, setBatterySummary] = useState<BuildSummary>({
    total: 0,
    inProgress: 0,
    done: 0,
  });
  const [inverterBuilds, setInverterBuilds] = useState<Build[]>([]);
  const [batteryBuilds, setBatteryBuilds] = useState<Build[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Fetch all data
  const fetchData = async () => {
    // Inverter builds
    const { data: inverterData } = await supabase
      .from("inverter_builds")
      .select("*");
    if (inverterData) {
      setInverterBuilds(inverterData);
      setInverterSummary({
        total: inverterData.length,
        inProgress: inverterData.filter((b: any) => b.status === "In Progress")
          .length,
        done: inverterData.filter((b: any) => b.status === "Done").length,
      });
    }
    // Battery builds
    const { data: batteryData } = await supabase
      .from("battery_builds")
      .select("*");
    if (batteryData) {
      setBatteryBuilds(batteryData);
      setBatterySummary({
        total: batteryData.length,
        inProgress: batteryData.filter((b: any) => b.status === "In Progress")
          .length,
        done: batteryData.filter((b: any) => b.status === "Done").length,
      });
    }
    // Recent activity - fetch all activities and filter for builder-related ones
    const { data: activityData, error: activityError } = await supabase
      .from("admin_activity")
      .select("*")
      .eq("module", "builder")
      .order("timestamp", { ascending: false })
      .limit(5);

    if (activityError) {
      console.error("Activity fetch error:", activityError);
    }

    if (activityData && activityData.length > 0) {
      console.log("Fetched builder activities:", activityData);
      setActivity(activityData);
    } else {
      console.log(
        "No builder activities found, fetching all activities for debugging"
      );
      // Fallback: fetch all activities to see what's available
      const { data: allActivityData } = await supabase
        .from("admin_activity")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(10);

      if (allActivityData) {
        console.log("All available activities:", allActivityData);
        // Show all activities for debugging, but mark them
        setActivity(
          allActivityData.map((a) => ({
            ...a,
            description:
              a.description + (a.module !== "builder" ? ` [${a.module}]` : ""),
          }))
        );
      } else {
        setActivity([]);
      }
    }

    setLastUpdated(new Date().toLocaleString());
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Builder breakdown
  const builderBreakdown = builderNames.map((name) => ({
    name,
    inverter: inverterBuilds.filter((b) => b.builder === name),
    battery: batteryBuilds.filter((b) => b.builder === name),
  }));

  // Type breakdown
  const inverterTypeBreakdown = inverterTypes.map((type) => ({
    type,
    count: inverterBuilds.filter((b) => b.type === type).length,
  }));
  const batteryTypeBreakdown = batteryTypes.map((type) => ({
    type,
    count: batteryBuilds.filter((b) => b.type === type).length,
  }));

  // Progress bar
  const totalBuilds = inverterSummary.total + batterySummary.total;
  const totalDone = inverterSummary.done + batterySummary.done;
  const progressPercent = totalBuilds
    ? Math.round((totalDone / totalBuilds) * 100)
    : 0;

  // Next scheduled completion
  const nextCompletion = [...inverterBuilds, ...batteryBuilds]
    .filter((b) => b.status === "In Progress" && b.date_completed)
    .sort((a, b) =>
      (a.date_completed || "").localeCompare(b.date_completed || "")
    )[0];

  // Issues/alerts: overdue = in progress and date_started > 30 days ago
  const now = new Date();
  const overdueBuilds = [...inverterBuilds, ...batteryBuilds].filter((b) => {
    if (b.status !== "In Progress" || !b.date_started) return false;
    const started = new Date(b.date_started);
    const diff = (now.getTime() - started.getTime()) / (1000 * 60 * 60 * 24);
    return diff > 30;
  });

  return (
    <div className="w-full p-2 sm:p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Header - Mobile Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/admin")}
            className="mr-3 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold dark:text-gray-100">
            Builders Summary
          </h1>
        </div>
        {/* Action Buttons - Stack on mobile */}
        <div className="flex flex-wrap gap-2">
          <button
            className="flex items-center gap-1 bg-blue-600 text-white px-2 sm:px-3 py-2 rounded font-semibold hover:bg-blue-700 transition text-xs sm:text-sm"
            onClick={() => navigate("/admin/builders/inverter")}
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Add Inverter</span>
            <span className="sm:hidden">Inverter</span>
          </button>
          <button
            className="flex items-center gap-1 bg-blue-600 text-white px-2 sm:px-3 py-2 rounded font-semibold hover:bg-blue-700 transition text-xs sm:text-sm"
            onClick={() => navigate("/admin/builders/battery")}
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Add Battery</span>
            <span className="sm:hidden">Battery</span>
          </button>
          <button
            className="flex items-center gap-1 bg-gray-200 text-gray-700 px-2 sm:px-3 py-2 rounded font-semibold hover:bg-gray-300 transition text-xs sm:text-sm"
            onClick={fetchData}
          >
            <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Refresh</span>
            <span className="sm:hidden">Refresh</span>
          </button>
        </div>
      </div>

      {/* Progress and Alerts Row - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
        {/* Progress Bar */}
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mb-1">
            <span className="text-sm font-medium dark:text-gray-200">
              Overall Progress
            </span>
            <span className="text-sm font-medium dark:text-gray-200">
              {progressPercent}% Done ({totalDone}/{totalBuilds})
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        {/* Alerts */}
        <div>
          {overdueBuilds.length > 0 && (
            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-3 rounded flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              <span>{overdueBuilds.length} overdue</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Grid - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {/* Left Column - Summary Cards */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
            {/* Inverter Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 border border-gray-100 dark:border-gray-700">
              <h2 className="text-base sm:text-lg font-semibold mb-2 dark:text-gray-100">
                Inverter Builds
              </h2>
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-blue-700 dark:text-blue-300">
                {inverterSummary.total}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded text-xs font-semibold">
                  In Progress: {inverterSummary.inProgress}
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-2 py-1 rounded text-xs font-semibold">
                  Done: {inverterSummary.done}
                </span>
              </div>
              <button
                className="w-full bg-blue-600 text-white px-3 sm:px-4 py-2 rounded font-semibold hover:bg-blue-700 transition text-xs sm:text-sm"
                onClick={() => navigate("/admin/builders/inverter")}
              >
                View Inverter Builds
              </button>
            </div>
            {/* Battery Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 border border-gray-100 dark:border-gray-700">
              <h2 className="text-base sm:text-lg font-semibold mb-2 dark:text-gray-100">
                Battery Builds
              </h2>
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-blue-700 dark:text-blue-300">
                {batterySummary.total}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded text-xs font-semibold">
                  In Progress: {batterySummary.inProgress}
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-2 py-1 rounded text-xs font-semibold">
                  Done: {batterySummary.done}
                </span>
              </div>
              <button
                className="w-full bg-blue-600 text-white px-3 sm:px-4 py-2 rounded font-semibold hover:bg-blue-700 transition text-xs sm:text-sm"
                onClick={() => navigate("/admin/builders/battery")}
              >
                View Battery Builds
              </button>
            </div>
          </div>

          {/* Next Completion */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 border border-gray-100 dark:border-gray-700 mt-3 sm:mt-4">
            <h3 className="text-sm font-semibold mb-2 dark:text-gray-100">
              Next Completion
            </h3>
            {nextCompletion ? (
              <div className="bg-green-50 text-green-800 p-3 rounded text-sm">
                <div>
                  {nextCompletion.type} for {nextCompletion.builder}
                </div>
                <div>
                  Expected: {nextCompletion.date_completed?.slice(0, 10)}
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-sm">
                No upcoming completions
              </div>
            )}
          </div>
        </div>

        {/* Center Column - Breakdowns */}
        <div className="lg:col-span-1">
          {/* Builder Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 border border-gray-100 dark:border-gray-700 mb-3 sm:mb-4">
            <h3 className="text-sm font-semibold mb-3 dark:text-gray-100">
              Builder Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {builderBreakdown.map((b) => (
                <div
                  key={b.name}
                  className="bg-gray-50 dark:bg-gray-900 rounded p-3"
                >
                  <div className="font-semibold text-blue-700 dark:text-blue-200 text-sm">
                    {b.name}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded text-xs">
                      Inv: {b.inverter.length}
                    </span>
                    <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-2 py-1 rounded text-xs">
                      Bat: {b.battery.length}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                    Done:{" "}
                    {b.inverter.filter((x) => x.status === "Done").length +
                      b.battery.filter((x) => x.status === "Done").length}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Type Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold mb-3 dark:text-gray-100">
              Type Breakdown
            </h3>
            <div className="space-y-3">
              <div>
                <div className="font-semibold dark:text-gray-200">
                  Inverter Types
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {inverterTypeBreakdown.map((t) => (
                    <span
                      key={t.type}
                      className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 px-2 py-1 rounded text-xs"
                    >
                      {t.type}: {t.count}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-semibold dark:text-gray-200">
                  Battery Types
                </div>
                <div className="flex flex-wrap gap-2">
                  {batteryTypeBreakdown.map((t) => (
                    <span
                      key={t.type}
                      className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 px-2 py-1 rounded text-xs"
                    >
                      {t.type}: {t.count}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Activity */}
        <div className="lg:col-span-2 xl:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold mb-3 dark:text-gray-100">
              Recent Activity
            </h3>
            <div className="space-y-2 max-h-64 sm:max-h-96 overflow-y-auto">
              {activity.length === 0 && (
                <div className="text-gray-400 dark:text-gray-400 text-sm">
                  No recent activity.
                </div>
              )}
              {activity.map((a) => (
                <div
                  key={a.id}
                  className="border-l-2 border-blue-500 pl-3 py-2"
                >
                  <div className="text-gray-800 dark:text-gray-200 text-sm break-words">
                    {a.description}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(a.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center sm:text-right text-xs text-gray-500 dark:text-gray-300">
        Last updated: {lastUpdated}
      </div>
    </div>
  );
};

export default BuildersPage;
