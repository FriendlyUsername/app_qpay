/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors"

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vercel: {
          pink: "#FF0080",
          blue: "#0070F3",
          cyan: "#50E3C2",
          orange: "#F5A623",
          violet: "#7928CA",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        montserrat: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
}
