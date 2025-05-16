import React from 'react';
import {ScrollView, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedButton} from "@/components/ThemedButton";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Index = () => {
	return (
		<ThemedSafeAreaView>
			<ScrollView>
				<View className="py-3 px-4 gap-8">
					<ThemedText type='title'>
						NACOS Executive Elections 2025
					</ThemedText>
					<View className='flex-row justify-between items-center'>
						<View className='gap-2'>
							<View className='flex-row items-center gap-2'>
								<MaterialCommunityIcons name="vote-outline" size={24} color="black"/>
								<ThemedText>Total votes</ThemedText>
							</View>
							<View>
								<ThemedText type='title'>
									4,234
									<ThemedText>{" "}votes</ThemedText>
								</ThemedText>
							</View>
						</View>
						<ThemedButton
							variant='primary'
							title="Vote"
							className='rounded-[100px] min-w-[0px] w-[80px] h-[40px]'
						/>
					</View>
					<View>
						<ThemedText>Live Result | Candidate</ThemedText>
					</View>
				</View>
			</ScrollView>
		</ThemedSafeAreaView>
	);
};

export default Index;