import React from 'react';
import {ThemedText} from '@/components/ThemedText';
import {useAuthStore} from '@/core/stores/useAuthStore';
import {trendingNews} from "@/core/data/mockNews";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";
import {TrendingNewsSection} from "@/components/TrendingNews";
import {ScrollView, View, Text} from 'react-native';
import {OverylayImageView} from "@/components/OverlayImageView";

// Main HomeScreen Component
function HomeScreen() {
	const user = useAuthStore(state => state.user);
	const firstName = user?.name?.split(" ")?.[0];
	
	return (
		<ThemedSafeAreaView>
			<ScrollView
				bounces={false}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{flexGrow: 1}}
			>
				<View className='my-5 px-4'>
					<ThemedText type='title'>Hello {firstName || 'Guest'}</ThemedText>
				</View>
				
				{/*Trending News*/}
				<TrendingNewsSection newsItems={trendingNews}/>
				
				<View className='flex gap-5 px-4'>
					{/*Ongoing elections*/}
					<View>
						<ThemedText>Ongoing Election/s</ThemedText>
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
					<View>
						<ThemedText>Upcoming Election/s</ThemedText>
					</View>
				</View>
			</ScrollView>
		</ThemedSafeAreaView>
	);
}

export default HomeScreen;