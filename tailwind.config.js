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
        "Merriweather": ["Merriweather"],
        "Merriweather-Sans": ["Merriweather Sans"],
        "Tangerine" : ["Tangerine"],
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
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        type: 'type 1.5s linear forwards',
        cursor: 'cursor 2s step-end infinite',      
      },

        keyframes: {
        type: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        cursor: {
          '50%': { borderColor: 'transparent' },
        },
        slidein: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
     
     
    },
  },
  plugins: [require("@tailwindcss/typography")],
};