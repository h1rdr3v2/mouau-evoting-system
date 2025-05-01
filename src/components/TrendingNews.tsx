import React from 'react';
import {NewsItemType} from "@/core/types/News";
import {ThemedText} from '@/components/ThemedText';
import {LinearGradient} from 'expo-linear-gradient';
import {Image, ScrollView, View} from 'react-native';

// Single News Item Component
export const NewsItem = ({image, title, readTime}: NewsItemType) => (
	<View className='rounded-lg aspect-[300/163] w-[80vw] relative overflow-hidden' accessible={true}
		  accessibilityLabel={title}>
		<Image
			source={image}
			className='w-full h-full'
			resizeMode='cover'
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
			<ThemedText type='defaultSemiBold' className='text-white text-xs leading-[13px]'
						numberOfLines={2}>
				{title}
			</ThemedText>
			<ThemedText className='text-white/70 text-opacity-80 text-xs'>
				{readTime}
			</ThemedText>
		</View>
	</View>
);

// Trending News Section
export const TrendingNewsSection = ({newsItems = []}: {
	newsItems?: NewsItemType[]
}) => {
	if (newsItems.length <= 0) {
		return (<></>);
	}
	
	return (
		<View className='flex gap-4 w-full'>
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