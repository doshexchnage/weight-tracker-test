/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        customBlue1: '#82A6CB',
        customBlue2: '#3667A6',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to top, #82A6CB, #3667A6)',
      },
    },
  },
  plugins: [],
  variants: { },
}
