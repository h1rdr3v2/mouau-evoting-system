// ThemeContext.tsx
import {colorScheme} from "nativewind";
import {AppColors} from "@/core/types/Colors";
import {getThemeColors} from "@/core/constants/Colors";
import {useColorScheme as useDeviceColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useState, useEffect, ReactNode, useMemo} from 'react';


// Define possible theme modes
export type ThemeMode = 'light' | 'dark' | 'system';

// Structure of our context
type ThemeContextType = {
	themeMode: ThemeMode;
	currentTheme: 'light' | 'dark';
	isDark: boolean;
	colors: AppColors;
	setThemeMode: (mode: ThemeMode) => Promise<void>;
	toggleTheme: () => Promise<void>;
};

// Default context values
const defaultContext: ThemeContextType = {
	themeMode: 'system',
	currentTheme: 'light',
	isDark: false,
	colors: getThemeColors(false),
	setThemeMode: async () => {
	},
	toggleTheme: async () => {
	},
};

// Create the context
const ThemeContext = createContext<ThemeContextType>(defaultContext);

// Theme provider props
type ThemeProviderProps = {
	children: ReactNode;
};

// Storage key
const THEME_MODE_KEY = 'user-theme-mode';

export function ThemeProvider({children}: ThemeProviderProps) {
	// Track the user's preference
	const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
	
	// Get the device theme
	const deviceTheme = useDeviceColorScheme() || 'light';
	
	// Calculate the effective theme
	const currentTheme = themeMode === 'system' ? deviceTheme : themeMode;
	
	// Helper boolean for dark mode
	const isDark = currentTheme === 'dark';
	
	// Get theme colors based on current theme
	const colors = useMemo(() => getThemeColors(isDark), [isDark]);
	
	// Load saved theme preference on app start
	useEffect(() => {
		const loadThemePreference = async () => {
			try {
				const savedThemeMode = await AsyncStorage.getItem(THEME_MODE_KEY);
				if (savedThemeMode && ['light', 'dark', 'system'].includes(savedThemeMode)) {
					setThemeModeState(savedThemeMode as ThemeMode);
					// Set NativeWind theme immediately
					const effectiveTheme = savedThemeMode === 'system' ? deviceTheme : savedThemeMode as ThemeMode;
					colorScheme.set(effectiveTheme);
				} else {
					// No preference found, set to device default
					colorScheme.set(deviceTheme);
				}
			} catch (error) {
				console.error('Failed to load theme preference:', error);
				colorScheme.set(deviceTheme); // Fallback
			}
		};
		
		loadThemePreference().then();
	}, [deviceTheme]);
	
	// Keep NativeWind colorScheme in sync with current theme
	useEffect(() => {
		colorScheme.set(currentTheme);
	}, [currentTheme]);
	
	// Function to update theme mode
	const setThemeMode = async (mode: ThemeMode) => {
		try {
			await AsyncStorage.setItem(THEME_MODE_KEY, mode);
			setThemeModeState(mode);
		} catch (error) {
			console.error('Failed to save theme preference:', error);
		}
	};
	
	// Helper function to toggle between themes
	const toggleTheme = async () => {
		const newMode = themeMode === 'light' ? 'dark' :
			themeMode === 'dark' ? 'system' : 'light';
		await setThemeMode(newMode);
	};
	
	// Memoize context value to prevent unnecessary re-renders
	const contextValue = useMemo(() => ({
		themeMode,
		currentTheme,
		isDark,
		colors,
		setThemeMode,
		toggleTheme
	}), [themeMode, currentTheme, isDark, colors]);
	
	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
}

// Custom hook to use the theme context
export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
}