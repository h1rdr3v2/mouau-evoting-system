import React from 'react';
import {NewsItemType} from "@/core/types/News";
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {LinearGradient} from 'expo-linear-gradient';
import {useAuthStore} from '@/core/stores/useAuthStore';
import {Image, SafeAreaView, ScrollView, View} from 'react-native';
import {trendingNews} from "@/core/data/mockNews";

// Single News Item Component
const NewsItem = ({image, title, readTime}: NewsItemType) => (
	<View className='rounded-lg relative overflow-hidden' accessible={true} accessibilityLabel={title}>
		<Image
			source={image}
			className='aspect-[300/163] w-full'
			accessibilityRole="image"
		/>
		
		<LinearGradient
			colors={[
				'rgba(255,255,255,0)',
				'rgba(31,31,31,0.55)',
				'rgba(0,0,0,0.7)',
				'#000000'
			]}
			locations={[0, 0.5, 0.68, 1]}
			style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
		/>
		
		<View className='absolute bottom-0 left-0 right-0 p-3'>
			<ThemedText className='text-white text-xs leading-[13px] font-montserrat-medium' numberOfLines={2}>
				{title}
			</ThemedText>
			<ThemedText className='text-white/70 text-opacity-80 text-xs'>
				{readTime}
			</ThemedText>
		</View>
	</View>
);

// Trending News Section
const TrendingNewsSection = ({newsItems = []}: {
	newsItems?: NewsItemType[]
}) => {
	if (newsItems.length <= 0) {
		return (<></>);
	}
	
	return (
		<View className='flex gap-4'>
			<ThemedText className='opacity-70 px-4'>Trending news</ThemedText>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					gap: 16,
					paddingInline: 16,
				}}
			>
				{newsItems.map((item, index) => (
					<NewsItem
						key={`news-${index}`}
						image={item.image}
						title={item.title}
						readTime={item.readTime}
					/>
				))}
			</ScrollView>
		</View>
	)
};

// Main HomeScreen Component
function HomeScreen() {
	const user = useAuthStore(state => state.user);
	const firstName = user?.name?.split(" ")?.[0];
	
	return (
		<SafeAreaView style={{flex: 1}}>
			<ScrollView
				bounces={false}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{flexGrow: 1}}
			>
				<ThemedView className='flex-1'>
					<View className='my-5 px-4'>
						<ThemedText type='title'>Hello {firstName || 'Guest'}</ThemedText>
					</View>
					
					<TrendingNewsSection newsItems={trendingNews}/>
				</ThemedView>
			</ScrollView>
		</SafeAreaView>
	);
}

export default HomeScreen;