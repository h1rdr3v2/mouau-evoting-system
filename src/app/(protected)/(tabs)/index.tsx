import React from 'react';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {useAuthStore} from "@/core/stores/useAuthStore";
import {SafeAreaView} from "react-native";

function Index() {
	const user = useAuthStore(state => state.user);
	
	return (
		<SafeAreaView style={{flex: 1}}>
			<ThemedView className='flex-1'>
				<ThemedText>Tabs index</ThemedText>
				<ThemedText>User: {JSON.stringify(user)}</ThemedText>
			</ThemedView>
		</SafeAreaView>
	);
}

export default Index;
