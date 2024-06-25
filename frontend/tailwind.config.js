/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#5B64B4",
        "card-background": "#FDFDFA",
        text: "#2C2C2C",
        "dark-pink": "#E84A8F",
        "light-pink": "#E5B4C6",
        "sidebar-background": "#737172",
      },
      fontFamily: {
        body: ["Josefin Slab", "sans-serif"],
      },
    },
  },
  plugins: [],
};
