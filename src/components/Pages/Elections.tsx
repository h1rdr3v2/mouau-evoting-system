import React from 'react';
import {View} from "react-native";
import {router} from "expo-router";
import {ThemedText} from '@/components/ThemedText';
import {ThemedButton} from "@/components/ThemedButton";
import {ProcessedElection} from "@/core/types/Election";
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

export const OngoingElection = ({ongoing}: { ongoing?: ProcessedElection[] }) => {
	if (ongoing === undefined) return (
		<></>
	)
	
	return (
		<View className='gap-4'>
			{/*Ongoing elections*/}
			<ThemedText>Ongoing Election/s</ThemedText>
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
	);
};

export const UpcomingElection = ({upcoming}: { upcoming?: ProcessedElection[] }) => {
	if (upcoming === undefined) return (
		<></>
	)
	
	return (
		<View className='gap-4'>
			{/*Upcoming elections*/}
			<ThemedText>Upcoming Election/s</ThemedText>
			{upcoming?.map((item, index) => (
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
	)
}

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