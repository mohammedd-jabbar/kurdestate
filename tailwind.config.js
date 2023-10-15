/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      primary: ["Poppins", "sans-serif"],
      gram: ["Gram", "sans-serif"],
      Tsch: ["Tschichold", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "30px",
        lg: "0",
      },
    },
    screens: {
      xs: "350px",
      sm: "640px",
      md: "768px",
      lg: "1124px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', ...fontFamily.sans],
        lato: ['"Lato"', ...fontFamily.sans],
        bebas: ['"Bebas Neue"', ...fontFamily.sans],
        inter: ['"Inter"', ...fontFamily.sans],
        rabar: ['"rabar"', ...fontFamily.sans],
      },
      colors: {
        primary: {
          500: "#7065f0",
          600: "#5950c0",
          700: "#4e46a8",
          800: "#433c90",
        },
        darkBackground: "#1e293b",
        darkBackgroundDarker: "#121923",
        headerBackground: "#ffff",
        background: "#f5f7fb",
        border: "#e9e7f9",
      },
      transitionDuration: {
        300: "300ms",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
