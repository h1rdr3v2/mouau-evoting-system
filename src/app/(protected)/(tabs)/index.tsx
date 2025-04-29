import React from 'react';
import {useAuth} from "@/core/queries/useAuth";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {ThemedButton} from "@/components/ThemedButton";
import {useAuthStore} from "@/core/stores/useAuthStore";

function Index() {
	const user = useAuthStore(state => state.user);
	const {logout} = useAuth();
	
	return (
		<ThemedView>
			<ThemedText>Tabs index</ThemedText>
			<ThemedText>User: {JSON.stringify(user)}</ThemedText>
			<ThemedButton
				title="Logout"
				variant='destructive'
				onPress={() => logout()}
			/>
		</ThemedView>
	);
}

export default Index;
