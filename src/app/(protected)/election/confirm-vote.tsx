import React from 'react';
import {router} from "expo-router";
import {BlurView} from 'expo-blur';
import {ThemedText} from "@/components/ThemedText";
import {ThemedButton} from "@/components/ThemedButton";
import {View, ScrollView, StyleSheet, Platform} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";


const CastVote = () => {
	const {bottom, top} = useSafeAreaInsets();
	
	return (
		<>
			{/* Scrollable content that extends underneath the button */}
			<ScrollView
				style={{flex: 1, paddingTop: top}}
				// This ensures content can scroll behind the button
				contentInset={{bottom: 80}} // iOS
				contentContainerStyle={{
					padding: 16,
					paddingBottom: Platform.OS === 'android' ? 80 : 0,
					paddingTop: Platform.OS === 'android' ? top : 0
				}} // Android
			>
				<View className='gap-5' style={{paddingTop: top}}>
					<ThemedText type='defaultSemiBold' className='text-lg'>confirm your selected candidates</ThemedText>
					<ThemedText type='title'>
						NACOS Executive Elections 2025
					</ThemedText>
					<ThemedText className='max-w-[50%]'>Please select a candidate for President</ThemedText>
					
					{/* Add your candidate selection UI here */}
					<View className='gap-4 mt-5'>
						{/* Example placeholder for candidate selection */}
						<ThemedText>Candidate 1</ThemedText>
						<ThemedText>Candidate 2</ThemedText>
						<ThemedText>Candidate 3</ThemedText>
						<ThemedText>Candidate 4</ThemedText>
						<ThemedText>Candidate 5</ThemedText>
						<ThemedText>Candidate 6</ThemedText>
						<ThemedText>Candidate 7</ThemedText>
						<ThemedText>Candidate 8</ThemedText>
						{/* More candidates to demonstrate scrolling */}
						<ThemedText>Candidate 9</ThemedText>
						<ThemedText>Candidate 10</ThemedText>
						<ThemedText>Candidate 11</ThemedText>
						<ThemedText>Candidate 12</ThemedText><ThemedText>Candidate 1</ThemedText>
						<ThemedText>Candidate 2</ThemedText>
						<ThemedText>Candidate 3</ThemedText>
						<ThemedText>Candidate 4</ThemedText>
						<ThemedText>Candidate 5</ThemedText>
						<ThemedText>Candidate 6</ThemedText>
						<ThemedText>Candidate 7</ThemedText>
						<ThemedText>Candidate 8</ThemedText>
						{/* More candidates to demonstrate scrolling */}
						<ThemedText>Candidate 9</ThemedText>
						<ThemedText>Candidate 10</ThemedText>
						<ThemedText>Candidate 11</ThemedText>
						<ThemedText>Candidate 12</ThemedText><ThemedText>Candidate 1</ThemedText>
						<ThemedText>Candidate 2</ThemedText>
						<ThemedText>Candidate 3</ThemedText>
						<ThemedText>Candidate 4</ThemedText>
						<ThemedText>Candidate 5</ThemedText>
						<ThemedText>Candidate 6</ThemedText>
						<ThemedText>Candidate 7</ThemedText>
						<ThemedText>Candidate 8</ThemedText>
						{/* More candidates to demonstrate scrolling */}
						<ThemedText>Candidate 9</ThemedText>
						<ThemedText>Candidate 10</ThemedText>
						<ThemedText>Candidate 11</ThemedText>
						<ThemedText>Candidate 12</ThemedText><ThemedText>Candidate 1</ThemedText>
						<ThemedText>Candidate 2</ThemedText>
						<ThemedText>Candidate 3</ThemedText>
						<ThemedText>Candidate 4</ThemedText>
						<ThemedText>Candidate 5</ThemedText>
						<ThemedText>Candidate 6</ThemedText>
						<ThemedText>Candidate 7</ThemedText>
						<ThemedText>Candidate 8</ThemedText>
						{/* More candidates to demonstrate scrolling */}
						<ThemedText>Candidate 9</ThemedText>
						<ThemedText>Candidate 10</ThemedText>
						<ThemedText>Candidate 11</ThemedText>
						<ThemedText>Candidate 12</ThemedText><ThemedText>Candidate 1</ThemedText>
						<ThemedText>Candidate 2</ThemedText>
						<ThemedText>Candidate 3</ThemedText>
						<ThemedText>Candidate 4</ThemedText>
						<ThemedText>Candidate 5</ThemedText>
						<ThemedText>Candidate 6</ThemedText>
						<ThemedText>Candidate 7</ThemedText>
						<ThemedText>Candidate 8</ThemedText>
						{/* More candidates to demonstrate scrolling */}
						<ThemedText>Candidate 9</ThemedText>
						<ThemedText>Candidate 10</ThemedText>
						<ThemedText>Candidate 11</ThemedText>
						<ThemedText>Candidate 12</ThemedText><ThemedText>Candidate 1</ThemedText>
						<ThemedText>Candidate 2</ThemedText>
						<ThemedText>Candidate 3</ThemedText>
						<ThemedText>Candidate 4</ThemedText>
						<ThemedText>Candidate 5</ThemedText>
						<ThemedText>Candidate 6</ThemedText>
						<ThemedText>Candidate 7</ThemedText>
						<ThemedText>Candidate 8</ThemedText>
						{/* More candidates to demonstrate scrolling */}
						<ThemedText>Candidate 9</ThemedText>
						<ThemedText>Candidate 10</ThemedText>
						<ThemedText>Candidate 11</ThemedText>
						<ThemedText>Candidate 12</ThemedText>
					</View>
				</View>
			</ScrollView>
			
			{/* Fixed bottom button with blur effect */}
			<BlurView
				intensity={10}
				tint="light" // or "dark" based on your theme
				style={[styles.blurContainer, {paddingBottom: bottom}]}
			>
				<View className='px-4'>
					<ThemedButton
						size='large'
						title='Slide to confirm'
						onPress={() => router.push('/election/confirm-vote')}
					/>
				</View>
			</BlurView>
		</>
	);
};

const styles = StyleSheet.create({
	blurContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent', // Fallback if blur doesn't work
	}
});

export default CastVote;