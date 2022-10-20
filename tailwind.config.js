/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
      },
      colors: {
        cryptoGreen: "#22C55E",
        darkBlue: "#07152A",
        darkerBlue: "#051111",
      },
    },
  },
  plugins: [],
};
