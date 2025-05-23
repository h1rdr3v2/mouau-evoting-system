import {Stack} from "expo-router";
import {useNavigationTheme} from "@/core/hooks/useNavigationTheme";


export default function NewsLayout() {
	return (
		<Stack screenOptions={useNavigationTheme({})}>
			<Stack.Screen name="[id]" options={{headerShown: false}}/>
		</Stack>
	);
}
