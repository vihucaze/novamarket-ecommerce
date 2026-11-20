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
          primary: "#3E29E3",
          secondary: "#0284c7",
          accent: "#10b981",
          dark: "#0f172a",
          neutral: "#71798E"
        },
        // Electric Neo-Tech Retail design system (ejemplos/DESIGN.md)
        background: "#f9f9ff",
        "on-surface": "#131b2d",
        "on-background": "#131b2d",
        "on-surface-variant": "#464556",
        outline: "#777588",
        "outline-variant": "#c7c4d9",
        "surface-variant": "#dae2fa",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f1f3ff",
        "surface-container": "#e9edff",
        "surface-container-high": "#e0e8ff",
        "primary-container": "#3e29e3",
        "on-primary-fixed": "#100069",
        "primary-fixed": "#e3dfff",
        "secondary-container": "#dcdef9",
        "on-secondary-fixed": "#171a2e",
        tertiary: "#00432d",
        "tertiary-fixed-dim": "#00e2a0",
        "inverse-surface": "#283042",
        "inverse-on-surface": "#edf0ff"
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
          "primary": "#3E29E3",
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
