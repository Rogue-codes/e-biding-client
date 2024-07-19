/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "1.75rem",
        "3xl": "2rem",
        "4xl": "2.375rem",
        "5xl": "3rem",
        "6xl": "3.375rem",
        "7xl": "64px",
      },
      colors: {
        "EBD-Primary": "#3E4095",
        "EBD/Darkest": "#141533",
        "EBD/Light": "#DADBF2",
        "EBD/Lightest": "#F5F5Fa",
        "EBD/Dark": "#505173",
        "EBD/Medium": "#8787A8",
        "EBD/Success": "#269B47",
      },
    },
  },
  plugins: [],
};