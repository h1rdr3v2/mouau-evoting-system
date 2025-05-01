import React from 'react';
import {ThemedText} from '@/components/ThemedText';
import {useAuthStore} from '@/core/stores/useAuthStore';
import {trendingNews} from "@/core/data/mockNews";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";
import {TrendingNewsSection} from "@/components/TrendingNews";
import {ScrollView, View, Text} from 'react-native';
import {OverylayImageView} from "@/components/OverlayImageView";
import {ThemedButton} from "@/components/ThemedButton";
import Ionicons from '@expo/vector-icons/Ionicons';

// Main HomeScreen Component
function HomeScreen() {
	const user = useAuthStore(state => state.user);
	const firstName = user?.name?.split(" ")?.[0];
	
	return (
		<ThemedSafeAreaView>
			<ScrollView
				bounces={true}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
			>
				<View className='my-5 px-4'>
					<ThemedText type='title'>Hello {firstName || 'Guest'}</ThemedText>
				</View>
				
				{/*Trending News*/}
				<TrendingNewsSection newsItems={trendingNews}/>
				
				<View className='flex gap-5 px-4'>
					{/*Ongoing elections*/}
					<View className='gap-4'>
						<ThemedText>Ongoing Election/s</ThemedText>
						<View className='border border-black/40 dark:border-white/40 rounded-lg px-2 py-3 gap-3'>
							<View>
								<ThemedText type='light'>5 Positions</ThemedText>
								<ThemedText type='light'>Ends: 3/18/2025</ThemedText>
							</View>
							<ThemedText>
								<ThemedText type='title'>2h 20m 49s</ThemedText> Remaining
							</ThemedText>
							<View className='gap-1'>
								<ThemedText type='subtitle'>NACOS Executive Elections 2025</ThemedText>
								<ThemedText className='text-sm opacity-80 leading-normal' numberOfLines={2}>
									Annual elections for the executive committee of the National Association of
									Computing Students
								</ThemedText>
							</View>
							<ThemedButton
								title="Vote now"
								size='large'
							/>
						</View>
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
						<View className='border border-black/40 dark:border-white/40 rounded-lg px-2 py-3 gap-3'>
							<View className='flex-row justify-between items-center'>
								<View>
									<ThemedText type='light'>Date: 4/10/2025</ThemedText>
									<ThemedText type='light'>5 Positions</ThemedText>
								</View>
								<View className='flex-row gap-1 px-2 py-1 rounded-full items-center bg-green-300/20'>
									<Ionicons name='checkmark-circle' size={16} color='#16a34a'/>
									<Text className='text-green-600 rounded-full '>
										Eligble to vote
									</Text>
								</View>
							</View>
							<ThemedText>
								<ThemedText type='title'>2h 20m 49s</ThemedText> to election day
							</ThemedText>
							<View className='gap-1'>
								<ThemedText type='subtitle'>Student Affairs Representatives Election</ThemedText>
								<ThemedText className='text-sm opacity-80 leading-normal' numberOfLines={2}>
									Election for the departmental representatives to represent students in the SA
									sectors
								</ThemedText>
							</View>
							<ThemedButton
								title="Vote now"
								size='large'
							/>
						</View>
					</View>
				
				</View>
			</ScrollView>
		</ThemedSafeAreaView>
	);
}

export default HomeScreen;