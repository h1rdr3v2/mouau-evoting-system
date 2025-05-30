import {Redirect, Stack} from "expo-router";
import {useUser} from "@/core/hooks/useUser";
import {useNavigationTheme} from "@/core/hooks/useNavigationTheme";

export default function ProtectedLayout() {
	const {isLoggedIn} = useUser()
	
	if (!isLoggedIn()) return <Redirect href="/onboarding"/>;
	
	return (
		<Stack screenOptions={useNavigationTheme({})}>
			<Stack.Screen name="(tabs)" options={{headerShown: false}}/>
			<Stack.Screen name="election" options={{headerShown: false}}/>
			<Stack.Screen name="trending-news" options={{
				headerShown: true,
				headerBackTitle: "Home",
				headerTitle: "News",
				headerTransparent: true
			}}/>
		</Stack>
	);
}