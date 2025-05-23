import {USE_MOCK_DATA} from "@/core/data/config";
import {mockElections, ElectionPayload} from "@/core/data/mockElections";

// Create API service with the same methods as before
export const electApiService = {
	getElections: async (): Promise<{
		success: boolean;
		elections?: ElectionPayload[];
	}> => {
		if (USE_MOCK_DATA) {
			await new Promise(resolve => setTimeout(resolve, 200)); // Wait for 200ms
			return {
				success: true,
				elections: mockElections,
			};
		} else {
			// Real API implementation
			try {
				// const response = await fetch('your-services-endpoint/login', {...})
				// const data = await response.json();
				// return {...}
				return {success: false};
			} catch (error) {
				console.error('news error:', error);
				return {success: false};
			}
		}
	},
};