/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    container:{
      center:true,
      padding:"15px",
    },
    screen:{
        sm:"640px",
        md:"768px",
        lg:"960px",
        xl:"1200px",
    },
    extend: {
      colors:{
        primary:"#C6E7FF",
        default:"#FBFBFB"
      }

    },
  },
  plugins: [],
}

