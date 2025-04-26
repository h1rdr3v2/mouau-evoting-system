/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        // Set Montserrat font
        'montserrat-thin': ['Montserrat_100Thin'],
        'montserrat-extralight': ['Montserrat_200ExtraLight'],
        'montserrat-light': ['Montserrat_300Light'],
        'montserrat': ['Montserrat_400Regular'],
        'montserrat-medium': ['Montserrat_500Medium'],
        'montserrat-semibold': ['Montserrat_600SemiBold'],
        'montserrat-bold': ['Montserrat_700Bold'],
        'montserrat-extrabold': ['Montserrat_800ExtraBold'],
        'montserrat-black': ['Montserrat_900Black'],
      },
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
