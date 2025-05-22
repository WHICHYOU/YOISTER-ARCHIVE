/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2f54eb",
          50: "#f0f5ff",
          100: "#d6e4ff",
          200: "#adc8ff",
          300: "#85a9ff",
          400: "#597ef7",
          500: "#2f54eb",
          600: "#1d39c4",
          700: "#10239e",
          800: "#061178",
          900: "#030852",
        },
        background: "#ffffff",
        foreground: "#0f172a",
        border: "#e2e8f0",
        input: "#cbd5e0",
        ring: "#c7d2fe",
        muted: "#94a3b8",
        "muted-foreground": "#64748b",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-in-out",
        "fade-out": "fade-out 0.2s ease-in-out",
        "slide-in-from-top-2": "slide-in-from-top-2 0.3s ease-in-out",
        "slide-out-to-top-2": "slide-out-to-top-2 0.3s ease-in-out",
      },
    },
    typography(theme) {
      return {
        DEFAULT: {
          css: {
            color: theme("colors.foreground"),
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: theme("colors.primary.600"),
              },
            },
          },
        },
      };
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
