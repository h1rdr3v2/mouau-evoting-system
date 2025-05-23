import {create} from 'zustand';
import {User} from '@/core/types/User';
import zustandStorage from "@/core/stores/storage";
import {createJSONStorage, persist} from 'zustand/middleware';

interface AuthState {
	user: User | null;
	userId: number | null;
	
	// Token management
	token: string | null;
	tokenExpiry: number | null; // timestamp in milliseconds
	tempToken: string | null;
	
	// Derived state using selector
	isLoggedIn: () => boolean;
	
	// Actions
	setUser: (user: User | null) => void;
	setToken: (token: string | null, expiry: number | null) => void;
	setTempToken: (tempToken: string | null) => void;
	setUserId: (userId: number | null) => void;
	clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			userId: null,
			token: null,
			tokenExpiry: null,
			tempToken: null,
			
			// Derived state using selector function
			isLoggedIn: () => {
				const {token, user, tokenExpiry} = get();
				if (!token || !user) return false;
				return !tokenExpiry || Date.now() < tokenExpiry;
			},
			
			setToken: (token: string | null, expiry?: number | null) =>
				set({
					token,
					tokenExpiry: expiry ?? null,
				}),
			
			
			setTempToken: (tempToken) => set({tempToken}),
			
			setUserId: (userId) => set({userId}),
			
			setUser: (user) => set({
				user,
				userId: user?.id || null,
			}),
			
			clearAuth: () => set({
				user: null,
				userId: null,
				token: null,
				tempToken: null
			}),
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => zustandStorage),
			partialize: (state) => ({
				// Only persist these properties
				user: state.user,
				token: state.token,
				userId: state.userId,
				tokenExpiry: state.tokenExpiry
			}),
		}
	)
);