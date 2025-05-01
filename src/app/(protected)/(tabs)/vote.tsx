import React from 'react';
// import {useAuth} from "@/core/queries/useAuth";
// import {useAuthStore} from "@/core/stores/useAuthStore";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";

function VoteScreen() {
	return (
		<ThemedSafeAreaView className='bg-blend-overlay'>
			<ThemedView className='flex-1'>
				<ThemedText>Vote screen</ThemedText>
			</ThemedView>
		</ThemedSafeAreaView>
	);
}

export default VoteScreen;
