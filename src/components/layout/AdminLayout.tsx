import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import ChatWindow from "../ChatWindow";
import { LogOut } from "lucide-react";
import useAdminDarkMode from "../../hooks/useAdminDarkMode";

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
  { id: "dashboard", label: "Dashboard", icon: null, link: "/admin" },
  { id: "projects", label: "Projects", icon: null, link: "/admin/projects" },
  { id: "builders", label: "Builders", icon: null, link: "/admin/builders" },
  {
    id: "clients",
    label: "Client Records",
    icon: null,
    link: "/admin/clients",
  },
  { id: "inventory", label: "Inventory", icon: null, link: "/admin/inventory" },
  { id: "payroll", label: "Payroll", icon: null, link: "/admin/payroll" },
  {
    id: "solar-quotation",
    label: "Forms",
    icon: null,
    link: "/admin/solar-quotation",
  },
  { id: "expenses", label: "Expenses", icon: null, link: "/admin/expenses" },
  { id: "analytics", label: "Analytics", icon: null, link: "/admin/analytics" },
  { id: "settings", label: "Settings", icon: null, link: "/admin/settings" },
  { id: "calendar", label: "Calendar", icon: null, link: "/admin/calendar" },
];

const AdminLayout: React.FC = () => {
  // Sidebar/chat state (move from AdminDashboard)
  const [collapsed] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [onlineAdmins, setOnlineAdmins] = useState<OnlineAdmin[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatAdmin, setChatAdmin] = useState<OnlineAdmin | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<number, number>>({});
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const chatPollingRef = useRef<NodeJS.Timeout | null>(null);
  const [theme] = useAdminDarkMode();
  const location = useLocation();
  const navigate = useNavigate();

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

  // Sidebar rendering (copy from AdminDashboard, but use handleOpenChat, etc.)
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
            location.pathname === item.link ||
            (item.id === "builders" &&
              location.pathname.startsWith("/admin/builders"));
          const showLabels = isMobile || !collapsed || hovered;
          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.link) navigate(item.link);
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
                <span>{/* Add icons if needed */}</span>
                {showLabels && (
                  <span className="text-base font-medium">{item.label}</span>
                )}
              </button>
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
    </div>
  );

  return (
    <div className={theme === "dark" ? "dark" : ""}>
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
              onClick={() => {
                if (selectedAdmin) markAdminOffline(selectedAdmin);
                localStorage.removeItem("selectedAdmin");
                navigate("/");
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
        {/* Main Content */}
        <main className="flex-1 w-0 min-w-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Outlet />
        </main>
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
    </div>
  );
};

export default AdminLayout;
