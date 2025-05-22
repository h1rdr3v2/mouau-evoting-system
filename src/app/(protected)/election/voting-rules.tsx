import React from 'react';
import {router} from "expo-router";
import {ThemedText} from "@/components/ThemedText";
import {View, Image, Dimensions} from "react-native";
import {ThemedButton} from "@/components/ThemedButton";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";

const screenWidth = Dimensions.get('window').width;

const VotingRules = () => {
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
				<View className='gap-5 mb-4'>
					<ThemedButton
						size='large'
						title='I understand'
						onPress={() => router.push('/election/cast-vote')}
					/>
					<ThemedButton
						variant='text'
						title='Go Back'
						onPress={() => router.dismissTo('/election')}
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