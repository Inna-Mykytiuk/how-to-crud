import daisyui from "daisyui"


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      smMin: "430px",
      sm: "450px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xlg: "1440px",
      xxl: "1550px",
      large: "2100px",

      smOnly: { min: '320', max: '768px' },
      xxlOnly: { min: '1280px', max: '1780px' },
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          md: '2rem',
          xl: '2rem',
        },
      },
    },
  },
  plugins: [daisyui,],
  daisyui: {
    themes: ["night"],
  },
}

