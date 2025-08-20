// src/theme.js

const theme = {
  colors: {
    main: {
      blue: "#2563eb",   // Tailwind blue-600
      orange: "#f97316", // Tailwind orange-500
    },
    bg: {
      light: "#ffffff",
      dark: "#0f172a",   // Tailwind slate-900
    },
    gradients: {
      blueOrange: "bg-gradient-to-r from-blue-600 to-orange-500",
      darkLight: "bg-gradient-to-r from-slate-900 to-white",
    },
  },
};

export default theme;
