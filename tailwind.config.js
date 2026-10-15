/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2563eb",
          secondary: "#0284c7",
          accent: "#10b981",
          dark: "#0f172a"
        }
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        novamarket: {
          "primary": "#2563eb",
          "secondary": "#0284c7",
          "accent": "#10b981",
          "neutral": "#1e293b",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#e2e8f0",
          "info": "#38bdf8",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
      "light",
      "dark"
    ],
  },
}
