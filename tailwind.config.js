/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        primary: "var(--primary)",
        bg: "var(--background)",
        paper: "var(--paper)",
        border: "var(--border)",
        txt: "var(--text)",
      }
    },
  },
  plugins: [],
}
