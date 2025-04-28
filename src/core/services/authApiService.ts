import {User} from '@/core/types/user';
import {mockUsers} from '@/core/data/mockUsers';

// Create API service with the same methods as before
export const authApiService = {
	USE_MOCK_DATA: true,
	
	login: async (regno: string): Promise<{
		success: boolean;
		userId?: number;
		temp_token?: string;
	}> => {
		await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds
		if (authApiService.USE_MOCK_DATA) {
			const user = mockUsers.find(u => u.regNo === regno);
			
			if (user) {
				return {
					success: true,
					userId: Number(user.id),
					temp_token: 'mock-temp-token-' + user.id
				};
			}
			
			return {success: false};
		} else {
			// Real API implementation
			try {
				// const response = await fetch('your-services-endpoint/login', {...})
				// const data = await response.json();
				// return {...}
				return {success: false};
			} catch (error) {
				console.error('Login error:', error);
				return {success: false};
			}
		}
	},
	
	verifyOtp: async (code: string, userId: number | null, temp_token: string | null): Promise<{
		success: boolean;
		token?: string;
		user?: User
	}> => {
		if (!userId || !temp_token) {
			return {success: false};
		}
		
		if (authApiService.USE_MOCK_DATA) {
			if (code !== '1234') {
				return {success: false};
			}
			
			const user = mockUsers.find(u => u.id === userId);
			
			if (user) {
				const verifiedUser = {...user, isVerified: true};
				return {
					success: true,
					token: 'mock-token-' + user.id,
					user: verifiedUser
				};
			}
			
			return {success: false};
		} else {
			// Real API implementation
			try {
				// const response = await fetch('your-services-endpoint/verify', {...})
				// return {...}
				return {success: false};
			} catch (error) {
				console.error('Verification error:', error);
				return {success: false};
			}
		}
	}
};