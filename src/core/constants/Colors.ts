import {AppColors} from "@/core/types/Colors";

export const Colors = {
	primary: {
		light: '#0a7ea4',
		dark: '#0a7ea4',
	},
	text: {
		light: '#11181C',
		dark: '#ECEDEE',
	},
	background: {
		light: '#fff',
		dark: '#151718',
	},
	// Add navigation-specific Colors
	navigation: {
		header: {
			background: {
				light: '#fff',
				dark: '#151718',
			},
			tint: {
				light: '#0a7ea4', // Your primary.light
				dark: '#ECEDEE',  // Your text.dark
			},
			text: {
				light: '#11181C',
				dark: '#ECEDEE',
			}
		},
		content: {
			background: {
				light: '#fff',
				dark: '#151718',
			}
		},
		border: {
			light: '#e0e0e0',
			dark: '#e0e0e0',
		}
	}
};

// Function to get current theme Colors
export function getThemeColors(isDark: boolean): AppColors {
	const theme = isDark ? 'dark' : 'light';
	
	return {
		primary: Colors.primary[theme],
		text: Colors.text[theme],
		background: Colors.background[theme],
		navigation: {
			header: {
				background: Colors.navigation.header.background[theme],
				tint: Colors.navigation.header.tint[theme],
				text: Colors.navigation.header.text[theme],
			},
			content: {
				background: Colors.navigation.content.background[theme],
			},
			border: Colors.navigation.border[theme]
		}
	};
}