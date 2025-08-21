import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Phone,
  Headphones,
  Sparkles,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useSound } from "react-sounds";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp?: Date;
}

interface PopupNotification {
  id: number;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  duration?: number;
}

const CONTACT_BAR_HIDE_DELAY = 5000;
const CONTACT_BAR_REHIDE_DELAY = 1500;
const WELCOME_POPUP_DELAY = 3000;
const TYPING_INDICATOR_DELAY = 1000;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [notifications, setNotifications] = useState<PopupNotification[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialMessages: Message[] = [
    {
      id: 1,
      text: "Hello! I'm Solara, your solar energy assistant. I can help you with information about our solar solutions, projects, and services. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ];
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showContactBar, setShowContactBar] = useState(true);
  const [rehideTimeout, setRehideTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const { play: playButton } = useSound("ui/button_hard", { volume: 0.4 });
  const { play: playSubmit } = useSound("ui/submit", { volume: 0.5 });
  const { play: playNotification } = useSound("ui/notification", {
    volume: 0.3,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show welcome popup after delay if user hasn't interacted
  useEffect(() => {
    if (!hasInteracted && !isOpen) {
      const timer = setTimeout(() => {
        setShowWelcomePopup(true);
        playNotification();
      }, WELCOME_POPUP_DELAY);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted, isOpen, playNotification]);

  // Hide contact bar after 5 seconds when chat is open
  useEffect(() => {
    if (isOpen) {
      setShowContactBar(true);
      const timer = setTimeout(
        () => setShowContactBar(false),
        CONTACT_BAR_HIDE_DELAY
      );
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-remove notifications
  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((n) => n.id !== notification.id)
        );
      }, notification.duration || 5000);
      return () => clearTimeout(timer);
    });
  }, [notifications]);

  // Handlers for hover
  const handleContactIconEnter = () => {
    if (rehideTimeout) clearTimeout(rehideTimeout);
    setShowContactBar(true);
  };
  const handleContactIconLeave = () => {
    const timeout = setTimeout(
      () => setShowContactBar(false),
      CONTACT_BAR_REHIDE_DELAY
    );
    setRehideTimeout(timeout);
  };

  const addNotification = (
    type: PopupNotification["type"],
    title: string,
    message: string,
    duration = 5000
  ) => {
    const newNotification: PopupNotification = {
      id: Date.now(),
      type,
      title,
      message,
      duration,
    };
    setNotifications((prev) => [...prev, newNotification]);
    playNotification();
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // 💰 Cost & Financial Questions
    if (message.includes("how much") && message.includes("cost")) {
      addNotification(
        "info",
        "Cost Calculator",
        "Check out our solar calculator for personalized estimates!"
      );
      return "The cost depends on your household's appliance usage and energy needs. You can use our free Solar Calculator at https://sunphilsolar.com/calculator to get a personalized recommendation for your setup.";
    }
    if (message.includes("roi") || message.includes("return on investment")) {
      return "ROI varies depending on your energy consumption and system size. For real examples and detailed case studies, check out our case studies page: https://sunphilsolar.com/case-studies";
    }
    if (
      message.includes("financing") ||
      message.includes("loan") ||
      message.includes("lease") ||
      message.includes("ppa")
    ) {
      return "Currently, we offer cash payment only.";
    }
    if (message.includes("save") && message.includes("electric")) {
      addNotification(
        "success",
        "Great Savings!",
        "Our clients typically save up to 70% on electricity bills!"
      );
      return "Our clients typically save up to 70% on their electricity bills with a properly sized solar system.";
    }

    // ⚙️ System & Technical Questions
    if (
      message.includes("how many panels") ||
      (message.includes("panels") && message.includes("need"))
    ) {
      return "The number of panels depends on your energy usage and available roof space. Try our Solar Calculator at https://sunphilsolar.com/calculator for a quick estimate.";
    }
    if (message.includes("how long") && message.includes("install")) {
      return "For smaller setups, installation usually takes just 1 day. Larger systems may take 1–2 days.";
    }
    if (
      message.includes("power outage") ||
      (message.includes("work") && message.includes("outage"))
    ) {
      return "Yes, if you have batteries installed. Learn more in our blog post about net metering vs. battery storage: https://sunphilsolar.com/blog/net-metering-vs-battery-storage-philippines";
    }
    if (
      message.includes("battery storage") ||
      (message.includes("battery") && message.includes("offer"))
    ) {
      return "Yes, we do! See our battery products for more details: https://sunphilsolar.com/products#battery";
    }
    if (
      message.includes("brand") &&
      (message.includes("panel") || message.includes("inverter"))
    ) {
      return "We use high-quality Canadian Bifacial Solar Panels and Deye Hybrid Inverters.";
    }
    if (
      message.includes("expand") ||
      message.includes("expandable") ||
      message.includes("future")
    ) {
      return "Absolutely! Our systems are designed to be scalable as your needs grow.";
    }

    // 🏠 Property & Eligibility Questions
    if (message.includes("roof suitable") || message.includes("is my roof")) {
      return "Most roofs are suitable, but we recommend a site assessment to be sure. Factors like shading and roof condition are important.";
    }
    if (message.includes("shading") || message.includes("trees near my roof")) {
      return "Shading can affect performance, but we can design a system to minimize its impact. A site visit will help us recommend the best solution.";
    }
    if (message.includes("new roof") || message.includes("need a new roof")) {
      return "If your roof is in good condition, you likely won't need a new one. For more details, see our installation guide: https://sunphilsolar.com/blog/solar-panel-installation-guide-philippines-2025";
    }
    if (message.includes("rent") || message.includes("condo")) {
      return "If you rent or live in a condo, you'll need permission from the property owner or association. Some condos may have restrictions, but we're happy to discuss your options.";
    }

    // 📜 Warranty & Maintenance Questions
    if (message.includes("warranty") || message.includes("warranties")) {
      return "We offer manufacturer warranties on panels and inverters, plus a workmanship warranty for our installation.";
    }
    if (message.includes("maintain") || message.includes("maintenance")) {
      return "Solar systems require minimal maintenance—just occasional cleaning and periodic checks. We'll guide you on best practices.";
    }
    if (message.includes("how long") && message.includes("solar panels last")) {
      return "Our panels are designed to last 25 years or more, with performance warranties to match.";
    }
    if (message.includes("monitor") || message.includes("performance")) {
      return "Yes! We monitor your system's performance using the Solarman App, so you can track your energy production anytime.";
    }

    // ✅ Company & Service Questions
    if (
      message.includes("what sets") ||
      message.includes("why choose") ||
      message.includes("difference")
    ) {
      return "We pride ourselves on quality, transparency, and customer care. Our team uses only top-tier components, provides honest advice, and supports you every step of the way—from consultation to after-sales service.";
    }
    if (
      message.includes("who do i contact") ||
      message.includes("something goes wrong") ||
      message.includes("support")
    ) {
      return "You can reach us anytime through our Contact Form (https://sunphilsolar.com/contact), Facebook Messenger, or by calling us at (+63) 960 692 1760. We're here to help!";
    }
    if (
      message.includes("where is your office") ||
      message.includes("office location") ||
      message.includes("address") ||
      message.includes("visit your office")
    ) {
      return "Our office is located at 28C North Fairview Phase 8 Subdivision, Blk 85 Yen, Quezon City, 1121 Metro Manila. You are welcome to visit us during our business hours! Would you like directions or our office hours?";
    }

    // Fallback
    return "I understand you're interested in solar energy solutions. While I can provide general information, for specific details about your situation, I recommend:\n\n1. Speaking with our solar experts directly\n2. Using our contact form for a detailed consultation\n3. Visiting our office for a face-to-face discussion\n\nWould you like me to help you with any of these options?";
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    setHasInteracted(true);
    setShowWelcomePopup(false);

    // Add user message
    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    // Show typing indicator
    setShowTypingIndicator(true);

    // Get and send bot response
    setTimeout(() => {
      setShowTypingIndicator(false);
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, TYPING_INDICATOR_DELAY + Math.random() * 1000);

    playSubmit();
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    handleSendMessage();
  };

  // Helper to convert URLs in text to clickable links
  function linkify(text: string) {
    const urlRegex =
      /(https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=%]+)|(www\.[\w\-._~:/?#[\]@!$&'()*+,;=%]+)/gi;
    return text.split(urlRegex).map((part, i) => {
      if (!part) return null;
      if (part.match(urlRegex)) {
        const url = part.startsWith("http") ? part : `https://${part}`;
        return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  }

  const quickReplies = [
    "How much does solar cost?",
    "What's the ROI?",
    "How long does installation take?",
    "Do you offer batteries?",
    "Contact a live agent",
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Welcome Popup */}
      {showWelcomePopup && !isOpen && (
        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl p-4 w-72 border border-blue-200 animate-bounce">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="text-yellow-500" size={20} />
            <h4 className="font-semibold text-gray-800">
              Need help with solar?
            </h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Chat with Solara, your AI solar assistant! Get instant answers about
            costs, installation, and more.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setIsOpen(true);
                setShowWelcomePopup(false);
                setHasInteracted(true);
                playButton();
              }}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Start Chat
            </button>
            <button
              onClick={() => {
                setShowWelcomePopup(false);
                setHasInteracted(true);
              }}
              className="text-gray-500 px-3 py-1 rounded text-sm hover:bg-gray-100 transition-colors"
            >
              Maybe Later
            </button>
          </div>
          <div className="absolute -top-2 -right-2">
            <button
              onClick={() => {
                setShowWelcomePopup(false);
                setHasInteracted(true);
              }}
              className="bg-gray-200 hover:bg-gray-300 rounded-full p-1"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Notifications */}
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl p-4 w-72 border-l-4 animate-slide-in"
          style={{
            borderLeftColor:
              notification.type === "success"
                ? "#10b981"
                : notification.type === "warning"
                ? "#f59e0b"
                : notification.type === "error"
                ? "#ef4444"
                : "#3b82f6",
          }}
        >
          <div className="flex items-center space-x-2 mb-2">
            {notification.type === "success" && (
              <CheckCircle className="text-green-500" size={20} />
            )}
            {notification.type === "warning" && (
              <AlertCircle className="text-yellow-500" size={20} />
            )}
            {notification.type === "error" && (
              <AlertCircle className="text-red-500" size={20} />
            )}
            {notification.type === "info" && (
              <AlertCircle className="text-blue-500" size={20} />
            )}
            <h4 className="font-semibold text-gray-800">
              {notification.title}
            </h4>
          </div>
          <p className="text-sm text-gray-600">{notification.message}</p>
        </div>
      ))}

      {!isOpen ? (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowWelcomePopup(false);
            setHasInteracted(true);
            playButton();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
        >
          <MessageSquare size={24} />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-80 h-[400px] md:w-96 md:h-[500px] flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="text-yellow-300" size={20} />
              <h3 className="font-semibold">Solara</h3>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setMessages(initialMessages);
                playButton();
              }}
              className="hover:bg-blue-700 rounded-full p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.sender === "bot"
                    ? linkify(message.text)
                    : message.text}
                  {message.timestamp && (
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-blue-200"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {showTypingIndicator && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                  <div className="flex items-center space-x-1">
                    <Clock size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500">
                      Solara is typing...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Buttons */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.slice(0, 3).map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contact Options Bar or Icon */}
          <div className="relative">
            {showContactBar ? (
              <div
                className="border-t p-4 bg-gray-50 flex justify-center space-x-4 mb-4"
                onMouseEnter={() => {
                  handleContactIconEnter();
                  playButton();
                }}
                onMouseLeave={handleContactIconLeave}
              >
                <a
                  href="https://m.me/fairview.solarista.admn.jayar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <Headphones size={20} />
                  <span>Live Agent</span>
                </a>
                <a
                  href="tel:+639606921760"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <Phone size={20} />
                  <span>Call Us</span>
                </a>
              </div>
            ) : (
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-0 mb-2 cursor-pointer"
                onMouseEnter={() => {
                  handleContactIconEnter();
                  playButton();
                }}
                onMouseLeave={handleContactIconLeave}
              >
                <MessageSquare
                  size={28}
                  className="text-blue-500 bg-white rounded-full shadow p-1 border border-blue-200"
                />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
