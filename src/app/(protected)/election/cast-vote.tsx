import React from 'react';
import {View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedButton} from "@/components/ThemedButton";
import {router} from "expo-router";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";

const CastVote = () => {
	return (
		<ThemedSafeAreaView>
			<View className='px-4'>
				<View className='gap-5'>
					<ThemedText>
						Casting Vote
					</ThemedText>
					<ThemedButton
						size='large'
						title='Cast Vote'
						// onPress={() => router.push('/election')}
					/>
				</View>
			</View>
		</ThemedSafeAreaView>
	);
};

export default CastVote;