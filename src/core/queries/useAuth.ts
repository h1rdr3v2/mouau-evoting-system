import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {authApi} from '@/core/api/authApi';
import {useAuthStore} from '@/core/stores/authStore';
import {router} from 'expo-router';
import {useEffect} from 'react';
import {User} from "@/core/types/user";

export function useAuth() {
	const queryClient = useQueryClient();
	const {
		user,
		isLoading,
		isAdmin,
		token,
		tempToken,
		userId,
		setUser,
		setToken,
		setTempToken,
		setUserId,
		setLoading,
		clearAuth,
		hydrateFromStorage
	} = useAuthStore();
	
	// Initialize from storage on first load
	useEffect(() => {
		hydrateFromStorage();
	}, []);
	
	// Query to get user by token
	const userQuery = useQuery({
		queryKey: ['user', token],
		queryFn: () => token ? authApi.getUserByToken(token) : null,
		enabled: !!token && !user,
		staleTime: Infinity,
		onSuccess: (userData: User) => {
			if (userData) {
				setUser(userData);
			}
			setLoading(false);
		}
	});
	
	// Login mutation
	const loginMutation = useMutation({
		mutationFn: (regno: string) => authApi.login(regno),
		onSuccess: (data) => {
			if (data.success && data.temp_token && data.userId) {
				setTempToken(data.temp_token);
				setUserId(data.userId);
			}
			setLoading(false);
		},
		onError: () => {
			setLoading(false);
		}
	});
	
	// OTP verification mutation
	const otpMutation = useMutation({
		mutationFn: (code: string) => authApi.verifyOtp(code, userId, tempToken),
		onSuccess: (data) => {
			if (data.success && data.token && data.user) {
				setToken(data.token);
				setUser(data.user);
				queryClient.setQueryData(['user', data.token], data.user);
			}
			setLoading(false);
		},
		onError: () => {
			setLoading(false);
		}
	});
	
	// Login function
	const login = async (regno: string): Promise<boolean> => {
		setLoading(true);
		try {
			const result = await loginMutation.mutateAsync(regno);
			return result.success;
		} catch (error) {
			console.error('Login error:', error);
			return false;
		}
	};
	
	// Verify OTP function
	const verifyOtp = async (code: string): Promise<boolean> => {
		setLoading(true);
		try {
			const result = await otpMutation.mutateAsync(code);
			return result.success;
		} catch (error) {
			console.error('Verification error:', error);
			return false;
		}
	};
	
	// Logout function
	const logout = async (): Promise<void> => {
		setLoading(true);
		try {
			clearAuth();
			queryClient.clear();
			router.replace('/(auth)/login');
		} catch (error) {
			console.error('Logout error:', error);
		} finally {
			setLoading(false);
		}
	};
	
	return {
		user,
		isLoading: isLoading || userQuery.isLoading,
		isAdmin,
		login,
		logout,
		verifyOtp
	};
}