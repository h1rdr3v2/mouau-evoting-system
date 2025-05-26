import React from "react";
import {Stack} from "expo-router";
import {useNavigationTheme} from "@/core/hooks/useNavigationTheme";

export default function StackLayout() {
	return (
		<Stack
			screenOptions={useNavigationTheme({headerShown: false, animation: 'none'})}
		>
			<Stack.Screen name="onboarding"/>
			<Stack.Screen name="login"/>
			<Stack.Screen name="verification" options={{
				headerShown: true,
				title: "",
				headerBackTitle: "Back"
			}}
			/>
		</Stack>
	);
}
