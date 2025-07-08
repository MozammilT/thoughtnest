/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: "#fdc700",
        background: "var(--background)",
        "muted-foreground": "var(--muted-foreground)",
      },
    },
  },
  plugins: [],
};
