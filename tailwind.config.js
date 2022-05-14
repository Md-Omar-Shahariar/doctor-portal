module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0FCFEC",
          accent: "#3A4256",
          secondary: "#19D3AE",

          "base-100": "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
