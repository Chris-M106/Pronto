/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1a2847',
        blue: '#2563eb',
        teal: '#14b8a6',
        amber: '#f59e0b',
        light: {
          bg: '#f8fafc',
        },
        dark: {
          bg: '#0f172a',
        },
        text: {
          dark: '#1e293b',
          light: '#94a3b8',
        },
        border: '#e2e8f0',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '4xl': '32px',
        '6xl': '48px',
      },
      fontWeight: {
        normal: '400',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [],
};
