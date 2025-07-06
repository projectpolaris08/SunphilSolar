import React, { useState, useEffect } from "react";
import { BarChart3, Users, Eye, EyeOff, TrendingUp } from "lucide-react";
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
import { projects } from "../data/projects";
import AdminSelectModal from "../components/AdminSelectModal";
import ChatWindow from "../components/ChatWindow";
import { adminUsers } from "../data/adminUsers";

interface AdminStats {
  totalProjects: number;
  totalClients: number;
  totalSales: number;
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

type AdminUser = { id: number; name: string; image: string };
type ChatMessage = {
  id: string;
  sender_id: number;
  receiver_id: number;
  content: string;
  timestamp: string;
  image_url?: string;
  read: boolean;
};

const AdminDashboard: React.FC = () => {
  const { login, isAuthenticated, loading } = useAdminAuth();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [stats, setStats] = useState<AdminStats>({
    totalProjects: 36,
    totalClients: 0,
    totalSales: 0,
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [clientRecords, setClientRecords] = useState<
    { date?: string; amount?: string | number }[]
  >([]);
  const [recentActivity, setRecentActivity] = useState<AdminActivity[]>([]);
  const {
    events,
    loading: calendarLoading,
    error: calendarError,
    refetch: refetchEvents,
  } = useCalendarEvents();
  const [recentActivityLoading, setRecentActivityLoading] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  // State for build summaries
  const [inverterBuilds, setInverterBuilds] = useState<any[]>([]);
  const [batteryBuilds, setBatteryBuilds] = useState<any[]>([]);
  const [showAdminSelectModal, setShowAdminSelectModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Compute upcoming installations from calendar events (not projects)
  const now = new Date();
  const upcomingInstallations = events
    .filter((ev) => new Date(ev.start) >= now)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 5);

  // Get greeting based on time of day
  const getGreeting = () => {
    if (selectedAdmin && selectedAdmin.name) {
      return `Hello, ${selectedAdmin.name}!`;
    }
    return "Hello, Diane!";
  };

  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      totalProjects: projects.length,
    }));
  }, []);

  // Fetch inverter and battery build summaries
  useEffect(() => {
    const fetchBuildSummaries = async () => {
      // Inverter Builds
      const { data: inverterData } = await supabase
        .from("inverter_builds")
        .select("status");
      if (inverterData) {
      }
      // Battery Builds
      const { data: batteryData } = await supabase
        .from("battery_builds")
        .select("status");
      if (batteryData) {
      }
    };
    fetchBuildSummaries();
  }, []);

  // Fetch all builds for shortage comparison
  useEffect(() => {
    const fetchAllBuilds = async () => {
      const { data: inverterData } = await supabase
        .from("inverter_builds")
        .select("*");
      if (inverterData) setInverterBuilds(inverterData);
      const { data: batteryData } = await supabase
        .from("battery_builds")
        .select("*");
      if (batteryData) setBatteryBuilds(batteryData);
    };
    fetchAllBuilds();
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const success = await login(loginForm.username, loginForm.password);
      if (!success) {
        setLoginError("Invalid username or password");
      } else {
        setShowAdminSelectModal(true);
      }
    } catch {
      setLoginError("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

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

  // --- System Capacity and Battery Summary Calculation ---
  console.log("Calendar events for dashboard:", events);
  const capacitySummary = events.reduce(
    (acc, event) => {
      if (event.systemCapacity) {
        const capacity = event.systemCapacity.replace("kW", "");
        const capacityNum = parseFloat(capacity);
        if (!isNaN(capacityNum)) {
          const multiplier = (event as any).systemCapacityMultiplier || 1;
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
  // --- End Summary Calculation ---

  // --- System Capacity and Battery Shortage Comparison ---
  const inverterTypeBuilt: Record<string, number> = {};
  inverterBuilds.forEach((b) => {
    if (b.type && b.status === "Done")
      inverterTypeBuilt[b.type.replace("kW", "")] =
        (inverterTypeBuilt[b.type.replace("kW", "")] || 0) + 1;
  });
  const batteryTypeBuilt: Record<string, number> = {};
  batteryBuilds.forEach((b) => {
    if (b.type && b.status === "Done")
      batteryTypeBuilt[b.type] = (batteryTypeBuilt[b.type] || 0) + 1;
  });

  // Fetch all conversations (last message and unread count)
  const fetchConversations = async () => {
    if (!selectedAdmin) return;
    const { data } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${selectedAdmin.id},receiver_id.eq.${selectedAdmin.id}`)
      .order("timestamp", { ascending: false });
    if (!data) return;
    const convMap: Record<number, { lastMessage: string; unread: number }> = {};
    adminUsers.forEach((admin) => {
      if (admin.id === selectedAdmin.id) return;
      const convMsgs = data.filter(
        (msg) =>
          (msg.sender_id === selectedAdmin.id &&
            msg.receiver_id === admin.id) ||
          (msg.sender_id === admin.id && msg.receiver_id === selectedAdmin.id)
      );
      if (convMsgs.length > 0) {
        const lastMsg = convMsgs[0];
        const unread = convMsgs.filter(
          (msg) =>
            msg.receiver_id === selectedAdmin.id &&
            msg.sender_id === admin.id &&
            !msg.read
        ).length;
        convMap[admin.id] = {
          lastMessage: lastMsg.content || "[Image]",
          unread,
        };
      } else {
        convMap[admin.id] = { lastMessage: "", unread: 0 };
      }
    });
  };
  useEffect(() => {
    fetchConversations();
  }, [selectedAdmin, chatMessages]);

  // Update fetchChatMessages to mark messages as read
  const fetchChatMessages = async (otherAdminId: number) => {
    if (!selectedAdmin) return;
    const { data } = await supabase
      .from("messages")
      .select("*")
      .or(
        `and(sender_id.eq.${selectedAdmin.id},receiver_id.eq.${otherAdminId}),and(sender_id.eq.${otherAdminId},receiver_id.eq.${selectedAdmin.id})`
      )
      .order("timestamp", { ascending: true });
    setChatMessages((data as ChatMessage[]) || []);
    // Mark all messages from otherAdminId to current as read
    await supabase
      .from("messages")
      .update({ read: true })
      .eq("sender_id", otherAdminId)
      .eq("receiver_id", selectedAdmin.id)
      .eq("read", false);
  };

  // Helper to upload image to Supabase Storage and return public URL
  const uploadChatImage = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}.${fileExt}`;
    const { error } = await supabase.storage
      .from("chat-images")
      .upload(fileName, file);
    if (error) return null;
    const { publicUrl } = supabase.storage
      .from("chat-images")
      .getPublicUrl(fileName).data;
    return publicUrl;
  };

  // Send a message (with optional image)
  const handleSendMessage = async (
    content: string,
    imageFile: File | null = null,
    receiverId: number
  ) => {
    if (!selectedAdmin) return;
    let image_url = null;
    if (imageFile) {
      image_url = await uploadChatImage(imageFile);
    }
    const { error } = await supabase.from("messages").insert({
      sender_id: selectedAdmin.id,
      receiver_id: receiverId,
      content,
      image_url,
      timestamp: new Date().toISOString(),
      read: false,
    });
    if (error) {
      console.error("Failed to send message:", error.message);
      alert("Failed to send message: " + error.message);
      return;
    }
    fetchChatMessages(receiverId);
  };

  // When an admin is selected, save to localStorage
  const handleAdminSelect = (user: AdminUser) => {
    setSelectedAdmin(user);
    setShowAdminSelectModal(false);
    localStorage.setItem("selectedAdmin", JSON.stringify(user));
  };

  // Restore selectedAdmin from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("selectedAdmin");
    if (saved) {
      try {
        setSelectedAdmin(JSON.parse(saved));
      } catch {}
    }
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );

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
              value={loginForm.username}
              onChange={(e) =>
                setLoginForm({ ...loginForm, username: e.target.value })
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

  if (showAdminSelectModal && !selectedAdmin) {
    return <AdminSelectModal onSelect={handleAdminSelect} />;
  }

  const renderDashboardContent = () => (
    <div className="w-full px-2 sm:px-4 py-4 space-y-4 sm:space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Header with hamburger and centered title */}
      <div className="relative flex items-center justify-center min-h-[56px] mb-4">
        {/* Hamburger icon (only visible on mobile) */}
        <div className="text-center">
          <h1 className="text-xl font-bold w-full text-center">
            Admin Dashboard
          </h1>
        </div>
      </div>
      {/* Greeting */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-2xl font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          {getGreeting()}
        </p>
        <p className="text-sm text-gray-600">
          {currentDateTime.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          •{" "}
          {currentDateTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
      {/* Stats Cards + Chart Row */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-1 gap-4 sm:gap-6 xl:col-span-1">
          <div className="bg-blue-50 dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 w-full min-w-0 min-h-[100px] hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-200">
                  Total Projects
                </p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {stats.totalProjects}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 w-full min-w-0 min-h-[100px] hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center">
              <div className="p-2 bg-green-500 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-700 dark:text-green-200">
                  Total Clients
                </p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {stats.totalClients}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 w-full min-w-0 min-h-[100px] hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex flex-col flex-grow min-w-0">
                <p className="text-sm font-medium text-purple-700 dark:text-purple-200">
                  Total Sales
                </p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100 break-words whitespace-normal">
                  ₱{stats.totalSales.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Monthly Sales Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 overflow-x-auto xl:col-span-3 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Monthly Sales Performance
          </h3>
          <div className="h-80 min-w-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySalesData}>
                <defs>
                  <linearGradient
                    id="dashboardBarGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#00d2ff" />
                    <stop offset="100%" stopColor="#3a47d5" />
                  </linearGradient>
                </defs>
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
                    background: "#fff",
                    color: "#111",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    fontSize: 16,
                    fontWeight: 700,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    opacity: 1,
                    padding: 16,
                  }}
                  labelStyle={{
                    color: "#111",
                    fontWeight: 900,
                    fontSize: 16,
                  }}
                  itemStyle={{
                    color: "#111",
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                  formatter={(value: number) => [
                    `₱${value.toLocaleString()}`,
                    "Sales",
                  ]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar
                  dataKey="sales"
                  fill="url(#dashboardBarGradient)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* System Capacity and Battery Summary */}
      {calendarLoading ? (
        <div className="flex justify-center items-center h-32 text-lg text-gray-500">
          Loading system capacity and battery requirements...
        </div>
      ) : events.length === 0 ? (
        <div className="flex justify-center items-center h-32 text-lg text-gray-500">
          No scheduled events.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              System Capacity Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">
                  Total Capacity:
                </span>
                <span className="font-bold text-blue-600">
                  {capacitySummary.totalSystemCapacity} kW
                </span>
              </div>
              <div className="border-t pt-2">
                <span className="text-sm font-medium text-gray-600">
                  Breakdown:
                </span>
                {Object.entries(capacitySummary.capacityBreakdown).length ===
                0 ? (
                  <div className="text-xs text-gray-400">
                    No scheduled system capacities.
                  </div>
                ) : (
                  Object.entries(capacitySummary.capacityBreakdown).map(
                    ([capacity, required]) => {
                      const built = inverterTypeBuilt[capacity] || 0;
                      const inProgress = inverterBuilds.filter(
                        (b) =>
                          b.type &&
                          b.type.replace("kW", "") === capacity &&
                          b.status === "In Progress"
                      ).length;
                      const isShort = required > built;
                      return (
                        <div
                          key={capacity}
                          className={
                            "flex justify-between items-center text-sm py-1 px-2 rounded-lg mb-1 border border-red-300"
                          }
                          style={
                            isShort
                              ? {
                                  background: "#F08080",
                                }
                              : {
                                  background:
                                    "linear-gradient(90deg, #9ebd13 0%, #008552 100%)",
                                }
                          }
                        >
                          <span className="font-bold text-base">
                            {capacity}kW:
                          </span>
                          <span className="flex gap-2 items-center flex-wrap">
                            <span className="bg-gray-200 px-2 py-0.5 rounded-full font-semibold text-gray-800">
                              Required: {required}
                            </span>
                            <span className="bg-green-200 px-2 py-0.5 rounded-full font-semibold text-green-800 flex items-center gap-1">
                              Built: {built} <span>✅</span>
                            </span>
                            <span className="bg-blue-200 px-2 py-0.5 rounded-full font-semibold text-blue-800 flex items-center gap-1">
                              In-progress: {inProgress} <span>🔨</span>
                            </span>
                            {isShort && (
                              <span className="bg-red-500 text-white px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                Short: {required - built} <span>⚠️</span>
                              </span>
                            )}
                            <span
                              className="px-2 py-0.5 rounded-full font-semibold text-white"
                              style={{
                                background: "#008B8B",
                                display: "inline-block",
                              }}
                            >
                              Progress:{" "}
                              {required > 0
                                ? Math.round((built / required) * 100)
                                : 100}
                              %
                            </span>
                          </span>
                        </div>
                      );
                    }
                  )
                )}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Battery Requirements
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">
                  Total Batteries:
                </span>
                <span className="font-bold text-green-600">
                  {capacitySummary.totalBatteries} units
                </span>
              </div>
              <div className="border-t pt-2">
                <span className="text-sm font-medium text-gray-600">
                  Breakdown:
                </span>
                {Object.entries(capacitySummary.batteryBreakdown).length ===
                0 ? (
                  <div className="text-xs text-gray-400">
                    No scheduled batteries.
                  </div>
                ) : (
                  Object.entries(capacitySummary.batteryBreakdown).map(
                    ([battery, required]) => {
                      const built = batteryTypeBuilt[battery] || 0;
                      const inProgress = batteryBuilds.filter(
                        (b) => b.type === battery && b.status === "In Progress"
                      ).length;
                      const isShort = required > built;
                      return (
                        <div
                          key={battery}
                          className={
                            "flex justify-between items-center text-sm py-1 px-2 rounded-lg mb-1 border border-red-300"
                          }
                          style={
                            isShort
                              ? {
                                  background: "#F08080",
                                }
                              : {
                                  background:
                                    "linear-gradient(90deg, #9ebd13 0%, #008552 100%)",
                                }
                          }
                        >
                          <span className="font-bold text-base">
                            {battery}:
                          </span>
                          <span className="flex gap-2 items-center flex-wrap">
                            <span className="bg-gray-200 px-2 py-0.5 rounded-full font-semibold text-gray-800">
                              Required: {required}
                            </span>
                            <span className="bg-green-200 px-2 py-0.5 rounded-full font-semibold text-green-800 flex items-center gap-1">
                              Built: {built} <span>✅</span>
                            </span>
                            <span className="bg-blue-200 px-2 py-0.5 rounded-full font-semibold text-blue-800 flex items-center gap-1">
                              In-progress: {inProgress} <span>🔨</span>
                            </span>
                            {isShort && (
                              <span className="bg-red-500 text-white px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                Short: {required - built} <span>⚠️</span>
                              </span>
                            )}
                            <span
                              className="px-2 py-0.5 rounded-full font-semibold text-white"
                              style={{
                                background: "#008B8B",
                                display: "inline-block",
                              }}
                            >
                              Progress:{" "}
                              {required > 0
                                ? Math.round((built / required) * 100)
                                : 100}
                              %
                            </span>
                          </span>
                        </div>
                      );
                    }
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Upcoming Installations & Recent Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4">
        {/* Upcoming Installations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
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
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {item.title || item.clientName || "Installation"}
                    </span>{" "}
                    —
                    <span className="ml-1 text-gray-700 dark:text-gray-300">
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Recent Activity
            </h3>
            <button
              onClick={async () => {
                setRecentActivityLoading(true);
                try {
                  const { data, error } = await supabase
                    .from("admin_activity")
                    .select("*")
                    .order("timestamp", { ascending: false })
                    .limit(10);
                  if (error) {
                    alert("Failed to refresh activity: " + error.message);
                  } else if (data) {
                    setRecentActivity(data);
                  }
                } catch (err) {
                  alert("Unexpected error refreshing activity.");
                }
                setRecentActivityLoading(false);
              }}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2"
              disabled={recentActivityLoading}
            >
              {recentActivityLoading && (
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 inline-block"></span>
              )}
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
                      <p className="text-sm text-gray-900 dark:text-gray-100">
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

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1">
        {renderDashboardContent()}
        {chatOpen && selectedAdmin && (
          <ChatWindow
            open={chatOpen}
            onClose={() => setChatOpen(false)}
            admin={selectedAdmin}
            currentAdmin={selectedAdmin}
            messages={chatMessages}
            onSend={(content, imageFile) =>
              handleSendMessage(content, imageFile, selectedAdmin.id)
            }
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
