import React from 'react';
import {View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";

const VotingRules = () => {
	return (
		<ThemedSafeAreaView>
			<View>
				<ThemedText>
					Voting rules
				</ThemedText>
			</View>
		</ThemedSafeAreaView>
	);
};

export default VotingRules;