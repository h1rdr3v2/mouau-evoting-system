// src/core/storage/mmkvStorage.ts
import {MMKV} from 'react-native-mmkv';

// Create the storage instance
export const storage = new MMKV({
	id: 'app-storage',
	encryptionKey: 'secure-storage-key',
});

// Helper methods
export const mmkvStorage = {
	// Store data
	setItem: (key: string, value: any) => {
		if (typeof value === 'string') {
			storage.set(key, value);
		} else {
			storage.set(key, JSON.stringify(value));
		}
	},
	
	// Get data
	getItem: <T>(key: string, defaultValue?: T): T | null => {
		const value = storage.getString(key);
		if (value === undefined) return defaultValue || null;
		try {
			return JSON.parse(value) as T;
		} catch {
			return value as unknown as T;
		}
	},
	
	// Remove data
	removeItem: (key: string) => {
		storage.delete(key);
	},
	
	// Clear all data
	clearAll: () => {
		storage.clearAll();
	},
};