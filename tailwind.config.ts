import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': 'var(--primary-dark)',
        'primary-light': 'var(--primary-light)',
        'secondary-dark': 'var(--secondary-dark)',
        'secondary-light': 'var(--secondary-light)',
        'secondary-light-hover': 'var(--secondary-light-hover)',
        'accent-light': 'var(--accent-light)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
export default config;
