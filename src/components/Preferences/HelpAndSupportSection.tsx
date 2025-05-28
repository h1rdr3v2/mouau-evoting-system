import React from 'react';
import {FontAwesome} from '@expo/vector-icons';
import {TouchableOpacity, View} from 'react-native';
import {useTheme} from "@/core/contexts/ThemeContext";
import {ThemedView} from '@/components/Themed/ThemedView';
import {ThemedText} from '@/components/Themed/ThemedText';

interface SupportItemProps {
	icon: React.ComponentProps<typeof FontAwesome>['name'];
	title: string;
	onPress?: () => void;
}

const SupportItem: React.FC<SupportItemProps> = ({icon, title, onPress}) => {
	const {colors} = useTheme();
	
	return (
		<TouchableOpacity
			className="flex-row items-center justify-between py-2"
			onPress={onPress}
		>
			<ThemedView className="flex-row items-center justify-center">
				<View className="w-9 h-9 rounded-full bg-primary-light/30 items-center justify-center mr-3">
					<FontAwesome name={icon} size={16} color={colors.primary}/>
				</View>
				<ThemedText className="text-gray-700">{title}</ThemedText>
			</ThemedView>
			<FontAwesome name="chevron-right" size={14} color="#9CA3AF"/>
		</TouchableOpacity>
	);
};

const HelpAndSupportSection: React.FC = () => {
	return (
		<ThemedView className="rounded-xl shadow-sm p-4">
			<ThemedText type='defaultSemiBold' className='text-lg font-montserrat-medium text-gray-800 mb-3'>
				Help & Support
			</ThemedText>
			
			<ThemedView className="space-y-3">
				<SupportItem
					icon="question-circle"
					title="FAQ"
					onPress={() => console.log('FAQ pressed')}
				/>
				
				<SupportItem
					icon="headphones"
					title="Contact Support"
					onPress={() => console.log('Contact Support pressed')}
				/>
				
				<SupportItem
					icon="bug"
					title="Report an Issue"
					onPress={() => console.log('Report an Issue pressed')}
				/>
				
				<SupportItem
					icon="file-text"
					title="Terms & Privacy Policy"
					onPress={() => console.log('Terms & Privacy Policy pressed')}
				/>
			</ThemedView>
		</ThemedView>
	);
};

export default HelpAndSupportSection;