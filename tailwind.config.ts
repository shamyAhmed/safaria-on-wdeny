import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0074C3",
        "primary-800": "#002D57",
        secondary: "#013A34",
        white: "#FFFFFF",
        main: "#E1BD22",
        titlesColor: "#111113",
        brown: "#F47522",
        blueText: "#0074C3",
      },
      fontFamily: {
        sans: [
          "var(--font-tajawal)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      keyframes: {
        "float-moon": {
          "0%": {
            transform: "translate(10%, 20%) rotate(0deg)",
            opacity: "0.7",
          },
          "25%": {
            transform: "translate(60%, 10%) rotate(90deg)",
            opacity: "0.9",
          },
          "50%": {
            transform: "translate(70%, 40%) rotate(180deg)",
            opacity: "0.7",
          },
          "75%": {
            transform: "translate(30%, 50%) rotate(270deg)",
            opacity: "0.9",
          },
          "100%": {
            transform: "translate(10%, 20%) rotate(360deg)",
            opacity: "0.7",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-moon": "float-moon 20s ease-in-out infinite",
      },
    },

    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
} satisfies Config;
