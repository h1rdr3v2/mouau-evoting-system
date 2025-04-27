import {useTheme} from "@/core/contexts/ThemeContext";
import {NativeStackNavigationOptions} from "@react-navigation/native-stack";

export function useNavigationTheme(customOptions = {}): NativeStackNavigationOptions {
	const {colors} = useTheme();
	
	const defaultOptions: NativeStackNavigationOptions = {
		headerShown: false,
		animation: "none",
		headerStyle: {
			backgroundColor: colors.navigation.header.background,
		},
		headerTintColor: colors.navigation.header.tint,
		headerTitleStyle: {
			fontWeight: 'bold',
			color: colors.navigation.header.text,
		},
		contentStyle: {
			backgroundColor: colors.navigation.content.background,
		},
	};
	
	return {...defaultOptions, ...customOptions};
}