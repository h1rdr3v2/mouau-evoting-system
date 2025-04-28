import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import { User } from '@/core/types/user';

// Import mock data
import { mockUsers } from '@/core/data/mockUsers'; // Update the import path as needed

// Create a service layer to abstract data fetching
const AuthService = {
    // Use this boolean flag to toggle between mock data and real API
    USE_MOCK_DATA: true,

    // Fetch user by token
    getUserByToken: async (token: string): Promise<User | null> => {
        if (AuthService.USE_MOCK_DATA) {
            // Mock implementation - simulating validating a token
            // Return first mock user
            return mockUsers[0] || null;
        } else {
            try {
                const response = await fetch('your-api-endpoint/user', {
                  headers: { Authorization: `Bearer ${token}` }
                });
                return response.json();
            } catch (error) {
                console.error('Error fetching user:', error);
                return null;
            }
        }
    },

    // User login
    login: async (regno: string): Promise<{ success: boolean; userId?: number; temp_token?: string; }> => {
        if (AuthService.USE_MOCK_DATA) {
            // Mock implementation
            // Finds a user with matching email in mockUsers
            const user = mockUsers.find(u => u.regNo === regno);

            // Simulate password check (in real app, never hard-code passwords)
            if (user) {
                return {
                    success: true,
                    userId: Number(user.id),
                    temp_token: 'mock-temp-token-' + user.id
                };
            }

            return { success: false };
        } else {
            // Real API implementation for the future
            try {
                // Replace with actual API call
                // const response = await fetch('your-api-endpoint/login', {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify({ email, password })
                // });
                // const data = await response.json();
                // return {
                //   success: response.ok,
                //   token: data.token,
                //   user: data.user
                // };
                return { success: false };
            } catch (error) {
                console.error('Login error:', error);
                return { success: false };
            }
        }
    },

    // OTP verification
    verifyOtp: async (code: string, userId: number | null, temp_token: string | null): Promise<{
        success: boolean;
        token?: string;
        user?: User
    }> => {
        if (!userId || !temp_token) {
            return { success: false };
        }

        if (AuthService.USE_MOCK_DATA) {
            // Mock implementation
            if (code !== '1234') {
                return { success: false };
            }

            // Find user by ID
            const user = mockUsers.find(u => u.id === userId);

            if (user) {
                // In a real app, this would update the user's verification status in the database
                const verifiedUser = { ...user, isVerified: true };
                return {
                    success: true,
                    token: 'mock-token-' + user.id,
                    user: verifiedUser
                };
            }

            return { success: false };
        } else {
            // Real API implementation for the future
            try {
                // Replaces with actual API call
                // const response = await fetch('your-api-endpoint/verify', {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify({ code })
                // });
                // return response.ok;
                return { success: false };
            } catch (error) {
                console.error('Verification error:', error);
                return { success: false };
            }
        }
    }
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isAdmin: boolean;
    login: (reg_no: string) => Promise<boolean>;
    logout: () => Promise<void>;
    verifyOtp: (code: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    isAdmin: false,
    login: async () => false,
    logout: async () => {},
    verifyOtp: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [tempToken, setTempToken] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    // Storage helpers
    const storeToken = async (token: string) => {
        // if (Platform.OS !== 'web') {
        //     await SecureStore.setItemAsync('userToken', token);
        // } else {
        //     localStorage.setItem('userToken', token);
        // }
        setToken(token);
    };

    const getToken = async (): Promise<string | null> => {
        // if (Platform.OS !== 'web') {
        //     return await SecureStore.getItemAsync('userToken');
        // } else {
        //     return localStorage.getItem('userToken');
        // }
        return token;
    };

    const removeToken = async () => {
        if (Platform.OS !== 'web') {
            await SecureStore.deleteItemAsync('userToken');
        } else {
            localStorage.removeItem('userToken');
        }
    };

    // Check for existing auth token on startup
    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const userToken = await getToken();

                if (userToken) {
                    const userData = await AuthService.getUserByToken(userToken);
                    setUser(userData);
                }
            } catch (e) {
                console.error('Failed to load auth token', e);
            } finally {
                setIsLoading(false);
            }
        };

        bootstrapAsync().then();
    }, []);

    // Login function
    const login = async (reg_no: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            const result = await AuthService.login(reg_no);

            if (result.success && result.temp_token && result.userId) {
                setTempToken(result.temp_token);
                setUserId(result.userId)
                return true;
            }

            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Email verification function
    const verifyOtp = async (code: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            const result =  await AuthService.verifyOtp(code, userId, tempToken);

            if (result.success && result.token && result.user) {
                await storeToken(result.token);
                setUser(result.user);
                return true;
            }

            return false;
        } catch (error) {
            console.error('Verification error:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Logout function
    const logout = async (): Promise<void> => {
        setIsLoading(true);
        try {
            await removeToken();
            setUser(null);
            router.replace('/(auth)/login');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAdmin: user?.role === 'admin',
                login,
                logout,
                verifyOtp
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
