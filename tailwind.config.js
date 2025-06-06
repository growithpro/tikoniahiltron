// tailwind.config.js
export default {
  darkMode: "class", // Enables manual dark mode via .dark class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "red", // Indigo 600
      secondary: "#6366F1", // Indigo 500
    },
    extend: {},
  },

  plugins: [],
};
