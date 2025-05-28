import {BlurView} from 'expo-blur';
import React, {useState, useMemo} from 'react';
import {router, useLocalSearchParams} from "expo-router";
import {useTheme} from "@/core/contexts/ThemeContext";
import {ThemedText} from "@/components/Themed/ThemedText";
import {ThemedButton} from "@/components/Themed/ThemedButton";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ThemedSafeAreaView} from "@/components/Themed/ThemedSafeAreaView";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {getElection, getPositionsAndCandidates} from "@/core/queries/useElections";
import {View, ScrollView, StyleSheet, Platform, Image, Alert, ActivityIndicator} from "react-native";
import {PositonCandidateApiResponse, PositionsCandidatesResult, SelectedCandidates} from "@/core/types/Election";

const ConfirmVote = () => {
	const {bottom} = useSafeAreaInsets();
	const {themeMode, colors} = useTheme();
	const {electionId, selections} = useLocalSearchParams<{
		electionId: string;
		selections: string;
	}>();
	
	const [isSubmitting, setIsSubmitting] = useState(false);
	
	// Parse selections
	const selectedCandidates: SelectedCandidates = useMemo(() => {
		try {
			return JSON.parse(selections || '{}');
		} catch {
			return {};
		}
	}, [selections]);
	
	// Fetch data
	const {data: electionData} = getElection(electionId);
	const {data: posCandid, isLoading} = getPositionsAndCandidates(electionId);
	
	// Get selected candidate details
	const selectedCandidateDetails = useMemo(() => {
		if (!posCandid?.data) return {};
		
		const details: { [positionName: string]: PositonCandidateApiResponse[] } = {};
		const positionsData = posCandid.data as PositionsCandidatesResult;
		
		Object.entries(selectedCandidates).forEach(([positionName, candidateIds]) => {
			const position = positionsData[positionName];
			if (position) {
				details[positionName] = position.candidates.filter(
					candidate => candidateIds.includes(candidate.id)
				);
			}
		});
		
		return details;
	}, [posCandid?.data, selectedCandidates]);
	
	// Handle vote submission
	const handleConfirmVote = async () => {
		Alert.alert(
			"Confirm Your Vote",
			"Are you sure you want to submit your vote? This action cannot be undone.",
			[
				{
					text: "Cancel",
					style: "cancel"
				},
				{
					text: "Confirm",
					style: "default",
					onPress: async () => {
						setIsSubmitting(true);
						try {
							// TODO: Submit vote to API
							// await submitVote(electionId, selectedCandidates);
							
							// Simulate API call
							await new Promise(resolve => setTimeout(resolve, 2000));
							
							// Navigate to success page
							router.replace('/election/vote-success');
						} catch (error) {
							Alert.alert("Error", "Failed to submit vote. Please try again.");
						} finally {
							setIsSubmitting(false);
						}
					}
				}
			]
		);
	};
	
	if (isLoading) {
		return (
			<ThemedSafeAreaView>
				<View className='flex-1 items-center justify-center'>
					<ActivityIndicator size='large' color={colors.primary}/>
				</View>
			</ThemedSafeAreaView>
		);
	}
	
	return (
		<>
			<ThemedSafeAreaView>
				<ScrollView
					style={{flex: 1}}
					contentInset={{bottom: 100}}
					contentContainerStyle={{
						padding: 16,
						paddingBottom: Platform.OS === 'android' ? 120 : 0,
					}}
					showsVerticalScrollIndicator={false}
				>
					<View className='gap-5'>
						<ThemedText type='defaultSemiBold' className='text-lg'>
							Confirm your selected candidates
						</ThemedText>
						<ThemedText type='title'>
							{electionData?.election?.title || 'Election'}
						</ThemedText>
						<ThemedText className='text-sm opacity-70'>
							Please review your selections before submitting your vote
						</ThemedText>
						
						{/* Warning */}
						<View className='bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-xl flex-row gap-3'>
							<MaterialCommunityIcons
								name="alert-circle"
								size={24}
								color={colors.text}
							/>
							<View className='flex-1'>
								<ThemedText type='defaultSemiBold' className='text-sm'>
									Important Notice
								</ThemedText>
								<ThemedText className='text-sm mt-1'>
									Once you confirm your vote, it cannot be changed or undone.
									Please ensure you have selected the correct candidates.
								</ThemedText>
							</View>
						</View>
						
						{/* Selected Candidates by Position */}
						<View className='gap-6 mt-4'>
							{Object.entries(selectedCandidateDetails).map(([positionName, candidates]) => (
								<View key={positionName} className='gap-3'>
									<ThemedText
										type='subtitle'
										className='text-primary-light dark:text-primary-dark'
									>
										{positionName}
									</ThemedText>
									
									{candidates.map((candidate) => (
										<ConfirmationCard key={candidate.id} candidate={candidate}/>
									))}
								</View>
							))}
						</View>
						
						{/* Vote Summary */}
						<View className='mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl'>
							<ThemedText type='defaultSemiBold' className='mb-2'>
								Vote Summary
							</ThemedText>
							<View className='gap-1'>
								{Object.entries(selectedCandidateDetails).map(([positionName, candidates]) => (
									<View key={positionName} className='flex-row justify-between'>
										<ThemedText className='text-sm'>{positionName}:</ThemedText>
										<ThemedText className='text-sm font-medium'>
											{candidates.length} candidate{candidates.length > 1 ? 's' : ''} selected
										</ThemedText>
									</View>
								))}
							</View>
						</View>
					</View>
				</ScrollView>
			</ThemedSafeAreaView>
			
			{/* Fixed bottom button with blur effect */}
			<BlurView
				intensity={10}
				tint={themeMode === 'dark' ? 'dark' : 'light'}
				style={[styles.blurContainer, {paddingBottom: bottom}]}
			>
				<View className='px-4 py-4'>
					<ThemedButton
						size='large'
						title={isSubmitting ? 'Submitting...' : 'Confirm Vote'}
						onPress={handleConfirmVote}
						disabled={isSubmitting}
						className={isSubmitting ? 'opacity-50' : ''}
					/>
				</View>
			</BlurView>
		</>
	);
};

// Confirmation Card Component
const ConfirmationCard = ({candidate}: { candidate: PositonCandidateApiResponse }) => {
	const {colors} = useTheme();
	
	return (
		<View
			className='border border-primary-light dark:border-primary-dark rounded-xl p-4 bg-primary-light/5 dark:bg-primary-dark/5'>
			<View className='flex-row gap-3 items-center'>
				<Image
					source={{uri: candidate.imageUrl}}
					className='w-14 h-14 rounded-xl bg-gray-200'
					resizeMode='cover'
				/>
				<View className='flex-1'>
					<View className='flex-row items-center gap-2'>
						<ThemedText type='subtitle' numberOfLines={1}>
							{candidate.name}
						</ThemedText>
						<MaterialCommunityIcons
							name="check-circle"
							size={20}
							color={colors.primary}
						/>
					</View>
					<ThemedText className='text-sm' numberOfLines={1}>
						{candidate.department}
					</ThemedText>
					<ThemedText className='text-xs opacity-70'>
						Level {candidate.level}
					</ThemedText>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	blurContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
	}
});

export default ConfirmVote;