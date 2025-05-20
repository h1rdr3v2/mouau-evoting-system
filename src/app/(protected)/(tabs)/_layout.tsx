import {Tabs} from 'expo-router'
import {useTheme} from "@/core/contexts/ThemeContext";
import {Feather, FontAwesome5, Ionicons} from "@expo/vector-icons";
import React from "react";

function Layout() {
	const {colors} = useTheme();
	return (
		<Tabs screenOptions={{
			headerShown: false,
			tabBarActiveTintColor: colors.primary,
			tabBarStyle: {
				backgroundColor: colors.navigation.content.background,
				borderTopColor: colors.navigation.border || '#e0e0e0',
			},
			tabBarLabelStyle: {
				fontSize: 12,
				fontWeight: '500',
			},
		}}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({color}) => <Feather name='home' size={22} color={color}/>
				}}
			/>
			<Tabs.Screen
				name="vote"
				options={{
					title: 'Vote',
					tabBarIcon: ({color}) => <FontAwesome5 name="vote-yea" size={22} color={color}/>
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: 'Settings',
					tabBarIcon: ({color}) => <Ionicons name='settings-sharp' size={22} color={color}/>
				}}
			/>
		</Tabs>
	)
}

export default Layout;