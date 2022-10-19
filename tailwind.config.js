/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        "hero": "url('../public/background_texture_sm.jpg')",
        "nav": "url('../public/bg_gray_sm_sm.jpg')",
        "tobs": "url('../public/tobias_vintage_sm.jpg')",
      },
    },
    plugins: [],
  },
};
