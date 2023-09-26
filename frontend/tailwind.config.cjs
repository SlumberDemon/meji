/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const { createThemes } = require("tw-colors");

module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        times: ["Times New Roman", "serif"],
      },
    },
  },
  plugins: [
    createThemes({
      meji: {
        primary: "#4c0519",
        secondary: "#881337",
        tertiary: "#9f1239",
        quaternary: "#be123c",
        bg: "#fff1f2",
        bg2: "#fda4af",
        bg3: "#fb7185",
        brand: "#F43F5E",
      },
      light: {
        primary: "#0a0a0a",
        secondary: "#262626",
        tertiary: "#525252",
        quaternary: "#a3a3a3",
        bg: "#fafafa",
        bg2: "#f5f5f5",
        bg3: "#e5e5e5",
        brand: "#F43F5E",
      },
      dark: {
        primary: "#fafafa",
        secondary: "#e5e5e5",
        tertiary: "#a3a3a3",
        quaternary: "#525252",
        bg: "#0a0a0a",
        bg2: "#171717",
        bg3: "#262626",
        brand: "#F43F5E",
      },
    }),
  ],
};
