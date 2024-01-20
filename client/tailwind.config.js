const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      bungee: ["Bungee Spice"],
      baloo2: ["Baloo Bhaijaan 2"],
    },
    fontWeight: {
      thin: "100",
      hairline: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "1000",
      "extra-bold": "2200",
      black: "900",
    },
    screens: {
      sm: "480px",
      md: "620px",
      lg: "768px",
      xl: "1080px",
      "1xl": "1200px",
      "2xl": "1440px",
    },

    colors: {
      primary: "#fdcc1a",
      secondary: "#fa6a41",
      "text-primary": "white",
      "text-orange": "#ee7129",
      "text-secondary": "black",
      "text-red": "red",
      "text-green": "green",
      "bg-primary": "#fefeff",
      "bg-hover-primary": "#fcebdf",

      slate: {
        50: "rgb(248, 250, 252)",
        100: "rgb(241, 245, 249)",
        200: "rgb(226, 232, 240)",
        300: "rgb(203, 213, 225)",
        400: "rgb(148, 163, 184)",
        500: "rgb(100, 116, 139)",
        600: "rgb(71, 85, 105)",
        700: "rgb(51, 65, 85)",
      },
    },
    extend: {},
  },
  plugins: [],
};
