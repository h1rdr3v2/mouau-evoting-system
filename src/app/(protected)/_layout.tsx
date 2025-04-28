import {Redirect, Stack} from "expo-router";
import {useAuthStore} from "@/core/stores/authStore";

export default function ProtectedLayout() {
	const isLoggedIn = useAuthStore(state => state.isLoggedIn());
	
	if (!isLoggedIn) return <Redirect href="/onboarding"/>;
	
	return (
		<Stack>
			<Stack.Screen
				name="(tabs)"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
