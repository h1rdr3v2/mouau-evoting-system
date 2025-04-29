import React from 'react';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {useAuthStore} from "@/core/stores/useAuthStore";

function Index() {
	const user = useAuthStore(state => state.user);
	
	return (
		<ThemedView className='flex-1'>
			<ThemedText>Tabs index</ThemedText>
			<ThemedText>User: {JSON.stringify(user)}</ThemedText>
		</ThemedView>
	);
}

export default Index;
