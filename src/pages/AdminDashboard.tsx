import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  Settings,
  LogOut,
  Home,
  TrendingUp,
  Calendar,
  MessageSquare,
  Edit,
  Trash2,
  Menu,
  X,
  ArrowLeft,
  Eye,
  EyeOff,
  Wrench,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { useCalendarEvents } from "../contexts/CalendarEventsContext";
import { supabase } from "../lib/supabaseClient";
import {
  projects as importedProjects,
  Project as ImportedProject,
} from "../data/projects";

interface AdminStats {
  totalProjects: number;
  totalClients: number;
  totalSales: number;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  status: "draft" | "published";
}

interface AdminActivity {
  id: string;
  module: string;
  record_id: string;
  action: string;
  description: string;
  actor: string | null;
  timestamp: string;
}

const AdminDashboard: React.FC = () => {
  const { login, logout, user, isAuthenticated, loading } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [stats, setStats] = useState<AdminStats>({
    totalProjects: 36,
    totalClients: 0,
    totalSales: 0,
  });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "Solar Energy Trends 2024",
      slug: "solar-energy-trends-2024",
      excerpt: "Latest trends in solar energy technology",
      author: "Admin",
      publishedAt: "2024-01-10",
      status: "published",
    },
  ]);
  const navigate = useNavigate();
  const {
    events,
    loading: calendarLoading,
    error: calendarError,
    refetch: refetchEvents,
  } = useCalendarEvents();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clientRecords, setClientRecords] = useState<
    { date?: string; amount?: string | number }[]
  >([]);
  const [adminUsername, setAdminUsername] = useState(user?.email || "");
  const [adminPassword, setAdminPassword] = useState("");
  const [settingsMessage, setSettingsMessage] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [projects, setProjects] = useState<ImportedProject[]>(importedProjects);
  const location = useLocation();
  const [recentActivity, setRecentActivity] = useState<AdminActivity[]>([]);

  // Compute upcoming installations from calendar events (not projects)
  const now = new Date();
  console.log("📅 Current time:", now);
  console.log("📋 Available events:", events);
  console.log("🔄 Calendar loading state:", calendarLoading);
  console.log("❌ Calendar error:", calendarError);

  const upcomingInstallations = events
    .filter((ev) => new Date(ev.start) >= now)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 5);

  console.log("🚀 Upcoming installations:", upcomingInstallations);

  // Calculate pending projects as scheduled installations (future events)
  const pendingProjects = events.filter(
    (ev) => new Date(ev.start) > now
  ).length;

  // Calculate in-progress projects as events scheduled for today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const inProgressProjects = events.filter((ev) => {
    const evDate = new Date(ev.start);
    evDate.setHours(0, 0, 0, 0);
    return evDate.getTime() === today.getTime();
  }).length;

  // Calculate average project duration from calendar events
  const completedEvents = events.filter(
    (ev) => ev.start && ev.end && new Date(ev.end) < new Date()
  );
  const durations = completedEvents.map((ev) => {
    const start = new Date(ev.start);
    const end = new Date(ev.end);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  });
  const avgProjectDuration = durations.length
    ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
    : 0;

  useEffect(() => {
    const fetchClientRecords = async () => {
      const { data, error } = await supabase.from("client_records").select("*");
      if (!error && data) {
        setClientRecords(data);
        setStats((prev) => ({
          ...prev,
          totalClients: data.length,
          totalSales: data.reduce(
            (sum, r) =>
              sum +
              (parseFloat((r.amount || "0").toString().replace(/,/g, "")) || 0),
            0
          ),
        }));
      }
    };
    fetchClientRecords();
  }, []);

  useEffect(() => {
    setStats((prev) => ({
      ...prev,
      totalProjects: importedProjects.length,
    }));
  }, []);

  // Compute monthly sales data
  const getMonthlySalesData = () => {
    const monthlyData: { [key: string]: number } = {};
    clientRecords.forEach(
      (record: { date?: string; amount?: string | number }) => {
        const dateStr = record.date || "";
        let dateParts;
        if (dateStr.includes("-")) {
          dateParts = dateStr.split("-");
          // If format is YYYY-MM-DD
          if (dateParts[0].length === 4) {
            // e.g., 2025-06-16
            const month = new Date(dateStr).toLocaleString("en-US", {
              month: "short",
            });
            const year = dateParts[0];
            const monthKey = `${month}-${year}`;
            const amount = parseFloat(
              (record.amount || "0").toString().replace(/,/g, "")
            );
            if (!isNaN(amount)) {
              monthlyData[monthKey] = (monthlyData[monthKey] || 0) + amount;
            }
          } else {
            // e.g., 16-Jun-25
            const month = dateParts[1];
            const year =
              dateParts[2].length === 2 ? `20${dateParts[2]}` : dateParts[2];
            const monthKey = `${month}-${year}`;
            const amount = parseFloat(
              (record.amount || "0").toString().replace(/,/g, "")
            );
            if (!isNaN(amount)) {
              monthlyData[monthKey] = (monthlyData[monthKey] || 0) + amount;
            }
          }
        }
      }
    );
    return Object.entries(monthlyData)
      .map(([month, total]) => ({
        month,
        sales: total,
      }))
      .sort((a, b) => {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const [aMonth, aYear] = a.month.split("-");
        const [bMonth, bYear] = b.month.split("-");
        if (aYear !== bYear) return parseInt(aYear) - parseInt(bYear);
        return months.indexOf(aMonth) - months.indexOf(bMonth);
      });
  };

  const monthlySalesData = getMonthlySalesData();

  // Calculate new clients for the current month from clientRecords
  const nowDate = new Date();
  const thisMonth = nowDate.getMonth();
  const thisYear = nowDate.getFullYear();
  const newClients = clientRecords.filter((record) => {
    if (!record.date) return false;
    const date = new Date(record.date);
    return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
  }).length;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const success = await login(loginForm.email, loginForm.password);
      if (!success) {
        setLoginError("Invalid email or password");
      }
    } catch {
      setLoginError("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleEditProject = () => {
    // Implementation needed or leave empty
  };

  const handleEditBlog = () => {
    // Implementation needed or leave empty
  };

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects((prev: ImportedProject[]) =>
        prev.filter((p: ImportedProject) => p.id !== projectId)
      );
      setStats((prev) => ({ ...prev, totalProjects: prev.totalProjects - 1 }));
    }
  };

  const handleDeleteBlog = (blogId: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogPosts((prev) => prev.filter((b) => b.id !== blogId));
    }
  };

  const handleSaveAdminCredentials = async () => {
    if (!user) return;
    setSettingsMessage("");
    // Only update fields that are changed
    const updates: { username?: string; password?: string } = {};
    if (adminUsername && adminUsername !== user.email)
      updates.username = adminUsername;
    if (adminPassword) updates.password = adminPassword;
    if (Object.keys(updates).length === 0) {
      setSettingsMessage("No changes to save.");
      return;
    }
    const { error } = await supabase
      .from("admin_credentials")
      .update(updates)
      .eq("id", user.id);
    if (error) {
      setSettingsMessage("Failed to update credentials: " + error.message);
    } else {
      setSettingsMessage("Credentials updated successfully.");
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "projects", label: "Projects", icon: BarChart3 },
    {
      id: "builders",
      label: "Builders",
      icon: Wrench,
      link: "/admin/builders",
      subItems: [
        {
          id: "builders-inverter",
          label: "Inverter",
          link: "/admin/builders/inverter",
        },
        {
          id: "builders-battery",
          label: "Battery",
          link: "/admin/builders/battery",
        },
      ],
    },
    {
      id: "clients",
      label: "Client Records",
      icon: Users,
      link: "/admin/clients",
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: BarChart3,
      link: "/admin/inventory",
    },
    { id: "inquiries", label: "Inquiries", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
    {
      id: "calendar",
      label: "Calendar",
      icon: Calendar,
      link: "/admin/calendar",
    },
  ];

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

  // Helper for relative time
  function formatRelativeTime(dateString: string) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString();
  }

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-blue-100"
          style={{ minWidth: 340 }}
        >
          <div className="flex flex-col items-center mb-6">
            {/* Optional: Add your logo here */}
            {/* <img src='/logo.svg' alt='Logo' className='h-10 mb-2' /> */}
            <h2 className="text-3xl font-extrabold text-blue-700 mb-1">
              Admin Login
            </h2>
            <p className="text-gray-500 text-sm">Sign in to your dashboard</p>
          </div>
          {loginError && (
            <div className="mb-4 text-red-600 text-sm text-center rounded bg-red-50 py-2 px-3">
              {loginError}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 font-medium">
              Username
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              autoFocus
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showLoginPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10 transition"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowLoginPassword((v) => !v)}
                tabIndex={-1}
                aria-label={
                  showLoginPassword ? "Hide password" : "Show password"
                }
              >
                {showLoginPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-lg shadow"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  const renderDashboardContent = () => (
    <div className="w-full px-2 sm:px-4 py-4 space-y-4 sm:space-y-6">
      {/* Header with hamburger and centered title */}
      <div className="relative flex items-center justify-center min-h-[56px] mb-4">
        {/* Hamburger icon (only visible on mobile) */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden bg-white p-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-200"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu size={26} />
        </button>
        <h1 className="text-xl font-bold w-full text-center">Dashboard</h1>
      </div>
      {/* Stats Cards + Chart Row */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-1 gap-4 sm:gap-6 xl:col-span-1">
          <div className="bg-blue-50 rounded-lg shadow-md p-4 sm:p-6 w-full min-w-0 min-h-[100px] hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-700">
                  Total Projects
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {stats.totalProjects}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg shadow-md p-4 sm:p-6 w-full min-w-0 min-h-[100px] hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center">
              <div className="p-2 bg-green-500 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-700">
                  Total Clients
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {stats.totalClients}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg shadow-md p-4 sm:p-6 w-full min-w-0 min-h-[100px] hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex flex-col flex-grow min-w-0">
                <p className="text-sm font-medium text-purple-700">
                  Total Sales
                </p>
                <p className="text-2xl font-bold text-purple-900 break-words whitespace-normal">
                  ₱{stats.totalSales.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Monthly Sales Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 overflow-x-auto xl:col-span-3 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Sales Performance
          </h3>
          <div className="h-80 min-w-[320px]">
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
                  formatter={(value: number) => [
                    `₱${value.toLocaleString()}`,
                    "Sales",
                  ]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar dataKey="sales" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Upcoming Installations & Recent Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4">
        {/* Upcoming Installations */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Upcoming Installations
            </h3>
            <button
              onClick={refetchEvents}
              disabled={calendarLoading}
              className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {calendarLoading ? "Loading..." : "Refresh"}
            </button>
          </div>
          {calendarLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">
                Loading installations...
              </span>
            </div>
          ) : calendarError ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-2">Failed to load installations</p>
              <p className="text-sm text-gray-500 mb-4">{calendarError}</p>
              <button
                onClick={refetchEvents}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                Try Again
              </button>
            </div>
          ) : upcomingInstallations.length === 0 ? (
            <p className="text-gray-500">
              No upcoming installations scheduled.
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {upcomingInstallations.map((item, idx) => (
                <li
                  key={idx}
                  className="py-3 flex flex-col md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <span className="font-medium text-gray-900">
                      {item.title || item.clientName || "Installation"}
                    </span>{" "}
                    —
                    <span className="ml-1 text-gray-700">
                      {item.location || item.projectType || ""}
                    </span>
                  </div>
                  <div className="text-sm text-blue-700 font-semibold mt-1 md:mt-0">
                    {typeof item.start === "string"
                      ? new Date(item.start).toLocaleDateString()
                      : item.start.toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h3>
            <button
              onClick={() => {
                // Refetch activity
                supabase
                  .from("admin_activity")
                  .select("*")
                  .order("timestamp", { ascending: false })
                  .limit(10)
                  .then(({ data }) => {
                    if (data) setRecentActivity(data);
                  });
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Refresh
            </button>
          </div>
          {recentActivity.length === 0 ? (
            <p className="text-gray-500">No recent activity.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {recentActivity.map((activity) => {
                let dotColor = "bg-gray-400";
                if (activity.module === "builder") dotColor = "bg-green-500";
                else if (activity.module === "calendar")
                  dotColor = "bg-blue-500";
                else if (activity.module === "inventory")
                  dotColor = "bg-yellow-500";
                else if (activity.module === "client")
                  dotColor = "bg-purple-500";
                else if (activity.module === "project")
                  dotColor = "bg-orange-500";
                return (
                  <li
                    key={activity.id}
                    className="py-3 flex items-center gap-4"
                  >
                    <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatRelativeTime(activity.timestamp)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );

  const renderProjectsContent = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header with back icon and centered title */}
      <div className="relative flex items-center justify-center min-h-[56px] mb-4">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden bg-white p-2 rounded-lg shadow"
          onClick={() => setActiveTab("dashboard")}
          aria-label="Back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold w-full text-center">
          Manage Projects
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-end min-h-[56px] mb-6 gap-2 md:gap-0">
        <button
          onClick={() => setActiveTab("dashboard")}
          className="flex bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 items-center w-full md:w-auto justify-center md:justify-start mt-2 md:mt-0 text-sm gap-2 whitespace-nowrap"
        >
          <ArrowLeft size={24} />
          Back to Dashboard
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project: ImportedProject) => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {project.system}
                  </div>
                  <div className="text-sm text-gray-500">
                    {project.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">N/A</div>
                  <div className="text-sm text-gray-500">N/A</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(project.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditProject()}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBlogContent = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header with back icon and centered title */}
      <div className="relative flex items-center justify-center min-h-[56px] mb-4">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden bg-white p-2 rounded-lg shadow"
          onClick={() => setActiveTab("dashboard")}
          aria-label="Back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold w-full text-center">
          Manage Blog Posts
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-end min-h-[56px] mb-6 gap-2 md:gap-0">
        <button
          onClick={() => setActiveTab("dashboard")}
          className="flex bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 items-center w-full md:w-auto justify-center md:justify-start mt-2 md:mt-0 text-sm gap-2 whitespace-nowrap"
        >
          <ArrowLeft size={24} />
          Back to Dashboard
        </button>
      </div>
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{post.title}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  By {post.author} •{" "}
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">{post.excerpt}</p>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-2 ${
                    post.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </span>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEditBlog()}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteBlog(post.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInquiriesContent = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header with back icon and centered title */}
      <div className="relative flex items-center justify-center min-h-[56px] mb-4">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden bg-white p-2 rounded-lg shadow"
          onClick={() => setActiveTab("dashboard")}
          aria-label="Back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold w-full text-center">
          Customer Inquiries
        </h1>
      </div>
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">John Doe</h4>
              <p className="text-sm text-gray-500">john@example.com</p>
              <p className="text-sm text-gray-600 mt-2">
                Interested in residential solar installation for 5kW system
              </p>
            </div>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
              New
            </span>
          </div>
          <div className="mt-3 flex space-x-2">
            <button className="text-blue-600 hover:text-blue-900 text-sm">
              Reply
            </button>
            <button className="text-green-600 hover:text-green-900 text-sm">
              Mark as Read
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsContent = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header with back icon and centered title */}
      <div className="relative flex items-center justify-center min-h-[56px] mb-4">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden bg-white p-2 rounded-lg shadow"
          onClick={() => setActiveTab("dashboard")}
          aria-label="Back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold w-full text-center">
          Analytics Overview
        </h1>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Revenue</p>
              <p className="text-2xl font-bold">
                ₱{stats.totalSales.toLocaleString()}
              </p>
              <p className="text-xs opacity-75">+12.5% from last month</p>
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
                {(stats.totalSales / stats.totalProjects)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Revenue Trend
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
                  formatter={(value: number) => [
                    `₱${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Status Distribution */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Project Status Distribution
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">Completed</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">100%</span>
                <p className="text-xs text-gray-500">
                  {stats.totalProjects} projects
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">In Progress</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-yellow-600">
                  {inProgressProjects === 0 ? "0%" : ""}
                </span>
                <p className="text-xs text-gray-500">
                  {inProgressProjects} projects
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">Pending</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">
                  {pendingProjects === 0 ? "0%" : ""}
                </span>
                <p className="text-xs text-gray-500">
                  {pendingProjects} projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">
            Customer Satisfaction
          </h4>
          <div className="flex items-center mb-2">
            <div className="text-3xl font-bold text-green-600">4.8</div>
            <div className="ml-2 text-sm text-gray-500">/ 5.0</div>
          </div>
          <div className="flex text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Based on {stats.totalProjects} reviews
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">
            Average Project Duration
          </h4>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {avgProjectDuration} days
          </div>
          <p className="text-sm text-gray-600">From start to completion</p>
          <div className="mt-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Target: 20 days</span>
              <span className="text-green-600 font-medium">-10%</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">
            Client Retention Rate
          </h4>
          <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
          <p className="text-sm text-gray-600">Repeat customers</p>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                New project completed - 5kW residential system
              </p>
              <p className="text-sm text-gray-500">
                Client: Maria Santos • 2 hours ago
              </p>
            </div>
            <span className="text-sm font-medium text-green-600">₱250,000</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                New client inquiry received
              </p>
              <p className="text-sm text-gray-500">
                John Dela Cruz • 4 hours ago
              </p>
            </div>
            <span className="text-sm font-medium text-blue-600">Pending</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                Project installation started
              </p>
              <p className="text-sm text-gray-500">
                8kW commercial system • 1 day ago
              </p>
            </div>
            <span className="text-sm font-medium text-yellow-600">
              In Progress
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                Customer review submitted
              </p>
              <p className="text-sm text-gray-500">
                5-star rating • 2 days ago
              </p>
            </div>
            <span className="text-sm font-medium text-purple-600">★★★★★</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="relative flex items-center justify-center min-h-[56px] mb-4">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden bg-white p-2 rounded-lg shadow"
          onClick={() => setActiveTab("dashboard")}
          aria-label="Back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold w-full text-center">Settings</h1>
      </div>
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Profile Settings</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Admin Username
              </label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowLoginPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={
                    showLoginPassword ? "Hide password" : "Show password"
                  }
                >
                  {showLoginPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {settingsMessage && (
              <div className="text-sm mt-2 text-blue-600">
                {settingsMessage}
              </div>
            )}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Website Settings</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                defaultValue="Sunphil Solar Energy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                defaultValue="info@sunphil.com"
              />
            </div>
          </div>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={handleSaveAdminCredentials}
        >
          Save Changes
        </button>
      </div>
    </div>
  );

  // Sidebar rendering
  const renderSidebar = () => (
    <nav className="h-full flex flex-col gap-1 p-2">
      {menuItems.map((item) => {
        const isActive =
          activeTab === item.id ||
          (item.subItems && location.pathname.startsWith("/admin/builders"));
        return (
          <div key={item.id}>
            <button
              onClick={() => {
                setActiveTab(item.id);
                if (item.link) navigate(item.link);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left transition-colors duration-150
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-200
              `}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <span>
                {item.icon &&
                  React.createElement(item.icon, {
                    size: 22,
                    className: "mr-1",
                  })}
              </span>
              <span className="text-base font-medium">{item.label}</span>
            </button>
            {/* Render submenu if present and active */}
            {item.subItems && isActive && (
              <div className="ml-8 flex flex-col gap-1 mt-1">
                {item.subItems.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => navigate(sub.link)}
                    className={`text-left px-2 py-1 rounded-lg w-full transition-colors duration-150 ${
                      location.pathname === sub.link
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  // Main render
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          sidebarOpen ? "block" : "pointer-events-none"
        }`}
        style={{ background: sidebarOpen ? "rgba(0,0,0,0.3)" : "transparent" }}
        onClick={() => setSidebarOpen(false)}
        aria-hidden={!sidebarOpen}
      />
      <aside
        className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white shadow-lg z-50 flex flex-col transform transition-transform duration-300 md:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ minWidth: 220 }}
        aria-label="Sidebar Drawer"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-lg">Menu</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
              className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <X size={26} />
            </button>
          </div>
        </div>
        {renderSidebar()}
      </aside>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:h-screen md:bg-white md:shadow-lg md:sticky md:top-0">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-xl">Admin</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
        {renderSidebar()}
      </aside>
      {/* Main Content */}
      <main className="flex-1 w-0 min-w-0">
        {activeTab === "dashboard" && renderDashboardContent()}
        {activeTab === "projects" && renderProjectsContent()}
        {activeTab === "blog" && renderBlogContent()}
        {activeTab === "inquiries" && renderInquiriesContent()}
        {activeTab === "analytics" && renderAnalyticsContent()}
        {activeTab === "settings" && renderSettingsContent()}
        {/* Add more tab renders as needed */}
      </main>
    </div>
  );
};

export default AdminDashboard;
