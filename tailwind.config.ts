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
        sand: "#F6F1E8",
        ocean: "#0F5C78",
        ink: "#102A43",
        sun: "#D9A441",
        brand: {
          black: "#000000",
          charcoal: "#0A0A0A",
          panel: "#111111",
          red: "#E1062C",
          "red-deep": "#8B0018",
          text: "#FFFFFF",
          muted: "#B3B3B3",
          "muted-soft": "#8A8A8A"
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
