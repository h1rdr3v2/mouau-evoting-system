import React from 'react';
import {router} from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import {getElections} from "@/core/queries/useElections";
import {ThemedView} from "@/components/Themed/ThemedView";
import {ThemedText} from "@/components/Themed/ThemedText";
import {useElectionTimer} from "@/core/hooks/useElectionTimer";
import VotingStatusBadge from "@/components/Badges/VotingStatusBadge";
import {ThemedSafeAreaView} from "@/components/Themed/ThemedSafeAreaView";
import {Image, Pressable, RefreshControl, ScrollView, View} from "react-native";

function VoteScreen() {
	const {data: elections, refetch, isRefetching} = getElections();
	
	const noElection = elections?.ongoing.length == 0;
	
	return (
		<ThemedSafeAreaView className='bg-blend-overlay'>
			<ScrollView
				bounces={!noElection}
				refreshControl={<RefreshControl onRefresh={() => {
					refetch()
				}} refreshing={isRefetching}/>}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{flexGrow: 1, paddingBottom: 0}}
			>
				<ThemedView className='flex-1 my-5 px-4'>
					<View className='gap-2'>
						<ThemedText type='title'>Elections</ThemedText>
						<ThemedText type='light'>
							See elections that can participate in and make your voice
							heard
						</ThemedText>
					</View>
					{noElection ? (<NoElection/>) : (
						<View className='gap-4 pt-8'>
							{elections?.ongoing.map((item, index) => (
								<VotingCard
									key={index}
									title={item.title}
									endTimestamp={item.endTimestamp}
									description={item.description}
									handlePress={() => router.push(`/election/${item.id}`)}
									hasVoted={false}
								/>
							))}
						</View>
					)}
				</ThemedView>
			</ScrollView>
		</ThemedSafeAreaView>
	);
}

const NoElection = () => (
	<View className='gap-10 pt-12'>
		<Image
			style={{width: "100%", height: 250}}
			source={require('@/assets/election/no-election-img.png')}
		/>
		<View className='items-center gap-4'>
			<ThemedText type='title'>No Election Today</ThemedText>
			<ThemedText type='light' className='text-center'>
				No ongoing election for you to partcipate in was found
				Please check again, we would notify you when theres an election ongoing</ThemedText>
		</View>
	</View>
)

interface VotingCardProps {
	title: string;
	description: string;
	endTimestamp: number;
	handlePress: () => void,
	hasVoted: boolean
}

const VotingCard = ({title, description, endTimestamp, handlePress, hasVoted}: VotingCardProps) => {
	const {hours} = useElectionTimer(endTimestamp);
	
	return (
		<View className='gap-3 px-4 py-3 border border-black/40 dark:border-white/40 rounded-xl'>
			<View className='flex flex-row justify-between items-center'>
				<VotingStatusBadge hasVoted={hasVoted}/>
				<ThemedText>{hours}h left</ThemedText>
			</View>
			<Pressable onPress={handlePress}>
				<View className='flex flex-row items-center justify-between'>
					<View className='max-w-[84%]'>
						<ThemedText type='subtitle'>{title}</ThemedText>
						<ThemedText type='light' numberOfLines={2}>
							{description}
						</ThemedText>
					</View>
					<AntDesign name="right" size={24} color='#9ca3af'/>
				</View>
			</Pressable>
		</View>
	)
}
export default VoteScreen;
