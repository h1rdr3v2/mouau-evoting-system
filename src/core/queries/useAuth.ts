import {useMemo} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useAuthStore} from '@/core/stores/useAuthStore';
import {authApiService} from '@/core/services/authApiService';

export function useAuth() {
	const queryClient = useQueryClient();
	
	const {
		user,
		userId,
		tempToken,
		setUser,
		setToken,
		setUserId,
		setTempToken,
		clearAuth,
		isLoggedIn,
	} = useAuthStore();
	
	// Login mutation
	const loginMutation = useMutation({
		mutationFn: (regno: string) => authApiService.login(regno),
		onSuccess: (data) => {
			if (data.success && data.temp_token && data.userId) {
				setTempToken(data.temp_token);
				setUserId(data.userId);
			}
		},
		onError: (error) => {
			console.error('Login error:', error);
		},
	});
	
	// OTP verification mutation
	const otpMutation = useMutation({
		mutationFn: (code: string) =>
			authApiService.verifyOtp(code, userId, tempToken),
		onSuccess: (data) => {
			if (data.success && data.token && data.expiry && data.user) {
				setToken(data.token, data.expiry);
				setUser(data.user);
				queryClient.setQueryData(['user', data.token], data.user);
				setTempToken(null);
			}
		},
		onError: (error) => {
			console.error('OTP verification error:', error);
		},
	});
	
	const login = async (regno: string) => {
		try {
			return await loginMutation.mutateAsync(regno);
		} catch (err) {
			throw err;
		}
	};
	
	const verifyOtp = async (code: string) => {
		try {
			return await otpMutation.mutateAsync(code);
		} catch (err) {
			throw err;
		}
	};
	
	const logout = () => {
		clearAuth();
	};
	
	return useMemo(() => ({
		user,
		login,
		logout,
		verifyOtp,
		isLoggedIn,
		loginError: loginMutation.error,
		otpError: otpMutation.error,
		isLoading: loginMutation.isPending || otpMutation.isPending,
		isLoggingIn: loginMutation.isPending,
		isVerifying: otpMutation.isPending,
	}), [
		user,
		loginMutation.error,
		otpMutation.error,
		loginMutation.isPending,
		otpMutation.isPending,
	]);
}
