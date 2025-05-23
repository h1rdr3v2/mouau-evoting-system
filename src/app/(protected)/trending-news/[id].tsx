import React from 'react';
import {View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";
import {ThemedText} from "@/components/ThemedText";

const TrendingNews = () => {
	const {id} = useLocalSearchParams<{ id: string }>();
	
	return (
		<ThemedSafeAreaView>
			<View className='px-6 my-3'>
				<ThemedText type='title'>News title - id : {id}</ThemedText>
			</View>
		</ThemedSafeAreaView>
	);
};

export default TrendingNews;