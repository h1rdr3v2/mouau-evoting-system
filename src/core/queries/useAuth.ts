import {useAuthStore} from '@/core/stores/authStore';
import {authApiService} from '@/core/services/authApi';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export function useAuth() {
	const queryClient = useQueryClient();
	const {
		user,
		tempToken,
		userId,
		setUser,
		setToken,
		setTempToken,
		setUserId,
		clearAuth,
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
			if (data.success && data.token && data.user) {
				setToken(data.token);
				setUser(data.user);
				queryClient.setQueryData(['user', data.token], data.user);
				setTempToken(null);
			}
		},
		onError: (error) => {
			console.error('Verification error:', error);
		}
	});
	
	
	// Login function
	const login = async (regno: string) => {
		return await loginMutation.mutateAsync(regno);
	};
	
	// Verify OTP function
	const verifyOtp = (code: string) => {
		return otpMutation.mutateAsync(code);
	};
	
	// Logout function
	const logout = () => {
		clearAuth();
		return;
	};
	
	return {
		user,
		login,
		logout,
		verifyOtp,
		otpError: otpMutation.error,
		loginError: loginMutation.error,
		isLoading: loginMutation.isPending || otpMutation.isPending,
	};
}