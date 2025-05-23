import React from 'react';
import {router} from "expo-router";
import {useUser} from "@/core/hooks/useUser";
import {useNews} from "@/core/queries/useNews";
import {ThemedText} from '@/components/ThemedText';
import ElectionCard from "@/components/ElectionCard";
import {getElections} from "@/core/queries/useElections";
import {TrendingNewsSection} from "@/components/TrendingNews";
import {OverylayImageView} from "@/components/OverlayImageView";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";
import {ScrollView, View, Text, RefreshControl} from 'react-native';

// Main HomeScreen Component
function HomeScreen() {
	const {firstName} = useUser()
	const {data: elections, refetch: electionRefetch, isRefetching: electionIsRefetching} = getElections();
	const {data: news, isLoading: newsLoading, isRefetching: newsIsRefetching, refetch: newsRefetch} = useNews()
	
	return (
		<ThemedSafeAreaView>
			<ScrollView
				bounces={true}
				refreshControl={
					<RefreshControl
						refreshing={newsIsRefetching && electionIsRefetching}
						onRefresh={() => {
							newsRefetch();
							electionRefetch();
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
				</View>
			</ScrollView>
		</ThemedSafeAreaView>
	);
}

export default HomeScreen;