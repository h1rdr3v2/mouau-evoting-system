import {Redirect, Stack} from "expo-router";
import {useAuthStore} from "@/core/stores/useAuthStore";
import {useNavigationTheme} from "@/core/hooks/useNavigationTheme";

export default function ProtectedLayout() {
	const isLoggedIn = useAuthStore(state => state.isLoggedIn());
	
	if (!isLoggedIn) return <Redirect href="/onboarding"/>;
	
	return (
		<Stack screenOptions={useNavigationTheme({})}>
			<Stack.Screen
				name="(tabs)"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="election"
				options={{
					headerShown: true,
					headerBackTitle: "Back",
					headerTitle: "",
				}}
			/>
		</Stack>
	);
}
