module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['"Atkinson Hyperlegible"', "system-ui", "ui-sans-serif"],
      serif: ['"Atkinson Hyperlegible"', "Georgia"],
      mono: ['"Atkinson Hyperlegible"', "ui-sans-serif"],
      body: ['"Atkinson Hyperlegible"', "ui-sans-serif"],
      display: ['"Atkinson Hyperlegible"', "ui-sans-serif"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
