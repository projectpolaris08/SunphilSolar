import React, { useState, useRef, useEffect } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface Message {
  id: string;
  sender_id: number;
  receiver_id: number;
  content: string;
  timestamp: string;
  image_url?: string;
}

interface ChatWindowProps {
  open: boolean;
  onClose: () => void;
  admin: { id: number; name: string; image: string };
  currentAdmin: { id: number; name: string; image: string };
  messages: Message[];
  onSend: (content: string, imageFile?: File | null) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  open,
  onClose,
  admin,
  currentAdmin,
  messages,
  onSend,
}) => {
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(imageFile);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  if (!open) return null;

  return (
    <div className="fixed z-50 bottom-4 right-4 w-full max-w-sm md:max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-t-xl">
        <img
          src={admin.image}
          alt={admin.name}
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div className="flex-1">
          <div className="font-semibold text-gray-900 dark:text-gray-100">
            {admin.name}
          </div>
          <div className="text-xs text-green-500">Active now</div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>
      </div>
      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-2 bg-white dark:bg-gray-900"
        style={{ minHeight: 200, maxHeight: 350 }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender_id === currentAdmin.id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`rounded-2xl px-4 py-2 max-w-[70%] text-sm ${
                msg.sender_id === currentAdmin.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              }`}
            >
              {msg.image_url && (
                <img
                  src={msg.image_url}
                  alt="sent"
                  className="mb-2 rounded-lg max-w-full max-h-40 object-contain"
                />
              )}
              {msg.content}
              <div className="text-[10px] text-right mt-1 opacity-60">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <form
        className="flex items-center gap-2 p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-xl"
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim() || imageFile) {
            onSend(input, imageFile);
            setInput("");
            setImageFile(null);
            setImagePreview(null);
            setShowEmoji(false);
          }
        }}
      >
        <button
          type="button"
          onClick={() => setShowEmoji((v) => !v)}
          className="text-xl px-1"
        >
          😊
        </button>
        {showEmoji && (
          <div className="absolute bottom-20 right-4 z-50">
            <Picker
              data={data}
              theme={
                document.body.classList.contains("dark") ? "dark" : "light"
              }
              onEmojiSelect={(emoji: any) => setInput(input + emoji.native)}
              previewPosition="none"
              skinTonePosition="none"
            />
          </div>
        )}
        <label className="cursor-pointer text-xl px-1">
          📎
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
          />
        </label>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            className="w-10 h-10 object-cover rounded-lg border"
          />
        )}
        <input
          type="text"
          className="flex-1 rounded-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-gray-100"
          placeholder="Aa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-3 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
