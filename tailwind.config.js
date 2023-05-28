/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 0px 5px 0px rgba(0, 0, 0, 0.3)',
      }
    }
  },
  plugins: [],
}

