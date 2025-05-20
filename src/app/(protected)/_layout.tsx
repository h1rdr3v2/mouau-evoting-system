import {Redirect, Stack} from "expo-router";
import {useAuthStore} from "@/core/stores/useAuthStore";

export default function ProtectedLayout() {
	const isLoggedIn = useAuthStore(state => state.isLoggedIn());
	
	if (!isLoggedIn) return <Redirect href="/onboarding"/>;
	
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{headerShown: false}}/>
			<Stack.Screen name="election" options={{headerShown: false}}/>
		</Stack>
	);
}