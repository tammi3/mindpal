/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        Pickled_Bluewood: '#294046',
        Athens_Gray: '#eff1f4',
        Catskill_White: '#ecf5f6',
        Water_Leaf: '#a6e8e0',
        Plantation: '#25434e',
      },
      fontFamily: {
        Poppins: ['Poppins', 'serif'],
        NotoSans: ['Noto Sans', 'serif'],
        Montserrat: ['Montserrat', 'serif'],
        PlaywriteIN: ['Playwrite IN', 'serif'],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('flowbite/plugin')],
}
