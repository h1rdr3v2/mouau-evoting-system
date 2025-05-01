import React from 'react';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {TouchableOpacity, View} from 'react-native';
import {useTheme} from "@/core/contexts/ThemeContext";
import {FontAwesome5 as Icon} from "@expo/vector-icons";

interface AppearanceItemProps {
	icon: string;
	label: string;
	value: string;
	onPress?: () => void;
}

const AppearanceItem: React.FC<AppearanceItemProps> = ({
														   icon,
														   label,
														   value,
														   onPress,
													   }) => {
	const {colors} = useTheme();
	
	return (
		<TouchableOpacity className="flex-row items-center justify-between py-2" onPress={onPress}>
			<View className="flex-row items-center">
				<View className={`w-9 h-9 rounded-full bg-primary-light/30 items-center justify-center mr-3`}>
					<Icon name={icon} color={colors.primary} size={16}/>
				</View>
				<ThemedText className="text-gray-700">{label}</ThemedText>
			</View>
			<View className="flex-row items-center">
				<ThemedText className="text-sm text-gray-500 mr-2 capitalize">
					{value}
				</ThemedText>
				<Icon name="chevron-right" color="#9ca3af" size={12}/>
			</View>
		</TouchableOpacity>
	);
};

const AppAppearance: React.FC = () => {
	const {getThemeModeLabel} = useTheme();
	
	return (
		<ThemedView className="rounded-xl shadow-sm p-4">
			<ThemedText type='defaultSemiBold' className='text-lg font-montserrat-medium text-gray-800 mb-3'>
				App Appearance
			</ThemedText>
			
			<View className="space-y-4">
				<AppearanceItem
					icon="moon"
					label="Theme"
					value={getThemeModeLabel()}
				/>
				
				<AppearanceItem
					icon="language"
					label="Display Language"
					value="English"
				/>
			</View>
		</ThemedView>
	);
};

export default AppAppearance;