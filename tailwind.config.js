/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient': "linear-gradient(to right, #C9184A, #FFB5A7)",
      },
      colors: {
        pink: "#C9184A",
        blue: "#02394A",
        cream: "#F8EDEB",
        snowWhite: "#F7FEFD",
        white: "#F4F4F4",
        lightpink: "#F8EDEB",
        peach: "#F9DCC4",
        'gradient': "linear-gradient(to right, #C9184A, #FFB5A7)",
        black : "#000000"
      },
      fontFamily: {
        "fira-sans": ["Fira Sans"],
        "lato": ["Lato" ],
        "dancing-script": ["Dancing Script"],
      },
      fontSize: {
        xs: "8px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "48px",
        "4xl": "60px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};