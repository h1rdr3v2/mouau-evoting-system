import {BlurView} from 'expo-blur';
import {useTheme} from "@/core/contexts/ThemeContext";
import {router, useLocalSearchParams} from "expo-router";
import {ThemedText} from "@/components/Themed/ThemedText";
import React, {useState, useMemo, useEffect} from 'react';
import {ThemedButton} from "@/components/Themed/ThemedButton";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ThemedSafeAreaView} from "@/components/Themed/ThemedSafeAreaView";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {getElection, getPositionsAndCandidates} from "@/core/queries/useElections";
import {CandidateApiData, PositionsCandidatesResult, SelectedCandidates} from "@/core/types/Election";
import {View, ScrollView, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from "react-native";

const CastVote = () => {
	const {bottom} = useSafeAreaInsets();
	const {themeMode, colors} = useTheme();
	const {electionId} = useLocalSearchParams<{ electionId: string }>();
	
	// Fetch data
	const {data: electionData} = getElection(electionId);
	const {data: posCandid, isLoading} = getPositionsAndCandidates(electionId);
	
	// State for selected candidates
	const [selectedCandidates, setSelectedCandidates] = useState<SelectedCandidates>({});
	
	// Initialize selected candidates state when data loads
	useEffect(() => {
		if (posCandid?.data) {
			const initialSelections: SelectedCandidates = {};
			Object.keys(posCandid.data).forEach(positionName => {
				initialSelections[positionName] = [];
			});
			setSelectedCandidates(initialSelections);
		}
	}, [posCandid?.data]);
	
	// Check if all positions have required selections
	const isVoteComplete = useMemo(() => {
		if (!posCandid?.data) return false;
		
		return Object.entries(posCandid.data as PositionsCandidatesResult).every(
			([positionName, position]) => {
				const selectedCount = selectedCandidates[positionName]?.length || 0;
				return selectedCount === position.maxSelections;
			}
		);
	}, [posCandid?.data, selectedCandidates]);
	
	// Handle candidate selection
	const handleCandidateSelect = (positionName: string, candidateId: string, maxSelections: number) => {
		setSelectedCandidates(prev => {
			const currentSelections = prev[positionName] || [];
			const isSelected = currentSelections.includes(candidateId);
			
			if (isSelected) {
				// Deselect
				return {
					...prev,
					[positionName]: currentSelections.filter(id => id !== candidateId)
				};
			} else {
				// Select (if under max selections)
				if (currentSelections.length < maxSelections) {
					return {
						...prev,
						[positionName]: [...currentSelections, candidateId]
					};
				}
				return prev;
			}
		});
	};
	
	// Handle vote submission
	const handleCastVote = () => {
		// Pass selected candidates to confirmation page
		router.push({
			pathname: '/election/confirm-vote',
			params: {
				electionId: electionId,
				selections: JSON.stringify(selectedCandidates)
			}
		});
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
	
	const positionsData = posCandid?.data as PositionsCandidatesResult;
	
	return (
		<>
			<ScrollView
				style={{flex: 1}}
				contentContainerStyle={{
					padding: 16,
					paddingBottom: 200,
				}}
				showsVerticalScrollIndicator={false}
			>
				<View className='gap-5'>
					<ThemedText type='defaultSemiBold' className='text-lg'>
						It's time to cast your vote
					</ThemedText>
					<ThemedText type='title'>
						{electionData?.election?.title || 'Election'}
					</ThemedText>
					
					{/* Positions and Candidates */}
					{positionsData && Object.entries(positionsData).map(([positionName, position]) => (
						<View key={positionName} className='gap-4 mt-6'>
							<View>
								<ThemedText type='subtitle' className='text-primary-light dark:text-primary-dark'>
									{positionName}
								</ThemedText>
								<ThemedText className='text-sm mt-1'>
									Select {position.maxSelections} candidate{position.maxSelections > 1 ? 's' : ''}
									{' • '}
									{selectedCandidates[positionName]?.length || 0}/{position.maxSelections} selected
								</ThemedText>
							</View>
							
							{/* Candidate Cards */}
							<View className='gap-3'>
								{position.candidates.map((candidate) => (
									<CandidateSelectionCard
										key={candidate.id}
										candidate={candidate}
										isSelected={selectedCandidates[positionName]?.includes(candidate.id) || false}
										onSelect={() => handleCandidateSelect(positionName, candidate.id, position.maxSelections)}
										disabled={
											!selectedCandidates[positionName]?.includes(candidate.id) &&
											(selectedCandidates[positionName]?.length || 0) >= position.maxSelections
										}
									/>
								))}
							</View>
						</View>
					))}
				</View>
			</ScrollView>
			
			{/* Fixed bottom button with blur effect */}
			<BlurView
				intensity={10}
				tint={themeMode === 'dark' ? 'dark' : 'light'}
				style={[styles.blurContainer, {paddingBottom: bottom}]}
			>
				<View className='px-4 py-4'>
					<ThemedButton
						size='large'
						title='Cast Vote'
						onPress={handleCastVote}
						disabled={!isVoteComplete}
						className={!isVoteComplete ? 'opacity-50' : ''}
					/>
					{!isVoteComplete && (
						<ThemedText className='text-center text-sm mt-2 text-red-500'>
							Please complete all selections before casting your vote
						</ThemedText>
					)}
				</View>
			</BlurView>
		</>
	);
};

// Candidate Selection Card Component
const CandidateSelectionCard = ({
									candidate,
									isSelected,
									onSelect,
									disabled
								}: {
	candidate: CandidateApiData;
	isSelected: boolean;
	onSelect: () => void;
	disabled: boolean;
}) => {
	return (
		<TouchableOpacity
			onPress={onSelect}
			disabled={disabled}
			activeOpacity={0.7}
			className={`
        border rounded-xl p-4
        ${isSelected
				? 'border-primary-light dark:border-primary-dark bg-primary-light/10 dark:bg-primary-dark/10'
				: 'border-gray-300 dark:border-gray-700'
			}
        ${disabled && !isSelected ? 'opacity-50' : ''}
      `}
		>
			<View className='flex-row items-center justify-between'>
				<View className='flex-row gap-3 items-center flex-1'>
					<Image
						source={{uri: candidate.profile.imageUrl}}
						className='w-16 h-16 rounded-xl bg-gray-200'
						resizeMode='cover'
					/>
					<View className='flex-1'>
						<ThemedText type='subtitle' numberOfLines={1}>
							{candidate.profile.name}
						</ThemedText>
						<ThemedText className='text-sm' numberOfLines={1}>
							{candidate.academic.department}
						</ThemedText>
						<ThemedText className='text-xs opacity-70'>
							Level {candidate.academic.level}
						</ThemedText>
					</View>
				</View>
				
				{/* Selection Indicator */}
				<View
					className={`
            w-6 h-6 rounded-full border-2 items-center justify-center
            ${isSelected
						? 'border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark'
						: 'border-gray-400 dark:border-gray-600'
					}
          `}
				>
					{isSelected && (
						<MaterialCommunityIcons
							name="check"
							size={16}
							color='white'
						/>
					)}
				</View>
			</View>
			
			{/* Manifesto Preview */}
			{isSelected && (
				<View className='mt-3 pt-3 border-t border-gray-200 dark:border-gray-700'>
					<ThemedText className='text-sm italic' numberOfLines={2}>
						"{candidate.campaign.profile}"
					</ThemedText>
				</View>
			)}
		</TouchableOpacity>
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

export default CastVote;