import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-merriweather)"],
      },
      colors: {
        slate: {
          900: "#0f172a",
        },
        brand: {
          blue: "#2563EB",
        },
        alert: {
          red: "#ef4444",
        },
        terminal: {
          green: "#22c55e",
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-size": "40px 40px",
      },
    },
  },
  plugins: [],
};
export default config;

