/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e6f7ff",
          100: "#b3e6ff",
          200: "#80d4ff",
          300: "#4dc2ff",
          400: "#1aafff",
          500: "#0099e6",
          600: "#0078b3",
          700: "#005680",
          800: "#003347",
          900: "#00121a",
        },
        secondary: {
          50: "#f2f2f2",
          100: "#d9d9d9",
          200: "#bfbfbf",
          300: "#a6a6a6",
          400: "#8c8c8c",
          500: "#737373",
          600: "#595959",
          700: "#404040",
          800: "#262626",
          900: "#0d0d0d",
        },
        accent: {
          50: "#fff9e6",
          100: "#ffecb3",
          200: "#ffe080",
          300: "#ffd34d",
          400: "#ffc61a",
          500: "#e6b300",
          600: "#b38c00",
          700: "#806600",
          800: "#4d3d00",
          900: "#1a1400",
        },
        success: {
          500: "#10b981",
        },
        warning: {
          500: "#f59e0b",
        },
        error: {
          500: "#ef4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.2" }],
        headline: ["2.5rem", { lineHeight: "1.2" }],
        title: ["2rem", { lineHeight: "1.2" }],
        subtitle: ["1.5rem", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.5" }],
        caption: ["0.875rem", { lineHeight: "1.4" }],
      },
      boxShadow: {
        "elevation-1": "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        "elevation-2": "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        "elevation-3":
          "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
        "elevation-4":
          "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        "elevation-5":
          "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        slowZoom: "slowZoom 30s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
