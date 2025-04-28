import {create} from 'zustand';
import {User} from '@/core/types/user';
import {mmkvStorage} from '@/core/storage/mmkvStorage';
import {createJSONStorage, persist} from 'zustand/middleware';

interface AuthState {
	user: User | null;
	token: string | null;
	tempToken: string | null;
	userId: number | null;
	
	// Derived state using selector
	isLoggedIn: () => boolean;
	
	// Actions
	setUser: (user: User | null) => void;
	setToken: (token: string | null) => void;
	setTempToken: (tempToken: string | null) => void;
	setUserId: (userId: number | null) => void;
	clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			token: null,
			tempToken: null,
			userId: null,
			
			// Derived state using selector function
			isLoggedIn: () => !!get().user && !!get().token,
			
			setTempToken: (tempToken) => set({tempToken}),
			
			setUserId: (userId) => set({userId}),
			
			setUser: (user) => set({
				user,
				userId: user?.id || null,
			}),
			
			setToken: (token) => set({token}),
			
			clearAuth: () => set({
				user: null,
				userId: null,
				token: null,
				tempToken: null
			}),
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => mmkvStorage),
			partialize: (state) => ({
				// Only persist these properties
				user: state.user,
				token: state.token,
				userId: state.userId
			}),
		}
	)
);