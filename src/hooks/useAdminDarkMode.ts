import { useEffect, useState } from "react";

const ADMIN_DARK_KEY = "admin-dashboard-theme";

export default function useAdminDarkMode() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(ADMIN_DARK_KEY) || "light"
  );

  useEffect(() => {
    const adminRoot = document.getElementById("admin-dashboard-root");
    if (!adminRoot) return;
    if (theme === "dark") {
      adminRoot.classList.add("dark");
    } else {
      adminRoot.classList.remove("dark");
    }
    localStorage.setItem(ADMIN_DARK_KEY, theme);
  }, [theme]);

  return [theme, setTheme] as const;
}
