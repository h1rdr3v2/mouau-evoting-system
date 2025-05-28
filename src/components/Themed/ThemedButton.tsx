import React from 'react';
import {useTheme} from '@/core/contexts/ThemeContext';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';

export type ThemedButtonProps = {
	variant?: 'primary' | 'secondary' | 'text' | 'destructive';
	size?: 'small' | 'medium' | 'large';
	title: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	loading?: boolean;
	disabled?: boolean;
	onPress?: () => void;
	className?: string;
	textClassName?: string;
};

export function ThemedButton({
								 variant = 'primary',
								 size = 'medium',
								 title,
								 disabled = false,
								 leftIcon,
								 rightIcon,
								 loading = false,
								 onPress,
								 className = '',
								 textClassName = '',
							 }: ThemedButtonProps) {
	const {colors} = useTheme();
	const isDisabled = disabled || loading;
	
	// Base button classes
	let buttonClasses = "items-center justify-center rounded-lg";
	
	// Variant-specific classes
	if (variant === 'primary') {
		buttonClasses += " bg-primary-light";
	} else if (variant === 'secondary') {
		buttonClasses += " border border-primary-light dark:border-primary-dark bg-transparent";
	} else if (variant === 'text') {
		buttonClasses += " bg-transparent";
	} else if (variant === 'destructive') {
		buttonClasses += " bg-red-300/20";
	}
	
	// Size classes
	if (size === 'small') {
		buttonClasses += " px-3 py-1.5 min-w-[80px]";
	} else if (size === 'medium') {
		buttonClasses += " px-4 py-2.5 min-w-[120px]";
	} else if (size === 'large') {
		buttonClasses += " px-5 py-3.5 min-w-[150px]";
	}
	
	// State classes
	if (isDisabled) {
		buttonClasses += " opacity-50";
	}
	
	// Text classes
	let textClasses = "font-montserrat-semibold";
	
	if (variant === 'primary') {
		textClasses += " text-white dark:text-text-dark";
	} else if (variant === 'secondary' || variant === 'text') {
		textClasses += " dark:text-white text-primary-light";
	} else if (variant === 'destructive') {
		textClasses += " text-red-600";
	}
	
	// Text size classes
	if (size === 'small') {
		textClasses += " text-sm";
	} else if (size === 'medium') {
		textClasses += " text-base";
	} else if (size === 'large') {
		textClasses += " text-lg";
	}
	
	// Get appropriate color for the ActivityIndicator based on variant and theme
	const getLoaderColor = () => {
		if (variant === 'primary') return '#fff';
		return colors.primary; // Adjust to match your primary colors
	};
	
	return (
		<Pressable
			className={`${buttonClasses} ${className}`}
			disabled={isDisabled}
			onPress={onPress}
			style={({pressed}) => pressed ? {opacity: 0.8} : {}}
		>
			<View className="flex-row items-center justify-center">
				{leftIcon && !loading && (
					<View className="mr-2">{leftIcon}</View>
				)}
				
				{loading ? (
					<ActivityIndicator
						size="small"
						color={getLoaderColor()}
					/>
				) : (
					<Text className={`${textClasses} ${textClassName}`}>
						{title}
					</Text>
				)}
				
				{rightIcon && !loading && (
					<View className="ml-2">{rightIcon}</View>
				)}
			</View>
		</Pressable>
	);
}
