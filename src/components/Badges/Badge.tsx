import {ReactNode} from 'react';
import {ViewStyle, TextStyle, View, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

// Type for any icon component that accepts name, size, color props
type IconComponent = typeof Ionicons | any;

export interface BadgeProps {
	/** Icon element to display */
	icon?: ReactNode;
	/** Icon name from the icon library */
	iconName?: string;
	/** Size of the icon */
	iconSize?: number;
	/** Color of the icon */
	iconColor?: string;
	/** Icon component/library to use (defaults to Ionicons) */
	iconComponent?: IconComponent;
	/** Text label to display */
	label?: string;
	/** Background color className */
	backgroundColor?: string;
	/** Text color className */
	textColor?: string;
	/** Additional className for the badge */
	className?: string;
	/** Style object for the badge container */
	style?: ViewStyle;
	/** Style object for the text */
	textStyle?: TextStyle;
	/** Style object for the icon */
	iconStyle?: ViewStyle;
	/** Whether to show the icon */
	showIcon?: boolean;
	/** Children elements */
	children?: ReactNode;
	
	/** Any additional props to pass to the underlying View */
	[x: string]: any;
}

export const Badge = ({
						  icon,
						  iconName,
						  iconSize = 16,
						  iconColor,
						  iconComponent: IconComponent = Ionicons,
						  label,
						  backgroundColor = 'bg-gray-200',
						  textColor = 'text-gray-700',
						  className = '',
						  style,
						  textStyle,
						  iconStyle,
						  showIcon = true,
						  children
					  }: BadgeProps) => {
	return (
		<View style={style}
			  className={`flex-row gap-1 px-2 py-1 rounded-full items-center ${backgroundColor} ${className}`}>
			{showIcon && (
				<>
					{icon || (iconName && (
						<IconComponent
							name={iconName}
							size={iconSize}
							color={iconColor}
							style={iconStyle}
						/>
					))}
				</>
			)}
			
			{label && (
				<Text style={textStyle} className={`${textColor} text-sm font-medium`}>
					{label}
				</Text>
			)}
			
			{children}
		</View>
	);
};
