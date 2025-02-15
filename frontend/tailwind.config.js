module.exports = {
    // ...
    content: ["./src/**/*.{js,ts,jsx,tsx,html}"], 
  theme: {
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
  },
};
