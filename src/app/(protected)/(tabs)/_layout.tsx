import {Tabs} from 'expo-router'
import {Home, Settings} from "lucide-react-native"
import {useTheme} from "@/core/contexts/ThemeContext";
import {useNavigationTheme} from "@/core/hooks/useNavigationTheme";
import {BottomTabNavigationOptions} from "@react-navigation/bottom-tabs";

function Layout() {
	const {colors} = useTheme();
	return (
		<Tabs screenOptions={useNavigationTheme({
			headerShown: true,
			tabBarActiveTintColor: colors.primary,
			tabBarStyle: {
				height: 55,
				backgroundColor: colors.navigation.content.background,
				borderTopColor: colors.navigation.border || '#e0e0e0',
			},
			tabBarLabelStyle: {
				fontSize: 12,
				fontWeight: '500',
			},
			tabBarIconStyle: {
				marginTop: 4,
			}
		}) as BottomTabNavigationOptions}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({color}) => <Home size={24} color={color}/>
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: 'Settings',
					tabBarIcon: ({color}) => <Settings size={24} color={color}/>
				}}
			/>
		</Tabs>
	)
}

export default Layout;