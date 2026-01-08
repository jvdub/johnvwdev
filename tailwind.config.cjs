module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "var(--brand-navy)",
          gold: "var(--brand-gold)",
          forest: "var(--brand-forest)",
        },
        bg: {
          DEFAULT: "var(--bg)",
          2: "var(--bg2)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          2: "var(--surface2)",
        },
        fg: {
          DEFAULT: "var(--text)",
          muted: "var(--muted)",
        },
        border: "var(--border)",
        accent: {
          DEFAULT: "var(--accent)",
          2: "var(--accent2)",
        },
        success: "var(--success)",
        focus: "var(--focus)",
      },
      borderRadius: {
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      maxWidth: {
        content: "var(--max)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        elev: "var(--shadow)",
      },
    },
  },
  plugins: [],
};
