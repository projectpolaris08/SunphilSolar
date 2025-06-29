import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SettingsPage = () => {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <div className="relative flex items-center justify-center min-h-[56px] mb-4">
        <h1 className="text-xl font-bold w-full text-center dark:text-gray-100">
          Settings
        </h1>
      </div>
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
            Profile Settings
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Admin Username
              </label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
            Website Settings
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Company Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                defaultValue="Sunphil Solar Energy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Contact Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                defaultValue="info@sunphil.com"
              />
            </div>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
