import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Phone, Headphones } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const CONTACT_BAR_HIDE_DELAY = 5000;
const CONTACT_BAR_REHIDE_DELAY = 1500;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const initialMessages: Message[] = [
    {
      id: 1,
      text: "Hello! I'm Solara, your solar energy assistant. I can help you with information about our solar solutions, projects, and services. How can I assist you today?",
      sender: "bot",
    },
  ];
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showContactBar, setShowContactBar] = useState(true);
  const [rehideTimeout, setRehideTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // 💰 Cost & Financial Questions
    if (message.includes("how much") && message.includes("cost")) {
      return "The cost depends on your household's appliance usage and energy needs. You can use our free Solar Calculator at https://sunphilsolar.com/calculator to get a personalized recommendation for your setup.";
    }
    if (message.includes("roi") || message.includes("return on investment")) {
      return "ROI varies depending on your energy consumption and system size. For a detailed explanation and real examples, check out our blog post about solar ROI in the Philippines: https://sunphilsolar.com/blog/solar-roi-philippines";
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
      return "You can reach us anytime through our Contact Form (https://sunphilsolar.com/contact), Facebook Messenger, or by calling us at (+63) 935 365 8092. We're here to help!";
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

    // Add user message
    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    // Get and send bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
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

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300"
        >
          <MessageSquare size={24} />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-80 h-[400px] md:w-96 md:h-[500px] flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Solara</h3>
            <button
              onClick={() => {
                setIsOpen(false);
                setMessages(initialMessages);
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
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Contact Options Bar or Icon */}
          <div className="relative">
            {showContactBar ? (
              <div
                className="border-t p-4 bg-gray-50 flex justify-center space-x-4 mb-4"
                onMouseEnter={handleContactIconEnter}
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
                onMouseEnter={handleContactIconEnter}
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
