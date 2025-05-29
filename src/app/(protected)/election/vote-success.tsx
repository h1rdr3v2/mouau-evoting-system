import React from 'react';
import {ThemedSafeAreaView} from "@/components/Themed/ThemedSafeAreaView";
import {ThemedText} from "@/components/Themed/ThemedText";

const VoteSuccess = () => {
	return (
		<ThemedSafeAreaView>
			<ThemedText>
				voted successfully!
			</ThemedText>
		</ThemedSafeAreaView>
	);
};

export default VoteSuccess;