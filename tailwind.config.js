/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6363",
        theme: {
          light: "#ffffff", // Light theme primary color
          dark: "#000000", // Dark theme primary color
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
