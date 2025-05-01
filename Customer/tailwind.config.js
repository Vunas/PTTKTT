import { defineConfig } from 'tailwindcss'

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        yellow: "#ffb703", // ghi đè thêm custom, vẫn giữ yellow-300
        black: "#000000",
        gray: "#e5e5e5",
      },
    },
  },
  plugins: [],
};