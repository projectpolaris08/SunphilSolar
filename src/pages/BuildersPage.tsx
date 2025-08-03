import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { format } from "date-fns";
import {
  ArrowLeft,
  Plus,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  Users,
  Zap,
  Battery,
  Clock,
  CheckCircle,
  Activity,
} from "lucide-react";

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
const builderNames = ["Joshua", "David", "Mark", "Sam", "Eron", "Buboy"];

// Assign a unique color to each builder
const builderColorMap: Record<
  string,
  { text: string; invBg: string; batBg: string; gradient: string }
> = {
  Joshua: {
    text: "text-blue-700 dark:text-blue-200",
    invBg: "bg-blue-600",
    batBg: "bg-green-600",
    gradient: "from-blue-500 to-blue-600",
  },
  David: {
    text: "text-green-700 dark:text-green-200",
    invBg: "bg-green-600",
    batBg: "bg-green-600",
    gradient: "from-green-500 to-green-600",
  },
  Mark: {
    text: "text-purple-700 dark:text-purple-200",
    invBg: "bg-purple-600",
    batBg: "bg-green-600",
    gradient: "from-purple-500 to-purple-600",
  },

  Sam: {
    text: "text-orange-700 dark:text-orange-200",
    invBg: "bg-orange-600",
    batBg: "bg-green-600",
    gradient: "from-orange-500 to-orange-600",
  },
  Eron: {
    text: "text-cyan-700 dark:text-cyan-200",
    invBg: "bg-cyan-600",
    batBg: "bg-green-600",
    gradient: "from-cyan-500 to-cyan-600",
  },
  Buboy: {
    text: "text-indigo-700 dark:text-indigo-200",
    invBg: "bg-indigo-600",
    batBg: "bg-green-600",
    gradient: "from-indigo-500 to-indigo-600",
  },
};

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
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
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
    // Calendar events
    const { data: eventsData, error: eventsError } = await supabase
      .from("calendar_events")
      .select("*")
      .order("start_date", { ascending: true });
    if (!eventsError && eventsData) {
      setCalendarEvents(eventsData);
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
      setActivity(activityData);
    } else {
      // Fallback: fetch all activities to see what's available
      const { data: allActivityData } = await supabase
        .from("admin_activity")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(10);

      if (allActivityData) {
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

  // Current in-progress builds
  const inProgressBuilds = [...inverterBuilds, ...batteryBuilds]
    .filter((b) => b.status === "In Progress")
    .sort((a, b) => (a.date_started || "").localeCompare(b.date_started || ""));

  // Issues/alerts: overdue = in progress and date_started > 30 days ago
  const now = new Date();
  const overdueBuilds = [...inverterBuilds, ...batteryBuilds].filter((b) => {
    if (b.status !== "In Progress" || !b.date_started) return false;
    const started = new Date(b.date_started);
    const diff = (now.getTime() - started.getTime()) / (1000 * 60 * 60 * 24);
    return diff > 30;
  });

  // Monthly distribution from calendar events
  const monthlyDistribution = calendarEvents.reduce(
    (acc, event) => {
      const monthKey = format(new Date(event.start_date), "yyyy-MM");
      const monthName = format(new Date(event.start_date), "MMMM yyyy");

      if (!acc[monthKey]) {
        acc[monthKey] = {
          monthName,
          totalSystemCapacity: 0,
          capacityBreakdown: {} as Record<string, number>,
          batteryBreakdown: {} as Record<string, number>,
          totalBatteries: 0,
        };
      }

      // System capacity calculation
      if (event.system_capacity) {
        const capacity = event.system_capacity.replace("kW", "");
        const capacityNum = parseFloat(capacity);
        if (!isNaN(capacityNum)) {
          const multiplier = event.system_capacity_multiplier || 1;
          acc[monthKey].totalSystemCapacity += capacityNum * multiplier;
          acc[monthKey].capacityBreakdown[capacity] =
            (acc[monthKey].capacityBreakdown[capacity] || 0) + multiplier;
        }
      }

      // Battery calculation
      if (event.battery && event.battery !== "None") {
        const batteryKey = event.battery;
        acc[monthKey].batteryBreakdown[batteryKey] =
          (acc[monthKey].batteryBreakdown[batteryKey] || 0) +
          (event.battery_multiplier || 1);
        acc[monthKey].totalBatteries += event.battery_multiplier || 1;
      }

      return acc;
    },
    {} as Record<
      string,
      {
        monthName: string;
        totalSystemCapacity: number;
        capacityBreakdown: Record<string, number>;
        batteryBreakdown: Record<string, number>;
        totalBatteries: number;
      }
    >
  );

  // Sort months in descending order (most recent first)
  const sortedMonths = Object.keys(monthlyDistribution).sort((a, b) =>
    b.localeCompare(a)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="w-full px-3 sm:px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/admin")}
                className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Back to Dashboard"
              >
                <ArrowLeft className="h-4 w-4 text-gray-700 dark:text-gray-200" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Builders Summary
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Production overview and team performance
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                onClick={() => navigate("/admin/builders/inverter")}
              >
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Add Inverter</span>
                <span className="sm:hidden">Inverter</span>
              </button>
              <button
                className="flex items-center gap-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                onClick={() => navigate("/admin/builders/battery")}
              >
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Add Battery</span>
                <span className="sm:hidden">Battery</span>
              </button>
              <button
                className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 text-sm"
                onClick={fetchData}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Refresh</span>
                <span className="sm:hidden">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-3 sm:px-4 py-4">
        {/* Progress and Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {/* Progress Card */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-1.5 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">
                    Overall Progress
                  </h2>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {progressPercent}% Complete ({totalDone}/{totalBuilds}{" "}
                    builds)
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts Card */}
          <div>
            {overdueBuilds.length > 0 ? (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-bold text-yellow-800 dark:text-yellow-200 text-sm">
                    Overdue
                  </h3>
                </div>
                <p className="text-yellow-700 dark:text-yellow-300 text-xs">
                  {overdueBuilds.length} builds overdue
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-bold text-green-800 dark:text-green-200 text-sm">
                    On Track
                  </h3>
                </div>
                <p className="text-green-700 dark:text-green-300 text-xs">
                  No overdue builds
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Summary Cards */}
          <div className="space-y-4">
            {/* Inverter Summary Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-4 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900 dark:text-white">
                      Inverter Builds
                    </h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      System capacity
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {inverterSummary.total}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Total
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {inverterSummary.inProgress}
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    In Progress
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">
                    {inverterSummary.done}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Done
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                onClick={() => navigate("/admin/builders/inverter")}
              >
                View Inverter Builds
              </button>
            </div>

            {/* Battery Summary Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-4 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                    <Battery className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900 dark:text-white">
                      Battery Builds
                    </h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Energy storage
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {batterySummary.total}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Total
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {batterySummary.inProgress}
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    In Progress
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">
                    {batterySummary.done}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Done
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                onClick={() => navigate("/admin/builders/battery")}
              >
                View Battery Builds
              </button>
            </div>

            {/* In Progress Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  In Progress ({inProgressBuilds.length})
                </h3>
              </div>
              {inProgressBuilds.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {inProgressBuilds.slice(0, 5).map((build, index) => (
                    <div
                      key={`${build.type}-${build.builder}-${index}`}
                      className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 rounded-lg p-2 border border-slate-200 dark:border-slate-700"
                    >
                      <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                        {build.type} for {build.builder}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        Started: {build.date_started?.slice(0, 10) || "N/A"}
                      </div>
                    </div>
                  ))}
                  {inProgressBuilds.length > 5 && (
                    <div className="text-xs text-slate-600 dark:text-slate-300 text-center">
                      +{inProgressBuilds.length - 5} more...
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-500 dark:text-gray-400 text-center py-6">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                  <p className="text-xs">No builds in progress</p>
                </div>
              )}
            </div>
          </div>

          {/* Center Column - Breakdowns */}
          <div className="space-y-4">
            {/* Builder Breakdown Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Builder Breakdown
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {builderBreakdown.map((b) => (
                  <div
                    key={b.name}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`font-bold text-xs ${
                          builderColorMap[b.name]?.text ||
                          "text-blue-700 dark:text-blue-200"
                        }`}
                      >
                        {b.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Done:{" "}
                        {b.inverter.filter((x) => x.status === "Done").length +
                          b.battery.filter((x) => x.status === "Done").length}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <span
                        className={`px-2 py-1 rounded-full font-semibold text-white text-xs bg-gradient-to-r ${
                          builderColorMap[b.name]?.gradient ||
                          "from-blue-500 to-blue-600"
                        }`}
                      >
                        Inv: {b.inverter.length}
                      </span>
                      <span className="px-2 py-1 rounded-full font-semibold text-white text-xs bg-gradient-to-r from-green-500 to-green-600">
                        Bat: {b.battery.length}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Type Breakdown Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Type Breakdown
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2 text-sm">
                    <Zap className="h-3 w-3 text-blue-500" />
                    Inverter Types
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {inverterTypeBreakdown.map((t) => (
                      <span
                        key={t.type}
                        className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                      >
                        {t.type}: {t.count}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2 text-sm">
                    <Battery className="h-3 w-3 text-green-500" />
                    Battery Types
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {batteryTypeBreakdown.map((t) => (
                      <span
                        key={t.type}
                        className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
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
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-4 h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Recent Activity
                </h3>
              </div>
              <div className="space-y-3 h-[calc(100%-4rem)] overflow-y-auto">
                {activity.length === 0 ? (
                  <div className="text-center py-6">
                    <Activity className="h-8 w-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      No recent activity
                    </p>
                  </div>
                ) : (
                  activity.map((a) => (
                    <div
                      key={a.id}
                      className="relative pl-4 pb-3 border-l-2 border-orange-500 last:border-l-0 last:pb-0"
                    >
                      <div className="absolute left-0 top-0 w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full border border-white dark:border-gray-800 transform -translate-x-1"></div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                        <div className="text-gray-800 dark:text-gray-200 text-xs font-medium break-words">
                          {a.description}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(a.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Distribution Section */}
        {sortedMonths.length > 0 && (
          <div className="mt-6">
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">
              Monthly System Capacity & Battery Distribution (from Calendar)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedMonths.map((monthKey) => {
                const monthData = monthlyDistribution[monthKey];

                return (
                  <div
                    key={monthKey}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg"
                  >
                    <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 border-b pb-2 text-sm">
                      {monthData.monthName}
                    </h4>

                    {/* System Capacity Section */}
                    <div className="mb-4">
                      <h5 className="text-xs font-medium text-blue-600 mb-2 flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        System Capacity: {monthData.totalSystemCapacity} kW
                      </h5>
                      {Object.keys(monthData.capacityBreakdown).length > 0 ? (
                        <div className="space-y-1">
                          {Object.entries(monthData.capacityBreakdown)
                            .sort(
                              ([, a], [, b]) => (b as number) - (a as number)
                            )
                            .map(([capacity, count]) => (
                              <div
                                key={capacity}
                                className="flex justify-between text-xs"
                              >
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                  {capacity}kW:
                                </span>
                                <span className="font-medium">
                                  {count as number} units
                                </span>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          No capacity data
                        </div>
                      )}
                    </div>

                    {/* Battery Section */}
                    <div>
                      <h5 className="text-xs font-medium text-green-600 mb-2 flex items-center gap-1">
                        <Battery className="h-3 w-3" />
                        Batteries: {monthData.totalBatteries} total
                      </h5>
                      {Object.keys(monthData.batteryBreakdown).length > 0 ? (
                        <div className="space-y-1">
                          {Object.entries(monthData.batteryBreakdown)
                            .sort(
                              ([, a], [, b]) => (b as number) - (a as number)
                            )
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
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          Last updated: {lastUpdated}
        </div>
      </div>
    </div>
  );
};

export default BuildersPage;
