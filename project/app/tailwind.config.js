/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        brandGreen: '#789877',
        brandGreenHover: '#627c62',
        red: '#eb4034',
        bgRGBA: 'rgba(255, 255, 255, 0.9)',
      },
      width: {
        '95': '95%'
      }
    },
  },
  plugins: [],
}
