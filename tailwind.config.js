/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // tailwind будет отслеживать все компоненты
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f1117', // наш тёмный фон
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // шрифт Inter по умолчанию
      },
    },
  },
  darkMode: 'class', // если используешь переключение темы
  plugins: [],
};
