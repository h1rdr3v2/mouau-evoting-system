import React from 'react';
import {useAuth} from "@/core/queries/useAuth";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {ThemeToggle} from "@/components/ThemeToggle";
import {ThemedButton} from "@/components/ThemedButton";
import {useAuthStore} from "@/core/stores/useAuthStore";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";

function SettingsScreen() {
	const user = useAuthStore(state => state.user);
	const {logout} = useAuth();
	
	return (
		<ThemedSafeAreaView>
			<ThemedView className='flex-1'>
				<ThemedText>Tabs index</ThemedText>
				<ThemedText>User: {JSON.stringify(user)}</ThemedText>
				<ThemedButton
					title="Logout"
					variant='destructive'
					onPress={() => logout()}
				/>
				<ThemeToggle/>
			</ThemedView>
		</ThemedSafeAreaView>
	);
}

export default SettingsScreen;
