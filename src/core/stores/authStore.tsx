import {create} from 'zustand';
import {User} from '@/core/types/user';
import {mmkvStorage} from '@/core/storage/mmkvStorage';

interface AuthState {
	user: User | null;
	isLoading: boolean;
	token: string | null;
	tempToken: string | null;
	userId: number | null;
	isAdmin: boolean;
	
	setUser: (user: User | null) => void;
	setToken: (token: string | null) => void;
	setTempToken: (tempToken: string | null) => void;
	setUserId: (userId: number | null) => void;
	setLoading: (isLoading: boolean) => void;
	
	clearAuth: () => void;
	
	// Hydrate state from storage on app start
	hydrateFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
	user: null,
	isLoading: true,
	token: null,
	tempToken: null,
	userId: null,
	isAdmin: false,
	
	setUser: (user) => {
		set({user});
		// Also update isAdmin
		set({isAdmin: user?.role === 'admin'});
		// Persist user data
		if (user) {
			mmkvStorage.setItem('user', user);
		} else {
			mmkvStorage.removeItem('user');
		}
	},
	
	setToken: (token) => {
		set({token});
		if (token) {
			mmkvStorage.setItem('userToken', token);
		} else {
			mmkvStorage.removeItem('userToken');
		}
	},
	
	setTempToken: (tempToken) => set({tempToken}),
	setUserId: (userId) => set({userId}),
	setLoading: (isLoading) => set({isLoading}),
	
	clearAuth: () => {
		set({
			user: null,
			token: null,
			tempToken: null,
			userId: null,
			isAdmin: false
		});
		mmkvStorage.removeItem('userToken');
		mmkvStorage.removeItem('user');
	},
	
	hydrateFromStorage: () => {
		const token = mmkvStorage.getItem<string>('userToken');
		const user = mmkvStorage.getItem<User>('user');
		
		set({
			token,
			user,
			isAdmin: user?.role === 'admin' || false,
			isLoading: false
		});
	},
}));