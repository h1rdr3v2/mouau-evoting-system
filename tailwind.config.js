/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Match your theme colors
        primary: {
          light: '#0a7ea4', // Your tintColorLight
          dark: '#656565',     // Your tintColorDark
        },
        text: {
          light: '#11181C', // Your text light color
          dark: '#ECEDEE',  // Your text dark color
        },
        background: {
          light: '#fff',
          dark: '#151718',
        },
        // Add other colors as needed
      },
    },
  },
  plugins: [],
}
