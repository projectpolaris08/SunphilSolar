import React from "react";
import { adminUsers } from "../data/adminUsers";

interface AdminSelectModalProps {
  onSelect: (user: { id: number; name: string; image: string }) => void;
}

const AdminSelectModal: React.FC<AdminSelectModalProps> = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-blue-100 dark:border-gray-700 p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-extrabold mb-2 text-center text-blue-700 dark:text-blue-400 tracking-tight drop-shadow-sm">
          Select Admin
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-center mb-6">
          Choose who is using the dashboard
        </p>
        <div className="flex flex-col gap-4">
          {adminUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => onSelect(user)}
              className="flex items-center gap-4 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition transform hover:scale-[1.03] shadow group"
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-200 dark:border-blue-500 shadow-md group-hover:shadow-lg transition"
              />
              <span className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400">
                {user.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSelectModal;
