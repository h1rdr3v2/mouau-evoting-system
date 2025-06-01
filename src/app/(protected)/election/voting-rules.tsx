import React from 'react';
import {View, Image, Dimensions} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {ThemedText} from "@/components/Themed/ThemedText";
import {ThemedButton} from "@/components/Themed/ThemedButton";
import {ThemedSafeAreaView} from "@/components/Themed/ThemedSafeAreaView";

const screenWidth = Dimensions.get('window').width;

const VotingRules = () => {
	const {electionId} = useLocalSearchParams<{ electionId: string }>();
	
	return (
		<ThemedSafeAreaView>
			<View className='px-4 flex-1 justify-between'>
				<View className='gap-10'>
					<ThemedText type='subtitle' className='text-center'>
						Voting rules
					</ThemedText>
					<View className='gap-6'>
						<View className='flex-row gap-4 justify-center'>
							<VotingCard
								rule='You are allowed to edit your vote before submitting the final vote'
								imageSource={require('@/assets/images/placeholder.png')} // Replace with your actual image path
							/>
							<VotingCard
								rule='Do not close this app until voting is completed'
								imageSource={require('@/assets/images/placeholder.png')} // Replace with your actual image path
							/>
						</View>
						<View className='flex-row gap-4 justify-center'>
							<VotingCard
								rule='You have to select the candidate of your choice before proceeding'
								imageSource={require('@/assets/images/placeholder.png')} // Replace with your actual image path
							/>
							<VotingCard
								rule='After selecting slide this button to continue'
								imageSource={require('@/assets/images/placeholder.png')} // Replace with your actual image path
							/>
						</View>
					</View>
				</View>
				<View className='gap-3 mb-9'>
					<ThemedButton
						size='large'
						title='I understand'
						onPress={() => router.push(`/election/cast-vote?electionId=${electionId}`)}
					/>
					<ThemedButton
						variant='secondary'
						size='large'
						title='Go Back'
						onPress={() => router.back()}
					/>
				</View>
			</View>
		</ThemedSafeAreaView>
	);
};

const VotingCard = ({rule, imageSource}: { rule: string, imageSource: ImageData }) => {
	// Calculate card width based on screen size (accounting for padding and gap)
	const cardWidth = (screenWidth - 32 - 16) / 2; // (screenWidth - outerPadding - gap) / 2 cards
	
	return (
		<View style={{width: cardWidth}}>
			<View className='aspect-square rounded-xl border border-primary-light overflow-hidden'>
				<Image
					source={imageSource}
					style={{width: '100%', height: '100%'}}
					resizeMode="cover"
				/>
			</View>
			<ThemedText className='text-sm mt-1'>{rule}</ThemedText>
		</View>
	);
};

export default VotingRules;