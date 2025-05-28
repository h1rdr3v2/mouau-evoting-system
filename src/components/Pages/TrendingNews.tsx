import React from 'react';
import {MotiView} from 'moti';
import {router} from "expo-router";
import {Skeleton} from 'moti/skeleton';
import {LinearGradient} from 'expo-linear-gradient';
import {useTheme} from "@/core/contexts/ThemeContext";
import {ThemedText} from '@/components/Themed/ThemedText';
import {NewsItemType, TrendingNews} from "@/core/types/News";
import {Image, ImageSourcePropType, Pressable, ScrollView, View} from 'react-native';

export interface NewsItemProps {
	title?: string;
	readTime?: string;
	id?: string;
	image?: ImageSourcePropType;
	
}

// Skeleton for News Item
const NewsItemSkeleton = () => {
	const {themeMode} = useTheme();
	
	return (
		<View className='rounded-lg aspect-[300/163] w-[80vw] overflow-hidden'>
			<Skeleton
				width="100%"
				height="100%"
				radius={8}
				colorMode={themeMode === 'dark' ? 'dark' : 'light'}
			/>
		</View>
	);
};

// Single News Item Component
export const NewsItem = ({image, title, readTime, id}: NewsItemProps) => (
	<Pressable onPress={() => router.push(`/trending-news/${id}`)}>
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
				<ThemedText
					type='defaultSemiBold'
					className='text-white text-xs leading-[13px]'
					numberOfLines={2}
				>
					{title}
				</ThemedText>
				<ThemedText className='text-white/70 text-opacity-80 text-xs'>
					{readTime}
				</ThemedText>
			</View>
		</View>
	</Pressable>
);

// Animated News Item with Skeleton
const AnimatedNewsItem = ({item}: { item: NewsItemType }) => {
	return (
		<MotiView
			from={{opacity: 0}}
			animate={{opacity: 1}}
			transition={{type: 'spring', duration: 500}}
		>
			<NewsItem
				image={item.image}
				title={item.title}
				readTime={item.readTime}
				id={item.id}
			/>
		</MotiView>
	);
};

// Trending News Section
export const TrendingNewsSection = ({isLoading, newsItems = []}: {
	isLoading: boolean;
	newsItems?: TrendingNews[]
}) => {
	// When there are no trending news
	if (newsItems.length <= 0 && !isLoading) {
		return (<></>);
	}
	
	// Create skeleton placeholders when loading
	const skeletons = isLoading && newsItems.length === 0
		? Array(3).fill(0).map((_, index) => ({id: `skeleton-${index}`, isSkeleton: true}))
		: [];
	
	const itemsToRender = isLoading && newsItems.length === 0 ? skeletons : newsItems;
	
	return (
		<View className='flex gap-4 w-full mb-5'>
			<ThemedText className='opacity-70 px-4'>Trending news</ThemedText>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					gap: 16,
					paddingInline: 16,
				}}
			>
				{itemsToRender.map((item: any, index) => {
					if (item.isSkeleton || isLoading) {
						return <NewsItemSkeleton key={`skeleton-${index}`}/>;
					}
					
					return (
						<AnimatedNewsItem
							key={`news-${index}`}
							item={item}
						/>
					);
				})}
			</ScrollView>
		</View>
	);
};