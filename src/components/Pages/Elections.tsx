import React from 'react';
import {View} from "react-native";
import {router} from "expo-router";
import {Skeleton} from "moti/skeleton";
import {useTheme} from "@/core/contexts/ThemeContext";
import {ProcessedElection} from "@/core/types/Election";
import {ThemedText} from '@/components/Themed/ThemedText';
import {ThemedButton} from "@/components/Themed/ThemedButton";
import {useElectionTimer} from '@/core/hooks/useElectionTimer';
import EligibilityBadge from "@/components/Badges/EligibilityBadge";

interface ElectionsProps {
	title: string;
	description: string;
	buttonText: string;
	positions: string;
	StartDate?: string;
	startTimeStamp?: number;
	endTimeStamp?: number;
	EndDate?: string;
	EligbleToVote?: boolean;
	upcomingElection?: boolean;
	electionId: string; // Add this to uniquely identify the election
}

export const ElectionCardSkeleton = () => {
	const {themeMode} = useTheme()
	const isDark = themeMode === 'dark';
	
	return (
		<View className='border border-black/40 dark:border-white/40 rounded-lg px-2 py-3 gap-3'>
			<View className='flex-row justify-between items-center'>
				<View className='gap-1'>
					<Skeleton width={120} height={16} colorMode={isDark ? 'dark' : 'light'}/>
					<Skeleton width={100} height={16} colorMode={isDark ? 'dark' : 'light'}/>
					<Skeleton width={140} height={16} colorMode={isDark ? 'dark' : 'light'}/>
				</View>
				<Skeleton width={80} height={24} colorMode={isDark ? 'dark' : 'light'} radius={12}/>
			</View>
			<Skeleton width={180} height={24} colorMode={isDark ? 'dark' : 'light'}/>
			<View className='gap-1'>
				<Skeleton width={'80%'} height={20} colorMode={isDark ? 'dark' : 'light'}/>
				<Skeleton width={'95%'} height={16} colorMode={isDark ? 'dark' : 'light'}/>
				<Skeleton width={'90%'} height={16} colorMode={isDark ? 'dark' : 'light'}/>
			</View>
			<Skeleton width={'100%'} height={44} colorMode={isDark ? 'dark' : 'light'} radius={4}/>
		</View>
	);
};

export const ElectionListSkeleton = ({count = 1}) => {
	const {themeMode} = useTheme()
	const isDark = themeMode === 'dark';
	
	return (
		<View className='gap-4'>
			<Skeleton width='40%' height={20} colorMode={isDark ? 'dark' : 'light'}/>
			{Array(count).fill(0).map((_, index) => (
				<ElectionCardSkeleton key={index}/>
			))}
		</View>
	);
};

export const OngoingElection = ({ongoing, isLoading}: { ongoing?: ProcessedElection[], isLoading: boolean }) => {
	return isLoading ? (
		<ElectionListSkeleton/>
	) : (
		<>
			{ongoing && ongoing.length >= 1 && (
				<View className='gap-4'>
					{/*Ongoing elections*/}
					<ThemedText>Ongoing Election{ongoing && ongoing.length <= 1 ? "" : "s"}</ThemedText>
					{ongoing?.map((item, index) => (
						<ElectionCard
							key={index}
							electionId={item.id}
							title={item.title}
							description={item.description}
							EndDate={item.formattedEndDate}
							endTimeStamp={item.endTimestamp}
							positions={`${item.positions}`}
							buttonText={"Vote Now"}
						/>
					))}
				</View>
			)}
		</>
	)
};


export const UpcomingElection = ({upcoming, isLoading}: { upcoming?: ProcessedElection[], isLoading: boolean }) => {
	return isLoading ? (
		<ElectionListSkeleton/>
	) : (
		<>
			{upcoming && upcoming.length >= 1 && (
				<View className='gap-4'>
					<ThemedText>Upcoming Election{upcoming.length <= 1 ? "" : "s"}</ThemedText>
					{upcoming.map((item, index) => (
						<ElectionCard
							key={index}
							electionId={item.id}
							title={item.title}
							description={item.description}
							StartDate={item.formattedStartDate}
							startTimeStamp={item.startTimestamp}
							buttonText={"View Details"}
							positions={`${item.positions}`}
							EligbleToVote={true}
							upcomingElection
						/>
					))}
				</View>
			)}
		</>
	);
};
export const ElectionCard = ({
								 title,
								 description,
								 buttonText,
								 positions,
								 StartDate,
								 EndDate,
								 EligbleToVote,
								 startTimeStamp,
								 endTimeStamp,
								 upcomingElection = false,
								 electionId,
							 }: ElectionsProps) => {
	
	// Choose the right timestamp based on election status
	const timerTimestamp = upcomingElection ? startTimeStamp : endTimeStamp;
	
	// Use our custom timer hook
	const {formattedTime} = useElectionTimer(timerTimestamp);
	
	return (
		<View className='border border-black/40 dark:border-white/40 rounded-lg px-2 py-3 gap-3'>
			<View className='flex-row justify-between items-center'>
				<View>
					{StartDate && (<ThemedText type='light'>Date: {StartDate}</ThemedText>)}
					{positions && (<ThemedText type='light'>{positions} Positions</ThemedText>)}
					{EndDate && (<ThemedText type='light'>Ends: {EndDate}</ThemedText>)}
				</View>
				{EligbleToVote !== undefined && (<EligibilityBadge isEligible={EligbleToVote}/>)}
			</View>
			<ThemedText>
				<ThemedText
					type='title'>{formattedTime}</ThemedText> {upcomingElection ? "To election day" : "Remaining"}
			</ThemedText>
			<View className='gap-1'>
				<ThemedText type='subtitle'>{title}</ThemedText>
				<ThemedText type='light' numberOfLines={2}>
					{description}
				</ThemedText>
			</View>
			<ThemedButton
				title={buttonText}
				size='large'
				onPress={() => router.push(`/election/${electionId}`)}
			/>
		</View>
	);
};