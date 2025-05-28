import React from 'react';
import {Feather} from "@expo/vector-icons";
import {useUser} from "@/core/hooks/useUser";
import {useAuth} from "@/core/queries/useAuth";
import {Image, ScrollView, View} from "react-native";
import {ThemedView} from "@/components/Themed/ThemedView";
import {ThemedText} from "@/components/Themed/ThemedText";
import {ThemedButton} from "@/components/Themed/ThemedButton";
import Notification from "@/components/Preferences/Notification";
import AppAppearance from "@/components/Preferences/AppAppeareance";
import {ThemedSafeAreaView} from "@/components/Themed/ThemedSafeAreaView";
import HelpAndSupportSection from "@/components/Preferences/HelpAndSupportSection";

function SettingsScreen() {
	const {department, level, fullName} = useUser()
	const {logout} = useAuth();
	
	return (
		<ThemedSafeAreaView className='bg-background-dark/10 dark:bg-background-dark/95'>
			<ScrollView
				bounces={true}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
			>
				<View className='my-5 px-4 gap-8'>
					{/*User profile bubble*/}
					<ThemedView className='flex flex-row gap-3 px-4 py-6 rounded-xl'>
						<Image
							source={require('@/assets/images/avatar.webp')}
							className='w-[45px] h-[45px] rounded-full'
							resizeMode={'cover'}
						/>
						<View>
							<ThemedText>{fullName}</ThemedText>
							<ThemedText>{department}, {level} Level</ThemedText>
						</View>
					</ThemedView>
					<Notification/>
					<AppAppearance/>
					<HelpAndSupportSection/>
					<ThemedButton
						title="Logout"
						leftIcon={<Feather color='#dc2626' name='log-out' size={18}/>}
						variant='destructive'
						size='large'
						onPress={() => logout()}
					/>
				</View>
				<View className='px-4 pt-6 pb-10'>
					<ThemedText className='text-center text-xs leading-normal'>NACOS Voting App</ThemedText>
					<ThemedText className='text-center text-xs leading-normal'>© 2025 Destiny Ezenwata. All rights
						reserved.</ThemedText>
				</View>
			</ScrollView>
		</ThemedSafeAreaView>
	);
}

export default SettingsScreen;
