import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070f",
        panel: "rgba(11, 18, 32, 0.72)",
        cyanIQ: "#32e6ff",
        violetIQ: "#8b5cf6",
        mintIQ: "#55f6b0",
        dangerIQ: "#ff5f7a"
      },
      boxShadow: {
        glow: "0 0 40px rgba(50, 230, 255, 0.22)",
        violet: "0 0 42px rgba(139, 92, 246, 0.22)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
