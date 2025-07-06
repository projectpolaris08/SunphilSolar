import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import ChatWindow from "../ChatWindow";
import { LogOut, Menu } from "lucide-react";
import useAdminDarkMode from "../../hooks/useAdminDarkMode";
import notificationSound from "../../../public/sounds/popup.mp3";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import AdminSelectModal from "../AdminSelectModal";
import {
  Home,
  BarChart3,
  Wrench,
  Users,
  MessageSquare,
  FileText,
  Database,
  TrendingUp,
  Settings,
  Calendar,
  Sun,
  Moon,
} from "lucide-react";
import { adminUsers } from "../../data/adminUsers";

// Types (copy from AdminDashboard)
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

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, link: "/admin" },
  {
    id: "projects",
    label: "Projects",
    icon: BarChart3,
    link: "/admin/projects",
  },
  { id: "builders", label: "Builders", icon: Wrench, link: "/admin/builders" },
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

const AdminLayout: React.FC = () => {
  // Sidebar/chat state (move from AdminDashboard)
  const [collapsed] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [onlineAdmins, setOnlineAdmins] = useState<OnlineAdmin[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatAdmin, setChatAdmin] = useState<OnlineAdmin | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<number, number>>({});
  const [lastUnreadCounts, setLastUnreadCounts] = useState<
    Record<number, number>
  >({});
  const [toast, setToast] = useState<{ name: string; preview: string } | null>(
    null
  );
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const chatPollingRef = useRef<NodeJS.Timeout | null>(null);
  const [theme, setTheme] = useAdminDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isAuthenticated, loading, logout } = useAdminAuth();

  // Responsive
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch online admins
  const fetchOnlineAdmins = async () => {
    const { data } = await supabase
      .from("admin_online_status")
      .select("admin_id, name, image")
      .eq("is_online", true);
    setOnlineAdmins((data as OnlineAdmin[]) || []);
  };

  // Mark admin online/offline
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

  // Fetch chat messages
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

  // Send message
  const handleSendMessage = async (
    content: string,
    imageFile: File | null = null
  ) => {
    if (!selectedAdmin || !chatAdmin) return;
    let image_url = null;
    if (imageFile) {
      // You may want to copy uploadChatImage from AdminDashboard
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

  // Fetch unread counts
  const fetchUnreadCounts = async () => {
    if (!selectedAdmin) return;
    const { data } = await supabase
      .from("messages")
      .select("sender_id")
      .eq("receiver_id", selectedAdmin.id)
      .eq("read", false);
    const counts: Record<number, number> = {};
    (data || []).forEach((row: { sender_id: number }) => {
      const senderId = row.sender_id;
      counts[senderId] = (counts[senderId] || 0) + 1;
    });
    setUnreadCounts(counts);
  };

  // Mark messages as read
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

  // Open/close chat
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

  // Online admin polling
  useEffect(() => {
    fetchOnlineAdmins();
    if (pollingRef.current) clearInterval(pollingRef.current);
    pollingRef.current = setInterval(fetchOnlineAdmins, 10000);
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  // Mark online/offline on select
  useEffect(() => {
    if (selectedAdmin) {
      markAdminOnline(selectedAdmin);
      fetchOnlineAdmins();
      if (pollingRef.current) clearInterval(pollingRef.current);
      pollingRef.current = setInterval(fetchOnlineAdmins, 10000);
      const handleUnload = () => markAdminOffline(selectedAdmin);
      window.addEventListener("beforeunload", handleUnload);
      return () => {
        window.removeEventListener("beforeunload", handleUnload);
        markAdminOffline(selectedAdmin);
        if (pollingRef.current) clearInterval(pollingRef.current);
      };
    }
  }, [selectedAdmin]);

  // Play sound and show toast when new unread message arrives
  useEffect(() => {
    if (!selectedAdmin) return;
    Object.entries(unreadCounts).forEach(([adminId, count]) => {
      const prev = lastUnreadCounts[+adminId] || 0;
      if (count > prev) {
        // Find sender admin info
        const sender = onlineAdmins.find((a) => a.admin_id === +adminId);
        if (sender) {
          // Find latest unread message from this sender
          const latestMsg = chatMessages
            .filter((m) => m.sender_id === +adminId && !m.read)
            .slice(-1)[0];
          setToast({
            name: sender.name,
            preview: latestMsg?.content || "New message",
          });
        }
        // Play sound
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      }
    });
    setLastUnreadCounts(unreadCounts);
  }, [unreadCounts, onlineAdmins, chatMessages, selectedAdmin]);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Sidebar rendering (copy from AdminDashboard, but use handleOpenChat, etc.)
  const renderSidebar = () => (
    <div
      className="relative h-full flex flex-col p-2 min-h-0"
      style={{ height: "100vh" }}
    >
      {/* Current admin at the top, below header */}
      {selectedAdmin && (
        <div
          className={`flex items-center gap-2 p-2 mb-2 border-b border-gray-200 dark:border-gray-700 ${
            collapsed && !hovered && !(isMobile && mobileSidebarOpen)
              ? "justify-center"
              : "justify-start"
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
          {(!collapsed || hovered || (isMobile && mobileSidebarOpen)) && (
            <span className="font-semibold text-base text-gray-900 dark:text-gray-100 ml-3">
              {selectedAdmin.name}
            </span>
          )}
        </div>
      )}
      {/* Navigation menu - fills available space, scrollable if needed */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto min-h-0">
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.link ||
            (item.id === "builders" &&
              location.pathname.startsWith("/admin/builders"));
          const showLabels = isMobile || !collapsed || hovered;
          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.link) {
                    if (isMobile) setMobileSidebarOpen(false);
                    navigate(item.link);
                  }
                }}
                className={`flex items-center ${
                  showLabels ? "gap-3" : "justify-center"
                } px-3 py-2 rounded-lg w-full text-left transition-colors duration-150
                ${
                  isActive
                    ? "border border-blue-300 bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400"
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
            </div>
          );
        })}
      </nav>
      {/* Other online admins at the bottom, Messenger style, always visible but not hugging the very bottom */}
      <div className="flex flex-col gap-4 pb-2 mt-16 mb-16 md:mt-auto md:mb-8 bg-inherit z-10">
        {adminUsers
          .filter((a) => !selectedAdmin || a.id !== selectedAdmin.id)
          .map((admin) => (
            <div
              key={admin.id}
              className={`flex items-center ${
                collapsed && !hovered && !(isMobile && mobileSidebarOpen)
                  ? "justify-center"
                  : "gap-2 justify-start"
              } cursor-pointer`}
              onClick={() => {
                if (isMobile) setMobileSidebarOpen(false);
                handleOpenChat({
                  admin_id: admin.id,
                  name: admin.name,
                  image: admin.image,
                });
              }}
            >
              <span className="relative inline-block group">
                <img
                  src={admin.image}
                  alt={admin.name}
                  className="w-10 h-10 rounded-full border object-cover"
                />
                {onlineAdmins.some((a) => a.admin_id === admin.id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
                {unreadCounts[admin.id] > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-4 bg-red-600 text-white text-xs flex items-center justify-center rounded-full px-1 border-2 border-white">
                    {unreadCounts[admin.id]}
                  </span>
                )}
              </span>
              {(!collapsed || hovered || (isMobile && mobileSidebarOpen)) && (
                <span className="font-medium text-gray-900 dark:text-gray-100 ml-3">
                  {admin.name}
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  );

  // When an admin is selected, save to localStorage
  const handleAdminSelect = (user: AdminUser) => {
    setSelectedAdmin(user);
    localStorage.setItem("selectedAdmin", JSON.stringify(user));
  };

  if (loading) return null;
  if (!isAuthenticated) return null;
  // Only show admin selection modal if authenticated but no selected admin
  if (!selectedAdmin) {
    return <AdminSelectModal onSelect={handleAdminSelect} />;
  }

  return (
    <div id="admin-dashboard-root" className={theme === "dark" ? "dark" : ""}>
      <audio ref={audioRef} src={notificationSound} preload="auto" />
      {toast && (
        <div className="fixed bottom-24 right-4 z-50 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in">
          <span className="font-bold">{toast.name}:</span>
          <span className="truncate max-w-[180px]">{toast.preview}</span>
        </div>
      )}
      <div className={"min-h-screen flex bg-gray-50 dark:bg-gray-900"}>
        {/* Mobile Overlay for Sidebar */}
        {isMobile && mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
        <aside
          className={`md:flex md:flex-col ${
            !collapsed || hovered ? "md:w-64" : "md:w-16"
          } md:h-screen md:bg-white md:dark:bg-gray-800 md:shadow-lg md:sticky md:top-0 transition-transform duration-300
            fixed top-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform
            ${
              isMobile
                ? mobileSidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full"
                : "md:translate-x-0"
            }
            md:static md:translate-x-0
          `}
          style={{ zIndex: 50 }}
          onMouseEnter={() => {
            if (collapsed && !isMobile) setHovered(true);
          }}
          onMouseLeave={() => {
            if (collapsed && !isMobile) setHovered(false);
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
              onClick={() => {
                if (selectedAdmin) markAdminOffline(selectedAdmin);
                localStorage.removeItem("selectedAdmin");
                logout();
                navigate("/");
                if (isMobile) setMobileSidebarOpen(false);
              }}
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
        {/* Add dark mode toggle button at the top right of the admin area */}
        <div className="absolute top-4 right-8 z-40">
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
        {/* Main Content */}
        <main className="flex-1 w-0 min-w-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          {/* Header row for all admin pages: hamburger, back, title, etc. */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 bg-white dark:bg-gray-900">
            {isMobile && (
              <button
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 shadow-md md:hidden"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu className="w-7 h-7 text-gray-800 dark:text-gray-100" />
              </button>
            )}
            {/* Slot for back button or page title, with left margin if hamburger is present */}
            <div className={isMobile ? "ml-2 flex-1" : "flex-1"}>
              {/* The actual page content (Outlet) should render its own title/back if needed */}
            </div>
          </div>
          <div className="px-2 sm:px-4 pb-4 pt-2">
            <Outlet />
          </div>
        </main>
        {/* ChatWindow integration */}
        {chatOpen && chatAdmin && selectedAdmin && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center md:static md:inset-auto md:z-auto ${
              isMobile ? "bg-black bg-opacity-40" : ""
            }`}
          >
            <div
              className={`w-full h-full md:w-auto md:h-auto flex items-center justify-center ${
                isMobile ? "max-w-full max-h-full" : ""
              }`}
            >
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLayout;
