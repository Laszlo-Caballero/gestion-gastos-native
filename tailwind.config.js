/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
    "./app/**/*.{js,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        g: {
          green: {
            1: "#E8FFF6",
            2: "#06B58A",
            3: "#F6FBF9",
          },
          black: "#0F1722",
          gray: {
            1: "#7A8A85",
            2: "#E6F0EA",
          },
        },
      },
    },
  },
  plugins: [],
};
