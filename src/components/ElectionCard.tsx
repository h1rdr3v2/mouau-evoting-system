import {View} from "react-native";
import {ThemedText} from './ThemedText';
import {ThemedButton} from "@/components/ThemedButton";
import {useElectionTimer} from '@/core/hooks/useElectionTimer';
import EligibilityBadge from "@/components/Badges/EligibilityBadge";
import {router} from "expo-router";

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

const ElectionCard = ({
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

export default ElectionCard;