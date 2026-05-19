import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: "#F7E6B2",
        ocean: "#0EA5E9",
        ink: "#070B12",
        sun: "#F5C76B",
        brand: {
          black: "#070B12",
          charcoal: "#0B1B2B",
          panel: "#111A24",
          red: "#0EA5E9",
          "red-deep": "#0F766E",
          teal: "#0F766E",
          turquoise: "#38BDF8",
          gold: "#F5C76B",
          sand: "#F7E6B2",
          coral: "#F9735B",
          text: "#F8FAFC",
          muted: "#CBD5E1",
          "muted-soft": "#AFC7D1"
        }
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
