module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blog-accent": "#F46036",
        "blog-light-1": "#5B85AA",
        "blog-light-2": "#414770",
        "blog-dark-1": "#171123",
        "blog-dark-2": "#372248",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
