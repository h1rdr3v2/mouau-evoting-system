// ThemeToggle.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme, ThemeMode } from '@/core/contexts/ThemeContext';

export function ThemeToggle() {
    const { themeMode, setThemeMode } = useTheme();

    const setMode = (mode: ThemeMode) => () => {
        setThemeMode(mode);
    };

    return (
        <View className="p-4 rounded-lg bg-background-light dark:bg-background-dark">
            <Text className="font-bold mb-3 text-text-light dark:text-text-dark">
                Theme Settings
            </Text>

            <View className="flex-row space-x-2">
                <ThemeButton
                    label="Light"
                    isActive={themeMode === 'light'}
                    onPress={setMode('light')}
                />

                <ThemeButton
                    label="Dark"
                    isActive={themeMode === 'dark'}
                    onPress={setMode('dark')}
                />

                <ThemeButton
                    label="System"
                    isActive={themeMode === 'system'}
                    onPress={setMode('system')}
                />
            </View>
        </View>
    );
}

type ThemeButtonProps = {
    label: string;
    isActive: boolean;
    onPress: () => void;
};

function ThemeButton({ label, isActive, onPress }: ThemeButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            className={`px-4 py-2 rounded ${
                isActive
                    ? "bg-primary-light dark:bg-primary-dark"
                    : "bg-gray-200 dark:bg-gray-700"
            }`}
        >
            <Text
                className={`font-medium ${
                    isActive
                        ? "text-white"
                        : "text-gray-800 dark:text-gray-200"
                }`}
            >
                {label}
            </Text>
        </Pressable>
    );
}
