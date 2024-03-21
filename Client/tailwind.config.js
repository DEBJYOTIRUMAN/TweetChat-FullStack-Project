/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "secondary": "#8696a0",
        "input-background": " #2a3942",
        "primary-strong": "#e9edef",
        "panel-header-background": "#202c33",
        "panel-header-icon": "#aebac1",
        "icon-blue": "#1d9bf0",
        "conversation-border": "rgba(134,150,160,0.15)",
        "conversation-panel-background": "#15202b",
        "outgoing-background": "#1b8cd8",
        "bubble-meta": "hsla(0,0%,100%,0.6)",
      },
    },
    screens: {
      xs: { max: "420px" },
      sm: { max: "624px" },
      md: { max: "780px" },
      lg: { max: "1124px" },
      xl: { max: "1280px" },
    },
  },
  plugins: [],
};
