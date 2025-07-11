import { TrendingUp, BarChart3, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { projects } from "../data/projects";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import useAdminDarkMode from "../hooks/useAdminDarkMode";

// Demo/mock data for standalone page
const stats = {
  totalProjects: projects.length,
  totalClients: 73,
  totalSales: 29023000,
};
const inProgressProjects = 0;
const pendingProjects = 0;

interface AdminActivity {
  id: string;
  module: string;
  record_id: string;
  action: string;
  description: string;
  actor: string | null;
  timestamp: string;
}

const AnalyticsPage = () => {
  const [recentActivity, setRecentActivity] = useState<AdminActivity[]>([]);
  const [theme] = useAdminDarkMode();
  const [monthlySalesData, setMonthlySalesData] = useState<
    { month: string; sales: number }[]
  >([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueChange, setRevenueChange] = useState<number | null>(null);
  const [newClients, setNewClients] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [avgProjectDuration, setAvgProjectDuration] = useState<number | null>(
    null
  );
  const [projectDurationTarget, setProjectDurationTarget] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchActivity = async () => {
      const { data } = await supabase
        .from("admin_activity")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(10);
      if (data) setRecentActivity(data);
    };
    fetchActivity();
  }, []);

  useEffect(() => {
    const fetchSales = async () => {
      const { data } = await supabase
        .from("client_records")
        .select("date, amount");

      if (data) {
        // Aggregate sales by month
        const salesByMonth: Record<string, number> = {};
        let total = 0;
        data.forEach(({ date, amount }) => {
          if (!date || !amount) return;
          const month = new Date(date).toLocaleString("default", {
            month: "short",
            year: "numeric",
          });
          const amt = parseFloat(amount.toString().replace(/,/g, ""));
          if (!isNaN(amt)) {
            salesByMonth[month] = (salesByMonth[month] || 0) + amt;
            total += amt;
          }
        });
        // Sort months chronologically
        const sortedMonths = Object.keys(salesByMonth).sort(
          (a, b) => new Date("1 " + a).getTime() - new Date("1 " + b).getTime()
        );
        const len = sortedMonths.length;
        if (len >= 2) {
          const lastMonth = salesByMonth[sortedMonths[len - 2]];
          const thisMonth = salesByMonth[sortedMonths[len - 1]];
          if (lastMonth > 0) {
            setRevenueChange(((thisMonth - lastMonth) / lastMonth) * 100);
          } else {
            setRevenueChange(null);
          }
        } else {
          setRevenueChange(null);
        }
        // Convert to array for recharts and sort by date
        const chartData = Object.entries(salesByMonth)
          .map(([month, sales]) => ({ month, sales }))
          .sort(
            (a, b) =>
              new Date("1 " + a.month).getTime() -
              new Date("1 " + b.month).getTime()
          );
        setMonthlySalesData(chartData);
        setTotalRevenue(total);
        setTotalProjects(data.length);
      }
    };
    fetchSales();
  }, []);

  useEffect(() => {
    const fetchCalendarData = async () => {
      const { data } = await supabase
        .from("calendar_events")
        .select("client_name, start_date");

      if (data) {
        // Calculate new clients for the current month
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const clientsThisMonth = new Set();
        data.forEach(({ client_name, start_date }) => {
          if (!client_name || !start_date) return;
          const d = new Date(start_date);
          if (
            d.getMonth() === currentMonth &&
            d.getFullYear() === currentYear
          ) {
            clientsThisMonth.add(client_name.trim().toLowerCase());
          }
        });
        setNewClients(clientsThisMonth.size);
      }
    };
    fetchCalendarData();
  }, []);

  useEffect(() => {
    const fetchProjectDurations = async () => {
      const { data } = await supabase
        .from("calendar_events")
        .select("start_date, end_date");

      if (data) {
        const durations: number[] = [];
        data.forEach(({ start_date, end_date }) => {
          if (!start_date || !end_date) return;
          const start = new Date(start_date);
          const end = new Date(end_date);
          const diff =
            (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24); // days
          if (diff >= 0) durations.push(diff);
        });
        if (durations.length > 0) {
          const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
          setAvgProjectDuration(Math.round(avg));
        } else {
          setAvgProjectDuration(null);
        }
      }
    };
    fetchProjectDurations();
  }, []);

  useEffect(() => {
    const fetchProjectDurationTarget = async () => {
      const { data } = await supabase
        .from("calendar_events")
        .select("start_date, end_date");

      if (data) {
        const now = new Date();
        const lastYear = now.getFullYear() - 1;
        const durations: number[] = [];
        data.forEach(({ start_date, end_date }) => {
          if (!start_date || !end_date) return;
          const start = new Date(start_date);
          const end = new Date(end_date);
          if (start.getFullYear() === lastYear) {
            const diff =
              (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
            if (diff >= 0) durations.push(diff);
          }
        });
        if (durations.length > 0) {
          const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
          setProjectDurationTarget(Math.round(avg));
        } else {
          setProjectDurationTarget(null);
        }
      }
    };
    fetchProjectDurationTarget();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <div className="relative flex items-center justify-center min-h-[56px] mb-4">
        <h1 className="text-xl font-bold w-full text-center dark:text-gray-100">
          Analytics Overview
        </h1>
      </div>
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Sales</p>
              <p className="text-2xl font-bold">
                ₱{totalRevenue.toLocaleString()}
              </p>
              <p className="text-xs opacity-75">
                {revenueChange !== null
                  ? `${revenueChange > 0 ? "+" : ""}${revenueChange.toFixed(
                      1
                    )}% from last month`
                  : "No data for previous month"}
              </p>
            </div>
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Projects Completed</p>
              <p className="text-2xl font-bold">{stats.totalProjects}</p>
              <p className="text-xs opacity-75">100% completion rate</p>
            </div>
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <BarChart3 className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">New Clients</p>
              <p className="text-2xl font-bold">{newClients}</p>
              <p className="text-xs opacity-75">This month</p>
            </div>
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Avg. Project Value</p>
              <p className="text-2xl font-bold">
                ₱
                {totalProjects > 0
                  ? (totalRevenue / totalProjects)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : "0.00"}
              </p>
              <p className="text-xs opacity-75">Per project</p>
            </div>
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Revenue Trend */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Monthly Sales Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" height={40} tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(value) =>
                    value >= 1_000_000
                      ? `₱${(value / 1_000_000)
                          .toFixed(1)
                          .replace(/\.0$/, "")}M`
                      : `₱${(value / 1000).toFixed(0)}k`
                  }
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: theme === "dark" ? "#000" : "#fff",
                    color: theme === "dark" ? "#fff" : "#111",
                    border:
                      theme === "dark" ? "1px solid #fff" : "1px solid #e5e7eb",
                    borderRadius: 8,
                    fontSize: 16,
                    fontWeight: 700,
                    boxShadow:
                      theme === "dark"
                        ? "0 2px 12px rgba(0,0,0,0.9)"
                        : "0 2px 8px rgba(0,0,0,0.1)",
                    opacity: 1,
                    padding: 16,
                  }}
                  labelStyle={{
                    color: theme === "dark" ? "#fff" : "#111",
                    fontWeight: 900,
                    fontSize: 16,
                  }}
                  itemStyle={{
                    color: theme === "dark" ? "#fff" : "#111",
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                  formatter={(value) => [`₱${value.toLocaleString()}`, "Sales"]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Project Status Distribution */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Project Status Distribution
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Completed
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">100%</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stats.totalProjects} projects
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  In Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-yellow-600">
                  {inProgressProjects === 0 ? "0%" : ""}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {inProgressProjects} projects
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Pending
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">
                  {pendingProjects === 0 ? "0%" : ""}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {pendingProjects} projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Customer Satisfaction
          </h4>
          <div className="flex items-center mb-2">
            <div className="text-3xl font-bold text-green-600">4.8</div>
            <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              / 5.0
            </div>
          </div>
          <div className="flex text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Based on {stats.totalProjects} reviews
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Average Project Duration
          </h4>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {avgProjectDuration !== null ? `${avgProjectDuration} days` : "N/A"}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            From start to completion
          </p>
          <div className="mt-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Target:{" "}
                {projectDurationTarget !== null
                  ? `${projectDurationTarget} days`
                  : "N/A"}
              </span>
              <span className="text-green-600 font-medium">-10%</span>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Client Retention Rate
          </h4>
          <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Repeat customers
          </p>
          <div className="mt-3">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivity.length === 0 ? (
            <div className="text-gray-400 dark:text-gray-400 text-sm">
              No recent activity.
            </div>
          ) : (
            recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {activity.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
