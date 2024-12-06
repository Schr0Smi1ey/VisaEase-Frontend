/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6363",
        theme: {
          light: "#3b82f6", // Light theme primary color
          dark: "#1e40af", // Dark theme primary color
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
