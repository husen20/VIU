/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      daisyui: {
        themes: ['wireframe'],
      },
    },
  },
  plugins: [require('daisyui')],
};
