import {useColorScheme} from "nativewind";
import {AppColors} from "@/core/types/Colors";
import {getThemeColors} from "@/core/constants/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useState, useEffect, ReactNode, useMemo} from 'react';

// Define possible theme modes
export type ThemeModeProp = 'light' | 'dark' | 'system';

// Structure of our context
type ThemeContextType = {
	themeMode: ThemeModeProp;
	isDark: boolean;
	colors: AppColors;
	setThemeMode: (mode: ThemeModeProp) => Promise<void>;
};

// Function to validate theme mode
const isValidThemeMode = (value: any): value is ThemeModeProp => {
	return value === 'light' || value === 'dark' || value === 'system';
};

// Default context values
const defaultContext: ThemeContextType = {
	themeMode: 'system',
	isDark: false,
	colors: getThemeColors(false),
	setThemeMode: async () => {
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
	const [themeMode, setThemeModeState] = useState<ThemeModeProp>('system');
	
	// Nativewind function
	const {colorScheme, setColorScheme} = useColorScheme();
	
	// Helper boolean for dark mode
	const isDark = colorScheme === 'dark';
	
	// Get theme colors based on current theme
	const colors = useMemo(() => getThemeColors(isDark), [isDark]);
	
	// Function to update theme mode
	const setThemeMode = async (mode: ThemeModeProp, boot: boolean = false) => {
		try {
			// Save user preference
			if (!boot) await AsyncStorage.setItem(THEME_MODE_KEY, mode);
			// Applying theme
			setThemeModeState(mode);
			setColorScheme(mode)
		} catch (error) {
			console.error('Failed to save theme preference:', error);
		}
	};
	
	// Load saved theme preference on app start
	useEffect(() => {
		const loadThemePreference = async () => {
			try {
				const savedThemeMode = await AsyncStorage.getItem(THEME_MODE_KEY);
				await setThemeMode(savedThemeMode && isValidThemeMode(savedThemeMode) ? savedThemeMode : 'system', true);
			} catch (error) {
				await setThemeMode('system');	// Fallback
				console.error('Failed to load theme preference:', error);
			}
		};
		
		loadThemePreference()
			.catch(error => console.error('Error loading theme preference:', error));
	}, []);
	
	// Memoize context value to prevent unnecessary re-renders
	const contextValue = useMemo(() => ({
		themeMode,
		isDark,
		colors,
		setThemeMode,
	}), [themeMode, isDark, colors, setThemeMode]);
	
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