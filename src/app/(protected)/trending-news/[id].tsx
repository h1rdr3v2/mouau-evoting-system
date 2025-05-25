import React from 'react';
import {Skeleton} from "moti/skeleton";
import {useLocalSearchParams} from "expo-router";
import {ThemedText} from "@/components/ThemedText";
import {getNewsById} from "@/core/queries/useNews";
import {Image, ScrollView, View} from "react-native";
import {useTheme} from "@/core/contexts/ThemeContext";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";

const TrendingNews = () => {
	const {id} = useLocalSearchParams<{ id: string }>();
	const {data, isLoading} = getNewsById(id)
	const {themeMode} = useTheme()
	
	return (
		<ThemedSafeAreaView>
			<ScrollView>
				<Skeleton.Group show={isLoading}>
					<View className='px-4 my-3 gap-6'>
						<Skeleton colorMode={themeMode === 'dark' ? 'dark' : 'light'}>
							<ThemedText type='subtitle'>{data?.newsData?.title}</ThemedText>
						</Skeleton>
						<Skeleton>
							<View className='w-full h-[200px] rounded-xl overflow-hidden'>
								<Image
									source={data?.newsData?.image}
									className='w-full h-full'
									resizeMode='cover'
									accessibilityRole="image"
								/>
							</View>
						</Skeleton>
						{isLoading ? (
							<View className='gap-1.5'>
								{Array(10).fill(0).map((item, index) => (
									<Skeleton width='100%' height={40} key={index}
											  colorMode={themeMode === 'dark' ? 'dark' : 'light'}/>
								))}
							</View>
						) : (
							<View>
								<ThemedText>{data?.newsData?.story}</ThemedText>
							</View>
						)}
					</View>
				</Skeleton.Group>
			</ScrollView>
		</ThemedSafeAreaView>
	);
};

export default TrendingNews;