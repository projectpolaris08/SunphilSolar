import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  BarChart3,
  Users,
  Settings,
  LogOut,
  Home,
  TrendingUp,
  Calendar,
  MessageSquare,
  Menu,
  Wrench,
  Eye,
  EyeOff,
  Moon,
  Sun,
  FileText,
  Database,
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
import useAdminDarkMode from "../hooks/useAdminDarkMode";
import { projects } from "../data/projects";
import AdminSelectModal from "../components/AdminSelectModal";
import ChatWindow from "../components/ChatWindow";

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
type OnlineAdmin = { admin_id: number; name: string; image: string };
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
  const { login, logout, isAuthenticated, loading } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
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
  const location = useLocation();
  const [recentActivity, setRecentActivity] = useState<AdminActivity[]>([]);
  const [theme, setTheme] = useAdminDarkMode();
  const navigate = useNavigate();
  const {
    events,
    loading: calendarLoading,
    error: calendarError,
    refetch: refetchEvents,
  } = useCalendarEvents();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [recentActivityLoading, setRecentActivityLoading] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  // State for build summaries
  const [inverterBuilds, setInverterBuilds] = useState<any[]>([]);
  const [batteryBuilds, setBatteryBuilds] = useState<any[]>([]);
  const [showAdminSelectModal, setShowAdminSelectModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [onlineAdmins, setOnlineAdmins] = useState<OnlineAdmin[]>([]);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatAdmin, setChatAdmin] = useState<OnlineAdmin | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatPollingRef = useRef<NodeJS.Timeout | null>(null);
  const [unreadCounts, setUnreadCounts] = useState<Record<number, number>>({});

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
      const success = await login(loginForm.email, loginForm.password);
      if (!success) {
        setLoginError("Invalid email or password");
      } else {
        setShowAdminSelectModal(true);
      }
    } catch {
      setLoginError("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    if (selectedAdmin) markAdminOffline(selectedAdmin);
    localStorage.removeItem("selectedAdmin");
    logout();
    navigate("/");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, link: "/admin" },
    {
      id: "projects",
      label: "Projects",
      icon: BarChart3,
      link: "/admin/projects",
    },
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
    {
      id: "payroll",
      label: "Payroll",
      icon: MessageSquare,
      link: "/admin/payroll",
    },
    {
      id: "solar-quotation",
      label: "Forms",
      icon: FileText,
      link: "/admin/solar-quotation",
    },
    {
      id: "expenses",
      label: "Expenses",
      icon: Database,
      link: "/admin/expenses",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: TrendingUp,
      link: "/admin/analytics",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      link: "/admin/settings",
    },
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Fetch online admins
  const fetchOnlineAdmins = async () => {
    const { data } = await supabase
      .from("admin_online_status")
      .select("admin_id, name, image")
      .eq("is_online", true);
    setOnlineAdmins((data as OnlineAdmin[]) || []);
  };

  // Helper: Mark admin online in Supabase
  const markAdminOnline = async (admin: AdminUser) => {
    await supabase.from("admin_online_status").upsert(
      {
        admin_id: admin.id,
        name: admin.name,
        image: admin.image,
        is_online: true,
        last_active: new Date().toISOString(),
      },
      { onConflict: "admin_id" }
    );
  };

  // Helper: Mark admin offline in Supabase
  const markAdminOffline = async (admin: AdminUser) => {
    await supabase.from("admin_online_status").upsert(
      {
        admin_id: admin.id,
        name: admin.name,
        image: admin.image,
        is_online: false,
        last_active: new Date().toISOString(),
      },
      { onConflict: "admin_id" }
    );
  };

  // After admin selection, mark as online and start polling for online admins
  useEffect(() => {
    if (selectedAdmin) {
      markAdminOnline(selectedAdmin);
      fetchOnlineAdmins();
      if (pollingRef.current) clearInterval(pollingRef.current);
      pollingRef.current = setInterval(fetchOnlineAdmins, 10000); // every 10s
      // Mark offline on tab close
      const handleUnload = () => markAdminOffline(selectedAdmin);
      window.addEventListener("beforeunload", handleUnload);
      return () => {
        window.removeEventListener("beforeunload", handleUnload);
        markAdminOffline(selectedAdmin);
        if (pollingRef.current) clearInterval(pollingRef.current);
      };
    }
  }, [selectedAdmin]);

  // Also fetch online admins immediately when component mounts (even without selectedAdmin)
  useEffect(() => {
    fetchOnlineAdmins();
    // Start polling for online admins even before admin selection
    if (pollingRef.current) clearInterval(pollingRef.current);
    pollingRef.current = setInterval(fetchOnlineAdmins, 10000);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  // Fetch messages between current admin and selected chat admin
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
    imageFile: File | null = null
  ) => {
    if (!selectedAdmin || !chatAdmin) return;
    let image_url = null;
    if (imageFile) {
      image_url = await uploadChatImage(imageFile);
    }
    const { error } = await supabase.from("messages").insert({
      sender_id: selectedAdmin.id,
      receiver_id: chatAdmin.admin_id,
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
    fetchChatMessages(chatAdmin.admin_id);
    fetchUnreadCounts();
  };

  // Fetch unread counts for each admin
  const fetchUnreadCounts = async () => {
    if (!selectedAdmin) return;
    const { data } = await supabase
      .from("messages")
      .select("sender_id")
      .eq("receiver_id", selectedAdmin.id)
      .eq("read", false);

    // Count unread messages per sender
    const counts: Record<number, number> = {};
    (data || []).forEach((row: { sender_id: number }) => {
      const senderId = row.sender_id;
      counts[senderId] = (counts[senderId] || 0) + 1;
    });
    setUnreadCounts(counts);
  };

  // Mark all messages from chatAdmin as read
  const markMessagesAsRead = async (otherAdminId: number) => {
    if (!selectedAdmin) return;
    await supabase
      .from("messages")
      .update({ read: true })
      .eq("sender_id", otherAdminId)
      .eq("receiver_id", selectedAdmin.id)
      .eq("read", false);
    fetchUnreadCounts();
  };

  // Update polling and chat open logic
  const handleOpenChat = (admin: OnlineAdmin) => {
    setChatAdmin(admin);
    setChatOpen(true);
    fetchChatMessages(admin.admin_id);
    markMessagesAsRead(admin.admin_id);
    if (chatPollingRef.current) clearInterval(chatPollingRef.current);
    chatPollingRef.current = setInterval(() => {
      fetchChatMessages(admin.admin_id);
      markMessagesAsRead(admin.admin_id);
    }, 5000);
  };

  // Close chat window
  const handleCloseChat = () => {
    setChatOpen(false);
    setChatAdmin(null);
    setChatMessages([]);
    if (chatPollingRef.current) clearInterval(chatPollingRef.current);
  };

  // Fetch unread counts on login and when messages change
  useEffect(() => {
    fetchUnreadCounts();
  }, [selectedAdmin, chatMessages]);

  // Restore selectedAdmin from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("selectedAdmin");
    if (saved) setSelectedAdmin(JSON.parse(saved));
  }, []);

  // When an admin is selected, save to localStorage
  const handleAdminSelect = (user: AdminUser) => {
    setSelectedAdmin(user);
    setShowAdminSelectModal(false);
    localStorage.setItem("selectedAdmin", JSON.stringify(user));
  };

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

  if (showAdminSelectModal) {
    return <AdminSelectModal onSelect={handleAdminSelect} />;
  }

  const renderDashboardContent = () => (
    <div className="w-full px-2 sm:px-4 py-4 space-y-4 sm:space-y-6">
      {/* Header with hamburger and centered title */}
      <div className="relative flex items-center justify-center min-h-[56px] mb-4">
        {/* Hamburger icon (only visible on mobile) */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden bg-white dark:bg-gray-800 p-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-gray-600"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu size={26} className="text-gray-800 dark:text-gray-100" />
        </button>
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
        <p className="text-sm text-gray-600 dark:text-gray-400">
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
      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          sidebarOpen ? "block" : "pointer-events-none"
        }`}
        style={{
          background: sidebarOpen ? "rgba(0,0,0,0.3)" : "transparent",
        }}
        onClick={() => setSidebarOpen(false)}
        aria-hidden={!sidebarOpen}
      />
      {/* Mobile Sidebar Content */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ willChange: "transform" }}
        aria-hidden={!sidebarOpen}
      >
        <div
          className={`flex items-center ${
            !collapsed || hovered ? "justify-between" : "justify-center"
          } p-4 border-b border-gray-200 dark:border-gray-700`}
        >
          {(!collapsed || hovered) && (
            <span className="flex items-center gap-2">
              <img
                src="/images/Sunphil.jpg"
                alt="Sunphil Solar"
                className="w-8 h-8 rounded-full border bg-white ring-2 ring-gray-200 dark:ring-gray-700 object-cover"
              />
              <span className="font-bold text-xl text-gray-900 dark:text-gray-100">
                Sunphil Solar
              </span>
            </span>
          )}
          <button
            onClick={handleLogout}
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-2"
            } text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors`}
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
        {renderSidebar()}
      </aside>
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
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Total Projects
                </p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">
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
                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                  Total Clients
                </p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-200">
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
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Total Sales
                </p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-200 break-words whitespace-normal">
                  ₱{stats.totalSales.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Monthly Sales Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 sm:p-6 overflow-x-auto xl:col-span-3 flex flex-col">
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
        <div className="flex justify-center items-center h-32 text-lg text-gray-500 dark:text-gray-300">
          Loading system capacity and battery requirements...
        </div>
      ) : events.length === 0 ? (
        <div className="flex justify-center items-center h-32 text-lg text-gray-500 dark:text-gray-300">
          No scheduled events.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
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
                            "flex justify-between items-center text-sm py-1 px-2 rounded-lg mb-1 border border-red-300 dark:border-red-700"
                          }
                          style={
                            isShort
                              ? {
                                  background:
                                    window.matchMedia &&
                                    window.matchMedia(
                                      "(prefers-color-scheme: dark)"
                                    ).matches
                                      ? "#DA2C43"
                                      : "#F08080",
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
                            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full font-semibold text-gray-800 dark:text-gray-200">
                              Required: {required}
                            </span>
                            <span className="bg-green-200 dark:bg-green-700 px-2 py-0.5 rounded-full font-semibold text-green-800 dark:text-green-200 flex items-center gap-1">
                              Built: {built} <span>✅</span>
                            </span>
                            <span className="bg-blue-200 dark:bg-blue-700 px-2 py-0.5 rounded-full font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-1">
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
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
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
                            "flex justify-between items-center text-sm py-1 px-2 rounded-lg mb-1 border border-red-300 dark:border-red-700"
                          }
                          style={
                            isShort
                              ? {
                                  background:
                                    window.matchMedia &&
                                    window.matchMedia(
                                      "(prefers-color-scheme: dark)"
                                    ).matches
                                      ? "#DA2C43"
                                      : "#F08080",
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
                            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full font-semibold text-gray-800 dark:text-gray-200">
                              Required: {required}
                            </span>
                            <span className="bg-green-200 dark:bg-green-700 px-2 py-0.5 rounded-full font-semibold text-green-800 dark:text-green-200 flex items-center gap-1">
                              Built: {built} <span>✅</span>
                            </span>
                            <span className="bg-blue-200 dark:bg-blue-700 px-2 py-0.5 rounded-full font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-1">
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
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 sm:p-6">
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
              <span className="ml-2 text-gray-600 dark:text-gray-300">
                Loading installations...
              </span>
            </div>
          ) : calendarError ? (
            <div className="text-center py-8">
              <p className="text-red-600 dark:text-red-400 mb-2">
                Failed to load installations
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                {calendarError}
              </p>
              <button
                onClick={refetchEvents}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                Try Again
              </button>
            </div>
          ) : upcomingInstallations.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">
              No upcoming installations scheduled.
            </p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
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
                  <div className="text-sm text-blue-700 dark:text-blue-300 font-semibold mt-1 md:mt-0">
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
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 sm:p-6">
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
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
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
                      <p className="text-xs text-gray-500 dark:text-gray-300">
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
      {/* ChatWindow integration */}
      {chatOpen && chatAdmin && selectedAdmin && (
        <ChatWindow
          open={chatOpen}
          onClose={handleCloseChat}
          admin={{
            id: chatAdmin.admin_id,
            name: chatAdmin.name,
            image: chatAdmin.image,
          }}
          currentAdmin={{
            id: selectedAdmin.id,
            name: selectedAdmin.name,
            image: selectedAdmin.image,
          }}
          messages={chatMessages}
          onSend={handleSendMessage}
        />
      )}
    </div>
  );

  // Sidebar rendering
  const renderSidebar = () => (
    <div className="relative h-full flex flex-col p-2">
      {/* Current admin at the top, below header */}
      {selectedAdmin && (
        <div
          className={`flex items-center gap-2 p-2 mb-2 border-b border-gray-200 dark:border-gray-700 ${
            collapsed && !hovered ? "justify-center" : ""
          }`}
        >
          <span className="relative inline-block">
            <img
              src={selectedAdmin.image}
              alt={selectedAdmin.name}
              className="w-10 h-10 border object-cover rounded-full"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </span>
          {(!collapsed || hovered) && (
            <span className="font-semibold text-base text-gray-900 dark:text-gray-100">
              {selectedAdmin.name}
            </span>
          )}
        </div>
      )}
      {/* Navigation menu - fills available space */}
      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive =
            activeTab === item.id ||
            (item.subItems && location.pathname.startsWith("/admin/builders"));
          const showLabels = isMobile || !collapsed || hovered;
          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.link) navigate(item.link);
                  setSidebarOpen(false);
                }}
                className={`flex items-center ${
                  showLabels ? "gap-3" : "justify-center"
                } px-3 py-2 rounded-lg w-full text-left transition-colors duration-150
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-gray-700"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-200
              `}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <span>
                  {item.icon &&
                    React.createElement(item.icon, {
                      size: 22,
                      className: showLabels ? "mr-1" : "",
                    })}
                </span>
                {showLabels && (
                  <span className="text-base font-medium">{item.label}</span>
                )}
              </button>
              {/* Render submenu if present and active, and not collapsed or hovered */}
              {item.subItems && isActive && showLabels && (
                <div className="ml-8 flex flex-col gap-1 mt-1">
                  {item.subItems.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => navigate(sub.link)}
                      className={`text-left px-2 py-1 rounded-lg w-full transition-colors duration-150 ${
                        location.pathname === sub.link
                          ? "bg-blue-100 text-blue-700 font-semibold dark:bg-gray-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
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
      {/* Other online admins at the bottom, Messenger style */}
      {onlineAdmins.filter(
        (a) => !selectedAdmin || a.admin_id !== selectedAdmin.id
      ).length > 0 && (
        <div className="flex flex-col gap-2 pb-2 mt-auto">
          {onlineAdmins
            .filter((a) => !selectedAdmin || a.admin_id !== selectedAdmin.id)
            .map((admin) => (
              <div
                key={admin.admin_id}
                className={`flex items-center ${
                  collapsed && !hovered ? "justify-center" : "gap-2"
                } cursor-pointer`}
                onClick={() => handleOpenChat(admin)}
              >
                <span className="relative inline-block group">
                  <img
                    src={admin.image}
                    alt={admin.name}
                    className="w-10 h-10 rounded-full border object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  {/* Unread indicator */}
                  {unreadCounts[admin.admin_id] > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                  )}
                  {/* Tooltip for name in collapsed mode */}
                  {collapsed && !hovered && (
                    <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      {admin.name}
                    </span>
                  )}
                </span>
                {(!collapsed || hovered) && (
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {admin.name}
                  </span>
                )}
              </div>
            ))}
        </div>
      )}
      {/* Debug info - remove this after testing */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-2 p-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
          <div>Selected: {selectedAdmin?.name || "None"}</div>
          <div>Online: {onlineAdmins.length}</div>
          <div>Polling: {pollingRef.current ? "Yes" : "No"}</div>
        </div>
      )}
    </div>
  );

  // Main render
  return (
    <div id="admin-dashboard-root" className={theme === "dark" ? "dark" : ""}>
      <div className={"min-h-screen flex bg-gray-50 dark:bg-gray-900"}>
        <aside
          className={`hidden md:flex md:flex-col ${
            !collapsed || hovered ? "md:w-64" : "md:w-16"
          } md:h-screen md:bg-white md:dark:bg-gray-800 md:shadow-lg md:sticky md:top-0 transition-all duration-300`}
          onMouseEnter={() => {
            if (collapsed) setHovered(true);
          }}
          onMouseLeave={() => {
            if (collapsed) setHovered(false);
          }}
        >
          <div
            className={`flex items-center ${
              !collapsed || hovered ? "justify-between" : "justify-center"
            } p-4 border-b border-gray-200 dark:border-gray-700`}
          >
            {(!collapsed || hovered) && (
              <span className="flex items-center gap-2">
                <img
                  src="/images/Sunphil.jpg"
                  alt="Sunphil Solar"
                  className="w-8 h-8 rounded-full border bg-white ring-2 ring-gray-200 dark:ring-gray-700 object-cover"
                />
                <span className="font-bold text-xl text-gray-900 dark:text-gray-100">
                  Sunphil Solar
                </span>
              </span>
            )}
            <button
              onClick={handleLogout}
              className={`flex items-center ${
                collapsed ? "justify-center" : "gap-2"
              } text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors`}
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
          {renderSidebar()}
        </aside>
        {/* Main Content */}
        <main className="flex-1 w-0 min-w-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          {/* Only render dashboard content if on /admin exactly, otherwise render subpage via Outlet */}
          {location.pathname === "/admin" ? (
            <>
              {/* Add dark mode toggle to dashboard header */}
              <div className="flex justify-end items-center px-4 pt-4">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  aria-label="Toggle dark mode"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {renderDashboardContent()}
            </>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
