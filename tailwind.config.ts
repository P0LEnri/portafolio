import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A2540',
          light: '#2A9DF4',
          dark: '#061829',
        },
        ai: {
          blue: '#2A9DF4',
          purple: '#6B46C1',
          green: '#10B981',
        },
        surface: {
          light: '#F5F5F5',
          white: '#FFFFFF',
          glass: 'rgba(255, 255, 255, 0.1)',
        },
        text: {
          primary: '#1A1A1A',
          light: '#FFFFFF',
          glow: '#2A9DF4',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'ai-gradient': 'linear-gradient(to right bottom, #0A2540, #2A9DF4)',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
    },
  },
  plugins: [],
} satisfies Config;