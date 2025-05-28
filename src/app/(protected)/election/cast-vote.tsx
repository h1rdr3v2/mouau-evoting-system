import React from 'react';
import {router} from "expo-router";
import {BlurView} from 'expo-blur';
import {useTheme} from "@/core/contexts/ThemeContext";
import {View, ScrollView, StyleSheet} from "react-native";
import {ThemedText} from "@/components/Themed/ThemedText";
import {ThemedButton} from "@/components/Themed/ThemedButton";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ThemedSafeAreaView} from "@/components/Themed/ThemedSafeAreaView";


const CastVote = () => {
	const {bottom} = useSafeAreaInsets();
	const {themeMode} = useTheme()
	
	return (
		<>
			<ThemedSafeAreaView>
				<ScrollView
					style={{flex: 1}}
					contentContainerStyle={{
						padding: 16,
						paddingBottom: 200,
					}}
					showsVerticalScrollIndicator={false}
				>
					<View className='gap-5'>
						<ThemedText type='defaultSemiBold' className='text-lg'>it's time to cast your vote</ThemedText>
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
			</ThemedSafeAreaView>
			{/* Fixed bottom button with blur effect */}
			<BlurView
				intensity={10}
				tint={themeMode == 'dark' ? 'dark' : 'light'}
				style={[styles.blurContainer, {paddingBottom: bottom}]}
			>
				<View className='px-4'>
					<ThemedButton
						size='large'
						title='Cast Vote'
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