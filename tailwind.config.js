/** @type {import('tailwindcss').Config} */
import {Colors} from './src/core/constants/Colors'

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
			colors: Colors,
		},
	},
	plugins: [],
}
