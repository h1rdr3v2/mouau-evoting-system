// ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colorScheme} from "nativewind";

// Define possible theme modes
export type ThemeMode = 'light' | 'dark' | 'system';

// Structure of our context
type ThemeContextType = {
    themeMode: ThemeMode;
    currentTheme: 'light' | 'dark';
    setThemeMode: (mode: ThemeMode) => Promise<void>;
};

// Default context values
const defaultContext: ThemeContextType = {
    themeMode: 'system',
    currentTheme: 'light',
    setThemeMode: async () => {},
};

// Create the context
const ThemeContext = createContext<ThemeContextType>(defaultContext);

// Theme provider props
type ThemeProviderProps = {
    children: ReactNode;
};

// Storage key
const THEME_MODE_KEY = 'user-theme-mode';

export function ThemeProvider({ children }: ThemeProviderProps) {
    // Track the user's preference
    const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

    // Get the device theme
    const deviceTheme = useDeviceColorScheme() || 'light';

    // Calculate the effective theme
    const currentTheme = themeMode === 'system' ? deviceTheme : themeMode;

    // Load saved theme preference on app start
    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const savedThemeMode = await AsyncStorage.getItem(THEME_MODE_KEY);
                if (savedThemeMode && ['light', 'dark', 'system'].includes(savedThemeMode)) {
                    setThemeModeState(savedThemeMode as ThemeMode);
                }
            } catch (error) {
                console.error('Failed to load theme preference:', error);
            }
        };

        loadThemePreference().then();
    }, []);

    // Function to update theme mode
    const setThemeMode = async (mode: ThemeMode) => {
        try {
            await AsyncStorage.setItem(THEME_MODE_KEY, mode);
            setThemeModeState(mode);
            colorScheme.set(mode === 'dark' ? 'dark' : 'light');
        } catch (error) {
            console.error('Failed to save theme preference:', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ themeMode, currentTheme, setThemeMode }}>
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
