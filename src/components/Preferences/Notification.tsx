import React, {useState} from 'react';
import {useTheme} from "@/core/contexts/ThemeContext";
import {ThemedView} from '@/components/Themed/ThemedView';
import {ThemedText} from '@/components/Themed/ThemedText';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesome, Feather, FontAwesome5, FontAwesome6} from '@expo/vector-icons';

type NotificationType = 'email' | 'push' | 'election' | 'results';

type NotificationState = {
	[key in NotificationType]: boolean;
};

// Define a type for the icon component
type IconComponent = React.ReactNode;

interface NotificationItemProps {
	id: NotificationType;
	icon: IconComponent;
	title: string;
	description: string;
	isActive: boolean;
	onToggle: (id: NotificationType) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
															   id,
															   icon,
															   title,
															   description,
															   isActive,
															   onToggle
														   }) => (
	<View className='flex-row items-center justify-between mb-4'>
		<View className='flex flex-row items-center gap-3'>
			<View className="w-9 h-9 rounded-2xl items-center justify-center bg-primary-light/30">
				{icon}
			</View>
			<View>
				<ThemedText className="leading-normal text-sm">{title}</ThemedText>
				<ThemedText className="opacity-80 text-xs leading-normal">
					{description}
				</ThemedText>
			</View>
		</View>
		<TouchableOpacity
			style={[
				styles.toggleButton,
				isActive ? styles.toggleActive : styles.toggleInactive
			]}
			onPress={() => onToggle(id)}
		>
			<View style={[
				styles.toggleKnob,
				isActive ? styles.toggleKnobRight : styles.toggleKnobLeft
			]}/>
		</TouchableOpacity>
	</View>
);

function Notification(): React.ReactElement {
	const [notifications, setNotifications] = useState<NotificationState>({
		email: false,
		push: false,
		election: false,
		results: false
	});
	
	const {colors} = useTheme();
	
	const handleNotificationToggle = (type: NotificationType): void => {
		setNotifications(prev => ({
			...prev,
			[type]: !prev[type]
		}));
	};
	
	return (
		<ThemedView className='rounded-xl shadow-sm p-4'>
			<ThemedText type='defaultSemiBold' className='text-lg font-montserrat-medium text-gray-800 mb-3'>
				Notification Preferences
			</ThemedText>
			
			<View className='gap-4'>
				<NotificationItem
					id="email"
					icon={<FontAwesome name="envelope" size={16} color={colors.primary}/>}
					title="Email Notifications"
					description="Receive emails about election updates"
					isActive={notifications.email}
					onToggle={handleNotificationToggle}
				/>
				
				<NotificationItem
					id="push"
					icon={<Feather name="bell" size={16} color={colors.primary}/>}
					title="Push Notifications"
					description="Get notified on your device"
					isActive={notifications.push}
					onToggle={handleNotificationToggle}
				/>
				
				<NotificationItem
					id="election"
					icon={<FontAwesome5 name="vote-yea" size={16} color={colors.primary}/>}
					title="Election Alerts"
					description="Updates about new elections"
					isActive={notifications.election}
					onToggle={handleNotificationToggle}
				/>
				
				<NotificationItem
					id="results"
					icon={<FontAwesome6 name="chart-simple" size={16} color={colors.primary}/>}
					title="Results Notifications"
					description="Get notified when results are published"
					isActive={notifications.results}
					onToggle={handleNotificationToggle}
				/>
			</View>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	toggleButton: {
		width: 48,
		height: 24,
		borderRadius: 12,
		padding: 2,
	},
	toggleActive: {
		backgroundColor: '#10B981',
	},
	toggleInactive: {
		backgroundColor: '#D1D5DB',
	},
	toggleKnob: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 1},
		shadowOpacity: 0.2,
		shadowRadius: 1.5,
		elevation: 2,
	},
	toggleKnobLeft: {
		alignSelf: 'flex-start',
	},
	toggleKnobRight: {
		alignSelf: 'flex-end',
	},
});

export default Notification;