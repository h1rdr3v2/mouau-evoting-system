import React, { forwardRef } from 'react';
import { View, TextInput, Text, Pressable, TextInputProps } from 'react-native';
import { useTheme } from '@/core/contexts/ThemeContext';

export type ThemedInputProps = TextInputProps & {
    variant?: 'default' | 'outlined' | 'filled';
    size?: 'small' | 'medium' | 'large';
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    iconAction?: () => void;
    containerClassName?: string;
    inputClassName?: string;
    labelClassName?: string;
    disabled?: boolean;
};

export const ThemedInput = forwardRef<TextInput, ThemedInputProps>(
    (
        {
            variant = 'default',
            size = 'medium',
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            iconAction,
            containerClassName = '',
            inputClassName = '',
            labelClassName = '',
            disabled = false,
            secureTextEntry,
            ...rest
        },
        ref
    ) => {
        const { currentTheme } = useTheme();
        const isDark = currentTheme === 'dark';

        // Container classes
        let containerClasses = "mb-4";

        // Input wrapper classes
        let inputWrapperClasses = "flex-row items-center rounded-lg";

        // Base input classes
        let inputClasses = "flex-1";

        // Label classes
        let labelClasses = "mb-1 font-medium";

        // Helper text classes
        let helperTextClasses = "text-sm mt-1";

        // Error classes
        let errorClasses = "text-red-500 text-sm mt-1";

        // Variant-specific classes
        if (variant === 'default') {
            inputWrapperClasses += " border-b border-gray-300 dark:border-gray-600";
        } else if (variant === 'outlined') {
            inputWrapperClasses += " border border-gray-300 dark:border-gray-600";
        } else if (variant === 'filled') {
            inputWrapperClasses += " bg-gray-100 dark:bg-gray-800";
        }

        // Size classes
        if (size === 'small') {
            inputClasses += " text-sm px-2";
            inputWrapperClasses += " min-h-[40px]";
            labelClasses += " text-sm";
        } else if (size === 'medium') {
            inputClasses += " text-base px-3";
            inputWrapperClasses += " min-h-[48px]";
            labelClasses += " text-base";
        } else if (size === 'large') {
            inputClasses += " text-lg px-4";
            inputWrapperClasses += " min-h-[56px]";
            labelClasses += " text-lg";
        }

        // Error state
        if (error) {
            inputWrapperClasses += " border-red-500";
        }

        // Disabled state
        if (disabled) {
            inputWrapperClasses += " opacity-50 bg-gray-50 dark:bg-gray-900";
        }

        return (
            <View className={`${containerClasses} ${containerClassName}`}>
                {label && (
                    <Text className={`${labelClasses} ${labelClassName} dark:text-text-dark`}>
                        {label}
                    </Text>
                )}

                <View className={`${inputWrapperClasses}`}>
                    {leftIcon && (
                        <View className="ml-3">
                            {leftIcon}
                        </View>
                    )}

                    <TextInput
                        ref={ref}
                        className={`${inputClasses} ${inputClassName} dark:text-text-dark`}
                        placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
                        editable={!disabled}
                        secureTextEntry={secureTextEntry}
                        {...rest}
                    />

                    {rightIcon && (
                        <Pressable
                            onPress={iconAction}
                            disabled={!iconAction}
                            className="mr-3"
                        >
                            {rightIcon}
                        </Pressable>
                    )}
                </View>

                {error && (
                    <Text className={errorClasses}>{error}</Text>
                )}

                {helperText && !error && (
                    <Text className={`${helperTextClasses} dark:text-gray-400`}>{helperText}</Text>
                )}
            </View>
        );
    }
);
