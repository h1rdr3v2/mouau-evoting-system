import React from 'react';
import {useUser} from "@/core/hooks/useUser";
import {getAllNews} from "@/core/queries/useNews";
import {ThemedText} from '@/components/ThemedText';
import {getElections} from "@/core/queries/useElections";
import {ScrollView, View, RefreshControl} from 'react-native';
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";
import {TrendingNewsSection} from "@/components/Pages/TrendingNews";
import {OngoingElection, UpcomingElection} from "@/components/Pages/Elections";
import FreeFairElectionBanner from "@/components/Banner/FreeFairElectionBanner";

// Main HomeScreen Component
function HomeScreen() {
	const {firstName} = useUser()
	const {
		data: elections,
		isLoading: electionLoading,
		refetch: electionRefetch,
		isRefetching: electionIsRefetching
	} = getElections();
	const {
		data: news,
		isLoading: newsLoading,
		isRefetching: newsIsRefetching,
		refetch: newsRefetch
	} = getAllNews()
	
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
					<OngoingElection isLoading={electionLoading} ongoing={elections?.ongoing}/>
					
					{/*Vote counts banner*/}
					<FreeFairElectionBanner/>
					
					{/*Upcoming elections*/}
					<UpcomingElection isLoading={electionLoading} upcoming={elections?.upcoming}/>
				</View>
			</ScrollView>
		</ThemedSafeAreaView>
	);
}

export default HomeScreen;