import React from 'react';
import {Text, View} from "react-native";
import {useAuthStore} from "@/core/stores/useAuthStore";

function Index() {
	const user = useAuthStore(state => state.user);
	
	return (
		<View>
			<Text>Tabs index</Text>
			<Text>User: {JSON.stringify(user)}</Text>
		</View>
	);
}

export default Index;
