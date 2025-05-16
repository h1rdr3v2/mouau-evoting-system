import {Stack} from "expo-router";

export default function ElectionLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{headerShown: false}}/>
		</Stack>
	);
}
