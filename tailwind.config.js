/* eslint-disable camelcase */
/* eslint-disable global-require */
const app_max_width = '2552px';

const fontSizes = {
  xs: 0.75,
  sm: 0.875,
  base: 1.5,
  lg: 1.125,
  xl: 1.35,
  '2xl': 1.814,
  '3xl': 2.828,
  '4xl': 4.242,
  '5xl': 3,
  '6xl': 4,
};
const getSizes = () => {
  return Object.entries(fontSizes).reduce((acc, [name, multiplier]) => {
    return {
      ...acc,
      [name]: `${multiplier}rem`,
      [`m${name}`]: `${multiplier * 0.75}rem`,
    };
  }, {});
};

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1025px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontSize: {
      ...getSizes(),
    },
    extend: {
      maxWidth: {
        app_max_width,
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
      },
      spacing: {
        app_side: '30px',
        app_side_small: '20px',
        app_max_width,
      },
      colors: {
        main: '#54699a',
        secondary: '#059669',
        white: '#FFFFF0',
        black: '#2D3748',
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
