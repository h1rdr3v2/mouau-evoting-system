import {router, Stack} from "expo-router";
import {HeaderBackButton} from '@react-navigation/elements'
import {useNavigationTheme} from "@/core/hooks/useNavigationTheme";

function CustomBackButton() {
	return router.canGoBack() ? (
		<HeaderBackButton
			style={{marginInline: -10}}
			onPress={() => router.back()}
		/>
	) : null;
}

export default function ElectionLayout() {
	return (
		<Stack screenOptions={useNavigationTheme({
			headerShown: true,
			headerBackTitle: "Back",
		})}>
			<Stack.Screen name="[id]" options={{
				headerTitle: "",
				headerLeft: () => <CustomBackButton/>
			}}
			/>
			<Stack.Screen name="voting-rules" options={{headerShown: false}}/>
			<Stack.Screen name="cast-vote" options={{
				headerShown: true,
				headerTitle: "",
			}}/>
			<Stack.Screen name="candidate-modal" options={{
				presentation: "modal",
				headerShown: false,
			}}/>
			<Stack.Screen name="confirm-vote" options={{headerShown: true, headerTitle: "Confirm Voting"}}/>
		</Stack>
	);
}
