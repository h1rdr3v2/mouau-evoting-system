import React, {useEffect} from 'react';
import {router} from "expo-router";
import {useUser} from "@/core/hooks/useUser";
import {useNews} from "@/core/queries/useNews";
import {ThemedText} from '@/components/ThemedText';
import {ThemedButton} from "@/components/ThemedButton";
import {TrendingNewsSection} from "@/components/TrendingNews";
import {OverylayImageView} from "@/components/OverlayImageView";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";
import EligibilityBadge from "@/components/Badges/EligibilityBadge";
import {ScrollView, View, Text, RefreshControl} from 'react-native';
import {getElections} from "@/core/queries/useElections";

// Main HomeScreen Component
function HomeScreen() {
	const {firstName} = useUser()
	const {data: elections} = getElections();
	const {data: news, isLoading: newsLoading, isRefetching, refetch} = useNews()
	
	useEffect(() => {
		console.log(elections)
	}, [elections])
	return (
		<ThemedSafeAreaView>
			<ScrollView
				bounces={true}
				refreshControl={
					<RefreshControl
						refreshing={isRefetching}
						onRefresh={() => {
							refetch();
						}}
					/>
				}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
			>
				<View className='my-5 px-4'>
					<ThemedText type='title'>Hello {firstName || 'Guest'}</ThemedText>
				</View>
				
				{/*Trending News*/}
				<TrendingNewsSection isLoading={newsLoading} newsItems={news?.trendingNews}/>
				
				<View className='flex gap-5 px-4'>
					{/*Ongoing elections*/}
					<View className='gap-4'>
						<ThemedText>Ongoing Election/s</ThemedText>
						{elections?.ongoing.map((item, index) => (
							<ElectionCard
								key={index}
								title={item.title}
								description={item.description}
								EndDate={item.formattedEndDate}
								positions={`${item.positions}`}
								buttonText={"Vote Now"}
								onButtonPress={() => router.push('/election')}
							/>
						))}
					</View>
					
					{/*Vote counts banner*/}
					<View className='flex-1 relative justify-center'>
						<OverylayImageView
							image={require("@/assets/images/freeandfair.webp")}
							className='aspect-[370/96]'
							containerClassName='rounded-2xl max-h-[96px]'
						/>
						<Text className="absolute w-full text-center text-white font-montserrat-bold">
							Say <Text className='text-green-500 text-xl'>YES</Text> to Free and Fair
							Elections</Text>
					</View>
					
					{/*Upcoming elections*/}
					<View className='gap-4'>
						<ThemedText>Upcoming Election/s</ThemedText>
						{elections?.upcoming.map((item, index) => (
							<ElectionCard
								key={index}
								title={item.title}
								description={item.description}
								StartDate={item.formattedStartDate}
								buttonText={"View Details"}
								positions={`${item.positions}`}
								EligbleToVote={true}
								onButtonPress={() => router.push('/election')}
								upcomingElection
							/>
						))}
					</View>
				</View>
			</ScrollView>
		</ThemedSafeAreaView>
	);
}

interface ElectionsProps {
	title: string;
	description: string;
	buttonText: string;
	onButtonPress: () => void;
	positions: string;
	StartDate?: string;
	EndDate?: string;
	EligbleToVote?: boolean;
	upcomingElection?: boolean;
}

const ElectionCard = ({
						  title,
						  description,
						  buttonText,
						  onButtonPress,
						  positions,
						  StartDate,
						  EndDate,
						  EligbleToVote,
						  upcomingElection = false,
					  }: ElectionsProps) => (
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
			<ThemedText type='title'>2h 20m 49s</ThemedText> {upcomingElection ? "To election day" : "Remaining"}
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
			onPress={onButtonPress}
		/>
	</View>
)

export default HomeScreen;