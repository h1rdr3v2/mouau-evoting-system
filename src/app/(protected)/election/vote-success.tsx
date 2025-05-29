import React from 'react';
import {View} from "react-native";
import {router} from "expo-router";
import LottieView from "lottie-react-native";
import {ThemedText} from "@/components/Themed/ThemedText";
import {ThemedButton} from "@/components/Themed/ThemedButton";
import {ThemedSafeAreaView} from "@/components/Themed/ThemedSafeAreaView";

const VoteSuccess = () => {
	return (
		<ThemedSafeAreaView>
			
			<View className='px-4 justify-around flex-1'>
				<ThemedText type='title' className='text-center pt-3'>Thanks for voting!</ThemedText>
				<View className='gap-5'>
					<LottieView
						autoPlay
						style={{
							width: '100%',
							height: 300,
						}}
						source={require('@/assets/election/vote-success-lottie.json')}
					/>
					<ThemedText type='light' className='self-center text-center pt-3 w-[190px]'>
						Your vote has been successfully submitted
					</ThemedText>
				</View>
				<View className='gap-3'>
					<ThemedButton
						size='large'
						title="Post a selfie picture"
					/>
					<ThemedButton
						size={'large'}
						title="Go Home"
						variant='text'
						onPress={() => router.dismissTo('/')}
					/>
				</View>
			</View>
		</ThemedSafeAreaView>
	);
};

export default VoteSuccess;