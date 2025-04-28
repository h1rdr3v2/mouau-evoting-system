import {Redirect, Stack} from "expo-router";
import {useAuth} from "@/core/queries/useAuth";

export default function ProtectedLayout() {
	const {user, isLoading} = useAuth();
	
	if (isLoading) return null; // Return null while loading
	
	if (!user) return <Redirect href="/onboarding"/>;
	
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
