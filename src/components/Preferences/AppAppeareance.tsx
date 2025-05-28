import React, {useState} from 'react';
import {FontAwesome5 as Icon} from "@expo/vector-icons";
import {ThemedView} from "@/components/Themed/ThemedView";
import {ThemedText} from "@/components/Themed/ThemedText";
import {Modal, TouchableOpacity, View} from 'react-native';
import {ThemeModeProp, useTheme} from "@/core/contexts/ThemeContext";

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
	const {getThemeModeLabel, setThemeMode} = useTheme();
	const [modalVisible, setModalVisible] = useState(false);
	const themeOptions: { label: string; value: ThemeModeProp }[] = [
		{label: 'Light', value: 'light'},
		{label: 'Dark', value: 'dark'},
		{label: 'System', value: 'system'}
	];
	
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
					onPress={() => setModalVisible(true)}
				/>
				<Modal
					animationType="fade"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => setModalVisible(false)}
				>
					<TouchableOpacity
						style={{
							flex: 1,
							backgroundColor: 'rgba(0,0,0,0.5)',
							justifyContent: 'center',
							alignItems: 'center'
						}}
						activeOpacity={1}
						onPress={() => setModalVisible(false)}
					>
						<ThemedView className="w-4/5 rounded-xl p-4" style={{elevation: 5}}>
							<ThemedText type='defaultSemiBold' className="text-lg mb-3">Select Theme</ThemedText>
							{themeOptions.map((option) => (
								<TouchableOpacity
									key={option.value}
									className="py-3 border-b border-gray-200"
									onPress={() => {
										setModalVisible(false);
										setThemeMode(option.value).then();
									}}
								>
									<ThemedText className={getThemeModeLabel() === option.label ? "text-primary" : ""}>
										{option.label}
									</ThemedText>
								</TouchableOpacity>
							))}
						</ThemedView>
					</TouchableOpacity>
				</Modal>
				
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