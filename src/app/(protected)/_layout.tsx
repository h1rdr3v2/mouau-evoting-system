import {Redirect, Stack} from "expo-router";
import {useUser} from "@/core/hooks/useUser";

export default function ProtectedLayout() {
	const {isLoggedIn} = useUser()
	
	if (!isLoggedIn) return <Redirect href="/onboarding"/>;
	
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{headerShown: false}}/>
			<Stack.Screen name="election" options={{headerShown: false}}/>
		</Stack>
	);
}